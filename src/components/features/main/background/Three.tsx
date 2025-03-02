"use client";
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useMask,
  useGLTF,
  Float,
  Instance,
  Instances,
  Lightformer,
  Environment,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  Text,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";
import { url } from "inspector";

// モデルのプリロード
useGLTF.preload("/shapes-transformed.glb");
useGLTF.preload("/shiro-syati.glb");

interface AppProps {
  spheres: [number, string, number, [number, number, number]][];
}
interface AquariumProps {
  children: React.ReactNode;
  position: [number, number, number];
}
interface SphereProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}
interface OrcaProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export default function Three({ spheres }: AppProps) {
  const [aquariumPosition, setAquariumPosition] = useState<
    [number, number, number]
  >([0, 0.25, 0]);
  const windowWidth = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newWidth = window.innerWidth;
      setAquariumPosition(newWidth <= 1120 ? [0, 0.25, 0] : [6, 0.25, 0]);
      windowWidth.current = newWidth;

      const handleResize = () => {
        const newWidth = window.innerWidth;
        if (
          (windowWidth.current! > 1120 && newWidth <= 1120) ||
          (windowWidth.current! <= 1120 && newWidth > 1120)
        ) {
          setAquariumPosition(newWidth <= 1120 ? [0, 0.25, 0] : [6, 0.25, 0]);
        }
        windowWidth.current = newWidth;
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [height, setHeight] = useState("100dvh");

  useEffect(() => {
    const updateHeight = () => {
      if (navigator.userAgent.includes("Mobi")) {
        // モバイル環境なら URL バー込みの高さを取得
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        setHeight(`${viewportHeight}px`);
      } else {
        // Web（PC）環境なら 100dvh
        setHeight("100dvh");
      }
    };
  
    updateHeight();
    window.addEventListener("resize", updateHeight);
  
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  
  

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 30], fov: 35, near: 1, far: 40 }}
      style={{ height: height }}
    >
      <color attach="background" args={["#f0f0f0"]} />

      <Aquarium position={aquariumPosition}>
        <Float rotationIntensity={2} floatIntensity={2} speed={2}>
          <Orca position={[1, 0, -1]} rotation={[0, -0.5, 0]} scale={2.5} />
        </Float>
        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
        </Instances>
      </Aquarium>
      <Table position={[0, 0, 0]} />

      <Environment resolution={512}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={1}
            rotation-y={Math.PI / 2}
            position={[-1, 0, 0]}
            scale={[10, 10, 10]}
          />
          <Lightformer
            intensity={1}
            position={[5, 0, -2]}
            scale={[10, 10, 10]}
          />
        </group>
      </Environment>
      <Background />
    </Canvas>
  );
}

function Aquarium({ children, ...props }: AquariumProps) {
  const ref = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/shapes-transformed.glb");
  const stencil = useMask(1, false);

  const applyStencil = useMemo(() => {
    return (object: THREE.Object3D) => {
      const mesh = object as THREE.Mesh;
      if (mesh.material) Object.assign(mesh.material, { ...stencil });
    };
  }, [stencil]);

  useLayoutEffect(() => {
    ref.current?.traverse(applyStencil);
  }, [applyStencil]);

  return (
    <group {...props} dispose={null}>
      <mesh scale={[4, 4, 4]} geometry={(nodes.Cube as THREE.Mesh).geometry}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
}

function Orca(props: OrcaProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scene = useMemo(() => useGLTF("shiro-syati.glb").scene, []);
  const orcaRef = useRef<THREE.Object3D>(scene);
  const [showText, setShowText] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowText(window.scrollY === 0); // 画面が一番上の時に true
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <group {...props}>
      <primitive object={orcaRef.current} />
      {showText && (
        <group position={[0, 0.7, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1.5, 0.4]} />
            <meshBasicMaterial color="white" transparent opacity={1} />
          </mesh>
          <Text fontSize={0.2} color="black" anchorX="center" anchorY="middle">
            こんにちわ！
          </Text>
        </group>
      )}
    </group>
  );
}

function Table({ position }: { position: [number, number, number] }) {
  const woodTexture = useTexture("/wood.webp");
  return (
    <group position={position}>
      <mesh position={[0, -5, 0]}>
        <boxGeometry args={[30, 2, 20]} /> {/* 幅8, 厚さ0.2, 奥行き6 */}
        <meshStandardMaterial
          map={woodTexture}
          roughness={0.9}
          metalness={0.01}
        />
      </mesh>
    </group>
  );
}

function Background() {
  const texture = useTexture("./books.webp");
  return (
    <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[50, 30, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

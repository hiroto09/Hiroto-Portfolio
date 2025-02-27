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

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 30], fov: 35, near: 1, far: 40 }}
    >
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={0.8} />
      <Aquarium position={aquariumPosition}>
        <Float rotationIntensity={2} floatIntensity={10} speed={2}>
          <Orca position={[1, 0, -1]} rotation={[0, -0.5, 0]} scale={2.5} />
        </Float>
        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
          {spheres.map(([scale, color, speed, position], index) => (
            <Sphere
              key={index}
              scale={scale}
              color={color}
              speed={speed}
              position={position}
            />
          ))}
        </Instances>
      </Aquarium>
      <Table position={[0, 0, 0]} />

      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          {Array.from({ length: 8 }, (_, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[i % 2 === 0 ? 2 : 0, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <Background/>
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
      <mesh
        castShadow
        scale={[4, 4, 4]}
        geometry={(nodes.Cube as THREE.Mesh).geometry}
      >
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

function Sphere({
  position,
  scale = 1,
  speed = 0.1,
  color = "red",
}: SphereProps) {
  return (
    <Float rotationIntensity={40} floatIntensity={20} speed={speed}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
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
          <mesh position={[0, 0, -0.01]}>
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
      <mesh position={[0, -5, 0]} receiveShadow castShadow>
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
    <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}> {/* z を -30 に変更 */}
      <planeGeometry args={[50, 30, 1]} /> {/* サイズを大きくして画面を覆う */}
      <meshStandardMaterial
        map={texture as THREE.Texture}
        depthTest={true} // 他のオブジェクトと衝突しないようにする
        transparent
      />
    </mesh>
  );
}
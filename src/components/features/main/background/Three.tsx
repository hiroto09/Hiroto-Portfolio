"use client";
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useMask,
  useGLTF,
  Float,
  Lightformer,
  Environment,
  MeshTransmissionMaterial,
  Text,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";
import style from "./Three.module.scss";

interface AquariumProps {
  children: React.ReactNode;
  position: [number, number, number];
}
interface OrcaProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

// モデルのプリロード
useGLTF.preload("/shapes-transformed.glb");
useGLTF.preload("/shiro-syati.glb");

export default function Three() {
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
    <div className={style.canvas}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 30], fov: 35, near: 1, far: 40 }}
        style={{ height: "100vh" }}
      >
        <Aquarium position={aquariumPosition}>
          <Float rotationIntensity={2} floatIntensity={2} speed={3}>
            <Orca position={[1, 0, -1]} rotation={[0, -0.5, 0]} scale={2.5} />
          </Float>
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
    </div>
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

          samples={4}
          thickness={1.5}
          distortionScale={0.1}
          ior={1.25}
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
      setShowText(window.scrollY === 0);
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
          <Text fontSize={0.2} color="white" anchorX="center" anchorY="middle">
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

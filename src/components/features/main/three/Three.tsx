"use client";
import React from "react";
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { useAtom } from "jotai";
import {HelloOrca} from "../../../const/atoms/ShiroSyati";
import { Canvas} from "@react-three/fiber";
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
  Text
} from "@react-three/drei";
import * as THREE from "three";


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
      setAquariumPosition(newWidth <= 1120 ? [0, 0.25, 0] : [0, 0.25, -8]);
      windowWidth.current = newWidth;

      const handleResize = () => {
        const newWidth = window.innerWidth;
        if (
          (windowWidth.current! > 1120 && newWidth <= 1120) ||
          (windowWidth.current! <= 1120 && newWidth > 1120)
        ) {
          setAquariumPosition(newWidth <= 1120 ? [0, 0.25, 0] : [0, 0.25, -8]);
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
      camera={{ position: [30, 9, 0], fov: 35, near: 1, far: 40 }}
    >
      <color attach="background" args={["#f8fbff"]} />
      <Aquarium position={aquariumPosition}>
        <Float rotationIntensity={2} floatIntensity={10} speed={2}>
          <Orca position={[0, 0, -1]} rotation={[0, 1, 0]} scale={3} />
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
      <AccumulativeShadows
        color="#0000ff"
        colorBlend={0.5}
        opacity={0.5}
        scale={60}
        position={[0, -5, 0]}
      ></AccumulativeShadows>
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
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
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
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
        scale={[3.66, 4.8, 5]}
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
  const [helloOrca] = useAtom(HelloOrca); 

  return (
    <group {...props}>
      <primitive object={orcaRef.current} />
      {helloOrca && ( // グローバルステートがtrueなら表示
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

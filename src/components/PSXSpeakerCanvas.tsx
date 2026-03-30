import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * PS1-style low-poly cartoony headphones.
 * Rotates based on a scroll progress value (0–1).
 */
function PSXHeadphones({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const bodyMat = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color("hsl(210, 90%, 55%)") }),
    []
  );

  const darkMat = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color("hsl(0, 0%, 12%)") }),
    []
  );

  const padMat = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color("hsl(0, 0%, 18%)") }),
    []
  );

  const silverMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(210, 10%, 75%)"),
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(210, 90%, 60%)"),
        emissive: new THREE.Color("hsl(210, 90%, 45%)"),
        emissiveIntensity: 2,
        roughness: 0.2,
        metalness: 0.5,
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.1}>
        {/* ===== HEADBAND — curved arc ===== */}
        {/* Main band */}
        <mesh material={bodyMat} position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.85, 0.1, 8, 16, Math.PI]} />
        </mesh>
        {/* Inner padding on headband */}
        <mesh material={padMat} position={[0, 1.1, 0]}>
          <torusGeometry args={[0.85, 0.07, 6, 16, Math.PI]} />
        </mesh>

        {/* ===== LEFT EAR CUP ===== */}
        <group position={[-0.85, 0.25, 0]}>
          {/* Outer shell */}
          <mesh material={bodyMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.25, 8]} />
          </mesh>
          {/* Inner ring detail */}
          <mesh material={darkMat} position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.05, 8]} />
          </mesh>
          {/* Ear cushion */}
          <mesh material={padMat} position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.1, 6, 8]} />
          </mesh>
          {/* Glow accent ring */}
          <mesh material={glowMat} position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.42, 0.02, 6, 16]} />
          </mesh>
          {/* Hinge connector */}
          <mesh material={silverMat} position={[0, 0.4, 0]}>
            <boxGeometry args={[0.12, 0.2, 0.12]} />
          </mesh>
        </group>

        {/* ===== RIGHT EAR CUP ===== */}
        <group position={[0.85, 0.25, 0]}>
          {/* Outer shell */}
          <mesh material={bodyMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.25, 8]} />
          </mesh>
          {/* Inner ring detail */}
          <mesh material={darkMat} position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.05, 8]} />
          </mesh>
          {/* Ear cushion */}
          <mesh material={padMat} position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.1, 6, 8]} />
          </mesh>
          {/* Glow accent ring */}
          <mesh material={glowMat} position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.42, 0.02, 6, 16]} />
          </mesh>
          {/* Hinge connector */}
          <mesh material={silverMat} position={[0, 0.4, 0]}>
            <boxGeometry args={[0.12, 0.2, 0.12]} />
          </mesh>
        </group>

        {/* ===== CARTOON OUTLINE ===== */}
        <mesh position={[0, 1.1, 0]}>
          <torusGeometry args={[0.88, 0.02, 6, 16, Math.PI]} />
          <meshBasicMaterial color="hsl(0, 0%, 0%)" />
        </mesh>
      </group>
    </Float>
  );
}

interface PSXSpeakerCanvasProps {
  scrollProgress: number;
}

const PSXSpeakerCanvas = ({ scrollProgress }: PSXSpeakerCanvasProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false }}
      dpr={1}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(210, 80%, 70%)" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(210, 90%, 60%)" />
      <PSXHeadphones scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default PSXSpeakerCanvas;

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * PS1-style low-poly futuristic speaker.
 * Rotates based on a scroll progress value (0–1).
 */
function PSXSpeaker({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // PS1 material — flat shading, no smoothing, slight metallic sheen
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(160, 60%, 45%)"),
        flatShading: true,
        roughness: 0.6,
        metalness: 0.4,
      }),
    []
  );

  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(0, 0%, 8%)"),
        flatShading: true,
        roughness: 0.9,
        metalness: 0.2,
      }),
    []
  );

  const coneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(0, 0%, 18%)"),
        flatShading: true,
        roughness: 0.7,
        metalness: 0.3,
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(38, 100%, 65%)"),
        emissive: new THREE.Color("hsl(38, 100%, 45%)"),
        emissiveIntensity: 1.5,
        flatShading: true,
        roughness: 0.3,
        metalness: 0.6,
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    // Continuous spin + scroll-driven rotation
    groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.6}>
        {/* Main body — chunky octagonal cylinder (PSX style low segments) */}
        <mesh material={bodyMat} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.3, 1.8, 8, 1]} />
        </mesh>

        {/* Top cap */}
        <mesh material={bodyMat} position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.2, 8, 1]} />
        </mesh>

        {/* Bottom cap */}
        <mesh material={bodyMat} position={[0, -1.0, 0]}>
          <cylinderGeometry args={[1.3, 1.1, 0.2, 8, 1]} />
        </mesh>

        {/* Main speaker cone — front face */}
        <mesh material={darkMat} position={[0, 0.15, 0.85]}>
          <cylinderGeometry args={[0.7, 0.8, 0.15, 8, 1]} />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        <mesh material={coneMat} position={[0, 0.15, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 0.3, 8]} />
        </mesh>

        {/* Speaker ring glow */}
        <mesh material={glowMat} position={[0, 0.15, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.03, 4, 8]} />
        </mesh>

        {/* Tweeter — small top speaker */}
        <mesh material={darkMat} position={[0, 0.7, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.1, 6, 1]} />
        </mesh>
        <mesh material={coneMat} position={[0, 0.7, 0.88]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.15, 0.15, 6]} />
        </mesh>

        {/* Futuristic antenna spike on top */}
        <mesh material={glowMat} position={[0, 1.4, 0]}>
          <coneGeometry args={[0.08, 0.6, 4]} />
        </mesh>
        <mesh material={bodyMat} position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.1, 4, 4]} />
        </mesh>

        {/* Legs / feet — 4 chunky stilts */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 0.9;
          const z = Math.sin(angle) * 0.9;
          return (
            <mesh key={i} material={darkMat} position={[x, -1.4, z]}>
              <boxGeometry args={[0.2, 0.6, 0.2]} />
            </mesh>
          );
        })}

        {/* Side vents — PSX-style geometric panels */}
        {[1, -1].map((side) => (
          <group key={side}>
            {[0.3, 0, -0.3].map((y) => (
              <mesh
                key={y}
                material={darkMat}
                position={[side * 1.15, y, 0]}
                rotation={[0, 0, 0]}
                scale={[0.05, 0.12, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]} />
              </mesh>
            ))}
          </group>
        ))}
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
      camera={{ position: [0, 0.5, 4.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false }} // antialias off = more PS1
      dpr={1} // low DPR for that crunchy PSX look
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(38, 80%, 70%)" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(38, 90%, 55%)" />
      <PSXSpeaker scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default PSXSpeakerCanvas;

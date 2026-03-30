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

  // Cartoony materials — bright, saturated, cel-shaded feel
  const bodyMat = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: new THREE.Color("hsl(200, 15%, 35%)"),
      }),
    []
  );

  const darkMat = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: new THREE.Color("hsl(200, 20%, 10%)"),
      }),
    []
  );

  const coneMat = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: new THREE.Color("hsl(200, 10%, 20%)"),
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(160, 80%, 50%)"),
        emissive: new THREE.Color("hsl(160, 80%, 40%)"),
        emissiveIntensity: 2,
        roughness: 0.2,
        metalness: 0.5,
      }),
    []
  );

  const rubberMat = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: new THREE.Color("hsl(0, 0%, 6%)"),
      }),
    []
  );

  const silverMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(200, 5%, 60%)"),
        metalness: 0.8,
        roughness: 0.3,
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
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.2}>
        {/* ===== CABINET — chunky rounded box ===== */}
        <mesh material={bodyMat} position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 2.6, 1.1]} />
        </mesh>
        {/* Front face — darker recessed panel */}
        <mesh material={coneMat} position={[0, 0, 0.52]}>
          <boxGeometry args={[1.5, 2.3, 0.1]} />
        </mesh>
        {/* Thick border/frame around front */}
        <mesh material={bodyMat} position={[0, 0, 0.5]}>
          <boxGeometry args={[1.7, 2.5, 0.06]} />
        </mesh>

        {/* ===== BIG WOOFER — exaggerated cartoony size ===== */}
        {/* Rubber surround */}
        <mesh material={rubberMat} position={[0, -0.35, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.08, 8, 16]} />
        </mesh>
        {/* Cone */}
        <mesh position={[0, -0.35, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.5, 0.25, 16]} />
          <meshToonMaterial color="hsl(200, 8%, 15%)" />
        </mesh>
        {/* Dust cap — big and obvious */}
        <mesh position={[0, -0.35, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.14, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshToonMaterial color="hsl(200, 15%, 12%)" />
        </mesh>
        {/* Glow ring around woofer */}
        <mesh material={glowMat} position={[0, -0.35, 0.57]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.025, 6, 16]} />
        </mesh>

        {/* ===== TWEETER — smaller circle on top ===== */}
        <mesh material={rubberMat} position={[0, 0.6, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.04, 8, 12]} />
        </mesh>
        <mesh position={[0, 0.6, 0.59]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.18, 0.12, 12]} />
          <meshToonMaterial color="hsl(200, 8%, 18%)" />
        </mesh>
        {/* Tweeter dome */}
        <mesh position={[0, 0.6, 0.63]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.06, 6, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="hsl(160, 60%, 50%)" emissive="hsl(160, 60%, 35%)" emissiveIntensity={1} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Glow ring around tweeter */}
        <mesh material={glowMat} position={[0, 0.6, 0.57]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.02, 6, 12]} />
        </mesh>

        {/* ===== VOLUME KNOB — side detail ===== */}
        <mesh material={silverMat} position={[0.92, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 8]} />
        </mesh>
        <mesh material={darkMat} position={[0.97, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 6]} />
        </mesh>

        {/* ===== POWER LED ===== */}
        <mesh position={[0.5, 1.05, 0.58]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="hsl(160, 100%, 55%)" emissive="hsl(160, 100%, 45%)" emissiveIntensity={3} />
        </mesh>

        {/* ===== WIRE / PORT on back ===== */}
        <mesh material={darkMat} position={[0, -0.8, -0.58]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 6]} />
        </mesh>

        {/* ===== FEET — 4 rubber pads ===== */}
        {[
          [-0.65, -1.35, -0.35],
          [0.65, -1.35, -0.35],
          [-0.65, -1.35, 0.35],
          [0.65, -1.35, 0.35],
        ].map(([x, y, z], i) => (
          <mesh key={i} material={rubberMat} position={[x, y, z]}>
            <cylinderGeometry args={[0.1, 0.12, 0.1, 6]} />
          </mesh>
        ))}

        {/* ===== CARTOON OUTLINE — slightly larger wireframe ===== */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.84, 2.64, 1.14]} />
          <meshBasicMaterial color="hsl(0, 0%, 0%)" wireframe />
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
      camera={{ position: [0, 0.5, 4.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false }} // antialias off = more PS1
      dpr={1} // low DPR for that crunchy PSX look
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(160, 50%, 60%)" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(200, 70%, 50%)" />
      <PSXSpeaker scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default PSXSpeakerCanvas;

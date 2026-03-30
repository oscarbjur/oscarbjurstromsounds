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
        color: new THREE.Color("hsl(200, 70%, 55%)"),
        emissive: new THREE.Color("hsl(200, 80%, 40%)"),
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
      <group ref={groupRef} scale={1.1}>
        {/* ===== CABINET — tall rectangular box ===== */}
        {/* Main body */}
        <mesh material={bodyMat} position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 2.8, 1.0]} />
        </mesh>
        {/* Front face plate (slightly recessed look) */}
        <mesh material={coneMat} position={[0, 0, 0.48]}>
          <boxGeometry args={[1.4, 2.6, 0.08]} />
        </mesh>

        {/* ===== WOOFER — large cone, lower section ===== */}
        {/* Woofer surround ring */}
        <mesh material={darkMat} position={[0, -0.45, 0.53]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.06, 8, 1]} />
          <meshStandardMaterial color="hsl(0,0%,5%)" flatShading roughness={0.95} />
        </mesh>
        {/* Woofer cone */}
        <mesh position={[0, -0.45, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.5, 0.2, 8]} />
          <meshStandardMaterial color="hsl(0,0%,12%)" flatShading roughness={0.8} />
        </mesh>
        {/* Woofer dust cap */}
        <mesh position={[0, -0.45, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.1, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="hsl(0,0%,8%)" flatShading roughness={0.9} />
        </mesh>
        {/* Woofer glow ring */}
        <mesh material={glowMat} position={[0, -0.45, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.56, 0.02, 4, 8]} />
        </mesh>

        {/* ===== HORN TWEETERS — top section, two horns ===== */}
        {[-0.22, 0.22].map((xOff) => (
          <group key={xOff} position={[xOff, 0.7, 0.45]}>
            {/* Horn body — flared shape using scaled box */}
            <mesh material={bodyMat}>
              <boxGeometry args={[0.5, 0.22, 0.2]} />
            </mesh>
            {/* Horn flare wings */}
            <mesh material={bodyMat} position={[0, 0.06, 0.05]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.45, 0.04, 0.22]} />
            </mesh>
            <mesh material={bodyMat} position={[0, -0.06, 0.05]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[0.45, 0.04, 0.22]} />
            </mesh>
            {/* Horn center bar */}
            <mesh material={darkMat} position={[0, 0, 0.1]}>
              <boxGeometry args={[0.35, 0.015, 0.08]} />
            </mesh>
          </group>
        ))}

        {/* ===== LABEL PANEL — "PB70" style between horns and woofer ===== */}
        <mesh position={[0, 0.2, 0.53]}>
          <boxGeometry args={[1.0, 0.25, 0.02]} />
          <meshStandardMaterial color="hsl(200,10%,25%)" flatShading roughness={0.5} />
        </mesh>
        {/* Frequency graph panel */}
        <mesh position={[0.25, 0.2, 0.545]}>
          <boxGeometry args={[0.35, 0.15, 0.01]} />
          <meshStandardMaterial color="hsl(0,0%,85%)" flatShading roughness={0.3} />
        </mesh>

        {/* ===== BOTTOM LABEL AREA — "CUBE" style ===== */}
        <mesh position={[0, -1.1, 0.53]}>
          <boxGeometry args={[1.2, 0.3, 0.02]} />
          <meshStandardMaterial color="hsl(200,10%,20%)" flatShading roughness={0.6} />
        </mesh>
        {/* Small spec label */}
        <mesh position={[0.2, -1.1, 0.545]}>
          <boxGeometry args={[0.5, 0.14, 0.01]} />
          <meshStandardMaterial color="hsl(0,0%,85%)" flatShading roughness={0.3} />
        </mesh>

        {/* ===== CORNER SCREWS — 4 screws on front face ===== */}
        {[
          [-0.6, 0.15],
          [0.6, 0.15],
          [-0.6, -0.95],
          [0.6, -0.95],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.54]}>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 6]} />
            <meshStandardMaterial color="hsl(0,0%,30%)" flatShading metalness={0.7} roughness={0.4} />
          </mesh>
        ))}

        {/* ===== CORNER BEVELS — cabinet edge detail ===== */}
        {[
          [-0.8, 0, 0],
          [0.8, 0, 0],
        ].map(([x, y, z], i) => (
          <mesh key={i} material={bodyMat} position={[x, y, z]}>
            <boxGeometry args={[0.04, 2.8, 1.0]} />
          </mesh>
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
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(160, 50%, 60%)" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(200, 70%, 50%)" />
      <PSXSpeaker scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default PSXSpeakerCanvas;

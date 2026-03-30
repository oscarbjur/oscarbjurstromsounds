import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function SmileyBalloon({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const balloonMat = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color("hsl(210, 100%, 65%)") }),
    []
  );

  const blackMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color("hsl(0, 0%, 5%)") }),
    []
  );

  const stringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color("hsl(0, 0%, 30%)") }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.25}>
        {/* Balloon body */}
        <mesh material={balloonMat} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
        </mesh>

        {/* Balloon knot */}
        <mesh material={balloonMat} position={[0, -0.55, 0]}>
          <coneGeometry args={[0.12, 0.2, 6]} />
        </mesh>

        {/* Left eye */}
        <mesh material={blackMat} position={[-0.25, 0.5, 0.72]}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>

        {/* Right eye */}
        <mesh material={blackMat} position={[0.25, 0.5, 0.72]}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>

        {/* Smile — torus arc, flipped to smile upward */}
        <mesh material={blackMat} position={[0, 0.18, 0.75]} rotation={[Math.PI, 0, 0]}>
          <torusGeometry args={[0.25, 0.035, 8, 16, Math.PI]} />
        </mesh>

        {/* String */}
        <mesh material={stringMat} position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1, 4]} />
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
      camera={{ position: [0, 0.3, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false }}
      dpr={1}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(210, 80%, 70%)" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(210, 90%, 60%)" />
      <SmileyBalloon scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default PSXSpeakerCanvas;

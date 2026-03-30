import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function IntroBalloon({ onPop }: { onPop: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef(Date.now());
  const popped = useRef(false);

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
    if (!groupRef.current || popped.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;

    // Float up from below over ~1.5s
    const riseProgress = Math.min(elapsed / 1.5, 1);
    const easedRise = 1 - Math.pow(1 - riseProgress, 3); // ease-out cubic
    const yPos = -5 + easedRise * 5; // from -5 to 0

    groupRef.current.position.y = yPos;
    groupRef.current.rotation.y = elapsed * 0.8;
    groupRef.current.rotation.z = Math.sin(elapsed * 2) * 0.05;

    // Pop at ~2s — inflate then disappear
    if (elapsed > 2 && !popped.current) {
      popped.current = true;
      onPop();
    }

    // Inflate slightly before pop
    if (elapsed > 1.5) {
      const inflateProgress = Math.min((elapsed - 1.5) / 0.5, 1);
      const scale = 1.25 + inflateProgress * 0.4;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} scale={1.25} position={[0, -5, 0]}>
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
      {/* Smile */}
      <mesh material={blackMat} position={[0, 0.18, 0.75]} rotation={[Math.PI, 0, 0]}>
        <torusGeometry args={[0.25, 0.035, 8, 16, Math.PI]} />
      </mesh>
      {/* String */}
      <mesh material={stringMat} position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1, 4]} />
      </mesh>
    </group>
  );
}

function Particles() {
  const points = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    const colors = new Float32Array(60 * 3);
    const color = new THREE.Color("hsl(210, 100%, 65%)");
    for (let i = 0; i < 60; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  const ref = useRef<THREE.Points>(null);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (!ref.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    // Expand outward
    ref.current.scale.setScalar(1 + elapsed * 3);
    // Fade out
    (ref.current.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - elapsed * 1.5);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={60}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={60}
          array={points.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={1} depthWrite={false} />
    </points>
  );
}

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"rising" | "popping" | "done">("rising");

  const handlePop = () => {
    setPhase("popping");
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 600);
  };

  useEffect(() => {
    // Safety timeout — always dismiss after 4s
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-64 h-80">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              style={{ background: "transparent" }}
              gl={{ alpha: true, antialias: false }}
              dpr={1}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[3, 5, 4]} intensity={1.2} color="hsl(210, 80%, 70%)" />
              <pointLight position={[-3, -2, 2]} intensity={0.5} color="hsl(210, 90%, 60%)" />
              {phase === "rising" && <IntroBalloon onPop={handlePop} />}
              {phase === "popping" && <Particles />}
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function WavingRibbon({ position, color, speed, distort, scale }: { position: [number, number, number], color: string, speed: number, distort: number, scale: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.1;
      meshRef.current.rotation.y = t * 0.05 * speed;
      
      const targetX = position[0] + mouse.x * 2;
      const targetY = position[1] + mouse.y * 2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={1}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingPetals() {
  const count = 30;
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.15 + Math.random() * 0.2,
      speed: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <group>
      {petals.map((petal, i) => (
        <Petal key={i} {...petal} />
      ))}
    </group>
  );
}

function Petal({ position, rotation, scale, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.y -= 0.015 * speed;
      ref.current.position.x += Math.sin(t) * 0.01;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.z += 0.01;
      
      if (ref.current.position.y < -12) ref.current.position.y = 12;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 0.8]} />
      <meshBasicMaterial color="#fca5a5" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas alpha shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <color attach="background" args={["#fff7ed"]} />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#fbbf24" />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#f97316" />
        
        <WavingRibbon position={[-5, 3, -2]} color="#fde68a" speed={0.5} distort={0.3} scale={[15, 15, 1]} />
        <WavingRibbon position={[6, -4, -4]} color="#fb923c" speed={0.4} distort={0.4} scale={[18, 18, 1]} />
        <WavingRibbon position={[0, 0, -8]} color="#fef3c7" speed={0.3} distort={0.2} scale={[40, 30, 1]} />
        
        <FloatingPetals />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere position={[4, 4, -2]} scale={2}>
            <meshBasicMaterial color="#ffedd5" transparent opacity={0.3} />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

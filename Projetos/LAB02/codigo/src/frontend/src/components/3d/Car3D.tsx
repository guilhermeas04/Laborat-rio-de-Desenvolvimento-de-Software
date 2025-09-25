import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";

interface CarProps {
  color: string;
  carType: "sedan" | "suv" | "hatchback" | "sports";
}

const Car = ({ color, carType }: CarProps) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const getCarGeometry = () => {
    switch (carType) {
      case "sedan":
        return (
          <group ref={groupRef}>
            {/* Body principal */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[3, 0.8, 1.2]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Teto */}
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[2, 0.8, 1]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Rodas */}
            <mesh position={[-1.2, -0.6, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1.2, -0.6, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[-1.2, -0.6, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1.2, -0.6, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
          </group>
        );
      
      case "suv":
        return (
          <group ref={groupRef}>
            {/* Body principal - mais alto */}
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[3.2, 1.2, 1.4]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Teto */}
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[2.8, 0.6, 1.2]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Rodas maiores */}
            <mesh position={[-1.3, -0.5, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1.3, -0.5, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[-1.3, -0.5, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1.3, -0.5, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
          </group>
        );
      
      case "hatchback":
        return (
          <group ref={groupRef}>
            {/* Body principal - mais compacto */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.5, 0.7, 1.1]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Teto arredondado */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[2.2, 0.6, 0.9]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Rodas */}
            <mesh position={[-1, -0.55, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.18, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1, -0.55, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.18, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[-1, -0.55, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.18, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
            <mesh position={[1, -0.55, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.18, 8]} />
              <meshLambertMaterial {...{ color: "#333" }} />
            </mesh>
          </group>
        );
      
      case "sports":
        return (
          <group ref={groupRef}>
            {/* Body principal - mais baixo e esportivo */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[3.5, 0.6, 1.3]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Cabine baixa */}
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[2, 0.4, 1]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Spoiler */}
            <mesh position={[-1.8, 0.2, 0]}>
              <boxGeometry args={[0.2, 0.3, 1.2]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
            {/* Rodas esportivas */}
            <mesh position={[-1.4, -0.6, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.15, 8]} />
              <meshLambertMaterial {...{ color: "#222" }} />
            </mesh>
            <mesh position={[1.4, -0.6, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.15, 8]} />
              <meshLambertMaterial {...{ color: "#222" }} />
            </mesh>
            <mesh position={[-1.4, -0.6, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.15, 8]} />
              <meshLambertMaterial {...{ color: "#222" }} />
            </mesh>
            <mesh position={[1.4, -0.6, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.15, 8]} />
              <meshLambertMaterial {...{ color: "#222" }} />
            </mesh>
          </group>
        );
      
      default:
        return (
          <group ref={groupRef}>
            <mesh>
              <boxGeometry args={[2, 0.8, 1]} />
              <meshLambertMaterial {...{ color }} />
            </mesh>
          </group>
        );
    }
  };

  return getCarGeometry();
};


interface Car3DProps {
  color: string;
  carType: CarProps["carType"];
  className?: string;
}

const Car3D = ({ color, carType, className }: Car3DProps) => {
  return (
    <div className={className ?? "w-48 h-48 mx-auto animate-fade-in"}>
      <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Car color={color} carType={carType} />
      </Canvas>
    </div>
  );
};

export default Car3D;
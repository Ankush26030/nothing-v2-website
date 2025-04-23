"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import ParticleField from "./ParticleField";

interface ThreeSceneProps {
  controlsEnabled?: boolean;
}

export default function ThreeScene({ controlsEnabled = false }: ThreeSceneProps) {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          {controlsEnabled && <OrbitControls enableZoom={false} />}
          {/* We're removing the NothingBotModel since it's not properly defined */}
          <ParticleField count={200} />
          <Environment preset="sunset" />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#FF5500"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Simple placeholder model component - keeping this for future reference
function NothingBotModel() {
  return null; // Since we don't have an actual 3D model, we'll return null for now
}

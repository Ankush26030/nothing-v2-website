"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, Point } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  radius?: number;
}

export default function ParticleField({
  count = 500,
  size = 0.05,
  color = "#ffffff",
  radius = 10,
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points | null>(null);
  const { x, y } = useMousePosition();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions, velocities };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = positions.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      array[i3] += particles.velocities[i3] * delta * 5;
      array[i3 + 1] += particles.velocities[i3 + 1] * delta * 5;
      array[i3 + 2] += particles.velocities[i3 + 2] * delta * 5;

      const dist = Math.sqrt(
        array[i3] ** 2 + array[i3 + 1] ** 2 + array[i3 + 2] ** 2
      );

      if (dist > radius) {
        array[i3] *= (radius / dist);
        array[i3 + 1] *= (radius / dist);
        array[i3 + 2] *= (radius / dist);

        particles.velocities[i3] *= -0.5;
        particles.velocities[i3 + 1] *= -0.5;
        particles.velocities[i3 + 2] *= -0.5;
      }

      if (x !== null && y !== null) {
        const mouseX = (x / window.innerWidth) * 2 - 1;
        const mouseY = -(y / window.innerHeight) * 2 + 1;

        const mouseVec = new THREE.Vector3(mouseX * 10, mouseY * 10, 0);
        const particleVec = new THREE.Vector3(array[i3], array[i3 + 1], array[i3 + 2]);

        const distance = mouseVec.distanceTo(particleVec);

        if (distance < 5) {
          const repulsion = particleVec.sub(mouseVec).normalize().multiplyScalar(0.01 / (distance + 0.1));

          array[i3] += repulsion.x;
          array[i3 + 1] += repulsion.y;
          array[i3 + 2] += repulsion.z;
        }
      }
    }

    positions.needsUpdate = true;
  });

  return (
    <Points ref={particlesRef} limit={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

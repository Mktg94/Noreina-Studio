"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Particles Mesh ──────────────────────────────────────
function Particles({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate initial positions in a sphere-like distribution
  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles across a wide area
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten Y
      const z = (Math.random() - 0.5) * 3;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
    }
    return [pos, base];
  }, [count]);

  // Sizes for each particle
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 1.5 + 0.5;
    }
    return s;
  }, [count]);

  // Track mouse
  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Listen for mouse moves
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, [handlePointerMove]);

  // Animate every frame
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base organic wave motion
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const waveX = Math.sin(t * 0.3 + by * 0.5) * 0.15;
      const waveY = Math.cos(t * 0.2 + bx * 0.4) * 0.12;
      const waveZ = Math.sin(t * 0.25 + bx * 0.3 + by * 0.3) * 0.1;

      // Mouse repulsion/attraction — particles near cursor push away gently
      const dx = bx - mx * viewport.width * 0.5;
      const dy = by - my * viewport.height * 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3) * 0.4;

      posArray[i3] = bx + waveX + dx * influence * 0.15;
      posArray[i3 + 1] = by + waveY + dy * influence * 0.15;
      posArray[i3 + 2] = bz + waveZ;
    }

    posAttr.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#4a9eff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </points>
  );
}

// ─── Connection Lines ─────────────────────────────────────
function ConnectionLines({ count = 3000 }: { count?: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  // We'll draw lines between nearby particles
  // but we need to share position data — instead do a simple static mesh grid
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const lineCount = 80;
    const positions = new Float32Array(lineCount * 6); // 2 points per line
    const colors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const theta1 = Math.random() * Math.PI * 2;
      const theta2 = theta1 + (Math.random() - 0.5) * 1.5;
      const r1 = 2 + Math.random() * 3;
      const r2 = r1 + (Math.random() - 0.5) * 2;
      const y1 = (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 1.5;

      positions[i6] = Math.cos(theta1) * r1;
      positions[i6 + 1] = y1;
      positions[i6 + 2] = Math.sin(theta1) * r1 * 0.5;

      positions[i6 + 3] = Math.cos(theta2) * r2;
      positions[i6 + 4] = y2;
      positions[i6 + 5] = Math.sin(theta2) * r2 * 0.5;

      // Blue-ish color with varying alpha
      const alpha = Math.random() * 0.3 + 0.05;
      colors[i6] = 0.29 * alpha;
      colors[i6 + 1] = 0.51 * alpha;
      colors[i6 + 2] = 0.96 * alpha;
      colors[i6 + 3] = 0.29 * alpha;
      colors[i6 + 4] = 0.51 * alpha;
      colors[i6 + 5] = 0.96 * alpha;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─── Main Canvas Export ───────────────────────────────────
export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={2500} />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}

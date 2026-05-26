"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function useCanvasVisibility(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return visible;
}

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const P_SEED = 12345;

function Particles({
  count = PARTICLE_COUNT,
  paused = false,
}: {
  count?: number;
  paused?: boolean;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const frameSkip = useRef(0);
  const { viewport } = useThree();

  const [positions, basePositions, colors, sizes] = useMemo(() => {
    const rng = seededRandom(P_SEED);
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = rng();
      const v = rng();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 2.5 + rng() * 4.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      const z = r * Math.cos(phi) * 0.6;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      const t = rng();
      col[i3] = 0.2 + t * 0.25;
      col[i3 + 1] = 0.25 + (1 - t) * 0.35;
      col[i3 + 2] = 0.7 + t * 0.25;
      siz[i] = rng() * 1.8 + 0.4;
    }
    return [pos, base, col, siz];
  }, [count]);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!meshRef.current || paused) return;

    frameSkip.current += 1;
    if (frameSkip.current % 2 !== 0) return;

    if (startTime.current === 0) startTime.current = performance.now();

    const geometry = meshRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const t = (performance.now() - startTime.current) / 1000;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const vw = viewport.width * 0.45;
    const vh = viewport.height * 0.45;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const waveX = Math.sin(t * 0.25 + by * 0.6) * 0.15;
      const waveY = Math.cos(t * 0.2 + bx * 0.5) * 0.12;

      const dx = bx - mx * vw;
      const dy = by - my * vh;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3.5) * 0.35;

      posArray[i3] = bx + waveX + dx * influence * 0.08;
      posArray[i3 + 1] = by + waveY + dy * influence * 0.08;
      posArray[i3 + 2] = bz;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={count} />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.65}
      />
    </points>
  );
}

function Scene({ paused }: { paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles paused={paused} />
    </>
  );
}

interface ParticleFieldProps {
  /** Pause simulation during hero scroll (saves GPU). */
  scrollPaused?: boolean;
}

export default function ParticleField({ scrollPaused = false }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useCanvasVisibility(containerRef);
  const paused = !visible || scrollPaused;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.25]}
        frameloop={paused ? "never" : "always"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene paused={paused} />
      </Canvas>
    </div>
  );
}

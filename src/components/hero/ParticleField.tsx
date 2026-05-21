"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Visibility context for pausing when off-screen ──────
function useCanvasVisibility(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return visible;
}

// ─── Particles Mesh ──────────────────────────────────────
function Particles({ count = 1500, paused = false }: { count?: number; paused?: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate initial positions in a sphere-like distribution
  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
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

  // Animate every frame — skip when paused (off-screen)
  useFrame(({ clock }) => {
    if (!meshRef.current || paused) return;

    const geometry = meshRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const vw = viewport.width * 0.5;
    const vh = viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const waveX = Math.sin(t * 0.3 + by * 0.5) * 0.15;
      const waveY = Math.cos(t * 0.2 + bx * 0.4) * 0.12;
      const waveZ = Math.sin(t * 0.25 + bx * 0.3 + by * 0.3) * 0.1;

      const dx = bx - mx * vw;
      const dy = by - my * vh;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3) * 0.4;

      posArray[i3] = bx + waveX + dx * influence * 0.15;
      posArray[i3 + 1] = by + waveY + dy * influence * 0.15;
      posArray[i3 + 2] = bz + waveZ;
    }

    posAttr.needsUpdate = true;

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
function ConnectionLines({ paused = false }: { paused?: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const lineCount = 60;
    const positions = new Float32Array(lineCount * 6);
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
    if (!lineRef.current || paused) return;
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

// ─── Scene wrapper that receives paused state ─────────────
function Scene({ paused }: { paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles count={1500} paused={paused} />
      <ConnectionLines paused={paused} />
    </>
  );
}

// ─── Main Canvas Export ───────────────────────────────────
export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useCanvasVisibility(containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene paused={!visible} />
      </Canvas>
    </div>
  );
}

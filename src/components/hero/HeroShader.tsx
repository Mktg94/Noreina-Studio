"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   Holographic Plasma Shader — 2027 Edition
   Domain-warped FBM · Iridescent palette · Mouse ripples
   Holographic grid · Scan sweep · Chromatic aberration
   ───────────────────────────────────────────────────────── */

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uResolution;

varying vec2 vUv;

/* ── Simplex 2D ─────────────────────────────────────── */
vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,
                      -0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))
                           +i.x+vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0),
                           dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x  = 2.0*fract(p*C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x*x0.x  + h.x*x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.0*dot(m,g);
}

/* ── FBM with octave rotation ───────────────────────── */
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8,0.6,-0.6,0.8);
  for(int i=0;i<6;i++){ v += a*snoise(p); p = rot*p*2.0; a *= 0.5; }
  return v;
}

/* ── Iridescent cosine palette ──────────────────────── */
vec3 palette(float t){
  vec3 a = vec3(0.5,0.5,0.5);
  vec3 b = vec3(0.5,0.5,0.5);
  vec3 c = vec3(1.0,1.0,1.0);
  vec3 d = vec3(0.263,0.416,0.557);
  return a + b*cos(6.28318*(c*t+d));
}

void main(){
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  /* Mouse */
  vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0) * 0.3;
  float mDist = length(p - mouse);
  float mInfl = smoothstep(0.6, 0.0, mDist);

  float t = uTime * 0.05;

  /* Domain warping — 3 layers */
  float w1 = fbm(p*1.2 + vec2( t*0.3,  t*0.2));
  float w2 = fbm(p*1.8 + w1*0.5 + vec2(-t*0.2, t*0.3));
  float w3 = fbm(p*2.2 + w2*0.4 + vec2( t*0.15,-t*0.2));

  /* Mouse ripple */
  w3 += sin(mDist*12.0 - uTime*2.0) * mInfl * 0.08;

  /* Color layers */
  vec3 deep    = vec3(0.015, 0.010, 0.035);
  vec3 navy    = vec3(0.05,  0.08,  0.20);
  vec3 blue    = vec3(0.12,  0.30,  0.90);
  vec3 purple  = vec3(0.50,  0.12,  0.85);
  vec3 cyan    = vec3(0.03,  0.55,  0.80);
  vec3 magenta = vec3(0.75,  0.10,  0.55);

  vec3 col = deep;
  col = mix(col, navy,    smoothstep(-0.5,0.3, w1)*0.60);
  col = mix(col, blue,    smoothstep(-0.3,0.6, w1)*0.30);
  col = mix(col, purple,  smoothstep(-0.1,0.7, w2)*0.22);
  col = mix(col, cyan,    smoothstep( 0.1,0.8, w3)*0.15);
  col = mix(col, magenta, smoothstep( 0.3,0.9, w1*w2)*0.06);

  /* Iridescent highlight */
  col += palette(w3*0.4 + t*0.08) * smoothstep(0.4,1.0, w3) * 0.05;

  /* Holographic grid (appears only in noise-bright zones) */
  vec2 grid = abs(fract(uv * 50.0) - 0.5);
  float gLine = smoothstep(0.48,0.5, max(grid.x, grid.y));
  col += vec3(0.3,0.5,1.0) * gLine * smoothstep(0.2,0.6, w2+0.5) * 0.02;

  /* Horizontal scan sweep */
  float scanY = fract(uTime * 0.07);
  float sDist = abs(uv.y - scanY);
  col += vec3(0.3,0.6,1.0) * (smoothstep(0.012,0.0,sDist)*0.12
                              + smoothstep(0.05, 0.0,sDist)*0.03);

  /* CRT micro-scanlines */
  col *= 0.98 + sin(uv.y * uResolution.y * 0.5)*0.02;

  /* Energy pulses from center */
  float cDist = length(p);
  float p1 = sin(cDist*6.0 - uTime*1.2)*0.5+0.5;
  float p2 = sin(cDist*4.0 - uTime*0.8+1.5)*0.5+0.5;
  col += vec3(0.1,0.25,0.7) * p1 * smoothstep(1.2,0.0,cDist) * 0.03;
  col += vec3(0.4,0.1, 0.6) * p2 * smoothstep(1.5,0.2,cDist) * 0.02;

  /* Mouse glow */
  col += vec3(0.3,0.5,1.0) * smoothstep(0.4,0.0,mDist) * 0.06;

  /* Sparkle */
  float sp = snoise(uv*100.0 + t*2.5);
  col += smoothstep(0.94,1.0,sp) * 0.18;

  /* Chromatic aberration at edges */
  float chroma = smoothstep(0.3,1.0,cDist) * 0.015;
  col.r += fbm(p*3.0+0.05+t*0.08) * chroma;
  col.b += fbm(p*3.0-0.05+t*0.08) * chroma * 1.2;

  /* Vignette */
  float vig = smoothstep(0.0,1.0, 1.0 - cDist*0.45);
  col *= vig;

  col *= 0.65;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── R3F Shader Mesh ──────────────────────────────── */
function HoloMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
    }),
    []
  );

  /* Keep resolution in sync */
  useEffect(() => {
    uniforms.uResolution.value.set(size.width * window.devicePixelRatio,
                                    size.height * window.devicePixelRatio);
  }, [size, uniforms]);

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uMouse.value.lerp(mouseTarget.current, 0.03);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Main Export ───────────────────────────────────── */
export default function HeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0, rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <HoloMesh />
      </Canvas>
    </div>
  );
}

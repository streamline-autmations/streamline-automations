/**
 * EngineScene — ambient version of the /lab Engine/Core for the PreFooterCTA.
 * A dim glowing core with particle streams flowing in → out behind the
 * headline. No EffectComposer/bloom here (it's a backdrop, not the hero of
 * the page) — emissive surfaces + additive particles + fog carry the glow at
 * a fraction of the GPU cost.
 *
 * progressRef = how far the section has travelled through the viewport
 * (0 entering → 1 leaving). The engine spins up as the CTA arrives.
 */
import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { AdditiveBlending } from 'three';
import type { BufferGeometry, Group, Mesh, MeshStandardMaterial } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const ACCENT = '#7B3FE4';
const INK = '#0A0A0F';

function Stream({
  count,
  direction,
  color,
  opacity,
  size,
  progressRef,
}: {
  count: number;
  direction: 'in' | 'out';
  color: string;
  opacity: number;
  size: number;
  progressRef: MutableRefObject<number>;
}) {
  const geomRef = useRef<BufferGeometry>(null);

  const data = useMemo(() => {
    const progress = new Float32Array(count);
    const speed = new Float32Array(count);
    const angle = new Float32Array(count);
    const radius = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      progress[i] = Math.random();
      speed[i] = 0.1 + Math.random() * 0.14;
      angle[i] = Math.random() * Math.PI * 2;
      radius[i] = 0.3 + Math.random() * 1.6;
    }
    return { progress, speed, angle, radius };
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((_, delta) => {
    const geom = geomRef.current;
    if (!geom) return;
    // Engine spins up as the section crosses the middle of the viewport.
    const flow = 0.5 + progressRef.current * 1.8;
    const dirIn = direction === 'in';
    for (let i = 0; i < count; i++) {
      let p = data.progress[i] + delta * data.speed[i] * flow;
      if (p >= 1) p -= 1;
      data.progress[i] = p;
      const x = dirIn ? -10 + p * 10 : p * 10;
      const taper = dirIn ? 1 - p * 0.85 : 0.15 + p * 0.85;
      const ang = data.angle[i] + p * 2.6;
      const r = data.radius[i] * taper;
      positions[i * 3] = x;
      positions[i * 3 + 1] = Math.cos(ang) * r;
      positions[i * 3 + 2] = Math.sin(ang) * r;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Engine({
  progressRef,
  corePos,
  drift,
}: {
  progressRef: MutableRefObject<number>;
  corePos: [number, number, number];
  drift: boolean;
}) {
  const orbRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  // drei's MeshDistortMaterial = MeshStandardMaterial + a distort uniform
  const matRef = useRef<(MeshStandardMaterial & { distort: number }) | null>(null);
  // World-space x of the travelling orb; starts at its classic corner anchor.
  const travelX = useRef(corePos[0]);

  useFrame((state, delta) => {
    const t = progressRef.current;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (0.1 + t * 0.45);
      coreRef.current.rotation.x += delta * 0.04;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.05;
      shellRef.current.rotation.z += delta * 0.02;
    }
    if (matRef.current) {
      matRef.current.distort = 0.16 + t * 0.24;
      matRef.current.emissiveIntensity = 0.5 + t * 0.5;
    }
    if (drift && orbRef.current) {
      const e = state.clock.elapsedTime;
      const o = orbRef.current;
      // Carried downstream: constant slow travel left → right (a touch faster
      // as the section centres, like the particle flow), wrapping back to the
      // left once fully past the right edge. The wrap point sits beyond the
      // viewport AND beyond the fog's far plane, so the orb dissolves into the
      // dark before it jumps — no visible pop. 1.14 = depth correction from
      // the camera-at-8.5 viewport to the orb plane at z ≈ -1.2.
      const edge = (state.viewport.width / 2) * 1.14 + 2.4;
      // Clamp delta — the frameloop halts off-screen and the first frame back
      // would otherwise teleport the orb.
      travelX.current += Math.min(delta, 0.1) * (0.55 + t * 0.3);
      if (travelX.current > edge) travelX.current = -edge;
      o.position.x = travelX.current - corePos[0];
      // Cross-stream bob + a slight roll leaning into the travel keep it
      // feeling buoyant rather than conveyor-belted. Transform-only.
      o.position.y = Math.sin(e * 0.21 + 1.7) * 0.22;
      o.position.z = Math.cos(e * 0.11) * 0.3;
      o.rotation.z = -0.05 + Math.cos(e * 0.14) * -0.04;
    }
  });

  return (
    <group position={corePos}>
      <ambientLight intensity={0.12} />
      <pointLight color={ACCENT} intensity={40} position={[3, 2, 4]} />
      <pointLight color="#6930D0" intensity={20} position={[-4, -2, 3]} />

      {/* Core + shell ride together; the streams stay anchored to the axis so
          the orb travels through them, not with them. */}
      <group ref={orbRef}>
        {/* Core — emissive carries the glow (no bloom pass back here) */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.0, 6]} />
          <MeshDistortMaterial
            ref={matRef}
            color="#14092E"
            emissive={ACCENT}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.3}
            distort={0.16}
            speed={1.4}
          />
        </mesh>

        <mesh ref={shellRef} scale={1.5}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.09} />
        </mesh>
      </group>

      {/* enquiries in → bookings out, same story as /lab */}
      <Stream count={1200} direction="in" color="#9D6FF0" opacity={0.65} size={0.055} progressRef={progressRef} />
      <Stream count={1200} direction="out" color="#E9DFFF" opacity={0.8} size={0.06} progressRef={progressRef} />
    </group>
  );
}

export default function EngineScene({
  progressRef,
  active,
  corePos = [0, 0.2, 0],
  drift = false,
}: {
  progressRef: MutableRefObject<number>;
  active: boolean;
  /** Where the core (and its stream axis) sits — lets each surface keep the
   *  engine clear of its text column. */
  corePos?: [number, number, number];
  /** Let the stream carry the orb: slow continuous left→right travel across
   *  the full view, wrapping off-screen back to the left. */
  drift?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Fog fades stream ends into the section's ink background */}
      <fog attach="fog" args={[INK, 6, 15]} />
      <Engine progressRef={progressRef} corePos={corePos} drift={drift} />
    </Canvas>
  );
}

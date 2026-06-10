/**
 * HeroScene — the homepage "liquid core": a glossy purple distort-material orb
 * with a tilted orbiting particle ring and a soft contact shadow, floating on
 * the white canvas. Transparent WebGL canvas — the page itself is the bg.
 *
 * Inputs (from HeroVisual):
 * - progressRef: hero scroll progress 0→1 (GSAP ScrollTrigger). The orb morphs
 *   harder, spins faster, lifts and shrinks slightly as you scroll away.
 * - active: frameloop gate — when the hero is off-screen we render nothing.
 *
 * Mouse parallax reads window-level pointer position (not canvas pointer —
 * the canvas only covers the right half of the hero).
 */
import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { MathUtils } from 'three';
import type { BufferGeometry, Group, Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, MeshDistortMaterial } from '@react-three/drei';

const ACCENT = '#7B3FE4';

function ParticleRing({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const COUNT = 420;
  const geomRef = useRef<BufferGeometry>(null);

  // Per-particle orbit: angle, radius band around the orb, tiny y scatter.
  const data = useMemo(() => {
    const angle = new Float32Array(COUNT);
    const radius = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const yoff = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      angle[i] = Math.random() * Math.PI * 2;
      radius[i] = 2.15 + Math.random() * 0.85;
      speed[i] = 0.12 + Math.random() * 0.25;
      yoff[i] = (Math.random() - 0.5) * 0.35;
    }
    return { angle, radius, speed, yoff };
  }, []);

  const positions = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame((_, delta) => {
    const geom = geomRef.current;
    if (!geom) return;
    const t = progressRef.current;
    for (let i = 0; i < COUNT; i++) {
      data.angle[i] += delta * data.speed[i] * (0.5 + t * 1.4);
      positions[i * 3] = Math.cos(data.angle[i]) * data.radius[i];
      positions[i * 3 + 1] = data.yoff[i];
      positions[i * 3 + 2] = Math.sin(data.angle[i]) * data.radius[i];
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    // Tilted so the ring reads as an ellipse sweeping behind/in front of the orb
    <points rotation={[-0.55, 0, 0.35]}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ACCENT} size={0.035} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function LiquidCore({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const groupRef = useRef<Group>(null);
  const orbRef = useRef<Mesh>(null);
  const matRef = useRef<any>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Window-level pointer → normalized -1..1 (canvas only spans half the hero).
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    const orb = orbRef.current;
    if (!g || !orb) return;
    const t = progressRef.current;
    const { x: mx, y: my } = mouse.current;

    // Lazy lerp toward the pointer — the float that makes it feel alive.
    g.position.x = MathUtils.lerp(g.position.x, mx * 0.35, 0.05);
    g.position.y = MathUtils.lerp(g.position.y, -my * 0.28 + t * 0.5, 0.05);
    g.rotation.x = MathUtils.lerp(g.rotation.x, my * 0.16, 0.05);
    g.rotation.y = MathUtils.lerp(g.rotation.y, mx * 0.22, 0.05);

    // Scroll response: recede + morph harder while the hero leaves.
    g.scale.setScalar(1 - t * 0.16);
    orb.rotation.y += delta * (0.16 + t * 0.5);
    if (matRef.current) matRef.current.distort = 0.32 + t * 0.2;
  });

  return (
    <>
      {/* Bright, soft studio light — the orb must read glossy on pure white */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.7} />
      <pointLight color="#B794F6" position={[-5, -2, 4]} intensity={18} />
      <pointLight color="#FFFFFF" position={[-4, 4, -5]} intensity={20} />

      <group ref={groupRef}>
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[1.5, 6]} />
          {/* MeshPhysical-based: clearcoat gives the wet-gloss highlight */}
          <MeshDistortMaterial
            ref={matRef}
            color={ACCENT}
            roughness={0.16}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.18}
            distort={0.32}
            speed={1.5}
          />
        </mesh>
        <ParticleRing progressRef={progressRef} />
      </group>

      {/* Soft ground shadow sells "object in a room" on the white page */}
      <ContactShadows position={[0, -2.3, 0]} opacity={0.24} scale={9} blur={2.8} far={3.4} resolution={512} color="#2A1454" />
    </>
  );
}

export default function HeroScene({
  progressRef,
  active,
}: {
  progressRef: MutableRefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      // 'never' fully halts rendering when the hero is off-screen
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <LiquidCore progressRef={progressRef} />
    </Canvas>
  );
}

/**
 * LabScene — scroll-driven 3D "Engine / Core" test.
 *
 * How the scroll mechanic works (the thing this lab exists to teach):
 * - <ScrollControls pages={3}> builds its own invisible scroll container that is
 *   3 viewports tall. The canvas itself never moves — only a number does:
 *   scroll.offset, which goes 0 → 1 as you scroll from top to bottom.
 *   damping={0.25} makes that number ease toward the real scrollbar position,
 *   which is what gives the "plays like a video" feel.
 * - useScroll() reads that offset anywhere inside ScrollControls.
 * - useFrame() runs once per rendered frame (~60fps). Inside it we map
 *   scroll.offset onto camera z, core distortion, particle speed and bloom.
 *   Nothing is keyframed — scroll IS the timeline.
 *
 * PROD INTEGRATION: when this moves into the real Lenis-driven homepage,
 * ScrollControls CANNOT be used — it owns its own scroll container and would
 * fight Lenis. Instead: create a GSAP ScrollTrigger on the hero section
 * (scrub: true, pinType: 'transform'), let its onUpdate write self.progress
 * (0→1) into a ref/zustand store, and pass that value into this scene as a
 * prop. The useFrame logic below stays identical — it just reads the prop
 * instead of useScroll().offset. ScrollControls works here ONLY because /lab
 * is isolated from the global Lenis scroll.
 */
import { useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { AdditiveBlending, MathUtils } from 'three';
import type { BufferGeometry, Group, Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const ACCENT = '#7B3FE4';
const INK = '#0A0A0F';

type ScrollApi = ReturnType<typeof useScroll>;

/**
 * One stream of instanced points. "in" flows from off-screen left toward the
 * core and funnels tighter as it approaches; "out" leaves the core to the
 * right and spreads. One draw call per stream — never one mesh per particle.
 */
function ParticleStream({
  count,
  direction,
  color,
  opacity,
  size,
}: {
  count: number;
  direction: 'in' | 'out';
  color: string;
  opacity: number;
  size: number;
}) {
  const geomRef = useRef<BufferGeometry>(null);
  const scroll = useScroll();

  // Static per-particle data: where it is along the path (progress 0→1),
  // how fast it moves, and its scatter around the stream axis.
  const data = useMemo(() => {
    const progress = new Float32Array(count);
    const speed = new Float32Array(count);
    const angle = new Float32Array(count);
    const radius = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      progress[i] = Math.random();
      speed[i] = 0.14 + Math.random() * 0.16;
      angle[i] = Math.random() * Math.PI * 2;
      radius[i] = 0.35 + Math.random() * 1.9;
    }
    return { progress, speed, angle, radius };
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((_, delta) => {
    const geom = geomRef.current;
    if (!geom) return;
    // Flow accelerates as you scroll — the engine "spins up".
    const flow = 0.55 + scroll.offset * 2.4;
    const dirIn = direction === 'in';
    for (let i = 0; i < count; i++) {
      let p = data.progress[i] + delta * data.speed[i] * flow;
      if (p >= 1) p -= 1;
      data.progress[i] = p;
      // x walks the stream; radius tapers INTO the core, expands OUT of it.
      const x = dirIn ? -9 + p * 9 : p * 9;
      const taper = dirIn ? 1 - p * 0.88 : 0.12 + p * 0.88;
      const ang = data.angle[i] + p * 3; // gentle spiral around the axis
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

/** The core, its wireframe shell, both particle streams, lights and bloom. */
function Engine() {
  const scroll = useScroll();
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  // drei's MeshDistortMaterial exposes .distort; postprocessing's Bloom
  // exposes .intensity — both are safe to mutate per frame (no React re-render).
  const distortRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);

  useEffect(() => {
    const el = scroll.el;
    if (!el) return;
    // The site's root LenisProvider hijacks wheel events on window. This
    // attribute tells Lenis to leave ScrollControls' nested scroller alone.
    el.setAttribute('data-lenis-prevent', '');
    // Hide the scrollbar — this should read like a video, not a page.
    el.style.setProperty('scrollbar-width', 'none');
  }, [scroll]);

  useFrame((state, delta) => {
    // scroll.offset is 0 at the top, 1 after 3 pages — already damped, so
    // everything driven from it inherits the smooth video feel for free.
    const t = scroll.offset;

    // Camera dolly: glide from wide (z 9.5) into the core (z 4.6).
    state.camera.position.z = MathUtils.lerp(9.5, 4.6, t);
    state.camera.position.y = MathUtils.lerp(0.6, 0, t);
    state.camera.lookAt(0, 0, 0);

    // Drift the whole engine sideways so it never sits under the text:
    // right of the left-aligned beat 1 → left of the right-aligned beat 2 →
    // dead centre for the final centred beat. range() is linear 0→1 over the
    // window, and damping smooths the motion.
    if (groupRef.current) {
      groupRef.current.position.x =
        1.4 - 2.7 * scroll.range(0.15, 0.35) + 1.3 * scroll.range(0.62, 0.3);
      // Lift the core toward the end so the final centred beat + CTA sit
      // beneath it instead of on top of it.
      groupRef.current.position.y = 1.75 * scroll.range(0.7, 0.3);
    }

    // Core spins faster and distorts harder as the engine spins up.
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (0.12 + t * 0.55);
      coreRef.current.rotation.x += delta * 0.05;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.06;
      shellRef.current.rotation.z += delta * 0.02;
    }
    if (distortRef.current) {
      distortRef.current.distort = 0.18 + t * 0.3;
      distortRef.current.emissiveIntensity = 0.35 + t * 0.45;
    }
    // Small bloom ramp at the end — the payoff as you arrive at the core.
    if (bloomRef.current) {
      bloomRef.current.intensity = 0.55 + t * 0.65;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lights: purple key + deeper purple fill + cool rim. No env map needed —
          emissive + bloom carry the glow. */}
      <ambientLight intensity={0.15} />
      <pointLight color={ACCENT} intensity={60} position={[3.5, 2, 4]} />
      <pointLight color="#6930D0" intensity={30} position={[-4, -2.5, 3]} />
      <directionalLight color="#F5F5F7" intensity={1.4} position={[-5, 4, -3]} />

      {/* The glowing core — slow morph via MeshDistortMaterial */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, 6]} />
        <MeshDistortMaterial
          ref={distortRef}
          color="#14092E"
          emissive={ACCENT}
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.35}
          distort={0.18}
          speed={1.6}
        />
      </mesh>

      {/* Faceted wireframe shell — counter-rotates for a sense of machinery */}
      <mesh ref={shellRef} scale={1.45}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.1} />
      </mesh>

      {/* Enquiries in (muted purple) → bookings out (light purple tint) */}
      <ParticleStream count={1200} direction="in" color="#9D6FF0" opacity={0.75} size={0.045} />
      <ParticleStream count={1200} direction="out" color="#E9DFFF" opacity={0.8} size={0.05} />

      {/* Bloom is the whole "premium glow" trick: anything brighter than the
          luminance threshold bleeds light. Kept restrained — intensity ramps
          slightly with scroll in useFrame above. */}
      <EffectComposer multisampling={4}>
        <Bloom
          ref={bloomRef}
          intensity={0.55}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.75}
        />
      </EffectComposer>
    </group>
  );
}

/**
 * One HTML text beat, pinned over the canvas by <Scroll html>.
 * useFrame works in here too (drei bridges the R3F context into the HTML
 * portal), so opacity/translate update every frame in sync with the damped
 * scroll — that's what makes the text feel glued to the 3D motion.
 */
function Beat({
  eyebrow,
  fade,
  justify,
  center,
  cta,
  children,
}: {
  eyebrow: string;
  /** Maps scroll state → visibility 0..1 for this beat */
  fade: (s: ScrollApi) => number;
  justify: string;
  center?: boolean;
  cta?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useScroll();

  useFrame(() => {
    const el = ref.current;
    if (!el) return;
    const v = fade(scroll);
    el.style.opacity = v.toFixed(3);
    el.style.transform = `translateY(${((1 - v) * 28).toFixed(2)}px)`;
  });

  return (
    <section className={`flex h-[100svh] w-full items-center px-6 md:px-24 ${justify}`}>
      <div
        ref={ref}
        className={`max-w-xl will-change-transform ${center ? 'text-center' : ''}`}
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-site-accent">
          {eyebrow}
        </p>
        <h2 className="mt-5 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-site-text-on-dark md:text-6xl">
          {children}
        </h2>
        {cta && (
          // Plain <a>, not <Link> — <Scroll html> renders in its own React
          // root, so the Router context doesn't reach in here.
          <a
            href="/contact"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-site-accent px-8 font-sans text-sm font-medium text-white transition-colors duration-300 ease-brand hover:bg-site-accent-hover"
          >
            Book a Free Call
          </a>
        )}
      </div>
    </section>
  );
}

export default function LabScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        // Cap device-pixel-ratio: retina sharpness without 4k-canvas GPU cost.
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9.5], fov: 42 }}
      >
        <color attach="background" args={[INK]} />
        {/* Fog fades the far ends of the particle streams into the ink bg */}
        <fog attach="fog" args={[INK, 7, 18]} />

        {/* 3 pages of virtual scroll; damping eases offset toward the real
            scroll position — the core of the video-like feel. */}
        <ScrollControls pages={3} damping={0.25}>
          <Engine />

          {/* HTML beats scroll normally over the fixed canvas. Each section is
              one viewport tall, so beat N owns page N. Beats fade on a curve
              around their page (offset: page0≈0, page1≈0.5, page2≈1 — offset
              measures scrolled distance over 2 scrollable viewports). */}
          <Scroll html style={{ width: '100%' }}>
            <Beat
              eyebrow="The Problem"
              justify="justify-start"
              fade={(s) => 1 - s.range(0.08, 0.26)}
            >
              Enquiries come in. Most of them leak out.
            </Beat>
            <Beat
              eyebrow="The Fix"
              justify="justify-end"
              fade={(s) => s.curve(0.3, 0.42)}
            >
              Streamline is the{' '}
              <em className="font-serif italic text-site-accent">engine</em>{' '}
              that runs your business.
            </Beat>
            <Beat
              eyebrow="The Result"
              justify="justify-center"
              center
              cta
              fade={(s) => s.range(0.76, 0.16)}
            >
              Bookings out. Revenue up. Nothing dropped.
            </Beat>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

/**
 * GatherScene — the PreFooterCTA "gathering network": the hero's automation
 * node graph re-composed as a wide cluster centred behind the "Have an idea?"
 * headline. Same material language as HeroScene (matte purple/ink/white
 * spheres + faceted icosahedra, one iridescent glass focal, bright instanced
 * packets) so hero → journey → CTA reads as one system.
 *
 * Three states, driven from GatherBackdrop:
 * 1. SCROLL-IN GATHER — gatherRef 0→1 (GSAP ScrollTrigger, Lenis-synced).
 *    Nodes + dust drift in from outside the frame and converge; threads draw
 *    between them; packets start flowing as assembly completes. Pure function
 *    of progress, so scrolling back up re-disperses it.
 * 2. AT REST + CURSOR — gentle pulse, continuous packet routing, the cluster
 *    drifts/tilts toward the pointer, and the dust field parts around a soft
 *    gravity well under the cursor.
 * 3. CTA HOVER BURST — burstSignal increments → a ripple of bright particles
 *    fires outward from the centre, packet flow surges, the cluster pops a
 *    few percent, then everything settles.
 *
 * Opaque ink canvas (matches the section bg) so the Bloom pass renders clean —
 * same pattern as JourneyScene. Glow earns its keep on dark.
 */
import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Color, MathUtils, Object3D, Vector3 } from 'three';
import type { Group, InstancedMesh, LineSegments, Mesh, MeshStandardMaterial } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { gsap } from '../../lib/gsap';

/** Swap the cluster's glass centre for a single matte core sphere (off = network cluster). */
const USE_CORE_SPHERE = false;

const PURPLE = '#7B3FE4';
const PURPLE_DEEP = '#5B2BB8';
const PURPLE_SOFT = '#B596F0';
const INK = '#15151C';
const INK_BG = '#0A0A0F';
const WHITE = '#F4F3F7';
const GREY = '#D6D6DE';

type NodeKind = 'sphere' | 'ico' | 'glass';

interface NodeDef {
  p: [number, number, number];
  r: number;
  color?: string;
  kind: NodeKind;
  rough?: number;
}

const CENTRE: NodeDef = USE_CORE_SPHERE
  ? { p: [0, -0.1, 0], r: 1.05, color: PURPLE_DEEP, kind: 'sphere', rough: 0.72 }
  : { p: [0, -0.1, 0], r: 0.5, kind: 'glass' };

// Hand-placed wide ellipse so the cluster frames the centred CTA instead of
// stacking behind it. Asymmetric on purpose — composed, not generated.
const NODES: NodeDef[] = [
  CENTRE, // 0 — focal
  { p: [2.1, 1.15, -0.8], r: 0.6, color: PURPLE_DEEP, kind: 'sphere', rough: 0.75 }, // 1
  { p: [-2.35, 0.9, -0.5], r: 0.48, color: WHITE, kind: 'sphere', rough: 0.6 }, // 2
  { p: [1.45, -1.3, 0.3], r: 0.4, color: PURPLE, kind: 'sphere', rough: 0.7 }, // 3
  { p: [-1.55, -1.15, -0.2], r: 0.38, color: INK, kind: 'ico', rough: 0.65 }, // 4
  { p: [3.5, -0.45, -0.3], r: 0.28, color: INK, kind: 'sphere', rough: 0.7 }, // 5
  { p: [-3.55, -0.35, -0.9], r: 0.3, color: PURPLE, kind: 'ico', rough: 0.7 }, // 6
  { p: [0.85, 1.75, -1.2], r: 0.24, color: INK, kind: 'sphere', rough: 0.7 }, // 7
  { p: [-0.9, -1.95, -0.7], r: 0.26, color: GREY, kind: 'sphere', rough: 0.65 }, // 8
  { p: [-0.5, 1.05, 0.7], r: 0.16, color: PURPLE_SOFT, kind: 'sphere', rough: 0.6 }, // 9
  { p: [4.35, 1.4, -1.8], r: 0.16, color: PURPLE, kind: 'sphere', rough: 0.7 }, // 10
  { p: [-4.3, 1.25, -1.6], r: 0.15, color: GREY, kind: 'ico', rough: 0.65 }, // 11
  { p: [2.85, -1.85, -1.2], r: 0.14, color: PURPLE_SOFT, kind: 'sphere', rough: 0.6 }, // 12
  { p: [-3.05, -1.75, -1.5], r: 0.17, color: INK, kind: 'sphere', rough: 0.7 }, // 13
];

// Hub-and-spoke through the focal, never a mesh soup.
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 9],
  [1, 5], [1, 7], [2, 6], [2, 9], [3, 5],
  [3, 8], [4, 8], [4, 6], [1, 10], [6, 11],
  [3, 12], [8, 13], [5, 12], [2, 11], [7, 10],
];

const PACKET_COUNT = 6;
const DUST_COUNT = 80;
const BURST_COUNT = 26;

const clamp01 = (v: number) => MathUtils.clamp(v, 0, 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// slight overshoot so nodes "pop" into place at the end of the gather
const easeOutBack = (t: number) =>
  1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
/** Deterministic 0..1 — no Math.random, the gather must be replayable. */
const seeded = (i: number, k: number) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Where each node gathers FROM: pushed out past the frame along its own
// bearing from centre (radius ~9–11 in xy) + a small deterministic scatter,
// so everything converges inward from the section's edges.
const SCATTER: [number, number, number][] = NODES.map((n, i) => {
  const len = Math.hypot(n.p[0], n.p[1]) || 0.4;
  const push = (9 + (i % 3) * 1.1) / len;
  return [
    n.p[0] * push + Math.sin(i * 12.9898) * 1.4,
    n.p[1] * push + Math.cos(i * 78.233) * 1.2,
    n.p[2] - 2.2,
  ];
});

/** Per-node staggered gather progress (focal first, rim last). */
function nodeGatherT(i: number, g: number) {
  return clamp01((g - (i / NODES.length) * 0.35) / 0.65);
}

/** Current in-flight position of node i — shared so threads track flying nodes. */
function nodeGatherPos(i: number, g: number, out: Vector3) {
  const t = easeOutCubic(nodeGatherT(i, g));
  const s = SCATTER[i];
  const e = NODES[i].p;
  return out.set(
    MathUtils.lerp(s[0], e[0], t),
    MathUtils.lerp(s[1], e[1], t),
    MathUtils.lerp(s[2], e[2], t)
  );
}

/** Burst progress — t runs 0→1 per CTA hover; 1 = settled/hidden. */
interface BurstState {
  t: number;
}

/** Short-lived "pop" envelope: rises fast, decays over the burst. */
const burstEnergy = (b: BurstState) => (1 - b.t) * clamp01(b.t * 6);

/** Window-level pointer in NDC (-1..1, y up). Coarse pointers never move it. */
function usePointer() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
}

/** Hairline threads — endpoints track gathering nodes, then snap and settle. */
function Edges({ gatherRef }: { gatherRef: MutableRefObject<number> }) {
  const pos = useMemo(() => {
    const arr = new Float32Array(EDGES.length * 6);
    EDGES.forEach(([a, b], i) => {
      arr.set(NODES[a].p, i * 6);
      arr.set(NODES[b].p, i * 6 + 3);
    });
    return arr;
  }, []);
  const ref = useRef<LineSegments>(null);
  const va = useMemo(() => new Vector3(), []);
  const vb = useMemo(() => new Vector3(), []);
  const settled = useRef(false);

  useFrame(() => {
    const line = ref.current;
    if (!line) return;
    const g = gatherRef.current;
    const mat = line.material as { opacity: number };
    if (g < 1) {
      // draw each thread hub-end → far node with a soft per-edge stagger,
      // both ends tracking nodes still in flight
      settled.current = false;
      EDGES.forEach(([a, b], i) => {
        nodeGatherPos(a, g, va);
        nodeGatherPos(b, g, vb);
        const t = easeOutCubic(clamp01((g - 0.5 - i * 0.012) / 0.42));
        pos[i * 6] = va.x;
        pos[i * 6 + 1] = va.y;
        pos[i * 6 + 2] = va.z;
        pos[i * 6 + 3] = MathUtils.lerp(va.x, vb.x, t);
        pos[i * 6 + 4] = MathUtils.lerp(va.y, vb.y, t);
        pos[i * 6 + 5] = MathUtils.lerp(va.z, vb.z, t);
      });
      line.geometry.attributes.position.needsUpdate = true;
      mat.opacity = 0.3 * clamp01((g - 0.5) * 4);
    } else if (!settled.current) {
      EDGES.forEach(([a, b], i) => {
        pos.set(NODES[a].p, i * 6);
        pos.set(NODES[b].p, i * 6 + 3);
      });
      line.geometry.attributes.position.needsUpdate = true;
      mat.opacity = 0.3;
      settled.current = true;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#B9AEDC" transparent opacity={0} depthWrite={false} />
    </lineSegments>
  );
}

/** Bright packets routing edge→connected edge; flow surges during a burst. */
function Packets({
  gatherRef,
  burst,
}: {
  gatherRef: MutableRefObject<number>;
  burst: BurstState;
}) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const va = useMemo(() => new Vector3(), []);
  const vb = useMemo(() => new Vector3(), []);

  const adjacency = useMemo(() => {
    const adj: number[][] = NODES.map(() => []);
    EDGES.forEach(([a, b], i) => {
      adj[a].push(i);
      adj[b].push(i);
    });
    return adj;
  }, []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKET_COUNT }, (_, i) => ({
        edge: (i * 3) % EDGES.length,
        t: (i * 0.37) % 1,
        forward: i % 2 === 0,
        speed: 0.22 + (i % 3) * 0.07,
        seed: i * 1.7,
      })),
    []
  );

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    // packets only exist once the network is (nearly) assembled
    const appear = clamp01((gatherRef.current - 0.85) / 0.15);
    const flow = (0.7 + burstEnergy(burst) * 1.8) * appear;

    packets.forEach((pk, i) => {
      pk.t += delta * pk.speed * flow;
      if (pk.t >= 1) {
        const [a, b] = EDGES[pk.edge];
        const arrived = pk.forward ? b : a;
        const options = adjacency[arrived].filter((e) => e !== pk.edge);
        const next = options.length
          ? options[Math.floor(state.clock.elapsedTime * 7 + pk.seed) % options.length]
          : pk.edge;
        pk.edge = next;
        pk.forward = EDGES[next][0] === arrived;
        pk.t = 0;
      }
      const [a, b] = EDGES[pk.edge];
      va.set(...NODES[a].p);
      vb.set(...NODES[b].p);
      dummy.position.lerpVectors(va, vb, pk.forward ? pk.t : 1 - pk.t);
      dummy.scale.setScalar(appear);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PACKET_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[0.05, 12, 12]} />
      {/* hot enough to catch the bloom — the glow does the halo work on dark */}
      <meshBasicMaterial color="#A07CFF" toneMapped={false} />
    </instancedMesh>
  );
}

/**
 * Dust — the gravity-well layer. A loose shell of faint motes around the
 * cluster that converges with the gather, idles on slow sine drift, and parts
 * around the cursor (soft radial push, smoothed) once assembled.
 */
function Dust({
  gatherRef,
  mouse,
}: {
  gatherRef: MutableRefObject<number>;
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const cursor = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  const offset = useMemo(() => new Vector3(), []);

  const motes = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, (_, i) => {
        const a = i * 2.39996; // golden angle — even rim coverage, no clumps
        const rad = 2.0 + seeded(i, 1) * 3.6;
        const rest = new Vector3(
          Math.cos(a) * rad * 1.4,
          Math.sin(a) * rad * 0.6 + Math.sin(i * 7.31) * 0.5,
          -1.4 + seeded(i, 3) * 2.2
        );
        const scatter = rest
          .clone()
          .setZ(0)
          .normalize()
          .multiplyScalar(11 + (i % 5))
          .setZ(rest.z - 1.8);
        return {
          rest,
          scatter,
          cur: scatter.clone(),
          phase: i * 1.93,
          freq: 0.3 + seeded(i, 2) * 0.4,
          size: 0.55 + seeded(i, 4) * 0.9,
        };
      }),
    []
  );

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const et = state.clock.elapsedTime;
    const g = gatherRef.current;

    // pointer → world point on the cluster's z=0 plane (the gravity well)
    cursor.set(mouse.current.x, mouse.current.y, 0.5).unproject(state.camera);
    offset.copy(cursor).sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / offset.z;
    cursor.copy(state.camera.position).addScaledVector(offset, dist);

    motes.forEach((m, i) => {
      const t = easeOutCubic(clamp01((g - (i / DUST_COUNT) * 0.3) / 0.7));
      target
        .copy(m.rest)
        .add(
          offset.set(
            Math.sin(et * m.freq + m.phase) * 0.12,
            Math.cos(et * m.freq * 0.8 + m.phase) * 0.1,
            0
          )
        );
      // soft gravity well: motes part around the cursor with squared falloff
      offset.copy(target).sub(cursor);
      const d = offset.length();
      if (d < 2.4) {
        const push = Math.pow(1 - d / 2.4, 2) * 1.1 * t;
        target.addScaledVector(offset.normalize(), push);
      }
      target.lerpVectors(m.scatter, target, t);
      m.cur.lerp(target, 0.1);
      dummy.position.copy(m.cur);
      dummy.scale.setScalar(m.size * (0.25 + t * 0.75));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, DUST_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[0.028, 8, 8]} />
      <meshBasicMaterial color={PURPLE_SOFT} transparent opacity={0.45} depthWrite={false} />
    </instancedMesh>
  );
}

/** The hover payoff — a ripple of bright motes fired outward, then gone. */
function BurstRipple({ burst }: { burst: BurstState }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const sparks = useMemo(
    () =>
      Array.from({ length: BURST_COUNT }, (_, i) => {
        const a = i * 2.39996;
        return {
          dir: new Vector3(Math.cos(a), Math.sin(a) * 0.7, Math.sin(i * 5.3) * 0.45).normalize(),
          dist: 2.8 + seeded(i, 5) * 2.6,
          size: 0.6 + seeded(i, 6) * 0.8,
        };
      }),
    []
  );

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = burst.t;
    const grow = easeOutCubic(t);
    const fade = (1 - t) * clamp01(t * 10); // appear instantly, die at the rim
    sparks.forEach((s, i) => {
      dummy.position.copy(s.dir).multiplyScalar(0.6 + grow * s.dist);
      dummy.position.y -= 0.1; // burst origin = cluster focal
      dummy.scale.setScalar(fade * s.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  // HDR colour (>1 channels) + toneMapped off → the sparks drive the bloom hard
  const sparkColor = useMemo(() => new Color(1.9, 1.4, 3.2), []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, BURST_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[0.065, 10, 10]} />
      <meshBasicMaterial color={sparkColor} toneMapped={false} transparent depthWrite={false} />
    </instancedMesh>
  );
}

/** Watches the hover counter from the DOM side and fires the burst tween. */
function BurstController({
  signal,
  burst,
}: {
  signal: MutableRefObject<number>;
  burst: BurstState;
}) {
  const last = useRef(signal.current);
  useFrame(() => {
    if (signal.current !== last.current) {
      last.current = signal.current;
      gsap.fromTo(burst, { t: 0 }, { t: 1, duration: 1.6, ease: 'power2.out', overwrite: true });
    }
  });
  return null;
}

/** One node — matte PBR (or the glass focal), idle pulse once gathered. */
function ClusterNode({
  def,
  index,
  gatherRef,
}: {
  def: NodeDef;
  index: number;
  gatherRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<Mesh>(null);
  const settled = useRef(false);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const et = state.clock.elapsedTime;
    const t = nodeGatherT(index, gatherRef.current);
    if (t < 1) {
      nodeGatherPos(index, gatherRef.current, mesh.position);
      settled.current = false;
    } else if (!settled.current) {
      mesh.position.set(def.p[0], def.p[1], def.p[2]);
      settled.current = true;
    }
    const grow = t >= 1 ? 1 : easeOutBack(t);
    const pulse = 1 + Math.sin(et * (0.7 + (index % 4) * 0.18) + index * 1.9) * 0.035;
    mesh.scale.setScalar(Math.max(grow, 0.001) * pulse);
    if (def.kind !== 'glass') {
      (mesh.material as MeshStandardMaterial).opacity = clamp01(t * 2.5);
    }
  });

  return (
    <mesh ref={meshRef} position={def.p}>
      {def.kind === 'ico' ? (
        <icosahedronGeometry args={[def.r, 0]} />
      ) : (
        <sphereGeometry args={[def.r, 48, 48]} />
      )}
      {def.kind === 'glass' ? (
        <meshPhysicalMaterial
          color="#E9DFFF"
          transmission={1}
          thickness={1.4}
          roughness={0.12}
          ior={1.4}
          iridescence={1}
          iridescenceIOR={1.32}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.4}
        />
      ) : (
        <meshStandardMaterial
          color={def.color}
          roughness={def.rough ?? 0.7}
          metalness={0}
          flatShading={def.kind === 'ico'}
          // transparent so the gather can fade nodes in; useFrame owns opacity
          transparent
          opacity={0}
        />
      )}
    </mesh>
  );
}

/** Gentle camera settle as the network assembles. */
function Rig({ gatherRef }: { gatherRef: MutableRefObject<number> }) {
  const look = useMemo(() => new Vector3(0, -0.1, 0), []);
  useFrame((state) => {
    const g = easeOutCubic(clamp01(gatherRef.current));
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, 12.6 - g * 1.4, 0.08);
    state.camera.lookAt(look);
  });
  return null;
}

function Cluster({
  gatherRef,
  burst,
  mouse,
}: {
  gatherRef: MutableRefObject<number>;
  burst: BurstState;
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const et = state.clock.elapsedTime;
    const { x: mx, y: my } = mouse.current;
    const t = easeOutCubic(clamp01(gatherRef.current));
    // slow ambient drift + the whole cluster leaning toward the pointer —
    // rotation AND a touch of translation, gated behind the gather
    g.rotation.y = MathUtils.lerp(g.rotation.y, Math.sin(et * 0.12) * 0.06 + mx * 0.14 * t, 0.04);
    g.rotation.x = MathUtils.lerp(g.rotation.x, Math.sin(et * 0.09) * 0.04 - my * 0.09 * t, 0.04);
    g.position.x = MathUtils.lerp(g.position.x, mx * 0.3 * t, 0.03);
    g.position.y = MathUtils.lerp(g.position.y, Math.sin(et * 0.3) * 0.06 + my * 0.2 * t - 0.25, 0.03);
    // burst pop: a few percent of scale, in and out
    g.scale.setScalar(1 + burstEnergy(burst) * 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      <Edges gatherRef={gatherRef} />
      <Packets gatherRef={gatherRef} burst={burst} />
      <Dust gatherRef={gatherRef} mouse={mouse} />
      <BurstRipple burst={burst} />
      {NODES.map((def, i) => (
        <ClusterNode key={i} def={def} index={i} gatherRef={gatherRef} />
      ))}
    </group>
  );
}

export default function GatherScene({
  gatherRef,
  burstSignal,
  active,
}: {
  gatherRef: MutableRefObject<number>;
  burstSignal: MutableRefObject<number>;
  active: boolean;
}) {
  const mouse = usePointer();
  const burst = useRef<BurstState>({ t: 1 }).current;

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12.6], fov: 38 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      {/* opaque ink canvas — matches the section bg, lets Bloom render clean */}
      <color attach="background" args={[INK_BG]} />
      <fog attach="fog" args={[INK_BG, 9, 22]} />

      {/* dark offline studio — soft formers only, no HDR fetch */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={[new Color('#0E0E14')]} />
        <Lightformer intensity={1.3} position={[0, 4, 6]} scale={[10, 6, 1]} color="#FFFFFF" />
        <Lightformer intensity={0.8} position={[-6, 2, 2]} scale={[6, 4, 1]} color="#CBB6F4" />
        <Lightformer intensity={0.7} position={[6, -3, 2]} scale={[6, 6, 1]} color={PURPLE} />
      </Environment>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} />

      <Rig gatherRef={gatherRef} />
      <BurstController signal={burstSignal} burst={burst} />
      <Cluster gatherRef={gatherRef} burst={burst} mouse={mouse} />

      {/* tasteful glow — packets, burst sparks and the glass focal catch it */}
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.5} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}

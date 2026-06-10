/**
 * HeroScene — the homepage "automation network": a hand-composed 3D node graph
 * (matte purple / ink / white spheres + icosahedrons joined by hairline threads)
 * with bright packets of light travelling the edges — data moving through a
 * system. One translucent iridescent node is the focal point. Transparent
 * WebGL canvas — the white page itself is the bg.
 *
 * Inputs (from HeroVisual):
 * - progressRef: hero scroll progress 0→1 (GSAP ScrollTrigger). The camera
 *   dollies INTO the network, satellite nodes + extra edges activate, and the
 *   packet flow accelerates — "the system building itself" as you scroll.
 * - active: frameloop gate — when the hero is off-screen we render nothing.
 *
 * Mouse parallax reads window-level pointer position (not canvas pointer —
 * the canvas only covers the right half of the hero).
 *
 * On mount a one-time ~1.6s GSAP intro assembles the network (nodes fly in →
 * threads draw → packets start → camera pushes in) before handing off to the
 * ambient state above. See IntroState below.
 */
import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Color, MathUtils, Object3D, Vector3 } from 'three';
import type { Group, InstancedMesh, LineSegments, Mesh, MeshStandardMaterial } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Html, Lightformer } from '@react-three/drei';
import { gsap, useGSAP } from '../../lib/gsap';

/** Flip to true to show small HTML labels on the hub nodes (off = clean). */
const SHOW_NODE_LABELS = false;

const PURPLE = '#7B3FE4';
const PURPLE_DEEP = '#5B2BB8';
const PURPLE_SOFT = '#B596F0';
const INK = '#15151C';
const WHITE = '#F4F3F7';
const GREY = '#D6D6DE';

type NodeKind = 'sphere' | 'ico' | 'glass';

interface NodeDef {
  p: [number, number, number];
  r: number;
  color?: string;
  kind: NodeKind;
  /** roughness band 0.6–0.8 — quiet richness, never gloss */
  rough?: number;
  /** satellite nodes scale/fade in as scroll progress rises */
  late?: boolean;
  label?: string;
}

// Hand-placed for silhouette: a focal cluster around the glass node with a few
// satellites pushed back in z. Asymmetric on purpose — composed, not generated.
const NODES: NodeDef[] = [
  { p: [0, 0.1, 0], r: 0.55, kind: 'glass', label: 'CRM' }, // 0 — iridescent focal
  { p: [1.8, 1.25, -0.7], r: 0.8, color: PURPLE_DEEP, kind: 'sphere', rough: 0.75, label: 'WhatsApp' }, // 1
  { p: [-1.9, -0.55, 0.3], r: 0.66, color: WHITE, kind: 'sphere', rough: 0.6, label: 'Lead' }, // 2
  { p: [1.05, -1.45, 0.25], r: 0.48, color: PURPLE, kind: 'sphere', rough: 0.7, label: 'Booking' }, // 3
  { p: [-1.05, 1.5, -0.4], r: 0.4, color: INK, kind: 'ico', rough: 0.65, label: 'Invoice' }, // 4
  { p: [2.5, -0.5, 0.4], r: 0.34, color: INK, kind: 'sphere', rough: 0.7 }, // 5
  { p: [-2.6, 0.9, -1.0], r: 0.3, color: PURPLE, kind: 'ico', rough: 0.7 }, // 6
  { p: [0.3, 2.2, -1.3], r: 0.26, color: INK, kind: 'sphere', rough: 0.7 }, // 7
  { p: [-0.7, -2.1, -0.6], r: 0.3, color: GREY, kind: 'sphere', rough: 0.65 }, // 8
  { p: [-0.45, 0.85, 0.85], r: 0.18, color: PURPLE_SOFT, kind: 'sphere', rough: 0.6 }, // 9
  // satellites — activate on scroll
  { p: [3.4, 1.9, -2.0], r: 0.18, color: PURPLE, kind: 'sphere', rough: 0.7, late: true }, // 10
  { p: [-3.4, -1.7, -1.4], r: 0.2, color: INK, kind: 'sphere', rough: 0.7, late: true }, // 11
  { p: [2.9, -2.2, -1.6], r: 0.16, color: GREY, kind: 'ico', rough: 0.65, late: true }, // 12
  { p: [-3.0, 2.3, -2.2], r: 0.15, color: PURPLE, kind: 'sphere', rough: 0.7, late: true }, // 13
  { p: [1.3, 2.9, 0.5], r: 0.13, color: INK, kind: 'sphere', rough: 0.7, late: true }, // 14
];

// Intentional edge set — hub-and-spoke through the glass focal, never a mesh soup.
const CORE_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 9],
  [1, 5], [1, 7], [2, 6], [2, 8], [2, 9],
  [3, 5], [3, 8], [4, 6], [4, 7],
];
// Activate as the camera dives in.
const EXTRA_EDGES: [number, number][] = [
  [1, 10], [5, 12], [6, 13], [8, 11], [7, 14], [10, 12], [4, 13], [3, 12],
];
const ALL_EDGES = [...CORE_EDGES, ...EXTRA_EDGES];

const PACKET_COUNT = 7;

/**
 * Mount intro — one-time assembly played on load, then permanently 1/1/1/1 and
 * every formula below collapses to the pre-intro behaviour. Each field is a
 * 0→1 progress tweened by a single GSAP timeline in <HeroScene>:
 * node (fly-in + scale), edge (thread draw), packet (flow ramp), cam (push-in).
 */
interface IntroState {
  node: number;
  edge: number;
  packet: number;
  cam: number;
}

const SETTLED: IntroState = { node: 1, edge: 1, packet: 1, cam: 1 };

const clamp01 = (v: number) => MathUtils.clamp(v, 0, 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// slight overshoot on node scale so they "pop" into place
const easeOutBack = (t: number) =>
  1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

// Where each node flies in from: pulled toward the centre + a small
// deterministic scatter so the assembly reads organic, not radial.
const INTRO_FROM: [number, number, number][] = NODES.map((n, i) => [
  n.p[0] * 0.18 + Math.sin(i * 12.9898) * 0.4,
  n.p[1] * 0.18 + Math.cos(i * 78.233) * 0.4,
  n.p[2] * 0.18 + Math.sin(i * 39.425) * 0.3,
]);

/** Per-node staggered progress (hub first, satellites last — NODES order). */
function nodeIntroT(i: number, nodeProgress: number) {
  return clamp01((nodeProgress - (i / NODES.length) * 0.45) / 0.55);
}

/** Current in-flight position of node i — shared so edges track flying nodes. */
function nodeIntroPos(i: number, nodeProgress: number, out: Vector3) {
  const t = easeOutCubic(nodeIntroT(i, nodeProgress));
  const s = INTRO_FROM[i];
  const e = NODES[i].p;
  return out.set(
    MathUtils.lerp(s[0], e[0], t),
    MathUtils.lerp(s[1], e[1], t),
    MathUtils.lerp(s[2], e[2], t)
  );
}

function edgePositions(edges: [number, number][]) {
  const arr = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    arr.set(NODES[a].p, i * 6);
    arr.set(NODES[b].p, i * 6 + 3);
  });
  return arr;
}

/** Thin hairline threads. Core set is always on; extra set fades in on scroll. */
function Edges({
  progressRef,
  intro,
}: {
  progressRef: MutableRefObject<number>;
  intro: IntroState;
}) {
  const corePos = useMemo(() => edgePositions(CORE_EDGES), []); // mutated during intro draw
  const extraPos = useMemo(() => edgePositions(EXTRA_EDGES), []);
  const coreRef = useRef<LineSegments>(null);
  const extraRef = useRef<LineSegments>(null);
  const va = useMemo(() => new Vector3(), []);
  const vb = useMemo(() => new Vector3(), []);
  const settled = useRef(false);

  useFrame(() => {
    const extraMat = extraRef.current?.material as { opacity: number } | undefined;
    if (extraMat) extraMat.opacity = (0.04 + progressRef.current * 0.3) * clamp01(intro.edge);

    const core = coreRef.current;
    if (!core) return;
    const coreMat = core.material as { opacity: number };
    if (intro.edge < 1) {
      // Draw each thread from its hub end toward the (possibly still flying)
      // far node, with a soft per-edge stagger.
      settled.current = false;
      CORE_EDGES.forEach(([a, b], i) => {
        nodeIntroPos(a, intro.node, va);
        nodeIntroPos(b, intro.node, vb);
        const t = easeOutCubic(clamp01((intro.edge - i * 0.022) / 0.6));
        corePos[i * 6] = va.x;
        corePos[i * 6 + 1] = va.y;
        corePos[i * 6 + 2] = va.z;
        corePos[i * 6 + 3] = MathUtils.lerp(va.x, vb.x, t);
        corePos[i * 6 + 4] = MathUtils.lerp(va.y, vb.y, t);
        corePos[i * 6 + 5] = MathUtils.lerp(va.z, vb.z, t);
      });
      core.geometry.attributes.position.needsUpdate = true;
      coreMat.opacity = 0.38 * clamp01(intro.edge * 3);
    } else if (!settled.current) {
      // snap to exact final endpoints once, then never touch the buffer again
      CORE_EDGES.forEach(([a, b], i) => {
        corePos.set(NODES[a].p, i * 6);
        corePos.set(NODES[b].p, i * 6 + 3);
      });
      core.geometry.attributes.position.needsUpdate = true;
      coreMat.opacity = 0.38;
      settled.current = true;
    }
  });

  return (
    <>
      <lineSegments ref={coreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[corePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#A9A4B8" transparent opacity={0.38} depthWrite={false} />
      </lineSegments>
      <lineSegments ref={extraRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[extraPos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={PURPLE} transparent opacity={0.04} depthWrite={false} />
      </lineSegments>
    </>
  );
}

/**
 * Packets — a few bright points travelling the edges. Instanced; each packet
 * walks edge→connected edge so flow reads as routing, not random shuttling.
 */
function Packets({
  progressRef,
  intro,
}: {
  progressRef: MutableRefObject<number>;
  intro: IntroState;
}) {
  const coreRef = useRef<InstancedMesh>(null);
  const haloRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const va = useMemo(() => new Vector3(), []);
  const vb = useMemo(() => new Vector3(), []);

  // node index → edges touching it (over the full edge set)
  const adjacency = useMemo(() => {
    const adj: number[][] = NODES.map(() => []);
    ALL_EDGES.forEach(([a, b], i) => {
      adj[a].push(i);
      adj[b].push(i);
    });
    return adj;
  }, []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKET_COUNT }, (_, i) => ({
        edge: i * 3 % CORE_EDGES.length,
        t: (i * 0.37) % 1,
        forward: i % 2 === 0,
        speed: 0.22 + (i % 3) * 0.07,
        seed: i * 1.7,
      })),
    []
  );

  useFrame((state, delta) => {
    const core = coreRef.current;
    const halo = haloRef.current;
    if (!core || !halo) return;
    // Packets only start once the threads have drawn — appear ramps speed and
    // scale together so the flow fades in instead of popping mid-edge.
    const appear = clamp01(intro.packet);
    const flow = (0.6 + progressRef.current * 2.4) * appear;

    packets.forEach((pk, i) => {
      pk.t += delta * pk.speed * flow;
      if (pk.t >= 1) {
        // arrive → continue along a connected edge (deterministic-ish pick)
        const [a, b] = ALL_EDGES[pk.edge];
        const arrived = pk.forward ? b : a;
        const options = adjacency[arrived].filter((e) => e !== pk.edge);
        const next = options.length
          ? options[Math.floor(state.clock.elapsedTime * 7 + pk.seed) % options.length]
          : pk.edge;
        pk.edge = next;
        pk.forward = ALL_EDGES[next][0] === arrived;
        pk.t = 0;
      }
      const [a, b] = ALL_EDGES[pk.edge];
      va.set(...NODES[a].p);
      vb.set(...NODES[b].p);
      const tt = pk.forward ? pk.t : 1 - pk.t;
      dummy.position.lerpVectors(va, vb, tt);
      dummy.scale.setScalar(appear);
      dummy.updateMatrix();
      core.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(2.6 * appear);
      dummy.updateMatrix();
      halo.setMatrixAt(i, dummy.matrix);
    });
    core.instanceMatrix.needsUpdate = true;
    halo.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={coreRef} args={[undefined, undefined, PACKET_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#8F5BFF" toneMapped={false} />
      </instancedMesh>
      {/* soft purple halo — airy glow on white without postprocessing bloom */}
      <instancedMesh ref={haloRef} args={[undefined, undefined, PACKET_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.16} depthWrite={false} toneMapped={false} />
      </instancedMesh>
    </>
  );
}

/** One node mesh — matte PBR, gentle idle pulse; satellites grow in on scroll. */
function NetworkNode({
  def,
  index,
  progressRef,
  intro,
}: {
  def: NodeDef;
  index: number;
  progressRef: MutableRefObject<number>;
  intro: IntroState;
}) {
  const meshRef = useRef<Mesh>(null);
  const settled = useRef(false);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const et = state.clock.elapsedTime;
    const t = nodeIntroT(index, intro.node);
    if (t < 1) {
      nodeIntroPos(index, intro.node, mesh.position);
      settled.current = false;
    } else if (!settled.current) {
      mesh.position.set(def.p[0], def.p[1], def.p[2]);
      settled.current = true;
    }
    const grow = t >= 1 ? 1 : easeOutBack(t);
    const pulse = 1 + Math.sin(et * (0.7 + (index % 4) * 0.18) + index * 1.9) * 0.035;
    const activate = def.late ? 0.55 + Math.min(progressRef.current * 1.6, 1) * 0.45 : 1;
    mesh.scale.setScalar(pulse * activate * grow);
    if (def.kind !== 'glass') {
      const mat = mesh.material as MeshStandardMaterial;
      const rest = def.late ? 0.5 + Math.min(progressRef.current * 1.6, 1) * 0.5 : 1;
      mat.opacity = rest * clamp01(t * 2.5);
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
        // The single premium focal point — translucent iridescent glass.
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
          envMapIntensity={1.2}
        />
      ) : (
        <meshStandardMaterial
          color={def.color}
          roughness={def.rough ?? 0.7}
          metalness={0}
          flatShading={def.kind === 'ico'}
          // transparent on all matte nodes so the mount intro can fade them in;
          // useFrame owns opacity from the first frame onward
          transparent
          opacity={0}
        />
      )}
      {SHOW_NODE_LABELS && def.label && (
        <Html
          center
          distanceFactor={9}
          className="pointer-events-none select-none whitespace-nowrap rounded-full border border-[#E8E8EC] bg-white/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B6B7A] backdrop-blur"
        >
          {def.label}
        </Html>
      )}
    </mesh>
  );
}

/** Camera dolly — flies into/through the cluster as scroll progress rises. */
function Rig({
  progressRef,
  intro,
}: {
  progressRef: MutableRefObject<number>;
  intro: IntroState;
}) {
  const look = useMemo(() => new Vector3(0, 0.1, 0), []);
  useFrame((state) => {
    const t = progressRef.current;
    const cam = state.camera;
    // mount push-in: starts 3.4 further out, settles to the resting z
    const introPull = (1 - intro.cam) * 3.4;
    cam.position.z = MathUtils.lerp(cam.position.z, 13 + introPull - t * 4.4, 0.08);
    cam.position.y = MathUtils.lerp(cam.position.y, 0.2 + t * 0.5, 0.08);
    cam.position.x = MathUtils.lerp(cam.position.x, t * 0.4, 0.08);
    cam.lookAt(look);
  });
  return null;
}

function Network({
  progressRef,
  intro,
}: {
  progressRef: MutableRefObject<number>;
  intro: IntroState;
}) {
  const groupRef = useRef<Group>(null);
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

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const et = state.clock.elapsedTime;
    const { x: mx, y: my } = mouse.current;
    // Slow ambient drift + lazy pointer parallax. Never a full rotation —
    // the graph is composed for this viewpoint.
    g.rotation.y = MathUtils.lerp(g.rotation.y, Math.sin(et * 0.12) * 0.07 + mx * 0.16, 0.04);
    g.rotation.x = MathUtils.lerp(g.rotation.x, Math.sin(et * 0.09) * 0.04 + my * 0.1, 0.04);
    g.position.y = Math.sin(et * 0.3) * 0.07;
  });

  return (
    <group ref={groupRef} position={[0.35, 0, 0]}>
      <Edges progressRef={progressRef} intro={intro} />
      <Packets progressRef={progressRef} intro={intro} />
      {NODES.map((def, i) => (
        <NetworkNode key={i} def={def} index={i} progressRef={progressRef} intro={intro} />
      ))}
    </group>
  );
}

export default function HeroScene({
  progressRef,
  active,
}: {
  progressRef: MutableRefObject<number>;
  active: boolean;
}) {
  // Reduced motion never reaches this scene (HeroVisual gates it to the static
  // image), but belt-and-braces: render pre-assembled, no intro timeline.
  const reduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const intro = useRef<IntroState>(reduced ? { ...SETTLED } : { node: 0, edge: 0, packet: 0, cam: 0 }).current;

  // One-time mount assembly: nodes fly in → threads draw → packets flow, with
  // a camera push-in across the whole window. After ~1.6s every progress is 1
  // and the ambient drift / pulse / scroll dolly behave exactly as before.
  useGSAP(() => {
    if (reduced) return;
    gsap
      .timeline()
      .to(intro, { node: 1, duration: 0.9, ease: 'none' }, 0) // per-node ease + stagger applied in useFrame
      .to(intro, { cam: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .to(intro, { edge: 1, duration: 0.75, ease: 'none' }, 0.45)
      .to(intro, { packet: 1, duration: 0.5, ease: 'power1.inOut' }, 1.1);
  }, []);

  return (
    <Canvas
      // 'never' fully halts rendering when the hero is off-screen
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, reduced ? 13 : 16.4], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Soft offline studio environment — built from Lightformers, no HDR fetch.
          Matte nodes get gentle gradient shading; the glass node gets its sheen. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={[new Color('#FFFFFF')]} />
        <Lightformer intensity={1.6} position={[0, 4, 6]} scale={[10, 6, 1]} color="#FFFFFF" />
        <Lightformer intensity={0.9} position={[-6, 2, 2]} scale={[6, 4, 1]} color="#EDE7FF" />
        <Lightformer intensity={0.7} position={[6, -3, 2]} scale={[6, 6, 1]} color="#D9C8FF" />
      </Environment>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />

      <Rig progressRef={progressRef} intro={intro} />
      <Network progressRef={progressRef} intro={intro} />

      {/* Soft ground shadow sells "objects in a room" on the white page */}
      <ContactShadows position={[0, -3.1, 0]} opacity={0.16} scale={12} blur={3} far={4} resolution={512} color="#2A1454" />
    </Canvas>
  );
}

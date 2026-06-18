/**
 * JourneyScene — the "How the automation runs" node flow. Six nodes (one per
 * automation step) float in an ink void, joined into a pipeline. The section's
 * pinned ScrollTrigger progress (0→1) drives the CAMERA from node to node in
 * order: the active node brightens + scales, completed edges light up, and
 * packets flow along them — the pipeline visibly builds itself by "Done".
 *
 * Same node family as HeroScene (matte purple/white spheres + icosahedrons,
 * one iridescent glass focal — here it's "Done", the payoff) so home reads as
 * one system. Unlike the white hero this canvas is opaque ink, so a subtle
 * Bloom pass IS used — glow earns its keep on dark.
 *
 * At rest (progress 0) the nodes sit clustered near centre, drifting, packets
 * idling — alive before any scroll. The first beat pulls the camera in while
 * the cluster spreads out along the automation path.
 */
import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { AdditiveBlending, Color, MathUtils, Object3D, Vector3 } from 'three';
import type {
  BufferAttribute,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const PURPLE = '#7B3FE4';
const PURPLE_SOFT = '#B596F0';
const WHITE = '#F4F3F7';
const INK_BG = '#0A0A0F';

interface StepNode {
  /** final (spread) position — a winding path the camera travels */
  p: [number, number, number];
  r: number;
  color: string;
  kind: 'sphere' | 'ico' | 'glass';
  rough: number;
}

// One node per step, 01→06. Path winds left/right while diving in z so every
// camera leg has a turn in it. 06 "Done" is the iridescent glass payoff.
const STEP_NODES: StepNode[] = [
  { p: [-2.6, 0.8, 0], r: 0.32, color: PURPLE, kind: 'sphere', rough: 0.7 }, // 01 enquiry
  { p: [-0.6, -0.8, -2.6], r: 0.27, color: WHITE, kind: 'ico', rough: 0.62 }, // 02 auto-reply
  { p: [1.9, 0.7, -5.2], r: 0.36, color: PURPLE_SOFT, kind: 'sphere', rough: 0.66 }, // 03 CRM
  { p: [-1.6, -0.7, -7.8], r: 0.29, color: WHITE, kind: 'sphere', rough: 0.6 }, // 04 quote/booking
  { p: [1.8, 0.9, -10.4], r: 0.29, color: PURPLE, kind: 'ico', rough: 0.7 }, // 05 invoice
  { p: [0, 0, -13], r: 0.4, color: WHITE, kind: 'glass', rough: 0.12 }, // 06 done — glass
];

const EDGE_COUNT = STEP_NODES.length - 1;
const PACKET_COUNT = 12;

// Rest cluster: nodes pulled toward this centre with a little hand jitter so
// the idle state reads as a loose organism, not a collapsed point.
const CLUSTER_C = new Vector3(-0.1, 0.05, -1.5);
const CLUSTER_JITTER: [number, number, number][] = [
  [-0.55, 0.4, 0.3],
  [0.5, -0.45, 0.1],
  [0.65, 0.5, -0.35],
  [-0.6, -0.4, -0.2],
  [0.15, 0.65, -0.5],
  [-0.2, -0.6, 0.45],
];

// Camera offset from the active node, per beat — alternating sides so each
// leg of the flow banks a little instead of flying a straight rail.
const CAM_OFFSETS: [number, number, number][] = [
  [-0.65, 0.45, 4.3],
  [0.7, 0.35, 4.2],
  [-0.7, 0.5, 4.3],
  [0.65, 0.35, 4.2],
  [-0.65, 0.5, 4.3],
  [0.1, 0.4, 4.5],
];

// Aim left of the active node so it composes right-of-centre — the step copy
// owns the left column, the node owns the middle-right.
const LOOK_BIAS_X = 0.1;

const REST_POS = new Vector3(0.2, 0.55, 5.2);

// Tiny ambient nodes lining the corridor — depth + parallax, never the story.
const DECO: { p: [number, number, number]; r: number; c: string }[] = [
  { p: [2.8, 1.8, -1.2], r: 0.1, c: PURPLE },
  { p: [-3.2, -1.4, -2.6], r: 0.12, c: '#6B6B7A' },
  { p: [3.4, -1.2, -5.2], r: 0.09, c: PURPLE_SOFT },
  { p: [-3.0, 1.6, -6.4], r: 0.11, c: '#6B6B7A' },
  { p: [2.6, 2.0, -8.4], r: 0.08, c: PURPLE },
  { p: [-2.6, -1.8, -9.6], r: 0.1, c: PURPLE_SOFT },
  { p: [3.0, 0.4, -12.0], r: 0.12, c: '#6B6B7A' },
  { p: [-2.2, 1.4, -12.8], r: 0.09, c: PURPLE },
];

const smooth = (x: number) => x * x * (3 - 2 * x);

function JourneyWorld({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const nodeRefs = useRef<(Mesh | null)[]>([]);
  const lineRefs = useRef<(LineSegments | null)[]>([]);
  const packetRef = useRef<InstancedMesh>(null);
  const haloRef = useRef<InstancedMesh>(null);

  const dummy = useMemo(() => new Object3D(), []);
  const finals = useMemo(() => STEP_NODES.map((n) => new Vector3(...n.p)), []);
  const clusters = useMemo(
    () =>
      STEP_NODES.map((n, i) =>
        new Vector3(...n.p)
          .sub(CLUSTER_C)
          .multiplyScalar(0.16)
          .add(CLUSTER_C)
          .add(new Vector3(...CLUSTER_JITTER[i]))
      ),
    []
  );
  const cur = useMemo(() => STEP_NODES.map(() => new Vector3()), []);
  const baseColors = useMemo(() => STEP_NODES.map((n) => new Color(n.color)), []);
  const linePositions = useMemo(
    () => Array.from({ length: EDGE_COUNT }, () => new Float32Array(6)),
    []
  );
  // scratch vectors — zero allocation per frame
  const vLook = useMemo(() => new Vector3(), []);
  const vOff = useMemo(() => new Vector3(), []);
  const vPos = useMemo(() => new Vector3(), []);
  const vDamped = useMemo(() => new Vector3().copy(CLUSTER_C), []);
  const cTmp = useMemo(() => new Color(), []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKET_COUNT }, (_, i) => ({
        edge: i % EDGE_COUNT,
        t: (i * 0.317) % 1,
        speed: 0.3 + (i % 4) * 0.085,
      })),
    []
  );

  useFrame((state, delta) => {
    const p = progressRef.current;
    const et = state.clock.elapsedTime;
    const beats = Math.min(p * STEP_NODES.length, STEP_NODES.length - 0.001);
    const activeIdx = Math.floor(beats);
    // cluster → spread over the first ~14% of the pin
    const spreadT = smooth(MathUtils.clamp(p / 0.14, 0, 1));

    // current node positions: spread lerp + gentle individual drift
    for (let i = 0; i < STEP_NODES.length; i++) {
      cur[i].lerpVectors(clusters[i], finals[i], spreadT);
      cur[i].x += Math.cos(et * 0.4 + i * 2.1) * 0.05;
      cur[i].y += Math.sin(et * 0.55 + i * 1.7) * 0.07;
    }

    // nodes — active scales up + brightens, completed keep a purple ember
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.copy(cur[i]);
      mesh.rotation.y = et * 0.1 + i;
      const pulse = 1 + Math.sin(et * (0.8 + (i % 3) * 0.2) + i * 2.2) * 0.04;
      const isActive = i === activeIdx;
      const done = i < activeIdx;
      mesh.scale.setScalar(
        MathUtils.lerp(mesh.scale.x, (isActive ? 1.28 : 1) * pulse, 0.07)
      );
      const mat = mesh.material as MeshStandardMaterial;
      const glass = STEP_NODES[i].kind === 'glass';
      // glass keeps its emissive whisper-quiet so transmission + iridescence
      // stay the show when "Done" lights up — the bloom catches its sheen
      mat.emissiveIntensity = MathUtils.lerp(
        mat.emissiveIntensity,
        glass ? (isActive ? 0.22 : 0.02) : isActive ? 1.0 : done ? 0.16 : 0.04,
        0.07
      );
      if (!glass) {
        // upcoming nodes sit dimmed in the dark until the flow reaches them
        cTmp.copy(baseColors[i]).multiplyScalar(isActive ? 1 : done ? 0.8 : 0.38);
        mat.color.lerp(cTmp, 0.07);
      }
    });

    // edges — light up as each step completes (pipeline building)
    lineRefs.current.forEach((ls, e) => {
      if (!ls) return;
      const attr = ls.geometry.attributes.position as BufferAttribute;
      attr.setXYZ(0, cur[e].x, cur[e].y, cur[e].z);
      attr.setXYZ(1, cur[e + 1].x, cur[e + 1].y, cur[e + 1].z);
      attr.needsUpdate = true;
      const on = MathUtils.clamp(beats - e, 0, 1);
      (ls.material as LineBasicMaterial).opacity = 0.1 + on * 0.42;
    });

    // packets — idle shimmer everywhere; full flow on completed/active edges
    const packet = packetRef.current;
    const halo = haloRef.current;
    if (packet && halo) {
      packets.forEach((pk, i) => {
        const on = MathUtils.clamp(beats - pk.edge, 0, 1);
        pk.t = (pk.t + delta * pk.speed * (0.3 + on * 1.5)) % 1;
        dummy.position.lerpVectors(cur[pk.edge], cur[pk.edge + 1], pk.t);
        const s = 0.45 + on * 0.8;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        packet.setMatrixAt(i, dummy.matrix);
        dummy.scale.setScalar(s * 2.4);
        dummy.updateMatrix();
        halo.setMatrixAt(i, dummy.matrix);
      });
      packet.instanceMatrix.needsUpdate = true;
      halo.instanceMatrix.needsUpdate = true;
    }

    // camera — eased node→node travel, blended from the rest pose at the top
    const u = MathUtils.clamp(beats - 0.45, 0, EDGE_COUNT);
    const ci = Math.min(Math.floor(u), EDGE_COUNT - 1);
    const cf = smooth(u - ci);
    vLook.lerpVectors(cur[ci], cur[ci + 1], cf);
    vOff.fromArray(CAM_OFFSETS[ci]).lerp(vPos.fromArray(CAM_OFFSETS[ci + 1]), cf);
    vPos.copy(vLook).add(vOff);
    vLook.x += LOOK_BIAS_X;
    const restBlend = smooth(MathUtils.clamp(p / 0.07, 0, 1));
    vPos.lerpVectors(REST_POS, vPos, restBlend);
    vLook.lerpVectors(CLUSTER_C, vLook, restBlend);

    state.camera.position.lerp(vPos, 0.075);
    vDamped.lerp(vLook, 0.075);
    state.camera.lookAt(vDamped);
  });

  return (
    <>
      {STEP_NODES.map((n, i) => (
        <mesh
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          position={n.p}
        >
          {n.kind === 'ico' ? (
            <icosahedronGeometry args={[n.r, 0]} />
          ) : (
            <sphereGeometry args={[n.r, 32, 32]} />
          )}
          {n.kind === 'glass' ? (
            // "Done" — the single iridescent focal, same recipe as the hero hub
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
              envMapIntensity={2.2}
              emissive={PURPLE}
              emissiveIntensity={0.04}
            />
          ) : (
            <meshStandardMaterial
              color={n.color}
              roughness={n.rough}
              metalness={0}
              flatShading={n.kind === 'ico'}
              emissive={PURPLE}
              emissiveIntensity={0.04}
            />
          )}
        </mesh>
      ))}

      {Array.from({ length: EDGE_COUNT }, (_, e) => (
        <lineSegments
          key={e}
          ref={(el) => {
            lineRefs.current[e] = el;
          }}
          frustumCulled={false}
        >
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions[e], 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={PURPLE_SOFT} transparent opacity={0.1} depthWrite={false} />
        </lineSegments>
      ))}

      <instancedMesh ref={packetRef} args={[undefined, undefined, PACKET_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#B388FF" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={haloRef} args={[undefined, undefined, PACKET_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={PURPLE}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>

      {DECO.map((d, i) => (
        <mesh key={`deco-${i}`} position={d.p}>
          <sphereGeometry args={[d.r, 16, 16]} />
          <meshStandardMaterial color={d.c} roughness={0.7} metalness={0} />
        </mesh>
      ))}
    </>
  );
}

export default function JourneyScene({
  progressRef,
  active,
}: {
  progressRef: MutableRefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      // dpr capped lower than the hero: this canvas is full-bleed AND runs a
      // bloom composer — keeps integrated GPUs well clear of driver resets
      dpr={[1, 1.25]}
      camera={{ position: [0.2, 0.55, 5.2], fov: 42 }}
      gl={{ antialias: false }}
      onCreated={({ gl }) => {
        // the glass node's transmission re-renders the scene to a buffer every
        // frame — half resolution there is invisible on a blurry refraction
        gl.transmissionResolutionScale = 0.5;
      }}
    >
      {/* opaque ink canvas — matches the section bg, lets Bloom render clean */}
      <color attach="background" args={[INK_BG]} />
      <fog attach="fog" args={[INK_BG, 5, 16]} />

      {/* dark offline studio — soft formers only, no HDR fetch */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={[new Color('#0E0E14')]} />
        <Lightformer intensity={1.3} position={[0, 4, 6]} scale={[10, 6, 1]} color="#FFFFFF" />
        <Lightformer intensity={0.8} position={[-6, 2, 2]} scale={[6, 4, 1]} color="#CBB6F4" />
        <Lightformer intensity={0.7} position={[6, -3, 2]} scale={[6, 6, 1]} color={PURPLE} />
      </Environment>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} />

      <JourneyWorld progressRef={progressRef} />

      {/* tasteful glow — packets + the active node's emissive catch the bloom */}
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          levels={5}
          intensity={0.55}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.3}
        />
      </EffectComposer>
    </Canvas>
  );
}

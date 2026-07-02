import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// The three-step working rhythm — plan, build, retain.
const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Plan',
    body: 'I map exactly what you need — pages, systems, the lot. No fluff, no padding. You see the shape of it before I touch a line of code.',
  },
  {
    n: '02',
    title: 'Build fast',
    body: 'Most sites ship in days. Systems and automations in one to two weeks. You stay in the loop the whole way — direct, no account managers in between.',
  },
  {
    n: '03',
    title: 'Retainer',
    body: 'Once it’s live I keep it running and improving. Updates, fixes, new ideas. The site grows with the business instead of going stale.',
  },
];

// Tools I actually build on, day to day.
const STACK = [
  'React',
  'TypeScript',
  'Tailwind',
  'Framer Motion',
  'GSAP',
  'Supabase',
  'n8n',
  'PayFast',
  'WhatsApp API',
  'Vercel',
];

/**
 * About — founder story for the white-minimal v2 build. Hero (white) → the short
 * version (ink) → how I work (white) → the stack (ink) → PreFooterCTA. Alternating
 * rounded panels keep the page switching black↔white down the scroll. First person,
 * solo founder. No pricing.
 */
export default function About() {
  return (
    <>
      {/* HERO — white */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">About</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Solo founder.' },
              { text: 'Self-taught.', serif: true },
              { text: 'Vaal Triangle.' },
            ]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            I&apos;m Christiaan. I plan it, build it fast, then keep it running. No agency layers,
            no handoffs — you work directly with the person building the thing.
          </motion.p>
        </div>
      </section>

      {/* THE SHORT VERSION — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <Tag variant="outline-dark" className="mb-8">
            The short version
          </Tag>

          <SplitReveal
            as="h2"
            segments={[
              { text: 'I taught myself to build, then started building for' },
              { text: 'businesses', serif: true },
              { text: 'like yours.' },
            ]}
            className="max-w-[20ch] text-[clamp(30px,5vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 flex max-w-2xl flex-col gap-6"
          >
            <motion.p variants={fadeUp} className="text-[17px] leading-[1.7] text-white/70">
              No bootcamp, no agency to hide behind. I taught myself to code and kept going until I
              could ship the whole thing — front to back. Today I build full-stack websites, custom
              systems, and automation for South African small businesses.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[17px] leading-[1.7] text-white/70">
              It&apos;s just me. That means no layers, no handoffs, no telephone game between the
              person you brief and the person who builds. You talk to me, and I&apos;m the one
              writing the code and wiring the automations.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[17px] leading-[1.7] text-white/70">
              I&apos;m based in the Vaal Triangle, Gauteng, and I work with businesses across South
              Africa. Honest about what I can do, fast when it counts, and around long after the
              site goes live.
            </motion.p>
          </motion.div>
        </div>
      </Panel>

      {/* HOW I WORK — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <Tag variant="outline" className="mb-6">
              How I work
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Three steps, no' }, { text: 'guesswork', serif: true }]}
              className="max-w-[18ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                className="flex flex-col rounded-3xl border border-site-line bg-site-surface p-8 md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-site-accent md:text-[52px]"
                >
                  {step.n}
                </span>
                <h3 className="mt-7 text-[22px] font-semibold tracking-[-0.02em] text-site-ink md:text-[26px]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-site-text-body">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Panel>

      {/* THE STACK — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <Tag variant="outline-dark" className="mb-8">
            The stack
          </Tag>

          <SplitReveal
            as="h2"
            segments={[{ text: 'The tools I' }, { text: 'build', serif: true }, { text: 'on.' }]}
            className="max-w-[16ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 flex flex-wrap gap-3"
          >
            {STACK.map((tool) => (
              <motion.div key={tool} variants={fadeUp}>
                <Tag variant="white">{tool}</Tag>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-12 text-[14px] font-medium text-white/80"
          >
            CIPC 2025/069691/07 · Not VAT-registered.
          </motion.p>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}

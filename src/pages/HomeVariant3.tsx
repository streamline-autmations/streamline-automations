import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* =============================================================================
   VARIANT 3 — Dark Purple Network (Refined)
   Header: linear-gradient #2E1065 → #4C1D95 · Body: #FAFAFA · Footer: same gradient.
   Background: faint persistent network of drifting nodes, mouse-repelled,
   line opacity capped so total visual sits below 0.15.
   ============================================================================= */

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};
const staggerParent = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-80px' },
  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
};
const staggerChild = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

/* ---------------------------------------------------------------------------
   <NetworkBackground /> — fixed canvas, 45 drifting nodes, lines within 180px,
   mouse repels nodes within 100px. Total opacity capped at 0.15.
   Mobile: static radial-gradient fallback.
   --------------------------------------------------------------------------- */
function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const NODE_COUNT = 45;
    const NODE_LINE_DIST = 180;
    const REPEL_DIST = 100;

    const seed = () => {
      const { w, h } = sizeRef.current;
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        // Very slow drift — 0.1 to 0.3 px / frame.
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) seed();
    };

    let pendingMouse: { x: number; y: number } | null = null;
    const onMouseMove = (e: MouseEvent) => {
      pendingMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      if (pendingMouse) {
        mouseRef.current = { x: pendingMouse.x, y: pendingMouse.y, active: true };
        pendingMouse = null;
      }
      const mouse = mouseRef.current;
      const nodes = nodesRef.current;

      // Update positions
      for (const n of nodes) {
        // Mouse repulsion (gentle)
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_DIST && d > 0.1) {
            const force = (1 - d / REPEL_DIST) * 0.2; // 0 → 0.2 px/frame
            n.x += (dx / d) * force;
            n.y += (dy / d) * force;
          }
        }
        // Drift + soft boundary reverse
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < NODE_LINE_DIST) {
            const alpha = (1 - d / NODE_LINE_DIST) * 0.08;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    seed();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    if (reduced) draw();
    else rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60vw 60vh at 20% 30%, rgba(139,92,246,0.05), transparent 70%), radial-gradient(50vw 50vh at 80% 70%, rgba(123,63,228,0.04), transparent 70%)',
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
}

export default function HomeVariant3() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#0A0A0F]">
      <NetworkBackground />

      {/* ============== NAVBAR — gradient #2E1065 → #4C1D95 ============== */}
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          'bg-gradient-to-r from-[#2E1065] to-[#4C1D95]',
          scrolled ? 'shadow-[0_8px_24px_-12px_rgba(46,16,101,0.6)] border-b border-white/[0.06]' : '',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="text-white text-[17px] font-semibold tracking-[-0.01em]">
              Streamline
            </Link>
            <nav className="hidden md:flex items-center gap-9">
              {['Services', 'Portfolio', 'About', 'Contact'].map((l) => (
                <Link
                  key={l}
                  to={`/${l.toLowerCase()}`}
                  className="text-[13px] text-white/70 hover:text-white transition-colors duration-200"
                >
                  {l}
                </Link>
              ))}
            </nav>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-white text-[#4C1D95] text-[13px] font-medium rounded-full hover:bg-[#F0EBFF] transition-colors duration-200"
              >
                Book a Free Call
              </Link>
            </motion.div>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 text-white/85"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden border-t border-white/[0.08] py-4 flex flex-col gap-3">
              {['Services', 'Portfolio', 'About', 'Contact'].map((l) => (
                <Link
                  key={l}
                  to={`/${l.toLowerCase()}`}
                  className="text-[14px] text-white/80 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-flex justify-center px-5 py-2.5 bg-white text-[#4C1D95] text-[13px] font-medium rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Book a Free Call
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10">
        {/* ============== HERO ============== */}
        <section className="relative pt-40 md:pt-48 pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <motion.p
              {...fadeUp}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-7"
            >
              Web Design · Automation · Systems
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[44px] sm:text-[60px] md:text-[78px] lg:text-[88px] leading-[1.02] tracking-[-0.025em] font-semibold text-[#0A0A0F]"
            >
              Websites that pay you back.
              <br />
              <span className="text-[#3D3D47]">Systems that run themselves.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="mt-7 max-w-xl text-[16px] leading-[1.65] text-[#3D3D47]"
            >
              We design, build and host the web infrastructure South African
              businesses actually use to grow — not just look good.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#7B3FE4] to-[#6930D0] hover:to-[#5C28BC] text-white text-[14px] font-medium rounded-full transition-colors duration-200"
                >
                  Book a Free Call
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-6 py-3 border border-[#E8E8EC] text-[#0A0A0F] text-[14px] font-medium rounded-full bg-white hover:border-[#D4D4DA] transition-all duration-200"
                >
                  See the work
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="mt-20 md:mt-24"
            >
              <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#E8E8EC] bg-white shadow-[0_30px_80px_-30px_rgba(76,29,149,0.20)]">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E8E8EC] bg-[#FAFAFA]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8EC]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8EC]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8EC]" />
                  <span className="ml-3 text-[11px] text-[#9E9EA8] font-mono">streamline-automations.agency</span>
                </div>
                <div className="p-8 md:p-10 grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-32 rounded-lg bg-gradient-to-br from-[#F0EBFF] to-[#FAFAFA]" />
                  <div className="h-32 rounded-lg bg-[#F5F5F7]" />
                  <div className="h-20 rounded-lg bg-[#F5F5F7]" />
                  <div className="h-20 rounded-lg bg-[#F5F5F7]" />
                  <div className="h-20 rounded-lg bg-gradient-to-br from-[#F0EBFF] to-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============== CLIENT BAR ============== */}
        <section className="relative py-16 border-y border-[#E8E8EC] bg-white/85 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-8 text-center">Trusted by</p>
            <motion.div
              variants={staggerParent}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
            >
              {['BLOM Cosmetics', 'RecklessBear Apparel', 'Ameli Designs', 'JJ Glasswork', 'NSA Mining', 'Madiega Trading', 'Tuscany SA', 'African Nomad'].map((name) => (
                <motion.span
                  key={name}
                  variants={staggerChild}
                  className="text-[14px] font-medium text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors duration-200"
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== SERVICES ============== */}
        <section className="relative py-24 md:py-32 lg:py-40">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp}>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-4">What we build</p>
              <h2 className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] font-semibold text-[#0A0A0F] max-w-3xl">
                Three services. One operating system for your business.
              </h2>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8"
            >
              {[
                { eyebrow: '01', title: 'Web Design & Creation', body: 'Websites that convert. Built in days, not months.', href: '/websites' },
                { eyebrow: '02', title: 'Systems & Automation', body: 'Stop doing it manually. Build the system once.', href: '/systems' },
                { eyebrow: '03', title: 'Hosting & Maintenance', body: 'Your foundation. Handled.', href: '/hosting' },
              ].map((s) => (
                <motion.div
                  key={s.title}
                  variants={staggerChild}
                  whileHover={{ y: -2, scale: 1.008 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group p-8 md:p-10 rounded-2xl border border-[#E8E8EC] bg-white hover:border-[#D4D4DA] hover:shadow-[0_4px_24px_rgba(76,29,149,0.08)] transition-all duration-300"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">{s.eyebrow}</p>
                  <h3 className="mt-5 text-[22px] font-semibold text-[#0A0A0F] tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[#3D3D47]">{s.body}</p>
                  <Link to={s.href} className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#7B3FE4] hover:gap-2.5 transition-all duration-200">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== FEATURED WORK ============== */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-white/80 backdrop-blur-sm border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-4">Selected work</p>
                <h2 className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] font-semibold text-[#0A0A0F]">
                  Built for businesses
                  <br />
                  that actually run on it.
                </h2>
              </div>
              <Link to="/portfolio" className="text-[13px] font-medium text-[#0A0A0F] hover:text-[#7B3FE4] transition-colors duration-200">
                View all →
              </Link>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {[
                { name: 'BLOM Cosmetics', tag: 'E-COMMERCE · CRM · WHATSAPP', body: 'Full-stack: storefront, customer database and WhatsApp re-order automation in one connected system.', href: '/portfolio/blom-cosmetics' },
                { name: 'RecklessBear Apparel', tag: 'ADMIN · CRM · INVENTORY', body: 'Admin panel, CRM, live inventory and a quote engine that turns leads into orders without a salesperson.', href: '/portfolio/recklesbear' },
              ].map((w) => (
                <motion.div key={w.name} variants={staggerChild}>
                  <Link to={w.href} className="block group">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="aspect-[4/3] rounded-2xl bg-[#F5F5F7] border border-[#E8E8EC] overflow-hidden relative group-hover:border-[#D4D4DA] transition-colors duration-300"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 rounded-xl bg-white border border-[#E8E8EC] shadow-[0_20px_50px_-20px_rgba(76,29,149,0.15)] grid grid-cols-3 gap-2 p-4">
                          <div className="col-span-2 rounded-md bg-gradient-to-br from-[#F0EBFF] to-[#FAFAFA]" />
                          <div className="rounded-md bg-[#F5F5F7]" />
                          <div className="rounded-md bg-[#F5F5F7]" />
                          <div className="rounded-md bg-[#F0EBFF]" />
                          <div className="rounded-md bg-[#F5F5F7]" />
                        </div>
                      </div>
                    </motion.div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">{w.tag}</p>
                        <h3 className="mt-2 text-[22px] font-semibold text-[#0A0A0F] tracking-[-0.01em]">{w.name}</h3>
                      </div>
                      <span aria-hidden="true" className="text-[#9E9EA8] group-hover:text-[#7B3FE4] group-hover:translate-x-1 transition-all duration-200">→</span>
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.65] text-[#3D3D47] max-w-md">{w.body}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== RENTAL CALLOUT — purple gradient strip ============== */}
        <section className="relative py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="rounded-3xl bg-gradient-to-r from-[#2E1065] to-[#4C1D95] text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            >
              <div className="max-w-xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">Rental options</p>
                <h3 className="text-[28px] md:text-[34px] leading-[1.15] tracking-[-0.02em] font-semibold">
                  No upfront cost. Pay monthly.
                  <br />
                  Own it after 18 months.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-white/65">
                  From R699/mo to R1,799/mo. Cancel any time before month 18 — keep
                  it after.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/packages"
                  className="inline-flex items-center px-6 py-3 bg-white text-[#4C1D95] text-[14px] font-medium rounded-full hover:bg-[#F0EBFF] transition-colors duration-200"
                >
                  See rental options
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============== HOW IT WORKS ============== */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-white/85 backdrop-blur-sm border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp} className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-4">The process</p>
              <h2 className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] font-semibold text-[#0A0A0F]">
                Three steps. Live in under a week.
              </h2>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-16 grid md:grid-cols-3 gap-12 md:gap-10"
            >
              {[
                { n: '01', title: 'Free Strategy Call', body: 'We talk through your business in 20 minutes — no pitch.' },
                { n: '02', title: 'We Build It', body: 'You get a live, tested system in under 7 days.' },
                { n: '03', title: 'You Own It', body: 'No lock-in. No agency dependency. Your business, your system.' },
              ].map((s) => (
                <motion.div key={s.n} variants={staggerChild} className="relative">
                  <div className="text-[44px] font-semibold tabular-nums leading-none bg-gradient-to-br from-[#7B3FE4] to-[#4C1D95] bg-clip-text text-transparent">
                    {s.n}
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold text-[#0A0A0F] tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[#3D3D47]">{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== FINAL CTA — purple gradient, seamless to footer ============== */}
        <section className="relative bg-gradient-to-br from-[#2E1065] to-[#4C1D95] text-white pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h2
              {...fadeUp}
              className="text-[36px] md:text-[52px] lg:text-[64px] leading-[1.05] tracking-[-0.025em] font-semibold max-w-3xl mx-auto"
            >
              Ready to stop doing everything manually?
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="mt-6 text-[16px] leading-[1.65] text-white/70 max-w-xl mx-auto"
            >
              Book a free 20-minute strategy call. We&apos;ll map out exactly what
              your business needs — no pitch, no pressure.
            </motion.p>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className="mt-10">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-7 py-3.5 bg-white text-[#4C1D95] text-[14px] font-medium rounded-full hover:bg-[#F0EBFF] transition-colors duration-200"
                >
                  Book a Free Call <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-24 h-px bg-white/[0.08] max-w-5xl mx-auto" />
        </section>
      </main>

      {/* ============== FOOTER — same gradient #2E1065 → #4C1D95 ============== */}
      <footer className="relative bg-gradient-to-br from-[#2E1065] to-[#4C1D95] text-white pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="text-[18px] font-semibold tracking-[-0.01em]">Streamline</div>
              <p className="mt-4 text-[14px] leading-[1.65] text-white/65 max-w-sm">
                Web design, automation and systems. Built for South African
                businesses that want to grow without scaling chaos.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 mb-4">Sitemap</p>
              <ul className="space-y-3">
                {['Services', 'Portfolio', 'About', 'Contact'].map((l) => (
                  <li key={l}>
                    <Link to={`/${l.toLowerCase()}`} className="text-[14px] text-white/70 hover:text-white transition-colors duration-200">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 mb-4">Contact</p>
              <ul className="space-y-3 text-[14px] text-white/70">
                <li><a href="mailto:christian@streamline-automations.agency" className="hover:text-white">christian@streamline-automations.agency</a></li>
                <li><a href="tel:+27633063861" className="hover:text-white">+27 63 306 3861</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-[12px] text-white/50">© 2025 Streamline Automations</p>
            <div className="flex items-center gap-5 text-[12px] text-white/50">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

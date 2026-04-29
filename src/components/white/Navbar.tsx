import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LOGO =
  "https://res.cloudinary.com/dnlgohkcc/image/upload/v1777354607/Untitled_design_80_bcjybe.png";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reused across Navbar / Footer / ClientBar so the dark sections stay in sync.
const DARK_PURPLE_GRADIENT =
  "bg-gradient-to-r from-[#2E1065] via-[#4C1D95] to-[#6B21A8]";

export default function WhiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      data-cursor-invert
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${DARK_PURPLE_GRADIENT} ${
        scrolled
          ? "backdrop-blur-xl border-b border-white/15 shadow-[0_1px_24px_rgba(46,16,101,0.4)]"
          : "border-b border-white/10"
      }`}
      style={
        scrolled
          ? {
              // Frosted-on-scroll look: same gradient but slightly translucent so
              // page content shows through faintly behind the blur.
              backgroundColor: "rgba(46,16,101,0.85)",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
        >
          <img src={LOGO} alt="" aria-hidden="true" className="h-7 w-auto" />
          <span className="text-[15px] font-['DM_Sans'] font-semibold text-white tracking-[-0.02em]">
            Streamline<span className="text-white/60">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-[14px] font-['DM_Sans'] transition-colors duration-200 ${
                isActive(l.href) ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5
                       bg-white hover:bg-white/95 text-[#4C1D95] text-[13.5px]
                       font-['DM_Sans'] font-semibold rounded-full transition-colors
                       duration-200 min-h-[40px] shadow-[0_2px_14px_rgba(0,0,0,0.18)]"
          >
            Book a Free Call
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white min-h-[44px] min-w-[44px]
                     flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span className={`h-px bg-current transition-all duration-200 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={`md:hidden ${DARK_PURPLE_GRADIENT} border-b border-white/15 overflow-hidden`}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="py-3 text-[16px] font-['DM_Sans'] font-medium text-white/80 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center px-6 py-3.5
                           bg-white text-[#4C1D95] text-sm font-['DM_Sans'] font-semibold
                           rounded-full min-h-[48px] transition-colors duration-200 hover:bg-white/95"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

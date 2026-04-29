# Component Library — White Minimal

All components are paste-ready TSX. Tailwind only.

---

## Navbar

```tsx
// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  const links = [
    { label: 'Services', href: '/websites' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/85 backdrop-blur-xl border-b border-[#E8E8EC]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-tight hover:opacity-70 transition-opacity"
        >
          Streamline.
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-['DM_Sans'] transition-colors duration-150 ${
                location.pathname.startsWith(l.href)
                  ? 'text-[#0A0A0F]'
                  : 'text-[#6B6B7A] hover:text-[#0A0A0F]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2 bg-[#7B3FE4] hover:bg-[#6930D0] text-white text-sm
                       font-['DM_Sans'] font-medium rounded-full transition-colors duration-200"
          >
            Book a Free Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#0A0A0F]"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-[#E8E8EC] px-6 py-6 flex flex-col gap-5"
          >
            {links.map((l) => (
              <Link key={l.href} to={l.href}
                className="text-base font-['DM_Sans'] text-[#0A0A0F]">
                {l.label}
              </Link>
            ))}
            <Link to="/contact"
              className="mt-2 px-5 py-3 bg-[#7B3FE4] text-white text-sm font-['DM_Sans']
                         font-medium rounded-full text-center">
              Book a Free Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

---

## Footer

```tsx
// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8E8EC]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-3">
              Streamline.
            </p>
            <p className="text-sm font-['DM_Sans'] text-[#6B6B7A] leading-relaxed max-w-xs">
              Web design and automation systems for South African businesses.
              Vaal Triangle, Gauteng.
            </p>
          </div>

          <div>
            <p className="text-xs font-['DM_Sans'] uppercase tracking-[0.08em] text-[#9E9EA8] mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {[
                ['Web Design & Creation', '/websites'],
                ['Systems & Automation', '/systems'],
                ['Hosting & Maintenance', '/hosting'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href}
                    className="text-sm font-['DM_Sans'] text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-['DM_Sans'] uppercase tracking-[0.08em] text-[#9E9EA8] mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:christian@streamline-automations.agency"
                  className="text-sm font-['DM_Sans'] text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors">
                  christian@streamline-automations.agency
                </a>
              </li>
              <li>
                <a href="https://wa.me/27633063861"
                  className="text-sm font-['DM_Sans'] text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors">
                  WhatsApp: 063 306 3861
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-[#E8E8EC] mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs font-['DM_Sans'] text-[#9E9EA8]">
            © {new Date().getFullYear()} Streamline Automations. All rights reserved.
          </p>
          <p className="text-xs font-['DM_Sans'] text-[#9E9EA8]">
            Built in the Vaal Triangle, South Africa.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Button

```tsx
// src/components/ui/Button.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children, variant = 'primary', href, onClick, className = '', size = 'md'
}: ButtonProps) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
  const base = `inline-flex items-center justify-center font-['DM_Sans'] font-medium
                rounded-full transition-all duration-200 cursor-pointer ${sizes[size]}`
  const variants = {
    primary: 'bg-[#7B3FE4] text-white hover:bg-[#6930D0]',
    secondary: 'border border-[#E8E8EC] text-[#0A0A0F] hover:border-[#D4D4DA] hover:bg-[#FAFAFA]',
  }

  const el = (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}>
      {children}
    </motion.div>
  )

  return href ? <Link to={href}>{el}</Link> : el
}
```

---

## ServiceCard

```tsx
// src/components/ui/ServiceCard.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  number: string
  title: string
  description: string
  href: string
}

export function ServiceCard({ number, title, description, href }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
      className="p-8 rounded-2xl border border-[#E8E8EC] bg-white
                 hover:border-[#D4D4DA] transition-all duration-300 group flex flex-col gap-4"
    >
      <span className="text-xs font-['DM_Sans'] font-medium text-[#9E9EA8] uppercase tracking-[0.1em]">
        {number}
      </span>

      <div>
        <h3 className="text-lg font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-2">
          {title}
        </h3>
        <p className="text-sm font-['DM_Sans'] text-[#6B6B7A] leading-relaxed">
          {description}
        </p>
      </div>

      <Link to={href}
        className="mt-auto text-sm font-['DM_Sans'] font-medium text-[#7B3FE4]
                   flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
        View service
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </Link>
    </motion.div>
  )
}
```

---

## PortfolioCard

```tsx
// src/components/ui/PortfolioCard.tsx
import { motion } from 'framer-motion'

interface PortfolioCardProps {
  title: string
  description: string
  category: string
  tech: string[]
  imageSrc?: string
  href?: string
}

export function PortfolioCard({ title, description, category, tech, imageSrc, href }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group rounded-2xl border border-[#E8E8EC] bg-white overflow-hidden
                 hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)]
                 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-[#F5F5F7] overflow-hidden">
        {imageSrc
          ? <img src={imageSrc} alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-[#9E9EA8] text-sm font-['DM_Sans']">
              Screenshot coming
            </div>
        }
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-['DM_Sans'] font-medium text-[#7B3FE4]
                           bg-[#F0EBFF] px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-2">
          {title}
        </h3>
        <p className="text-sm font-['DM_Sans'] text-[#6B6B7A] leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="text-xs font-['DM_Sans'] text-[#9E9EA8]
                                     border border-[#E8E8EC] px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

---

## SectionHeader (reusable)

```tsx
// src/components/ui/SectionHeader.tsx
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  subtext?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow, headline, subtext, align = 'left'
}: SectionHeaderProps) {
  const a = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${a}`}
    >
      {eyebrow && (
        <span className="block text-xs font-['DM_Sans'] font-medium uppercase
                         tracking-[0.1em] text-[#9E9EA8] mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-['DM_Sans'] font-semibold
                      text-[#0A0A0F] tracking-tight leading-[1.15] mb-4 max-w-2xl ${a}`}>
        {headline}
      </h2>
      {subtext && (
        <p className={`text-base font-['DM_Sans'] text-[#6B6B7A] leading-relaxed max-w-xl ${a}`}>
          {subtext}
        </p>
      )}
    </motion.div>
  )
}
```

---

## Divider

```tsx
export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-[#E8E8EC] ${className}`} />
}
```

---

## StatBlock

```tsx
interface StatBlockProps { value: string; label: string }

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl md:text-4xl font-['DM_Sans'] font-semibold
                       text-[#0A0A0F] tracking-tight leading-none">
        {value}
      </span>
      <span className="text-sm font-['DM_Sans'] text-[#6B6B7A]">{label}</span>
    </div>
  )
}
```
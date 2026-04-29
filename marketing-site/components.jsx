// Streamline Automations Marketing Site — UI Kit components
// All components mount to window for cross-script sharing.

const { useState, useEffect } = React;

// ─── Lucide-ish inline icons ───────────────────────────────────
const Icon = ({ name, size = 18, color = 'currentColor', strokeWidth = 2 }) => {
  const s = size;
  const base = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    trend: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };
  return <svg {...base}>{paths[name]}</svg>;
};

// ─── Navbar ────────────────────────────────────────────────────
function Navbar({ route, onNav }) {
  const links = [['Home','/'],['Websites','/websites'],['Systems','/systems'],['Hosting','/hosting'],['Portfolio','/portfolio'],['Contact','/contact']];
  return (
    <header className="sa-navbar">
      <a className="sa-navbar-brand" onClick={(e)=>{e.preventDefault();onNav('/');}} href="/">
        <img src="../../assets/sa-icon-purple.png" alt="" height="28"/>
        <span>Streamline Automations</span>
      </a>
      <nav className="sa-navbar-links">
        {links.map(([name,path]) => (
          <a key={path} href={path} onClick={(e)=>{e.preventDefault();onNav(path);}}
             className={`sa-navlink ${route===path?'is-active':''}`}>{name}</a>
        ))}
      </nav>
      <a className="sa-btn sa-btn-orange sa-btn-sm" onClick={(e)=>{e.preventDefault();onNav('/contact');}} href="/contact">Book a Free Call</a>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
const MORPH = ['AUTOMATED','UNSTOPPABLE','SCALING','AHEAD'];
function Hero({ onNav }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(()=>setIdx(i=>(i+1)%MORPH.length), 2600); return ()=>clearInterval(t); }, []);
  return (
    <section className="sa-hero sa-noise">
      <div className="sa-hero-glow-purple"></div>
      <div className="sa-hero-glow-orange"></div>
      <div className="sa-container sa-hero-inner">
        <span className="sa-label">Johannesburg · Pretoria · Web + Automation</span>
        <h1 className="sa-h1">
          <span className="sa-h1-line">Your Business</span>
          <span className="sa-h1-line sa-h1-dim">Should Be</span>
          <span className="sa-h1-line sa-gradient-text" key={idx}>{MORPH[idx]}</span>
        </h1>
        <div className="sa-hero-rule"></div>
        <p className="sa-hero-body">
          Websites, automation systems and digital infrastructure for JHB &amp; Pretoria
          businesses that want to grow without doing everything manually.
        </p>
        <div className="sa-hero-ctas">
          <a className="sa-btn sa-btn-orange" onClick={(e)=>{e.preventDefault();onNav('/contact');}} href="/contact">
            Book a Free Strategy Call <Icon name="arrow" size={14}/>
          </a>
          <a className="sa-btn sa-btn-ghost" onClick={(e)=>{e.preventDefault();onNav('/portfolio');}} href="/portfolio">
            See Our Work <Icon name="arrow" size={14}/>
          </a>
        </div>
        <div className="sa-trust-row">
          <span>7-Day Delivery</span><span className="sa-sep">·</span>
          <span>No Templates</span><span className="sa-sep">·</span>
          <span>You Own Everything</span>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────────────
function Marquee() {
  const clients = ['BLOM Cosmetics','RecklessBear Apparel','Ameli Studio','NSA Mining','Madiega Trading'];
  const items = [...clients, ...clients, ...clients];
  return (
    <section className="sa-marquee">
      <div className="sa-marquee-track">
        {items.map((c,i)=>(
          <span key={i} className="sa-marquee-item">
            <span className="sa-marquee-text">{c}</span>
            <span className="sa-marquee-sep">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Services Bento ────────────────────────────────────────────
function ServicesBento({ onNav }) {
  const services = [
    { icon:'zap', name:'Systems & Automation', tag:'Stop doing it manually.',
      desc:'CRMs, WhatsApp bots, booking systems, admin dashboards and n8n workflows. The backend of your business, automated.',
      path:'/systems', color:'#F26A3D', wide:true },
    { icon:'globe', name:'Web Design & Creation', tag:'Built to convert.',
      desc:'Custom websites for SA businesses. No templates. No Wix. Yours from day one.',
      path:'/websites', color:'#774CFC', wide:false },
    { icon:'shield', name:'Hosting & Maintenance', tag:'Your digital foundation.',
      desc:'Domain, professional email, SSL, DNS and monthly maintenance. Locked in and looked after.',
      path:'/hosting', color:'#774CFC', wide:false },
  ];
  return (
    <section className="sa-section">
      <div className="sa-container">
        <div className="sa-intro">
          <span className="sa-label">What We Build</span>
          <h2 className="sa-h2">Three pillars. <span className="sa-gradient-text">One agency.</span></h2>
        </div>
        <div className="sa-bento">
          {services.map(s => (
            <a key={s.path} onClick={(e)=>{e.preventDefault();onNav(s.path);}} href={s.path}
               className={`sa-bento-card ${s.wide?'is-wide':''}`}>
              <div className="sa-bento-icon" style={{background:`${s.color}18`, borderColor:`${s.color}4d`}}>
                <Icon name={s.icon} size={18} color={s.color}/>
              </div>
              <div>
                <h3 className="sa-h3">{s.name}</h3>
                <p className="sa-bento-tag">{s.tag}</p>
              </div>
              <p className="sa-bento-desc">{s.desc}</p>
              <span className="sa-bento-cta" style={{color:s.color}}>
                Learn more <Icon name="arrow" size={13} color={s.color}/>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ─────────────────────────────────────────────
function WhyUs() {
  const pillars = [
    { icon:'trend', title:'Reduce Operational Costs', body:'Automate repetitive admin to cut overhead by up to 40%.', role:'purple' },
    { icon:'shield', title:'Enterprise Reliability', body:'99.9% Uptime with Supabase & n8n. Your business never goes offline.', role:'white' },
    { icon:'zap', title:'Launch in Weeks', body:'We deploy custom infrastructure faster than traditional agencies.', role:'orange' },
  ];
  const roleColor = { purple:'#774CFC', orange:'#F26A3D', white:'#ffffff' };
  return (
    <section className="sa-section sa-section-line">
      <div className="sa-container">
        <div className="sa-intro">
          <span className="sa-label">Why Streamline</span>
          <h2 className="sa-h2">Built for ROI, not just looks.</h2>
          <p className="sa-body sa-intro-sub">Real business value. Measurable impact.</p>
        </div>
        <div className="sa-grid-3">
          {pillars.map(p => (
            <div key={p.title} className={`sa-card sa-card-bar-${p.role}`}>
              <div className={`sa-icon-box sa-icon-${p.role}`}>
                <Icon name={p.icon} size={22} color={roleColor[p.role]}/>
              </div>
              <h3 className="sa-h3">{p.title}</h3>
              <p className="sa-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:'01', t:'Book a Strategy Call', d:"Free 30-minute call. We learn your business, your goals and what's holding you back." },
    { n:'02', t:'We Build', d:'Design, development, automation setup — all handled. You review, we refine. No back-and-forth chaos.' },
    { n:'03', t:'You Go Live', d:"Launch day. Your site is live, your systems are running and your business doesn't sleep anymore." },
  ];
  return (
    <section className="sa-section">
      <div className="sa-container">
        <div className="sa-intro">
          <span className="sa-label">The Process</span>
          <h2 className="sa-h2">Live in under two weeks.</h2>
        </div>
        <div className="sa-howit">
          <div className="sa-howit-line"></div>
          {steps.map(s => (
            <div key={s.n} className="sa-howit-step">
              <div className="sa-howit-num"><span>{s.n}</span></div>
              <h4 className="sa-h3">{s.t}</h4>
              <p className="sa-body">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA + Footer ────────────────────────────────────────
function FinalCTA({ onNav }) {
  return (
    <section className="sa-section sa-section-line">
      <div className="sa-container sa-final-cta">
        <span className="sa-label">Ready to Transform?</span>
        <h2 className="sa-h2">Ready to stop doing everything manually?</h2>
        <p className="sa-body">Book a free 20-minute strategy call. We'll map out exactly what your business needs — no pitch, no pressure.</p>
        <a className="sa-btn sa-btn-orange sa-btn-xl" onClick={(e)=>{e.preventDefault();onNav('/contact');}} href="/contact">
          Book a Free Strategy Call <Icon name="arrow" size={15}/>
        </a>
        <p className="sa-body-sm sa-final-micro">Free consultation · No commitment · Results-driven approach</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="sa-footer">
      <div className="sa-container sa-footer-inner">
        <div className="sa-footer-brand">
          <img src="../../assets/sa-icon-purple.png" alt="" height="32"/>
          <span className="sa-footer-tagline">We build systems that sell.</span>
        </div>
        <div className="sa-footer-meta">
          <span>© 2026 Streamline Automations</span>
          <span className="sa-sep">·</span>
          <span>Gauteng, South Africa</span>
          <span className="sa-sep">·</span>
          <a href="mailto:christian@streamline-automations.agency">christian@streamline-automations.agency</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Simple route views for interactivity ──────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="sa-section">
      <div className="sa-container" style={{maxWidth:720}}>
        <div className="sa-intro">
          <span className="sa-label">Contact</span>
          <h2 className="sa-h2">Let's map out your system.</h2>
        </div>
        {sent ? (
          <div className="sa-card sa-card-bar-orange" style={{textAlign:'center', padding:48}}>
            <Icon name="check" size={32} color="#F26A3D"/>
            <h3 className="sa-h3" style={{marginTop:16}}>Thanks. We'll reply within 24 hours.</h3>
            <p className="sa-body">Or WhatsApp us now on +27 63 306 3861 — we'll pick up faster.</p>
          </div>
        ) : (
          <form className="sa-card" onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
            <div className="sa-form-grid">
              <label className="sa-field"><span className="sa-label">Name</span><input required placeholder="Your name"/></label>
              <label className="sa-field"><span className="sa-label">WhatsApp</span><input placeholder="+27 ..."/></label>
              <label className="sa-field sa-field-full"><span className="sa-label">Email</span><input type="email" required placeholder="you@business.co.za"/></label>
              <label className="sa-field sa-field-full"><span className="sa-label">What's holding you back?</span><textarea rows="4" required placeholder="Bookings, admin, follow-ups, lead capture..."/></label>
            </div>
            <button className="sa-btn sa-btn-orange" type="submit" style={{marginTop:20}}>
              Send Message <Icon name="arrow" size={14}/>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function PortfolioPage({ onNav }) {
  const work = [
    { client:'BLOM Cosmetics', desc:'E-commerce, admin dashboard, CRM, Academy, email + WhatsApp automation.', tag:'E-COMMERCE' },
    { client:'RecklessBear Apparel', desc:'12-stage order tracking, WhatsApp automation, monthly retainer.', tag:'RETAIL' },
    { client:'Ameli Designs', desc:'Portfolio site for skin & brow studio with email lead notifications.', tag:'STUDIO' },
    { client:'NSA Mining', desc:'Internal gift-issuing system, eligibility lookup, slip printing.', tag:'INTERNAL' },
    { client:'Madiega Trading', desc:'9-page site, solar lead gen, PDF invoicing, WhatsApp alerts.', tag:'TRADE' },
    { client:'JJ Glasswork', desc:'Service website, contact form, automated lead notifications.', tag:'SERVICE' },
  ];
  return (
    <section className="sa-section">
      <div className="sa-container">
        <div className="sa-intro">
          <span className="sa-label">Portfolio</span>
          <h2 className="sa-h2">Real systems. Real clients.</h2>
        </div>
        <div className="sa-grid-3">
          {work.map(w => (
            <div key={w.client} className="sa-card sa-card-bar-purple sa-portfolio">
              <div className="sa-portfolio-img">
                <span className="sa-portfolio-mono">./{w.client.toLowerCase().replace(/\s+/g,'-')}.app</span>
              </div>
              <span className="sa-label" style={{color:'#F97316'}}>{w.tag}</span>
              <h3 className="sa-h3">{w.client}</h3>
              <p className="sa-body">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagePage({ kind, onNav }) {
  const meta = {
    websites: { eyebrow:'Websites', title:'Online presence, built to convert.', price:'From R6,500', delivery:'3–5 working days',
      features:['Up to 5 pages, fully responsive','Contact form + email notifications','Basic SEO + Google Maps + social links','No templates — custom design','You own the domain, code, everything'] },
    systems: { eyebrow:'Systems', title:'Stop doing it manually.', price:'From R12,000', delivery:'5–7 working days',
      features:['Appointment booking integration','Smart enquiry forms + lead-capture CRM','Email / WhatsApp notifications','Automated follow-ups','AI chatbot (FAQ + booking help)'] },
    hosting: { eyebrow:'Hosting', title:'Your digital foundation.', price:'From R250/mo', delivery:'Same day',
      features:['Domain + DNS management','Professional email setup','SSL + security monitoring','Monthly maintenance & updates','Priority WhatsApp support'] },
  }[kind] || {};
  return (
    <section className="sa-section">
      <div className="sa-container" style={{maxWidth:760}}>
        <span className="sa-label">{meta.eyebrow}</span>
        <h2 className="sa-h2" style={{marginTop:8}}>{meta.title}</h2>
        <div className="sa-pkg-meta">
          <div><span className="sa-price">{meta.price}</span><span className="sa-stat-label">Starting</span></div>
          <div><span className="sa-price">{meta.delivery}</span><span className="sa-stat-label">Delivery</span></div>
        </div>
        <div className="sa-card sa-card-bar-purple" style={{marginTop:28}}>
          <h3 className="sa-h3">What you get</h3>
          <ul className="sa-checklist">
            {meta.features?.map(f => (<li key={f}><Icon name="check" size={16} color="#F26A3D"/><span>{f}</span></li>))}
          </ul>
          <a className="sa-btn sa-btn-orange" onClick={(e)=>{e.preventDefault();onNav('/contact');}} href="/contact" style={{marginTop:16}}>
            Book a Free Call <Icon name="arrow" size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

function HomePage({ onNav }) {
  return (<>
    <Hero onNav={onNav}/>
    <Marquee/>
    <ServicesBento onNav={onNav}/>
    <WhyUs/>
    <HowItWorks/>
    <FinalCTA onNav={onNav}/>
  </>);
}

Object.assign(window, {
  Icon, Navbar, Hero, Marquee, ServicesBento, WhyUs, HowItWorks,
  FinalCTA, Footer, ContactPage, PortfolioPage, PackagePage, HomePage
});

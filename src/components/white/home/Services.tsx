import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';

const SERVICES = [
  {
    number: '01',
    title: 'Web Design & Creation',
    description:
      'Portfolio sites, e-commerce stores, service sites, landing pages. Custom-coded from scratch and live in 3–7 days.',
    href: '/websites',
    featured: false,
  },
  {
    number: '02',
    title: 'Systems & Automation',
    description:
      'CRMs, WhatsApp automation, admin dashboards, booking flows, n8n workflows. Stop running on spreadsheets.',
    href: '/systems',
    featured: true,
  },
  {
    number: '03',
    title: 'Hosting, Email & Maintenance',
    description:
      'Domain, email, SSL, IT support — plus a website rental option if you don’t want the upfront spend.',
    href: '/hosting',
    featured: false,
  },
];

export default function Services() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="What I build"
          headline="Three ways I help your business."
          subtext="Whether you need a site, a full system, or just to get your hosting sorted — I've got it covered."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.number} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export type PortfolioCategory = 'development' | 'branding' | 'automation';

export interface PortfolioProject {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
  tags: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  // WEB & AUTOMATION (Case Studies)
  {
    id: 'recklesbear',
    title: 'RecklessBear Apparel',
    category: 'development',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Recklessbear-Cover_m7qkde.png',
    description: 'Custom quote-engine website with a 24/7 AI Chatbot that automates bookings and qualifies leads.',
    tags: ['React', 'AI Agent', 'Booking System', 'Quote Engine'],
    challenge: 'Sales follow-up and bookings were manual, leading to missed opportunities. Management lacked visibility on team activity.',
    solution: 'We built a custom Quote-Engine Website and integrated a 24/7 AI Chatbot. The system qualifies leads, books appointments automatically, and escalates unanswered leads to the CEO.',
    results: [
      'Reduction in manual admin',
      '100% Lead visibility via CEO Dashboard',
      'Automated Booking Reminders',
      'Seamless Quote-to-Order flow'
    ],
    gallery: [
      'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679453/pexels-photo-7679453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'blom-cosmetics',
    title: 'BLOM Cosmetics',
    category: 'development',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Blom-Cover_tpxo7j.png',
    description: 'Full-stack beauty store with automated stock tracking, WhatsApp order updates, and a custom admin dashboard.',
    tags: ['E-commerce', 'Supabase', 'Inventory Logic', 'WABA Integration'],
    challenge: 'Needed a centralized command center to manage products, stock, and sales across multiple channels without manual spreadsheets.',
    solution: 'A Full-Stack E-commerce system with a custom Admin Dashboard. We automated stock tracking, low-stock alerts, and PDF invoicing.',
    results: [
      'Real-time inventory syncing',
      'Automated WhatsApp Order Updates',
      'Custom Discount Logic',
      'Zero monthly platform fees'
    ],
    gallery: [
      'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'ameli-van-zyl-design',
    title: 'Ameli van Zyl Design',
    category: 'development',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Ameli-Cover_dztneq.png',
    description: 'High-performance digital portfolio for a graphic designer, focusing on gallery speed and visual impact.',
    tags: ['Portfolio', 'Gallery', 'UX Design'],
    challenge: 'Artist needed a sleek, fast-loading portfolio that showcases artwork beautifully while maintaining a seamless inquiry process.',
    solution: 'Built a custom digital portfolio with optimized gallery performance, custom color synthesis based on art style, and automated WhatsApp lead capture via n8n.',
    results: [
      'Zero-friction commission inquiries',
      'Optimized gallery performance',
      'Custom design system',
      'Instant WhatsApp notifications'
    ]
  }
];

export const testimonials = [
  {
    quote: 'Streamline Automations built our entire backend. Stock tracking used to take hours, now it\'s automatic.',
    company: 'BLOM Cosmetics'
  },
  {
    quote: 'The AI bot handles all our bookings now. We just wake up to a full calendar.',
    company: 'RecklessBear'
  }
];

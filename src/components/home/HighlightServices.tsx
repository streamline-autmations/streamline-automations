import React from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import { AnimatedFolder, type FolderProject } from '../ui/3d-folder';

type ShowcaseCategory = 'branding' | 'web-development' | 'automation';

const HighlightServices: React.FC = () => {
  const navigate = useNavigate();

  const imageSeeds: Record<ShowcaseCategory, string[]> = {
    branding: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200',
    ],
    'web-development': [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200',
    ],
    automation: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=1200',
    ],
  };

  const toProjects = (category: ShowcaseCategory): FolderProject[] =>
    services
      .filter((s) => s.category === category)
      .slice(0, 5)
      .map((s, index) => ({
        id: s.id,
        title: s.title,
        image: imageSeeds[category][index % imageSeeds[category].length],
      }));

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-[0.08]" />
      <div className="absolute -left-40 top-1/4 w-[800px] h-[800px] bg-gradient-to-r from-brand-purple/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -right-40 top-1/3 w-[800px] h-[800px] bg-gradient-to-l from-brand-orange/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="Our Services"
          subtitle="Interactive portfolios of our core capabilities"
          centered={true}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          <AnimatedFolder
            title="Identity"
            subtitle="Design & Strategy"
            projects={toProjects('branding')}
            accent="purple"
            gradient="linear-gradient(135deg, rgba(139, 92, 246, 0.35), rgba(249, 115, 22, 0.15))"
            onClick={() => navigate('/services/branding')}
          />
          <AnimatedFolder
            title="React Systems"
            subtitle="Web Development"
            projects={toProjects('web-development')}
            accent="neutral"
            gradient="linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(139, 92, 246, 0.12))"
            onClick={() => navigate('/services/development')}
          />
          <AnimatedFolder
            title="Automation"
            subtitle="AI & Workflows"
            projects={toProjects('automation')}
            accent="orange"
            gradient="linear-gradient(135deg, rgba(249, 115, 22, 0.32), rgba(139, 92, 246, 0.12))"
            onClick={() => navigate('/services/automation')}
          />
        </div>
      </div>
    </section>
  );
};

export default HighlightServices;

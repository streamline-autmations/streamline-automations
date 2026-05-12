import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';
import { portfolioProjects } from '../data/portfolio';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <Navbar />
        <SEO title="Project Not Found" description="The project you're looking for doesn't exist." />
        <main className="bg-white min-h-screen font-['DM_Sans'] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-semibold text-[#0A0A0F] mb-4">Project Not Found</h1>
            <Link to="/portfolio" className="text-[#7B3FE4] hover:underline">
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project.challenge || !project.solution || !project.results) {
    return (
      <>
        <Navbar />
        <SEO title="Case Study Not Available" description="This case study is not yet published." />
        <main className="bg-white min-h-screen font-['DM_Sans'] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-semibold text-[#0A0A0F] mb-4">Case Study Not Available</h1>
            <Link to="/portfolio" className="text-[#7B3FE4] hover:underline">
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-[#6B6B7A] hover:text-[#0A0A0F] mb-8 text-sm transition-colors"
            >
              ← Back to portfolio
            </Link>

            <SectionHeader
              eyebrow="Case Study"
              headline={project.title}
              subtext={project.category}
              align="left"
            />

            {/* Hero image */}
            <div className="mt-10 rounded-2xl border border-[#E8E8EC] overflow-hidden bg-[#F5F5F7]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Two-column: Challenge / Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#9E9EA8] mb-3">The challenge</h3>
                <p className="text-[#3D3D47] leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#9E9EA8] mb-3">The solution</h3>
                <p className="text-[#3D3D47] leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Results */}
            <h3 className="text-lg font-semibold text-[#0A0A0F] mb-4">Key outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {project.results.map((result, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0EBFF] flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[11px] text-[#7B3FE4]">✓</span>
                  </div>
                  <p className="text-sm text-[#0A0A0F]">{result}</p>
                </div>
              ))}
            </div>

            {/* Metrics if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {project.metrics.map((m, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-[#E8E8EC] bg-[#FAFAFA] text-center">
                    <div className="text-2xl font-semibold text-[#0A0A0F] mb-1">{m.value}</div>
                    <div className="text-sm font-medium text-[#7B3FE4] mb-1">{m.label}</div>
                    {m.subtext && <p className="text-xs text-[#6B6B7A]">{m.subtext}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Tech stack */}
            <div className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#9E9EA8] mb-3">Built with</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border border-[#E8E8EC] text-sm text-[#0A0A0F] bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Divider className="my-12 md:my-16" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/portfolio" variant="secondary">Back to all work</Button>
              <Button href="/contact" variant="primary">Start your project</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;

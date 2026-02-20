import React from 'react';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  techStack: Array<{ icon: React.ComponentType<{ className?: string }>; label: string }>;
  heroImageSrc?: string;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  children,
  title,
  subtitle,
  techStack,
  heroImageSrc,
}) => {
  return (
    <div className="min-h-screen">
      <section className="section section-panel section-line">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <h1 className="h1 mb-6">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="body mb-12 max-w-3xl mx-auto font-inter">
              {subtitle}
            </p>

            {/* Tech Stack Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-full hover:border-[color:var(--purple-border)] transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-ubuntu font-medium text-[color:var(--text-mid)]">
                      {tech.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Hero Image */}
            {heroImageSrc ? (
              <div className="mt-12 w-full aspect-video rounded-3xl overflow-hidden border border-[color:var(--border)] shadow-2xl">
                <img
                  src={heroImageSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="mt-12 w-full aspect-video bg-[color:var(--surface)] border border-[color:var(--border)] rounded-3xl flex items-center justify-center text-[color:var(--text-low)] font-ubuntu">
                HERO IMAGE PLACEHOLDER
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default CaseStudyLayout;

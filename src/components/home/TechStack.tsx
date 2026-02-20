import React from 'react';

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-current">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.929 4.93a5.985 5.985 0 0 0-1.455 4.4 5.987 5.987 0 0 0 1.694 4.562 6.048 6.048 0 0 0 6.364 1.388 6.065 6.065 0 0 0 4.863-5.859zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="currentColor" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
    <path d="M12 1l8.5 5v12l-8.5 5-8.5-5V6l8.5-5z" fill="currentColor" opacity="0.6" />
    <path d="M12 1v22M4.5 6v12l7.5 4.375V5.625L4.5 6zm15 0l-7.5 4.375v17.375l7.5-4.375V6z" fill="currentColor" opacity="0.8" />
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-current">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.629-3.356-2.676 0-.933.772-1.055 1.377-1.055.681 0 1.515.066 2.192.231V5.3a6.806 6.806 0 0 0-2.313-.343c-2.134 0-3.927 1.273-3.927 3.011 0 2.088 1.312 2.773 2.885 3.501 2.084.803 3.463 1.521 3.463 2.996 0 1.284-.844 2.009-2.254 2.009-1.192 0-2.261-.276-2.872-.603v1.878c.651.192 1.75.588 2.872.588 2.497 0 3.993-1.505 3.993-3.61 0-2.213-1.268-2.88-3.467-3.999z" />
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-current">
    <circle cx="5" cy="5" r="1.5" />
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
    <circle cx="19" cy="19" r="1.5" />
    <line x1="5" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="12" y1="5" x2="19" y2="5" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="12" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="19" x2="12" y2="19" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="12" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
  </svg>
);

const VoiceflowLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-current">
    <path d="M12 2l8 4.5v7c0 5.5-8 8.5-8 8.5s-8-3-8-8.5v-7l8-4.5z" opacity="0.7" />
    <text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" opacity="0.8">V</text>
  </svg>
);

interface TechLogo {
  name: string;
  component: React.ReactNode;
}

const TechStack: React.FC = () => {
  const logos: TechLogo[] = [
    { name: 'React', component: <ReactLogo /> },
    { name: 'OpenAI', component: <OpenAILogo /> },
    { name: 'Supabase', component: <SupabaseLogo /> },
    { name: 'Stripe', component: <StripeLogo /> },
    { name: 'n8n', component: <N8nLogo /> },
    { name: 'Voiceflow', component: <VoiceflowLogo /> },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-12 font-inter">
          Powered by Next-Gen Infrastructure
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="group flex flex-col items-center gap-2 cursor-default"
              title={logo.name}
            >
              <div className="text-gray-500 opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                {logo.component}
              </div>
              <span className="text-xs text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

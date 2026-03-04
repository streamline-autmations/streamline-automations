import React from 'react';
import SEO from '../components/seo/SEO';
import ServiceDetails from '../components/services/ServiceDetails';

const Services: React.FC = () => {
  return (
    <div className="pt-20">
      <SEO 
        title="Services"
        description="Our services include custom web development, AI automation agents, and branding."
      />
      <ServiceDetails />
    </div>
  );
};

export default Services;
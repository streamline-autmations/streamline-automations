import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import SectionHeading from '../components/ui/SectionHeading';
import DotGridBackground from '../components/ui/DotGridBackground';
import SEO from '../components/seo/SEO';

const Contact: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-[#0d0b1a] relative min-h-screen">
      <SEO 
        title="Contact"
        description="Book a free strategy call with Streamline Automations. Let's discuss your custom website and AI needs."
      />
      <DotGridBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="Let's Automate Your Success"
          subtitle="Book your free consultation call and discover how our AI solutions can transform your business."
          centered={true}
          className="max-w-3xl mx-auto mb-8 md:mb-12"
        />

        <div className="mt-8 md:mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
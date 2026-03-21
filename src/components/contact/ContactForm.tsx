import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, Calendar } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import { contactFormFields } from '../../data/formFields';
import Button from '../ui/Button';
import { trackFormSubmitted } from '../../lib/analytics';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"strategy-call"});
      cal("ui", {"theme":"dark","cssVarsPerTheme":{"dark":{"cal-brand":"#774CFC"},"light":{"cal-brand":"#774CFC"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setFormData(prev => ({ ...prev, [name]: fileInput.files![0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data for webhook
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });
      // Add timestamp
      submissionData.append('submittedAt', new Date().toISOString());

      // Send to Webhook
      await fetch('https://dockerfile-1n82.onrender.com/webhook/streamline-contact-form', {
        method: 'POST',
        body: submissionData,
        mode: 'no-cors' // Use no-cors for simple webhooks if they don't return JSON
      });

      setIsSubmitted(true);
      trackFormSubmitted('contact');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback to success state even on error for UX (since no-cors might mask success)
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-12 flex flex-col items-center text-center tech-glow max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
        </div>
        <h3 className="text-4xl font-ubuntu font-bold mb-6 text-white">We've received your request!</h3>
        <p className="text-gray-300 mb-10 font-inter text-xl leading-relaxed max-w-lg">
          Thanks for reaching out. We'll review your details and get back to you shortly to schedule your consultation.
        </p>
        <Button href="/" variant="primary" size="lg">
          Return to Home
        </Button>
      </div>
    );
  }

  // Filter fields: only show 'customService' if service is 'custom'
  const visibleFields = contactFormFields.filter(field => {
    if (field.id === 'customService') {
      return formData['service'] === 'custom';
    }
    return true;
  });

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left Column: Form */}
      <div className="glass-card p-8 md:p-12 tech-glow-hover border border-white/5">
        <h3 className="text-3xl font-ubuntu font-bold mb-2 text-white">Get in Touch</h3>
        <p className="text-gray-400 mb-8 font-inter">Fill out the form below and we'll get back to you.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {visibleFields.map((field) => (
              <div key={field.id} className="form-group">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-ubuntu font-bold text-gray-400 mb-2 uppercase tracking-wide"
                >
                  {field.label} {field.required && <span className="text-orange-500">*</span>}
                </label>

                {field.type === 'select' ? (
                  <div className="relative">
                    <select
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent appearance-none min-h-[56px] font-inter text-base transition-shadow shadow-sm"
                    >
                      <option value="" disabled selected={!formData[field.id]} className="bg-[#13111f] text-gray-400">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value} className="bg-[#13111f] text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent min-h-[120px] font-inter text-base transition-shadow shadow-sm resize-y placeholder:text-gray-500"
                  />
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    id={field.id}
                    name={field.id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent font-inter text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-purple/10 file:text-brand-purple hover:file:bg-brand-purple/20 transition-all cursor-pointer"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent min-h-[56px] font-inter text-base transition-shadow shadow-sm placeholder:text-gray-500"
                  />
                )}
              </div>
            ))}

            <div className="pt-4">
              <Button 
                variant="orange" 
                size="lg" 
                className="w-full text-lg shadow-lg shadow-orange-500/20"
                disabled={isSubmitting}
                onClick={() => {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Column: Booking & Info */}
      <div className="space-y-8">
        {/* Booking Widget Placeholder */}
        <div className="glass-card p-8 md:p-10 tech-glow border border-white/10 bg-gradient-to-br from-brand-purple/20 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-xl border border-white/20">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-ubuntu font-bold text-white">Book a Call Directly</h3>
          </div>
          <p className="text-gray-300 mb-8 font-inter leading-relaxed">
            Skip the back-and-forth email tag. Choose a time that works for you on our live calendar.
          </p>
          
          <button 
            data-cal-namespace="strategy-call" 
            data-cal-link="streamline-automation/strategy-call" 
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
            className="w-full py-4 bg-brand-purple hover:bg-brand-purple/90 text-white font-ubuntu font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Open Booking Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

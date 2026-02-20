import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { contactFormFields, expectationsList } from '../../data/formFields';
import Button from '../ui/Button';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would send this data to your backend
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-10 flex flex-col items-center text-center tech-glow">
        <CheckCircle2 className="w-20 h-20 text-accent mb-6" />
        <h3 className="text-3xl font-ubuntu font-bold mb-4">Thank You!</h3>
        <p className="text-gray-300 mb-8 font-inter text-lg leading-relaxed">
          We've received your request and will contact you within 24 hours to schedule your free consultation.
        </p>
        <Button to="/" variant="primary">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start px-4">
      <div className="glass-card p-8 md:p-10 tech-glow-hover">
        <h3 className="text-3xl font-ubuntu font-bold mb-8 text-white">Book Your Call</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 md:space-y-8">
            {contactFormFields.map((field) => (
              <div key={field.id} className="form-group">
                <label
                  htmlFor={field.id}
                  className="block text-base font-ubuntu font-bold text-gray-300 mb-3"
                >
                  {field.label} {field.required && <span className="text-accent">*</span>}
                </label>

                {field.type === 'select' ? (
                  <div className="relative">
                    <select
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-brand-dark/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent appearance-none min-h-[56px] font-inter backdrop-blur-sm"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-brand-dark/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent min-h-[56px] font-inter backdrop-blur-sm"
                  />
                )}
              </div>
            ))}

            <div className="mt-10">
              <Button type="submit" variant="orange" size="lg" className="w-full text-lg">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="glass-card p-8 md:p-10 md:sticky md:top-24 tech-glow">
        <h3 className="text-2xl font-ubuntu font-bold mb-8 text-white">What to Expect</h3>
        <ul className="space-y-4 md:space-y-6">
          {expectationsList.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-accent mr-4 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 font-inter text-lg">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 md:mt-10 p-6 md:p-8 bg-brand-dark/30 rounded-lg border border-white/10">
          <p className="text-base text-gray-300 font-inter leading-relaxed">
            "Streamline helped us automate our lead qualification process, saving our sales team 15+ hours per week while increasing conversion rates by 32%."
          </p>
          <p className="text-base font-ubuntu font-bold text-white mt-4">
            — Sarah Chen, Marketing Director
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

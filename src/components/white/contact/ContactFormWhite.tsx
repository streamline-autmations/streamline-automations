import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, Calendar } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import { contactFormFields } from '../../../data/formFields';
import Button from '../ui/Button';
import { trackFormSubmitted } from '../../../lib/analytics';

const ContactFormWhite: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"strategy-call"});
      cal("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#7B3FE4"}},"hideEventTypeDetails":false,"layout":"month_view"});
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
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submissionData.append(key, value);
        } else if (typeof value === 'string') {
          submissionData.append(key, value);
        }
      });
      submissionData.append('submittedAt', new Date().toISOString());
      await fetch('https://dockerfile-1n82.onrender.com/webhook/streamline-contact-form', {
        method: 'POST',
        body: submissionData,
        mode: 'no-cors'
      });
      setIsSubmitted(true);
      trackFormSubmitted('contact');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleFields = contactFormFields.filter(field => {
    if (field.id === 'customService') {
      return formData['service'] === 'custom';
    }
    return true;
  });

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="max-w-2xl mx-auto p-10 bg-white rounded-2xl border border-[#E8E8EC] text-center"
      >
        <div className="w-20 h-20 bg-[#F0EBFF] rounded-full flex items-center justify-center mb-6 mx-auto border border-[#7B3FE4]/20">
          <CheckCircle2 className="w-10 h-10 text-[#7B3FE4]" />
        </div>
        <h3 className="text-2xl font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-3">
          Got it — message received.
        </h3>
        <p className="text-[#6B6B7A] mb-8 leading-relaxed">
          Thanks for reaching out. I'll review your details and get back to you within 24 hours to set up your call.
        </p>
        <Button href="/" variant="primary">Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#E8E8EC] p-8 md:p-10">
        <h3 className="text-2xl font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-2">
          Let's talk.
        </h3>
        <p className="text-[#6B6B7A] mb-8 leading-relaxed">
          Book a free 30-minute call or send a message. No pitch deck — just a plan.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleFields.map((field) => {
              const isFullWidth = field.id === 'message' || field.id === 'customService';
              return (
                <div key={field.id} className={`${isFullWidth ? 'md:col-span-2' : ''}`}>
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-['DM_Sans'] font-medium uppercase tracking-[0.1em] text-[#9E9EA8] mb-2"
                  >
                    {field.label} {field.required && <span className="text-[#7B3FE4]">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <div className="relative">
                      <select
                        id={field.id}
                        name={field.id}
                        required={field.required}
                        defaultValue=""
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-[#E8E8EC] rounded-xl text-[#0A0A0F] focus:outline-none focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#7B3FE4]/30 min-h-[48px] text-sm appearance-none"
                      >
                        <option value="" disabled className="text-[#9E9EA8]">
                          {field.placeholder}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value} className="text-[#0A0A0F]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-[#9E9EA8]" />
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
                      className="w-full px-4 py-3 bg-white border border-[#E8E8EC] rounded-xl text-[#0A0A0F] focus:outline-none focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#7B3FE4]/30 text-sm resize-y placeholder:text-[#9E9EA8] leading-relaxed"
                    />
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      id={field.id}
                      name={field.id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#E8E8EC] rounded-xl text-[#0A0A0F] focus:outline-none focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#7B3FE4]/30 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#F0EBFF] file:text-[#7B3FE4] hover:file:bg-[#E8E8EC] transition-all cursor-pointer"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#E8E8EC] rounded-xl text-[#0A0A0F] focus:outline-none focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#7B3FE4]/30 text-sm placeholder:text-[#9E9EA8]"
                    />
                  )}
                </div>
              );
            })}

            <div className="md:col-span-2 pt-4" data-cursor="view">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Book a Free Call'}
              </Button>
              <p className="text-xs text-[#6B6B7A] text-center mt-3">
                Or WhatsApp: 063 306 3861
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Booking CTA */}
      <div className="mt-8 bg-[#F5F5F7] rounded-2xl p-6 md:p-8 border border-[#E8E8EC]">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-white rounded-lg border border-[#E8E8EC]">
            <Calendar className="w-5 h-5 text-[#7B3FE4]" />
          </div>
          <h4 className="text-lg font-['DM_Sans'] font-semibold text-[#0A0A0F]">
            Prefer to book directly?
          </h4>
        </div>
        <p className="text-sm text-[#6B6B7A] mb-4">
          Pick a time that works for you on my live calendar.
        </p>
        <button
          data-cal-namespace="strategy-call"
          data-cal-link="streamline-automation/strategy-call"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
          className="w-full py-3 bg-white border border-[#E8E8EC] text-[#0A0A0F] font-medium rounded-xl hover:border-[#7B3FE4] hover:text-[#7B3FE4] transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Open Booking Calendar
        </button>
      </div>
    </div>
  );
};

export default ContactFormWhite;

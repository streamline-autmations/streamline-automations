import React from 'react';
import { Check, X } from 'lucide-react';

const PricingComparisonTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="p-4 text-gray-400 font-normal border-b border-white/10">Feature</th>
            <th className="p-4 text-white font-bold border-b border-white/10 w-1/4">Online Presence</th>
            <th className="p-4 text-brand-orange font-bold border-b border-brand-orange/30 bg-brand-orange/5 w-1/4">Client Magnet</th>
            <th className="p-4 text-brand-purple font-bold border-b border-brand-purple/30 bg-brand-purple/5 w-1/4">Accelerator</th>
          </tr>
        </thead>
        <tbody className="text-sm font-inter">
          {/* Strategy & Design */}
          <tr className="bg-white/[0.02]">
            <td className="p-4 text-gray-300 font-medium" colSpan={4}>Strategy & Design</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Custom Design</td>
            <td className="p-4 text-white border-b border-white/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Pages Included</td>
            <td className="p-4 text-white border-b border-white/5">Up to 5</td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5">Unlimited</td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5">Unlimited</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Mobile Optimized</td>
            <td className="p-4 text-white border-b border-white/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>

          {/* Automation & AI */}
          <tr className="bg-white/[0.02]">
            <td className="p-4 text-gray-300 font-medium" colSpan={4}>Automation & AI</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Contact Form</td>
            <td className="p-4 text-white border-b border-white/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">WhatsApp Notifications</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">AI Chatbot</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Booking System</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><Check className="w-5 h-5 text-green-500" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">CRM Integration</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5">Basic</td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5">Advanced</td>
          </tr>

          {/* Growth & Support */}
          <tr className="bg-white/[0.02]">
            <td className="p-4 text-gray-300 font-medium" colSpan={4}>Growth & Support</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">SEO Setup</td>
            <td className="p-4 text-white border-b border-white/5">Basic</td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5">Advanced</td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5">Advanced</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Analytics Dashboard</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
          <tr>
            <td className="p-4 text-gray-400 border-b border-white/5">Monthly Optimization</td>
            <td className="p-4 text-white border-b border-white/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-orange/5"><X className="w-5 h-5 text-white/20" /></td>
            <td className="p-4 text-white border-b border-white/5 bg-brand-purple/5"><Check className="w-5 h-5 text-green-500" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingComparisonTable;

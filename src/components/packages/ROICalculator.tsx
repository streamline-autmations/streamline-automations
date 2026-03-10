import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, TrendingUp } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [leadsPerMonth, setLeadsPerMonth] = useState(20);
  const [valuePerLead, setValuePerLead] = useState(1500); // Rands
  
  // Assumptions
  const lostLeadRate = 0.3; // 30% of leads lost due to slow response
  const timePerLead = 20; // 20 mins manual follow-up per lead
  
  const potentialRevenueLost = Math.round(leadsPerMonth * lostLeadRate * valuePerLead);
  const timeWastedHours = Math.round((leadsPerMonth * timePerLead) / 60);
  const automationCost = 15000; // Client Magnet cost
  const paybackPeriod = (automationCost / potentialRevenueLost).toFixed(1);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">ROI Calculator</h3>
        <p className="text-gray-400">See how much manual admin is costing you right now.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Leads per Month: <span className="text-white font-bold">{leadsPerMonth}</span>
            </label>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={leadsPerMonth}
              onChange={(e) => setLeadsPerMonth(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Average Lead Value (R): <span className="text-white font-bold">R{valuePerLead}</span>
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={valuePerLead}
              onChange={(e) => setValuePerLead(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple"
            />
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-400">
            <p className="mb-2"><strong>The Problem:</strong> Without automation, businesses typically lose ~30% of leads due to slow response times (Harvard Business Review).</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <motion.div 
            key={potentialRevenueLost}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-center"
          >
            <div className="flex items-center justify-center gap-2 text-red-400 mb-1">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide font-bold">Monthly Revenue Lost</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">
              R{potentialRevenueLost.toLocaleString()}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide font-bold">Hours Wasted</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {timeWastedHours}h <span className="text-sm font-normal text-gray-500">/mo</span>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide font-bold">Payback Time</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {parseFloat(paybackPeriod) < 1 ? '< 1' : paybackPeriod} <span className="text-sm font-normal text-gray-500">months</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
             <p className="text-sm text-gray-400">
               *Based on the <strong>Client Magnet</strong> package (R15,000)
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;

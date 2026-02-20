import React from 'react';
import { Palette, Globe, Cpu } from 'lucide-react';

const AutomationVisualizer: React.FC = () => {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative max-w-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent rounded-3xl blur-xl"></div>

      {/* Digital Ecosystem Stack - with floating animation */}
      <div className="relative flex flex-col items-center animate-blob">
        {/* Title */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-ubuntu font-bold text-white mb-2">
            Your Complete Digital Ecosystem
          </h3>
          <p className="text-sm text-gray-400 font-inter">
            We handle the entire stack
          </p>
        </div>

        {/* Module 1 - Brand Identity */}
        <div className="w-full p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center gap-4 group hover:bg-brand-purple/15 transition-all duration-300">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
            <Palette className="w-6 h-6 text-brand-purple animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-ubuntu font-bold text-white">Identity & Design</h4>
          </div>
          <div className="px-3 py-1 bg-brand-purple/20 border border-brand-purple/30 rounded-full">
            <span className="text-xs font-ubuntu font-medium text-brand-purple">Polished</span>
          </div>
        </div>

        {/* Connector 1 - Vertical Spine */}
        <div className="relative h-12 w-[2px] bg-white/10 my-2">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-brand-purple to-transparent animate-beam-down opacity-70"></div>
        </div>

        {/* Module 2 - Web Infrastructure */}
        <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all duration-300">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-ubuntu font-bold text-white">Web Infrastructure</h4>
          </div>
          <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full">
            <span className="text-xs font-ubuntu font-medium text-white">Vite Speed</span>
          </div>
        </div>

        {/* Connector 2 - Vertical Spine */}
        <div className="relative h-12 w-[2px] bg-white/10 my-2">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-brand-purple to-transparent animate-beam-down opacity-70" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Module 3 - AI Automation */}
        <div className="w-full p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center gap-4 group hover:bg-brand-purple/15 transition-all duration-300">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-accent animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-ubuntu font-bold text-white">AI Automation</h4>
          </div>
          <div className="px-3 py-1 bg-brand-purple/20 border border-brand-purple/30 rounded-full">
            <span className="text-xs font-ubuntu font-medium text-accent">Running</span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-md">
            From brand identity to live automation—one unified system built to scale.
          </p>
        </div>

        {/* Ambient particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-brand-purple rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/3 -right-4 w-2 h-2 bg-white rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-4 left-1/4 w-2 h-2 bg-brand-purple rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default AutomationVisualizer;

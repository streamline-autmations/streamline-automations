import React from 'react';
import { Palette, Globe, Cpu } from 'lucide-react';

const DigitalEcosystemStack: React.FC = () => {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative max-w-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent rounded-3xl blur-xl"></div>

      <div className="relative">
        <div className="text-center mb-8">
          <h3 className="text-xl font-ubuntu font-bold text-white mb-2">
            Your Complete Digital Ecosystem
          </h3>
          <p className="text-sm text-gray-400 font-inter">
            Brand. Build. Automate. All in one.
          </p>
        </div>

        <div className="animate-blob">
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center gap-4 w-full max-w-md group hover:bg-brand-purple/20 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                <Palette className="w-6 h-6 text-brand-purple animate-pulse" style={{ animationDelay: '0s' }} />
              </div>
              <div className="flex-1">
                <div className="text-white font-ubuntu font-bold text-base">Identity & Design</div>
              </div>
              <div className="px-3 py-1 bg-brand-purple/20 border border-brand-purple/40 rounded-full">
                <span className="text-xs font-ubuntu font-medium text-brand-purple">Polished</span>
              </div>
            </div>

            <div className="relative h-12 w-[2px] bg-white/10 my-2">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-brand-purple to-transparent animate-beam" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/20 flex items-center gap-4 w-full max-w-md group hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="flex-1">
                <div className="text-white font-ubuntu font-bold text-base">Web Infrastructure</div>
              </div>
              <div className="px-3 py-1 bg-white/10 border border-white/30 rounded-full">
                <span className="text-xs font-ubuntu font-medium text-white">Vite Speed</span>
              </div>
            </div>

            <div className="relative h-12 w-[2px] bg-white/10 my-2">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent animate-beam" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center gap-4 w-full max-w-md group hover:bg-brand-purple/20 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-accent animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
              <div className="flex-1">
                <div className="text-white font-ubuntu font-bold text-base">AI Automation</div>
              </div>
              <div className="px-3 py-1 bg-brand-purple/20 border border-brand-purple/40 rounded-full">
                <span className="text-xs font-ubuntu font-medium text-accent">Running</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-md mx-auto">
            We don't just build websites—we architect complete business systems that work together seamlessly.
          </p>
        </div>

        <div className="absolute top-1/4 left-8 w-2 h-2 bg-brand-purple rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-8 w-2 h-2 bg-white rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-12 w-2 h-2 bg-brand-purple rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default DigitalEcosystemStack;

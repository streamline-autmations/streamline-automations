import React from 'react';

interface MultiLineDividerProps {
  className?: string;
}

const MultiLineDivider: React.FC<MultiLineDividerProps> = ({ className = '' }) => {
  return (
    <div className={`w-full py-8 md:py-12 ${className}`}>
      <div className="container">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Line 1 - Purple, subtle */}
          <div className="h-[1px] w-full bg-brand-purple opacity-20"></div>

          {/* Line 2 - Animated gradient, prominent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-brand-purple via-purple-400 to-brand-purple bg-[length:200%_200%] animate-gradient opacity-80"></div>

          {/* Line 3 - Orange, subtle */}
          <div className="h-[1px] w-full bg-brand-purple opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default MultiLineDivider;

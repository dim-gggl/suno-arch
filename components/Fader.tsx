import React from 'react';

interface FaderProps {
  value: number; // 0 to 1
  label: string;
}

const Fader: React.FC<FaderProps> = ({ value, label }) => {
  const percentage = Math.min(Math.max(value * 100, 0), 100);

  return (
    <div className="flex flex-col items-center h-48 w-12 gap-3 group">
      <div className="relative flex-1 w-4 bg-black/40 rounded-full border border-synth-border overflow-hidden p-[2px]">
        {/* Track Markings */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 px-[6px] opacity-30 pointer-events-none">
             {[...Array(10)].map((_, i) => (
                 <div key={i} className="w-full h-[1px] bg-white"></div>
             ))}
        </div>

        {/* The Handle */}
        <div 
            className="absolute left-0 right-0 h-8 bg-synth-panel border border-white/20 shadow-[0_0_10px_rgba(0,240,255,0.2)] rounded-sm flex items-center justify-center z-10 transition-all duration-700 ease-out"
            style={{ bottom: `calc(${percentage}% - 16px)` }}
        >
            <div className="w-full h-[2px] bg-neon-cyan shadow-[0_0_4px_#00f0ff]"></div>
        </div>
        
        {/* Fill Level */}
        <div 
            className="absolute bottom-0 left-0 right-0 bg-neon-cyan/20 w-full transition-all duration-700 ease-out"
            style={{ height: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-[10px] font-mono text-gray-500 uppercase rotate-0 tracking-wider">{label}</span>
    </div>
  );
};

export default Fader;
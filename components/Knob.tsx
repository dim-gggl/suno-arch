import React from 'react';

interface KnobProps {
  value: number; // 0 to 1
  label: string;
  color: 'cyan' | 'pink' | 'acid';
}

const Knob: React.FC<KnobProps> = ({ value, label, color }) => {
  // Convert 0-1 to degrees (-135 to 135)
  const minDeg = -135;
  const maxDeg = 135;
  const deg = minDeg + (value * (maxDeg - minDeg));

  const colorMap = {
    cyan: '#00f0ff',
    pink: '#ff003c',
    acid: '#ccff00',
  };

  const activeColor = colorMap[color];

  return (
    <div className="flex flex-col items-center justify-center gap-2 select-none group">
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        {/* Outer Ring Track */}
        <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
           <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#27272a"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset="62.8" /* Leaves the bottom gap */
            className="opacity-50"
          />
           {/* Active Value Arc */}
           <circle
            cx="50"
            cy="50"
            r="40"
            stroke={activeColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * 0.75 * value)}
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          />
        </svg>

        {/* Knob Body */}
        <div 
          className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-synth-panel border-2 border-synth-border shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${deg}deg)` }}
        >
            <div className="w-1 h-3 md:h-4 bg-white rounded-full absolute -top-1 shadow-[0_0_5px_white]"></div>
        </div>

        {/* Value Text Overlay */}
        <div className="absolute -bottom-6 font-mono text-xs text-white/70 tracking-widest">
            {(value).toFixed(2)}
        </div>
      </div>
      <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold ${color === 'cyan' ? 'text-neon-cyan' : color === 'pink' ? 'text-neon-pink' : 'text-acid-green'}`}>
        {label}
      </span>
    </div>
  );
};

export default Knob;
import React from 'react';

interface TagButtonProps {
  label: string;
  category: 'structure' | 'style' | 'instrument' | 'meta';
  onClick: () => void;
}

const TagButton: React.FC<TagButtonProps> = ({ label, category, onClick }) => {
  const borderColors = {
    structure: 'border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10',
    style: 'border-acid-green/30 text-acid-green hover:border-acid-green hover:bg-acid-green/10',
    instrument: 'border-neon-pink/30 text-neon-pink hover:border-neon-pink hover:bg-neon-pink/10',
    meta: 'border-white/20 text-gray-400 hover:border-white/60 hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 text-xs font-mono border bg-transparent 
        transition-all duration-200 uppercase tracking-wider
        backdrop-blur-sm
        ${borderColors[category]}
      `}
    >
      {label}
    </button>
  );
};

export default TagButton;
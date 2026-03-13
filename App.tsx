import React, { useState, useRef, useEffect } from 'react';
import { generateSunoData } from './services/geminiService';
import { SongConfig, COMMON_TAGS } from './types';
import Knob from './components/Knob';
import TagButton from './components/TagButton';
import { Wand2, Copy, AlertCircle, Music4, Zap, Sliders, Eraser } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<SongConfig | null>(null);
  const lyricsRef = useRef<HTMLTextAreaElement>(null);

  // Initial dummy data for visual testing before generation
  useEffect(() => {
     // Optional: Set initial state or leave empty
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateSunoData(prompt);
      setConfig(data);
    } catch (e) {
      setError("Failed to generate. Please check API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const insertTag = (tag: string) => {
    if (lyricsRef.current) {
      const start = lyricsRef.current.selectionStart;
      const end = lyricsRef.current.selectionEnd;
      const currentText = config?.lyrics || '';
      const newText = currentText.substring(0, start) + tag + '\n' + currentText.substring(end);
      
      setConfig(prev => prev ? { ...prev, lyrics: newText } : { 
          lyrics: tag + '\n', 
          stylePrompt: '', 
          excludeTags: '', 
          styleInfluence: 0.5, 
          weirdness: 0.5, 
          audioInfluence: 0.5 
      });

      // Restore focus and cursor
      setTimeout(() => {
        lyricsRef.current?.focus();
        lyricsRef.current?.setSelectionRange(start + tag.length + 1, start + tag.length + 1);
      }, 0);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen bg-synth-bg text-gray-200 font-sans selection:bg-neon-cyan/30 selection:text-white p-4 md:p-8 flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-7xl mb-8 flex justify-between items-end border-b border-synth-border pb-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 uppercase font-sans">
            Suno<span className="text-neon-cyan">.Arch</span>
          </h1>
          <p className="text-xs md:text-sm font-mono text-gray-500 mt-1 uppercase tracking-[0.3em]">
            AI Music Prompt Engineering System
          </p>
        </div>
        <div className="flex gap-2 text-[10px] font-mono text-neon-pink animate-pulse">
            ● SYSTEM_READY
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Input Panel */}
          <div className="bg-synth-panel border border-synth-border p-1 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan"></div>
             
             <div className="p-5 bg-black/40 backdrop-blur-md">
                <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-3 block flex items-center gap-2">
                   <Music4 size={14} /> Concept Input
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your song idea (e.g., 'A cyberpunk synthwave track about a robot discovering emotions, fast tempo, female vocals')"
                  className="w-full h-32 bg-transparent border-none focus:ring-0 text-white font-mono text-sm resize-none placeholder-gray-700 leading-relaxed"
                />
                
                <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4">
                   <div className="text-[10px] text-gray-600 font-mono">
                      TOKEN_LIMIT: 2048
                   </div>
                   <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt}
                    className={`
                      flex items-center gap-2 px-6 py-2 
                      font-bold uppercase tracking-wider text-xs font-mono
                      transition-all duration-300
                      ${loading 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-neon-cyan text-black hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                      }
                    `}
                   >
                     {loading ? (
                       <span className="animate-pulse">Processing...</span>
                     ) : (
                       <>
                         <Wand2 size={14} /> Initialize
                       </>
                     )}
                   </button>
                </div>
             </div>
          </div>

          {/* Parameters Panel (Visualizer) */}
          <div className="bg-synth-panel border border-synth-border p-6 relative">
             <div className="absolute -left-1 top-6 bottom-6 w-1 bg-gradient-to-b from-transparent via-synth-border to-transparent"></div>
             
             <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sliders size={14} /> Generated Parameters
             </h3>

             {config ? (
               <div className="grid grid-cols-3 gap-4">
                  <Knob value={config.weirdness} label="Weirdness" color="pink" />
                  <Knob value={config.styleInfluence} label="Influence" color="cyan" />
                  <Knob value={config.audioInfluence} label="Audio" color="acid" />
               </div>
             ) : (
               <div className="h-32 flex items-center justify-center text-gray-700 font-mono text-xs uppercase">
                 Waiting for data stream...
               </div>
             )}
          </div>

          {/* Exclude Panel */}
          <div className="bg-synth-panel border border-synth-border p-1">
             <div className="bg-[#1a1010] p-4 border-l-2 border-neon-pink">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-neon-pink uppercase tracking-widest flex items-center gap-2">
                    <Eraser size={14} /> Exclude
                  </label>
                  {config?.excludeTags && (
                    <button onClick={() => copyToClipboard(config.excludeTags)} className="text-gray-500 hover:text-neon-pink transition-colors">
                      <Copy size={12} />
                    </button>
                  )}
                </div>
                <div className="font-mono text-sm text-gray-300 min-h-[1.5em]">
                  {config?.excludeTags || <span className="text-gray-700">--</span>}
                </div>
             </div>
          </div>

           {/* Error Display */}
           {error && (
             <div className="bg-red-900/20 border border-red-500/30 p-4 flex items-start gap-3 text-red-400 text-sm font-mono">
               <AlertCircle size={16} className="mt-0.5" />
               {error}
             </div>
           )}

        </div>

        {/* RIGHT COLUMN: Output & Editor */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Style Prompt Output */}
          <div className="bg-synth-panel border border-synth-border p-1 group">
             <div className="bg-[#0f1515] p-4 border-l-2 border-acid-green relative overflow-hidden">
                <div className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => config && copyToClipboard(config.stylePrompt)} className="bg-acid-green text-black p-1.5 hover:bg-white transition-colors">
                      <Copy size={14} />
                   </button>
                </div>
                <label className="text-xs font-mono text-acid-green uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Zap size={14} /> Style Prompt
                </label>
                <div className="font-mono text-lg md:text-xl text-white leading-snug break-words whitespace-pre-wrap">
                  {config?.stylePrompt || <span className="text-gray-700 text-sm">Waiting for generation...</span>}
                </div>
             </div>
          </div>

          {/* Lyrics Editor */}
          <div className="flex-1 bg-synth-panel border border-synth-border flex flex-col min-h-[500px]">
             
             {/* Toolbar */}
             <div className="border-b border-synth-border p-3 flex flex-wrap gap-2 items-center bg-black/20">
                <span className="text-[10px] font-mono text-gray-500 uppercase mr-2">Tag Helper:</span>
                <div className="flex flex-wrap gap-2">
                  {COMMON_TAGS.map(tag => (
                    <TagButton 
                      key={tag.id} 
                      label={tag.id} 
                      category={tag.category} 
                      onClick={() => insertTag(tag.id)} 
                    />
                  ))}
                </div>
             </div>

             {/* Text Area */}
             <div className="relative flex-1 group">
                <textarea
                  ref={lyricsRef}
                  value={config?.lyrics || ''}
                  onChange={(e) => setConfig(prev => prev ? { ...prev, lyrics: e.target.value } : null)}
                  placeholder="// Lyrics will appear here..."
                  className="w-full h-full bg-transparent p-6 font-mono text-sm leading-relaxed text-gray-300 focus:outline-none focus:text-white resize-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                  spellCheck={false}
                />
                
                {config?.lyrics && (
                   <button 
                     onClick={() => copyToClipboard(config.lyrics)}
                     className="absolute bottom-4 right-4 bg-synth-border text-white px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-neon-cyan hover:text-black transition-all flex items-center gap-2 border border-white/10"
                   >
                     <Copy size={14} /> Copy Lyrics
                   </button>
                )}
             </div>
          </div>

        </div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="w-full max-w-7xl mt-8 pt-4 border-t border-synth-border flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase">
        <div>v1.0.4 // STABLE // GEMINI-3-FLASH</div>
        <div className="flex gap-4">
           <span>CPU: 12%</span>
           <span>MEM: 432MB</span>
           <span className="text-neon-cyan">NET: CONNECTED</span>
        </div>
      </footer>

    </div>
  );
};

export default App;
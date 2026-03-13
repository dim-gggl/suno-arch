export interface SongConfig {
  lyrics: string;
  stylePrompt: string;
  excludeTags: string;
  styleInfluence: number; // 0.0 to 1.0
  weirdness: number; // 0.0 to 1.0
  audioInfluence: number; // 0.0 (Instrumental) to 1.0 (Vocal heavy) - though Suno usually handles this via tags, we simulate a "slider" for instruction
}

export type SunoTag = {
  id: string;
  label: string;
  category: 'structure' | 'style' | 'instrument' | 'meta';
};

export const COMMON_TAGS: SunoTag[] = [
  { id: '[Intro]', label: 'Intro', category: 'structure' },
  { id: '[Verse]', label: 'Verse', category: 'structure' },
  { id: '[Chorus]', label: 'Chorus', category: 'structure' },
  { id: '[Bridge]', label: 'Bridge', category: 'structure' },
  { id: '[Pre-Chorus]', label: 'Pre-Chorus', category: 'structure' },
  { id: '[Outro]', label: 'Outro', category: 'structure' },
  { id: '[Instrumental Break]', label: 'Inst. Break', category: 'structure' },
  { id: '[Drop]', label: 'Drop', category: 'style' },
  { id: '[Hook]', label: 'Hook', category: 'structure' },
  { id: '[Solo]', label: 'Solo', category: 'instrument' },
  { id: '[Fade Out]', label: 'Fade Out', category: 'meta' },
  { id: '[End]', label: 'End', category: 'meta' },
];
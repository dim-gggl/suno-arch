import { GoogleGenAI, Type } from "@google/genai";
import { SongConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSunoData = async (description: string): Promise<SongConfig> => {
  const modelId = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an expert music producer and lyricist specializing in prompting for Suno AI (v3.5/v4).
    Your task is to take a user's song description and generate:
    1. Complete Lyrics formatted specifically for Suno (using tags like [Verse 1], [Chorus], [Outro], etc.).
    2. A structured "Style Prompt" using a specific layered format.
    3. An "Exclude" prompt (elements to avoid).
    4. Recommended numerical settings for Suno parameters (simulated).
    
    RULES FOR LYRICS:
    - Use standard Suno metatags: [Intro], [Verse], [Chorus], [Bridge], [Outro], [Instrumental].
    - Ensure rhyme schemes fit the genre.
    
    RULES FOR STYLE PROMPT:
    - You MUST use exactly this 4-line format:
      genre: [Main Genre & Sub-genre]
      vocal style: [Voice type, gender, processing effects]
      instrument: [Key instruments]
      production style: [Tempo, mood, era, mixing style]
    - Do not output a single comma-separated line. Use the keys above.
    
    RULES FOR PARAMETERS:
    - weirdness: 0 to 1 scale.
    - styleInfluence: 0 to 1 scale (alpha/beta feature).
    - audioInfluence: 0 (pure instrumental) to 1 (vocal focus).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: description,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: { type: Type.STRING, description: "The full lyrics with tags" },
            stylePrompt: { type: Type.STRING, description: "Structured style definition with genre, vocal style, instrument, and production style layers" },
            excludeTags: { type: Type.STRING, description: "Styles to exclude" },
            styleInfluence: { type: Type.NUMBER, description: "0.0 to 1.0" },
            weirdness: { type: Type.NUMBER, description: "0.0 to 1.0" },
            audioInfluence: { type: Type.NUMBER, description: "0.0 to 1.0" }
          },
          required: ["lyrics", "stylePrompt", "excludeTags", "styleInfluence", "weirdness", "audioInfluence"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SongConfig;

  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};
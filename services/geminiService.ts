
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateUsernames(theme: string, symbolTheme: string, symbolCount: string): Promise<string[]> {
  try {
    const finalSymbolTheme = symbolTheme.trim() || 'any cool symbols';
    const finalSymbolCount = symbolCount.trim() || '2';
    
    const prompt = `Generate 4 creative and unique usernames based on the main theme '${theme}'. Each username should be a single word (no spaces) and cleverly integrate approximately ${finalSymbolCount} symbols related to '${finalSymbolTheme}'. The usernames should be visually appealing and suitable for online gaming or social media profiles. The length should be between 8 and 16 characters.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            usernames: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "A creative username with symbols.",
              },
            },
          },
          required: ["usernames"],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result && Array.isArray(result.usernames)) {
      return result.usernames;
    } else {
      throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error generating usernames:", error);
    throw new Error("Failed to generate usernames. Please try again.");
  }
}

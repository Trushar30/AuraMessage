
import { GoogleGenAI, Type } from "@google/genai";

export interface MessageSecurityReport {
  isToxic: boolean;
  toxicityReason?: string;
  isPhishing: boolean;
  phishingReason?: string;
  isFakeNews: boolean;
  fakeNewsReason?: string;
  suspiciousLinks: { url: string; risk: 'low' | 'medium' | 'high'; reason: string }[];
  overallRiskScore: number; // 0-100
}

export const analyzeEmotion = async (base64Image: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
            { text: "Analyze the facial expression of the person in this image. Return exactly one word describing their current emotion (e.g., Neutral, Joyful, Tense, Calm, Melancholy, Focused). If you can't see a face clearly, return 'Undefined'." }
          ]
        }
      ],
      config: {
        maxOutputTokens: 10,
        temperature: 0.1
      }
    });
    return response.text?.trim() || "Undefined";
  } catch (error) {
    console.error("Emotion analysis failed:", error);
    return "Undefined";
  }
};

export const checkUsernameSecurity = async (newUsername: string, existingUsernames: string[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare the target username "${newUsername}" against this list of verified users: [${existingUsernames.join(', ')}]. 
      Assess if this username looks like an attempt to impersonate someone.
      Provide a risk score from 0 to 100 and a brief warning if risk > 30.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            warning: { type: Type.STRING },
            similarTo: { type: Type.STRING }
          },
          required: ["riskScore"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { riskScore: 0, warning: "" };
  }
};

export const analyzeMessageSecurity = async (text: string): Promise<MessageSecurityReport> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Audit message security: "${text}". Structured JSON output required.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isToxic: { type: Type.BOOLEAN },
            toxicityReason: { type: Type.STRING },
            isPhishing: { type: Type.BOOLEAN },
            phishingReason: { type: Type.STRING },
            isFakeNews: { type: Type.BOOLEAN },
            fakeNewsReason: { type: Type.STRING },
            suspiciousLinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  url: { type: Type.STRING },
                  risk: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            },
            overallRiskScore: { type: Type.NUMBER }
          },
          required: ["isToxic", "isPhishing", "isFakeNews", "suspiciousLinks", "overallRiskScore"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { isToxic: false, isPhishing: false, isFakeNews: false, suspiciousLinks: [], overallRiskScore: 0 };
  }
};

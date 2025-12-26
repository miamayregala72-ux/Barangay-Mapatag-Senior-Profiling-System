
import { GoogleGenAI } from "@google/genai";
import { SeniorCitizen } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateHealthSummary = async (senior: SeniorCitizen): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a professional, brief health summary and suggested care tips for this senior citizen based on their profile. 
      Name: ${senior.firstName} ${senior.lastName}
      Age: ${senior.age}
      Medical Conditions: ${senior.medicalInfo.conditions.join(", ")}
      Medications: ${senior.medicalInfo.medications.join(", ")}
      Mobility: ${senior.medicalInfo.mobilityIssues}
      Allergies: ${senior.medicalInfo.allergies.join(", ")}`,
      config: {
        systemInstruction: "You are a geriatric health consultant providing brief, supportive summaries for barangay health workers.",
        temperature: 0.7,
      },
    });

    return response.text || "Unable to generate summary at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI insights currently unavailable.";
  }
};

export const getSmartSearchSuggestions = async (query: string): Promise<string[]> => {
    // Mock logic or could use Gemini to suggest search terms
    return ["Hypertensive seniors in Purok 1", "Seniors with no recent checkups", "Widowed females over 80"];
}

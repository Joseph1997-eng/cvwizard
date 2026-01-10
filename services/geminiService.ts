import { GoogleGenAI, Type } from "@google/genai";
import { Experience, PersonalInfo, ResumeData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });
const modelId = 'gemini-3-flash-preview';

export const generateSummary = async (info: PersonalInfo, experiences: Experience[]): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";

  const jobHistory = experiences.map(e => `${e.position} at ${e.company}`).join(', ');
  
  const prompt = `
    Write a professional, compelling professional summary (max 3-4 sentences) for a resume.
    
    Candidate Name: ${info.fullName}
    Target Job Title: ${info.jobTitle}
    Current Location: ${info.location}
    Work History: ${jobHistory}
    
    The tone should be confident, professional, and results-oriented. Focus on value proposition.
    Do not include placeholders like "[Your Name]".
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating summary. Please try again.";
  }
};

export const enhanceExperienceDescription = async (position: string, company: string, currentDesc: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  const prompt = `
    Rewrite and improve the following job description bullet points for a resume.
    
    Role: ${position} at ${company}
    Current Draft: "${currentDesc}"
    
    Instructions:
    1. Use strong action verbs.
    2. Quantify results where possible (even if estimating, use placeholders like [X]%).
    3. Make it concise and professional.
    4. Return ONLY the bullet points, separated by newlines.
    5. Do not include introductory text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || currentDesc;
  } catch (error) {
    console.error("AI Error:", error);
    return currentDesc;
  }
};

export const suggestSkills = async (jobTitle: string, description: string): Promise<string[]> => {
  if (!apiKey) return ["Communication", "Teamwork", "Problem Solving"];

  const prompt = `
    Suggest 10 relevant hard and soft skills for a ${jobTitle}.
    Context from resume: ${description.substring(0, 200)}...
    
    Return the result as a JSON array of strings only. Example: ["Skill 1", "Skill 2"]
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};
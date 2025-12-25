
import { GoogleGenAI, Type } from "@google/genai";
import { ExplanationResponse } from "../types";

export async function getDetailedExplanation(question: string, correctAnswer: string, userAnswer: string): Promise<ExplanationResponse> {
  try {
    // Ưu tiên key từ localStorage, nếu không có mới dùng process.env (dành cho owner)
    const userKey = localStorage.getItem('GEMINI_API_KEY') || process.env.API_KEY || '';
    
    if (!userKey) {
      throw new Error("Missing API Key. Please configure it in settings.");
    }

    const ai = new GoogleGenAI({ apiKey: userKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain why the correct answer to "${question}" is "${correctAnswer}", and why "${userAnswer}" might be wrong. Keep it simple for a 6th grader in Vietnamese.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING, description: "Simple explanation in Vietnamese" },
            example: { type: Type.STRING, description: "Another similar example sentence" },
            translation: { type: Type.STRING, description: "Translation of the example" }
          },
          required: ["explanation", "example", "translation"]
        },
        systemInstruction: "You are an encouraging and expert English teacher for Vietnamese 6th-grade students. Your explanations are clear, short, and friendly."
      }
    });

    const result = JSON.parse(response.text);
    return result as ExplanationResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      explanation: "Đã xảy ra lỗi khi kết nối với AI. Hãy kiểm tra lại API Key hoặc kết nối mạng của bạn nhé!",
      example: "I am a student.",
      translation: "Tôi là một học sinh."
    };
  }
}

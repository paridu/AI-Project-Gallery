import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

export const initializeGemini = (): boolean => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return false;
  }
  try {
    ai = new GoogleGenAI({ apiKey });
    return true;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return false;
  }
};

export const createChatSession = (): Chat | null => {
  if (!ai) {
    const success = initializeGemini();
    if (!success || !ai) return null;
  }

  try {
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are an intelligent, enthusiastic AI Assistant for the "AI Project Gallery". 
        Your goal is to help users explore the world of Artificial Intelligence.
        
        **IMPORTANT: You must communicate primarily in Thai.**
        
        You have knowledge about:
        1. Machine Learning (Regression, Classification, Clustering)
        2. Deep Learning (CNNs, RNNs, Transformers)
        3. Generative AI (LLMs, GANs, Diffusion Models)
        4. Specific projects in the gallery (Traffic Sign Recognition, Movie Recommender, Stock Predictor, etc.)

        When asked about a project, explain the technical concepts simply but accurately in Thai.
        If asked for project ideas, suggest creative and feasible AI projects for a portfolio.
        Keep your responses concise, encouraging, and formatted with Markdown where appropriate.
        `,
        temperature: 0.7,
      }
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return null;
  }
};
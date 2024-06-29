import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const googleGenAi = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
});

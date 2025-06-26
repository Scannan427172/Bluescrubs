import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ChatCompletionRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  userId?: string;
  userProgress?: any;
}

export class StudyCompanionAI {
  private systemPrompt = `You are a supportive and encouraging study companion for medical students preparing for PLAB (Professional and Linguistic Assessments Board) exams. Your role is to:

1. Provide personalized study guidance and motivation
2. Share relevant motivational quotes when appropriate
3. Help students stay focused and confident
4. Offer study tips and techniques
5. Provide emotional support during challenging times
6. Celebrate achievements and progress

Keep responses conversational, supportive, and medically relevant. Include motivational quotes naturally in your responses when they fit the context. Be empathetic to the stress and challenges of medical exam preparation.`;

  async generateResponse(request: ChatCompletionRequest): Promise<string> {
    try {
      const messages = [
        { role: 'system' as const, content: this.systemPrompt },
        ...request.messages
      ];

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || "I'm here to help you with your studies!";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "I'm experiencing some technical difficulties right now, but I'm still here to support you in your studies!";
    }
  }

  async generatePersonalizedMotivation(userProgress: any): Promise<string> {
    try {
      const motivationPrompt = `Based on the user's study progress, generate a personalized motivational message. 

Progress data: ${JSON.stringify(userProgress)}

Create an encouraging message that acknowledges their current performance and motivates them to continue. Include a relevant motivational quote if appropriate.`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: motivationPrompt }
        ],
        max_tokens: 300,
        temperature: 0.8,
      });

      return response.choices[0]?.message?.content || "Keep pushing forward - every step brings you closer to your goal!";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "Remember: 'Success is the sum of small efforts repeated day in and day out.' - Robert Collier. Keep going!";
    }
  }
}

export const studyCompanionAI = new StudyCompanionAI();
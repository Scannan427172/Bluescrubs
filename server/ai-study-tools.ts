import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Smart Flashcards with Spaced Repetition
export interface SmartFlashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: Date;
  reviewCount: number;
  successRate: number;
  tags: string[];
  medicalSpecialty: string;
}

export async function generateFlashcardsFromContent(content: string, specialty: string): Promise<SmartFlashcard[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `Generate medical flashcards from the provided content. Create concise Q&A pairs focusing on key medical concepts, diagnoses, treatments, and clinical reasoning. Each flashcard should be clinically relevant for ${specialty}.`
        },
        {
          role: "user",
          content: `Create 10 flashcards from this medical content: ${content}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return result.flashcards?.map((card: any, index: number) => ({
      id: `fc_${Date.now()}_${index}`,
      front: card.question,
      back: card.answer,
      difficulty: 'medium',
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      reviewCount: 0,
      successRate: 0,
      tags: card.tags || [],
      medicalSpecialty: specialty
    })) || [];

  } catch (error) {
    console.error('Error generating flashcards:', error);
    return [];
  }
}

// Auto-Summarizer
export async function summarizeContent(content: string, format: 'bullets' | 'paragraphs' | 'diagrams' = 'bullets'): Promise<string> {
  try {
    const formatInstructions = {
      bullets: "Create a concise bullet-point summary",
      paragraphs: "Create a structured paragraph summary",
      diagrams: "Create a text-based diagram or flowchart summary"
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a medical education expert. ${formatInstructions[format]} of medical content, focusing on key concepts, clinical implications, and learning objectives.`
        },
        {
          role: "user",
          content: `Summarize this medical content: ${content}`
        }
      ],
      temperature: 0.5,
      max_tokens: 1500
    });

    return response.choices[0].message.content || "Unable to generate summary";

  } catch (error) {
    console.error('Error summarizing content:', error);
    return "Error generating summary";
  }
}

// Voice-to-Revision Notes
export async function transcribeVoiceToNotes(audioBase64: string): Promise<{
  transcript: string;
  notes: string;
  flashcards: SmartFlashcard[];
}> {
  try {
    // Note: This would require actual audio processing
    // For now, providing the structure for voice transcription
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Convert this medical lecture transcript into structured revision notes and generate relevant flashcards."
        },
        {
          role: "user",
          content: "Process audio transcript for medical study notes"
        }
      ],
      temperature: 0.6,
      max_tokens: 2000
    });

    // This is a placeholder structure - actual implementation would use Whisper API
    return {
      transcript: "Audio transcription would appear here",
      notes: response.choices[0].message.content || "",
      flashcards: []
    };

  } catch (error) {
    console.error('Error processing voice to notes:', error);
    return {
      transcript: "",
      notes: "Error processing audio",
      flashcards: []
    };
  }
}

// Interactive Quiz Generator
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'image-based';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  confidenceLevel?: number;
  timeLimit?: number;
  imageUrl?: string;
}

export async function generateInteractiveQuiz(
  topic: string,
  questionCount: number = 5,
  types: ('multiple-choice' | 'short-answer' | 'image-based')[] = ['multiple-choice']
): Promise<QuizQuestion[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Generate ${questionCount} medical quiz questions about ${topic}. Include questions of types: ${types.join(', ')}. Each question should test clinical knowledge and reasoning.`
        },
        {
          role: "user",
          content: `Create a comprehensive quiz on ${topic} with detailed explanations for each answer.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2500
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return result.questions?.map((q: any, index: number) => ({
      id: `quiz_${Date.now()}_${index}`,
      type: q.type || 'multiple-choice',
      question: q.question,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      timeLimit: q.timeLimit || 120 // 2 minutes default
    })) || [];

  } catch (error) {
    console.error('Error generating quiz:', error);
    return [];
  }
}

// Visual Explanation Assistant
export async function generateVisualExplanation(concept: string, complexity: 'basic' | 'intermediate' | 'advanced' = 'intermediate'): Promise<{
  explanation: string;
  diagram: string;
  keyPoints: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Create a visual explanation for the medical concept: ${concept}. Provide a clear explanation, text-based diagram, and key learning points at ${complexity} level.`
        },
        {
          role: "user",
          content: `Explain ${concept} with visual aids and diagrams suitable for medical education.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      explanation: result.explanation || "",
      diagram: result.diagram || "",
      keyPoints: result.keyPoints || []
    };

  } catch (error) {
    console.error('Error generating visual explanation:', error);
    return {
      explanation: "Error generating explanation",
      diagram: "",
      keyPoints: []
    };
  }
}

// Spaced Repetition Algorithm
export function calculateNextReview(
  difficulty: 'easy' | 'medium' | 'hard',
  reviewCount: number,
  success: boolean
): Date {
  const baseIntervals = {
    easy: [1, 3, 7, 14, 30, 90],
    medium: [1, 2, 5, 10, 20, 60],
    hard: [1, 1, 3, 7, 14, 30]
  };
  
  const intervals = baseIntervals[difficulty];
  let intervalIndex = Math.min(reviewCount, intervals.length - 1);
  
  if (!success && intervalIndex > 0) {
    intervalIndex = Math.max(0, intervalIndex - 1);
  }
  
  const daysToAdd = intervals[intervalIndex];
  return new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
}

export function updateFlashcardPerformance(
  flashcard: SmartFlashcard,
  success: boolean,
  confidenceLevel: number
): SmartFlashcard {
  const newReviewCount = flashcard.reviewCount + 1;
  const newSuccessRate = ((flashcard.successRate * flashcard.reviewCount) + (success ? 1 : 0)) / newReviewCount;
  
  // Adjust difficulty based on performance
  let newDifficulty = flashcard.difficulty;
  if (newSuccessRate > 0.8 && newReviewCount >= 3) {
    newDifficulty = 'easy';
  } else if (newSuccessRate < 0.5) {
    newDifficulty = 'hard';
  }
  
  return {
    ...flashcard,
    difficulty: newDifficulty,
    nextReview: calculateNextReview(newDifficulty, newReviewCount, success),
    reviewCount: newReviewCount,
    successRate: newSuccessRate
  };
}
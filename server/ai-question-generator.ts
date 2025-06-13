import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface GeneratedQuestion {
  id: string;
  category: string;
  subcategory: string;
  cognitiveLevel: 'knowledge' | 'application' | 'problem-solving';
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  clinicalSetting: string;
  ageGroup: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  references: string[];
  tags: string[];
  estimatedTime: number;
  lastReviewed: string;
  reviewedBy: string;
}

export async function generateMedicalQuestion(
  category: string,
  subcategory: string,
  difficulty: 'foundation' | 'intermediate' | 'advanced'
): Promise<GeneratedQuestion> {
  const prompt = `Generate a GMC MLA-compliant medical question for ${category} - ${subcategory} at ${difficulty} level.

Requirements:
1. Create a realistic clinical scenario with specific patient details (age, gender, presenting symptoms, examination findings, investigations)
2. Provide 5 multiple choice options (A-E)
3. Follow this exact explanation format:

Answer: [Letter]. [Correct option]

Key points:

• [Key clinical fact with pathophysiology/diagnostic criteria]¹
• [Key clinical fact with management/treatment details]²
• [Key clinical fact with guidelines/evidence base]³
• [Key clinical fact with prognosis/complications]⁴

References:

1. [Primary guideline or major study with full citation]
2. [NICE or specialty society guideline with full citation]
3. [BMJ Best Practice or UpToDate reference]
4. [Specialty journal or textbook reference]
5. [World Health Organization or international guideline]
6. [NHS England or national policy document]
7. [General Medical Council. Good Medical Practice. GMC; 2024.]
8. [General Medical Council. Medical Licensing Assessment (MLA) Content Map. [Specialty] section; 2024.]

The question should test clinical decision-making, differential diagnosis, or evidence-based management. Ensure all medical facts are accurate and current as of 2024-2025.

Return the response in JSON format with these fields only: stem, options, correctAnswer, explanation, references. Do not include learningObjectives or gmcOutcomes fields.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a medical education expert creating GMC MLA-compliant examination questions. Provide accurate, evidence-based medical content with comprehensive explanations and authoritative references."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });
    
    if (!response || !response.choices || !response.choices[0]) {
      throw new Error('Invalid response from OpenAI API');
    }

    const generatedContent = JSON.parse(response.choices[0].message.content || '{}');
    
    // Add metadata and generate unique ID
    const questionId = `ai_${category.slice(0,4)}_${Date.now()}`;
    
    return {
      id: questionId,
      category: category,
      subcategory: subcategory,
      cognitiveLevel: generatedContent.cognitiveLevel || 'application',
      difficulty: difficulty,
      clinicalSetting: generatedContent.clinicalSetting || 'Hospital',
      ageGroup: generatedContent.ageGroup || 'Adult',
      stem: generatedContent.stem,
      options: generatedContent.options,
      correctAnswer: generatedContent.correctAnswer,
      explanation: generatedContent.explanation,

      references: generatedContent.references || [],
      tags: generatedContent.tags || [category, subcategory],
      estimatedTime: generatedContent.estimatedTime || 90,
      lastReviewed: new Date().toISOString().split('T')[0],
      reviewedBy: "AI Medical Education System"
    };

  } catch (error) {
    console.error('Error generating medical question:', error);
    throw new Error(`Failed to generate medical question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateMultipleQuestions(
  category: string,
  subcategories: string[],
  difficulty: 'foundation' | 'intermediate' | 'advanced',
  count: number
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];
  const maxRetries = 2;
  
  // Process questions in smaller batches to avoid timeouts
  const batchSize = 3;
  for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
    const batchEnd = Math.min(batchStart + batchSize, count);
    const batchPromises: Promise<GeneratedQuestion | null>[] = [];
    
    for (let i = batchStart; i < batchEnd; i++) {
      const subcategory = subcategories[i % subcategories.length];
      
      const questionPromise = (async (): Promise<GeneratedQuestion | null> => {
        for (let retry = 0; retry < maxRetries; retry++) {
          try {
            const question = await generateMedicalQuestion(category, subcategory, difficulty);
            console.log(`Generated question ${i + 1}/${count} successfully`);
            return question;
          } catch (error) {
            console.error(`Failed to generate question ${i + 1}, retry ${retry + 1}:`, error);
            if (retry === maxRetries - 1) {
              return null;
            }
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retry) * 1000));
          }
        }
        return null;
      })();
      
      batchPromises.push(questionPromise);
    }
    
    // Wait for current batch to complete
    const batchResults = await Promise.all(batchPromises);
    const validQuestions = batchResults.filter((q): q is GeneratedQuestion => q !== null);
    questions.push(...validQuestions);
    
    console.log(`Batch ${Math.floor(batchStart / batchSize) + 1} completed: ${validQuestions.length}/${batchEnd - batchStart} questions generated`);
    
    // Small delay between batches
    if (batchEnd < count) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`Total questions generated: ${questions.length}/${count}`);
  return questions;
}

export async function generateSpecialtyQuestionSet(
  specialty: string,
  totalQuestions: number = 25
): Promise<GeneratedQuestion[]> {
  const specialtyConfig = {
    neurology: {
      subcategories: ['epilepsy', 'stroke', 'headache', 'dementia', 'movement-disorders', 'multiple-sclerosis', 'neuropathy'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    cardiovascular: {
      subcategories: ['heart-failure', 'arrhythmias', 'ischemic-heart-disease', 'valvular-disease', 'hypertension'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    cardiology: {
      subcategories: ['heart-failure', 'arrhythmias', 'ischemic-heart-disease', 'valvular-disease', 'hypertension'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    respiratory: {
      subcategories: ['asthma', 'copd', 'pneumonia', 'pulmonary-embolism', 'lung-cancer'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    endocrinology: {
      subcategories: ['diabetes', 'thyroid', 'adrenal', 'pituitary', 'metabolic-bone-disease'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    }
  };

  const config = specialtyConfig[specialty as keyof typeof specialtyConfig];
  if (!config) {
    throw new Error(`Unsupported specialty: ${specialty}`);
  }

  const questionsPerDifficulty = Math.ceil(totalQuestions / 3);
  const allQuestions: GeneratedQuestion[] = [];

  for (const difficulty of config.difficulties) {
    const questions = await generateMultipleQuestions(
      specialty,
      config.subcategories,
      difficulty,
      questionsPerDifficulty
    );
    allQuestions.push(...questions);
  }

  return allQuestions.slice(0, totalQuestions);
}
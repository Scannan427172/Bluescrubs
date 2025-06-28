import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAIEnabled, getAIStatus, suspendAI } from "./ai-config";
import { BNF_MEDICATIONS } from "../shared/bnf-integration";
import { 
  trackSession, 
  trackPageView, 
  trackTestActivity, 
  getUsageStats, 
  generateSessionId,
  cleanupOldSessions 
} from "./usage-analytics";
import fs from "fs";
import path from "path";
import { PLAB2_TEMPLATE_STATIONS, PLAB2_STATION_TYPES, PLAB2_SPECIALTIES } from "./plab2-templates";
import { generateUserFormatStations, saveUserFormatStations, loadUserFormatStations, getUserFormatStationCount } from './user-format-generator';
import { generateComprehensiveOSCEBank, loadComprehensiveOSCEBank, getOSCEBankStats } from './comprehensive-osce-generator';
import { generateInternationalStations, saveInternationalStations, loadInternationalStations, getInternationalStationCount, getSupportedExams } from './international-format-generator';
import { getContentIndependenceStatus, createManualStation, exportContentLibrary, validateContentSufficiency } from './content-independence';
import { 
  SUPPORTED_LANGUAGES, 
  getTranslationTemplate, 
  saveTranslation, 
  loadTranslations, 
  getTranslationStats,
  createTranslationManifest,
  CULTURAL_ADAPTATIONS 
} from './translation-system';
import { AdaptiveAIEngine } from './adaptive-ai-engine';
import { 
  translateStationIndependently, 
  batchTranslateStations, 
  saveIndependentTranslations,
  getIndependentTranslationStats,
  MEDICAL_TERMINOLOGY_DICTIONARY 
} from './independent-translation';
import { 
  generateQuestionFromTemplate, 
  generateOSCEStationFromTemplate, 
  generateMedicalGuidanceIndependently,
  createIndependentAlternatives,
  exportCompleteIndependentSystem 
} from './independent-content';
import { 
  analyzeVideoPerformanceIndependently, 
  generateIndependentFeedback,
  analyzeImageIndependently 
} from './independent-analysis';
import { hybridAI, HybridConfig } from './hybrid-ai-system';

// Independent Question Generation (No AI - keeps questions authentic)
async function generateMedicalQuestions(templates: any[], category: string, difficulty: string, count: number) {
  try {
    // Always use template-based generation for questions to maintain authenticity
    return generateQuestionFromTemplate(category, count);
    
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const categoryMappings = {
      'cardiovascular': 'Cardiovascular',
      'respiratory': 'Respiratory', 
      'infectious-diseases': 'Infectious Diseases',
      'endocrinology': 'Endocrinology',
      'gastroenterology': 'Gastroenterology',
      'neurology': 'Neurology',
      'psychiatry': 'Psychiatry',
      'emergency-medicine': 'Emergency Medicine',
      'obstetrics-gynaecology': 'Obstetrics & Gynaecology',
      'paediatrics': 'Paediatrics',
      'surgery': 'Surgery'
    };

    const displayCategory = categoryMappings[category as keyof typeof categoryMappings] || category;

    const prompt = `Generate ${count} high-quality PLAB 1 medical exam questions for ${displayCategory} specialty.

Use these template questions as the EXACT format reference:
${JSON.stringify(templates.slice(0, 2), null, 2)}

CRITICAL Requirements:
- Follow the exact JSON structure: id, topic, category, question, options (A-E), answer, explanation (object with A-E keys), mnemonic, links
- Create authentic UK medical scenarios based on real clinical practice
- Include verified NICE, CKS, NHS, BNF, or GMC guideline references in links object
- Questions must test clinical knowledge appropriate for PLAB 1 level
- Use realistic patient presentations with specific vital signs, investigation results
- Provide detailed explanations for each option (correct and incorrect)
- Include memorable mnemonics
- Each question must be unique and clinically accurate

For ${displayCategory}, focus on core topics like:
${getCategoryTopics(category)}

Return ONLY a valid JSON array with exactly ${count} questions. No additional text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    let response = completion.choices[0].message.content.trim();
    
    // Clean up response to ensure valid JSON
    if (response.startsWith('```json')) {
      response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    const questions = JSON.parse(response);
    
    // Validate and enhance each question
    return questions.map((q: any, index: number) => ({
      ...q,
      id: `generated_${category}_${Date.now()}_${index}`,
      category: displayCategory,
      difficulty,
      // Ensure all required fields exist
      topic: q.topic || `${displayCategory} Clinical Scenario`,
      mnemonic: q.mnemonic || "Remember the key clinical signs",
      links: q.links || {
        NICE: `https://www.nice.org.uk/guidance`,
        CKS: `https://cks.nice.org.uk/topics`,
        BNF: `https://bnf.nice.org.uk`
      }
    }));

  } catch (error) {
    console.error('AI generation error:', error);
    return createFallbackQuestions(templates, category, difficulty, count);
  }
}

function getCategoryTopics(category: string): string {
  const topics = {
    cardiovascular: "Hypertension, Acute Coronary Syndrome, Heart Failure, Arrhythmias, Valvular Disease",
    respiratory: "Asthma, COPD, Pneumonia, Pulmonary Embolism, Pleural Disease",
    'infectious-diseases': "UTI, Sepsis, Meningitis, Endocarditis, Tuberculosis",
    endocrinology: "Diabetes, Thyroid Disorders, Adrenal Disorders, Calcium Disorders",
    gastroenterology: "IBD, Peptic Ulcer Disease, Hepatitis, Pancreatitis, Bowel Obstruction",
    neurology: "Stroke, Epilepsy, Headache, Movement Disorders, Dementia",
    psychiatry: "Depression, Anxiety, Psychosis, Substance Abuse, Eating Disorders",
    'emergency-medicine': "Trauma, Poisoning, Shock, Cardiac Arrest, Burns",
    'obstetrics-gynaecology': "Pregnancy, Labour, Gynaecological Disorders, Contraception",
    paediatrics: "Child Development, Immunisations, Common Childhood Illnesses",
    surgery: "Pre-operative Assessment, Post-operative Care, Surgical Emergencies"
  };
  return topics[category as keyof typeof topics] || "General Medical Conditions";
}

async function createFallbackQuestions(templates: any[], category: string, difficulty: string, count: number) {
  const questions = [];
  const specialtyVariations = {
    cardiovascular: ['hypertension', 'heart failure', 'arrhythmias', 'acute coronary syndrome'],
    respiratory: ['asthma', 'COPD', 'pneumonia', 'pulmonary embolism'],
    infectious: ['UTI', 'sepsis', 'meningitis', 'endocarditis'],
    endocrinology: ['diabetes', 'thyroid disorders', 'adrenal disorders'],
    gastroenterology: ['IBD', 'peptic ulcer', 'hepatitis', 'pancreatitis'],
    neurology: ['stroke', 'epilepsy', 'headache', 'dementia']
  };

  for (let i = 0; i < count; i++) {
    const baseTemplate = templates[i % templates.length];
    const variation = specialtyVariations[category as keyof typeof specialtyVariations]?.[i % 4] || 'general';
    
    questions.push({
      ...baseTemplate,
      id: `generated_${category}_${Date.now()}_${i}`,
      category,
      difficulty,
      topic: `${baseTemplate.topic} - ${variation} variant`,
      question: baseTemplate.question.replace(/patient|individual/g, i % 2 === 0 ? 'patient' : 'individual')
    });
  }
  
  return questions;
}

async function generateMedicalGuidanceResponse(question: string, context: any) {
  return `Based on current UK medical guidelines:\n\n${question}\n\nRefer to NICE guidelines for evidence-based recommendations.`;
}

// AI enabled for question generation

// Pre-loaded question bank for instant delivery with persistence
let ukQuestionBank: any[] = [];

// Initialize question bank with persistent storage
const loadQuestionBank = () => {
  try {
    const filePath = path.join(process.cwd(), 'generated-question-bank.json');
    if (fs.existsSync(filePath)) {
      const savedQuestions = fs.readFileSync(filePath, 'utf8');
      ukQuestionBank = JSON.parse(savedQuestions);
      console.log(`Loaded ${ukQuestionBank.length} questions from storage`);
    }
  } catch (error) {
    console.log('Starting with empty question bank');
    ukQuestionBank = [];
  }
};

// Save question bank to persistent storage
const saveQuestionBank = () => {
  try {
    const filePath = path.join(process.cwd(), 'generated-question-bank.json');
    fs.writeFileSync(filePath, JSON.stringify(ukQuestionBank, null, 2));
    console.log(`Saved ${ukQuestionBank.length} questions to storage`);
  } catch (error) {
    console.error('Failed to save question bank:', error);
  }
};

// Initialize on startup
loadQuestionBank();

export async function registerRoutes(app: Express): Promise<Server> {
  
  // AI Status endpoint
  app.get("/api/ai/status", async (req, res) => {
    res.json({
      status: getAIStatus(),
      enabled: isAIEnabled(),
      message: isAIEnabled() ? "AI services active" : "AI services suspended"
    });
  });

  // Batch generate 5000 questions endpoint
  app.post("/api/generate-5000-questions", async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus()
      });
    }

    try {
      // Get the 8 template questions from current question bank
      const templateQuestions = [];
      
      // Fetch the 8 existing template questions
      try {
        const testQuestionsResponse = await fetch(`http://localhost:5000/api/test/questions`);
        const existingQuestions = await testQuestionsResponse.json();
        templateQuestions.push(...existingQuestions.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch template questions:', error);
        return res.status(500).json({ error: 'Cannot access template questions' });
      }

      // Template questions already added above

      // Define medical specialties for 10 question generation
      const medicalSpecialties = [
        { category: "cardiovascular", count: 2 },
        { category: "respiratory", count: 2 },
        { category: "infectious-diseases", count: 2 },
        { category: "endocrinology", count: 2 },
        { category: "gastroenterology", count: 2 }
      ];

      let totalGenerated = 0;
      const generationResults = [];

      // Generate questions in batches for each specialty
      console.log(`Starting 10 question generation at ${new Date().toISOString()}`);
      console.log(`Breakdown: ${medicalSpecialties.map(s => `${s.category}: ${s.count}`).join(', ')}`);
      
      for (const specialty of medicalSpecialties) {
        console.log(`Generating ${specialty.count} ${specialty.category} questions...`);
        
        // Generate in smaller batches to avoid token limits
        const batchSize = 2; // Very small batches for reliability
        const batches = Math.ceil(specialty.count / batchSize);
        
        for (let batch = 0; batch < batches; batch++) {
          const questionsInBatch = Math.min(batchSize, specialty.count - (batch * batchSize));
          
          try {
            console.log(`Starting batch ${batch + 1}/${batches} for ${specialty.category}...`);
            const batchQuestions = await generateMedicalQuestions(
              templateQuestions,
              specialty.category,
              "mixed",
              questionsInBatch
            );
            
            if (batchQuestions && batchQuestions.length > 0) {
              ukQuestionBank.push(...batchQuestions);
              totalGenerated += batchQuestions.length;
              saveQuestionBank();
              
              generationResults.push({
                specialty: specialty.category,
                batch: batch + 1,
                generated: batchQuestions.length,
                total: totalGenerated
              });
              
              console.log(`Generated batch ${batch + 1}/${batches} for ${specialty.category}: ${batchQuestions.length} questions (Total: ${totalGenerated}/500)`);
            } else {
              console.log(`No questions generated in batch ${batch + 1} for ${specialty.category}`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (error) {
            console.error(`Error generating batch ${batch + 1} for ${specialty.category}:`, error);
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      }

      // Final save
      saveQuestionBank();
      const questionBankFile = path.join(process.cwd(), 'generated-question-bank.json');

      res.json({
        success: true,
        totalGenerated,
        target: 500,
        progress: `${totalGenerated}/500`,
        results: generationResults,
        questionBankSize: ukQuestionBank.length,
        savedToFile: questionBankFile
      });

    } catch (error) {
      console.error('Batch generation error:', error);
      res.status(500).json({ error: "Failed to generate question bank", details: error.message });
    }
  });

  // PLAB 2 OSCE Station Generation Functions
  async function generatePLAB2OSCEStations(templates: any[], stationType: string, specialty: string, difficulty: string, count: number) {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }
      
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const specialtyMappings = {
        'emergency-medicine': 'Emergency Medicine',
        'general-medicine': 'General Medicine',
        'cardiology': 'Cardiology',
        'respiratory': 'Respiratory Medicine',
        'gastroenterology': 'Gastroenterology',
        'neurology': 'Neurology',
        'psychiatry': 'Psychiatry',
        'obstetrics-gynaecology': 'Obstetrics & Gynaecology',
        'paediatrics': 'Paediatrics',
        'surgery': 'Surgery',
        'oncology': 'Oncology',
        'rheumatology': 'Rheumatology'
      };

      const typeDescriptions = {
        'history-taking': 'focused history taking stations',
        'physical-examination': 'systematic physical examination stations',
        'communication-skills': 'communication and breaking bad news stations',
        'practical-procedures': 'clinical procedures and skills stations',
        'emergency-management': 'acute management and emergency stations',
        'prescribing-safety': 'safe prescribing and medication stations',
        'data-interpretation': 'investigation results interpretation stations',
        'ethics-consent': 'medical ethics and consent stations'
      };

      const displaySpecialty = specialtyMappings[specialty as keyof typeof specialtyMappings] || specialty;
      const stationDescription = typeDescriptions[stationType as keyof typeof typeDescriptions] || stationType;

      const prompt = `Generate ${count} high-quality PLAB 2 OSCE stations for ${displaySpecialty} specialty focusing on ${stationDescription}.

Use these template stations as the EXACT format reference:
${JSON.stringify(templates.slice(0, 2), null, 2)}

CRITICAL Requirements:
- Follow the exact JSON structure: id, title, scenario, type, duration, difficulty, specialty, instructions, markingCriteria, keyActions, redFlags, differentialDiagnosis, mnemonics, references
- Create authentic UK clinical OSCE scenarios based on real medical practice
- Include verified NICE, GMC, BNF, NHS, or Royal College guideline references
- Stations must test clinical skills appropriate for PLAB 2 level
- Use realistic patient presentations with specific clinical details
- Provide comprehensive marking criteria with clear assessment points
- Include detailed instructions for candidate, examiner, and standardized patient
- Add helpful mnemonics for key learning points (2-3 memorable phrases)
- Each station must be unique and clinically accurate
- Duration should be 8 minutes for most stations
- Difficulty should match requested level: ${difficulty}

For ${displaySpecialty} ${stationType} stations, focus on core clinical skills like:
${getStationTopics(stationType, specialty)}

Return ONLY a valid JSON array with exactly ${count} stations. No additional text.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      let response = completion.choices[0].message.content.trim();
      
      // Clean up response to ensure valid JSON
      if (response.startsWith('```json')) {
        response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const stations = JSON.parse(response);
      
      // Validate and enhance each station
      return stations.map((s: any, index: number) => ({
        ...s,
        id: `plab2_generated_${specialty}_${stationType}_${Date.now()}_${index}`,
        type: stationType,
        specialty: displaySpecialty,
        difficulty,
        duration: s.duration || 8,
        // Ensure all required fields exist
        title: s.title || `${displaySpecialty} ${stationType} Station`,
        mnemonics: s.mnemonics || [
          `${stationType.toUpperCase()}: Remember key clinical skills and systematic approach`,
          `${displaySpecialty.toUpperCase()}: Focus on specialty-specific knowledge and guidelines`
        ],
        references: s.references || [
          {
            title: "NICE Guidelines",
            url: "https://www.nice.org.uk/guidance"
          },
          {
            title: "GMC Good Medical Practice",
            url: "https://www.gmc-uk.org/ethical-guidance/ethical-guidance-for-doctors/good-medical-practice"
          }
        ]
      }));

    } catch (error) {
      console.error('PLAB 2 AI generation error:', error);
      return createFallbackPLAB2Stations(templates, stationType, specialty, difficulty, count);
    }
  }

  function getStationTopics(stationType: string, specialty: string): string {
    const topics = {
      'history-taking': {
        'emergency-medicine': 'Chest pain, breathlessness, abdominal pain, headache, collapse',
        'cardiology': 'Chest pain, palpitations, syncope, heart failure symptoms',
        'respiratory': 'Cough, breathlessness, chest pain, hemoptysis',
        'general-medicine': 'Weight loss, fatigue, fever, joint pain, confusion'
      },
      'physical-examination': {
        'cardiology': 'Cardiovascular examination, murmur assessment, heart failure signs',
        'respiratory': 'Respiratory examination, pleural effusion, consolidation',
        'neurology': 'Neurological examination, stroke assessment, cranial nerves'
      },
      'communication-skills': {
        'oncology': 'Breaking bad news, discussing prognosis, treatment options',
        'general-medicine': 'Explaining diagnosis, lifestyle advice, medication counseling'
      }
    };
    
    return topics[stationType as keyof typeof topics]?.[specialty as keyof any] || 
           'Standard clinical presentations and management scenarios';
  }

  function createFallbackPLAB2Stations(templates: any[], stationType: string, specialty: string, difficulty: string, count: number) {
    return templates.slice(0, count).map((template, index) => ({
      ...template,
      id: `plab2_fallback_${specialty}_${stationType}_${Date.now()}_${index}`,
      type: stationType,
      specialty,
      difficulty,
      title: `${specialty} ${stationType} Station ${index + 1}`,
      scenario: template.scenario || `Clinical scenario for ${specialty} ${stationType} practice`
    }));
  }

  // Load/Save PLAB 2 Station Bank
  let plab2StationBank: any[] = [];
  const plab2QuestionBankFile = path.join(process.cwd(), 'generated-plab2-question-bank.json');

  function loadPLAB2StationBank() {
    try {
      if (fs.existsSync(plab2QuestionBankFile)) {
        const data = fs.readFileSync(plab2QuestionBankFile, 'utf8');
        if (data.trim()) {
          plab2StationBank = JSON.parse(data);
          console.log(`Loaded ${plab2StationBank.length} PLAB 2 stations from storage`);
        }
      }
    } catch (error) {
      console.error('Error loading PLAB 2 station bank:', error);
      plab2StationBank = [];
    }
  }

  function savePLAB2StationBank() {
    try {
      fs.writeFileSync(plab2QuestionBankFile, JSON.stringify(plab2StationBank, null, 2));
      console.log(`Saved ${plab2StationBank.length} stations to storage`);
    } catch (error) {
      console.error('Error saving PLAB 2 station bank:', error);
    }
  }

  // Initialize PLAB 2 station bank
  loadPLAB2StationBank();
  loadUserFormatStations();
  
  // Initialize international exam stations
  getSupportedExams().forEach(examType => {
    loadInternationalStations(examType);
  });

  // PLAB 2 Station Bank Generation Endpoint
  app.post("/api/generate-plab2-5000-stations", async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus()
      });
    }

    try {
      const generationResults: any[] = [];
      let totalGenerated = plab2StationBank.length;
      const targetStations = 1000; // PLAB 2 has fewer stations but more detailed
      
      if (totalGenerated >= targetStations) {
        return res.json({
          success: true,
          message: `PLAB 2 station bank already complete with ${totalGenerated} stations`,
          totalGenerated,
          target: targetStations,
          progress: `${totalGenerated}/${targetStations}`
        });
      }

      // PLAB 2 specialties and station types distribution (realistic OSCE coverage)
      const plab2Specialties = [
        { specialty: 'emergency-medicine', stations: 120 },
        { specialty: 'general-medicine', stations: 150 },
        { specialty: 'cardiology', stations: 100 },
        { specialty: 'respiratory', stations: 100 },
        { specialty: 'gastroenterology', stations: 80 },
        { specialty: 'neurology', stations: 80 },
        { specialty: 'psychiatry', stations: 80 },
        { specialty: 'obstetrics-gynaecology', stations: 100 },
        { specialty: 'paediatrics', stations: 100 },
        { specialty: 'surgery', stations: 60 },
        { specialty: 'oncology', stations: 30 }
      ];

      const stationTypes = ['history-taking', 'physical-examination', 'communication-skills', 'practical-procedures', 'emergency-management', 'prescribing-safety'];

      for (const spec of plab2Specialties) {
        const remainingForSpecialty = Math.max(0, spec.stations - (plab2StationBank.filter(s => s.specialty === spec.specialty).length));
        if (remainingForSpecialty <= 0) continue;

        // Distribute stations across different types
        const stationsPerType = Math.ceil(remainingForSpecialty / stationTypes.length);
        const batches = Math.ceil(stationsPerType / 2); // 2 stations per batch

        for (const stationType of stationTypes) {
          for (let batch = 0; batch < batches && totalGenerated < targetStations; batch++) {
            try {
              const stationsInBatch = Math.min(2, spec.stations - (plab2StationBank.filter(s => s.specialty === spec.specialty && s.type === stationType).length));
              if (stationsInBatch <= 0) break;

              console.log(`Starting PLAB 2 batch ${batch + 1}/${batches} for ${spec.specialty} ${stationType}...`);
              console.log(`Generating ${stationsInBatch} ${spec.specialty} ${stationType} stations...`);
              
              const batchStations = await generatePLAB2OSCEStations(
                PLAB2_TEMPLATE_STATIONS,
                stationType,
                spec.specialty,
                "intermediate",
                stationsInBatch
              );
              
              if (batchStations && batchStations.length > 0) {
                plab2StationBank.push(...batchStations);
                totalGenerated += batchStations.length;
                savePLAB2StationBank();
                
                generationResults.push({
                  specialty: spec.specialty,
                  stationType,
                  batch: batch + 1,
                  generated: batchStations.length,
                  total: totalGenerated
                });
                
                console.log(`Generated PLAB 2 batch ${batch + 1}/${batches} for ${spec.specialty} ${stationType}: ${batchStations.length} stations (Total: ${totalGenerated}/5000)`);
              } else {
                console.log(`No stations generated in batch ${batch + 1} for ${spec.specialty} ${stationType}`);
              }
              
              await new Promise(resolve => setTimeout(resolve, 1000));
              
            } catch (error) {
              console.error(`Error generating PLAB 2 batch ${batch + 1} for ${spec.specialty} ${stationType}:`, error);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }
      }

      // Final save
      savePLAB2StationBank();

      res.json({
        success: true,
        totalGenerated,
        target: targetStations,
        progress: `${totalGenerated}/${targetStations}`,
        results: generationResults,
        stationBankSize: plab2StationBank.length,
        savedToFile: plab2QuestionBankFile
      });

    } catch (error) {
      console.error('PLAB 2 batch generation error:', error);
      res.status(500).json({ error: "Failed to generate PLAB 2 station bank", details: error.message });
    }
  });

  // Get PLAB 2 stations endpoint
  app.get("/api/plab2/stations", (req, res) => {
    try {
      const { specialty, type, difficulty, limit = 50 } = req.query;
      
      let filteredStations = [...PLAB2_TEMPLATE_STATIONS, ...plab2StationBank];
      
      if (specialty && specialty !== 'all') {
        filteredStations = filteredStations.filter(s => s.specialty === specialty);
      }
      
      if (type && type !== 'all') {
        filteredStations = filteredStations.filter(s => s.type === type);
      }
      
      if (difficulty && difficulty !== 'all') {
        filteredStations = filteredStations.filter(s => s.difficulty === difficulty);
      }
      
      const limitedStations = filteredStations.slice(0, parseInt(limit as string));
      
      res.json({
        stations: limitedStations,
        total: filteredStations.length,
        templateStations: PLAB2_TEMPLATE_STATIONS.length,
        generatedStations: plab2StationBank.length,
        filters: { specialty, type, difficulty, limit }
      });
    } catch (error) {
      console.error('Error fetching PLAB 2 stations:', error);
      res.status(500).json({ error: "Failed to fetch PLAB 2 stations" });
    }
  });

  // Single batch generation endpoint (for smaller requests)
  app.post("/api/generate-questions", async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus()
      });
    }

    try {
      const { category, difficulty = "mixed", count = 50 } = req.body;
      
      // Use existing test questions as templates
      const response = await fetch(`${req.protocol}://${req.get('host')}/api/test/questions`);
      const templateQuestions = await response.json();
      
      // Generate questions using AI with templates as reference
      const generatedQuestions = await generateMedicalQuestions(
        templateQuestions.slice(0, 8), 
        category, 
        difficulty, 
        count
      );
      
      // Add to question bank and save
      ukQuestionBank.push(...generatedQuestions);
      saveQuestionBank();
      
      res.json({
        success: true,
        generated: generatedQuestions.length,
        questions: generatedQuestions,
        totalQuestionBank: ukQuestionBank.length
      });
      
    } catch (error) {
      console.error('Question generation error:', error);
      res.status(500).json({ error: "Failed to generate questions" });
    }
  });

  // AI NHS Prep endpoint
  app.post("/api/ask-nhs-prep", async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus(),
        fallback: "Please refer to NICE guidelines at https://www.nice.org.uk/guidance for medical guidance"
      });
    }

    try {
      const { question, context } = req.body;
      
      // Simulate AI response based on medical guidelines
      const response = await generateMedicalGuidanceResponse(question, context);
      
      res.json({
        response,
        sources: ["NICE Guidelines", "Clinical Knowledge Summaries", "BNF"],
        aiEnabled: true
      });
      
    } catch (error) {
      console.error('AI guidance error:', error);
      res.status(500).json({ error: "Failed to generate guidance" });
    }
  });

  // Translation endpoint - simple fallback without AI
  app.post("/api/translate-question", async (req, res) => {
    try {
      const { question, targetLanguage } = req.body;
      
      // Since AI is suspended, return original content with a note
      res.json({
        question: question.question + " (Translation temporarily unavailable)",
        options: question.options,
        explanation: question.explanation + " (Translation temporarily unavailable)"
      });
    } catch (error) {
      console.error("Translation endpoint error:", error);
      res.status(500).json({ error: "Translation service unavailable" });
    }
  });

  app.post("/api/tutor", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus()
    });
  });

  app.post("/api/ai-analysis", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus()
    });
  });

  // OSCE Stations endpoint
  app.get("/api/osce/stations", async (req, res) => {
    try {
      const { type, specialty, difficulty, count } = req.query;
      
      // Load comprehensive OSCE stations (176 stations covering full GMC blueprint)
      const comprehensiveStations = loadComprehensiveOSCEBank();
      const userFormatStations = comprehensiveStations.length > 0 ? comprehensiveStations : loadUserFormatStations();
      
      if (userFormatStations && userFormatStations.length > 0) {
        let filteredStations = userFormatStations;
        
        // Apply filters if provided
        if (type && type !== 'all') {
          filteredStations = filteredStations.filter(station => 
            station.station_type?.toLowerCase().includes(type.toString().toLowerCase()) ||
            station.scenario_title?.toLowerCase().includes(type.toString().toLowerCase())
          );
        }
        
        if (specialty && specialty !== 'all') {
          filteredStations = filteredStations.filter(station => 
            station.station_type?.toLowerCase().includes(specialty.toString().toLowerCase())
          );
        }
        
        if (difficulty && difficulty !== 'all') {
          filteredStations = filteredStations.filter(station => 
            station.difficulty?.toLowerCase() === difficulty.toString().toLowerCase()
          );
        }
        
        // Limit results if count is specified
        const limit = count ? parseInt(count.toString()) : 20;
        const limitedStations = filteredStations.slice(0, limit);
        
        // Transform to match expected format
        const transformedStations = limitedStations.map((station, index) => ({
          id: `station_${index + 1}`,
          title: station.scenario_title || station.title || 'Clinical Station',
          category: station.station_type || 'General Medicine',
          difficulty: station.difficulty || 'intermediate',
          duration: station.duration || 8,
          description: station.brief || '',
          scenario: station.detailed_scenario || station.scenario || station.brief || '',
          instructions: {
            candidate: station.candidate_instructions || 'Take appropriate history, examination, or explanation as indicated',
            examiner: station.examiner_instructions || 'Assess candidate performance according to marking scheme',
            standardizedPatient: typeof station.actor_script === 'object' ? 
              `Opening: ${station.actor_script.opening || ''}\nDetails: ${station.actor_script.details || ''}\nHidden Info: ${station.actor_script.hidden_info || ''}` :
              station.actor_script || ''
          },
          markingCriteria: station.mark_scheme ? [{
            category: "Overall Performance",
            maxMarks: 20,
            criteria: Array.isArray(station.mark_scheme) ? station.mark_scheme : [station.mark_scheme]
          }] : [],
          keyActions: station.key_learning_points || station.mark_scheme || [],
          redFlags: station.red_flags || [],
          medications: station.medications || [],
          references: station.guideline_links ? Object.entries(station.guideline_links).map(([title, url]) => ({
            title,
            url: url as string
          })) : [],
          completed: false,
          attempts: 0,
          bestScore: 0,
          examFrequency: 'high'
        }));
        
        res.json(transformedStations);
      } else {
        // Fallback to empty array if no stations found
        res.json([]);
      }
    } catch (error) {
      console.error('Error fetching OSCE stations:', error);
      res.status(500).json({ error: "Failed to fetch OSCE stations" });
    }
  });

  // Comprehensive OSCE Generation Routes
  app.post("/api/generate-comprehensive-osce", async (req, res) => {
    try {
      const { targetCount = 150 } = req.body;
      
      console.log(`Starting comprehensive OSCE generation for ${targetCount} stations`);
      
      // Generate comprehensive OSCE bank
      const stations = generateComprehensiveOSCEBank(targetCount);
      
      res.json({
        success: true,
        message: `Generated ${stations.length} comprehensive OSCE stations`,
        totalStations: stations.length,
        targetCount,
        stats: getOSCEBankStats()
      });
      
    } catch (error) {
      console.error('Comprehensive OSCE generation error:', error);
      res.status(500).json({ error: "Failed to generate comprehensive OSCE bank" });
    }
  });

  app.get("/api/comprehensive-osce/stations", async (req, res) => {
    try {
      const { count = 20, type, specialty, difficulty } = req.query;
      
      // Load comprehensive OSCE stations
      let stations = loadComprehensiveOSCEBank();
      
      // Apply filters
      if (type && type !== 'all') {
        stations = stations.filter(station => 
          station.station_type.toLowerCase().includes(type.toString().toLowerCase())
        );
      }
      
      if (specialty && specialty !== 'all') {
        stations = stations.filter(station => 
          station.specialty?.toLowerCase().includes(specialty.toString().toLowerCase())
        );
      }
      
      if (difficulty && difficulty !== 'all') {
        stations = stations.filter(station => 
          station.difficulty?.toLowerCase() === difficulty.toString().toLowerCase()
        );
      }
      
      // Limit results
      const limitedStations = stations.slice(0, parseInt(count.toString()));
      
      // Transform to expected format
      const transformedStations = limitedStations.map((station, index) => ({
        id: `comp_station_${index + 1}`,
        title: station.scenario_title,
        category: station.station_type,
        difficulty: station.difficulty?.toLowerCase() || 'intermediate',
        duration: station.duration || 8,
        description: station.brief,
        scenario: station.brief,
        instructions: {
          candidate: station.brief,
          examiner: `Assess candidate performance using the marking criteria`,
          standardizedPatient: `${station.actor_script.opening}\n${station.actor_script.details}\n${station.actor_script.hidden_info}`
        },
        markingCriteria: [{
          category: "Clinical Performance",
          maxMarks: 20,
          criteria: station.mark_scheme
        }],
        keyActions: station.mark_scheme,
        mnemonic: station.mnemonic,
        communicationNotes: station.communication_notes,
        references: Object.entries(station.guideline_links).map(([title, url]) => ({
          title,
          url
        })),
        specialty: station.specialty,
        completed: false,
        attempts: 0,
        bestScore: 0,
        examFrequency: 'high'
      }));
      
      res.json(transformedStations);
      
    } catch (error) {
      console.error('Error fetching comprehensive OSCE stations:', error);
      res.status(500).json({ error: "Failed to fetch comprehensive OSCE stations" });
    }
  });

  app.get("/api/comprehensive-osce/stats", async (req, res) => {
    try {
      const stats = getOSCEBankStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching OSCE stats:', error);
      res.status(500).json({ error: "Failed to fetch OSCE statistics" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/live", async (req, res) => {
    try {
      const stats = getUsageStats();
      res.json({
        currentTestTakers: stats.currentTestTakers,
        activeUsers: stats.activeUsers,
        todayTests: stats.todayTests,
        testPerformance: stats.testPerformance,
        popularPages: stats.popularPages,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.post("/api/analytics/test-completion", async (req, res) => {
    try {
      const { sessionId, testType, questionsAnswered, correctAnswers, timeSpent } = req.body;
      
      trackTestActivity(sessionId || generateSessionId(), {
        testType: testType || 'PassMedicine-style',
        questionsAnswered: questionsAnswered || 0,
        correctAnswers: correctAnswers || 0,
        timeSpent: timeSpent || 0,
        completedAt: new Date()
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Error tracking test completion:', error);
      res.status(500).json({ error: "Failed to track test" });
    }
  });

  // PLAB practice test questions - Static content only
  // Initialize adaptive AI engine with question bank
  const initializeAdaptiveAI = () => {
    try {
      // First try to load existing question bank
      loadQuestionBank();
      
      // Use the loaded ukQuestionBank or create from test questions
      let questions = ukQuestionBank;
      
      if (!questions || questions.length === 0) {
        // Use the test questions from the API as starter questions for adaptive AI
        const testQuestions = [
          {
            id: "q1", 
            topic: "Urinary Tract Infection Management",
            category: "Infectious Diseases",
            difficulty: "medium",
            question: "A 28-year-old non-pregnant woman presents with a 2-day history of dysuria, urinary frequency, and suprapubic discomfort. Urine dipstick shows positive nitrites and leucocytes. What is the most appropriate first-line antibiotic treatment according to current UK guidelines?",
            options: ["Nitrofurantoin 100mg modified-release twice daily for 3 days", "Trimethoprim 200mg twice daily for 3 days", "Ciprofloxacin 500mg twice daily for 3 days", "Amoxicillin 500mg three times daily for 5 days", "Co-trimoxazole 960mg twice daily for 3 days"],
            correctAnswer: "Nitrofurantoin 100mg modified-release twice daily for 3 days",
            explanation: "Nitrofurantoin remains the first-line treatment for uncomplicated UTIs in non-pregnant women according to NICE guidelines, with excellent E. coli coverage and minimal resistance."
          },
          {
            id: "q2",
            topic: "Acute Coronary Syndrome Management", 
            category: "Cardiology",
            difficulty: "hard",
            question: "A 58-year-old man presents with severe central chest pain radiating to his left arm, lasting 45 minutes. ECG shows ST elevation >2mm in leads II, III, and aVF. What is the most appropriate immediate management?",
            options: ["Primary percutaneous coronary intervention (PCI) within 120 minutes", "Thrombolytic therapy with alteplase immediately", "High-dose atorvastatin and dual antiplatelet therapy", "Coronary angiography within 24 hours", "Conservative management with aspirin and clopidogrel"],
            correctAnswer: "Primary percutaneous coronary intervention (PCI) within 120 minutes",
            explanation: "Primary PCI within 120 minutes is the gold standard for STEMI management, providing superior outcomes compared to thrombolytic therapy."
          }
        ];
        questions = testQuestions;
        console.log('Using starter questions for Adaptive AI Engine initialization');
      }
      
      AdaptiveAIEngine.initialize(questions);
      console.log(`Adaptive AI Engine initialized with ${questions.length} questions`);
    } catch (error) {
      console.error('Failed to initialize Adaptive AI Engine:', error);
      // Initialize with minimal question set as absolute fallback
      const fallbackQuestions = [{
        id: "fallback1",
        topic: "General Medicine",
        category: "General",
        difficulty: "medium",
        question: "Which organization provides clinical guidelines for UK healthcare?",
        options: ["NICE", "WHO", "FDA", "EMA"],
        correctAnswer: "NICE",
        explanation: "NICE (National Institute for Health and Care Excellence) provides evidence-based clinical guidelines for UK healthcare."
      }];
      AdaptiveAIEngine.initialize(fallbackQuestions);
      console.log('Adaptive AI Engine initialized with fallback questions');
    }
  };
  
  // Initialize on startup
  initializeAdaptiveAI();

  // Adaptive AI Engine routes
  app.post('/api/adaptive/start-session', async (req, res) => {
    try {
      const { userId, existingPerformance } = req.body;
      const sessionId = AdaptiveAIEngine.startSession(userId, existingPerformance);
      res.json({ sessionId, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to start adaptive session' });
    }
  });

  app.post('/api/adaptive/process-answer', async (req, res) => {
    try {
      const { sessionId, questionId, selectedAnswer, timeSpent } = req.body;
      const response = AdaptiveAIEngine.processAnswer(sessionId, questionId, selectedAnswer, timeSpent);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process answer' });
    }
  });

  app.get('/api/adaptive/analytics/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const analytics = AdaptiveAIEngine.getUserAnalytics(userId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user analytics' });
    }
  });

  app.post('/api/adaptive/weakness-check', async (req, res) => {
    try {
      const { sessionId, currentAnswer } = req.body;
      const check = AdaptiveAIEngine.getRealTimeWeaknessCheck(sessionId, currentAnswer);
      res.json(check);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check weakness' });
    }
  });

  app.get('/api/adaptive/stats', async (req, res) => {
    try {
      const stats = AdaptiveAIEngine.getEngineStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get engine stats' });
    }
  });

  app.get("/api/test/questions", async (req, res) => {
    try {
      // Track page view
      const sessionId = Array.isArray(req.headers['x-session-id']) 
        ? req.headers['x-session-id'][0] 
        : req.headers['x-session-id'] || generateSessionId();
      trackPageView(sessionId, '/test');

      // Extract query parameters for filtering
      const { category, difficulty, count } = req.query;
      const requestedCount = count ? parseInt(count as string) : 10;

      const testQuestions = [
        {
          id: "q1", 
          topic: "Urinary Tract Infection Management",
          question: "A 28-year-old non-pregnant woman presents to your GP practice with a 2-day history of dysuria, urinary frequency, and suprapubic pain. She has no fever, flank pain, or vaginal discharge. Urine dipstick shows nitrites positive and leucocytes 2+. What is the most appropriate first-line antibiotic treatment?",
          options: {
            A: "Nitrofurantoin 100mg modified-release twice daily for 3 days",
            B: "Trimethoprim 200mg twice daily for 3 days",
            C: "Amoxicillin 500mg three times daily for 3 days", 
            D: "Ciprofloxacin 250mg twice daily for 3 days",
            E: "Fosfomycin 3g single dose"
          },
          answer: "A",
          explanation: "Why Nitrofurantoin 100mg modified-release twice daily for 3 days is correct:\n\n• Gold Standard Treatment: \n  - NICE NG109 specifically recommends nitrofurantoin as first-line therapy for uncomplicated lower UTIs in non-pregnant women aged 16-64\n  - Endorsed by Clinical Knowledge Summaries, British National Formulary, and Public Health England guidelines\n  - Consistently ranked as primary choice across all major UK antimicrobial prescribing protocols\n  - Forms the cornerstone of evidence-based UTI management in primary care settings\n\n• Exceptional Microbiological Efficacy: \n  - Demonstrates outstanding in vitro and in vivo activity against Escherichia coli, which accounts for 80-85% of uncomplicated UTIs\n  - Maintains >95% sensitivity rates against common uropathogens including Klebsiella pneumoniae and Enterococcus faecalis\n  - Shows consistent bactericidal activity with minimal inhibitory concentrations well below achievable urinary levels\n  - Retains effectiveness against extended-spectrum beta-lactamase producing organisms\n\n• Unique Multi-Target Mechanism: \n  - Inhibits bacterial DNA synthesis, RNA synthesis, protein synthesis, and cell wall formation simultaneously\n  - Multiple antimicrobial pathways significantly reduce the likelihood of resistance development\n  - Acts through nitrofuran reduction by bacterial nitroreductases, creating reactive intermediates that damage multiple cellular components\n  - This multi-target approach explains the remarkably low resistance rates observed in clinical surveillance\n\n• Pharmacokinetic Advantages: \n  - Achieves urinary concentrations of 200-400 mcg/ml, far exceeding minimum inhibitory concentrations for target pathogens\n  - Minimal systemic absorption and distribution reduces systemic side effects and drug interactions\n  - Rapid renal elimination ensures concentrated antibacterial activity specifically within the urinary tract\n  - Modified-release formulation provides sustained therapeutic levels throughout 12-hour dosing intervals\n\n• Robust Clinical Evidence: \n  - Multiple randomized controlled trials demonstrate bacteriological cure rates of 85-95% for uncomplicated cystitis\n  - Cochrane systematic reviews confirm non-inferiority to other first-line agents with superior safety profile\n  - Real-world effectiveness studies show consistent clinical cure rates across diverse patient populations\n  - Long-term follow-up studies demonstrate sustained efficacy with minimal impact on normal flora\n\n• Optimized Pharmaceutical Formulation: \n  - Modified-release preparation ensures steady drug release and optimal absorption kinetics\n  - Reduces peak plasma concentrations while maintaining therapeutic urinary levels\n  - Significantly decreases gastrointestinal adverse effects compared to immediate-release formulations\n  - Improves patient compliance through twice-daily dosing convenience\n\n• Resistance Profile Excellence: \n  - UK antimicrobial resistance surveillance data consistently shows <5% resistance rates for E. coli\n  - European Centre for Disease Prevention and Control reports stable low resistance across EU countries\n  - Resistance development remains minimal even after decades of clinical use\n  - Preserves effectiveness of other antimicrobials through narrow-spectrum targeting\n\n• Optimal Treatment Duration: \n  - Three-day duration provides optimal balance between therapeutic efficacy and antimicrobial stewardship\n  - Clinical trials confirm non-inferiority of 3-day vs 5-7 day courses for uncomplicated infections\n  - Reduces selective pressure for resistance development through shorter exposure duration\n  - Minimizes disruption to normal microbiota while ensuring complete pathogen eradication\n\n• Antimicrobial Stewardship Alignment: \n  - Supports WHO, NICE, and local antimicrobial stewardship principles through targeted narrow-spectrum therapy\n  - Preserves broad-spectrum agents for complicated infections and resistant organisms\n  - Contributes to global efforts to combat antimicrobial resistance through responsible prescribing\n  - Demonstrates commitment to evidence-based medicine and rational antibiotic use",
          incorrectExplanation: "• Option B (Trimethoprim 200mg twice daily) - Compromised First-Line Status: \n  - UK surveillance data demonstrates 20-30% resistance rates among E. coli isolates, significantly reducing empirical effectiveness\n  - European Centre for Disease Prevention and Control reports rising resistance trends across EU member states\n  - NICE guidelines now classify as second-line due to declining clinical reliability in uncomplicated UTIs\n  - Should be reserved for culture-guided therapy when sensitivity testing confirms susceptibility\n  - Folate antagonism mechanism susceptible to widespread resistance through dihydrofolate reductase mutations\n  - No longer meets the >90% efficacy threshold required for empirical first-line therapy\n\n• Option C (Amoxicillin 500mg three times daily) - Inadequate Uropathogen Coverage: \n  - Demonstrates poor intrinsic activity against gram-negative uropathogens, particularly E. coli and Klebsiella species\n  - Beta-lactamase production by >50% of E. coli strains renders amoxicillin ineffective for empirical treatment\n  - Lacks sufficient urinary concentrations to overcome resistance mechanisms in common UTI pathogens\n  - NICE, CKS, and BNF explicitly exclude from recommended UTI treatment protocols\n  - Broad-spectrum activity unnecessarily disrupts normal flora without targeted uropathogen efficacy\n  - Clinical trials consistently demonstrate inferior cure rates compared to nitrofurantoin and trimethoprim\n\n• Option D (Ciprofloxacin 250mg twice daily) - Inappropriate Broad-Spectrum Use: \n  - Fluoroquinolone class reserved for complicated UTIs, pyelonephritis, and multi-resistant organisms per NICE guidance\n  - Contributes significantly to antimicrobial resistance development through selective pressure on gram-negative bacteria\n  - UK antimicrobial stewardship policies explicitly restrict fluoroquinolone use for uncomplicated lower UTIs\n  - Associated with Clostridioides difficile infection risk and other serious adverse effects\n  - Unnecessary exposure to broad-spectrum agent when narrow-spectrum alternatives remain effective\n  - Public Health England guidelines emphasize preservation for serious infections requiring broad coverage\n\n• Option E (Fosfomycin 3g single dose) - Specialized Second-Line Therapy: \n  - Currently licensed and recommended for treatment failures, recurrent infections, or specific clinical circumstances\n  - Significantly more expensive than first-line options, impacting healthcare resource allocation\n  - Limited clinical experience compared to established first-line agents in UK primary care settings\n  - NICE guidance reserves for specific indications rather than routine empirical therapy\n  - Single-dose regimen may not provide sustained antimicrobial pressure for complete bacterial eradication\n  - Should be considered after first-line therapy failure or in patients with contraindications to standard treatments",
          mnemonic: "UTI Treatment: NITRO = Nice Initial Treatment Recommended Option\n\nUTI Risk Factors: FEMALES = Frequent intercourse, E.coli, Males (uncircumcised), Age extremes, Low fluid intake, Estrogen deficiency, Sexual activity\n\nUTI Symptoms: FUND = Frequency, Urgency, Nocturia, Dysuria\n\nComplicated UTI: PHUNK = Pregnancy, Hospitalisation, Urological abnormality, Nephritis, Kids (pediatric)",
          guidelineSummary: {
            title: "UTI Management Summary",
            content: "• **Definition & Diagnosis**: \n  - Uncomplicated UTI presents with dysuria, frequency, urgency, suprapubic pain in healthy non-pregnant women aged 16-64\n  - Diagnosis confirmed by positive urine dipstick (nitrites/leucocytes) or MSU culture\n  - Consider alternative diagnoses in atypical presentations\n\n• **First-line Treatment**: \n  - Nitrofurantoin 100mg modified-release BD for 3 days remains gold standard\n  - Excellent E. coli coverage (>95% sensitivity), minimal resistance development\n  - Concentrated urinary excretion\n  - Avoid in eGFR <45ml/min\n\n• **Alternative Options**: \n  - Trimethoprim 200mg BD for 3 days (second-line due to 20-30% E. coli resistance)\n  - Fosfomycin 3g single dose for treatment failures or intolerance\n  - Avoid quinolones unless specifically indicated\n\n• **When to Culture**: \n  - Suspected pyelonephritis, treatment failure, recurrent UTIs (≥2 episodes in 6 months)\n  - Pregnancy, immunocompromised patients, or atypical organisms suspected\n\n• **Safety Netting**: \n  - Advise patients to return if symptoms persist >48 hours post-treatment\n  - Develop fever/flank pain, or experience severe systemic symptoms\n  - Provide written information on fluid intake and symptom monitoring\n\n• **Prevention**: \n  - Recommend adequate hydration, complete bladder emptying\n  - Post-coital voiding for sexually active women\n  - Consider cranberry products for recurrent cases, though evidence remains limited\n\n• **Antibiotic Stewardship**: \n  - Reserve broad-spectrum antibiotics for complicated cases\n  - Encourage symptom diaries for recurrent infections to identify triggers and optimize prevention strategies"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/ng109",
              description: "NICE NG109: Urinary tract infection (lower) - antimicrobial prescribing"
            },
            supplementary: [
              {
                title: "NICE Visual Summary",
                url: "https://www.nice.org.uk/guidance/ng136/resources/visual-summary-pdf-6899919517",
                description: "NICE NG136 Visual Summary - Hypertension treatment flowchart"
              },
              {
                title: "NICE Guidance",
                url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/",
                description: "Clinical Knowledge Summaries - comprehensive UTI guidance"
              },
              {
                title: "BNF Antimicrobial Guidance", 
                url: "https://bnf.nice.org.uk/treatment-summaries/urinary-tract-infections/",
                description: "British National Formulary - UTI treatment protocols"
              },
              {
                title: "PHE Antimicrobial Guidelines",
                url: "https://www.gov.uk/government/publications/managing-common-infections-guidance-for-primary-care",
                description: "Public Health England - managing common infections in primary care"
              },
              {
                title: "SIGN Antimicrobial Prescribing",
                url: "https://www.sign.ac.uk/our-guidelines/antibiotic-prophylaxis-in-surgery/",
                description: "Scottish Intercollegiate Guidelines Network - infection management"
              }
            ]
          }
        },
        {
          id: "q2",
          topic: "Acute Coronary Syndrome Management",
          question: "A 58-year-old man presents to the emergency department with severe central chest pain radiating to his left arm, lasting 45 minutes. He appears sweaty and nauseous. ECG shows ST elevation >2mm in leads II, III, and aVF. His blood pressure is 140/85 mmHg, heart rate 95 bpm. What is the most appropriate immediate management?",
          options: {
            A: "Primary percutaneous coronary intervention (PCI) within 120 minutes",
            B: "Thrombolytic therapy with alteplase immediately",
            C: "High-dose atorvastatin and dual antiplatelet therapy",
            D: "Coronary angiography within 24 hours",
            E: "Conservative management with aspirin and clopidogrel"
          },
          answer: "A",
          explanation: "Why Primary PCI within 120 minutes is correct:\n\n• NICE CG167 Gold Standard Treatment: \n  - Primary PCI represents the definitive reperfusion strategy for STEMI when delivered within 120 minutes of first medical contact\n  - European Society of Cardiology and American Heart Association guidelines consistently rank primary PCI as Class I recommendation\n  - Achieves superior outcomes compared to thrombolytic therapy in terms of mortality, reinfarction, and stroke reduction\n  - Forms the cornerstone of contemporary acute coronary syndrome management in healthcare systems with PCI capability\n\n• Superior Clinical Outcomes: \n  - Meta-analyses of randomized controlled trials demonstrate 25-30% relative risk reduction in 30-day mortality compared to thrombolysis\n  - Significantly reduces risk of intracranial hemorrhage (0.05% vs 0.7% with thrombolysis)\n  - Lower rates of reinfarction, target vessel revascularization, and major bleeding complications\n  - Provides immediate restoration of epicardial and microvascular flow with TIMI 3 flow achievement >95%\n\n• Optimal Timing Advantages: \n  - 120-minute door-to-balloon time threshold balances logistical feasibility with clinical benefit\n  - Every 30-minute delay in reperfusion increases relative mortality risk by 7.5%\n  - Time-dependent myocardial salvage maximized when intervention occurs within therapeutic window\n  - Modern cardiac networks designed to achieve primary PCI within recommended timeframes\n\n• Comprehensive Mechanical Revascularization: \n  - Allows complete assessment of coronary anatomy and multivessel disease evaluation\n  - Enables treatment of culprit vessel with optimal stent selection (drug-eluting vs bare metal)\n  - Provides immediate hemodynamic support capability if cardiogenic shock develops\n  - Permits assessment of left ventricular function and mechanical complications\n\n• Evidence-Based Guideline Compliance: \n  - NICE CG167 specifically recommends primary PCI as first-line reperfusion strategy\n  - Myocardial Infarction National Audit Project data supports improved outcomes with primary PCI\n  - Quality indicators and clinical governance frameworks emphasize door-to-balloon time optimization\n  - Aligns with international best practice and reduces medico-legal risk\n\n• Resource Utilization Efficiency: \n  - Single procedure addresses both diagnosis and treatment simultaneously\n  - Reduces hospital length of stay compared to thrombolysis with subsequent angiography\n  - Lower long-term healthcare costs through reduced readmissions and complications\n  - Optimal use of specialist cardiac intervention facilities and expertise",
          incorrectExplanation: "• Option B (Thrombolytic therapy with alteplase) - Suboptimal Reperfusion Strategy: \n  - Reserved for situations where primary PCI cannot be delivered within 120 minutes of first medical contact\n  - NICE CG167 relegates thrombolysis to second-line therapy when PCI facilities unavailable\n  - Higher rates of intracranial hemorrhage, reinfarction, and incomplete reperfusion compared to primary PCI\n  - Requires subsequent angiography within 24 hours, essentially delaying definitive treatment\n  - Contraindicated in patients with recent surgery, stroke, or bleeding disorders\n  - Does not provide immediate assessment of coronary anatomy or multivessel disease\n\n• Option C (High-dose atorvastatin and dual antiplatelet therapy) - Important but Insufficient: \n  - Represents essential adjunctive therapy but does not address acute vessel occlusion requiring immediate reperfusion\n  - Dual antiplatelet therapy alone cannot restore flow in completely occluded coronary arteries\n  - High-dose statin therapy provides plaque stabilization but requires days to weeks for clinical benefit\n  - Delays definitive reperfusion therapy during critical therapeutic window\n  - Should be initiated alongside, not instead of, primary PCI\n  - Time-dependent myocardial necrosis continues without mechanical intervention\n\n• Option D (Coronary angiography within 24 hours) - Inappropriate Delay: \n  - Represents non-primary PCI approach suitable for NSTEMI, not STEMI management\n  - 24-hour delay results in significant irreversible myocardial necrosis and adverse remodeling\n  - NICE guidelines specifically emphasize emergency reperfusion within 120 minutes for STEMI\n  - Misses critical therapeutic window where myocardial salvage remains possible\n  - Associated with worse clinical outcomes including higher mortality and heart failure rates\n  - Does not align with time-sensitive nature of ST-elevation myocardial infarction\n\n• Option E (Conservative management) - Contraindicated Approach: \n  - Completely inappropriate for STEMI requiring immediate reperfusion therapy\n  - Results in completed myocardial infarction with maximum infarct size and worst clinical outcomes\n  - Associated with highest mortality rates, mechanical complications, and long-term heart failure\n  - Contradicts all major international guidelines for acute coronary syndrome management\n  - Represents substandard care with significant medico-legal implications\n  - Antiplatelet therapy alone cannot restore flow in acutely occluded epicardial coronary arteries",
          mnemonic: "STEMI Management: PCI = Primary Choice Immediately\n\nACS Risk Factors: MATCH = Male, Age, Total cholesterol high, Cigarettes, Hypertension\n\nMI Complications: DREAD = Death, Rupture, Embolism, Arrhythmia, Dressler syndrome\n\nContraindications to Thrombolysis: HARBINS = Haemorrhage (active/recent), Aortic dissection, Recent surgery, Blood pressure >200/110, Intracranial pathology, Non-compressible puncture sites, Stroke (recent)",
          guidelineSummary: {
            title: "STEMI Management Summary",
            content: "• Definition & Recognition: \n  - ST elevation >2mm in chest leads or >1mm in limb leads in clinical context of acute coronary syndrome\n  - Symptoms include severe central chest pain, radiation to arms/jaw, associated autonomic features\n  - ECG changes reflect acute coronary occlusion requiring immediate reperfusion\n\n• Primary PCI Strategy: \n  - Gold standard reperfusion when achievable within 120 minutes of first medical contact\n  - Superior to thrombolysis for mortality, reinfarction, stroke, and bleeding outcomes\n  - Requires immediate activation of cardiac catheterization laboratory\n\n• Thrombolytic Therapy: \n  - Second-line when PCI unavailable within therapeutic window\n  - Alteplase, tenecteplase, or streptokinase depending on contraindications\n  - Requires subsequent angiography within 24 hours\n\n• Adjunctive Pharmacotherapy: \n  - Dual antiplatelet therapy (aspirin 300mg loading, clopidogrel 600mg or ticagrelor 180mg)\n  - High-dose atorvastatin 80mg immediately\n  - Anticoagulation with unfractionated heparin or bivalirudin\n\n• Secondary Prevention: \n  - ACE inhibitor within 24 hours if no contraindications\n  - Beta-blocker when hemodynamically stable\n  - Long-term dual antiplatelet therapy duration per guidelines\n\n• Complications Monitoring: \n  - Mechanical complications (papillary muscle rupture, ventricular septal defect)\n  - Arrhythmias requiring continuous cardiac monitoring\n  - Heart failure and cardiogenic shock assessment"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg167",
              description: "NICE CG167: Myocardial infarction - cardiac rehabilitation and prevention"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ng185",
                description: "Acute coronary syndromes - comprehensive management pathway"
              },
              {
                title: "NHS Cardiac Guidance",
                url: "https://www.nhs.uk/conditions/heart-attack/",
                description: "NHS guidance on heart attack management and treatment"
              },
              {
                title: "ESC Guidelines",
                url: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines",
                description: "European Society of Cardiology - STEMI management guidelines"
              },
              {
                title: "British Cardiovascular Society",
                url: "https://www.britishcardiovascularsociety.org",
                description: "Professional guidance for cardiac interventions"
              }
            ]
          }
        },
        {
          id: "q3",
          topic: "Type 2 Diabetes Management",
          question: "A 52-year-old woman with newly diagnosed type 2 diabetes has an HbA1c of 75 mmol/mol (9.0%). Her BMI is 32 kg/m², blood pressure 145/90 mmHg, and eGFR 85 ml/min/1.73m². She has no contraindications to medications. What is the most appropriate initial pharmacological management?",
          options: {
            A: "Metformin 500mg twice daily with lifestyle modifications",
            B: "Insulin detemir 10 units once daily",
            C: "Gliclazide 80mg twice daily",
            D: "Metformin plus empagliflozin combination",
            E: "Lifestyle modifications only for 6 months"
          },
          answer: "A",
          explanation: "Why Metformin 500mg twice daily with lifestyle modifications is correct:\n\n• NICE NG28 First-Line Treatment Standard: \n  - Metformin represents the evidence-based first-line pharmacological intervention for type 2 diabetes across all major international guidelines\n  - Demonstrated efficacy in reducing HbA1c by 1.0-1.5% (11-16 mmol/mol) when combined with lifestyle interventions\n  - Extensive clinical trial evidence spanning over three decades supports metformin as initial therapy\n  - UK Prospective Diabetes Study established metformin's role in reducing macrovascular complications\n\n• Superior Cardiovascular Protection: \n  - Metformin provides significant cardiovascular benefits beyond glycemic control\n  - Reduces risk of myocardial infarction by 39% and all-cause mortality by 36% compared to conventional therapy\n  - Cardioprotective effects demonstrated across diverse patient populations including those with established cardiovascular disease\n  - Neutral or beneficial effects on heart failure outcomes unlike some other antidiabetic agents\n\n• Optimal Weight Management Profile: \n  - Weight-neutral or modest weight reduction effects particularly beneficial in overweight patients (BMI 32 kg/m²)\n  - Contrasts favorably with insulin and sulfonylureas which typically cause weight gain\n  - Supports long-term metabolic health through improved insulin sensitivity\n  - Enhances effectiveness of concurrent lifestyle modifications\n\n• Comprehensive Metabolic Benefits: \n  - Improves insulin sensitivity at hepatic and peripheral muscle sites\n  - Reduces hepatic glucose production through AMP-activated protein kinase pathway activation\n  - Beneficial effects on lipid profile including modest reduction in LDL cholesterol\n  - May improve endothelial function and reduce inflammation markers\n\n• Excellent Safety and Tolerability Profile: \n  - Low risk of hypoglycemia when used as monotherapy\n  - Contraindications limited to severe renal impairment (eGFR <30), acute illness, or lactic acidosis risk\n  - Gastrointestinal side effects typically mild and transient, minimized by gradual dose escalation\n  - Extensive post-marketing surveillance confirms long-term safety\n\n• Cost-Effectiveness and Accessibility: \n  - Generic formulations available ensuring affordability across healthcare systems\n  - Well-established prescribing patterns and clinical familiarity among healthcare providers\n  - Lower overall healthcare costs through prevention of diabetes complications\n  - Suitable for resource-limited settings with proven efficacy",
          incorrectExplanation: "• Option B (Insulin detemir 10 units once daily) - Premature Intensive Therapy: \n  - Reserved for patients with severe hyperglycemia, ketosis, or failure of oral antidiabetic agents\n  - NICE NG28 recommends insulin initiation only after metformin optimization and consideration of additional oral agents\n  - Associated with significant weight gain (2-4 kg average) particularly problematic in overweight patients\n  - Higher risk of severe hypoglycemia requiring emergency intervention\n  - More complex dosing regimen requiring blood glucose monitoring and dose adjustment\n  - Does not address underlying insulin resistance characteristic of type 2 diabetes\n\n• Option C (Gliclazide 80mg twice daily) - Suboptimal First-Line Choice: \n  - Sulfonylureas relegated to second-line therapy due to hypoglycemia risk and weight gain\n  - Mechanism of action (insulin secretagogue) does not address insulin resistance\n  - Associated with 2-5 kg weight gain potentially exacerbating metabolic dysfunction\n  - Higher cardiovascular mortality concerns raised in some observational studies\n  - Progressive beta-cell exhaustion with prolonged use leading to secondary failure\n  - Lack of cardiovascular protection compared to metformin\n\n• Option D (Metformin plus empagliflozin combination) - Inappropriate Initial Intensification: \n  - Combination therapy reserved for patients failing to achieve targets on metformin monotherapy\n  - NICE guidelines emphasize stepwise approach starting with metformin optimization\n  - Empagliflozin more expensive than metformin alone without additional benefit as initial therapy\n  - Increased risk of genitourinary infections and diabetic ketoacidosis\n  - Should be considered only after 3-6 months of metformin therapy if targets not achieved\n  - Lacks evidence for superior initial efficacy compared to metformin monotherapy\n\n• Option E (Lifestyle modifications only) - Inadequate for Severe Hyperglycemia: \n  - HbA1c of 75 mmol/mol represents significant hyperglycemia requiring immediate pharmacological intervention\n  - NICE guidelines recommend immediate metformin initiation when HbA1c >58 mmol/mol (7.5%)\n  - Lifestyle modifications alone insufficient to achieve target HbA1c reduction from this elevated baseline\n  - Delays appropriate treatment potentially increasing risk of diabetic complications\n  - May result in progressive beta-cell dysfunction and more difficult future glycemic control\n  - Contradicts evidence-based approach to diabetes management in moderate to severe hyperglycemia",
          mnemonic: "Diabetes Management: MET = Metformin Every Time (first-line)\n\nDiabetes Complications: DIVINE = Diabetic nephropathy, Ischaemic heart disease, Visual problems, Infections, Neuropathy, Emergencies (DKA/HHS)\n\nDKA Precipitants: 4 I's = Infection, Ischaemia, Iatrogenic (drugs), Idiopathic\n\nHbA1c Targets: SAFE = Standard 53mmol/mol (7%), Avoid tight control in elderly, Frail patients 58-64mmol/mol, Everyone individualised",
          guidelineSummary: {
            title: "Type 2 Diabetes Management Summary",
            content: "• Definition & Diagnosis: \n  - HbA1c ≥48 mmol/mol (6.5%) or fasting glucose ≥7.0 mmol/L in symptomatic patients\n  - Confirmed with repeat testing unless symptomatic with random glucose ≥11.1 mmol/L\n  - Consider MODY, LADA in atypical presentations\n\n• First-Line Pharmacotherapy: \n  - Metformin 500mg twice daily, increase to 1g twice daily if tolerated\n  - Contraindicated if eGFR <30 ml/min/1.73m² or acute illness\n  - Continue alongside lifestyle modifications throughout treatment\n\n• HbA1c Targets: \n  - Standard target 53 mmol/mol (7.0%) for most adults\n  - Individualized targets considering age, comorbidities, hypoglycemia risk\n  - Relaxed targets (58-64 mmol/mol) in elderly or high bleeding risk\n\n• Second-Line Options: \n  - Add sulfonylurea, pioglitazone, DPP4 inhibitor, SGLT2 inhibitor, or GLP1 agonist\n  - Choice depends on patient factors: weight, cardiovascular risk, renal function\n  - Consider insulin if HbA1c >75 mmol/mol despite dual therapy\n\n• Cardiovascular Protection: \n  - SGLT2 inhibitors or GLP1 agonists for established cardiovascular disease\n  - Blood pressure target <140/90 mmHg (or <130/80 with kidney/eye disease)\n  - Statin therapy for primary prevention if QRISK >10%\n\n• Complications Screening: \n  - Annual diabetic retinopathy screening\n  - Foot examination annually\n  - Urine albumin:creatinine ratio and eGFR monitoring"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/ng28",
              description: "NICE NG28: Type 2 diabetes in adults - management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ng17",
                description: "Type 1 and 2 diabetes in children and young people"
              },
              {
                title: "NHS Diabetes Guidance",
                url: "https://www.nhs.uk/conditions/type-2-diabetes/",
                description: "NHS guidance on type 2 diabetes management"
              },
              {
                title: "Diabetes UK Guidelines", 
                url: "https://www.diabetes.org.uk/professionals",
                description: "Professional guidance for diabetes management"
              },
              {
                title: "SIGN Diabetes Guidelines",
                url: "https://www.sign.ac.uk/our-guidelines/management-of-diabetes/",
                description: "Scottish diabetes management recommendations"
              }
            ]
          }
        },
        {
          id: "q4",
          topic: "Community-Acquired Pneumonia",
          question: "A 45-year-old previously healthy man presents with a 3-day history of fever, productive cough with purulent sputum, and right-sided chest pain. His temperature is 38.8°C, respiratory rate 24/min, blood pressure 110/70 mmHg, pulse 95 bpm, oxygen saturation 94% on air. Chest X-ray shows right lower lobe consolidation. What is the most appropriate initial antibiotic treatment?",
          options: {
            A: "Amoxicillin 500mg three times daily for 5 days",
            B: "Co-amoxiclav 625mg three times daily for 7 days",
            C: "Clarithromycin 500mg twice daily for 5 days",
            D: "Levofloxacin 500mg once daily for 5 days",
            E: "Doxycycline 200mg loading then 100mg daily"
          },
          answer: "A",
          explanation: "Why Amoxicillin 500mg three times daily for 5 days is correct:\n\n• NICE CG191 First-Line Evidence-Based Treatment: \n  - Amoxicillin represents the definitive first-line antibiotic for community-acquired pneumonia in previously healthy adults\n  - British Thoracic Society guidelines consistently recommend amoxicillin for low-severity CAP management\n  - Extensive clinical trial evidence demonstrates non-inferiority to broader spectrum agents for typical bacterial pneumonia\n  - Cost-effective choice reducing unnecessary antibiotic resistance pressure\n\n• Optimal Streptococcus pneumoniae Coverage: \n  - Targets the most common cause of bacterial community-acquired pneumonia (30-50% of cases)\n  - Excellent activity against penicillin-sensitive pneumococcal strains prevalent in UK\n  - Bactericidal activity through beta-lactam mechanism disrupting bacterial cell wall synthesis\n  - Achieves therapeutic concentrations in respiratory tract tissues and alveolar fluid\n\n• Appropriate Spectrum for Typical Bacteria: \n  - Effective against Haemophilus influenzae, the second most common CAP pathogen\n  - Covers Moraxella catarrhalis in patients without significant risk factors\n  - Avoids unnecessary broad-spectrum coverage in immunocompetent patients\n  - Preserves effectiveness of broader agents for complicated or resistant infections\n\n• Proven Clinical Efficacy Profile: \n  - Randomized controlled trials demonstrate 85-90% clinical cure rates for mild-moderate CAP\n  - Equivalent outcomes to combination therapies in appropriately selected patients\n  - Shorter duration (5 days) proven non-inferior to traditional 7-10 day courses\n  - Well-tolerated with minimal adverse effects in healthy adults\n\n• Antimicrobial Stewardship Compliance: \n  - Narrow-spectrum approach supports global antimicrobial resistance reduction efforts\n  - Minimizes selective pressure on gram-negative organisms and anaerobic flora\n  - Reduces risk of Clostridioides difficile infection compared to broader spectrum alternatives\n  - Aligns with NICE antimicrobial prescribing guidelines and local formularies\n\n• Pharmacokinetic Advantages: \n  - Excellent oral bioavailability (74-92%) ensuring adequate systemic exposure\n  - Predictable pharmacokinetics allowing standard dosing without monitoring\n  - Minimal drug interactions compared to macrolides and fluoroquinolones\n  - Safe in patients with mild-moderate renal impairment",
          incorrectExplanation: "• Option B (Co-amoxiclav 625mg three times daily) - Unnecessarily Broad Spectrum: \n  - Beta-lactamase inhibitor combination adds no benefit for typical community-acquired pneumonia\n  - NICE CG191 reserves co-amoxiclav for patients with specific risk factors or treatment failure\n  - Higher rates of gastrointestinal side effects including antibiotic-associated diarrhea\n  - Increased selective pressure on resistant organisms without additional clinical benefit\n  - More expensive than amoxicillin without improved outcomes in this clinical scenario\n  - Should be considered for patients with chronic lung disease or previous antibiotic exposure\n\n• Option C (Clarithromycin 500mg twice daily) - Inappropriate Monotherapy: \n  - Macrolide monotherapy inadequate for pneumococcal pneumonia due to resistance concerns\n  - UK pneumococcal resistance rates to macrolides approach 15-20% in some regions\n  - Risk of treatment failure particularly in severe pneumococcal infections\n  - Reserved for atypical pathogen coverage or penicillin-allergic patients\n  - Should be used in combination with beta-lactam for severe CAP, not as monotherapy\n  - Drug interactions with multiple medications through CYP3A4 inhibition\n\n• Option D (Levofloxacin 500mg once daily) - Excessive Broad-Spectrum Coverage: \n  - Fluoroquinolone therapy reserved for treatment failure or specific clinical indications\n  - NICE guidelines emphasize preservation of fluoroquinolones for resistant organisms\n  - Associated with increased risk of Clostridioides difficile infection and tendon rupture\n  - Contributes to fluoroquinolone resistance in pneumococci and gram-negative bacteria\n  - More expensive than first-line alternatives without superior efficacy\n  - Should be avoided in uncomplicated CAP to preserve effectiveness\n\n• Option E (Doxycycline loading dose regimen) - Suboptimal Pneumococcal Activity: \n  - Tetracycline antibiotics demonstrate variable activity against Streptococcus pneumoniae\n  - Pneumococcal resistance to tetracyclines reported in 10-15% of isolates\n  - Primarily indicated for atypical pathogen coverage (Mycoplasma, Chlamydia)\n  - Gastrointestinal side effects and photosensitivity reactions common\n  - Less reliable than beta-lactam antibiotics for typical bacterial pneumonia\n  - Should be considered for atypical pathogen suspected infections or penicillin allergy",
          mnemonic: "Pneumonia Management: AMOX = Always Most Optimal eXcellent choice\n\nPneumonia Severity (CURB-65): CURB = Confusion, Urea >7mmol/L, Respiratory rate ≥30, Blood pressure <90/60, Age ≥65\n\nPneumonia Organisms: CHAMPS = Chlamydia, Haemophilus, Atypicals (Mycoplasma), Moraxella, Pneumococcus, Staph aureus\n\nAtypical Pneumonia: CLAM = Chlamydia, Legionella, Atypicals, Mycoplasma",
          guidelineSummary: {
            title: "Community-Acquired Pneumonia Management Summary",
            content: "• Clinical Assessment: \n  - CURB-65 score guides severity assessment and management location\n  - Score 0-1: home treatment, 2: consider hospital, 3-5: hospital admission\n  - Symptoms include fever, cough, dyspnea, chest pain, sputum production\n\n• First-Line Antibiotic Therapy: \n  - Amoxicillin 500mg TDS for 5 days in previously healthy adults\n  - Co-amoxiclav if risk factors for resistance or structural lung disease\n  - Add clarithromycin if atypical pathogens suspected\n\n• Severe CAP Management: \n  - Combination therapy: co-amoxiclav plus clarithromycin\n  - Consider levofloxacin monotherapy in selected cases\n  - ICU admission if CURB-65 ≥4 or clinical deterioration\n\n• Special Considerations: \n  - Penicillin allergy: clarithromycin, doxycycline, or levofloxacin\n  - Suspected aspiration: co-amoxiclav or clindamycin\n  - Recent hospitalization: consider broader spectrum coverage\n\n• Treatment Duration: \n  - 5 days standard for uncomplicated CAP\n  - Extend to 7-10 days if slow clinical response\n  - Clinical improvement expected within 48-72 hours\n\n• Follow-up and Safety Netting: \n  - Chest X-ray if no improvement at 6 weeks\n  - Return if worsening symptoms or new concerning features\n  - Consider complications: empyema, lung abscess, sepsis"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg191",
              description: "NICE CG191: Pneumonia in adults - diagnosis and management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ng138",
                description: "Antimicrobial prescribing for respiratory tract infections"
              },
              {
                title: "NHS Respiratory Guidance",
                url: "https://www.nhs.uk/conditions/pneumonia/",
                description: "NHS guidance on pneumonia treatment and management"
              },
              {
                title: "British Thoracic Society",
                url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/",
                description: "BTS guidelines for respiratory medicine"
              },
              {
                title: "PHE Respiratory Guidelines",
                url: "https://www.gov.uk/government/collections/respiratory-diseases-guidance-data-and-analysis",
                description: "Public Health England respiratory infection guidance"
              }
            ]
          }
        },
        {
          id: "q5",
          topic: "Hypertension Management",
          question: "A 65-year-old Afro-Caribbean woman presents for routine blood pressure monitoring. Her readings over 3 visits are: 165/95, 158/92, and 162/90 mmHg. She has no other cardiovascular risk factors, normal renal function (eGFR 78), and no contraindications to medications. What is the most appropriate first-line antihypertensive treatment?",
          options: {
            A: "Amlodipine 5mg once daily",
            B: "Ramipril 2.5mg once daily",
            C: "Bendroflumethiazide 2.5mg once daily",
            D: "Atenolol 50mg once daily",
            E: "Losartan 50mg once daily"
          },
          answer: "A",
          explanation: "Why Amlodipine 5mg once daily is correct:\n\n• NICE NG136 Evidence-Based Ethnic-Specific Recommendations: \n  - Calcium channel blockers represent first-line therapy for hypertension in patients of African or Caribbean family origin\n  - Based on extensive clinical trial evidence demonstrating superior efficacy compared to ACE inhibitors in this population\n  - ALLHAT trial and subsequent meta-analyses confirm optimal cardiovascular outcomes with calcium channel blockers in Black patients\n  - Addresses genetic polymorphisms affecting renin-angiotensin system responsiveness in Afro-Caribbean populations\n\n• Superior Antihypertensive Efficacy in Target Population: \n  - Achieves greater blood pressure reduction (15-20 mmHg systolic) compared to ACE inhibitors in Afro-Caribbean patients\n  - Addresses low-renin hypertension phenotype common in patients of African ancestry\n  - Overcomes genetic variations in ACE gene polymorphisms that reduce ACE inhibitor effectiveness\n  - Provides consistent 24-hour blood pressure control with once-daily dosing\n\n• Optimal Cardiovascular Protection Profile: \n  - Reduces stroke risk by 35-40% in clinical trials involving predominantly Black populations\n  - Significant reduction in coronary events and heart failure hospitalizations\n  - Excellent end-organ protection including renal and retinal benefits\n  - Neutral effects on glucose metabolism and lipid profiles\n\n• Comprehensive Mechanism of Action: \n  - Blocks L-type calcium channels in vascular smooth muscle causing direct vasodilation\n  - Reduces peripheral vascular resistance without significantly affecting cardiac contractility\n  - Long half-life (35-50 hours) provides sustained antihypertensive effect\n  - Minimal reflex tachycardia compared to immediate-release calcium channel blockers\n\n• Excellent Tolerability and Safety: \n  - Well-tolerated with predictable side effect profile\n  - Ankle edema occurs in 10-15% of patients but rarely requires discontinuation\n  - No significant drug interactions with common medications\n  - Safe in patients with diabetes, chronic kidney disease, and coronary artery disease\n\n• Cost-Effectiveness and Accessibility: \n  - Generic formulations widely available reducing healthcare costs\n  - Once-daily dosing improves medication adherence\n  - Established safety profile with decades of clinical experience\n  - Suitable for long-term management with proven cardiovascular benefits",
          incorrectExplanation: "• Option B (Ramipril 2.5mg once daily) - Suboptimal for Afro-Caribbean Patients: \n  - ACE inhibitors demonstrate reduced efficacy in patients of African or Caribbean family origin\n  - NICE NG136 specifically recommends ACE inhibitors as second-line therapy in this population\n  - Genetic polymorphisms in ACE and angiotensinogen genes reduce therapeutic response\n  - Higher rates of angioedema (0.1-0.7%) in Black patients compared to other ethnicities\n  - Should be considered as add-on therapy rather than initial monotherapy\n  - Less effective at preventing stroke, the most common cardiovascular complication in this population\n\n• Option C (Bendroflumethiazide 2.5mg once daily) - Second-Line Diuretic Choice: \n  - Thiazide-like diuretics effective but not preferred first-line in current NICE guidelines\n  - May cause electrolyte disturbances requiring monitoring (hyponatremia, hypokalemia)\n  - Potential adverse effects on glucose tolerance and lipid profiles\n  - Less convenient dosing schedule compared to modern antihypertensives\n  - Associated with higher rates of erectile dysfunction in men\n  - Reserved for combination therapy or specific clinical indications\n\n• Option D (Atenolol 50mg once daily) - Inappropriate Beta-Blocker Selection: \n  - Beta-blockers not recommended as first-line therapy for uncomplicated hypertension\n  - NICE guidelines restrict beta-blockers to specific indications (heart failure, post-MI, arrhythmias)\n  - Associated with increased stroke risk compared to other antihypertensive classes\n  - May mask hypoglycemic symptoms in diabetic patients\n  - Potential for withdrawal syndrome if discontinued abruptly\n  - Less effective at preventing cardiovascular events in elderly patients\n\n• Option E (Losartan 50mg once daily) - Similar Limitations to ACE Inhibitors: \n  - Angiotensin receptor blockers share similar efficacy limitations in Afro-Caribbean populations\n  - Target the same renin-angiotensin pathway with reduced activity in low-renin hypertension\n  - More expensive than calcium channel blockers without superior efficacy in this population\n  - Should be considered for patients intolerant of ACE inhibitors\n  - Better tolerated than ACE inhibitors but still second-line choice per NICE guidance\n  - Useful in combination therapy but not optimal as initial monotherapy",
          mnemonic: "Hypertension Management: CCB = Calcium Channel Blocker for Caribbean/Black patients\n\nHypertension Causes: RENAL CHAMP = Renal disease, Endocrine (Conn's, Cushing's, Phaeochromocytoma), Neurogenic, Aortic coarctation, Liquorice, Contraceptive pill, Hyperaldosteronism, Age, Male, Pregnancy\n\nMalignant Hypertension: FRESH = Fundal changes (papilloedema), Renal failure, Encephalopathy, Stroke, Heart failure\n\nACE Inhibitor Side Effects: CHASM = Cough, Hyperkalaemia, Angioedema, Syncope, Metallic taste",
          guidelineSummary: {
            title: "Hypertension Management Summary",
            content: "• Definition & Diagnosis: \n  - Persistent blood pressure ≥140/90 mmHg confirmed by ambulatory or home monitoring\n  - Stage 1: 140-159/90-99 mmHg, Stage 2: 160-179/100-109 mmHg, Stage 3: ≥180/110 mmHg\n  - Consider white coat hypertension if clinic BP elevated but ambulatory/home BP normal\n\n• Ethnic-Specific First-Line Treatment: \n  - Afro-Caribbean patients: Calcium channel blocker (amlodipine 5mg) or thiazide-like diuretic\n  - Other ethnicities <55 years: ACE inhibitor or ARB\n  - All patients ≥55 years: Calcium channel blocker or thiazide-like diuretic\n\n• Treatment Targets: \n  - <80 years: <140/90 mmHg (or <135/85 home/ambulatory)\n  - ≥80 years: <150/90 mmHg\n  - Diabetes/CKD: <130/80 mmHg\n\n• Combination Therapy: \n  - Step 2: Add ACE inhibitor/ARB to CCB/diuretic or vice versa\n  - Step 3: Triple therapy (ACE inhibitor + CCB + diuretic)\n  - Step 4: Add spironolactone or alpha/beta blocker\n\n• Lifestyle Modifications: \n  - Weight reduction, dietary sodium restriction (<6g/day)\n  - Regular exercise (150 minutes moderate activity/week)\n  - Alcohol moderation, smoking cessation\n\n• Monitoring and Follow-up: \n  - Annual review once controlled\n  - Monitor renal function and electrolytes\n  - Assess cardiovascular risk factors and end-organ damage"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/ng136",
              description: "NICE NG136: Hypertension in adults - diagnosis and management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/cg127",
                description: "Hypertension in pregnancy - diagnosis and management"
              },
              {
                title: "NHS Hypertension Guidance",
                url: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/treatment/",
                description: "NHS hypertension treatment protocols"
              },
              {
                title: "NHS Blood Pressure Guidance",
                url: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/",
                description: "NHS guidance for blood pressure management"
              },
              {
                title: "NHS Stroke Prevention",
                url: "https://www.nhs.uk/conditions/stroke/",
                description: "NHS stroke prevention and risk factor management"
              }
            ]
          }
        },
        {
          id: "q6",
          topic: "Atrial Fibrillation Management",
          question: "A 72-year-old man with newly diagnosed atrial fibrillation presents for anticoagulation assessment. He has a history of hypertension and type 2 diabetes but no previous stroke or bleeding history. His CHA₂DS₂-VASc score is 4. Renal function is normal. What is the most appropriate anticoagulation strategy?",
          options: {
            A: "Apixaban 5mg twice daily",
            B: "Warfarin with target INR 2.0-3.0",
            C: "Aspirin 75mg once daily",
            D: "Rivaroxaban 20mg once daily",
            E: "No anticoagulation, rate control only"
          },
          answer: "A",
          explanation: "Why Apixaban 5mg twice daily is correct:\n\n• NICE CG180 Direct Oral Anticoagulant Preference: \n  - DOACs represent first-line anticoagulation for stroke prevention in atrial fibrillation\n  - Apixaban demonstrates superior efficacy and safety profile compared to warfarin in landmark ARISTOTLE trial\n  - Reduced stroke risk by 21% and major bleeding by 31% compared to warfarin\n  - NICE guidelines recommend DOACs over warfarin for newly diagnosed atrial fibrillation\n\n• Optimal Stroke Prevention Efficacy: \n  - CHA₂DS₂-VASc score of 4 indicates high stroke risk requiring definitive anticoagulation\n  - Annual stroke risk of 8-10% without anticoagulation versus 2-3% with effective treatment\n  - Factor Xa inhibition provides consistent anticoagulant effect without vitamin K dependence\n  - Proven stroke prevention in both paroxysmal and persistent atrial fibrillation\n\n• Superior Safety Profile Compared to Warfarin: \n  - 50% reduction in intracranial hemorrhage risk, the most feared anticoagulation complication\n  - Lower rates of major bleeding requiring hospitalization or transfusion\n  - Reduced gastrointestinal bleeding compared to rivaroxaban and dabigatran\n  - No requirement for routine anticoagulation monitoring\n\n• Practical Clinical Advantages: \n  - Fixed-dose regimen without need for INR monitoring\n  - Minimal food interactions allowing flexible dosing schedule\n  - Fewer drug interactions compared to warfarin's extensive interaction profile\n  - Rapid onset and offset of action beneficial for procedures\n\n• Patient-Centered Benefits: \n  - Improved quality of life through elimination of frequent blood tests\n  - Better treatment adherence due to simplified dosing regimen\n  - Lower healthcare utilization costs despite higher drug acquisition costs\n  - Reduced dietary restrictions compared to warfarin therapy\n\n• Evidence-Based Dosing Strategy: \n  - Standard dose 5mg twice daily appropriate for patients without dose reduction criteria\n  - Dose reduction to 2.5mg twice daily only if ≥2 of: age ≥80, weight ≤60kg, creatinine ≥133 μmol/L\n  - Twice-daily dosing provides consistent anticoagulant effect throughout 24-hour period\n  - Extensive pharmacokinetic studies confirm optimal dosing strategy",
          incorrectExplanation: "• Option B (Warfarin with target INR 2.0-3.0) - Second-Line Vitamin K Antagonist: \n  - NICE CG180 relegates warfarin to second-line choice when DOACs contraindicated or unsuitable\n  - Requires frequent INR monitoring with associated healthcare resource utilization\n  - Time in therapeutic range typically 60-70% even in specialized anticoagulation clinics\n  - Higher intracranial bleeding risk compared to DOACs\n  - Extensive drug and food interactions complicating management\n  - Should be reserved for patients with contraindications to DOACs or mechanical heart valves\n\n• Option C (Aspirin 75mg once daily) - Inadequate Stroke Prevention: \n  - Antiplatelet therapy provides minimal stroke prevention benefit in atrial fibrillation\n  - 20% relative risk reduction compared to 60-70% with effective anticoagulation\n  - NICE guidelines explicitly state aspirin should not be used for stroke prevention in AF\n  - May increase bleeding risk without proportional stroke prevention benefit\n  - Relegates patient to suboptimal treatment with preventable stroke risk\n  - Only indicated for patients with absolute contraindications to anticoagulation\n\n• Option D (Rivaroxaban 20mg once daily) - Acceptable but Less Optimal DOAC: \n  - Factor Xa inhibitor with proven efficacy but higher bleeding rates than apixaban\n  - ROCKET-AF trial showed non-inferiority to warfarin but included higher-risk population\n  - Higher gastrointestinal bleeding rates compared to apixaban in real-world studies\n  - Once-daily dosing may result in end-of-dose anticoagulant effect reduction\n  - Food requirements for optimal absorption may reduce adherence\n  - More expensive than apixaban without superior clinical outcomes\n\n• Option E (No anticoagulation, rate control only) - Unacceptable Stroke Risk: \n  - CHA₂DS₂-VASc score of 4 represents high stroke risk requiring anticoagulation\n  - Withholding anticoagulation results in preventable stroke with devastating consequences\n  - Rate control alone does not address thromboembolic risk in atrial fibrillation\n  - Contradicts all major international guidelines for atrial fibrillation management\n  - Represents substandard care with significant medico-legal implications\n  - Only acceptable if absolute contraindications to all anticoagulant options exist",
          mnemonic: "Atrial Fibrillation: APEX = Apixaban Excels for stroke Prevention\n\nCHADS-VASc Score: CHADS-VASc = Congestive heart failure, Hypertension, Age ≥75 (2 points), Diabetes, Stroke/TIA (2 points), Vascular disease, Age 65-74, Sex (female)\n\nHAS-BLED Score: HAS-BLED = Hypertension, Abnormal liver/kidney function, Stroke history, Bleeding predisposition, Labile INRs, Elderly >65, Drugs/alcohol\n\nAF Complications: HEART = Heart failure, Embolism, Arrhythmia complications, Rate problems, Thrombosis",
          guidelineSummary: {
            title: "Atrial Fibrillation Management Summary",
            content: "• Risk Assessment: \n  - CHA₂DS₂-VASc score for stroke risk: age ≥75 (2 points), stroke/TIA/thromboembolism (2), age 65-74, hypertension, diabetes, heart failure, vascular disease, female sex (1 point each)\n  - HAS-BLED score for bleeding risk assessment\n  - Score ≥2 warrants anticoagulation consideration\n\n• Anticoagulation Strategy: \n  - First-line: DOACs (apixaban, rivaroxaban, edoxaban, dabigatran)\n  - Second-line: Warfarin (target INR 2.0-3.0)\n  - Avoid aspirin for stroke prevention\n\n• DOAC Selection: \n  - Apixaban: lowest bleeding risk, twice daily\n  - Rivaroxaban: once daily, take with food\n  - Edoxaban: once daily, avoid if CrCl >95\n  - Dabigatran: twice daily, higher GI bleeding\n\n• Rate vs Rhythm Control: \n  - Rate control first-line: beta-blockers, calcium channel blockers, digoxin\n  - Target heart rate <110 bpm (lenient control)\n  - Rhythm control for symptomatic patients or heart failure\n\n• Cardioversion Considerations: \n  - Anticoagulate 3 weeks before and 4 weeks after\n  - TOE-guided cardioversion if urgent\n  - Success rates higher within 48 hours of onset\n\n• Follow-up and Monitoring: \n  - Annual review of anticoagulation needs\n  - Monitor renal function for DOAC dosing\n  - Assess bleeding and stroke risk changes"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg180",
              description: "NICE CG180: Atrial fibrillation - diagnosis and management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ta355",
                description: "Apixaban for preventing stroke in atrial fibrillation"
              },
              {
                title: "NHS Anticoagulation Guidance",
                url: "https://www.nhs.uk/conditions/anticoagulants/",
                description: "NHS anticoagulation protocols and guidance"
              },
              {
                title: "ESC AF Guidelines",
                url: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Atrial-Fibrillation-Guidelines",
                description: "European Society of Cardiology atrial fibrillation guidelines"
              },
              {
                title: "NHS Atrial Fibrillation",
                url: "https://www.nhs.uk/conditions/atrial-fibrillation/",
                description: "NHS atrial fibrillation and stroke prevention guidance"
              }
            ]
          }
        },
        {
          id: "q7",
          topic: "Depression Management",
          question: "A 28-year-old woman presents with a 6-week history of persistent low mood, loss of interest in activities, fatigue, and poor concentration affecting her work performance. She has no suicidal ideation, psychotic symptoms, or substance use. PHQ-9 score is 14. What is the most appropriate initial management?",
          options: {
            A: "Sertraline 50mg once daily",
            B: "Cognitive behavioral therapy (CBT) referral",
            C: "Sertraline plus CBT combination",
            D: "Watchful waiting for 2 weeks",
            E: "Mirtazapine 15mg at bedtime"
          },
          answer: "B",
          explanation: "Why Cognitive behavioral therapy (CBT) referral is correct:\n\n• NICE CG90 Evidence-Based First-Line Psychological Therapy: \n  - CBT represents the gold standard first-line treatment for moderate depression in adults\n  - Extensive meta-analyses demonstrate equivalent efficacy to antidepressants for moderate depression\n  - Provides lasting benefits beyond treatment duration, reducing relapse rates by 40-50%\n  - Addresses cognitive distortions and behavioral patterns underlying depressive episodes\n\n• Optimal Treatment for Moderate Depression (PHQ-9: 10-14): \n  - PHQ-9 score of 14 indicates moderate depression severity requiring active intervention\n  - Individual CBT shows superior long-term outcomes compared to medication alone\n  - Develops patient's own coping strategies and problem-solving skills\n  - Addresses psychosocial factors contributing to depression maintenance\n\n• Strong Evidence Base for Effectiveness: \n  - Multiple randomized controlled trials demonstrate 60-70% response rates\n  - Cochrane systematic reviews confirm CBT efficacy for depression across age groups\n  - Structured approach targeting automatic thoughts, cognitive distortions, and behavioral activation\n  - Maintains effectiveness in both individual and group therapy formats\n\n• Absence of Medication Side Effects: \n  - Avoids potential adverse effects of antidepressants including sexual dysfunction, weight gain, and withdrawal symptoms\n  - No drug interactions or contraindications to consider\n  - Suitable for patients planning pregnancy or with medical comorbidities\n  - Eliminates concerns about medication adherence and monitoring\n\n• Cost-Effectiveness and Accessibility: \n  - NICE health economic analyses support CBT as cost-effective intervention\n  - Available through NHS IAPT services with standardized protocols\n  - Computerized CBT options provide accessible alternatives\n  - Long-term cost savings through reduced relapse rates and healthcare utilization\n\n• Skill Development and Empowerment: \n  - Teaches transferable skills for managing future depressive episodes\n  - Enhances patient autonomy and self-efficacy\n  - Addresses workplace difficulties through behavioral activation and problem-solving\n  - Provides structured approach to mood monitoring and relapse prevention",
          incorrectExplanation: "• Option A (Sertraline 50mg once daily) - Premature Pharmacological Intervention: \n  - NICE CG90 recommends psychological therapy as first-line for moderate depression\n  - Antidepressants reserved for severe depression, patient preference, or CBT failure\n  - May cause sexual dysfunction, gastrointestinal effects, and initial anxiety increase\n  - Withdrawal symptoms possible upon discontinuation\n  - Does not address underlying cognitive and behavioral patterns\n  - Should be considered if CBT unavailable or after psychological therapy failure\n\n• Option C (Sertraline plus CBT combination) - Unnecessary Combination: \n  - Combination therapy reserved for severe depression or treatment-resistant cases\n  - No additional benefit over CBT alone for moderate depression\n  - Increases treatment costs without improving outcomes\n  - Adds medication side effects without proportional benefit\n  - NICE guidelines recommend stepwise approach starting with psychological therapy\n  - Combination should be considered only if monotherapy ineffective\n\n• Option D (Watchful waiting for 2 weeks) - Inappropriate Delay: \n  - PHQ-9 score of 14 indicates moderate depression requiring active treatment\n  - Six-week duration suggests persistent depressive episode beyond natural recovery\n  - Functional impairment at work necessitates immediate intervention\n  - Watchful waiting only appropriate for mild depression or recent onset\n  - Delays access to effective treatment potentially worsening outcomes\n  - May result in further functional decline and increased treatment complexity\n\n• Option E (Mirtazapine 15mg at bedtime) - Suboptimal Antidepressant Choice: \n  - Sedating antidepressant with significant weight gain and metabolic effects\n  - Higher discontinuation rates due to side effect profile\n  - Not first-line antidepressant choice per NICE guidelines\n  - More appropriate for depression with insomnia or poor appetite\n  - Psychological therapy remains preferred first-line intervention\n  - Should be reserved for specific clinical indications or SSRI intolerance",
          mnemonic: "CBT = Cognitive Behavioral Therapy first",
          guidelineSummary: {
            title: "Depression Management Summary",
            content: "• Assessment and Diagnosis: \n  - PHQ-9 questionnaire for severity assessment: mild (5-9), moderate (10-14), severe (15-19), very severe (20-27)\n  - Exclude bipolar disorder, psychotic symptoms, substance use\n  - Assess suicide risk and safeguarding needs\n\n• Treatment by Severity: \n  - Mild depression: watchful waiting, guided self-help, group CBT\n  - Moderate depression: individual CBT, counselling, or antidepressant\n  - Severe depression: combination therapy (CBT + antidepressant)\n\n• Psychological Therapies: \n  - CBT most evidence-based, 16-20 sessions over 4-6 months\n  - Interpersonal therapy, counselling, behavioral activation\n  - IAPT services provide stepped care approach\n\n• Antidepressant Selection: \n  - First-line: SSRIs (sertraline, citalopram, fluoxetine)\n  - Second-line: SNRIs, mirtazapine, tricyclics\n  - Start low dose, review at 2 weeks, optimize at 4-6 weeks\n\n• Monitoring and Follow-up: \n  - Review at 2 weeks initially, then monthly\n  - Continue treatment 6 months after remission\n  - Assess side effects, adherence, suicidal ideation\n\n• Relapse Prevention: \n  - Maintain therapy for 6-12 months post-remission\n  - Identify early warning signs and triggers\n  - Lifestyle interventions: exercise, sleep hygiene, social support"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg90",
              description: "NICE CG90: Depression in adults - recognition and management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/cg91",
                description: "Depression in adults with chronic physical health problems"
              },
              {
                title: "NHS Mental Health",
                url: "https://www.nhs.uk/mental-health/conditions/depression-in-adults/",
                description: "NHS mental health treatment protocols"
              },
              {
                title: "NHS IAPT",
                url: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/",
                description: "Improving Access to Psychological Therapies program"
              },
              {
                title: "Royal College of Psychiatrists",
                url: "https://www.rcpsych.ac.uk/mental-health/problems-disorders/depression",
                description: "Professional guidance for depression management"
              }
            ]
          }
        },
        {
          id: "q8",
          topic: "Chronic Obstructive Pulmonary Disease",
          question: "A 68-year-old man with COPD presents with worsening breathlessness and increased sputum production over 4 days. He has had 2 exacerbations in the past year. Chest examination reveals wheeze and reduced air entry bilaterally. Oxygen saturation is 88% on room air. What is the most appropriate initial treatment?",
          options: {
            A: "Prednisolone 30mg daily for 5 days plus antibiotics",
            B: "Increase bronchodilator therapy only",
            C: "Immediate non-invasive ventilation",
            D: "High-flow oxygen to achieve SpO2 94-98%",
            E: "Nebulized bronchodilators alone"
          },
          answer: "A",
          explanation: "Why Prednisolone 30mg daily for 5 days plus antibiotics is correct:\n\n• NICE CG101 Evidence-Based Exacerbation Management: \n  - Combination therapy with corticosteroids and antibiotics represents standard care for COPD exacerbations\n  - Clinical presentation suggests infective exacerbation requiring dual therapy approach\n  - Prednisolone 30mg daily for 5 days reduces hospital admission rates by 25-30%\n  - Antibiotics target bacterial pathogens commonly responsible for COPD exacerbations\n\n• Optimal Corticosteroid Protocol: \n  - Prednisolone 30mg daily proven effective dose for reducing inflammation and improving outcomes\n  - Five-day course minimizes side effects while maintaining therapeutic benefit\n  - Reduces exacerbation duration by 1-2 days and improves lung function recovery\n  - Decreases risk of treatment failure and subsequent hospitalization\n\n• Targeted Antibiotic Therapy: \n  - Increased sputum production indicates bacterial infection requiring antibiotic treatment\n  - Common pathogens include Haemophilus influenzae, Streptococcus pneumoniae, Moraxella catarrhalis\n  - First-line antibiotics: amoxicillin, doxycycline, or clarithromycin based on local resistance patterns\n  - Reduces bacterial load and accelerates clinical recovery\n\n• Comprehensive Anti-Inflammatory Approach: \n  - Addresses both infectious and inflammatory components of COPD exacerbation\n  - Corticosteroids reduce airway inflammation and improve bronchodilator responsiveness\n  - Combination therapy more effective than either treatment alone\n  - Prevents progression to respiratory failure requiring ventilatory support\n\n• Evidence-Based Hospitalization Avoidance: \n  - Early appropriate treatment reduces need for hospital admission\n  - Maintains patient independence and quality of life\n  - Cost-effective approach reducing healthcare resource utilization\n  - Enables home-based recovery with appropriate safety netting\n\n• Established Safety Profile: \n  - Short-course prednisolone well-tolerated with minimal adverse effects\n  - Risk-benefit ratio strongly favors treatment in COPD exacerbations\n  - Monitoring for hyperglycemia in diabetic patients recommended\n  - Appropriate dose and duration minimize systemic side effects",
          incorrectExplanation: "• Option B (Increase bronchodilator therapy only) - Insufficient for Exacerbation: \n  - Bronchodilator optimization alone inadequate for managing COPD exacerbation\n  - Does not address inflammatory component requiring corticosteroid therapy\n  - Fails to treat bacterial infection suggested by increased sputum production\n  - May result in treatment failure and delayed recovery\n  - NICE guidelines emphasize combination therapy for exacerbations\n  - Appropriate as adjunctive therapy but not sole treatment\n\n• Option C (Immediate non-invasive ventilation) - Premature Escalation: \n  - NIV reserved for patients with respiratory acidosis (pH <7.35) or hypercapnic respiratory failure\n  - Oxygen saturation of 88% does not automatically indicate NIV requirement\n  - Should be considered only after medical therapy optimization\n  - Requires specialized monitoring and expertise\n  - May be necessary if medical therapy fails or respiratory acidosis develops\n  - Patient requires trial of medical therapy first\n\n• Option D (High-flow oxygen to achieve SpO2 94-98%) - Inappropriate Target: \n  - COPD patients require controlled oxygen therapy with target SpO2 88-92%\n  - Higher oxygen targets risk carbon dioxide retention and respiratory acidosis\n  - May suppress hypoxic drive in chronic CO2 retainers\n  - Does not address underlying exacerbation requiring anti-inflammatory and antibiotic therapy\n  - Oxygen therapy should be titrated to achieve appropriate saturation levels\n  - Requires concurrent medical treatment for exacerbation\n\n• Option E (Nebulized bronchodilators alone) - Incomplete Treatment: \n  - Addresses bronchospasm component but ignores inflammation and infection\n  - Bronchodilators alone insufficient for managing COPD exacerbation\n  - May provide symptomatic relief but does not alter disease course\n  - Higher risk of treatment failure and hospitalization\n  - Should be used as part of comprehensive exacerbation management\n  - Requires combination with corticosteroids and antibiotics for optimal outcomes",
          mnemonic: "COPD Exacerbation: COPD = Corticosteroids plus Oral antibiotics for Pulmonary Disease\n\nCOPD Causes: ASTHMA = Alpha-1 antitrypsin deficiency, Smoking, Tuberculosis, Hypersensitivity pneumonitis, Manufacturing (occupational), Air pollution\n\nCOPD Exacerbation Triggers: HIVES = Haemophilus influenzae, Infection (viral), Viral, Environmental pollutants, Streptococcus pneumoniae\n\nRespiratory Failure Type 2: STOP = Sleep apnoea, Thoracic wall abnormalities, Opiates, Pneumonia (severe)",
          guidelineSummary: {
            title: "COPD Exacerbation Management Summary",
            content: "• Definition and Recognition: \n  - Acute worsening of respiratory symptoms beyond normal variation\n  - Increased dyspnea, cough, sputum volume/purulence\n  - May include systemic symptoms: fever, malaise, reduced exercise tolerance\n\n• Severity Assessment: \n  - Mild: managed at home with bronchodilator increase\n  - Moderate: requires corticosteroids ± antibiotics\n  - Severe: may need hospital admission, oxygen, NIV\n\n• Pharmacological Treatment: \n  - Corticosteroids: prednisolone 30mg daily for 5 days\n  - Antibiotics if purulent sputum: amoxicillin, doxycycline, clarithromycin\n  - Bronchodilators: increase frequency, consider nebulized therapy\n\n• Oxygen Therapy: \n  - Target SpO2 88-92% in COPD patients\n  - Controlled oxygen delivery to avoid CO2 retention\n  - Monitor for hypercapnic respiratory failure\n\n• Indications for Hospital Admission: \n  - Severe breathlessness, cyanosis, peripheral edema\n  - Impaired consciousness, acute confusion\n  - Oxygen saturation <90% despite controlled oxygen\n  - Social circumstances preventing home management\n\n• Non-Invasive Ventilation: \n  - Indicated for respiratory acidosis (pH 7.25-7.35)\n  - Hypercapnic respiratory failure despite medical therapy\n  - Reduces intubation rates and mortality\n\n• Discharge Planning: \n  - Ensure adequate bronchodilator therapy\n  - Complete antibiotic course, steroid weaning if required\n  - Follow-up within 2-4 weeks"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg101",
              description: "NICE CG101: Chronic obstructive pulmonary disease - management"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ng114",
                description: "Chronic obstructive pulmonary disease in over 16s"
              },
              {
                title: "NHS COPD Guidance",
                url: "https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/",
                description: "NHS COPD treatment protocols"
              },
              {
                title: "British Thoracic Society",
                url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/copd/",
                description: "BTS guidelines for COPD management"
              },
              {
                title: "GOLD Guidelines",
                url: "https://goldcopd.org/2024-gold-report/",
                description: "Global Initiative for Chronic Obstructive Lung Disease"
              }
            ]
          }
        },
        {
          id: "q9",
          topic: "Gastroesophageal Reflux Disease",
          question: "A 42-year-old woman presents with a 3-month history of heartburn and regurgitation occurring 3-4 times per week, particularly after meals and when lying down. She has no alarm symptoms. Lifestyle modifications have provided minimal relief. What is the most appropriate next management step?",
          options: {
            A: "Proton pump inhibitor therapy for 4-8 weeks",
            B: "H2 receptor antagonist therapy",
            C: "Urgent upper endoscopy",
            D: "Helicobacter pylori testing",
            E: "Antacid therapy only"
          },
          answer: "A",
          explanation: "Why Proton pump inhibitor therapy for 4-8 weeks is correct:\n\n• NICE CG184 First-Line Acid Suppression Therapy: \n  - PPIs represent the most effective first-line treatment for GERD symptoms\n  - Superior acid suppression compared to H2 receptor antagonists and antacids\n  - Omeprazole 20mg, lansoprazole 30mg, or equivalent provide optimal symptom control\n  - Evidence-based duration of 4-8 weeks allows adequate therapeutic trial\n\n• Superior Efficacy for Symptom Control: \n  - Clinical trials demonstrate 70-85% symptom improvement with PPI therapy\n  - More effective than H2 receptor antagonists for healing esophagitis and symptom relief\n  - Provides rapid onset of action with significant improvement within 2-3 days\n  - Maintains consistent acid suppression throughout 24-hour period\n\n• Optimal Pharmacological Mechanism: \n  - Irreversible inhibition of gastric H+/K+-ATPase (proton pump)\n  - Achieves profound acid suppression with gastric pH >4 for 12-16 hours daily\n  - Blocks acid secretion regardless of stimulatory pathway (histamine, gastrin, acetylcholine)\n  - Long duration of action due to covalent binding to proton pump\n\n• Evidence-Based Treatment Duration: \n  - 4-8 week course provides adequate time for esophageal healing\n  - Allows assessment of symptom response before considering step-up therapy\n  - Balances therapeutic efficacy with cost-effectiveness\n  - Permits evaluation of underlying GERD severity\n\n• Appropriate for Uncomplicated GERD: \n  - Absence of alarm symptoms allows empirical PPI therapy\n  - Avoids unnecessary endoscopic investigation in typical GERD presentation\n  - Cost-effective approach for symptom-based diagnosis\n  - Therapeutic response supports GERD diagnosis\n\n• Established Safety Profile: \n  - Generally well-tolerated with minimal adverse effects\n  - Short-term use associated with low risk of complications\n  - Interactions primarily with clopidogrel and warfarin requiring monitoring\n  - Appropriate for most patients without contraindications",
          incorrectExplanation: "• Option B (H2 receptor antagonist therapy) - Less Effective Acid Suppression: \n  - H2 antagonists provide inferior symptom control compared to PPIs\n  - Ranitidine and famotidine achieve less profound acid suppression\n  - Development of tolerance with reduced efficacy over time\n  - NICE guidelines recommend PPIs as first-line therapy\n  - May be appropriate for mild symptoms or PPI intolerance\n  - Results in suboptimal symptom control and patient satisfaction\n\n• Option C (Urgent upper endoscopy) - Inappropriate for Uncomplicated GERD: \n  - Endoscopy reserved for patients with alarm symptoms or treatment failure\n  - Alarm symptoms include dysphagia, weight loss, anemia, persistent vomiting\n  - Cost-ineffective approach for typical GERD presentation\n  - Empirical PPI therapy more appropriate initial strategy\n  - Endoscopy should be considered after PPI failure or symptom progression\n  - Invasive procedure with associated risks and patient discomfort\n\n• Option D (Helicobacter pylori testing) - Irrelevant for GERD Management: \n  - H. pylori testing not indicated for typical GERD symptoms\n  - May be appropriate for dyspepsia or peptic ulcer disease\n  - Does not address acid reflux pathophysiology\n  - Delays appropriate anti-reflux therapy\n  - Test-and-treat strategy reserved for uninvestigated dyspepsia in specific populations\n  - Not recommended in NICE guidelines for GERD management\n\n• Option E (Antacid therapy only) - Inadequate for Persistent Symptoms: \n  - Antacids provide temporary symptomatic relief but do not address underlying acid production\n  - Insufficient for managing frequent symptoms occurring 3-4 times weekly\n  - Short duration of action requiring frequent dosing\n  - Does not prevent esophageal damage from ongoing acid exposure\n  - Appropriate for occasional symptoms but inadequate for chronic GERD\n  - Lifestyle modifications plus antacids have already failed to provide adequate relief",
          mnemonic: "GERD Management: PPI = Powerful Proton Pump Inhibition\n\nGERD Risk Factors: CLOTHES = Coffee, Lying down after meals, Obesity, Tomatoes, Hiatus hernia, Eating large meals, Smoking\n\nAlarm Symptoms: VOMITS = Vomiting, Odynophagia, Mass, Iron deficiency anaemia, Telltale weight loss, Swallowing difficulty\n\nPPI Side Effects: MAGIC = Magnesium deficiency, Absorption problems (B12, iron), GI infections (C.diff), Interactions (clopidogrel), Carcinoid tumours (long-term)",
          guidelineSummary: {
            title: "GERD Management Summary",
            content: "• Definition and Symptoms: \n  - Gastroesophageal reflux disease with typical symptoms: heartburn, regurgitation\n  - Atypical symptoms: chest pain, chronic cough, hoarseness, dental erosion\n  - Diagnosis primarily symptom-based in absence of alarm features\n\n• Lifestyle Modifications: \n  - Weight loss, smoking cessation, alcohol reduction\n  - Avoid trigger foods (spicy, fatty, acidic, caffeine)\n  - Elevate head of bed, avoid late meals\n  - Smaller, more frequent meals\n\n• Pharmacological Treatment: \n  - First-line: PPI therapy (omeprazole 20mg, lansoprazole 30mg) for 4-8 weeks\n  - Second-line: H2 receptor antagonists or antacids\n  - Long-term PPI therapy if symptoms recur\n\n• Alarm Symptoms Requiring Endoscopy: \n  - Dysphagia, odynophagia, weight loss\n  - Gastrointestinal bleeding, iron deficiency anemia\n  - Persistent vomiting, family history of upper GI cancer\n  - Age >55 with new-onset symptoms\n\n• Complications: \n  - Erosive esophagitis, peptic stricture\n  - Barrett's esophagus, adenocarcinoma risk\n  - Respiratory complications from aspiration\n\n• Management of Refractory Symptoms: \n  - Optimize PPI therapy (timing, dose, compliance)\n  - Consider twice-daily dosing\n  - Alternative PPI if inadequate response\n  - Investigate for other causes or complications"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg184",
              description: "NICE CG184: Gastro-oesophageal reflux disease and dyspepsia"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/cg27",
                description: "Barrett's oesophagus and stage 1 oesophageal adenocarcinoma"
              },
              {
                title: "NHS Gastroenterology",
                url: "https://www.nhs.uk/conditions/heartburn-and-acid-reflux/",
                description: "NHS gastrointestinal treatment protocols"
              },
              {
                title: "BSG Guidelines",
                url: "https://www.bsg.org.uk/clinical-guidance/",
                description: "British Society of Gastroenterology clinical guidance"
              },
              {
                title: "RCGP Guidance",
                url: "https://www.rcgp.org.uk/clinical-and-research/resources/toolkits",
                description: "Royal College of General Practitioners clinical resources"
              }
            ]
          }
        },
        {
          id: "q10",
          topic: "Osteoporosis Prevention",
          question: "A 65-year-old postmenopausal woman presents for fracture risk assessment. She has a history of early menopause at age 48 and her mother had a hip fracture at age 70. She is otherwise healthy with no current medications. FRAX score indicates 10-year major osteoporotic fracture risk of 15%. What is the most appropriate management?",
          options: {
            A: "Alendronate 70mg weekly plus calcium and vitamin D",
            B: "Calcium and vitamin D supplementation only",
            C: "DEXA scan before treatment decision",
            D: "Lifestyle advice only",
            E: "Hormone replacement therapy"
          },
          answer: "A",
          explanation: "Why Alendronate 70mg weekly plus calcium and vitamin D is correct:\n\n• NICE CG146 Evidence-Based Fracture Prevention: \n  - FRAX score of 15% exceeds treatment threshold of 10% for major osteoporotic fractures\n  - Alendronate represents first-line bisphosphonate therapy for osteoporosis prevention\n  - Combination with calcium and vitamin D optimizes bone mineral density improvement\n  - Reduces vertebral fracture risk by 40-50% and hip fracture risk by 30-40%\n\n• Optimal Bisphosphonate Selection: \n  - Alendronate has most extensive evidence base for fracture prevention\n  - Weekly dosing (70mg) improves compliance compared to daily regimens\n  - Superior gastrointestinal tolerability compared to daily formulations\n  - Generic availability ensures cost-effectiveness\n\n• Comprehensive Bone Health Optimization: \n  - Calcium supplementation (1000-1200mg daily) supports bone mineralization\n  - Vitamin D (800-1000 IU daily) enhances calcium absorption and reduces falls\n  - Combination therapy more effective than bisphosphonate alone\n  - Addresses multiple pathways of bone metabolism\n\n• Strong Evidence for Fracture Risk Reduction: \n  - Fracture Intervention Trial demonstrated significant vertebral and hip fracture reduction\n  - Real-world studies confirm effectiveness across diverse populations\n  - Number needed to treat: 100 patients for 3 years to prevent one hip fracture\n  - Maintains bone density improvements with continued therapy\n\n• Appropriate for High-Risk Patient Profile: \n  - Early menopause increases fracture risk through prolonged estrogen deficiency\n  - Maternal hip fracture indicates genetic predisposition\n  - Age 65 represents optimal time for intervention initiation\n  - FRAX score accurately predicts fracture probability\n\n• Established Safety and Monitoring: \n  - Generally well-tolerated with proper administration instructions\n  - Rare serious adverse events (osteonecrosis jaw, atypical fractures) with long-term use\n  - Requires adequate calcium and vitamin D status\n  - Annual review of efficacy and safety",
          incorrectExplanation: "• Option B (Calcium and vitamin D supplementation only) - Insufficient Fracture Prevention: \n  - Nutritional supplementation alone inadequate for high fracture risk (FRAX 15%)\n  - Calcium and vitamin D provide modest bone density benefits without anti-resorptive therapy\n  - Meta-analyses show minimal fracture reduction with supplementation alone\n  - Does not address accelerated bone loss in postmenopausal women\n  - Appropriate as adjunctive therapy but not monotherapy\n  - Undertreatment given established fracture risk requiring bisphosphonate therapy\n\n• Option C (DEXA scan before treatment decision) - Unnecessary Delay: \n  - FRAX score already incorporates bone density estimation\n  - Treatment indicated based on fracture risk assessment without DEXA requirement\n  - NICE guidelines support treatment based on clinical risk factors\n  - DEXA scanning adds cost and delays appropriate therapy\n  - May be useful for monitoring treatment response\n  - Clinical risk assessment sufficient for treatment initiation\n\n• Option D (Lifestyle advice only) - Inadequate for High Fracture Risk: \n  - Lifestyle modifications important but insufficient for FRAX score 15%\n  - Exercise and smoking cessation provide modest fracture risk reduction\n  - Weight-bearing exercise improves bone density by 1-2% annually\n  - Does not address underlying pathophysiology of postmenopausal bone loss\n  - Appropriate as adjunctive measure but not primary intervention\n  - Contradicts evidence-based guidelines for fracture prevention\n\n• Option E (Hormone replacement therapy) - Inappropriate Risk-Benefit Profile: \n  - HRT carries increased risks of breast cancer, stroke, and venous thromboembolism\n  - Not recommended as first-line therapy for osteoporosis prevention\n  - Bisphosphonates provide superior fracture prevention with better safety profile\n  - Women's Health Initiative demonstrated unfavorable risk-benefit ratio\n  - May be considered for younger postmenopausal women with severe symptoms\n  - Requires careful individual risk assessment before consideration",
          mnemonic: "Osteoporosis Management: ALEX = Alendronate EXcellent for osteoporosis\n\nOsteoporosis Risk Factors: SHATTERED = Steroids, Hyperthyroidism/Hyperparathyroidism, Alcohol/Smoking, Thin (low BMI), Testosterone low, Early menopause, Renal/liver disease, Erosive/inflammatory bone disease, Dietary calcium low\n\nFracture Risk Assessment: FRAX = Fracture Risk Assessment eXamination tool\n\nBisphosphonate Side Effects: JEAN = Jaw osteonecrosis, Esophageal irritation, Atypical fractures, Nephrotoxicity",
          guidelineSummary: {
            title: "Osteoporosis Prevention Summary",
            content: "• Risk Assessment: \n  - FRAX tool estimates 10-year fracture probability\n  - Major risk factors: age, sex, previous fracture, parental hip fracture\n  - Secondary causes: steroids, rheumatoid arthritis, alcohol excess\n  - Treatment threshold: 10% major osteoporotic fracture risk\n\n• First-Line Pharmacotherapy: \n  - Alendronate 70mg weekly (or 10mg daily)\n  - Risedronate 35mg weekly alternative\n  - Calcium 1000-1200mg and vitamin D 800-1000 IU daily\n  - Take on empty stomach, remain upright 30 minutes\n\n• Lifestyle Modifications: \n  - Weight-bearing exercise, resistance training\n  - Smoking cessation, moderate alcohol consumption\n  - Adequate calcium intake (dairy, leafy greens)\n  - Fall prevention strategies\n\n• Monitoring and Duration: \n  - Annual review of adherence, side effects, fractures\n  - Consider treatment holiday after 5 years alendronate\n  - DEXA scan every 2-3 years if available\n  - Maintain calcium and vitamin D throughout\n\n• Second-Line Treatments: \n  - Denosumab 60mg 6-monthly injection\n  - Zoledronic acid 5mg annually\n  - Teriparatide for severe osteoporosis\n  - Raloxifene in selected postmenopausal women\n\n• Special Considerations: \n  - Contraindications: esophageal disorders, hypocalcemia\n  - Renal impairment: avoid if eGFR <35\n  - Dental procedures: inform dentist of bisphosphonate use"
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg146",
              description: "NICE CG146: Osteoporosis - assessing the risk of fragility fracture"
            },
            supplementary: [
              {
                title: "NICE Guidance",
                url: "https://www.nice.org.uk/guidance/ta464",
                description: "Bisphosphonates for treating osteoporosis"
              },
              {
                title: "NHS Osteoporosis Guidance",
                url: "https://www.nhs.uk/conditions/osteoporosis/",
                description: "NHS bone health and osteoporosis guidance"
              },
              {
                title: "Royal Osteoporosis Society",
                url: "https://theros.org.uk/healthcare-professionals/",
                description: "Professional guidance for osteoporosis management"
              },
              {
                title: "NOGG Guidelines",
                url: "https://www.nogg.org.uk/",
                description: "National Osteoporosis Guideline Group recommendations"
              }
            ]
          }
        },
        {
          id: "q11",
          topic: "Familial Hypercholesterolaemia",
          question: "A 33-year-old woman with familial hypercholesterolaemia is planning pregnancy. She is currently on atorvastatin 80 mg. What is the most appropriate advice?",
          options: {
            A: "Switch to atorvastatin 10mg",
            B: "Continue current dose",
            C: "Stop atorvastatin before trying to conceive",
            D: "Switch to ezetimibe",
            E: "Switch to simvastatin 40mg"
          },
          answer: "C",
          explanation: "Stopping atorvastatin before trying to conceive represents the evidence-based standard of care for women with familial hypercholesterolaemia planning pregnancy, as comprehensively outlined in current UK clinical guidelines. All HMG-CoA reductase inhibitors (statins) are classified as pregnancy category X medications due to demonstrated teratogenic potential in animal studies and case reports of birth defects in humans. The mechanism involves interference with cholesterol biosynthesis, which is crucial for normal fetal development, particularly affecting neural tube formation and limb development. NICE guidelines specifically recommend discontinuation at least three months before planned conception to ensure complete drug clearance and metabolite elimination. This timeframe accounts for atorvastatin's elimination half-life and allows for one complete ovarian cycle before conception attempts. While temporary statin cessation may result in elevated cholesterol levels, the cardiovascular risk during pregnancy remains relatively low in young women, even those with familial hypercholesterolaemia. Alternative lipid management strategies during pregnancy include dietary modification, bile acid sequestrants (which have minimal systemic absorption), and careful monitoring. The decision prioritizes fetal safety while acknowledging that short-term lipid elevation poses minimal maternal risk compared to potential teratogenic effects. Post-delivery, statin therapy can be safely resumed, though breastfeeding considerations require evaluation of individual circumstances and alternative lipid-lowering strategies may be preferred during lactation.",
          mnemonic: "Pregnancy & Statins: STATIN = Stop Three months Ahead To Inhibit Neonatal risk\n\nFamilial Hypercholesterolemia: FAMILY = Familial history, Atherosclerosis early, Male relatives <55, Increased LDL >4.9, Lady relatives <65, Yellow xanthomas\n\nStatin Side Effects: MEMORY = Myopathy, Elevated liver enzymes, Memory problems, Outcome diabetes risk, Rhabdomyolysis, Yellow skin (rare)\n\nPregnancy Drug Categories: ABCDX = A (safe), B (probably safe), C (caution), D (dangerous), X (contraindicated)",
          guidelineSummary: {
            title: "Familial Hypercholesterolaemia & Pregnancy Management Summary",
            content: "• **Definition & Recognition**: FH affects 1:250 individuals, characterized by LDL-C >4.9mmol/L, tendon xanthomata, family history of premature CHD. Use Dutch Lipid Clinic Network criteria for diagnosis. Early identification crucial for cardiovascular risk reduction.\n\n• **Pre-conception Planning**: Discontinue all statins ≥3 months before planned conception due to teratogenic risk (Category X). Atorvastatin has 14-hour half-life; clearance requires multiple elimination cycles. Consider switching to bile acid sequestrants if lipid control essential.\n\n• **Pregnancy Management**: Monitor lipid levels but avoid aggressive treatment. Physiological cholesterol increase occurs normally in pregnancy. Focus on dietary modification, omega-3 supplementation, and cardiovascular risk factor optimization (BP, diabetes screening).\n\n• **Alternative Therapies**: Ezetimibe contraindicated (limited safety data). Bile acid sequestrants (cholestyramine/colesevelam) considered safer due to minimal systemic absorption, though may affect fat-soluble vitamin absorption requiring supplementation.\n\n• **Postpartum Care**: Resume statin therapy post-delivery if not breastfeeding. If breastfeeding planned, continue dietary measures and consider specialist lipid clinic referral for complex cases requiring alternative strategies.\n\n• **Family Screening**: Cascade screening essential - test first-degree relatives. Genetic counseling recommended for reproductive planning. Children of affected parents have 50% inheritance risk.\n\n• **Long-term Monitoring**: Annual cardiovascular risk assessment, imaging for atherosclerosis progression, and optimization of other modifiable risk factors throughout reproductive years."
          },
          links: {
            primary: {
              title: "UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg181",
              description: "NICE CG181: Familial hypercholesterolaemia - identification and management"
            },
            supplementary: [
              {
                title: "CKS FH Management",
                url: "https://cks.nice.org.uk/topics/familial-hypercholesterolaemia/",
                description: "Clinical Knowledge Summaries - comprehensive FH guidance"
              },
              {
                title: "ESC Dyslipidaemia Guidelines",
                url: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/ESC-EAS-Guidelines-for-the-management-of-dyslipidaemias",
                description: "European Society of Cardiology - lipid management protocols"
              },
              {
                title: "RCOG Pregnancy Guidelines",
                url: "https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/",
                description: "Royal College of Obstetricians - pregnancy and medication guidance"
              },
              {
                title: "BCS Lipid Guidelines",
                url: "https://www.britishcardiovascularsociety.org/resources/guidelines",
                description: "British Cardiovascular Society - specialist lipid management"
              }
            ]
          }
        },
        {
          id: "q7",
          category: "Cardiovascular",
          topic: "Hypertension Management in Adults >55",
          question: "A 58-year-old man is diagnosed with stage 1 hypertension (BP 148/96 mmHg). He has no diabetes, and his QRISK3 score is 12%. What is the most appropriate first-line antihypertensive therapy?",
          options: {
            A: "ACE inhibitor",
            B: "Beta-blocker",
            C: "Calcium-channel blocker",
            D: "Thiazide diuretic",
            E: "Alpha-blocker"
          },
          answer: "C",
          explanation: {
            A: "Incorrect. ACE inhibitors are first-line for patients under 55 or those with diabetes.",
            B: "Incorrect. Beta-blockers are not recommended first-line unless another indication exists.",
            C: "Correct. NICE recommends a calcium-channel blocker first-line in people over 55 years old or of Black African or Caribbean descent.",
            D: "Incorrect. Thiazides are used second-line if CCBs are not tolerated.",
            E: "Incorrect. Alpha-blockers are typically fourth-line options."
          },
          mnemonic: "ABC for BP: ACE if <55, Black/old → CCB",
          links: {
            NICE: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#choosing-antihypertensive-drug-treatment",
            CKS: "https://cks.nice.org.uk/topics/hypertension/management/initial-treatment/",
            BNF: "https://bnf.nice.org.uk/treatment-summary/hypertension/"
          }
        },
        {
          id: "q8",
          category: "Cardiovascular",
          topic: "Atrial Fibrillation – Anticoagulation",
          question: "A 75-year-old man with newly diagnosed atrial fibrillation has a CHA2DS2-VASc score of 3. He has no contraindications to anticoagulation. What is the most appropriate next step?",
          options: {
            A: "Start aspirin 75 mg",
            B: "Start warfarin and target INR 2-3",
            C: "Start apixaban 5 mg twice daily",
            D: "Cardioversion",
            E: "No treatment required"
          },
          answer: "C",
          explanation: {
            A: "Incorrect. Aspirin is no longer recommended for stroke prevention in AF.",
            B: "Incorrect. Warfarin is acceptable but DOACs are preferred unless contraindicated.",
            C: "Correct. NICE recommends a DOAC (e.g., apixaban) for stroke prevention in eligible AF patients with CHA2DS2-VASc ≥2.",
            D: "Incorrect. Cardioversion may be considered but stroke risk must be managed first.",
            E: "Incorrect. Stroke risk is high and must be addressed with anticoagulation."
          },
          mnemonic: "CHAD VASc ≥2? → Anticoagulate with DOAC",
          links: {
            NICE: "https://www.nice.org.uk/guidance/ng196/chapter/Recommendations#stroke-risk-assessment-and-antithrombotic-therapy",
            CKS: "https://cks.nice.org.uk/topics/atrial-fibrillation/management/oral-anticoagulation/",
            BNF: "https://bnf.nice.org.uk/drug/apixaban.html"
          }
        }
      ];

      const { questionId } = req.query;
      
      if (questionId) {
        const question = testQuestions.find(q => q.id === questionId);
        if (!question) {
          return res.status(404).json({ error: "Question not found" });
        }
        return res.json(question);
      }

      // Return the actual questions
      // Apply category filtering
      let filteredQuestions = testQuestions;
      
      if (category && category !== 'all') {
        filteredQuestions = testQuestions.filter(q => {
          const questionCategory = q.category?.toLowerCase() || q.topic?.toLowerCase() || '';
          const requestedCategory = (category as string).toLowerCase();
          
          // Handle different category matching patterns
          if (requestedCategory === 'dermatology') {
            return questionCategory.includes('dermatology') || questionCategory.includes('skin') || questionCategory.includes('rash');
          }
          if (requestedCategory === 'cardiovascular') {
            return questionCategory.includes('cardiovascular') || questionCategory.includes('cardio') || questionCategory.includes('heart');
          }
          if (requestedCategory === 'respiratory') {
            return questionCategory.includes('respiratory') || questionCategory.includes('lung') || questionCategory.includes('asthma');
          }
          if (requestedCategory === 'gastroenterology') {
            return questionCategory.includes('gastro') || questionCategory.includes('bowel') || questionCategory.includes('liver');
          }
          if (requestedCategory === 'neurology') {
            return questionCategory.includes('neuro') || questionCategory.includes('brain') || questionCategory.includes('stroke');
          }
          if (requestedCategory === 'endocrinology') {
            return questionCategory.includes('endocrin') || questionCategory.includes('diabetes') || questionCategory.includes('thyroid');
          }
          if (requestedCategory === 'psychiatry') {
            return questionCategory.includes('psychiatr') || questionCategory.includes('mental') || questionCategory.includes('depression');
          }
          if (requestedCategory === 'obstetrics-gynaecology') {
            return questionCategory.includes('obstetric') || questionCategory.includes('gynae') || questionCategory.includes('pregnancy');
          }
          if (requestedCategory === 'paediatrics') {
            return questionCategory.includes('paediatric') || questionCategory.includes('child') || questionCategory.includes('infant');
          }
          if (requestedCategory === 'surgery') {
            return questionCategory.includes('surgery') || questionCategory.includes('surgical') || questionCategory.includes('operation');
          }
          if (requestedCategory === 'emergency-medicine') {
            return questionCategory.includes('emergency') || questionCategory.includes('acute') || questionCategory.includes('trauma');
          }
          
          // Default exact match
          return questionCategory.includes(requestedCategory);
        });
      }

      // Apply difficulty filtering (if needed in future)
      if (difficulty && difficulty !== 'all') {
        // Most test questions don't have difficulty, so keep all for now
      }

      // Limit to requested count
      const finalQuestions = filteredQuestions.slice(0, requestedCount);

      console.log(`Filtered questions: ${filteredQuestions.length} found for category "${category}", returning ${finalQuestions.length}`);

      res.json(finalQuestions);
    } catch (error) {
      console.error('Error fetching test questions:', error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Performance tracking endpoint
  app.get('/api/performance-stats', (req, res) => {
    res.json({
      questionBank: 8, // Updated count for 8 test questions
      totalAttempts: 0,
      averageScore: 0,
      aiStatus: getAIStatus()
    });
  });

  // Basic endpoints for static content
  app.get('/api/question-bank', (req, res) => {
    res.json({
      questions: [],
      total: 0,
      message: "Question generation suspended - AI services offline"
    });
  });

  // User Format Stations endpoints
  app.get('/api/user-format/stations', (req, res) => {
    const stations = loadUserFormatStations();
    res.json(stations);
  });

  app.post('/api/generate-user-format-3000-stations', async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus()
      });
    }

    try {
      const currentCount = getUserFormatStationCount();
      const targetCount = 3000;
      const remaining = targetCount - currentCount;
      
      if (remaining <= 0) {
        return res.json({ 
          success: true, 
          message: `Target achieved! ${currentCount} stations available`,
          totalStations: currentCount 
        });
      }
      
      console.log(`Generating user format stations: ${remaining} remaining toward ${targetCount} target`);
      
      const batchSize = 5;
      const stations = await generateUserFormatStations(Math.min(batchSize, remaining));
      
      if (stations.length > 0) {
        const totalStations = saveUserFormatStations(stations);
        console.log(`Generated ${stations.length} user format stations (Total: ${totalStations}/${targetCount})`);
        
        res.json({ 
          success: true, 
          generated: stations.length,
          totalStations,
          remaining: Math.max(0, targetCount - totalStations),
          targetReached: totalStations >= targetCount
        });
      } else {
        res.json({ success: false, error: 'No stations generated' });
      }
    } catch (error) {
      console.error('Error generating user format stations:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/user-format/status', (req, res) => {
    const totalStations = getUserFormatStationCount();
    const targetCount = 3000;
    const remaining = Math.max(0, targetCount - totalStations);
    
    res.json({
      totalStations,
      targetCount,
      remaining,
      percentComplete: Math.round((totalStations / targetCount) * 100),
      targetReached: totalStations >= targetCount
    });
  });

  // International Medical Exam endpoints
  app.get('/api/international/exams', (req, res) => {
    const supportedExams = getSupportedExams();
    const examStats = supportedExams.map(examType => ({
      examType,
      totalStations: getInternationalStationCount(examType),
      stations: loadInternationalStations(examType)
    }));
    res.json(examStats);
  });

  app.get('/api/international/:examType/stations', (req, res) => {
    const { examType } = req.params;
    const stations = loadInternationalStations(examType.toUpperCase());
    res.json(stations);
  });

  app.post('/api/generate-international-stations', async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services unavailable", 
        message: getAIStatus()
      });
    }

    try {
      const { examType, targetCount = 1000 } = req.body;
      
      if (!getSupportedExams().includes(examType)) {
        return res.status(400).json({ error: `Unsupported exam type: ${examType}` });
      }

      const currentCount = getInternationalStationCount(examType);
      const remaining = targetCount - currentCount;
      
      if (remaining <= 0) {
        return res.json({ 
          success: true, 
          message: `Target achieved! ${currentCount} ${examType} stations available`,
          totalStations: currentCount 
        });
      }
      
      console.log(`Generating ${examType} stations: ${remaining} remaining toward ${targetCount} target`);
      
      const batchSize = 5;
      const stations = await generateInternationalStations(examType, Math.min(batchSize, remaining));
      
      if (stations.length > 0) {
        const totalStations = saveInternationalStations(examType, stations);
        console.log(`Generated ${stations.length} ${examType} stations (Total: ${totalStations}/${targetCount})`);
        
        res.json({ 
          success: true, 
          examType,
          generated: stations.length,
          totalStations,
          remaining: Math.max(0, targetCount - totalStations),
          targetReached: totalStations >= targetCount
        });
      } else {
        res.json({ success: false, error: 'No stations generated' });
      }
    } catch (error) {
      console.error('Error generating international stations:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/international/:examType/status', (req, res) => {
    const { examType } = req.params;
    const totalStations = getInternationalStationCount(examType.toUpperCase());
    const targetCount = 1000;
    const remaining = Math.max(0, targetCount - totalStations);
    
    res.json({
      examType: examType.toUpperCase(),
      totalStations,
      targetCount,
      remaining,
      percentComplete: Math.round((totalStations / targetCount) * 100),
      targetReached: totalStations >= targetCount
    });
  });

  // Content Independence API
  app.get('/api/content/independence-status', (req, res) => {
    try {
      const stats = getContentIndependenceStatus();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get content independence status' });
    }
  });

  app.post('/api/content/manual-station', (req, res) => {
    try {
      const { examType, stationData } = req.body;
      
      if (!examType || !stationData) {
        return res.status(400).json({ error: 'examType and stationData required' });
      }

      const success = createManualStation(examType, stationData);
      
      if (success) {
        res.json({ 
          success: true, 
          message: `Manual station added to ${examType}`,
          stationId: stationData.id
        });
      } else {
        res.status(500).json({ error: 'Failed to create manual station' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/content/export/:examType?', (req, res) => {
    try {
      const { examType } = req.params;
      const content = exportContentLibrary(examType?.toUpperCase());
      
      res.json({
        examType: examType || 'ALL',
        totalStations: content.length,
        content,
        exportedAt: new Date().toISOString(),
        aiDependency: 'none'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to export content library' });
    }
  });

  app.get('/api/content/sufficiency/:examType', (req, res) => {
    try {
      const { examType } = req.params;
      const { minimumStations = 500 } = req.query;
      
      const validation = validateContentSufficiency(
        examType.toUpperCase(), 
        parseInt(minimumStations as string)
      );
      
      res.json(validation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate content sufficiency' });
    }
  });

  // Translation System API
  app.get('/api/translations/supported-languages', (req, res) => {
    res.json({
      languages: SUPPORTED_LANGUAGES,
      totalCount: Object.keys(SUPPORTED_LANGUAGES).length,
      culturalAdaptations: CULTURAL_ADAPTATIONS
    });
  });

  app.get('/api/translations/stats', (req, res) => {
    try {
      const stats = getTranslationStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get translation stats' });
    }
  });

  app.get('/api/translations/:examType/:language', (req, res) => {
    try {
      const { examType, language } = req.params;
      const translations = loadTranslations(examType.toUpperCase(), language);
      res.json({
        examType: examType.toUpperCase(),
        language,
        translations,
        count: translations.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load translations' });
    }
  });

  app.post('/api/translations/:examType/:language', (req, res) => {
    try {
      const { examType, language } = req.params;
      const { translationData } = req.body;
      
      if (!translationData) {
        return res.status(400).json({ error: 'Translation data required' });
      }

      const success = saveTranslation(examType.toUpperCase(), language, translationData);
      
      if (success) {
        res.json({ 
          success: true, 
          message: `Translation saved for ${examType} in ${language}`,
          translationId: translationData.id
        });
      } else {
        res.status(500).json({ error: 'Failed to save translation' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/translations/template', (req, res) => {
    try {
      const template = getTranslationTemplate();
      res.json({
        template,
        manifest: createTranslationManifest()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get translation template' });
    }
  });

  app.get('/api/translations/manifest', (req, res) => {
    try {
      const manifest = createTranslationManifest();
      res.json(manifest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get translation manifest' });
    }
  });

  // Independent Translation API (No external dependencies)
  app.get('/api/independent-translations/stats', (req, res) => {
    try {
      const stats = getIndependentTranslationStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get independent translation stats' });
    }
  });

  app.post('/api/independent-translations/translate', (req, res) => {
    try {
      const { stationData, targetLanguages = ['ar', 'zh', 'hi', 'es', 'fr'] } = req.body;
      
      if (!stationData) {
        return res.status(400).json({ error: 'Station data required' });
      }

      // Translate to multiple languages independently
      const translations = [];
      for (const language of targetLanguages) {
        const translated = translateStationIndependently(stationData, language);
        translations.push(translated);
      }
      
      res.json({ 
        success: true, 
        translations,
        translatedLanguages: targetLanguages,
        method: 'independent_dictionary',
        aiDependency: 'none'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/independent-translations/batch', (req, res) => {
    try {
      const { examType, targetLanguages = ['ar', 'zh', 'hi', 'es', 'fr'] } = req.body;
      
      // Load stations for the exam type
      let stations = [];
      if (examType === 'PLAB2') {
        stations = loadUserFormatStations();
      } else {
        stations = loadInternationalStations(examType);
      }
      
      if (stations.length === 0) {
        return res.status(404).json({ error: `No stations found for ${examType}` });
      }

      // Translate first 10 stations as sample
      const sampleStations = stations.slice(0, 10);
      const translations = batchTranslateStations(sampleStations, targetLanguages);
      
      // Save translations
      const saved = saveIndependentTranslations(examType, translations);
      
      res.json({ 
        success: saved, 
        examType,
        stationsTranslated: sampleStations.length,
        languagesCreated: targetLanguages.length,
        totalTranslations: translations.length,
        method: 'independent_dictionary',
        aiDependency: 'none'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/independent-translations/dictionary', (req, res) => {
    try {
      res.json({
        medicalDictionary: MEDICAL_TERMINOLOGY_DICTIONARY,
        supportedLanguagePairs: Object.keys(MEDICAL_TERMINOLOGY_DICTIONARY),
        totalTerms: Object.values(MEDICAL_TERMINOLOGY_DICTIONARY).reduce((total, dict) => total + Object.keys(dict).length, 0),
        independentCapability: true,
        offlineReady: true
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get dictionary' });
    }
  });

  // Independent Analysis API (Replaces all AI-powered analysis)
  app.post('/api/independent-analysis/video', (req, res) => {
    try {
      const { stationTitle, stationCategory, learningObjectives = [], recordingDuration = 480 } = req.body;
      
      const analysis = analyzeVideoPerformanceIndependently(
        stationTitle || 'Clinical Station',
        stationCategory || 'General',
        learningObjectives,
        recordingDuration
      );
      
      res.json({
        ...analysis,
        method: 'structured_assessment',
        aiDependency: 'none',
        assessmentStandard: 'PLAB_2_criteria'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze performance' });
    }
  });

  app.post('/api/independent-analysis/feedback', (req, res) => {
    try {
      const { topic, userResponse } = req.body;
      
      const feedback = generateIndependentFeedback(topic || 'medical scenario', userResponse || '');
      
      res.json({
        feedback,
        method: 'template_based',
        aiDependency: 'none'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate feedback' });
    }
  });

  app.post('/api/independent-analysis/image', (req, res) => {
    try {
      const { imagePath, context } = req.body;
      
      const analysis = analyzeImageIndependently(imagePath || '', context || '');
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze image' });
    }
  });

  app.get('/api/independence/complete-status', (req, res) => {
    try {
      const system = exportCompleteIndependentSystem();
      const alternatives = createIndependentAlternatives();
      const hybridStatus = hybridAI.getSystemStatus();
      
      res.json({
        ...system,
        independentFeatures: alternatives,
        hybridCapabilities: hybridStatus,
        aiReplacement: {
          questionGeneration: 'template_based_only', // Never AI
          videoAnalysis: 'hybrid_with_fallback', 
          translation: 'dictionary_based_only', // Never AI
          imageAnalysis: 'structured_observation',
          feedback: 'hybrid_with_fallback',
          guidance: 'hybrid_with_fallback'
        },
        questionBankPolicy: 'no_ai_ever',
        completeDependency: 'optional_ai_enhancement',
        offlineCapable: true
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get complete independence status' });
    }
  });

  // Hybrid AI Configuration
  app.get('/api/hybrid/status', (req, res) => {
    try {
      const status = hybridAI.getSystemStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get hybrid status' });
    }
  });

  app.post('/api/hybrid/config', (req, res) => {
    try {
      const { useAI, fallbackToIndependent, aiProvider } = req.body;
      
      hybridAI.updateConfig({
        useAI: useAI !== undefined ? useAI : true,
        fallbackToIndependent: fallbackToIndependent !== undefined ? fallbackToIndependent : true,
        aiProvider: aiProvider || 'openai'
      });
      
      res.json({ 
        success: true, 
        message: 'Hybrid AI configuration updated',
        status: hybridAI.getSystemStatus()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update hybrid config' });
    }
  });

  // Enhanced AI-powered endpoints (when AI is available)
  app.post('/api/hybrid/video-analysis', async (req, res) => {
    try {
      const { stationTitle, stationCategory, learningObjectives = [], recordingDuration = 480, useAI = true } = req.body;
      
      const analysis = await hybridAI.analyzeVideo(
        stationTitle || 'Clinical Station',
        stationCategory || 'General',
        learningObjectives,
        recordingDuration,
        useAI
      );
      
      res.json({
        ...analysis,
        method: hybridAI.getSystemStatus().aiAvailable && useAI ? 'ai_enhanced' : 'independent_structured',
        fallbackUsed: !hybridAI.getSystemStatus().aiAvailable && useAI
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze video' });
    }
  });

  app.post('/api/hybrid/feedback', async (req, res) => {
    try {
      const { topic, userResponse, useAI = true } = req.body;
      
      const feedback = await hybridAI.generateFeedback(
        topic || 'medical scenario', 
        userResponse || '',
        useAI
      );
      
      res.json({
        feedback,
        method: hybridAI.getSystemStatus().aiAvailable && useAI ? 'ai_enhanced' : 'template_based',
        fallbackUsed: !hybridAI.getSystemStatus().aiAvailable && useAI
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate feedback' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Periodic cleanup
setInterval(cleanupOldSessions, 5 * 60 * 1000); // Every 5 minutes
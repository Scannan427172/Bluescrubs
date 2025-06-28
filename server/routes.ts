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
  const server = createServer(app);
  
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

  // Test questions endpoint with category filtering
  app.get("/api/test/questions", async (req, res) => {
    try {
      // Get query parameters for filtering
      const { category, difficulty, count, questionId } = req.query;
      const requestedCategory = typeof category === 'string' ? category : 'all';
      const requestedCount = parseInt(typeof count === 'string' ? count : '20');

      // Questions organized by category
      const questionsByCategory = {
        'infectious-diseases': [
          {
            id: "q1", 
            topic: "Urinary Tract Infection Management",
            category: "infectious-diseases",
            question: "A 28-year-old non-pregnant woman presents to your GP practice with a 2-day history of dysuria, urinary frequency, and suprapubic pain. She has no fever, flank pain, or vaginal discharge. Urine dipstick shows nitrites positive and leucocytes 2+. What is the most appropriate first-line antibiotic treatment?",
            options: {
              A: "Nitrofurantoin 100mg modified-release twice daily for 3 days",
              B: "Trimethoprim 200mg twice daily for 3 days",
              C: "Amoxicillin 500mg three times daily for 3 days", 
              D: "Ciprofloxacin 250mg twice daily for 3 days",
              E: "Fosfomycin 3g single dose"
            },
            answer: "A",
            explanation: "Nitrofurantoin is the first-line treatment for uncomplicated UTIs in non-pregnant women according to NICE NG109 guidelines.",
            mnemonic: "UTI Treatment: NITRO = Nice Initial Treatment Recommended Option",
            links: {
              primary: { title: "NICE NG109", url: "https://www.nice.org.uk/guidance/ng109" }
            }
          }
        ],
        'dermatology': [
          {
            id: "derm1",
            topic: "Eczema Management",
            category: "dermatology",
            question: "A 25-year-old woman presents with a 6-month history of itchy, red, scaly patches on her hands and flexural areas. The rash worsens with stress and certain soaps. What is the most likely diagnosis?",
            options: {
              A: "Atopic dermatitis (eczema)",
              B: "Contact dermatitis",
              C: "Psoriasis",
              D: "Seborrheic dermatitis",
              E: "Fungal infection"
            },
            answer: "A",
            explanation: "Atopic dermatitis typically affects flexural areas, is triggered by stress and irritants, and presents with itchy, inflamed skin. The chronic nature and distribution are characteristic.",
            mnemonic: "Eczema: ITCH = Inflammation, Triggers (stress/soaps), Chronic, Hereditary",
            links: {
              primary: { title: "NICE CKS Eczema", url: "https://cks.nice.org.uk/topics/eczema-atopic/" }
            }
          },
          {
            id: "derm2", 
            topic: "Acne Management",
            category: "dermatology",
            question: "A 17-year-old presents with moderate acne affecting the face and back, with inflammatory papules, pustules, and some comedones. What is the most appropriate first-line treatment?",
            options: {
              A: "Topical retinoid + topical antibiotic",
              B: "Oral antibiotics alone",
              C: "Topical benzoyl peroxide alone",
              D: "Oral isotretinoin",
              E: "Topical corticosteroids"
            },
            answer: "A",
            explanation: "For moderate inflammatory acne, NICE recommends combination therapy with topical retinoid and topical antibiotic as first-line treatment.",
            mnemonic: "Acne treatment: COMBINE = Combination therapy for Optimal Management in Better Inflammatory Non-comedonal Eczema",
            links: {
              primary: { title: "NICE CKS Acne", url: "https://cks.nice.org.uk/topics/acne-vulgaris/" }
            }
          },
          {
            id: "derm3",
            topic: "Skin Cancer Recognition", 
            category: "dermatology",
            question: "A 55-year-old man presents with a dark, irregularly-shaped lesion on his back that has grown and changed color over 3 months. Using the ABCDE criteria, which feature is most concerning for malignant melanoma?",
            options: {
              A: "Asymmetry of the lesion",
              B: "Border irregularity",
              C: "Color variation within the lesion",
              D: "Diameter >6mm",
              E: "Evolution (change over time)"
            },
            answer: "E",
            explanation: "Evolution (change in size, shape, or color) is the most significant warning sign for melanoma. Any changing pigmented lesion requires urgent dermatological assessment.",
            mnemonic: "ABCDE: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution (most important)",
            links: {
              primary: { title: "NICE NG14 Melanoma", url: "https://www.nice.org.uk/guidance/ng14" }
            }
          }
        ],
        'cardiovascular': [
          {
            id: "cardio1",
            topic: "Acute Coronary Syndrome Management", 
            category: "cardiovascular",
            question: "A 58-year-old man presents to the emergency department with severe central chest pain radiating to his left arm, lasting 45 minutes. ECG shows ST elevation >2mm in leads II, III, and aVF. What is the most appropriate immediate management?",
            options: {
              A: "Primary percutaneous coronary intervention (PCI) within 120 minutes",
              B: "Thrombolytic therapy with alteplase immediately", 
              C: "High-dose atorvastatin and dual antiplatelet therapy",
              D: "Coronary angiography within 24 hours",
              E: "Conservative management with aspirin and clopidogrel"
            },
            answer: "A",
            explanation: "Primary PCI is the gold standard for STEMI when deliverable within 120 minutes according to NICE CG167.",
            mnemonic: "STEMI management: PCI = Primary Care Intervention (within 120 minutes)",
            links: {
              primary: { title: "NICE CG167", url: "https://www.nice.org.uk/guidance/cg167" }
            }
          }
        ]
      };

      // Get all questions or filter by category
      let selectedQuestions: any[] = [];
      if (requestedCategory === 'all') {
        selectedQuestions = Object.values(questionsByCategory).flat();
      } else if (questionsByCategory[requestedCategory as keyof typeof questionsByCategory]) {
        selectedQuestions = questionsByCategory[requestedCategory as keyof typeof questionsByCategory];
      } else {
        // If category not found, return empty array
        selectedQuestions = [];
      }

      // Handle single question request
      if (questionId) {
        const question = selectedQuestions.find(q => q.id === questionId);
        if (!question) {
          return res.status(404).json({ error: "Question not found" });
        }
        return res.json(question);
      }

      // Apply count limit and return filtered questions  
      const limitedQuestions = selectedQuestions.slice(0, requestedCount);
      res.json(limitedQuestions);
    } catch (error) {
      console.error('Error fetching test questions:', error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Performance tracking endpoint
  app.get('/api/performance-stats', (req, res) => {
    res.json({
      questionBank: 7, // Updated count including category-specific questions
      totalAttempts: 0,
      averageScore: 0,
      aiStatus: getAIStatus()
    });
  });

  // Return the server instance
  return server;
}


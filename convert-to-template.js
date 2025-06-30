#!/usr/bin/env node

// Convert existing question bank to new template format
import fs from 'fs';

// Read current question bank
const currentQuestions = JSON.parse(fs.readFileSync('./generated-question-bank.json', 'utf8'));

// Template format from user's example
const convertToNewFormat = (oldQuestion, index) => {
  return {
    "id": oldQuestion.id || `q-${String(index + 1).padStart(3, '0')}`,
    "category": oldQuestion.category || "General Medicine",
    "question_scenario": oldQuestion.question || oldQuestion.stem || "",
    "question_stem": "What is the most likely diagnosis?" + (oldQuestion.question?.includes('?') ? "" : ""),
    "options": oldQuestion.options ? oldQuestion.options.map((option, idx) => ({
      "label": String.fromCharCode(65 + idx), // A, B, C, D, E
      "text": option,
      "is_correct": idx === oldQuestion.answer || option === oldQuestion.correctAnswer
    })) : [],
    "correct_answer_explanation": {
      "clinical_features": extractClinicalFeatures(oldQuestion.explanation),
      "pathophysiology": extractPathophysiology(oldQuestion.explanation),
      "diagnostic_criteria": extractDiagnosticCriteria(oldQuestion.explanation),
      "uk_guidelines_summary": {
        "treatment_protocol": extractTreatmentProtocol(oldQuestion.explanation),
        "referral_criteria": extractReferralCriteria(oldQuestion.explanation),
        "tools": extractAssessmentTools(oldQuestion.explanation)
      }
    },
    "incorrect_options_explanation": oldQuestion.incorrectExplanation || extractIncorrectExplanations(oldQuestion),
    "mnemonic": {
      "name": extractMnemonicName(oldQuestion.mnemonic),
      "definition": oldQuestion.mnemonic || "Clinical assessment approach"
    },
    "references": convertReferences(oldQuestion.links)
  };
};

// Helper functions to extract content from existing explanations
function extractClinicalFeatures(explanation) {
  if (!explanation) return "Clinical presentation supports this diagnosis based on symptom pattern and examination findings.";
  if (typeof explanation !== 'string') {
    explanation = JSON.stringify(explanation);
  }
  const lines = explanation.split('\n');
  const clinicalSection = lines.filter(line => 
    line.includes('present') || line.includes('symptom') || line.includes('feature') || line.includes('clinical')
  );
  return clinicalSection.length > 0 ? clinicalSection.join(' ').substring(0, 200) + "..." : 
    "Clinical presentation supports this diagnosis based on symptom pattern and examination findings.";
}

function extractPathophysiology(explanation) {
  if (!explanation) return "Disease mechanism involves specific pathophysiological processes relevant to clinical presentation.";
  if (typeof explanation !== 'string') {
    explanation = JSON.stringify(explanation);
  }
  const lines = explanation.split('\n');
  const pathSection = lines.filter(line => 
    line.includes('mechanism') || line.includes('pathway') || line.includes('cause') || line.includes('process')
  );
  return pathSection.length > 0 ? pathSection.join(' ').substring(0, 200) + "..." : 
    "Disease mechanism involves specific pathophysiological processes relevant to clinical presentation.";
}

function extractDiagnosticCriteria(explanation) {
  if (!explanation) return "Diagnosis based on clinical criteria and evidence-based guidelines.";
  if (typeof explanation !== 'string') {
    explanation = JSON.stringify(explanation);
  }
  const lines = explanation.split('\n');
  const diagSection = lines.filter(line => 
    line.includes('diagnos') || line.includes('criteria') || line.includes('assess') || line.includes('evaluat')
  );
  return diagSection.length > 0 ? diagSection.join(' ').substring(0, 200) + "..." : 
    "Diagnosis based on clinical criteria and evidence-based guidelines.";
}

function extractTreatmentProtocol(explanation) {
  if (!explanation) return "Follow NICE guidelines for evidence-based treatment approach.";
  if (typeof explanation !== 'string') {
    explanation = JSON.stringify(explanation);
  }
  const lines = explanation.split('\n');
  const treatSection = lines.filter(line => 
    line.includes('treatment') || line.includes('management') || line.includes('therapy') || line.includes('medication')
  );
  return treatSection.length > 0 ? treatSection.join(' ').substring(0, 150) + "..." : 
    "Follow NICE guidelines for evidence-based treatment approach.";
}

function extractReferralCriteria(explanation) {
  return "Refer to specialist if diagnostic uncertainty, treatment failure, or complex presentation.";
}

function extractAssessmentTools(explanation) {
  if (!explanation) return "Use validated clinical assessment tools as per guidelines.";
  const tools = explanation.match(/([A-Z]{2,}[-\d]*|[A-Z][a-z]+[-\d]*)/g);
  return tools ? tools.slice(0, 3).join(', ') + " scoring systems" : "Use validated clinical assessment tools as per guidelines.";
}

function extractIncorrectExplanations(oldQuestion) {
  if (oldQuestion.incorrectExplanation) {
    return oldQuestion.incorrectExplanation;
  }
  
  const explanations = {};
  if (oldQuestion.options) {
    oldQuestion.options.forEach((option, idx) => {
      const label = String.fromCharCode(65 + idx);
      if (idx !== oldQuestion.answer) {
        explanations[label] = `${option} does not match the clinical presentation and key diagnostic features described.`;
      }
    });
  }
  return explanations;
}

function extractMnemonicName(mnemonic) {
  if (!mnemonic) return "Clinical Approach";
  const match = mnemonic.match(/^([A-Z]+)/);
  return match ? match[1] : "Clinical Approach";
}

function convertReferences(links) {
  const defaultRefs = [
    {
      "source": "NICE Guidelines",
      "url": "https://www.nice.org.uk/guidance"
    },
    {
      "source": "NHS Clinical Knowledge Summaries",
      "url": "https://cks.nice.org.uk/"
    },
    {
      "source": "GMC Good Medical Practice",
      "url": "https://www.gmc-uk.org/ethical-guidance"
    }
  ];

  if (!links) return defaultRefs;
  
  const converted = [];
  if (links.primary) {
    converted.push({
      "source": links.primary.title || "Primary Reference",
      "url": links.primary.url
    });
  }
  
  if (links.supplementary) {
    links.supplementary.forEach(link => {
      converted.push({
        "source": link.title,
        "url": link.url
      });
    });
  }
  
  return converted.length > 0 ? converted : defaultRefs;
}

// Convert all questions
console.log(`Converting ${currentQuestions.length} questions to new template format...`);

const convertedQuestions = currentQuestions.map((question, index) => {
  return convertToNewFormat(question, index);
});

// Save converted questions
fs.writeFileSync('./question-bank-new-format.json', JSON.stringify(convertedQuestions, null, 2));

console.log(`✅ Successfully converted ${convertedQuestions.length} questions to new format`);
console.log('📁 Saved as: question-bank-new-format.json');
console.log('🔄 Ready to replace existing question bank');
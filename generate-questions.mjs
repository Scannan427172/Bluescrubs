import fs from 'fs';

const templates = {
  cardiology: [{
    pattern: "A {age}-year-old {gender} presents with {duration} history of {symptom}. {examination_findings}. What is the most appropriate {action}?",
    variables: {
      age: ["45", "62", "58", "71", "39"],
      gender: ["male", "female"],
      duration: ["2-week", "3-day", "1-month", "6-hour"],
      symptom: ["chest pain", "shortness of breath", "palpitations", "ankle swelling"],
      examination_findings: ["ECG shows ST elevation in leads II, III, aVF", "Chest X-ray shows cardiomegaly", "Heart sounds reveal a systolic murmur"],
      action: ["initial management", "investigation", "treatment"]
    },
    answers: ["Aspirin and clopidogrel", "Echocardiogram", "ACE inhibitor", "Urgent cardiology referral", "Beta-blocker"],
    correct_index: -1
  }],
  respiratory: [{
    pattern: "A {age}-year-old {gender} with {history} presents with {symptom}. {investigation} shows {finding}. What is the most likely diagnosis?",
    variables: {
      age: ["55", "68", "42", "73"],
      gender: ["male", "female"],
      history: ["20-year smoking history", "known COPD", "recent travel"],
      symptom: ["progressive dyspnea", "productive cough", "chest pain"],
      investigation: ["Chest X-ray", "CT scan", "Spirometry"],
      finding: ["bilateral infiltrates", "hyperinflation", "consolidation"]
    },
    answers: ["Pneumonia", "COPD exacerbation", "Pulmonary embolism", "Lung cancer", "Asthma"],
    correct_index: -1
  }]
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateFromPattern(template) {
  let questionText = template.pattern;
  
  for (const [variable, options] of Object.entries(template.variables)) {
    const randomOption = options[Math.floor(Math.random() * options.length)];
    const regex = new RegExp(`{${variable}}`, 'g');
    questionText = questionText.replace(regex, randomOption);
  }

  const correctIndex = template.correct_index === -1 
    ? Math.floor(Math.random() * template.answers.length)
    : template.correct_index;
  
  const correctAnswer = template.answers[correctIndex];
  const shuffledOptions = shuffleArray([...template.answers]);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    question: questionText,
    options: shuffledOptions,
    answer: newCorrectIndex,
    explanation: {
      A: "Clinical reasoning based on presentation and guidelines",
      B: "Consider differential diagnosis and risk factors", 
      C: "Evaluate symptoms in clinical context",
      D: "Apply evidence-based medicine principles",
      E: "Follow established clinical protocols"
    },
    mnemonic: "Clinical reasoning approach",
    links: { NICE: "https://www.nice.org.uk", GMC: "https://www.gmc-uk.org/ethical-guidance" },
    category: '',
    difficulty: 'intermediate',
    topic: ''
  };
}

const questions = [];
['cardiology', 'respiratory'].forEach(category => {
  const template = templates[category][0];
  for (let i = 0; i < 455; i++) {
    const q = generateFromPattern(template);
    q.id = `template-${category}-${Date.now()}-${i}`;
    q.category = category;
    q.topic = category.charAt(0).toUpperCase() + category.slice(1);
    questions.push(q);
  }
});

console.log(`Generated ${questions.length} questions`);
fs.writeFileSync('generated-question-bank.json', JSON.stringify(questions, null, 2));
console.log('Saved to generated-question-bank.json');

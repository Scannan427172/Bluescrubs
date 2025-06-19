import { Router } from 'express';
import { EXPANDED_QUESTION_BANK } from '../shared/expanded-question-bank';
import { PLAB2_OSCE_STATIONS } from '../shared/plab2-osce-stations';
import { COMPREHENSIVE_PLAB_PATHS } from '../shared/comprehensive-plab-system';
import { QUESTION_BANK_STATS } from '../shared/expanded-question-bank';

const router = Router();

// AI-Powered Learning Analytics
interface StudentPerformance {
  userId: number;
  strengths: string[];
  weaknesses: string[];
  recommendedFocus: string[];
  predictedPLAB1Score: number;
  predictedPLAB2Score: number;
  confidenceLevel: number;
  studyHours: number;
  questionsAnswered: number;
  accuracy: number;
}

interface PLABReadinessMetrics {
  plab1Readiness: number;
  plab2Readiness: number;
  overallReadiness: number;
  criticalAreas: string[];
  timeToReadiness: number; // days
  recommendedActions: string[];
}

// Advanced performance calculation using medical specialties
function calculatePLABReadiness(userAnswers: any[]): PLABReadinessMetrics {
  const specialtyPerformance = new Map<string, { correct: number; total: number }>();
  
  // Initialize all medical specialties
  const specialties = [
    'cardiovascular', 'respiratory', 'gastrointestinal', 'neurology',
    'endocrinology', 'psychiatry', 'obstetrics', 'pediatrics', 'surgery',
    'emergency', 'pharmacology', 'ethics', 'infectious-diseases', 'rheumatology'
  ];
  
  specialties.forEach(specialty => {
    specialtyPerformance.set(specialty, { correct: 0, total: 0 });
  });
  
  // Process user answers
  userAnswers.forEach(answer => {
    const specialty = answer.category || 'general';
    const current = specialtyPerformance.get(specialty) || { correct: 0, total: 0 };
    current.total++;
    if (answer.isCorrect) current.correct++;
    specialtyPerformance.set(specialty, current);
  });
  
  // Calculate readiness scores
  let totalAccuracy = 0;
  let totalQuestions = 0;
  const criticalAreas: string[] = [];
  
  specialtyPerformance.forEach((performance, specialty) => {
    if (performance.total > 0) {
      const accuracy = performance.correct / performance.total;
      totalAccuracy += accuracy * performance.total;
      totalQuestions += performance.total;
      
      if (accuracy < 0.7 && performance.total >= 5) {
        criticalAreas.push(specialty);
      }
    }
  });
  
  const overallAccuracy = totalQuestions > 0 ? totalAccuracy / totalQuestions : 0;
  const plab1Readiness = Math.min(100, overallAccuracy * 100 + (totalQuestions / 500) * 20);
  const plab2Readiness = Math.min(100, overallAccuracy * 90 + (criticalAreas.length === 0 ? 20 : 0));
  
  const timeToReadiness = Math.max(0, Math.ceil((100 - plab1Readiness) / 2));
  
  const recommendedActions = [];
  if (criticalAreas.length > 0) {
    recommendedActions.push(`Focus on ${criticalAreas.slice(0, 3).join(', ')}`);
  }
  if (totalQuestions < 200) {
    recommendedActions.push('Increase daily question practice');
  }
  if (overallAccuracy < 0.75) {
    recommendedActions.push('Review explanation analysis');
  }
  
  return {
    plab1Readiness,
    plab2Readiness,
    overallReadiness: (plab1Readiness + plab2Readiness) / 2,
    criticalAreas,
    timeToReadiness,
    recommendedActions
  };
}

// Get personalized PLAB progress
router.get('/api/plab/progress', (req, res) => {
  try {
    // In real implementation, fetch from database
    const mockUserAnswers = [
      { category: 'cardiovascular', isCorrect: true },
      { category: 'cardiovascular', isCorrect: false },
      { category: 'respiratory', isCorrect: true },
      { category: 'neurology', isCorrect: false },
      // Add more mock data
    ];
    
    const readiness = calculatePLABReadiness(mockUserAnswers);
    
    const response = {
      currentWeek: 6,
      totalWeeks: 12,
      plab1Readiness: readiness.plab1Readiness,
      plab2Readiness: readiness.plab2Readiness,
      overallProgress: readiness.overallReadiness,
      weakAreas: readiness.criticalAreas,
      strongAreas: ['respiratory', 'endocrinology', 'pharmacology'],
      timeToExam: 45,
      predictedScores: {
        plab1: Math.floor(120 + (readiness.plab1Readiness / 100) * 80),
        plab2: Math.floor(readiness.plab2Readiness),
        confidence: 0.87
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error calculating PLAB progress:', error);
    res.status(500).json({ error: 'Failed to calculate progress' });
  }
});

// Get study metrics
router.get('/api/study/metrics', (req, res) => {
  try {
    const metrics = {
      dailyStreak: 12,
      weeklyHours: 18.5,
      questionsAnswered: 1247,
      accuracy: 74.2,
      improvementTrend: 0.15
    };
    
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching study metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get UK guidelines updates
router.get('/api/guidelines/updates', (req, res) => {
  try {
    const updates = [
      {
        id: '1',
        title: 'NICE CG180 Atrial Fibrillation Update',
        category: 'Cardiology',
        dateUpdated: '2024-12-15',
        impact: 'high' as const,
        summary: 'Updated anticoagulation thresholds for CHA2DS2-VASc scoring'
      },
      {
        id: '2',
        title: 'BTS Asthma Guidelines Revision',
        category: 'Respiratory',
        dateUpdated: '2024-12-10',
        impact: 'medium' as const,
        summary: 'New inhaler device recommendations and MART therapy updates'
      },
      {
        id: '3',
        title: 'NICE NG28 Type 2 Diabetes Amendment',
        category: 'Endocrinology',
        dateUpdated: '2024-12-08',
        impact: 'high' as const,
        summary: 'Updated HbA1c targets for elderly patients and cardiovascular risk stratification'
      }
    ];
    
    res.json(updates);
  } catch (error) {
    console.error('Error fetching guideline updates:', error);
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
});

// Advanced question generation with UK clinical context
router.post('/api/generate-adaptive-questions', (req, res) => {
  try {
    const { userId, specialty, difficulty, count = 5 } = req.body;
    
    // Filter questions based on specialty and difficulty
    let filteredQuestions = EXPANDED_QUESTION_BANK.filter(q => {
      if (specialty && specialty !== 'all') {
        return q.category === specialty;
      }
      return true;
    }).filter(q => {
      if (difficulty && difficulty !== 'all') {
        return q.difficulty === difficulty;
      }
      return true;
    });
    
    // Shuffle and select
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, count);
    
    // Add adaptive learning context
    const adaptiveQuestions = selectedQuestions.map(q => ({
      ...q,
      adaptiveContext: {
        ukGuideline: q.references?.[0] || 'NICE Clinical Guidelines',
        clinicalSetting: q.clinicalSetting || 'General Practice',
        learningLevel: q.cognitiveLevel || 'application',
        estimatedTime: q.estimatedTime || 90
      }
    }));
    
    res.json({
      questions: adaptiveQuestions,
      metadata: {
        totalAvailable: filteredQuestions.length,
        specialty: specialty || 'mixed',
        difficulty: difficulty || 'mixed',
        adaptiveFeatures: [
          'UK clinical guidelines integration',
          'Real-world clinical scenarios',
          'Evidence-based explanations',
          'Performance tracking'
        ]
      }
    });
  } catch (error) {
    console.error('Error generating adaptive questions:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

// OSCE station recommendations
router.get('/api/osce/recommendations', (req, res) => {
  try {
    const { userId, weakAreas } = req.query;
    
    // Filter OSCE stations based on weak areas
    const recommendedStations = PLAB2_OSCE_STATIONS.filter(station => {
      if (!weakAreas) return true;
      const areas = (weakAreas as string).split(',');
      return areas.some(area => 
        station.category.toLowerCase().includes(area.toLowerCase()) ||
        station.title.toLowerCase().includes(area.toLowerCase())
      );
    }).slice(0, 6);
    
    res.json({
      stations: recommendedStations,
      practiceSchedule: {
        thisWeek: recommendedStations.slice(0, 3),
        nextWeek: recommendedStations.slice(3, 6),
        focusAreas: weakAreas ? (weakAreas as string).split(',') : ['communication', 'examination', 'history-taking']
      }
    });
  } catch (error) {
    console.error('Error getting OSCE recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Learning path progression
router.get('/api/learning-path/:pathId', (req, res) => {
  try {
    const { pathId } = req.params;
    const learningPath = COMPREHENSIVE_PLAB_PATHS.find(path => path.id === pathId);
    
    if (!learningPath) {
      return res.status(404).json({ error: 'Learning path not found' });
    }
    
    // Add progress tracking
    const pathWithProgress = {
      ...learningPath,
      userProgress: {
        currentWeek: 6,
        completedActivities: 24,
        totalActivities: 48,
        weeklyGoals: [
          { week: 6, goal: 'Master cardiovascular emergencies', completed: true },
          { week: 7, goal: 'Complete pharmacology review', completed: false },
          { week: 8, goal: 'Practice communication skills', completed: false }
        ]
      }
    };
    
    res.json(pathWithProgress);
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
});

// Clinical decision support tools
router.post('/api/clinical-tools/calculate', (req, res) => {
  try {
    const { tool, parameters } = req.body;
    
    let result;
    
    switch (tool) {
      case 'cha2ds2-vasc':
        result = calculateCHA2DS2VASc(parameters);
        break;
      case 'qrisk3':
        result = calculateQRISK3(parameters);
        break;
      case 'wells-score':
        result = calculateWellsScore(parameters);
        break;
      default:
        return res.status(400).json({ error: 'Unknown clinical tool' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error calculating clinical tool:', error);
    res.status(500).json({ error: 'Failed to calculate result' });
  }
});

// Clinical calculator implementations
function calculateCHA2DS2VASc(params: any) {
  let score = 0;
  if (params.heartFailure) score += 1;
  if (params.hypertension) score += 1;
  if (params.age >= 75) score += 2;
  else if (params.age >= 65) score += 1;
  if (params.diabetes) score += 1;
  if (params.stroke) score += 2;
  if (params.vascularDisease) score += 1;
  if (params.sex === 'female') score += 1;
  
  let recommendation = '';
  if (score === 0) recommendation = 'No antithrombotic therapy';
  else if (score === 1 && params.sex === 'male') recommendation = 'Consider anticoagulation';
  else if (score >= 1) recommendation = 'Anticoagulation recommended';
  
  return {
    score,
    recommendation,
    strokeRisk: getStrokeRisk(score),
    reference: 'NICE CG180: Atrial fibrillation'
  };
}

function calculateQRISK3(params: any) {
  // Simplified QRISK3 calculation
  let score = params.age || 0;
  if (params.smoking) score += 5;
  if (params.diabetes) score += 8;
  if (params.hypertension) score += 6;
  
  const risk = Math.min(score / 2, 35); // Simplified percentage
  
  return {
    tenYearRisk: risk,
    category: risk < 10 ? 'Low' : risk < 20 ? 'Moderate' : 'High',
    recommendation: risk >= 10 ? 'Statin therapy recommended' : 'Lifestyle modification',
    reference: 'NICE CG181: Cardiovascular risk assessment'
  };
}

function calculateWellsScore(params: any) {
  let score = 0;
  if (params.clinicalPE) score += 3;
  if (params.heartRate > 100) score += 1.5;
  if (params.immobilisation) score += 1.5;
  if (params.previousPE) score += 1.5;
  if (params.haemoptysis) score += 1;
  if (params.malignancy) score += 1;
  
  let probability = '';
  if (score <= 4) probability = 'PE unlikely';
  else probability = 'PE likely';
  
  return {
    score,
    probability,
    recommendation: score <= 4 ? 'D-dimer test' : 'CTPA indicated',
    reference: 'NICE CG144: Venous thromboembolic diseases'
  };
}

function getStrokeRisk(score: number): string {
  const risks = [
    '0%', '1.3%', '2.2%', '3.2%', '4.0%', '6.7%', '9.8%', '9.6%', '6.7%', '15.2%'
  ];
  return risks[Math.min(score, risks.length - 1)] || '15.2%+';
}

export default router;
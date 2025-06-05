// Adaptive Learning Engine for PLAB Preparation
// Adjusts difficulty and focuses on weak areas based on user performance

export interface LearningMetrics {
  userId: number;
  category: string;
  totalAttempts: number;
  correctAnswers: number;
  averageTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lastAttempt: Date;
  improvementRate: number;
  masteryLevel: number; // 0-100
}

export interface AdaptiveQuestion {
  questionId: number;
  difficulty: string;
  category: string;
  priority: number; // Higher = more important to practice
  recommendedFor: string[];
}

export interface StudyRecommendation {
  category: string;
  difficulty: string;
  questionCount: number;
  focusAreas: string[];
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
}

export class AdaptiveLearningEngine {
  
  // Calculate mastery level for a category (0-100)
  calculateMasteryLevel(metrics: LearningMetrics): number {
    const accuracyScore = (metrics.correctAnswers / metrics.totalAttempts) * 100;
    const consistencyBonus = metrics.totalAttempts >= 10 ? 10 : metrics.totalAttempts;
    const speedBonus = metrics.averageTime < 60 ? 10 : metrics.averageTime < 120 ? 5 : 0;
    
    return Math.min(100, accuracyScore + consistencyBonus + speedBonus);
  }

  // Determine next difficulty level based on performance
  getNextDifficulty(currentDifficulty: string, recentAccuracy: number, totalAttempts: number): string {
    // Need at least 5 attempts to adjust difficulty
    if (totalAttempts < 5) return currentDifficulty;

    switch (currentDifficulty) {
      case 'easy':
        return recentAccuracy >= 0.8 ? 'medium' : 'easy';
      case 'medium':
        if (recentAccuracy >= 0.8) return 'hard';
        if (recentAccuracy < 0.6) return 'easy';
        return 'medium';
      case 'hard':
        return recentAccuracy < 0.6 ? 'medium' : 'hard';
      default:
        return 'easy';
    }
  }

  // Generate personalized study recommendations
  generateStudyRecommendations(userMetrics: LearningMetrics[]): StudyRecommendation[] {
    const recommendations: StudyRecommendation[] = [];
    
    // Find weak categories (mastery < 70%)
    const weakCategories = userMetrics.filter(m => this.calculateMasteryLevel(m) < 70);
    
    // Find categories needing review (not attempted recently)
    const needsReview = userMetrics.filter(m => {
      const daysSinceLastAttempt = (Date.now() - m.lastAttempt.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceLastAttempt > 7 && this.calculateMasteryLevel(m) < 90;
    });

    // High priority: Critical weak areas
    weakCategories
      .filter(m => this.calculateMasteryLevel(m) < 50)
      .forEach(m => {
        recommendations.push({
          category: m.category,
          difficulty: 'easy',
          questionCount: 15,
          focusAreas: this.getWeakAreas(m.category),
          estimatedTime: 25,
          priority: 'high'
        });
      });

    // Medium priority: Moderate weak areas
    weakCategories
      .filter(m => this.calculateMasteryLevel(m) >= 50 && this.calculateMasteryLevel(m) < 70)
      .forEach(m => {
        recommendations.push({
          category: m.category,
          difficulty: this.getNextDifficulty(m.difficulty, m.correctAnswers / m.totalAttempts, m.totalAttempts),
          questionCount: 10,
          focusAreas: this.getWeakAreas(m.category),
          estimatedTime: 18,
          priority: 'medium'
        });
      });

    // Low priority: Review areas
    needsReview.forEach(m => {
      recommendations.push({
        category: m.category,
        difficulty: m.difficulty,
        questionCount: 8,
        focusAreas: ['general-review'],
        estimatedTime: 15,
        priority: 'low'
      });
    });

    // Sort by priority and mastery level
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Get specific weak areas for focused practice
  private getWeakAreas(category: string): string[] {
    const weakAreaMapping: Record<string, string[]> = {
      'cardiology': ['ECG interpretation', 'Heart failure management', 'Arrhythmia recognition', 'Acute coronary syndrome'],
      'respiratory': ['Asthma management', 'COPD treatment', 'Pneumonia diagnosis', 'Pulmonary embolism'],
      'gastroenterology': ['GI bleeding', 'IBD management', 'Liver disease', 'Peptic ulcer disease'],
      'neurology': ['Stroke management', 'Seizure disorders', 'Headache assessment', 'Neurological examination'],
      'endocrinology': ['Diabetes management', 'Thyroid disorders', 'Adrenal disease', 'Calcium disorders'],
      'psychiatry': ['Depression treatment', 'Anxiety disorders', 'Psychosis management', 'Suicide risk assessment'],
      'obstetrics-gynecology': ['Pregnancy complications', 'Contraception', 'Menstrual disorders', 'Gynecological oncology'],
      'pediatrics': ['Development assessment', 'Immunizations', 'Common infections', 'Growth disorders'],
      'surgery': ['Acute abdomen', 'Trauma management', 'Postoperative complications', 'Surgical procedures'],
      'emergency-medicine': ['Resuscitation', 'Trauma protocols', 'Poisoning management', 'Acute presentations'],
      'pharmacology': ['Drug interactions', 'Adverse effects', 'Dosing calculations', 'Contraindications']
    };

    return weakAreaMapping[category] || ['general-concepts'];
  }

  // Generate intelligent question sequence
  generateQuestionSequence(userMetrics: LearningMetrics[], targetCategory: string, count: number): AdaptiveQuestion[] {
    const categoryMetrics = userMetrics.find(m => m.category === targetCategory);
    const masteryLevel = categoryMetrics ? this.calculateMasteryLevel(categoryMetrics) : 0;
    
    const sequence: AdaptiveQuestion[] = [];
    
    // Start with easier questions if mastery is low
    let currentDifficulty = masteryLevel < 30 ? 'easy' : masteryLevel < 70 ? 'medium' : 'hard';
    
    for (let i = 0; i < count; i++) {
      const priority = this.calculateQuestionPriority(targetCategory, currentDifficulty, masteryLevel);
      
      sequence.push({
        questionId: i + 1, // This would be actual question IDs in practice
        difficulty: currentDifficulty,
        category: targetCategory,
        priority,
        recommendedFor: this.getTargetAudience(masteryLevel, currentDifficulty)
      });
      
      // Gradually increase difficulty within session
      if (i % 3 === 0 && masteryLevel > 50) {
        currentDifficulty = this.getNextDifficulty(currentDifficulty, 0.8, 10);
      }
    }
    
    return sequence;
  }

  // Calculate priority for question selection
  private calculateQuestionPriority(category: string, difficulty: string, masteryLevel: number): number {
    let basePriority = 50;
    
    // Higher priority for weak areas
    if (masteryLevel < 50) basePriority += 30;
    else if (masteryLevel < 70) basePriority += 15;
    
    // Adjust for difficulty appropriateness
    if (difficulty === 'easy' && masteryLevel < 30) basePriority += 20;
    if (difficulty === 'medium' && masteryLevel >= 30 && masteryLevel < 70) basePriority += 20;
    if (difficulty === 'hard' && masteryLevel >= 70) basePriority += 20;
    
    return Math.min(100, basePriority);
  }

  // Determine target audience for questions
  private getTargetAudience(masteryLevel: number, difficulty: string): string[] {
    const audience: string[] = [];
    
    if (masteryLevel < 30) audience.push('beginners');
    if (masteryLevel >= 30 && masteryLevel < 70) audience.push('intermediate');
    if (masteryLevel >= 70) audience.push('advanced');
    
    if (difficulty === 'easy') audience.push('foundational-review');
    if (difficulty === 'hard') audience.push('exam-preparation');
    
    return audience;
  }

  // Performance-based feedback system
  generatePerformanceFeedback(recentPerformance: { correct: number; total: number; category: string }[]): string[] {
    const feedback: string[] = [];
    
    const overallAccuracy = recentPerformance.reduce((sum, p) => sum + p.correct, 0) / 
                           recentPerformance.reduce((sum, p) => sum + p.total, 0);
    
    if (overallAccuracy >= 0.8) {
      feedback.push("Excellent performance! You're ready for more challenging questions.");
    } else if (overallAccuracy >= 0.6) {
      feedback.push("Good progress. Focus on understanding explanations for incorrect answers.");
    } else {
      feedback.push("Consider reviewing fundamental concepts before attempting more questions.");
    }
    
    // Category-specific feedback
    const weakCategories = recentPerformance
      .filter(p => (p.correct / p.total) < 0.6)
      .map(p => p.category);
    
    if (weakCategories.length > 0) {
      feedback.push(`Focus extra attention on: ${weakCategories.join(', ')}`);
    }
    
    return feedback;
  }

  // Spaced repetition system
  calculateNextReviewDate(masteryLevel: number, lastReview: Date): Date {
    const baseInterval = masteryLevel > 80 ? 14 : masteryLevel > 60 ? 7 : 3; // days
    const nextReview = new Date(lastReview);
    nextReview.setDate(nextReview.getDate() + baseInterval);
    return nextReview;
  }
}

// Specialty-specific learning modules
export const SpecialtyModules = {
  // High-yield topics for each specialty
  cardiology: {
    name: "Cardiology Mastery",
    coreTopics: [
      "Acute Coronary Syndrome Management",
      "Heart Failure Diagnosis and Treatment", 
      "Arrhythmia Recognition and Management",
      "Hypertension Guidelines",
      "Valvular Heart Disease",
      "ECG Interpretation"
    ],
    practicalSkills: [
      "ECG Analysis",
      "Blood Pressure Measurement",
      "Cardiovascular Examination",
      "Exercise Stress Testing"
    ],
    examWeight: 15 // Percentage of PLAB questions
  },
  
  respiratory: {
    name: "Respiratory Medicine",
    coreTopics: [
      "Asthma and COPD Management",
      "Pneumonia Diagnosis and Treatment",
      "Pulmonary Embolism",
      "Respiratory Failure",
      "Lung Cancer Screening",
      "Pleural Disease"
    ],
    practicalSkills: [
      "Peak Flow Measurement",
      "Inhaler Technique Teaching",
      "Respiratory Examination",
      "Arterial Blood Gas Interpretation"
    ],
    examWeight: 12
  },

  emergency: {
    name: "Emergency Medicine",
    coreTopics: [
      "Basic and Advanced Life Support",
      "Trauma Assessment (ATLS)",
      "Poisoning and Overdose",
      "Anaphylaxis Management",
      "Sepsis Recognition",
      "Mental Health Emergencies"
    ],
    practicalSkills: [
      "CPR and AED Use",
      "IV Cannulation",
      "Wound Suturing",
      "Emergency Drug Calculations"
    ],
    examWeight: 18
  }
};
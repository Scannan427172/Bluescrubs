import { addDays, addHours, format, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

export interface StudySession {
  id: string;
  userId: number;
  subject: string;
  category: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  scheduledStart: Date;
  scheduledEnd: Date;
  duration: number; // minutes
  priority: 'low' | 'medium' | 'high' | 'critical';
  sessionType: 'review' | 'learning' | 'practice' | 'assessment';
  learningObjectives: string[];
  estimatedQuestions: number;
  completed: boolean;
  actualStart?: Date;
  actualEnd?: Date;
  performance?: {
    accuracy: number;
    timePerQuestion: number;
    confidence: number;
  };
}

export interface UserPreferences {
  userId: number;
  preferredStudyHours: {
    start: number; // 0-23
    end: number; // 0-23
  };
  preferredDays: number[]; // 0-6 (Sunday-Saturday)
  maxSessionDuration: number; // minutes
  minBreakBetweenSessions: number; // minutes
  studyIntensity: 'light' | 'moderate' | 'intensive';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  weakAreas: string[];
  strongAreas: string[];
  examDate?: Date;
  dailyStudyGoal: number; // minutes
}

export interface PerformanceMetrics {
  userId: number;
  category: string;
  difficulty: string;
  recentAccuracy: number;
  averageTimePerQuestion: number;
  completionRate: number;
  retentionRate: number;
  improvementTrend: number; // -1 to 1
  lastStudied: Date;
  masteryLevel: number; // 0-100
  strugglingTopics: string[];
}

export interface ScheduleOptimization {
  optimalTimes: {
    hour: number;
    performance: number;
    focus: number;
  }[];
  difficultyProgression: {
    week: number;
    recommendedDifficulty: string;
    rationale: string;
  }[];
  priorityAreas: {
    category: string;
    urgency: number;
    timeAllocation: number; // percentage
  }[];
  restDays: Date[];
  intensiveWeeks: Date[];
}

export class StudyScheduleOptimizer {
  private readonly SPACED_REPETITION_INTERVALS = [1, 3, 7, 14, 30]; // days
  private readonly DIFFICULTY_PROGRESSION_THRESHOLD = 0.8; // 80% accuracy
  private readonly BURNOUT_PREVENTION_THRESHOLD = 0.6; // 60% performance drop
  
  async generateOptimizedSchedule(
    userId: number,
    preferences: UserPreferences,
    performanceMetrics: PerformanceMetrics[],
    startDate: Date,
    endDate: Date
  ): Promise<StudySession[]> {
    const schedule: StudySession[] = [];
    const optimization = await this.analyzeOptimalScheduling(userId, performanceMetrics);
    
    let currentDate = startDate;
    while (isBefore(currentDate, endDate)) {
      if (this.isStudyDay(currentDate, preferences, optimization)) {
        const dailySessions = await this.generateDailySessions(
          userId,
          currentDate,
          preferences,
          performanceMetrics,
          optimization
        );
        schedule.push(...dailySessions);
      }
      currentDate = addDays(currentDate, 1);
    }

    return this.optimizeSessionSequencing(schedule, performanceMetrics);
  }

  private async analyzeOptimalScheduling(
    userId: number,
    performanceMetrics: PerformanceMetrics[]
  ): Promise<ScheduleOptimization> {
    // Analyze user's performance patterns to find optimal study times
    const optimalTimes = this.calculateOptimalStudyTimes(performanceMetrics);
    const difficultyProgression = this.planDifficultyProgression(performanceMetrics);
    const priorityAreas = this.identifyPriorityAreas(performanceMetrics);
    
    return {
      optimalTimes,
      difficultyProgression,
      priorityAreas,
      restDays: this.calculateRestDays(performanceMetrics),
      intensiveWeeks: this.planIntensiveWeeks(performanceMetrics)
    };
  }

  private calculateOptimalStudyTimes(metrics: PerformanceMetrics[]) {
    // Generate optimal times based on circadian rhythm and performance data
    const times = [];
    for (let hour = 6; hour <= 22; hour++) {
      const performance = this.calculateHourlyPerformance(hour, metrics);
      const focus = this.calculateFocusLevel(hour);
      times.push({ hour, performance, focus });
    }
    return times.sort((a, b) => (b.performance + b.focus) - (a.performance + a.focus));
  }

  private calculateHourlyPerformance(hour: number, metrics: PerformanceMetrics[]): number {
    // Simulate performance based on circadian rhythm and historical data
    const circadianMultiplier = this.getCircadianMultiplier(hour);
    const historicalPerformance = metrics.reduce((sum, m) => sum + m.recentAccuracy, 0) / metrics.length;
    return Math.min(1, circadianMultiplier * historicalPerformance);
  }

  private getCircadianMultiplier(hour: number): number {
    // Peak cognitive performance typically occurs at 10-12am and 6-8pm
    if (hour >= 10 && hour <= 12) return 1.0;
    if (hour >= 18 && hour <= 20) return 0.95;
    if (hour >= 14 && hour <= 16) return 0.7; // Post-lunch dip
    if (hour >= 8 && hour <= 10) return 0.85;
    if (hour >= 20 && hour <= 22) return 0.8;
    return 0.5; // Early morning or late night
  }

  private calculateFocusLevel(hour: number): number {
    // Focus decreases throughout the day, with recovery after breaks
    if (hour >= 9 && hour <= 11) return 1.0;
    if (hour >= 19 && hour <= 21) return 0.9;
    if (hour >= 14 && hour <= 16) return 0.6;
    if (hour >= 21 && hour <= 23) return 0.7;
    return 0.5;
  }

  private planDifficultyProgression(metrics: PerformanceMetrics[]) {
    const progression = [];
    const totalWeeks = 12; // 3 months typical prep time

    for (let week = 1; week <= totalWeeks; week++) {
      const avgAccuracy = metrics.reduce((sum, m) => sum + m.recentAccuracy, 0) / metrics.length;
      const progressMultiplier = week / totalWeeks;
      
      let difficulty = 'foundation';
      if (avgAccuracy > 0.7 && progressMultiplier > 0.3) difficulty = 'intermediate';
      if (avgAccuracy > 0.8 && progressMultiplier > 0.6) difficulty = 'advanced';

      const rationale = this.generateProgressionRationale(avgAccuracy, progressMultiplier, difficulty);
      progression.push({ week, recommendedDifficulty: difficulty, rationale });
    }

    return progression;
  }

  private generateProgressionRationale(accuracy: number, progress: number, difficulty: string): string {
    if (difficulty === 'foundation') {
      return `Building fundamental knowledge base. Current accuracy: ${Math.round(accuracy * 100)}%`;
    } else if (difficulty === 'intermediate') {
      return `Ready for complex scenarios. Strong foundation established (${Math.round(accuracy * 100)}% accuracy)`;
    } else {
      return `Advanced practice phase. Mastery level achieved (${Math.round(accuracy * 100)}% accuracy)`;
    }
  }

  private identifyPriorityAreas(metrics: PerformanceMetrics[]) {
    return metrics
      .map(metric => ({
        category: metric.category,
        urgency: this.calculateUrgency(metric),
        timeAllocation: this.calculateTimeAllocation(metric)
      }))
      .sort((a, b) => b.urgency - a.urgency);
  }

  private calculateUrgency(metric: PerformanceMetrics): number {
    const accuracyWeight = 1 - metric.recentAccuracy;
    const masteryWeight = 1 - (metric.masteryLevel / 100);
    const timeWeight = this.calculateTimeSinceLastStudy(metric.lastStudied);
    
    return (accuracyWeight * 0.4 + masteryWeight * 0.4 + timeWeight * 0.2);
  }

  private calculateTimeSinceLastStudy(lastStudied: Date): number {
    const daysSince = Math.floor((Date.now() - lastStudied.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(1, daysSince / 7); // Normalize to 0-1 over a week
  }

  private calculateTimeAllocation(metric: PerformanceMetrics): number {
    const baseAllocation = 100 / 10; // Assuming 10 categories
    const urgencyMultiplier = this.calculateUrgency(metric);
    return baseAllocation * (1 + urgencyMultiplier);
  }

  private calculateRestDays(metrics: PerformanceMetrics[]): Date[] {
    // Calculate when user needs rest based on performance decline
    const restDays: Date[] = [];
    const avgPerformance = metrics.reduce((sum, m) => sum + m.recentAccuracy, 0) / metrics.length;
    
    if (avgPerformance < this.BURNOUT_PREVENTION_THRESHOLD) {
      // Schedule rest days more frequently
      for (let i = 0; i < 30; i += 5) {
        restDays.push(addDays(new Date(), i));
      }
    } else {
      // Regular rest schedule
      for (let i = 0; i < 30; i += 7) {
        restDays.push(addDays(new Date(), i));
      }
    }

    return restDays;
  }

  private planIntensiveWeeks(metrics: PerformanceMetrics[]): Date[] {
    // Identify weeks for intensive study based on exam proximity and weak areas
    const intensiveWeeks: Date[] = [];
    const weakAreasCount = metrics.filter(m => m.recentAccuracy < 0.7).length;
    
    if (weakAreasCount > 3) {
      // Schedule intensive weeks every 2 weeks
      for (let i = 0; i < 12; i += 2) {
        intensiveWeeks.push(addDays(new Date(), i * 7));
      }
    }

    return intensiveWeeks;
  }

  private isStudyDay(
    date: Date,
    preferences: UserPreferences,
    optimization: ScheduleOptimization
  ): boolean {
    const dayOfWeek = date.getDay();
    const isPreferredDay = preferences.preferredDays.includes(dayOfWeek);
    const isRestDay = optimization.restDays.some(restDay => 
      format(restDay, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return isPreferredDay && !isRestDay;
  }

  private async generateDailySessions(
    userId: number,
    date: Date,
    preferences: UserPreferences,
    metrics: PerformanceMetrics[],
    optimization: ScheduleOptimization
  ): Promise<StudySession[]> {
    const sessions: StudySession[] = [];
    const dailyGoal = preferences.dailyStudyGoal;
    let remainingTime = dailyGoal;
    
    const priorityAreas = optimization.priorityAreas.slice(0, 3); // Top 3 priority areas
    
    for (const area of priorityAreas) {
      if (remainingTime <= 0) break;
      
      const sessionDuration = Math.min(
        preferences.maxSessionDuration,
        Math.floor(remainingTime * (area.timeAllocation / 100))
      );
      
      if (sessionDuration >= 15) { // Minimum 15-minute sessions
        const session = await this.createStudySession(
          userId,
          date,
          area.category,
          sessionDuration,
          metrics,
          optimization
        );
        sessions.push(session);
        remainingTime -= sessionDuration;
      }
    }

    return this.scheduleSessionTimes(sessions, date, preferences, optimization);
  }

  private async createStudySession(
    userId: number,
    date: Date,
    category: string,
    duration: number,
    metrics: PerformanceMetrics[],
    optimization: ScheduleOptimization
  ): Promise<StudySession> {
    const categoryMetric = metrics.find(m => m.category === category);
    const difficulty = this.determineDifficulty(categoryMetric, optimization);
    const sessionType = this.determineSessionType(categoryMetric);
    
    return {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      subject: 'PLAB Preparation',
      category,
      difficulty,
      scheduledStart: date,
      scheduledEnd: addHours(date, duration / 60),
      duration,
      priority: this.calculateSessionPriority(categoryMetric),
      sessionType,
      learningObjectives: this.generateLearningObjectives(category, difficulty),
      estimatedQuestions: Math.floor(duration / 2), // 2 minutes per question average
      completed: false
    };
  }

  private determineDifficulty(
    metric?: PerformanceMetrics,
    optimization?: ScheduleOptimization
  ): 'foundation' | 'intermediate' | 'advanced' {
    if (!metric) return 'foundation';
    
    if (metric.recentAccuracy < 0.6) return 'foundation';
    if (metric.recentAccuracy < 0.8) return 'intermediate';
    return 'advanced';
  }

  private determineSessionType(metric?: PerformanceMetrics): 'review' | 'learning' | 'practice' | 'assessment' {
    if (!metric) return 'learning';
    
    if (metric.masteryLevel < 30) return 'learning';
    if (metric.masteryLevel < 60) return 'practice';
    if (metric.masteryLevel < 80) return 'review';
    return 'assessment';
  }

  private calculateSessionPriority(metric?: PerformanceMetrics): 'low' | 'medium' | 'high' | 'critical' {
    if (!metric) return 'medium';
    
    if (metric.recentAccuracy < 0.5) return 'critical';
    if (metric.recentAccuracy < 0.7) return 'high';
    if (metric.masteryLevel < 50) return 'medium';
    return 'low';
  }

  private generateLearningObjectives(category: string, difficulty: string): string[] {
    const objectives: Record<string, Record<string, string[]>> = {
      'clinical-knowledge': {
        foundation: ['Understand basic pathophysiology', 'Learn common presentations', 'Master key terminology'],
        intermediate: ['Apply knowledge to case studies', 'Develop differential diagnosis skills', 'Understand treatment protocols'],
        advanced: ['Master complex case analysis', 'Integrate multiple systems', 'Apply evidence-based medicine']
      },
      'communication-skills': {
        foundation: ['Learn basic consultation structure', 'Practice active listening', 'Understand patient-centered care'],
        intermediate: ['Master difficult conversations', 'Develop empathy skills', 'Handle cultural sensitivity'],
        advanced: ['Lead team communications', 'Manage complex family dynamics', 'Navigate ethical dilemmas']
      }
    };

    return objectives[category]?.[difficulty] || ['Review key concepts', 'Practice application', 'Assess understanding'];
  }

  private scheduleSessionTimes(
    sessions: StudySession[],
    date: Date,
    preferences: UserPreferences,
    optimization: ScheduleOptimization
  ): StudySession[] {
    const optimalTimes = optimization.optimalTimes.filter(time => 
      time.hour >= preferences.preferredStudyHours.start && 
      time.hour <= preferences.preferredStudyHours.end
    );

    let currentTimeSlot = 0;
    
    return sessions.map(session => {
      if (currentTimeSlot >= optimalTimes.length) currentTimeSlot = 0;
      
      const optimalTime = optimalTimes[currentTimeSlot];
      const startTime = new Date(date);
      startTime.setHours(optimalTime.hour, 0, 0, 0);
      
      const endTime = addHours(startTime, session.duration / 60);
      
      currentTimeSlot++;
      
      return {
        ...session,
        scheduledStart: startTime,
        scheduledEnd: endTime
      };
    });
  }

  private optimizeSessionSequencing(
    sessions: StudySession[],
    metrics: PerformanceMetrics[]
  ): StudySession[] {
    // Apply spaced repetition and difficulty optimization
    return sessions.sort((a, b) => {
      // Prioritize by urgency first
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by scheduled time
      return a.scheduledStart.getTime() - b.scheduledStart.getTime();
    });
  }

  async adaptScheduleBasedOnPerformance(
    userId: number,
    sessions: StudySession[],
    recentPerformance: PerformanceMetrics[]
  ): Promise<StudySession[]> {
    const adaptedSessions = [...sessions];
    
    for (const session of adaptedSessions) {
      if (!session.completed) {
        const categoryMetric = recentPerformance.find(m => m.category === session.category);
        
        if (categoryMetric) {
          // Adjust difficulty based on recent performance
          if (categoryMetric.recentAccuracy > this.DIFFICULTY_PROGRESSION_THRESHOLD) {
            session.difficulty = this.increaseDifficulty(session.difficulty);
          } else if (categoryMetric.recentAccuracy < 0.6) {
            session.difficulty = this.decreaseDifficulty(session.difficulty);
          }
          
          // Adjust session type based on mastery level
          session.sessionType = this.determineSessionType(categoryMetric);
          
          // Update learning objectives
          session.learningObjectives = this.generateLearningObjectives(session.category, session.difficulty);
        }
      }
    }
    
    return adaptedSessions;
  }

  private increaseDifficulty(current: string): 'foundation' | 'intermediate' | 'advanced' {
    if (current === 'foundation') return 'intermediate';
    if (current === 'intermediate') return 'advanced';
    return 'advanced';
  }

  private decreaseDifficulty(current: string): 'foundation' | 'intermediate' | 'advanced' {
    if (current === 'advanced') return 'intermediate';
    if (current === 'intermediate') return 'foundation';
    return 'foundation';
  }

  async generateStudyReminders(sessions: StudySession[]): Promise<{
    sessionId: string;
    reminderTime: Date;
    message: string;
    type: 'preparation' | 'start' | 'break' | 'review';
  }[]> {
    const reminders = [];
    
    for (const session of sessions) {
      if (!session.completed) {
        // Preparation reminder (30 minutes before)
        reminders.push({
          sessionId: session.id,
          reminderTime: addHours(session.scheduledStart, -0.5),
          message: `Prepare for ${session.category} study session in 30 minutes. Difficulty: ${session.difficulty}`,
          type: 'preparation' as const
        });
        
        // Start reminder
        reminders.push({
          sessionId: session.id,
          reminderTime: session.scheduledStart,
          message: `Time to start your ${session.category} study session. Focus on: ${session.learningObjectives.join(', ')}`,
          type: 'start' as const
        });
        
        // Break reminder (if session > 45 minutes)
        if (session.duration > 45) {
          reminders.push({
            sessionId: session.id,
            reminderTime: addHours(session.scheduledStart, 0.75),
            message: `Take a 5-minute break to maintain focus and retention`,
            type: 'break' as const
          });
        }
        
        // Review reminder (24 hours after)
        reminders.push({
          sessionId: session.id,
          reminderTime: addHours(session.scheduledEnd, 24),
          message: `Review yesterday's ${session.category} material for better retention`,
          type: 'review' as const
        });
      }
    }
    
    return reminders.sort((a, b) => a.reminderTime.getTime() - b.reminderTime.getTime());
  }
}

export const studyScheduleOptimizer = new StudyScheduleOptimizer();
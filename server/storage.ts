import { 
  users, questions, userProgress, studyPlan, communityPosts, postReplies, 
  osceStations, userOsceAttempts,
  type User, type InsertUser, type Question, type InsertQuestion,
  type UserProgress, type InsertUserProgress, type StudyPlan, type InsertStudyPlan,
  type CommunityPost, type InsertCommunityPost, type PostReply, type InsertPostReply,
  type OsceStation, type InsertOsceStation, type UserOsceAttempt, type InsertUserOsceAttempt
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Questions
  getQuestions(examType: string, category?: string, limit?: number): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  // User Progress
  getUserProgress(userId: number): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserStats(userId: number): Promise<{
    totalAnswered: number;
    correctAnswers: number;
    averageTime: number;
    categoryStats: Record<string, { correct: number; total: number }>;
  }>;

  // Study Plan
  getUserStudyPlan(userId: number, date: string): Promise<StudyPlan | undefined>;
  createStudyPlan(plan: InsertStudyPlan): Promise<StudyPlan>;
  updateStudyPlan(id: number, updates: Partial<StudyPlan>): Promise<StudyPlan | undefined>;

  // Community
  getCommunityPosts(category?: string, limit?: number): Promise<(CommunityPost & { author: Pick<User, 'username'> })[]>;
  getCommunityPost(id: number): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getPostReplies(postId: number): Promise<(PostReply & { author: Pick<User, 'username'> })[]>;
  createPostReply(reply: InsertPostReply): Promise<PostReply>;

  // OSCE Stations
  getOsceStations(): Promise<OsceStation[]>;
  getOsceStation(id: number): Promise<OsceStation | undefined>;
  createOsceStation(station: InsertOsceStation): Promise<OsceStation>;
  getUserOsceAttempts(userId: number): Promise<UserOsceAttempt[]>;
  createUserOsceAttempt(attempt: InsertUserOsceAttempt): Promise<UserOsceAttempt>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private questions: Map<number, Question> = new Map();
  private userProgress: Map<number, UserProgress> = new Map();
  private studyPlans: Map<number, StudyPlan> = new Map();
  private communityPosts: Map<number, CommunityPost> = new Map();
  private postReplies: Map<number, PostReply> = new Map();
  private osceStations: Map<number, OsceStation> = new Map();
  private userOsceAttempts: Map<number, UserOsceAttempt> = new Map();
  
  private currentUserId = 1;
  private currentQuestionId = 1;
  private currentProgressId = 1;
  private currentPlanId = 1;
  private currentPostId = 1;
  private currentReplyId = 1;
  private currentStationId = 1;
  private currentAttemptId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create demo user
    const demoUser: User = {
      id: 1,
      email: "demo@plabmaster.com",
      username: "DemoUser",
      password: "password123",
      currentStage: "plab1",
      studyStreak: 7,
      totalPoints: 245,
      createdAt: new Date()
    };
    this.users.set(1, demoUser);
    this.currentUserId = 2; // Next user will get ID 2

    // Create sample questions
    const sampleQuestions: InsertQuestion[] = [
      {
        type: "mcq",
        category: "cardiology",
        difficulty: "medium",
        content: "A 65-year-old man presents with severe central chest pain that started 2 hours ago. The pain is crushing in nature and radiates to his left arm and jaw. His ECG shows ST elevation in leads II, III, and aVF. What is the most likely diagnosis?",
        options: [
          "Anterior myocardial infarction",
          "Inferior myocardial infarction", 
          "Pulmonary embolism",
          "Unstable angina",
          "Aortic dissection"
        ],
        correctAnswer: "Inferior myocardial infarction",
        explanation: "ST elevation in leads II, III, and aVF indicates an inferior STEMI, typically caused by occlusion of the right coronary artery.",
        examType: "plab1"
      },
      {
        type: "mcq",
        category: "respiratory",
        difficulty: "easy",
        content: "A 28-year-old woman presents with sudden onset shortness of breath and pleuritic chest pain. She is on oral contraceptives. What is the most appropriate immediate investigation?",
        options: [
          "Chest X-ray",
          "ECG",
          "D-dimer",
          "CTPA",
          "Arterial blood gas"
        ],
        correctAnswer: "CTPA",
        explanation: "Young woman on oral contraceptives with acute onset pleuritic chest pain and dyspnea has high probability for PE. CTPA is the gold standard investigation.",
        examType: "plab1"
      },
      {
        type: "mcq",
        category: "endocrinology",
        difficulty: "hard",
        content: "A 45-year-old woman presents with weight gain, moon face, and purple striae. Her 24-hour urinary free cortisol is elevated. What is the next most appropriate test?",
        options: [
          "Dexamethasone suppression test",
          "ACTH level",
          "MRI pituitary",
          "CT adrenals",
          "Midnight salivary cortisol"
        ],
        correctAnswer: "Dexamethasone suppression test",
        explanation: "After confirming hypercortisolism, the next step is to determine if it's ACTH-dependent or independent using dexamethasone suppression test.",
        examType: "plab1"
      }
    ];

    sampleQuestions.forEach(q => this.createQuestion(q));

    // Create sample OSCE stations
    const sampleStations: InsertOsceStation[] = [
      {
        title: "History Taking - Chest Pain",
        category: "history-taking",
        description: "Take a focused history from a patient presenting with chest pain in the emergency department",
        timeLimit: 8,
        markingCriteria: {
          structure: ["Introduction", "Presenting complaint", "History of presenting complaint", "Past medical history", "Social history"],
          communication: ["Appropriate body language", "Active listening", "Empathy", "Clear questions"],
          clinical: ["Systematic approach", "Relevant questions", "Risk factor assessment"]
        },
        patientInfo: {
          name: "John Smith",
          age: 55,
          presenting_complaint: "Chest pain for 3 hours",
          setting: "Emergency Department"
        }
      },
      {
        title: "Breaking Bad News",
        category: "communication",
        description: "Break bad news to a patient about their recent diagnosis",
        timeLimit: 10,
        markingCriteria: {
          structure: ["SPIKES framework", "Setting preparation", "Perception assessment", "Information sharing", "Emotional response", "Strategy planning"],
          communication: ["Empathy", "Clear language", "Appropriate pace", "Active listening"],
          clinical: ["Accurate information", "Support offered", "Follow-up arranged"]
        },
        patientInfo: {
          name: "Mary Johnson",
          age: 62,
          diagnosis: "Breast cancer",
          setting: "Outpatient clinic"
        }
      }
    ];

    sampleStations.forEach(s => this.createOsceStation(s));

    // Create sample community posts
    const samplePosts: InsertCommunityPost[] = [
      {
        userId: 1,
        title: "PLAB 1 Success! Here's how I prepared",
        content: "Just passed PLAB 1 with 78%! Here are the key strategies that helped me succeed...",
        category: "success-stories"
      },
      {
        userId: 1,
        title: "Struggling with cardiology MCQs - any tips?",
        content: "I'm consistently scoring low on cardiology questions. Any recommendations for study resources?",
        category: "plab1"
      }
    ];

    samplePosts.forEach(p => this.createCommunityPost(p));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      studyStreak: 0,
      totalPoints: 0,
      createdAt: new Date(),
      currentStage: insertUser.currentStage || 'plab1'
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Question methods
  async getQuestions(examType: string, category?: string, limit = 20): Promise<Question[]> {
    let filtered = Array.from(this.questions.values()).filter(q => q.examType === examType);
    
    if (category) {
      filtered = filtered.filter(q => q.category === category);
    }
    
    return filtered.slice(0, limit);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { 
      ...insertQuestion, 
      id,
      options: insertQuestion.options || []
    };
    this.questions.set(id, question);
    return question;
  }

  // User Progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(p => p.userId === userId);
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = {
      ...insertProgress,
      id,
      attemptedAt: new Date()
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async getUserStats(userId: number): Promise<{
    totalAnswered: number;
    correctAnswers: number;
    averageTime: number;
    categoryStats: Record<string, { correct: number; total: number }>;
  }> {
    const userProgressList = await this.getUserProgress(userId);
    const totalAnswered = userProgressList.length;
    const correctAnswers = userProgressList.filter(p => p.isCorrect).length;
    const averageTime = userProgressList.reduce((sum, p) => sum + p.timeSpent, 0) / totalAnswered || 0;
    
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    
    for (const progress of userProgressList) {
      const question = await this.getQuestion(progress.questionId);
      if (question) {
        if (!categoryStats[question.category]) {
          categoryStats[question.category] = { correct: 0, total: 0 };
        }
        categoryStats[question.category].total++;
        if (progress.isCorrect) {
          categoryStats[question.category].correct++;
        }
      }
    }

    return { totalAnswered, correctAnswers, averageTime, categoryStats };
  }

  // Study Plan methods
  async getUserStudyPlan(userId: number, date: string): Promise<StudyPlan | undefined> {
    return Array.from(this.studyPlans.values()).find(p => p.userId === userId && p.date === date);
  }

  async createStudyPlan(insertPlan: InsertStudyPlan): Promise<StudyPlan> {
    const id = this.currentPlanId++;
    const plan: StudyPlan = { 
      ...insertPlan, 
      id,
      completed: insertPlan.completed || false
    };
    this.studyPlans.set(id, plan);
    return plan;
  }

  async updateStudyPlan(id: number, updates: Partial<StudyPlan>): Promise<StudyPlan | undefined> {
    const plan = this.studyPlans.get(id);
    if (!plan) return undefined;
    
    const updatedPlan = { ...plan, ...updates };
    this.studyPlans.set(id, updatedPlan);
    return updatedPlan;
  }

  // Community methods
  async getCommunityPosts(category?: string, limit = 20): Promise<(CommunityPost & { author: Pick<User, 'username'> })[]> {
    let filtered = Array.from(this.communityPosts.values());
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return filtered.slice(0, limit).map(post => {
      const author = this.users.get(post.userId);
      return {
        ...post,
        author: { username: author?.username || 'Unknown User' }
      };
    });
  }

  async getCommunityPost(id: number): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const id = this.currentPostId++;
    const post: CommunityPost = {
      ...insertPost,
      id,
      likes: 0,
      replies: 0,
      createdAt: new Date()
    };
    this.communityPosts.set(id, post);
    return post;
  }

  async getPostReplies(postId: number): Promise<(PostReply & { author: Pick<User, 'username'> })[]> {
    const replies = Array.from(this.postReplies.values()).filter(r => r.postId === postId);
    return replies.map(reply => {
      const author = this.users.get(reply.userId);
      return {
        ...reply,
        author: { username: author?.username || 'Unknown User' }
      };
    });
  }

  async createPostReply(insertReply: InsertPostReply): Promise<PostReply> {
    const id = this.currentReplyId++;
    const reply: PostReply = {
      ...insertReply,
      id,
      createdAt: new Date()
    };
    this.postReplies.set(id, reply);
    return reply;
  }

  // OSCE methods
  async getOsceStations(): Promise<OsceStation[]> {
    return Array.from(this.osceStations.values());
  }

  async getOsceStation(id: number): Promise<OsceStation | undefined> {
    return this.osceStations.get(id);
  }

  async createOsceStation(insertStation: InsertOsceStation): Promise<OsceStation> {
    const id = this.currentStationId++;
    const station: OsceStation = { ...insertStation, id };
    this.osceStations.set(id, station);
    return station;
  }

  async getUserOsceAttempts(userId: number): Promise<UserOsceAttempt[]> {
    return Array.from(this.userOsceAttempts.values()).filter(a => a.userId === userId);
  }

  async createUserOsceAttempt(insertAttempt: InsertUserOsceAttempt): Promise<UserOsceAttempt> {
    const id = this.currentAttemptId++;
    const attempt: UserOsceAttempt = {
      ...insertAttempt,
      id,
      completedAt: new Date(),
      feedback: insertAttempt.feedback || null
    };
    this.userOsceAttempts.set(id, attempt);
    return attempt;
  }
}



export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        currentStage: insertUser.currentStage || 'plab1'
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getQuestions(examType: string, category?: string, limit = 20): Promise<Question[]> {
    if (category) {
      return await db.select().from(questions)
        .where(and(eq(questions.examType, examType), eq(questions.category, category)))
        .limit(limit);
    }
    
    return await db.select().from(questions)
      .where(eq(questions.examType, examType))
      .limit(limit);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question || undefined;
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questions)
      .values({
        ...insertQuestion,
        options: insertQuestion.options || []
      })
      .returning();
    return question;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async getUserStats(userId: number): Promise<{
    totalAnswered: number;
    correctAnswers: number;
    averageTime: number;
    categoryStats: Record<string, { correct: number; total: number }>;
  }> {
    const progressData = await this.getUserProgress(userId);
    
    const totalAnswered = progressData.length;
    const correctAnswers = progressData.filter(p => p.isCorrect).length;
    const averageTime = progressData.length > 0 
      ? progressData.reduce((acc, p) => acc + p.timeSpent, 0) / progressData.length 
      : 0;

    const categoryStats: Record<string, { correct: number; total: number }> = {};
    
    for (const progress of progressData) {
      const question = await this.getQuestion(progress.questionId);
      if (question) {
        if (!categoryStats[question.category]) {
          categoryStats[question.category] = { correct: 0, total: 0 };
        }
        categoryStats[question.category].total++;
        if (progress.isCorrect) {
          categoryStats[question.category].correct++;
        }
      }
    }

    return { totalAnswered, correctAnswers, averageTime, categoryStats };
  }

  async getUserStudyPlan(userId: number, date: string): Promise<StudyPlan | undefined> {
    const [plan] = await db
      .select()
      .from(studyPlan)
      .where(and(eq(studyPlan.userId, userId), eq(studyPlan.date, date)));
    return plan || undefined;
  }

  async createStudyPlan(insertPlan: InsertStudyPlan): Promise<StudyPlan> {
    const [plan] = await db
      .insert(studyPlan)
      .values({
        ...insertPlan,
        completed: insertPlan.completed || false
      })
      .returning();
    return plan;
  }

  async updateStudyPlan(id: number, updates: Partial<StudyPlan>): Promise<StudyPlan | undefined> {
    const [plan] = await db
      .update(studyPlan)
      .set(updates)
      .where(eq(studyPlan.id, id))
      .returning();
    return plan || undefined;
  }

  async getCommunityPosts(category?: string, limit = 20): Promise<(CommunityPost & { author: Pick<User, 'username'> })[]> {
    let query = db
      .select({
        id: communityPosts.id,
        userId: communityPosts.userId,
        title: communityPosts.title,
        content: communityPosts.content,
        category: communityPosts.category,
        createdAt: communityPosts.createdAt,
        author: {
          username: users.username
        }
      })
      .from(communityPosts)
      .leftJoin(users, eq(communityPosts.userId, users.id));

    if (category) {
      query = query.where(eq(communityPosts.category, category));
    }

    const results = await query.limit(limit);
    return results as (CommunityPost & { author: Pick<User, 'username'> })[];
  }

  async getCommunityPost(id: number): Promise<CommunityPost | undefined> {
    const [post] = await db.select().from(communityPosts).where(eq(communityPosts.id, id));
    return post || undefined;
  }

  async createCommunityPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const [post] = await db
      .insert(communityPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getPostReplies(postId: number): Promise<(PostReply & { author: Pick<User, 'username'> })[]> {
    const results = await db
      .select({
        id: postReplies.id,
        postId: postReplies.postId,
        userId: postReplies.userId,
        content: postReplies.content,
        createdAt: postReplies.createdAt,
        author: {
          username: users.username
        }
      })
      .from(postReplies)
      .leftJoin(users, eq(postReplies.userId, users.id))
      .where(eq(postReplies.postId, postId));

    return results as (PostReply & { author: Pick<User, 'username'> })[];
  }

  async createPostReply(insertReply: InsertPostReply): Promise<PostReply> {
    const [reply] = await db
      .insert(postReplies)
      .values(insertReply)
      .returning();
    return reply;
  }

  async getOsceStations(): Promise<OsceStation[]> {
    return await db.select().from(osceStations);
  }

  async getOsceStation(id: number): Promise<OsceStation | undefined> {
    const [station] = await db.select().from(osceStations).where(eq(osceStations.id, id));
    return station || undefined;
  }

  async createOsceStation(insertStation: InsertOsceStation): Promise<OsceStation> {
    const [station] = await db
      .insert(osceStations)
      .values(insertStation)
      .returning();
    return station;
  }

  async getUserOsceAttempts(userId: number): Promise<UserOsceAttempt[]> {
    return await db.select().from(userOsceAttempts).where(eq(userOsceAttempts.userId, userId));
  }

  async createUserOsceAttempt(insertAttempt: InsertUserOsceAttempt): Promise<UserOsceAttempt> {
    const [attempt] = await db
      .insert(userOsceAttempts)
      .values({
        ...insertAttempt,
        feedback: insertAttempt.feedback || null
      })
      .returning();
    return attempt;
  }
}

export const storage = new DatabaseStorage();

// Real-Time Video Consultation System for PLAB Preparation
// Live OSCE practice sessions with qualified UK doctors

export interface ConsultationSession {
  id: string;
  doctorId: number;
  studentId: number;
  type: 'osce-practice' | 'feedback-session' | 'group-study' | 'clinical-assessment';
  duration: number; // minutes
  scheduledTime: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  price: number; // in pence
  speciality: string;
  language: string;
  roomId: string;
  recordingEnabled: boolean;
  sessionNotes?: string;
  feedback?: {
    clinicalSkills: number;
    communication: number;
    professionalism: number;
    overallScore: number;
    detailedFeedback: string;
    improvementAreas: string[];
    strengths: string[];
  };
}

export interface QualifiedDoctor {
  id: number;
  name: string;
  qualifications: string[];
  specialities: string[];
  languages: string[];
  experience: number; // years
  rating: number; // 0-5
  reviewCount: number;
  hourlyRate: number; // in pence
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    timezone: string;
  }[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  gmcNumber: string;
  profileImage: string;
  bio: string;
  sessionTypes: string[];
}

export interface GroupStudySession {
  id: string;
  title: string;
  description: string;
  hostId: number;
  participants: {
    userId: number;
    joinedAt: Date;
    role: 'host' | 'participant' | 'observer';
  }[];
  maxParticipants: number;
  scheduledTime: Date;
  duration: number;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  isPublic: boolean;
  roomId: string;
  resources: {
    type: 'document' | 'video' | 'quiz' | 'case-study';
    title: string;
    url: string;
  }[];
}

export class VideoConsultationEngine {
  
  // Find available doctors based on criteria
  async findAvailableDoctors(criteria: {
    speciality?: string;
    language?: string;
    dateRange: { start: Date; end: Date };
    sessionType: string;
    maxPrice?: number;
  }): Promise<QualifiedDoctor[]> {
    
    // Sample qualified doctors database
    const doctors: QualifiedDoctor[] = [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        qualifications: ["MBBS", "MRCP", "PLAB 1 & 2 Examiner"],
        specialities: ["General Medicine", "Cardiology", "OSCE Training"],
        languages: ["English", "Arabic"],
        experience: 12,
        rating: 4.9,
        reviewCount: 127,
        hourlyRate: 8000, // £80/hour
        availability: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", timezone: "GMT" },
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", timezone: "GMT" },
          { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", timezone: "GMT" }
        ],
        verificationStatus: "verified",
        gmcNumber: "7123456",
        profileImage: "/api/placeholder/doctor1.jpg",
        bio: "Experienced PLAB examiner with 12 years of NHS experience. Specialises in helping international graduates succeed in PLAB 2 OSCE.",
        sessionTypes: ["osce-practice", "feedback-session", "clinical-assessment"]
      },
      {
        id: 2,
        name: "Dr. Amira Hassan",
        qualifications: ["MBBS", "MRCGP", "PLAB Coordinator"],
        specialities: ["General Practice", "Emergency Medicine", "Cultural Adaptation"],
        languages: ["English", "Arabic", "Urdu"],
        experience: 8,
        rating: 4.8,
        reviewCount: 94,
        hourlyRate: 7500, // £75/hour
        availability: [
          { dayOfWeek: 2, startTime: "18:00", endTime: "22:00", timezone: "GMT" },
          { dayOfWeek: 4, startTime: "18:00", endTime: "22:00", timezone: "GMT" },
          { dayOfWeek: 6, startTime: "10:00", endTime: "16:00", timezone: "GMT" }
        ],
        verificationStatus: "verified",
        gmcNumber: "7234567",
        profileImage: "/api/placeholder/doctor2.jpg",
        bio: "Bilingual GP with extensive experience helping international medical graduates adapt to UK clinical practice.",
        sessionTypes: ["osce-practice", "feedback-session", "group-study"]
      },
      {
        id: 3,
        name: "Dr. Rajesh Patel",
        qualifications: ["MBBS", "MRCP", "Medical Education Diploma"],
        specialities: ["Internal Medicine", "Diabetes", "Medical Education"],
        languages: ["English", "Hindi", "Gujarati"],
        experience: 15,
        rating: 4.95,
        reviewCount: 203,
        hourlyRate: 9000, // £90/hour
        availability: [
          { dayOfWeek: 1, startTime: "19:00", endTime: "23:00", timezone: "GMT" },
          { dayOfWeek: 3, startTime: "19:00", endTime: "23:00", timezone: "GMT" },
          { dayOfWeek: 7, startTime: "14:00", endTime: "18:00", timezone: "GMT" }
        ],
        verificationStatus: "verified",
        gmcNumber: "7345678",
        profileImage: "/api/placeholder/doctor3.jpg",
        bio: "Senior consultant with expertise in medical education and PLAB preparation. Fluent in multiple Indian languages.",
        sessionTypes: ["osce-practice", "feedback-session", "clinical-assessment", "group-study"]
      }
    ];

    // Filter doctors based on criteria
    return doctors.filter(doctor => {
      if (criteria.speciality && !doctor.specialities.some(spec => 
        spec.toLowerCase().includes(criteria.speciality!.toLowerCase()))) {
        return false;
      }
      
      if (criteria.language && !doctor.languages.includes(criteria.language)) {
        return false;
      }
      
      if (criteria.maxPrice && doctor.hourlyRate > criteria.maxPrice) {
        return false;
      }
      
      if (!doctor.sessionTypes.includes(criteria.sessionType)) {
        return false;
      }
      
      return doctor.verificationStatus === "verified";
    });
  }

  // Book a consultation session
  async bookConsultation(booking: {
    doctorId: number;
    studentId: number;
    sessionType: string;
    scheduledTime: Date;
    duration: number;
    speciality: string;
    language: string;
    notes?: string;
  }): Promise<ConsultationSession> {
    
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const roomId = `room_${sessionId}`;
    
    // Calculate price based on doctor's rate and duration
    const doctor = await this.getDoctorById(booking.doctorId);
    const price = Math.round((doctor.hourlyRate / 60) * booking.duration);
    
    const session: ConsultationSession = {
      id: sessionId,
      doctorId: booking.doctorId,
      studentId: booking.studentId,
      type: booking.sessionType as any,
      duration: booking.duration,
      scheduledTime: booking.scheduledTime,
      status: 'scheduled',
      price,
      speciality: booking.speciality,
      language: booking.language,
      roomId,
      recordingEnabled: true,
      sessionNotes: booking.notes
    };

    // In real implementation, save to database
    return session;
  }

  // Create group study session
  async createGroupStudySession(sessionData: {
    hostId: number;
    title: string;
    description: string;
    scheduledTime: Date;
    duration: number;
    topic: string;
    difficulty: string;
    language: string;
    maxParticipants: number;
    isPublic: boolean;
  }): Promise<GroupStudySession> {
    
    const sessionId = `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const roomId = `room_${sessionId}`;
    
    const groupSession: GroupStudySession = {
      id: sessionId,
      title: sessionData.title,
      description: sessionData.description,
      hostId: sessionData.hostId,
      participants: [
        { userId: sessionData.hostId, joinedAt: new Date(), role: 'host' }
      ],
      maxParticipants: sessionData.maxParticipants,
      scheduledTime: sessionData.scheduledTime,
      duration: sessionData.duration,
      topic: sessionData.topic,
      difficulty: sessionData.difficulty as any,
      language: sessionData.language,
      isPublic: sessionData.isPublic,
      roomId,
      resources: []
    };

    return groupSession;
  }

  // Generate video room credentials
  async generateRoomCredentials(sessionId: string, userId: number): Promise<{
    roomId: string;
    token: string;
    iceServers: any[];
    recordingEnabled: boolean;
  }> {
    
    // In real implementation, integrate with video service like Agora, Twilio, or Daily.co
    return {
      roomId: `room_${sessionId}`,
      token: `token_${userId}_${Date.now()}`,
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'turn:turn.example.com:3478', username: 'user', credential: 'pass' }
      ],
      recordingEnabled: true
    };
  }

  // Complete session with feedback
  async completeSession(sessionId: string, feedback: {
    clinicalSkills: number;
    communication: number;
    professionalism: number;
    detailedFeedback: string;
    improvementAreas: string[];
    strengths: string[];
  }): Promise<ConsultationSession> {
    
    // In real implementation, update session in database
    const overallScore = Math.round(
      (feedback.clinicalSkills + feedback.communication + feedback.professionalism) / 3
    );

    const session: ConsultationSession = {
      id: sessionId,
      doctorId: 1,
      studentId: 1,
      type: 'osce-practice',
      duration: 30,
      scheduledTime: new Date(),
      status: 'completed',
      price: 4000,
      speciality: 'General Medicine',
      language: 'English',
      roomId: `room_${sessionId}`,
      recordingEnabled: true,
      feedback: {
        ...feedback,
        overallScore
      }
    };

    return session;
  }

  // Get doctor by ID
  private async getDoctorById(doctorId: number): Promise<QualifiedDoctor> {
    // Sample implementation - in real app, fetch from database
    return {
      id: doctorId,
      name: "Dr. Sample",
      qualifications: ["MBBS"],
      specialities: ["General Medicine"],
      languages: ["English"],
      experience: 5,
      rating: 4.5,
      reviewCount: 50,
      hourlyRate: 8000,
      availability: [],
      verificationStatus: "verified",
      gmcNumber: "7123456",
      profileImage: "/api/placeholder/doctor.jpg",
      bio: "Experienced doctor",
      sessionTypes: ["osce-practice"]
    };
  }

  // Search group study sessions
  async searchGroupSessions(criteria: {
    topic?: string;
    language?: string;
    difficulty?: string;
    dateRange: { start: Date; end: Date };
  }): Promise<GroupStudySession[]> {
    
    // Sample group sessions
    const sessions: GroupStudySession[] = [
      {
        id: "group_1",
        title: "PLAB 2 Cardiology OSCE Practice",
        description: "Practice cardiology examination scenarios with international peers",
        hostId: 101,
        participants: [
          { userId: 101, joinedAt: new Date(), role: 'host' },
          { userId: 102, joinedAt: new Date(), role: 'participant' },
          { userId: 103, joinedAt: new Date(), role: 'participant' }
        ],
        maxParticipants: 6,
        scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 90,
        topic: "Cardiology OSCE",
        difficulty: "intermediate",
        language: "English",
        isPublic: true,
        roomId: "room_group_1",
        resources: [
          { type: "document", title: "Cardiology Examination Checklist", url: "/resources/cardio-checklist.pdf" },
          { type: "video", title: "Heart Auscultation Techniques", url: "/resources/heart-sounds.mp4" }
        ]
      },
      {
        id: "group_2", 
        title: "NHS Communication Skills - Arabic Speakers",
        description: "Practice patient communication in English for Arabic-speaking doctors",
        hostId: 104,
        participants: [
          { userId: 104, joinedAt: new Date(), role: 'host' },
          { userId: 105, joinedAt: new Date(), role: 'participant' }
        ],
        maxParticipants: 8,
        scheduledTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
        duration: 60,
        topic: "Communication Skills",
        difficulty: "beginner",
        language: "Arabic/English",
        isPublic: true,
        roomId: "room_group_2",
        resources: [
          { type: "document", title: "NHS Communication Guidelines", url: "/resources/nhs-communication.pdf" }
        ]
      }
    ];

    return sessions.filter(session => {
      if (criteria.topic && !session.topic.toLowerCase().includes(criteria.topic.toLowerCase())) {
        return false;
      }
      
      if (criteria.language && !session.language.toLowerCase().includes(criteria.language.toLowerCase())) {
        return false;
      }
      
      if (criteria.difficulty && session.difficulty !== criteria.difficulty) {
        return false;
      }
      
      const sessionTime = session.scheduledTime.getTime();
      return sessionTime >= criteria.dateRange.start.getTime() && 
             sessionTime <= criteria.dateRange.end.getTime();
    });
  }
}
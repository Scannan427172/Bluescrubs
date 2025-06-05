import OpenAI from "openai";
import { storage } from "./storage";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface MentorProfile {
  id: number;
  name: string;
  specialties: string[];
  currentPosition: string;
  plabPassDate: string;
  rating: number;
  totalSessions: number;
  hourlyRate: number;
  bio: string;
  availability: string;
  location: string;
  languages: string[];
  verified: boolean;
  responseTime: string;
  successStories: number;
  teachingStyle: string;
  experience: number; // years since PLAB
}

export interface MentorSession {
  id: string;
  mentorId: number;
  studentId: number;
  scheduledDate: Date;
  duration: number;
  sessionType: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  rating?: number;
  feedback?: string;
}

export async function findMatchingMentors(
  userProfile: {
    weakAreas: string[];
    learningStyle: string;
    availability: string;
    budget: number;
    language: string;
    specificNeeds: string[];
  }
): Promise<{
  recommendedMentors: MentorProfile[];
  matchingReasons: { [mentorId: number]: string[] };
  aiRecommendation: string;
}> {
  try {
    // Get all available mentors (would be from database in real implementation)
    const allMentors = await getMentorProfiles();
    
    const matchingPrompt = `
Based on this student's profile, recommend the best mentors and explain why:

Student Profile:
- Weak areas: ${userProfile.weakAreas.join(', ')}
- Learning style: ${userProfile.learningStyle}
- Availability: ${userProfile.availability}
- Budget: £${userProfile.budget}/hour
- Preferred language: ${userProfile.language}
- Specific needs: ${userProfile.specificNeeds.join(', ')}

Available Mentors:
${allMentors.map(mentor => `
ID: ${mentor.id}
Name: ${mentor.name}
Specialties: ${mentor.specialties.join(', ')}
Rate: £${mentor.hourlyRate}/hour
Languages: ${mentor.languages.join(', ')}
Teaching Style: ${mentor.teachingStyle}
Success Rate: ${mentor.successStories} students helped
`).join('\n')}

Provide mentor recommendations with specific matching reasons and overall guidance.

Respond in JSON format:
{
  "recommendedMentorIds": [1, 2, 3],
  "matchingReasons": {
    "1": ["reason1", "reason2"],
    "2": ["reason1", "reason2"]
  },
  "aiRecommendation": "detailed recommendation text"
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert mentor matching system for medical professionals preparing for PLAB examinations."
        },
        {
          role: "user",
          content: matchingPrompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const aiResult = JSON.parse(response.choices[0].message.content || "{}");
    
    // Filter and sort mentors based on AI recommendations
    const recommendedMentors = allMentors
      .filter(mentor => 
        aiResult.recommendedMentorIds?.includes(mentor.id) &&
        mentor.hourlyRate <= userProfile.budget &&
        mentor.languages.includes(userProfile.language)
      )
      .sort((a, b) => b.rating - a.rating);

    return {
      recommendedMentors,
      matchingReasons: aiResult.matchingReasons || {},
      aiRecommendation: aiResult.aiRecommendation || "Based on your profile, these mentors align well with your learning goals and requirements."
    };

  } catch (error) {
    console.error("Error finding matching mentors:", error);
    
    // Fallback to basic filtering
    const allMentors = await getMentorProfiles();
    const filteredMentors = allMentors
      .filter(mentor => 
        mentor.hourlyRate <= userProfile.budget &&
        mentor.languages.includes(userProfile.language)
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    return {
      recommendedMentors: filteredMentors,
      matchingReasons: {},
      aiRecommendation: "These mentors match your basic criteria. Consider booking a consultation to find the best fit."
    };
  }
}

export async function generateSessionPlan(
  mentorProfile: MentorProfile,
  studentWeakAreas: string[],
  sessionType: string,
  duration: number
): Promise<{
  sessionObjectives: string[];
  recommendedActivities: string[];
  preparationTips: string[];
  followUpActions: string[];
}> {
  try {
    const prompt = `
Create a detailed session plan for a PLAB mentoring session:

Mentor: ${mentorProfile.name}
Specialties: ${mentorProfile.specialties.join(', ')}
Teaching Style: ${mentorProfile.teachingStyle}

Student's weak areas: ${studentWeakAreas.join(', ')}
Session type: ${sessionType}
Duration: ${duration} minutes

Create specific objectives, activities, preparation tips, and follow-up actions.

Respond in JSON format:
{
  "sessionObjectives": ["objective1", "objective2"],
  "recommendedActivities": ["activity1", "activity2"],
  "preparationTips": ["tip1", "tip2"],
  "followUpActions": ["action1", "action2"]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 800
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error generating session plan:", error);
    return {
      sessionObjectives: [
        "Review weak areas identified in assessment",
        "Practice key examination techniques",
        "Improve communication skills"
      ],
      recommendedActivities: [
        "Mock OSCE station practice",
        "Case-based discussions",
        "Feedback and improvement planning"
      ],
      preparationTips: [
        "Review relevant clinical guidelines",
        "Prepare specific questions",
        "Practice basic examination skills"
      ],
      followUpActions: [
        "Complete recommended practice questions",
        "Schedule follow-up session",
        "Implement feedback suggestions"
      ]
    };
  }
}

export async function getMentorProfiles(): Promise<MentorProfile[]> {
  // In real implementation, this would fetch from database
  return [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialties: ["Internal Medicine", "Cardiology"],
      currentPosition: "ST4 Cardiology, Royal London Hospital",
      plabPassDate: "2022-03-15",
      rating: 4.9,
      totalSessions: 156,
      hourlyRate: 25,
      bio: "Passed PLAB 1 and 2 on first attempt. Now helping international doctors navigate the UK healthcare system.",
      availability: "Weekends and evenings",
      location: "London, UK",
      languages: ["English", "Hindi", "Gujarati"],
      verified: true,
      responseTime: "2 hours",
      successStories: 23,
      teachingStyle: "Interactive and encouraging",
      experience: 3
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      specialties: ["Emergency Medicine", "OSCE Skills"],
      currentPosition: "Emergency Registrar, Manchester Royal Infirmary",
      plabPassDate: "2021-08-22",
      rating: 4.8,
      totalSessions: 203,
      hourlyRate: 30,
      bio: "Emergency medicine doctor with extensive OSCE teaching experience. Helped 50+ doctors pass PLAB 2.",
      availability: "Flexible timing",
      location: "Manchester, UK",
      languages: ["English", "Arabic"],
      verified: true,
      responseTime: "1 hour",
      successStories: 47,
      teachingStyle: "Systematic and practical",
      experience: 4
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      specialties: ["Psychiatry", "Communication Skills"],
      currentPosition: "Consultant Psychiatrist, Birmingham",
      plabPassDate: "2020-11-10",
      rating: 4.7,
      totalSessions: 134,
      hourlyRate: 35,
      bio: "Psychiatrist with special interest in medical education. Focus on communication skills and professional development.",
      availability: "Weekday evenings",
      location: "Birmingham, UK",
      languages: ["English", "Spanish"],
      verified: true,
      responseTime: "3 hours",
      successStories: 31,
      teachingStyle: "Supportive and detailed",
      experience: 5
    }
  ];
}

export async function bookMentorSession(
  mentorId: number,
  studentId: number,
  sessionDetails: {
    date: Date;
    duration: number;
    sessionType: string;
    notes?: string;
  }
): Promise<MentorSession> {
  // Generate meeting link (would integrate with actual video service)
  const meetingLink = `https://meet.nhsprep.com/session/${Date.now()}`;
  
  const session: MentorSession = {
    id: `session_${Date.now()}`,
    mentorId,
    studentId,
    scheduledDate: sessionDetails.date,
    duration: sessionDetails.duration,
    sessionType: sessionDetails.sessionType,
    status: 'pending',
    meetingLink,
    notes: sessionDetails.notes
  };

  // In real implementation, would save to database
  console.log('Session booked:', session);
  
  return session;
}
import { db } from "./db";
import { 
  users,
  communityPosts, 
  communityComments, 
  communityStudyGroups,
  studyGroupMemberships,
  communityEvents,
  eventRegistrations,
  communityMentors,
  mentorSessions 
} from "@shared/schema";

const sampleUsers = [
  {
    id: "1",
    email: "aisha.patel@example.com",
    username: "DrAishaPatel",
    password: "hashed_password",
    currentStage: "PLAB2 Candidate",
    studyStreak: 15,
    totalPoints: 2450,
    country: "United Kingdom",
    city: "London",
    flagEmoji: "🇬🇧",
    timezone: "Europe/London",
    isLocationPublic: true
  },
  {
    id: "2", 
    email: "mohamed.hassan@example.com",
    username: "MedMohamed",
    password: "hashed_password",
    currentStage: "Junior Doctor",
    studyStreak: 8,
    totalPoints: 1820,
    country: "United Kingdom",
    city: "Manchester",
    flagEmoji: "🇬🇧",
    timezone: "Europe/London",
    isLocationPublic: true
  },
  {
    id: "3",
    email: "sarah.jones@example.com", 
    username: "SarahMD",
    password: "hashed_password",
    currentStage: "Consultant",
    studyStreak: 22,
    totalPoints: 3670,
    country: "United Kingdom",
    city: "Birmingham",
    flagEmoji: "🇬🇧",
    timezone: "Europe/London",
    isLocationPublic: true
  },
  {
    id: "4",
    email: "raj.kumar@example.com",
    username: "RajMedical",
    password: "hashed_password", 
    currentStage: "PLAB1 Candidate",
    studyStreak: 5,
    totalPoints: 890,
    country: "India",
    city: "Mumbai",
    flagEmoji: "🇮🇳",
    timezone: "Asia/Kolkata",
    isLocationPublic: true
  },
  {
    id: "5",
    email: "fatima.ali@example.com",
    username: "DrFatimaAli",
    password: "hashed_password",
    currentStage: "PLAB2 Candidate", 
    studyStreak: 12,
    totalPoints: 2130,
    country: "Pakistan",
    city: "Karachi",
    flagEmoji: "🇵🇰",
    timezone: "Asia/Karachi",
    isLocationPublic: true
  }
];

const samplePosts = [
  {
    authorId: 1,
    content: "Just passed my PLAB2 OSCE! The key was practicing with standardized patients and really focusing on communication skills. Happy to share study tips with anyone preparing. The clinical examination stations were challenging but manageable with proper preparation.",
    tags: ["plab2", "osce", "success-story", "communication-skills"]
  },
  {
    authorId: 2,
    content: "Starting my Foundation Year 1 rotation next month. Any advice from current FY1s about transitioning from medical school to actual practice? Particularly interested in tips for managing the on-call shifts and patient documentation.",
    tags: ["fy1", "foundation-year", "advice", "nhs"]
  },
  {
    authorId: 3,
    content: "Excellent webinar on evidence-based medicine this morning. The focus on critical appraisal skills is exactly what we need more of in medical education. Would recommend the RCP's upcoming series on clinical research methodology.",
    tags: ["evidence-based-medicine", "webinar", "education", "rcp"]
  },
  {
    authorId: 4,
    content: "PLAB1 preparation update: Completed 2000+ practice questions this month. Focusing heavily on pharmacology and ethics now. The GMC guidelines are extensive but essential reading. Anyone else finding the drug interactions particularly challenging?",
    tags: ["plab1", "pharmacology", "ethics", "gmc-guidelines"]
  },
  {
    authorId: 5,
    content: "Incredible experience shadowing in A&E this week. The multidisciplinary approach to patient care here in the UK is impressive. Learning so much about triage protocols and emergency management procedures.",
    tags: ["ae", "shadowing", "emergency-medicine", "uk-healthcare"]
  }
];

const sampleStudyGroups = [
  {
    name: "PLAB2 OSCE Practice Group",
    description: "Weekly practice sessions for PLAB2 OSCE preparation. We cover all stations including history taking, clinical examination, and communication skills with simulated patients.",
    specialty: "General Medicine",
    meetingTime: "Saturdays 10:00 AM GMT",
    location: "London (Central Library)",
    members: 8,
    maxMembers: 12,
    isPublic: true,
    creatorId: "1"
  },
  {
    name: "Cardiology Study Circle",
    description: "In-depth study sessions focusing on cardiovascular medicine. Perfect for FY2s preparing for specialty training applications and Core Medical Training.",
    specialty: "Cardiology", 
    meetingTime: "Wednesdays 7:00 PM GMT",
    location: "Manchester (Virtual/Hybrid)",
    members: 6,
    maxMembers: 10,
    isPublic: true,
    creatorId: "2"
  },
  {
    name: "Medical Ethics Discussion Forum",
    description: "Monthly discussions on complex medical ethics cases. Great for PLAB candidates and practicing doctors to explore ethical dilemmas in modern medicine.",
    specialty: "Medical Ethics",
    meetingTime: "First Sunday of each month 2:00 PM GMT", 
    location: "Birmingham (University Campus)",
    members: 15,
    maxMembers: 20,
    isPublic: true,
    creatorId: "3"
  }
];

const sampleEvents = [
  {
    title: "PLAB Success Workshop",
    type: "Workshop",
    date: new Date("2024-07-15"),
    time: "14:00",
    description: "Comprehensive workshop covering PLAB1 and PLAB2 preparation strategies. Includes mock OSCE stations, study planning, and Q&A with recent PLAB graduates.",
    attendees: 45,
    maxAttendees: 60,
    hostId: "3"
  },
  {
    title: "UK Medical Career Pathways Seminar", 
    type: "Seminar",
    date: new Date("2024-07-22"),
    time: "18:30",
    description: "Learn about different specialty training pathways in the UK NHS. Panel discussion with consultants from various specialties sharing their career journeys.",
    attendees: 32,
    maxAttendees: 50,
    hostId: "2"
  },
  {
    title: "Clinical Communication Skills Masterclass",
    type: "Masterclass", 
    date: new Date("2024-07-28"),
    time: "10:00",
    description: "Advanced communication skills training with focus on breaking bad news, obtaining informed consent, and dealing with difficult conversations in clinical practice.",
    attendees: 28,
    maxAttendees: 35,
    hostId: "1"
  }
];

const sampleMentors = [
  {
    userId: "3",
    title: "Consultant Physician & Medical Educator",
    specialty: "Internal Medicine",
    experience: "15+ years NHS experience, PLAB examiner, medical education specialist",
    availability: "Weekdays 6-8 PM, Weekends by appointment",
    rating: 4.9,
    totalSessions: 156,
    hourlyRate: 75,
    languages: ["English", "Welsh"]
  },
  {
    userId: "2", 
    title: "Cardiology Registrar & PLAB Mentor",
    specialty: "Cardiology",
    experience: "5 years post-PLAB, specialized in interventional cardiology",
    availability: "Evenings and weekends",
    rating: 4.8,
    totalSessions: 89,
    hourlyRate: 60,
    languages: ["English", "Arabic", "French"]
  }
];

export async function seedCommunityData() {
  try {
    console.log("Seeding community data...");
    
    // Insert users
    for (const user of sampleUsers) {
      await db.insert(users).values(user).onConflictDoNothing();
    }
    
    // Insert community posts  
    for (const post of samplePosts) {
      await db.insert(communityPosts).values(post).onConflictDoNothing();
    }
    
    // Insert study groups
    for (const group of sampleStudyGroups) {
      await db.insert(communityStudyGroups).values(group).onConflictDoNothing();
    }
    
    // Insert events
    for (const event of sampleEvents) {
      await db.insert(communityEvents).values(event).onConflictDoNothing();
    }
    
    // Insert mentors
    for (const mentor of sampleMentors) {
      await db.insert(communityMentors).values(mentor).onConflictDoNothing();
    }
    
    console.log("Community data seeded successfully!");
    
  } catch (error) {
    console.error("Error seeding community data:", error);
  }
}
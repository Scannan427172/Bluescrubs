import { db } from "./db";
import { users, questions, communityPosts, osceStations } from "../shared/schema";

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Create demo user
    const [demoUser] = await db.insert(users).values({
      email: "demo@plabmaster.com",
      username: "DemoUser",
      password: "password123",
      currentStage: "plab1",
      studyStreak: 7,
      totalPoints: 245
    }).returning();

    console.log("Demo user created:", demoUser.id);

    // Create sample questions
    const sampleQuestions = [
      {
        type: "mcq",
        examType: "plab1",
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
        explanation: "ST elevation in leads II, III, and aVF indicates an inferior STEMI, typically caused by occlusion of the right coronary artery."
      },
      {
        type: "mcq",
        examType: "plab1",
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
        explanation: "Young woman on oral contraceptives with acute onset pleuritic chest pain and dyspnea has high probability for PE. CTPA is the gold standard investigation."
      },
      {
        type: "mcq",
        examType: "plab1",
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
        explanation: "After confirming hypercortisolism, dexamethasone suppression test helps differentiate between ACTH-dependent and ACTH-independent causes."
      }
    ];

    await db.insert(questions).values(sampleQuestions);
    console.log("Sample questions created");

    // Create OSCE stations
    const sampleStations = [
      {
        title: "History Taking - Chest Pain",
        category: "history-taking",
        description: "Take a focused history from a patient presenting with chest pain",
        timeLimit: 8,
        markingCriteria: {
          structure: ["Introduction", "Pain characteristics", "Associated symptoms", "Risk factors", "Social history"],
          communication: ["Empathy", "Clarification", "Summarizing"],
          clinical: ["Differential diagnosis consideration", "Red flags identification"]
        },
        patientInfo: {
          name: "John Smith",
          age: 55,
          presentation: "Central chest pain for 2 hours",
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

    await db.insert(osceStations).values(sampleStations);
    console.log("OSCE stations created");

    // Create community posts
    const samplePosts = [
      {
        userId: demoUser.id,
        title: "PLAB 1 Success! Here's how I prepared",
        content: "Just passed PLAB 1 with 78%! Here are the key strategies that helped me succeed: 1. Consistent daily practice with MCQs 2. Focus on weak areas 3. Regular revision of guidelines",
        category: "success-stories"
      },
      {
        userId: demoUser.id,
        title: "Struggling with cardiology MCQs - any tips?",
        content: "I'm consistently scoring low on cardiology questions. Any recommendations for study resources or specific topics to focus on?",
        category: "plab1"
      }
    ];

    await db.insert(communityPosts).values(samplePosts);
    console.log("Community posts created");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };
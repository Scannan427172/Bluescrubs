import { generateNHSPrepQuestions } from "./nhsprep-ai-generator";

// Test the NHSPrep question generator with specific guidelines
export async function testNHSPrepIntegration() {
  console.log("Testing NHSPrep AI integration with specific NICE/CKS links...");
  
  try {
    const questions = await generateNHSPrepQuestions("cardiology", "hypertension", 1);
    
    if (questions && questions.length > 0) {
      const question = questions[0];
      console.log("\n=== Generated Question ===");
      console.log("Topic:", question.topic);
      console.log("Specialty:", question.specialty);
      console.log("Scenario:", question.scenario);
      console.log("Question:", question.question);
      console.log("Options:", question.options);
      console.log("Correct Answer:", question.correct_answer);
      console.log("Reference URL:", question.reference.url);
      console.log("Reference Title:", question.reference.title);
      console.log("Reference Section:", question.reference.section);
      
      // Check if URL is specific (not general)
      const isSpecificNICE = question.reference.url.includes('ng136') || question.reference.url.includes('chapter');
      const isSpecificCKS = question.reference.url.includes('management') || question.reference.url.includes('topics');
      
      console.log("\n=== URL Analysis ===");
      console.log("Is specific NICE URL:", isSpecificNICE);
      console.log("Is specific CKS URL:", isSpecificCKS);
      console.log("URL Status:", (isSpecificNICE || isSpecificCKS) ? "✓ SPECIFIC" : "✗ GENERAL");
    } else {
      console.log("No questions generated");
    }
  } catch (error) {
    console.error("Error testing NHSPrep integration:", error);
  }
}

// Run the test
if (require.main === module) {
  testNHSPrepIntegration();
}
const generateBatchesTo5000 = async () => {
  console.log('Starting automated generation to 5000 questions...');
  
  let currentCount = 13; // Starting baseline
  const targetCount = 5000;
  let batchNumber = 1;
  
  while (currentCount < targetCount) {
    console.log(`\n=== Starting Batch ${batchNumber} ===`);
    console.log(`Current: ${currentCount}, Target: ${targetCount}, Remaining: ${targetCount - currentCount}`);
    
    try {
      // Start generation
      const response = await fetch('http://localhost:5000/api/generate-5000-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (response.ok) {
        console.log(`Batch ${batchNumber} generation started`);
        
        // Wait for completion (5 minutes max per batch)
        await new Promise(resolve => setTimeout(resolve, 300000));
        
        // Check progress
        const questionsResponse = await fetch('http://localhost:5000/api/test/questions');
        const questions = await questionsResponse.json();
        const newCount = questions.length;
        
        if (newCount > currentCount) {
          const generated = newCount - currentCount;
          console.log(`✓ Batch ${batchNumber} complete: +${generated} questions (Total: ${newCount})`);
          currentCount = newCount;
          batchNumber++;
        } else {
          console.log(`⚠ Batch ${batchNumber} stalled, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
        }
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 10000));
        
      } else {
        console.error(`Batch ${batchNumber} failed to start:`, response.status);
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
      
    } catch (error) {
      console.error(`Batch ${batchNumber} error:`, error);
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
    
    // Safety check to prevent infinite loops
    if (batchNumber > 500) {
      console.log('Safety limit reached, stopping generation');
      break;
    }
  }
  
  console.log(`\n=== Generation Complete ===`);
  console.log(`Final count: ${currentCount} questions`);
  console.log(`Batches completed: ${batchNumber - 1}`);
};

generateBatchesTo5000();
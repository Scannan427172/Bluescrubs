const checkProgress = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/test/questions');
    const questions = await response.json();
    const count = questions.length;
    const percentage = Math.round((count / 5000) * 100);
    const estimatedCost = (count * 0.005).toFixed(2);
    
    console.log(`Progress: ${count}/5000 questions (${percentage}%)`);
    console.log(`Estimated cost so far: $${estimatedCost}`);
    console.log(`Time: ${new Date().toLocaleTimeString()}`);
    
    if (count >= 5000) {
      console.log('Generation complete!');
      process.exit(0);
    }
  } catch (error) {
    console.log('Checking status...');
  }
};

checkProgress();
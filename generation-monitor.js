const monitorGeneration = async () => {
  const startTime = Date.now();
  let lastCount = 13;
  
  while (true) {
    try {
      const response = await fetch('http://localhost:5000/api/test/questions');
      const questions = await response.json();
      const currentCount = questions.length;
      
      if (currentCount > lastCount) {
        const newQuestions = currentCount - lastCount;
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`Progress: ${currentCount}/5000 (+${newQuestions} in ${elapsed}s)`);
        lastCount = currentCount;
      }
      
      if (currentCount >= 5000) {
        console.log('Generation complete: 5000 questions reached');
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 15000));
    } catch (error) {
      console.log('Monitoring...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
};

monitorGeneration();
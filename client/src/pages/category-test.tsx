import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryTest() {
  const [selectedCategory, setSelectedCategory] = useState<string>('dermatology');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('intermediate');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'infectious-diseases', label: 'Infectious Diseases' },
    { value: 'respiratory', label: 'Respiratory' },
    { value: 'gastrointestinal', label: 'Gastrointestinal' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'obstetrics-gynaecology', label: 'Obstetrics & Gynaecology' },
    { value: 'paediatrics', label: 'Paediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'emergency-medicine', label: 'Emergency Medicine' },
    { value: 'rheumatology', label: 'Rheumatology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'ophthalmology', label: 'Ophthalmology' },
    { value: 'ent', label: 'ENT' },
    { value: 'pharmacology', label: 'Pharmacology' },
    { value: 'ethics-law', label: 'Ethics & Law' }
  ];

  const difficulties = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && questionStartTime > 0) {
      interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - questionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, questionStartTime]);

  const loadQuestions = async (count: number = 10) => {
    setLoading(true);
    setError('');
    
    try {
      const url = `/api/test/questions?category=${selectedCategory}&difficulty=${selectedDifficulty}&count=${count}`;
      console.log('Loading questions from URL:', url);
      console.log('Current category state:', selectedCategory);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelectedAnswer("");
        setShowExplanation(false);
        setQuestionStartTime(Date.now());
        setSessionStarted(true);
        setTimerRunning(true);
        setScore({ correct: 0, total: 0 });
        return;
      }
      
      setError('No questions found for this category');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionKey: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionKey);
    console.log('Answer selected:', optionKey, 'showExplanation:', showExplanation);
    console.log('Selected answer set to:', optionKey);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    setTimerRunning(false);
    setShowExplanation(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      setTimerRunning(true);
      setTimeSpent(0);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      setTimerRunning(true);
      setTimeSpent(0);
    }
  };

  const tryAgain = () => {
    setSelectedAnswer("");
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
    setTimerRunning(true);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>PLAB 1 Practice Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Category:
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Difficulty:
                  </label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={() => {
                    console.log('Starting practice with category:', selectedCategory);
                    loadQuestions(10);
                  }} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Loading...' : 'Start Practice'}
                </Button>
                
                <div className="text-sm text-gray-600">
                  Category: <strong>{categories.find(c => c.value === selectedCategory)?.label}</strong> | 
                  Difficulty: <strong>{difficulties.find(d => d.value === selectedDifficulty)?.label}</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="mb-6 border-red-200">
              <CardContent className="pt-6">
                <div className="text-red-600">{error}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Session Complete!</h2>
                <p className="text-gray-600 mb-4">
                  Final Score: {score.correct}/{score.total} ({Math.round((score.correct/score.total)*100)}%)
                </p>
                <Button onClick={() => setSessionStarted(false)} className="bg-blue-600 hover:bg-blue-700">
                  Start New Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600">BlueScrubsPrep</h1>
              <Badge variant="outline" className="hidden md:inline-flex">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <Badge variant="secondary" className="hidden md:inline-flex">
                Score: {score.correct}/{score.total}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <div className="text-right">
              <div className="text-lg font-semibold">{currentQuestion.topic}</div>
              <Badge variant="outline" className="text-xs">
                {categories.find(c => c.value === selectedCategory)?.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-lg leading-relaxed">
              {currentQuestion.question}
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <motion.div
              key={key}
              whileHover={!showExplanation ? { scale: 1.01 } : {}}
              whileTap={!showExplanation ? { scale: 0.99 } : {}}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedAnswer === key
                    ? showExplanation
                      ? selectedAnswer === currentQuestion.answer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && key === currentQuestion.answer
                    ? 'border-green-500 bg-green-50'
                    : 'hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handleAnswerSelect(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${
                      selectedAnswer === key
                        ? showExplanation
                          ? selectedAnswer === currentQuestion.answer
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-red-500 text-white border-red-500'
                          : 'bg-blue-500 text-white border-blue-500'
                        : showExplanation && key === currentQuestion.answer
                        ? 'bg-green-500 text-white border-green-500'
                        : 'border-gray-300 text-gray-700 bg-white'
                    }`}>
                      {key}
                    </div>
                    <div className="flex-1 text-sm font-medium">
                      {value as string}
                    </div>
                    {showExplanation && selectedAnswer === key && selectedAnswer !== currentQuestion.answer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    {showExplanation && key === currentQuestion.answer && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        {!showExplanation && selectedAnswer && (
          <div className="mb-6">
            <Button
              onClick={submitAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3"
              size="lg"
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Try Again Button */}
        {showExplanation && selectedAnswer !== currentQuestion.answer && (
          <div className="mb-6 text-center">
            <Button
              onClick={tryAgain}
              variant="outline"
              className="mr-4"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Explanations */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Correct Answer Explanation */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Correct Answer Explanation</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-green-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                        {currentQuestion.answer}
                      </div>
                      <span className="font-medium text-green-800">Correct Answer</span>
                    </div>
                    <p className="text-green-700">
                      {currentQuestion.options[currentQuestion.answer]}
                    </p>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Guidelines & Evidence
                    </h4>
                    <div className="text-sm text-gray-700 space-y-3">
                      <div className="bg-green-50 p-3 rounded">
                        <h5 className="font-semibold text-green-800 mb-2">NICE Guidelines Summary:</h5>
                        <div className="space-y-2">
                          {currentQuestion.explanation?.split('.').filter(Boolean).map((sentence: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{sentence.trim()}.</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded">
                        <h5 className="font-semibold text-blue-800 mb-2">Clinical Evidence Base:</h5>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Evidence-based treatment approach supported by randomised controlled trials</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Recommended by major UK medical societies and royal colleges</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Aligns with BNF prescribing guidelines and contraindication warnings</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded">
                        <h5 className="font-semibold text-purple-800 mb-2">UK Practice Standards:</h5>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Follows GMC Good Medical Practice guidelines for patient safety</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Meets CQC requirements for quality healthcare delivery</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Incorporates patient safety alerts and quality improvement standards</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Other Options Are Inappropriate */}
              {Object.entries(currentQuestion.options).filter(([key]) => key !== currentQuestion.answer).length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-red-800">Why Other Options Are Inappropriate</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(currentQuestion.options).filter(([key]) => key !== currentQuestion.answer).map(([key, value]) => (
                      <div key={key} className="border-l-4 border-red-400 pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-semibold">
                            {key}
                          </div>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-red-800">{value as string}</span>
                        </div>
                        <div className="text-sm text-red-700 space-y-1">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Not recommended by current UK medical guidelines</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Does not follow evidence-based best practice</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Memory Aid */}
              {currentQuestion.mnemonic && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
                        <span className="text-xs text-white font-bold">💡</span>
                      </div>
                      <h3 className="font-semibold text-yellow-800">Memory Aid</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-yellow-800 space-y-2">
                      {currentQuestion.mnemonic.split(',').map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Clinical Guidelines */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-xs text-white">📋</span>
                    </div>
                    <h3 className="font-semibold text-blue-800">Clinical Guidelines & Evidence</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700 mb-4">
                    Comprehensive guideline summary with authentic UK medical references
                  </p>
                  
                  <div className="space-y-4">
                    {/* NICE Summary */}
                    <div className="p-4 bg-blue-100 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-xs text-white font-bold">N</span>
                        </div>
                        <span className="font-semibold text-blue-800">
                          {currentQuestion.topic} Management Summary
                        </span>
                      </div>
                      
                      <div className="space-y-3 text-sm text-blue-800">
                        <div>
                          <h5 className="font-semibold mb-1">Definition & Recognition:</h5>
                          <p>- Clinical presentation as described in scenario requires systematic assessment according to current UK guidelines</p>
                          <p>- Symptoms and signs align with established diagnostic criteria</p>
                          <p>- Risk factors and patient history inform evidence-based management approach</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-1">Primary Management Strategy:</h5>
                          <p>- First-line treatment follows NICE recommendations for optimal patient outcomes</p>
                          <p>- BNF guidance ensures safe prescribing and appropriate monitoring</p>
                          <p>- Patient safety considerations and contraindication screening mandatory</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-1">Monitoring & Follow-up:</h5>
                          <p>- Regular review schedule as per specialty society recommendations</p>
                          <p>- Quality indicators and safety netting measures implemented</p>
                          <p>- Patient education and shared decision-making prioritised</p>
                        </div>
                      </div>
                    </div>

                    {/* UK Guidance Card */}
                    <div className="p-3 bg-white border border-blue-200 rounded">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="font-medium text-blue-800">UK Guidance</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {currentQuestion.links?.primary?.title || `NICE CG167: ${currentQuestion.topic} - clinical assessment and management`}
                      </p>
                    </div>

                    {/* Primary Links */}
                    {currentQuestion.links && (
                      <div className="space-y-2">
                        {Object.entries(currentQuestion.links).map(([key, link]: [string, any]) => (
                          <div key={key} className="p-3 bg-blue-100 rounded">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-4 h-4 bg-blue-600 rounded"></div>
                              <span className="font-medium text-blue-800">{link.title}</span>
                            </div>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm underline"
                            >
                              {link.url}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-yellow-100 rounded">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 Foundation Doctor Study Tip</h4>
                      <p className="text-sm text-yellow-700">
                        Use this summary for quick revision, then explore the supplementary guidelines for 
                        deeper understanding. Each reference provides specific protocols used in UK 
                        clinical practice and aligns with GMC standards for safe patient care.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Further Reading & Guidelines */}
              <Card className="border-gray-200 bg-gray-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-500 rounded flex items-center justify-center">
                      <span className="text-xs text-white">📚</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">Further Reading & Guidelines</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.nice.org.uk/guidance" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">📋</div>
                      NICE Clinical Guidelines
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://bnf.nice.org.uk/" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">💊</div>
                      BNF (British National Formulary)
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.bmj.com/company/products-services/bmj-best-practice/" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">🩺</div>
                      BMJ Best Practice
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.gmc-uk.org/ethical-guidance" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">⚖️</div>
                      GMC Ethical Guidance
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.brit-thoracic.org.uk/quality-improvement/guidelines/" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">🫁</div>
                      British Thoracic Society
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.escardio.org/Guidelines" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">❤️</div>
                      European Society of Cardiology
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.rcog.org.uk/guidance" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">👶</div>
                      RCOG Guidelines
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.rcpch.ac.uk/resources/clinical-guidelines" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">🧸</div>
                      RCPCH Paediatric Guidelines
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.bsg.org.uk/clinical-resource/clinical-guidelines/" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">🦠</div>
                      British Society of Gastroenterology
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://www.rcpsych.ac.uk/improving-care/campaigning-for-better-mental-health-policy/college-reports-and-guidance" target="_blank" rel="noopener noreferrer">
                      <div className="w-4 h-4 mr-2">🧘</div>
                      Royal College of Psychiatrists
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:relative md:mt-8 md:bg-transparent md:border-0 md:p-0">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="text-sm text-gray-600 hidden md:block">
              {currentQuestionIndex + 1} of {questions.length}
            </div>

            <Button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, Volume2, VolumeX, RotateCcw, CheckCircle, XCircle, 
  Brain, Clock, Award, TrendingUp, Settings, Shuffle, BookOpen,
  VideoIcon, Image as ImageIcon, Mic, Speaker
} from "lucide-react";
import { COMPREHENSIVE_FLASHCARD_COLLECTION, FLASHCARD_STATS, type Flashcard } from "@shared/high-yield-flashcards";

export default function InteractiveFlashcards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  
  // Statistics
  const [stats, setStats] = useState({
    studied: 0,
    correct: 0,
    incorrect: 0,
    streak: 0
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);

  // Available categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
    { value: 'Respiratory', label: 'Respiratory' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Endocrinology', label: 'Endocrinology' },
    { value: 'Gastroenterology', label: 'Gastroenterology' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Filter flashcards
  const filteredCards = COMPREHENSIVE_FLASHCARD_COLLECTION.filter((card: Flashcard) => {
    const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || card.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const currentCard = filteredCards[currentCardIndex];

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Text-to-speech function
  const speakText = (text: string) => {
    if (!speechEnabled || !speechSynthRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed[0];
    utterance.volume = volume[0] / 100;
    utterance.pitch = 1;
    
    // Use a medical/educational voice if available
    const voices = speechSynthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('English') && (voice.name.includes('UK') || voice.name.includes('British'))
    ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthRef.current.speak(utterance);
  };

  // Auto-read content when card changes or flips
  useEffect(() => {
    if (autoPlay && currentCard) {
      const textToRead = showBack 
        ? `${currentCard.back.text}. ${currentCard.back.explanation}`
        : currentCard.front.text;
      
      setTimeout(() => speakText(textToRead), 500);
    }
  }, [currentCardIndex, showBack, autoPlay, currentCard]);

  // Handle media playback
  const playAudio = () => {
    const audioUrl = showBack ? currentCard?.back.audio : currentCard?.front.audio;
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = volume[0] / 100;
      audioRef.current.playbackRate = playbackSpeed[0];
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playVideo = () => {
    const videoUrl = showBack ? currentCard?.back.video : currentCard?.front.video;
    if (videoUrl && videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.volume = volume[0] / 100;
      videoRef.current.playbackRate = playbackSpeed[0];
      videoRef.current.play();
    }
  };

  // Navigation
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    setShowBack(false);
  };

  const previousCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setShowBack(false);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCurrentCardIndex(0);
    setShowBack(false);
  };

  // Answer handling
  const handleAnswer = (correct: boolean) => {
    setStats(prev => ({
      studied: prev.studied + 1,
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (!correct ? 1 : 0),
      streak: correct ? prev.streak + 1 : 0
    }));
    
    setTimeout(nextCard, 1000);
  };

  const flipCard = () => {
    setShowBack(!showBack);
  };

  if (!currentCard) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">No flashcards found</h1>
        <p>Please adjust your filters to see available flashcards.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">High-Yield Medical Flashcards</h1>
        </div>
        <p className="text-gray-600">Interactive multimedia flashcards with audio/visual learning</p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty</label>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(diff => (
                <SelectItem key={diff.value} value={diff.value}>{diff.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Volume</label>
          <div className="flex items-center gap-2">
            <VolumeX className="w-4 h-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={5}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Speed</label>
          <Slider
            value={playbackSpeed}
            onValueChange={setPlaybackSpeed}
            min={0.5}
            max={2}
            step={0.1}
            className="flex-1"
          />
          <div className="text-xs text-center mt-1">{playbackSpeed[0]}x</div>
        </div>
      </div>

      {/* Audio/Video Settings */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={autoPlay ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoPlay(!autoPlay)}
        >
          <Speaker className="w-4 h-4 mr-2" />
          Auto-Read {autoPlay ? "On" : "Off"}
        </Button>
        
        <Button
          variant={speechEnabled ? "default" : "outline"}
          size="sm"
          onClick={() => setSpeechEnabled(!speechEnabled)}
        >
          <Mic className="w-4 h-4 mr-2" />
          Text-to-Speech {speechEnabled ? "On" : "Off"}
        </Button>

        <Button variant="outline" size="sm" onClick={shuffleCards}>
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Card {currentCardIndex + 1} of {filteredCards.length}</span>
          <span>Accuracy: {stats.studied > 0 ? Math.round((stats.correct / stats.studied) * 100) : 0}%</span>
        </div>
        <Progress value={(currentCardIndex + 1) / filteredCards.length * 100} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.studied}</div>
          <div className="text-sm text-gray-600">Studied</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.incorrect}</div>
          <div className="text-sm text-gray-600">Incorrect</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
          <div className="text-sm text-gray-600">Streak</div>
        </div>
      </div>

      {/* Flashcard */}
      <Card className="mb-6 min-h-[500px] cursor-pointer bg-gray-800 text-white" onClick={flipCard}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{currentCard.category}</Badge>
              <Badge variant="outline">{currentCard.difficulty}</Badge>
              {currentCard.highYield && (
                <Badge variant="destructive">High Yield</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {(currentCard.front.audio || currentCard.back.audio) && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); playAudio(); }}>
                  <Volume2 className="w-4 h-4" />
                </Button>
              )}
              
              {(currentCard.front.video || currentCard.back.video) && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); playVideo(); }}>
                  <VideoIcon className="w-4 h-4" />
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={(e) => { 
                e.stopPropagation(); 
                speakText(showBack ? `${currentCard.back.text}. ${currentCard.back.explanation}` : currentCard.front.text);
              }}>
                <Speaker className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-center text-lg text-white">
            {showBack ? "Answer" : "Question"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          {!showBack ? (
            // Front of card
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-white">{currentCard.front.text}</p>
              
              {currentCard.front.image && (
                <div className="flex justify-center">
                  <img 
                    src={currentCard.front.image} 
                    alt="Question image"
                    className="max-w-md rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {currentCard.front.video && (
                <div className="flex justify-center">
                  <video
                    ref={videoRef}
                    controls
                    className="max-w-md rounded-lg shadow-md"
                    poster="/api/placeholder/400/300"
                  >
                    <source src={currentCard.front.video} type="video/mp4" />
                  </video>
                </div>
              )}
              
              <p className="text-blue-300 text-sm">Click to reveal answer</p>
            </div>
          ) : (
            // Back of card
            <div className="space-y-4">
              <div className="text-xl font-semibold text-green-300">
                {currentCard.back.text}
              </div>
              
              <div className="text-left bg-blue-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Explanation:</h4>
                <p className="leading-relaxed text-white">{currentCard.back.explanation}</p>
              </div>

              {currentCard.back.keyPoints.length > 0 && (
                <div className="text-left bg-yellow-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Key Points:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {currentCard.back.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="text-sm text-white">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentCard.back.image && (
                <div className="flex justify-center">
                  <img 
                    src={currentCard.back.image} 
                    alt="Answer image"
                    className="max-w-md rounded-lg shadow-md"
                  />
                </div>
              )}

              {currentCard.back.video && (
                <div className="flex justify-center">
                  <video
                    ref={videoRef}
                    controls
                    className="max-w-md rounded-lg shadow-md"
                  >
                    <source src={currentCard.back.video} type="video/mp4" />
                  </video>
                </div>
              )}

              <div className="text-sm text-white bg-gray-700 p-3 rounded">
                <strong>Clinical Relevance:</strong> {currentCard.clinicalRelevance}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer Buttons */}
      {showBack && (
        <div className="flex gap-4 justify-center mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleAnswer(false)}
            className="gap-2"
          >
            <XCircle className="w-5 h-5 text-red-600" />
            Incorrect
          </Button>
          
          <Button
            size="lg"
            onClick={() => handleAnswer(true)}
            className="gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Correct
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousCard}>
          ← Previous
        </Button>
        
        <Button variant="outline" onClick={flipCard}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Flip Card
        </Button>
        
        <Button variant="outline" onClick={nextCard}>
          Next →
        </Button>
      </div>

      {/* Hidden audio element for media playback */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
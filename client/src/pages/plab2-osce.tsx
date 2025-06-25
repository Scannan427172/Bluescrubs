import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Stethoscope, Play, Clock, Users, Video, Mic, 
  CheckCircle, Star, Calendar, Award, BookOpen,
  ClipboardList, Heart, Brain, AlertTriangle, ArrowLeft, Volume2,
  Globe, Languages, MessageCircle, Bot, Activity, Maximize2, X
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPANDED_PLAB2_STATIONS, EXPANDED_STATION_STATS, EnhancedOSCEStation } from "@shared/expanded-plab2-stations";
import plab2BgImage from '@assets/6675ABC6-B1E7-4E4C-92C4-D90C32FA1CB4_1750366172462.png';
import AnatomyViewer3D from '@/components/anatomy-viewer-3d';
import { useQuery } from "@tanstack/react-query";
import { NeuroSettings, useNeuroAccommodations } from "@/components/neurodiversity-settings";
import { type NeuroAtypicalType, NEURO_ACCOMMODATIONS } from "@shared/neurodiversity-schema";
import { AudioSupport } from "@/components/audio-support";

// Define station types for filtering
const OSCE_STATION_TYPES = [
  { value: 'all', label: 'All Stations' },
  { value: 'history', label: 'History Taking' },
  { value: 'examination', label: 'Physical Examination' },
  { value: 'communication', label: 'Communication Skills' },
  { value: 'practical', label: 'Practical Procedures' },
  { value: 'data-interpretation', label: 'Data Interpretation' },
  { value: 'emergency', label: 'Emergency Management' }
];

interface OSCEStation {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  description: string;
  scenario: string;
  instructions: {
    candidate: string;
    examiner: string;
    standardizedPatient?: string;
  };
  markingCriteria: Array<{
    category: string;
    maxMarks: number;
    criteria: string[];
  }>;
  redFlags: string[];
  differentialDiagnosis?: string[];
  medications?: Array<{
    name: string;
    indication: string;
    dosage: string;
    sideEffects: string[];
    contraindications: string[];
  }>;
  references: Array<{
    title: string;
    url: string;
  }>;
  completed: boolean;
  attempts: number;
  bestScore: number;
}

export default function Plab2Osce() {
  const [activeStation, setActiveStation] = useState<EnhancedOSCEStation | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [completedStations, setCompletedStations] = useState<string[]>([]);
  const [stationScores, setStationScores] = useState<Record<string, number>>({});

  // Translation and language state
  const [isTranslationMode, setIsTranslationMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translateStations, setTranslateStations] = useState(false);
  const [translatedStations, setTranslatedStations] = useState<Record<string, any>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Neurodiversity settings
  const [neuroAccommodations, setNeuroAccommodations] = useState<NeuroAtypicalType[]>(['none']);
  const { accommodations, questionStyles, buttonStyles } = useNeuroAccommodations(neuroAccommodations);

  // AI Tutor state
  const [showAITutor, setShowAITutor] = useState(false);
  const [tutorMessages, setTutorMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [tutorInput, setTutorInput] = useState('');
  const [isLoadingTutorResponse, setIsLoadingTutorResponse] = useState(false);

  // 3D Anatomy Viewer state
  const [isAnatomyFullscreen, setIsAnatomyFullscreen] = useState(false);

  // Load neurodiversity settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neuro-accommodations');
    if (saved) {
      try {
        setNeuroAccommodations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved accommodations:', e);
      }
    }
  }, []);

  const handleAccommodationsChange = (newAccommodations: NeuroAtypicalType[]) => {
    setNeuroAccommodations(newAccommodations);
    localStorage.setItem('neuro-accommodations', JSON.stringify(newAccommodations));
  };

  const { data: stations = [] } = useQuery({
    queryKey: ['/api/osce/stations'],
    select: (data: any[]) => data.length > 0 ? data : EXPANDED_PLAB2_STATIONS
  });

  const handleStationSelect = (station: EnhancedOSCEStation) => {
    setActiveStation(station);
  };

  const handleBackToStations = () => {
    setActiveStation(null);
  };

  const handleStationComplete = (stationId: string, score: number) => {
    setCompletedStations(prev => [...prev.filter(id => id !== stationId), stationId]);
    setStationScores(prev => ({ ...prev, [stationId]: score }));
    setActiveStation(null);
  };

  const getOverallProgress = () => {
    return (completedStations.length / stations.length) * 100;
  };

  const getAverageScore = () => {
    const scores = Object.values(stationScores);
    if (scores.length === 0) return 0;
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStationTypeIcon = (type: string) => {
    switch (type) {
      case 'history': return MessageCircle;
      case 'examination': return Stethoscope;
      case 'communication': return Users;
      case 'practical': return ClipboardList;
      case 'data-interpretation': return BookOpen;
      case 'emergency': return AlertTriangle;
      default: return Play;
    }
  };

  const filteredStations = selectedType === 'all' 
    ? stations 
    : stations.filter((station: any) => station.type === selectedType);

  if (activeStation) {
    return (
      <OSCEStationView 
        station={activeStation}
        onComplete={handleStationComplete}
        onBack={handleBackToStations}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden"
        style={{
          backgroundImage: `url(${plab2BgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              PLAB 2 OSCE
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-blue-100">
              Clinical Skills & Communication Practice
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                ✓ 3,898 Interactive Stations
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                ✓ Full Clinical Scenarios
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                ✓ Marking Criteria
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Translation Interface */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-900">Multi-Language Support</h3>
                <p className="text-green-700">Practice OSCE stations in 39 languages with built-in medical terminology</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700 font-medium">Independent translation system - No external API required</span>
                </div>
              </div>
            </div>
            {isTranslationMode && (
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                  <SelectItem value="it">🇮🇹 Italian</SelectItem>
                  <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                  <SelectItem value="hi">🇮🇳 Hindi</SelectItem>
                  <SelectItem value="ur">🇵🇰 Urdu</SelectItem>
                  <SelectItem value="bn">🇧🇩 Bengali</SelectItem>
                  <SelectItem value="ta">🇱🇰 Tamil</SelectItem>
                  <SelectItem value="te">🇮🇳 Telugu</SelectItem>
                  <SelectItem value="mr">🇮🇳 Marathi</SelectItem>
                  <SelectItem value="gu">🇮🇳 Gujarati</SelectItem>
                  <SelectItem value="kn">🇮🇳 Kannada</SelectItem>
                  <SelectItem value="ml">🇮🇳 Malayalam</SelectItem>
                  <SelectItem value="pa">🇮🇳 Punjabi</SelectItem>
                  <SelectItem value="or">🇮🇳 Odia</SelectItem>
                  <SelectItem value="as">🇮🇳 Assamese</SelectItem>
                  <SelectItem value="ne">🇳🇵 Nepali</SelectItem>
                  <SelectItem value="si">🇱🇰 Sinhala</SelectItem>
                  <SelectItem value="my">🇲🇲 Myanmar</SelectItem>
                  <SelectItem value="th">🇹🇭 Thai</SelectItem>
                  <SelectItem value="vi">🇻🇳 Vietnamese</SelectItem>
                  <SelectItem value="id">🇮🇩 Indonesian</SelectItem>
                  <SelectItem value="ms">🇲🇾 Malay</SelectItem>
                  <SelectItem value="tl">🇵🇭 Filipino</SelectItem>
                  <SelectItem value="sw">🇰🇪 Swahili</SelectItem>
                  <SelectItem value="am">🇪🇹 Amharic</SelectItem>
                  <SelectItem value="ha">🇳🇬 Hausa</SelectItem>
                  <SelectItem value="yo">🇳🇬 Yoruba</SelectItem>
                  <SelectItem value="ig">🇳🇬 Igbo</SelectItem>
                  <SelectItem value="pt">🇵🇹 Portuguese</SelectItem>
                  <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                  <SelectItem value="pl">🇵🇱 Polish</SelectItem>
                  <SelectItem value="ro">🇷🇴 Romanian</SelectItem>
                  <SelectItem value="zh">🇨🇳 Chinese</SelectItem>
                  <SelectItem value="ja">🇯🇵 Japanese</SelectItem>
                  <SelectItem value="ko">🇰🇷 Korean</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Official PLAB 2 Format</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8-10 minutes per station</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>16-20 total stations</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Pass mark: 50%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Neurodiversity Support */}
        <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-900">Accessibility Settings</h3>
                  <p className="text-purple-700">Customize your OSCE practice for ADHD, dyslexia, autism, and other learning differences</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-purple-700 font-medium">Enhanced support for diverse learning needs</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <NeuroSettings 
                  selectedAccommodations={neuroAccommodations}
                  onAccommodationsChange={handleAccommodationsChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedStations.length}/{stations.length}
              </div>
              <Progress value={getOverallProgress()} className="mb-2" />
              <p className="text-sm text-gray-600">{Math.round(getOverallProgress())}% Complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {getAverageScore().toFixed(1)}/20
              </div>
              <p className="text-sm text-gray-600">
                {getAverageScore() >= 13 ? 'Good Performance' : getAverageScore() >= 10 ? 'Borderline' : 'Needs Improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Station Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(EXPANDED_STATION_STATS.byType).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm text-gray-700">
                    <span className="capitalize">{type.replace('-', ' ')}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Exam Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">8-10 min/station</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Stations:</span>
                  <span className="font-medium">16-20</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass Mark:</span>
                  <span className="font-medium">50%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Station Type Filters with 3D Anatomy */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-1">
            <TabsTrigger value="all" className="text-[9px] md:text-xs text-gray-700">All</TabsTrigger>
            <TabsTrigger value="history" className="text-[9px] md:text-xs text-gray-700">History</TabsTrigger>
            <TabsTrigger value="examination" className="text-[9px] md:text-xs text-gray-700">Exam</TabsTrigger>
            <TabsTrigger value="explanation" className="text-[9px] md:text-xs text-gray-700">Explain</TabsTrigger>
            <TabsTrigger value="ethics" className="text-[9px] md:text-xs text-gray-700">Ethics</TabsTrigger>
            <TabsTrigger value="acute-care" className="text-[9px] md:text-xs text-gray-700">Acute</TabsTrigger>
            <TabsTrigger value="practical-skills" className="text-[9px] md:text-xs text-gray-700">Skills</TabsTrigger>
            <TabsTrigger value="anatomy" className="text-[9px] md:text-xs text-blue-700">3D Anatomy</TabsTrigger>
          </TabsList>

          {/* 3D Anatomy Viewer Tab */}
          <TabsContent value="anatomy" className="mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-blue-900">Interactive 3D Human Anatomy</CardTitle>
                      <p className="text-blue-700 text-sm">Explore body systems for PLAB 2 clinical examination practice</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsAnatomyFullscreen(true)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Fullscreen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden bg-gray-900">
                  <AnatomyViewer3D />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-gray-900">Clinical Applications</span>
                    </div>
                    <p className="text-gray-600">Perfect for OSCE examination practice and anatomical reference during clinical scenarios</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-gray-900">Interactive Learning</span>
                    </div>
                    <p className="text-gray-600">Click on organs to see detailed clinical notes and PLAB-relevant examination points</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-900">6 Body Systems</span>
                    </div>
                    <p className="text-gray-600">Cardiovascular, respiratory, nervous, digestive, urinary, and musculoskeletal systems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OSCE Stations Grid */}
          <TabsContent value={selectedType} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStations.map((station: any) => {
                const IconComponent = getStationTypeIcon(station.type);
                const isCompleted = completedStations.includes(station.id);
                const score = stationScores[station.id];

                return (
                  <Card 
                    key={station.id} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-blue-300"
                    onClick={() => handleStationSelect(station)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Station {station.stationNumber}</span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">{score}/20</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900">{station.title}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">{station.type}</Badge>
                        <Badge className={`text-xs ${getDifficultyColor(station.difficulty)}`}>
                          {station.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{station.category}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {station.scenario}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {station.duration} minutes
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-orange-500" />
                          {station.examFrequency}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStationSelect(station);
                        }}
                        className="w-full"
                        size="sm"
                      >
                        Start Station
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fullscreen 3D Anatomy Viewer Modal */}
      {isAnatomyFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <div className="w-full h-full relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={() => setIsAnatomyFullscreen(false)}
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                <span className="text-sm font-medium">3D Human Anatomy - Fullscreen Mode</span>
              </div>
            </div>
            <div className="w-full h-full">
              <AnatomyViewer3D />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// OSCE Station View Component
function OSCEStationView({ 
  station, 
  onComplete, 
  onBack 
}: { 
  station: EnhancedOSCEStation; 
  onComplete: (stationId: string, score: number) => void;
  onBack: () => void;
}) {
  const [currentSection, setCurrentSection] = useState<'instructions' | 'scenario' | 'marking' | 'feedback'>('instructions');
  const [timeRemaining, setTimeRemaining] = useState(station.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [selfScore, setSelfScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stations
          </Button>
          
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">
              {formatTime(timeRemaining)}
            </div>
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? 'Pause' : 'Start'} Timer
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              {station.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{station.category}</Badge>
              <Badge className="bg-blue-100 text-blue-800">{station.difficulty}</Badge>
              <Badge variant="outline">{station.duration} minutes</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={currentSection} onValueChange={(value) => setCurrentSection(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="scenario">Scenario</TabsTrigger>
                <TabsTrigger value="marking">Marking</TabsTrigger>
                <TabsTrigger value="feedback">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">For You (Candidate)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-700">{station.instructions.candidate}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">For Examiner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-700">{station.instructions.examiner}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenario" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Clinical Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-700">{station.scenario}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="marking" className="space-y-4">
                {station.markingCriteria.map((criteria, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">{criteria.category} ({criteria.maxMarks} marks)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {criteria.criteria.map((criterion, criterionIndex) => (
                          <li key={criterionIndex} className="flex items-start gap-2 text-gray-700">
                            <span className="text-blue-600 font-medium">•</span>
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Your Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Record your approach, observations, and key points..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="min-h-32"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Self-Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Self-Score (out of 20):</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        value={selfScore}
                        onChange={(e) => setSelfScore(parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => onComplete(station.id, selfScore)}
                      className="w-full"
                    >
                      Complete Station
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
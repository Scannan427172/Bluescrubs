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
  ClipboardList, Heart, Brain, AlertTriangle, ArrowLeft
} from "lucide-react";
import { PLAB2_OSCE_STATIONS, OSCE_STATION_TYPES, OSCE_STATION_STATS, type OSCEStation } from "@shared/plab2-osce-stations";
import { NeuroSettings, useNeuroAccommodations } from "@/components/neurodiversity-settings";
import { type NeuroAtypicalType, NEURO_ACCOMMODATIONS } from "@shared/neurodiversity-schema";
import { AudioSupport } from "@/components/audio-support";

export default function Plab2Osce() {
  const [activeStation, setActiveStation] = useState<OSCEStation | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [completedStations, setCompletedStations] = useState<string[]>([]);
  const [stationScores, setStationScores] = useState<Record<string, number>>({});

  // Neurodiversity settings
  const [neuroAccommodations, setNeuroAccommodations] = useState<NeuroAtypicalType[]>(['none']);
  const { accommodations, questionStyles, buttonStyles } = useNeuroAccommodations(neuroAccommodations);

  // Load neurodiversity settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neuro-accommodations');
    if (saved) {
      try {
        setNeuroAccommodations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved accommodations');
      }
    }
  }, []);

  // Save neurodiversity settings to localStorage
  const handleAccommodationsChange = (accommodations: NeuroAtypicalType[]) => {
    setNeuroAccommodations(accommodations);
    localStorage.setItem('neuro-accommodations', JSON.stringify(accommodations));
  };

  const filteredStations = PLAB2_OSCE_STATIONS.filter(station => 
    selectedType === 'all' || station.type === selectedType
  );

  const handleStationComplete = (stationId: string, score: number) => {
    setCompletedStations(prev => [...prev, stationId]);
    setStationScores(prev => ({ ...prev, [stationId]: score }));
    setActiveStation(null);
  };

  const getStationTypeIcon = (type: string) => {
    switch (type) {
      case 'history': return ClipboardList;
      case 'examination': return Stethoscope;
      case 'explanation': return BookOpen;
      case 'ethics': return Users;
      case 'acute-care': return AlertTriangle;
      case 'practical-skills': return Heart;
      default: return Star;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOverallProgress = () => {
    return (completedStations.length / PLAB2_OSCE_STATIONS.length) * 100;
  };

  const getAverageScore = () => {
    const scores = Object.values(stationScores);
    return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  };

  if (activeStation) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveStation(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Stations
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{activeStation.title}</h1>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Station Scenario</h3>
                <p className="text-gray-700 mb-6">{activeStation.scenario}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Instructions</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Candidate:</strong> {activeStation.instructions.candidate}</p>
                      <p><strong>Examiner:</strong> {activeStation.instructions.examiner}</p>
                      {activeStation.instructions.standardizedPatient && (
                        <p><strong>Standardized Patient:</strong> {activeStation.instructions.standardizedPatient}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Marking Criteria</h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      {activeStation.markingCriteria.map((criteria, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-3">
                          <div className="font-medium text-gray-900">{criteria.category}</div>
                          <div className="text-xs text-gray-500 mb-1">Max: {criteria.maxMarks} marks</div>
                          <ul className="list-disc pl-4 space-y-1">
                            {criteria.criteria.map((criterion, idx) => (
                              <li key={idx}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      Time Limit: {accommodations.extendedTime ? Math.round(activeStation.duration * accommodations.timeMultiplier) : activeStation.duration} minutes
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">Use the timer to practice under exam conditions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">PLAB 2 OSCE Practice</h1>
          </div>
          <p className="text-lg text-gray-600">Comprehensive OSCE practice with 16-20 clinical stations covering history taking, examination, explanation, ethics, and acute care scenarios</p>
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

        {/* Neurodiversity Information */}
        {neuroAccommodations.length > 0 && !neuroAccommodations.includes('none') && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Active Accessibility Settings</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Your OSCE accommodations are active: {neuroAccommodations
                  .filter(acc => acc !== 'none')
                  .map(acc => {
                    const accommodation = NEURO_ACCOMMODATIONS.find(na => na.id === acc);
                    return accommodation?.name;
                  })
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <div className="flex flex-wrap gap-2">
                {accommodations.extendedTime && (
                  <Badge variant="outline" className="text-xs bg-white">
                    {accommodations.timeMultiplier}x Extended Time
                  </Badge>
                )}
                {accommodations.largerButtons && (
                  <Badge variant="outline" className="text-xs bg-white">Larger Buttons</Badge>
                )}
                {accommodations.visualCues && (
                  <Badge variant="outline" className="text-xs bg-white">Visual Cues</Badge>
                )}
                {accommodations.audioSupport && (
                  <Badge variant="outline" className="text-xs bg-white">Audio Support</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* PLAB 2 OSCE Practice Section - Now under accessibility settings */}
        <div className="border-t-4 border-blue-200 pt-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">OSCE Practice Stations</h2>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedStations.length}/{PLAB2_OSCE_STATIONS.length}
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
                {Object.entries(OSCE_STATION_STATS.byType).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm text-gray-700">
                    <span className="capitalize">{OSCE_STATION_TYPES[type as keyof typeof OSCE_STATION_TYPES]}</span>
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

          {/* Station Type Filters */}
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
            <TabsList className="grid w-full grid-cols-7 gap-1">
              <TabsTrigger 
                value="all" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                All ({PLAB2_OSCE_STATIONS.length})
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                History ({OSCE_STATION_STATS.byType.history})
              </TabsTrigger>
              <TabsTrigger 
                value="examination" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                Exam ({OSCE_STATION_STATS.byType.examination})
              </TabsTrigger>
              <TabsTrigger 
                value="explanation" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                Explain ({OSCE_STATION_STATS.byType.explanation})
              </TabsTrigger>
              <TabsTrigger 
                value="ethics" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                Ethics ({OSCE_STATION_STATS.byType.ethics})
              </TabsTrigger>
              <TabsTrigger 
                value="acute-care" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                Acute ({OSCE_STATION_STATS.byType['acute-care']})
              </TabsTrigger>
              <TabsTrigger 
                value="practical-skills" 
                className={accommodations.largerButtons ? 'text-sm lg:text-base py-3 text-gray-700' : 'text-xs lg:text-sm text-gray-700'}
              >
                Skills ({OSCE_STATION_STATS.byType['practical-skills']})
              </TabsTrigger>
            </TabsList>

          <TabsContent value={selectedType} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStations.map((station) => {
                const IconComponent = getStationTypeIcon(station.type);
                const isCompleted = completedStations.includes(station.id);
                const score = stationScores[station.id];

                return (
                  <Card key={station.id} className={`hover:shadow-lg transition-shadow cursor-pointer ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}>
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
                        <Badge variant="secondary" className="text-xs">{OSCE_STATION_TYPES[station.type]}</Badge>
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
                          <Star className={`w-3 h-3 ${station.examFrequency === 'very-high' ? 'text-red-500' : station.examFrequency === 'high' ? 'text-orange-500' : 'text-gray-400'}`} />
                          {station.examFrequency}
                        </div>
                      </div>

                      <Button 
                        onClick={() => setActiveStation(station)}
                        className="w-full"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? 'Review Station' : 'Start Station'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}

// OSCE Station View Component
function OSCEStationView({ 
  station, 
  onComplete, 
  onBack 
}: { 
  station: OSCEStation; 
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stations
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeRemaining)}</div>
              <div className="text-sm text-gray-600">Time Remaining</div>
            </div>
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? 'Pause' : 'Start Timer'}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2 text-gray-900">Station {station.stationNumber}: {station.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary">{OSCE_STATION_TYPES[station.type]}</Badge>
                  <Badge className={getDifficultyColor(station.difficulty)}>{station.difficulty}</Badge>
                  <Badge variant="outline">{station.category}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={currentSection} onValueChange={setCurrentSection as any} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="scenario">Scenario</TabsTrigger>
            <TabsTrigger value="marking">Marking Criteria</TabsTrigger>
            <TabsTrigger value="feedback">Self-Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="instructions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Candidate Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-700">{station.instructions.candidate}</p>
              </CardContent>
            </Card>
            
            {station.instructions.standardizedPatient && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-700">{station.instructions.standardizedPatient}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scenario" className="space-y-4">
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
      </div>
    </div>
  );
}
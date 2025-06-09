import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Stethoscope, Play, Clock, Users, Video, Mic, 
  CheckCircle, Star, Calendar, Award, BookOpen,
  ClipboardList, Heart, Brain, AlertTriangle
} from "lucide-react";
import { PLAB2_OSCE_STATIONS, OSCE_STATION_TYPES, OSCE_STATION_STATS, type OSCEStation } from "@shared/plab2-osce-stations";

// Mock user ID for demo
const DEMO_USER_ID = 1;

export default function Plab2Osce() {
  const [activeStation, setActiveStation] = useState<OSCEStation | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [completedStations, setCompletedStations] = useState<Set<string>>(new Set());
  const [stationScores, setStationScores] = useState<Record<string, number>>({});

  const filteredStations = PLAB2_OSCE_STATIONS.filter(station => 
    selectedType === 'all' || station.type === selectedType
  );

  const handleStationComplete = (stationId: string, score: number) => {
    setCompletedStations(prev => new Set([...prev, stationId]));
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
    return (completedStations.size / PLAB2_OSCE_STATIONS.length) * 100;
  };

  const getAverageScore = () => {
    const scores = Object.values(stationScores);
    return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  };

  if (activeStation) {
    return <OSCEStationView station={activeStation} onComplete={handleStationComplete} onBack={() => setActiveStation(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB 2 OSCE Practice</h1>
          <p className="text-gray-600">16-20 clinical stations • 8-10 minutes each • History, Examination, Explanation, Ethics, Acute Care</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedStations.size}/{PLAB2_OSCE_STATIONS.length}
              </div>
              <Progress value={getOverallProgress()} className="mb-2" />
              <p className="text-sm text-gray-600">{Math.round(getOverallProgress())}% Complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Average Score</CardTitle>
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
              <CardTitle className="text-lg">Station Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(OSCE_STATION_STATS.byType).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="capitalize">{OSCE_STATION_TYPES[type as keyof typeof OSCE_STATION_TYPES]}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Exam Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All ({PLAB2_OSCE_STATIONS.length})</TabsTrigger>
            <TabsTrigger value="history">History ({OSCE_STATION_STATS.byType.history})</TabsTrigger>
            <TabsTrigger value="examination">Exam ({OSCE_STATION_STATS.byType.examination})</TabsTrigger>
            <TabsTrigger value="explanation">Explain ({OSCE_STATION_STATS.byType.explanation})</TabsTrigger>
            <TabsTrigger value="ethics">Ethics ({OSCE_STATION_STATS.byType.ethics})</TabsTrigger>
            <TabsTrigger value="acute-care">Acute ({OSCE_STATION_STATS.byType['acute-care']})</TabsTrigger>
            <TabsTrigger value="practical-skills">Skills ({OSCE_STATION_STATS.byType['practical-skills']})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStations.map((station) => {
                const IconComponent = getStationTypeIcon(station.type);
                const isCompleted = completedStations.has(station.id);
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
                      <CardTitle className="text-lg leading-tight">{station.title}</CardTitle>
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
  const [timeRemaining, setTimeRemaining] = useState(station.duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [selfScore, setSelfScore] = useState(0);

  // Timer logic would go here
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack}>
            ← Back to Stations
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
                <CardTitle className="text-2xl mb-2">Station {station.stationNumber}: {station.title}</CardTitle>
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
                <CardTitle>Candidate Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{station.instructions.candidate}</p>
              </CardContent>
            </Card>
            
            {station.instructions.standardizedPatient && (
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
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
                <CardTitle>Clinical Scenario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-lg">{station.scenario}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Learning Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {station.keyLearningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marking" className="space-y-4">
            {station.markingCriteria.map((criteria, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{criteria.category} ({criteria.maxMarks} marks)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {criteria.criteria.map((criterion, criterionIndex) => (
                      <li key={criterionIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {station.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Self-Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Notes</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={6}
                    placeholder="Reflect on your performance, what went well, what could be improved..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Self Score (0-20)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className="w-24 p-2 border border-gray-300 rounded"
                    value={selfScore}
                    onChange={(e) => setSelfScore(Number(e.target.value))}
                  />
                </div>

                <Button
                  onClick={() => onComplete(station.id, selfScore)}
                  className="w-full"
                  disabled={selfScore === 0}
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

  const getStationIcon = (category: string) => {
    switch (category) {
      case 'history-taking': return '🗣️';
      case 'examination': return '🔍';
      case 'communication': return '💬';
      case 'emergency': return '🚨';
      case 'procedures': return '🔬';
      default: return '🩺';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-mint-green';
    if (score >= 70) return 'text-amber-warning';
    return 'text-deep-rose';
  };

  if (activeStation) {
    return (
      <div className="min-h-screen bg-light-bg py-8">
        <OsceStationComponent
          station={activeStation}
          onStationComplete={handleStationComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>PLAB 2 OSCE Preparation</h1>
            <p className="text-xl" style={{ color: '#666666' }}>Master clinical skills through interactive simulations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.filter(a => a.score >= 70).length || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Stations Passed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.length ? Math.round(userAttempts.reduce((acc, a) => acc + a.score, 0) / userAttempts.length) : 0}%
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Score</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.length || 0}/{stations?.length || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Stations Attempted</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                8
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Avg. Time (min)</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* OSCE Stations */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center" style={{ color: '#000000' }}>
                  <Stethoscope className="w-6 h-6 mr-3 text-red-600" />
                  OSCE Stations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stationsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ color: '#000000' }}>Loading stations...</span>
                    </div>
                  </div>
                ) : stations && stations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stations.map((station) => {
                      const attempt = getStationAttempt(station.id);
                      const isCompleted = !!attempt;
                      
                      return (
                        <div
                          key={station.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-lg">{getStationIcon(station.category)}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold" style={{ color: '#000000' }}>{station.title}</h3>
                                <p className="text-sm capitalize" style={{ color: '#666666' }}>{station.category.replace('-', ' ')}</p>
                              </div>
                            </div>
                            
                            {isCompleted && (
                              <Badge className="bg-green-600 text-white">
                                {attempt.score}%
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm mb-4 line-clamp-2" style={{ color: '#000000' }}>
                            {station.description}
                          </p>

                          <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#666666' }}>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{station.timeLimit} minutes</span>
                            </div>
                            {isCompleted && (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>

                          <Button
                            id={`station-${station.id}-btn`}
                            onClick={() => setActiveStation(station)}
                            className={`w-full ${
                              isCompleted 
                                ? 'btn-secondary' 
                                : 'btn-medical'
                            }`}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isCompleted ? 'Practice Again' : 'Start Station'}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>No OSCE Stations Available</h3>
                    <p className="text-gray-600">OSCE stations will be available once you complete PLAB 1 preparation.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Attempts */}
            {userAttempts && userAttempts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Recent Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAttempts.slice(0, 5).map((attempt) => {
                      const station = stations?.find(s => s.id === attempt.stationId);
                      
                      return (
                        <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-deep-rose/10 rounded-lg flex items-center justify-center">
                              <span className="text-lg">{station ? getStationIcon(station.category) : '🩺'}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{station?.title || 'Unknown Station'}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(attempt.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${getPerformanceColor(attempt.score)}`}>
                              {attempt.score}%
                            </div>
                            <div className="text-sm text-gray-600">
                              {attempt.score >= 70 ? 'Pass' : 'Needs Work'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* OSCE Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">OSCE Success Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-medical-blue">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Communication
                    </h4>
                    <p className="text-sm text-gray-700">
                      Introduce yourself, maintain eye contact, and show empathy throughout the interaction.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-mint-green">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Time Management
                    </h4>
                    <p className="text-sm text-gray-700">
                      Practice timing yourself. Most stations are 8-10 minutes with structured tasks.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-accent">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Clinical Skills
                    </h4>
                    <p className="text-sm text-gray-700">
                      Follow a systematic approach for examinations and clearly verbalize your findings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['history-taking', 'examination', 'communication', 'emergency'].map((category) => {
                    const categoryAttempts = userAttempts?.filter(a => {
                      const station = stations?.find(s => s.id === a.stationId);
                      return station?.category === category;
                    }) || [];
                    
                    const avgScore = categoryAttempts.length > 0 
                      ? categoryAttempts.reduce((acc, a) => acc + a.score, 0) / categoryAttempts.length 
                      : 0;

                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-deep-rose/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm">{getStationIcon(category)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {category.replace('-', ' ')}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {categoryAttempts.length} attempts
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getPerformanceColor(avgScore)}`}>
                            {Math.round(avgScore)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Exam Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">PLAB 2 Exam Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">18 OSCE Stations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Mark:</span>
                    <span className="font-medium">~70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">£890</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-sm">
                    View OSCE Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

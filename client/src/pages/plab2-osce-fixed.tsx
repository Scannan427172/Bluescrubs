import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Stethoscope, Play, Clock, Users, Video, Mic, 
  CheckCircle, Star, Calendar, Award, BookOpen,
  ClipboardList, Heart, Brain, AlertTriangle
} from "lucide-react";
import { PLAB2_OSCE_STATIONS, OSCE_STATION_TYPES, OSCE_STATION_STATS, type OSCEStation } from "@shared/plab2-osce-stations";
import { Top10Leaderboard } from "@/components/top-10-leaderboard";

export default function Plab2Osce() {
  const [activeStation, setActiveStation] = useState<OSCEStation | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [completedStations, setCompletedStations] = useState<string[]>([]);
  const [stationScores, setStationScores] = useState<Record<string, number>>({});

  const filteredStations = PLAB2_OSCE_STATIONS.filter(station => 
    selectedType === 'all' || station.type === selectedType
  );

  const handleStationComplete = (stationId: string, score: number) => {
    setCompletedStations(prev => [...prev.filter(id => id !== stationId), stationId]);
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
                {completedStations.length}/{PLAB2_OSCE_STATIONS.length}
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
  const [timeRemaining, setTimeRemaining] = useState(station.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [selfScore, setSelfScore] = useState(0);

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

        <Tabs value={currentSection} onValueChange={(value) => setCurrentSection(value as any)} className="w-full">
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
                  <Textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={6}
                    placeholder="Reflect on your performance, what went well, what could be improved..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Self Score (0-20)</label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    className="w-24"
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

        {/* Global Leaderboard */}
        <div className="mt-8">
          <Top10Leaderboard />
        </div>
      </div>
    </div>
  );
}
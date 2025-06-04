import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, Play, Pause, Volume2, Mic, Camera, 
  Star, Clock, Users, Award, RotateCcw,
  MessageCircle, CheckCircle, AlertCircle
} from "lucide-react";

export default function VideoOsce() {
  const [currentStation, setCurrentStation] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoStations = [
    {
      id: 1,
      title: "History Taking - Chest Pain",
      category: "History Taking",
      difficulty: "Intermediate",
      duration: 8,
      description: "Take a focused history from a 45-year-old male presenting with chest pain",
      videoUrl: "/videos/chest-pain-patient.mp4", // Would be actual video
      patientInfo: {
        name: "Mr. James Thompson",
        age: 45,
        occupation: "Office Manager",
        background: "Presents to A&E with 2-hour history of central chest pain"
      },
      learningObjectives: [
        "Assess cardiovascular risk factors",
        "Differentiate cardiac vs non-cardiac chest pain",
        "Demonstrate empathy and professionalism",
        "Structure consultation within time limit"
      ],
      markingCriteria: {
        history: 40,
        communication: 30,
        professionalism: 20,
        management: 10
      },
      completed: false,
      attempts: 0
    },
    {
      id: 2,
      title: "Breaking Bad News - Cancer Diagnosis",
      category: "Communication",
      difficulty: "Advanced",
      duration: 10,
      description: "Break news of lung cancer diagnosis to a patient and their spouse",
      videoUrl: "/videos/cancer-diagnosis.mp4",
      patientInfo: {
        name: "Mrs. Sarah Wilson",
        age: 58,
        occupation: "Teacher",
        background: "Awaiting results of lung biopsy, attended with husband"
      },
      learningObjectives: [
        "Use SPIKES protocol effectively",
        "Show appropriate empathy",
        "Handle emotional responses",
        "Provide clear next steps"
      ],
      markingCriteria: {
        structure: 25,
        empathy: 35,
        clarity: 25,
        support: 15
      },
      completed: true,
      attempts: 2,
      bestScore: 87
    },
    {
      id: 3,
      title: "Physical Examination - Abdominal",
      category: "Examination",
      difficulty: "Intermediate",
      duration: 6,
      description: "Perform systematic abdominal examination on standardized patient",
      videoUrl: "/videos/abdominal-exam.mp4",
      patientInfo: {
        name: "Mr. David Chen",
        age: 35,
        occupation: "Engineer",
        background: "6-week history of intermittent abdominal pain and bloating"
      },
      learningObjectives: [
        "Demonstrate systematic approach",
        "Identify abnormal findings",
        "Maintain patient dignity",
        "Explain findings clearly"
      ],
      markingCriteria: {
        technique: 50,
        findings: 30,
        communication: 20
      },
      completed: false,
      attempts: 1
    },
    {
      id: 4,
      title: "Mental Health Assessment",
      category: "Psychiatry",
      difficulty: "Advanced",
      duration: 12,
      description: "Assess a patient presenting with depression and suicidal ideation",
      videoUrl: "/videos/mental-health.mp4",
      patientInfo: {
        name: "Ms. Emma Roberts",
        age: 28,
        occupation: "Marketing Executive",
        background: "Self-referred following 3 months of low mood and anxiety"
      },
      learningObjectives: [
        "Conduct suicide risk assessment",
        "Show empathy without judgment",
        "Identify protective factors",
        "Plan appropriate management"
      ],
      markingCriteria: {
        assessment: 40,
        riskEvaluation: 35,
        empathy: 15,
        planning: 10
      },
      completed: false,
      attempts: 0
    }
  ];

  const categories = ["All", "History Taking", "Communication", "Examination", "Psychiatry"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStations = videoStations.filter(station => 
    selectedCategory === "All" || station.category === selectedCategory
  );

  const completedStations = videoStations.filter(s => s.completed).length;
  const averageScore = videoStations
    .filter(s => s.completed && s.bestScore)
    .reduce((acc, s) => acc + s.bestScore!, 0) / 
    videoStations.filter(s => s.completed && s.bestScore).length || 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const startStation = (station: any) => {
    setCurrentStation(station);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-8 h-8 mr-3 text-purple-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Video OSCE Simulator</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Practice with realistic video-based patient interactions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{videoStations.length}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Video Stations</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{completedStations}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{Math.round(averageScore) || 0}%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Score</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {videoStations.reduce((acc, s) => acc + s.duration, 0)}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Total Minutes</div>
            </CardContent>
          </Card>
        </div>

        {currentStation ? (
          /* Video Station Interface */
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ color: '#000000' }}>{currentStation.title}</CardTitle>
                  <p className="text-gray-600">{currentStation.description}</p>
                </div>
                <Button variant="outline" onClick={() => setCurrentStation(null)}>
                  Back to Stations
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Video Player */}
                <div className="lg:col-span-2">
                  <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="w-16 h-16 text-white mb-4 mx-auto" />
                        <p className="text-white">Video Player</p>
                        <p className="text-gray-300 text-sm">Patient: {currentStation.patientInfo.name}</p>
                      </div>
                    </div>
                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
                      <Button size="sm" variant="outline" onClick={togglePlayback}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Progress value={30} className="flex-1" />
                      <Volume2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Recording Controls */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium" style={{ color: '#000000' }}>Your Response</h3>
                      <div className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-gray-500" />
                        <Mic className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button 
                        onClick={toggleRecording}
                        className={`${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                      >
                        {isRecording ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restart
                      </Button>
                      <div className="flex-1 text-right">
                        <span className="text-sm text-gray-600">
                          Time remaining: {currentStation.duration}:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Station Information */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg" style={{ color: '#000000' }}>Patient Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <span className="font-medium" style={{ color: '#000000' }}>Name:</span>
                        <span className="ml-2 text-gray-600">{currentStation.patientInfo.name}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#000000' }}>Age:</span>
                        <span className="ml-2 text-gray-600">{currentStation.patientInfo.age}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#000000' }}>Occupation:</span>
                        <span className="ml-2 text-gray-600">{currentStation.patientInfo.occupation}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#000000' }}>Background:</span>
                        <p className="text-gray-600 mt-1">{currentStation.patientInfo.background}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg" style={{ color: '#000000' }}>Learning Objectives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentStation.learningObjectives.map((objective: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg" style={{ color: '#000000' }}>Marking Criteria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(currentStation.markingCriteria).map(([criteria, percentage]) => (
                          <div key={criteria} className="flex justify-between">
                            <span className="text-sm capitalize" style={{ color: '#000000' }}>{criteria}:</span>
                            <span className="text-sm text-gray-600">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Station Selection */
          <Tabs defaultValue="stations" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stations">Video Stations</TabsTrigger>
              <TabsTrigger value="recordings">My Recordings</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="stations" className="space-y-6">
              {/* Category Filter */}
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-purple-600 text-white" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Station Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredStations.map((station) => (
                  <Card key={station.id} className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-lg" style={{ color: '#000000' }}>{station.title}</CardTitle>
                            {station.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={getDifficultyColor(station.difficulty)}>
                              {station.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {station.duration} min
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {station.category}
                            </Badge>
                          </div>
                        </div>
                        {station.completed && station.bestScore && (
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{station.bestScore}%</div>
                            <div className="text-xs text-gray-500">Best Score</div>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{station.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          Patient: {station.patientInfo.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Attempts: {station.attempts}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => startStation(station)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {station.completed ? 'Practice Again' : 'Start Station'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recordings" className="space-y-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Your Practice Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>No recordings yet</h3>
                    <p className="text-gray-600 mb-6">Complete a video station to start building your practice library</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start First Station
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>AI Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>AI feedback coming soon</h3>
                    <p className="text-gray-600 mb-6">Complete video stations to receive detailed AI analysis of your communication skills</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
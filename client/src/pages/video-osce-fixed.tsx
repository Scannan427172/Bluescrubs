import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, Play, Pause, Square, RotateCcw, Clock, Users, Target,
  MessageCircle, CheckCircle, AlertCircle
} from "lucide-react";

export default function VideoOsce() {
  const [currentStation, setCurrentStation] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [userRecordings, setUserRecordings] = useState<{id: string, stationId: number, blob: Blob, timestamp: Date, analysis?: any}[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [analyzingRecording, setAnalyzingRecording] = useState<string | null>(null);

  const videoStations = [
    {
      id: 1,
      title: "History Taking - Chest Pain",
      category: "History Taking",
      difficulty: "Beginner",
      duration: 8,
      description: "Take focused history from patient presenting with acute chest pain",
      videoUrl: "/videos/chest-pain-history.mp4",
      patientInfo: {
        name: "Mr. John Smith",
        age: 45,
        occupation: "Accountant",
        background: "Presented to A&E with 2-hour history of central chest pain"
      },
      learningObjectives: [
        "Obtain relevant history for chest pain",
        "Assess cardiovascular risk factors",
        "Show empathy and professionalism",
        "Explain next steps clearly"
      ],
      markingCriteria: {
        history: 60,
        communication: 25,
        professionalism: 15
      },
      completed: true,
      attempts: 3,
      bestScore: 92
    },
    {
      id: 2,
      title: "Breaking Bad News - Cancer Diagnosis",
      category: "Communication",
      difficulty: "Advanced",
      duration: 10,
      description: "Break news of cancer diagnosis to patient and family member",
      videoUrl: "/videos/breaking-bad-news.mp4",
      patientInfo: {
        name: "Mrs. Sarah Johnson",
        age: 58,
        occupation: "Teacher",
        background: "Results of recent biopsy show malignant breast tumor"
      },
      learningObjectives: [
        "Use appropriate setting and preparation",
        "Deliver news sensitively and clearly",
        "Respond to emotional reactions",
        "Provide ongoing support information"
      ],
      markingCriteria: {
        preparation: 20,
        delivery: 40,
        empathy: 25,
        followUp: 15
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
        assessment: 45,
        safety: 30,
        rapport: 25
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

  const analyzeRecording = async (recordingId: string, station: any, duration: number) => {
    setAnalyzingRecording(recordingId);
    try {
      const response = await fetch('/api/ai/analyze-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stationTitle: station.title,
          stationCategory: station.category,
          learningObjectives: station.learningObjectives,
          recordingDuration: duration
        })
      });

      if (response.ok) {
        const analysis = await response.json();
        setUserRecordings(prev => 
          prev.map(rec => 
            rec.id === recordingId 
              ? { ...rec, analysis }
              : rec
          )
        );
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzingRecording(null);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const recordingId = Date.now().toString();
        const recording = {
          id: recordingId,
          stationId: currentStation.id,
          blob,
          timestamp: new Date()
        };
        setUserRecordings(prev => [...prev, recording]);
        setRecordedChunks([]);
        stream.getTracks().forEach(track => track.stop());
        
        // Automatically analyze the recording
        analyzeRecording(recordingId, currentStation, recordingTime);
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Please allow camera and microphone access to record your response.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{Math.round(averageScore)}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{userRecordings.length}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Recordings</div>
            </CardContent>
          </Card>
        </div>

        {currentStation ? (
          <div className="space-y-6">
            {/* Station Video Player */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardContent className="p-6">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Video Player</p>
                        <p className="text-sm opacity-75">Patient interaction simulation</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={toggleRecording}
                        className={isRecording ? "bg-red-600 hover:bg-red-700" : "btn-medical"}
                        style={isRecording ? {} : { backgroundColor: '#3B82F6', color: 'white' }}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-4 h-4 mr-2" />
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
                        {isRecording ? (
                          <span className="text-sm text-red-600 font-medium">
                            Recording: {formatTime(recordingTime)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            Time limit: {currentStation.duration}:00
                          </span>
                        )}
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
                        {Object.entries(currentStation.markingCriteria).map(([criterion, percentage]) => (
                          <div key={criterion} className="flex justify-between items-center">
                            <span className="text-sm capitalize" style={{ color: '#000000' }}>{criterion.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-sm font-medium text-purple-600">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#000000' }}>{currentStation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(currentStation.difficulty)}>
                        {currentStation.difficulty}
                      </Badge>
                      <Badge variant="outline">{currentStation.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{currentStation.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentStation.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{currentStation.attempts} attempts</span>
                      </div>
                      {currentStation.bestScore && (
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{currentStation.bestScore}%</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setCurrentStation(null)}
                    >
                      Back to Stations
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="stations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stations">Practice Stations</TabsTrigger>
              <TabsTrigger value="recordings">My Recordings</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="stations" className="space-y-6">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Filter by category:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStations.map((station) => (
                  <Card key={station.id} className="bg-white border hover:shadow-lg transition-shadow cursor-pointer" style={{ backgroundColor: '#ffffff' }}>
                    <CardContent className="p-6" onClick={() => startStation(station)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>{station.title}</h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={getDifficultyColor(station.difficulty)}>
                              {station.difficulty}
                            </Badge>
                            <Badge variant="outline">{station.category}</Badge>
                          </div>
                        </div>
                        {station.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{station.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{station.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{station.attempts} attempts</span>
                        </div>
                        {station.bestScore && (
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>{station.bestScore}%</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full btn-medical" style={{ backgroundColor: '#3B82F6', color: 'white' }}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Station
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
                  {userRecordings.length === 0 ? (
                    <div className="text-center py-12">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>No recordings yet</h3>
                      <p className="text-gray-600 mb-6">Complete a video station to start building your practice library</p>
                      <Button id="start-first-video-station-btn" className="btn-medical" style={{ backgroundColor: '#3B82F6', color: 'white' }}>
                        Start First Station
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userRecordings.map((recording) => {
                        const station = videoStations.find(s => s.id === recording.stationId);
                        return (
                          <Card key={recording.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium" style={{ color: '#000000' }}>
                                    {station?.title || 'Unknown Station'}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Recorded on {recording.timestamp.toLocaleDateString()} at {recording.timestamp.toLocaleTimeString()}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      const videoUrl = URL.createObjectURL(recording.blob);
                                      window.open(videoUrl, '_blank');
                                    }}
                                  >
                                    <Play className="w-4 h-4 mr-1" />
                                    Play
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      const url = URL.createObjectURL(recording.blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `${station?.title || 'recording'}-${recording.timestamp.toISOString().split('T')[0]}.webm`;
                                      document.body.appendChild(a);
                                      a.click();
                                      document.body.removeChild(a);
                                      URL.revokeObjectURL(url);
                                    }}
                                  >
                                    Download
                                  </Button>
                                </div>
                              </div>
                              <video 
                                className="w-full max-w-md rounded-lg" 
                                controls
                                src={URL.createObjectURL(recording.blob)}
                              />
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>AI Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {userRecordings.filter(r => r.analysis).length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>No analysis available yet</h3>
                      <p className="text-gray-600 mb-6">Complete and record video stations to receive detailed AI analysis of your performance</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userRecordings.filter(r => r.analysis).map((recording) => {
                        const station = videoStations.find(s => s.id === recording.stationId);
                        const analysis = recording.analysis;
                        return (
                          <Card key={recording.id} className="bg-gray-50">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-semibold text-lg" style={{ color: '#000000' }}>
                                    {station?.title || 'Unknown Station'}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Analysis completed on {recording.timestamp.toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-purple-600">
                                    {analysis.overallScore}/100
                                  </div>
                                  <div className="text-sm text-gray-600">Overall Score</div>
                                </div>
                              </div>

                              {/* Score Breakdown */}
                              <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-3 bg-white rounded-lg">
                                  <div className="text-xl font-semibold text-blue-600">
                                    {analysis.communicationScore}
                                  </div>
                                  <div className="text-sm text-gray-600">Communication</div>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                  <div className="text-xl font-semibold text-green-600">
                                    {analysis.technicalScore}
                                  </div>
                                  <div className="text-sm text-gray-600">Technical</div>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                  <div className="text-xl font-semibold text-purple-600">
                                    {analysis.professionalismScore}
                                  </div>
                                  <div className="text-sm text-gray-600">Professionalism</div>
                                </div>
                              </div>

                              {/* Detailed Analysis */}
                              <div className="mb-6">
                                <h5 className="font-medium mb-2" style={{ color: '#000000' }}>Analysis Summary</h5>
                                <p className="text-gray-700 text-sm">{analysis.detailedAnalysis}</p>
                              </div>

                              {/* Feedback Sections */}
                              <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                  <h5 className="font-medium mb-2 text-green-700">Strengths</h5>
                                  <ul className="space-y-1">
                                    {analysis.feedback.strengths.map((strength: string, index: number) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2 text-orange-700">Areas to Improve</h5>
                                  <ul className="space-y-1">
                                    {analysis.feedback.improvements.map((improvement: string, index: number) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <AlertCircle className="w-3 h-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {improvement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2 text-blue-700">Specific Advice</h5>
                                  <ul className="space-y-1">
                                    {analysis.feedback.specificAdvice.map((advice: string, index: number) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <MessageCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {advice}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                  {analyzingRecording && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                        <span className="text-sm text-blue-700">Analyzing your recording with AI...</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
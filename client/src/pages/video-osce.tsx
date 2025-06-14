import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Video, Play, Square, RotateCcw, Clock, Users, Target,
  MessageCircle, CheckCircle, AlertCircle, Volume2, Languages, 
  Mic, MicOff, Globe
} from "lucide-react";

export default function VideoOsce() {
  const [currentStation, setCurrentStation] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [userRecordings, setUserRecordings] = useState<{id: string, stationId: number, blob: Blob, timestamp: Date, analysis?: any}[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [analyzingRecording, setAnalyzingRecording] = useState<string | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isMobile: false,
    isTablet: false,
    supportsWebRTC: false
  });
  const [cameraReady, setCameraReady] = useState(false);
  
  // Multilingual state
  const [translationMode, setTranslationMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Language options with flags and names
  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
  ];
  
  // Enhanced device detection on component mount
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';
    
    const deviceDetection = {
      isIOS: /ipad|iphone|ipod/.test(userAgent) || 
             (platform === 'macintel' && navigator.maxTouchPoints > 1),
      isAndroid: /android/.test(userAgent),
      isSafari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
      isChrome: /chrome/.test(userAgent) && !/edg/.test(userAgent),
      isFirefox: /firefox/.test(userAgent),
      isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
      isTablet: /ipad|android(?!.*mobile)/i.test(userAgent),
      supportsWebRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    };
    
    setDeviceInfo(deviceDetection);
    console.log('Enhanced device detection:', { ...deviceDetection, userAgent, platform });
  }, []);

  const videoStations = [
    {
      id: 1,
      title: "History Taking - Chest Pain",
      category: "History Taking",
      difficulty: "Beginner",
      duration: 8,
      description: "Take focused history from patient presenting with acute chest pain",
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
      completed: false,
      attempts: 1
    }
  ];

  const categories = ["All", "History Taking", "Communication", "Examination"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Translation and voice synthesis functions
  const translateStation = async (station: any) => {
    if (selectedLanguage === 'en' || !translationMode) return station;
    
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate/video-station', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ station, targetLanguage: selectedLanguage })
      });

      if (!response.ok) throw new Error('Translation failed');
      
      const translated = await response.json();
      setTranslatedContent(translated);
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return station;
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Enhanced voice settings for natural speech
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      
      // Language matching
      const languageMap: Record<string, string> = {
        'ar': 'ar-SA', 'ur': 'ur-PK', 'hi': 'hi-IN', 'bn': 'bn-BD',
        'ta': 'ta-IN', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
        'it': 'it-IT', 'pt': 'pt-PT', 'ru': 'ru-RU', 'pl': 'pl-PL',
        'ro': 'ro-RO', 'zh': 'zh-CN', 'ja': 'ja-JP', 'ko': 'ko-KR',
        'tr': 'tr-TR', 'fa': 'fa-IR', 'he': 'he-IL', 'th': 'th-TH',
        'vi': 'vi-VN', 'id': 'id-ID', 'en': 'en-GB'
      };
      
      utterance.lang = languageMap[selectedLanguage] || 'en-GB';
      
      // Find appropriate voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith(utterance.lang.split('-')[0])
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    }
  };

  const filteredStations = videoStations.filter(station => 
    selectedCategory === "All" || station.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const analyzeRecording = async (recordingId: string, station: any, duration: number) => {
    setAnalyzingRecording(recordingId);
    try {
      // Ensure all required parameters are present
      const requestData = {
        stationTitle: station?.title || 'Unknown Station',
        stationCategory: station?.category || 'General',
        learningObjectives: station?.learningObjectives || ['General medical skills assessment'],
        recordingDuration: duration || 60
      };

      console.log('Sending analysis request:', requestData);

      const response = await fetch('/api/ai/analyze-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
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
      } else {
        const errorData = await response.json();
        console.error('Analysis API error:', errorData);
        throw new Error(errorData.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzingRecording(null);
    }
  };

  const startRecording = async () => {
    try {
      setCameraError(null);
      
      // Enhanced mobile device compatibility - device-specific constraints
      let stream;
      const constraintsOptions = [];
      
      if (deviceInfo.isIOS) {
        // iOS (iPhone/iPad Safari) optimized constraints
        constraintsOptions.push(
          {
            video: {
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              facingMode: 'user',
              frameRate: { ideal: 30, max: 30 },
              aspectRatio: { ideal: 16/9 }
            }, 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          },
          {
            video: {
              facingMode: 'user',
              width: { ideal: 854, max: 1280 },
              height: { ideal: 480, max: 720 },
              frameRate: { ideal: 24 }
            },
            audio: true
          }
        );
      }
      
      if (deviceInfo.isAndroid) {
        // Android Chrome/Firefox optimized constraints
        constraintsOptions.push(
          {
            video: {
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              facingMode: 'user',
              frameRate: { ideal: 30, max: 60 }
            }, 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: 44100
            }
          },
          {
            video: {
              facingMode: 'user',
              width: { ideal: 854 },
              height: { ideal: 480 },
              frameRate: { ideal: 24 }
            },
            audio: true
          }
        );
      }
      
      // Universal fallbacks for all mobile devices
      constraintsOptions.push(
        {
          video: {
            facingMode: 'user',
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            frameRate: { ideal: 20 }
          },
          audio: true
        },
        {
          video: {
            facingMode: 'user',
            width: 640,
            height: 480,
            frameRate: 15
          },
          audio: true
        },
        {
          video: { facingMode: 'user' },
          audio: true
        },
        {
          video: true,
          audio: true
        }
      );

      let lastError;
      for (const constraints of constraintsOptions) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          break;
        } catch (error) {
          lastError = error;
          console.log('Trying next constraint option due to:', error);
        }
      }

      if (!stream) {
        throw lastError || new Error('Unable to access camera');
      }
      
      setVideoStream(stream);
      setCameraReady(true);
      
      // Set up video preview with iOS compatibility
      if (videoRef) {
        videoRef.srcObject = stream;
        videoRef.setAttribute('playsinline', 'true');
        videoRef.setAttribute('webkit-playsinline', 'true');
        videoRef.muted = true;
        videoRef.autoplay = true;
        
        // Device-specific video handling
        if (deviceInfo.isIOS) {
          // iOS Safari specific attributes and behavior
          videoRef.setAttribute('controls', 'false');
          videoRef.setAttribute('preload', 'metadata');
          videoRef.style.transform = 'scaleX(-1)'; // Mirror for selfie view
          
          // iOS event listeners for optimal playback
          videoRef.addEventListener('loadedmetadata', async () => {
            console.log('iOS: Video metadata loaded');
            try {
              await videoRef.play();
              console.log('iOS: Video playing successfully');
            } catch (e) {
              console.log('iOS: Play requires user interaction');
            }
          });
          
          videoRef.addEventListener('canplay', () => {
            console.log('iOS: Video can play');
          });
        }
        
        if (deviceInfo.isAndroid) {
          // Android Chrome/Firefox specific setup
          videoRef.setAttribute('preload', 'auto');
          videoRef.style.transform = 'scaleX(-1)'; // Mirror for selfie view
          
          videoRef.addEventListener('canplay', () => {
            console.log('Android: Video ready to play');
            videoRef.play().catch(e => console.log('Android: Play requires interaction'));
          });
        }
        
        // Force play for iOS
        try {
          const playPromise = videoRef.play();
          if (playPromise) {
            await playPromise;
          }
        } catch (playError) {
          console.log('Video play error (expected on some devices):', playError);
        }
      }
      
      // Enhanced device-specific MediaRecorder format selection
      let mimeType = '';
      let recordingFormat = 'video/webm';
      
      if (deviceInfo.isIOS) {
        // iOS Safari prefers MP4 H.264
        if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E,mp4a.40.2')) {
          mimeType = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
          recordingFormat = 'video/mp4';
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          mimeType = 'video/mp4';
          recordingFormat = 'video/mp4';
        } else if (MediaRecorder.isTypeSupported('video/webm')) {
          mimeType = 'video/webm';
        }
      } else if (deviceInfo.isAndroid) {
        // Android Chrome prefers WebM VP8/VP9
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
          mimeType = 'video/webm;codecs=vp9,opus';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
          mimeType = 'video/webm;codecs=vp8,opus';
        } else if (MediaRecorder.isTypeSupported('video/webm')) {
          mimeType = 'video/webm';
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          mimeType = 'video/mp4';
          recordingFormat = 'video/mp4';
        }
      } else {
        // Desktop fallbacks
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
          mimeType = 'video/webm;codecs=vp9,opus';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
          mimeType = 'video/webm;codecs=vp8,opus';
        } else if (MediaRecorder.isTypeSupported('video/webm')) {
          mimeType = 'video/webm';
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          mimeType = 'video/mp4';
          recordingFormat = 'video/mp4';
        }
      }
      
      console.log(`Selected recording format: ${mimeType || 'default'} for device:`, deviceInfo);

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const recordingId = Date.now().toString();
        const recording = {
          id: recordingId,
          stationId: currentStation.id,
          blob,
          timestamp: new Date()
        };
        setUserRecordings(prev => [...prev, recording]);
        
        // Stop camera preview
        stream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
        if (videoRef) {
          videoRef.srcObject = null;
        }
        
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
      
    } catch (error: any) {
      console.error('Error accessing camera/microphone:', error);
      
      let errorMessage = 'Camera access failed. ';
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera and microphone permissions in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera or microphone found. Please check your devices.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is being used by another application.';
      } else {
        errorMessage += 'Please check your camera and microphone settings.';
      }
      
      setCameraError(errorMessage);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-8 h-8 mr-3 text-purple-600" />
              <h1 className="text-4xl font-bold text-black">Video OSCE Simulator</h1>
            </div>
            <p className="text-xl text-gray-600">Practice with realistic video-based patient interactions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1 text-black">{videoStations.length}</div>
              <div className="text-sm text-gray-600">Video Stations</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1 text-black">{videoStations.filter(s => s.completed).length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1 text-black">89</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold mb-1 text-black">{userRecordings.length}</div>
              <div className="text-sm text-gray-600">Recordings</div>
            </CardContent>
          </Card>
        </div>

        {currentStation ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                      {cameraError ? (
                        <div className="text-center text-white p-4">
                          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                          <p className="text-lg font-medium text-red-400">Camera Error</p>
                          <p className="text-sm opacity-75 mt-2">{cameraError}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4 text-white border-white hover:bg-white hover:text-gray-900"
                            onClick={() => {
                              setCameraError(null);
                              startRecording();
                            }}
                          >
                            Try Again
                          </Button>
                        </div>
                      ) : videoStream || isRecording ? (
                        <video 
                          ref={setVideoRef}
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          playsInline
                          muted
                          controls={false}
                          preload="metadata"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="text-center text-white">
                          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Camera Preview</p>
                          <p className="text-sm opacity-75">Click "Start Recording" to begin</p>
                          <Button 
                            onClick={async () => {
                              try {
                                setCameraError(null);
                                
                                // iOS Safari requires specific approach
                                const constraints = {
                                  video: {
                                    facingMode: 'user',
                                    width: { ideal: 640 },
                                    height: { ideal: 480 }
                                  },
                                  audio: true
                                };
                                
                                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                                setVideoStream(stream);
                                setCameraReady(true);
                                
                                if (videoRef) {
                                  videoRef.srcObject = stream;
                                  videoRef.setAttribute('playsinline', 'true');
                                  videoRef.setAttribute('webkit-playsinline', 'true');
                                  videoRef.muted = true;
                                  videoRef.autoplay = true;
                                  
                                  // Device-specific video element setup
                                  if (deviceInfo.isIOS) {
                                    videoRef.setAttribute('controls', 'false');
                                    videoRef.setAttribute('preload', 'metadata');
                                    videoRef.style.transform = 'scaleX(-1)'; // Mirror for selfie
                                    
                                    // Wait for metadata to load before playing
                                    videoRef.addEventListener('loadedmetadata', async () => {
                                      try {
                                        await videoRef.play();
                                        console.log('iOS video playing successfully');
                                      } catch (playError) {
                                        console.log('iOS video play error:', playError);
                                      }
                                    });
                                  } else if (deviceInfo.isAndroid) {
                                    // Android-specific setup
                                    videoRef.setAttribute('preload', 'auto');
                                    videoRef.style.transform = 'scaleX(-1)'; // Mirror for selfie
                                    
                                    videoRef.addEventListener('canplay', () => {
                                      videoRef.play().catch(e => console.log('Android play requires interaction'));
                                    });
                                  } else {
                                    // Desktop and other devices
                                    const playPromise = videoRef.play();
                                    if (playPromise !== undefined) {
                                      playPromise.catch(error => {
                                        console.log('Auto-play prevented, user interaction required');
                                      });
                                    }
                                  }
                                }
                              } catch (error: any) {
                                console.error('Camera error:', error);
                                setCameraError(`Camera access failed: ${error.message}. Please enable camera permissions in your browser settings.`);
                              }
                            }}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            Enable Camera
                          </Button>
                        </div>
                      )}
                      
                      {isRecording && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">REC</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={isRecording ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
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
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-black">{currentStation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Badge className={getDifficultyColor(currentStation.difficulty)}>
                      {currentStation.difficulty}
                    </Badge>
                    <p className="text-gray-600 text-sm">{currentStation.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setCurrentStation(null)}
                    >
                      Back to Stations
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-black">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium text-black">Name:</span>
                      <span className="ml-2 text-gray-600">{currentStation.patientInfo.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-black">Age:</span>
                      <span className="ml-2 text-gray-600">{currentStation.patientInfo.age}</span>
                    </div>
                    <div>
                      <span className="font-medium text-black">Background:</span>
                      <p className="text-gray-600 mt-1">{currentStation.patientInfo.background}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div>
          {/* Multilingual Controls */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <Label htmlFor="translation-toggle" className="text-sm font-medium">
                    Translation Mode
                  </Label>
                  <Switch
                    id="translation-toggle"
                    checked={translationMode}
                    onCheckedChange={setTranslationMode}
                  />
                </div>
                
                {translationMode && (
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4 text-purple-600" />
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  23 languages supported with voice synthesis
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="stations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stations">Practice Stations</TabsTrigger>
              <TabsTrigger value="recordings">My Recordings</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="stations" className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-black">Filter by category:</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStations.map((station) => (
                  <Card key={station.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6" onClick={() => setCurrentStation(station)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 text-black">{station.title}</h3>
                          <Badge className={getDifficultyColor(station.difficulty)}>
                            {station.difficulty}
                          </Badge>
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
                        {translationMode && selectedLanguage !== 'en' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(station.title + '. ' + station.description);
                            }}
                            className="h-8 w-8 p-0 hover:bg-blue-100"
                          >
                            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-blue-600' : 'text-gray-500'}`} />
                          </Button>
                        )}
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Start Station
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recordings" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Your Practice Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                  {userRecordings.length === 0 ? (
                    <div className="text-center py-12">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-black">No recordings yet</h3>
                      <p className="text-gray-600 mb-6">Complete a video station to start building your practice library</p>
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
                                  <h4 className="font-medium text-black">
                                    {station?.title || 'Unknown Station'}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Recorded on {recording.timestamp.toLocaleDateString()}
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
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-black">AI Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {userRecordings.filter(r => r.analysis).length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-black">No analysis available yet</h3>
                      <p className="text-gray-600 mb-6">Complete and record video stations to receive detailed AI analysis</p>
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
                                  <h4 className="font-semibold text-lg text-black">
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

                              <div className="mb-6">
                                <h5 className="font-medium mb-2 text-black">Analysis Summary</h5>
                                <p className="text-gray-700 text-sm">{analysis.detailedAnalysis}</p>
                              </div>

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
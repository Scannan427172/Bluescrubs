import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, MessageCircle, Brain, Lightbulb, Clock, 
  Mic, MicOff, Volume2, VolumeX, Zap, Heart, Target, Book
} from "lucide-react";

export default function AIStudyBuddy() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [studyMode, setStudyMode] = useState<'casual' | 'focused' | 'intensive'>('casual');
  const [emotionalState, setEmotionalState] = useState<'confident' | 'stressed' | 'confused' | 'motivated'>('confident');

  // Mock conversation - in real app this would connect to AI backend
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Study Buddy. I notice you've been working on cardiovascular questions. How are you feeling about your progress today?",
      timestamp: new Date(),
      emotion: 'supportive'
    }
  ]);

  const uniqueFeatures = [
    {
      title: "Emotional Intelligence Coaching",
      description: "AI detects your stress levels and adapts explanations accordingly",
      icon: Heart,
      color: "text-pink-600"
    },
    {
      title: "Voice-First Learning",
      description: "Practice medical pronunciation and have conversations about cases",
      icon: Mic,
      color: "text-blue-600"
    },
    {
      title: "Cultural Medical Bridge",
      description: "Explains UK medical practices vs your home country's approach",
      icon: Brain,
      color: "text-purple-600"
    },
    {
      title: "Real-Time Concept Mapping",
      description: "Visualizes how medical concepts connect as you learn",
      icon: Zap,
      color: "text-yellow-600"
    }
  ];

  const studyModes = [
    { mode: 'casual', label: 'Casual Chat', description: 'Relaxed conversation about medical topics' },
    { mode: 'focused', label: 'Focused Review', description: 'Structured Q&A on specific subjects' },
    { mode: 'intensive', label: 'Intensive Drill', description: 'Rapid-fire questions and immediate feedback' }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const newConversation = [...conversation, {
      role: 'user',
      content: currentMessage,
      timestamp: new Date(),
      emotion: emotionalState
    }];

    // Simulate AI response based on emotional state and study mode
    let aiResponse = "";
    if (emotionalState === 'stressed') {
      aiResponse = "I can sense you're feeling a bit overwhelmed. Let's break this down into smaller, manageable pieces. Take a deep breath - you're doing great! 🫁";
    } else if (studyMode === 'intensive') {
      aiResponse = "Great question! In cardiology, remember the mnemonic 'MONA' for acute MI treatment: Morphine, Oxygen, Nitroglycerin, Aspirin. Quick - what's the contraindication for nitroglycerin?";
    } else {
      aiResponse = "That's an excellent observation! In the UK, the NICE guidelines approach this slightly differently than you might be used to. Let me explain the cultural context...";
    }

    newConversation.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      emotion: 'supportive'
    });

    setConversation(newConversation);
    setCurrentMessage("");
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // In real app, this would start speech recognition
    setTimeout(() => {
      setIsListening(false);
      setCurrentMessage("Can you explain the difference between heart failure classification in the UK versus other countries?");
    }, 2000);
  };

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    // In real app, this would use text-to-speech
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">AI Study Buddy</h1>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            World's First Medical AI Companion
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Revolutionary AI that adapts to your emotions, cultural background, and learning style for personalized medical education.
        </p>
      </div>

      {/* Unique Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {uniqueFeatures.map((feature) => (
          <Card key={feature.title} className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                Industry First
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  AI Study Conversation
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {studyMode} mode
                  </Badge>
                  <Badge variant={emotionalState === 'stressed' ? 'destructive' : 'default'} className="capitalize">
                    {emotionalState}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.role === 'assistant' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => speakResponse(message.content)}
                            className="p-1 h-auto"
                          >
                            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startVoiceInput}
                    disabled={isListening}
                    className={isListening ? "bg-red-50 border-red-200" : ""}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask about medical concepts, express concerns, or request explanations..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!currentMessage.trim()}>
                    Send
                  </Button>
                </div>
                {isListening && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Listening... speak your question
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Study Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyModes.map((mode) => (
                <button
                  key={mode.mode}
                  onClick={() => setStudyMode(mode.mode as any)}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    studyMode === mode.mode 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-sm text-muted-foreground">{mode.description}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Emotional State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                How are you feeling?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {(['confident', 'stressed', 'confused', 'motivated'] as const).map((emotion) => (
                  <Button
                    key={emotion}
                    variant={emotionalState === emotion ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEmotionalState(emotion)}
                    className="capitalize"
                  >
                    {emotion}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                AI adapts explanations based on your emotional state
              </p>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Learning Pattern Detected</p>
                <p className="text-xs text-blue-600 mt-1">
                  You learn cardiovascular concepts 23% faster with visual analogies
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Cultural Bridge Active</p>
                <p className="text-xs text-green-600 mt-1">
                  Explaining UK vs home country medical practice differences
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Stress Level: Optimal</p>
                <p className="text-xs text-purple-600 mt-1">
                  Perfect learning zone - challenging but manageable
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Book className="w-4 h-4 mr-2" />
                Generate Study Plan
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Concept Map
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Break Reminder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
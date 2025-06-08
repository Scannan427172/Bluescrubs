import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Eye, Volume2, Timer, Palette, Brain, Focus, 
  ZoomIn, Pause, RotateCcw, Settings, CheckCircle, Star
} from "lucide-react";

export default function NeurodiverseSupport() {
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [isADHDMode, setIsADHDMode] = useState(false);
  const [isAutismMode, setIsAutismMode] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState([16]);
  const [contrastLevel, setContrastLevel] = useState([50]);
  const [readingSpeed, setReadingSpeed] = useState([100]);
  const [focusMode, setFocusMode] = useState(false);

  const neurodiverseProfiles = [
    {
      name: "Dyslexia Support",
      description: "Enhanced readability and text-to-speech",
      icon: Eye,
      features: [
        "OpenDyslexic font option",
        "Syllable highlighting",
        "Text-to-speech with medical pronunciation",
        "Reading rulers and overlays",
        "Customizable line spacing"
      ],
      isActive: isDyslexiaMode,
      toggle: () => setIsDyslexiaMode(!isDyslexiaMode),
      color: "text-blue-600"
    },
    {
      name: "ADHD Optimization",
      description: "Focus enhancement and distraction reduction",
      icon: Focus,
      features: [
        "Pomodoro timer integration",
        "Minimal distraction interface",
        "Progress chunking",
        "Gamified achievements",
        "Background noise options"
      ],
      isActive: isADHDMode,
      toggle: () => setIsADHDMode(!isADHDMode),
      color: "text-green-600"
    },
    {
      name: "Autism Accommodation",
      description: "Predictable patterns and sensory considerations",
      icon: Brain,
      features: [
        "Consistent navigation patterns",
        "Sensory-friendly color schemes",
        "Detailed progress indicators",
        "Routine-based learning paths",
        "Social interaction controls"
      ],
      isActive: isAutismMode,
      toggle: () => setIsAutismMode(!isAutismMode),
      color: "text-purple-600"
    }
  ];

  const assistiveTechnologies = [
    {
      name: "Medical Text-to-Speech",
      description: "Accurate pronunciation of medical terminology",
      icon: Volume2,
      features: [
        "IPA phonetic breakdown",
        "Etymology explanations",
        "Multiple accent options (UK, US, International)",
        "Speed control for complex terms",
        "Terminology practice mode"
      ]
    },
    {
      name: "Visual Processing Aid",
      description: "Enhanced visual comprehension tools",
      icon: ZoomIn,
      features: [
        "Magnification with context preservation",
        "Color-coded medical categories",
        "Interactive anatomical overlays",
        "Visual memory techniques",
        "Pattern recognition training"
      ]
    },
    {
      name: "Cognitive Load Management",
      description: "Information processing optimization",
      icon: Timer,
      features: [
        "Adaptive content chunking",
        "Cognitive break reminders",
        "Complexity level adjustment",
        "Mental model building",
        "Memory palace techniques"
      ]
    }
  ];

  const adaptiveFeatures = {
    dyslexia: {
      textTransform: "font-family: 'OpenDyslexic', Arial; letter-spacing: 0.1em; line-height: 1.8;",
      highlights: true,
      speechSupport: true,
      wordSpacing: true
    },
    adhd: {
      focusMode: true,
      timerIntegration: true,
      progressChunking: true,
      gamification: true
    },
    autism: {
      consistentLayout: true,
      predictableNavigation: true,
      sensoryFriendly: true,
      routineBased: true
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">Neurodiverse Learning Support</h1>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            World First in Medical Education
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive accessibility features designed specifically for neurodiverse learners pursuing medical careers.
          Evidence-based accommodations that enhance learning without compromising medical education standards.
        </p>
      </div>

      {/* Profile Selection */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {neurodiverseProfiles.map((profile) => (
          <Card key={profile.name} className={`border-2 ${profile.isActive ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <profile.icon className={`w-5 h-5 ${profile.color}`} />
                  {profile.name}
                </div>
                <Switch 
                  checked={profile.isActive} 
                  onCheckedChange={profile.toggle}
                />
              </CardTitle>
              <CardDescription>{profile.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profile.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accessibility Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Personalized Accessibility Settings
          </CardTitle>
          <CardDescription>
            Customize your learning environment to match your specific needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Text Size</label>
                <Slider
                  value={fontSizeLevel}
                  onValueChange={setFontSizeLevel}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Small (12px)</span>
                  <span>Current: {fontSizeLevel[0]}px</span>
                  <span>Large (24px)</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Contrast Level</label>
                <Slider
                  value={contrastLevel}
                  onValueChange={setContrastLevel}
                  max={100}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>Current: {contrastLevel[0]}%</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Reading Speed</label>
                <Slider
                  value={readingSpeed}
                  onValueChange={setReadingSpeed}
                  max={200}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow (50%)</span>
                  <span>Current: {readingSpeed[0]}%</span>
                  <span>Fast (200%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium">Focus Mode</div>
                  <div className="text-sm text-muted-foreground">Hide distracting elements</div>
                </div>
                <Switch checked={focusMode} onCheckedChange={setFocusMode} />
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium mb-2">Active Accommodations</div>
                <div className="space-y-1">
                  {isDyslexiaMode && <Badge variant="outline">Dyslexia Support</Badge>}
                  {isADHDMode && <Badge variant="outline">ADHD Optimization</Badge>}
                  {isAutismMode && <Badge variant="outline">Autism Accommodation</Badge>}
                  {focusMode && <Badge variant="outline">Focus Mode</Badge>}
                  {(!isDyslexiaMode && !isADHDMode && !isAutismMode && !focusMode) && (
                    <span className="text-sm text-muted-foreground">No accommodations active</span>
                  )}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assistive Technologies */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {assistiveTechnologies.map((tech) => (
          <Card key={tech.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <tech.icon className="w-5 h-5 text-blue-600" />
                {tech.name}
              </CardTitle>
              <CardDescription>{tech.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {tech.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button size="sm" className="w-full">
                Enable Feature
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Content with Accommodations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sample Medical Content with Accommodations</CardTitle>
          <CardDescription>
            See how your accessibility settings transform the learning experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`p-4 rounded-lg border ${
              isDyslexiaMode ? 'bg-cream-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}
            style={{
              fontSize: `${fontSizeLevel[0]}px`,
              lineHeight: isDyslexiaMode ? '1.8' : '1.6',
              letterSpacing: isDyslexiaMode ? '0.1em' : 'normal',
              fontFamily: isDyslexiaMode ? 'OpenDyslexic, Arial' : 'inherit'
            }}
          >
            <h3 className="font-bold mb-3">
              {isDyslexiaMode && <span className="text-blue-600">[DYSLEXIA MODE] </span>}
              Myocardial Infarction - Clinical Presentation
            </h3>
            
            <div className={isADHDMode ? 'space-y-4' : 'space-y-2'}>
              <p>
                A <strong>myo-car-di-al in-farc-tion</strong> {isDyslexiaMode && <Button variant="ghost" size="sm" className="p-1 h-auto"><Volume2 className="w-3 h-3" /></Button>} 
                (heart attack) occurs when blood flow to part of the heart muscle is blocked.
              </p>
              
              {isADHDMode && (
                <div className="p-2 bg-green-100 rounded text-sm">
                  <Timer className="w-4 h-4 inline mr-1" />
                  Focus checkpoint: You've read 1 paragraph. Take a breath!
                </div>
              )}
              
              <p>
                <strong>Symptoms include:</strong>
              </p>
              <ul className={`list-disc ml-6 ${isADHDMode ? 'space-y-2' : 'space-y-1'}`}>
                <li>Chest pain (crushing, burning sensation)</li>
                <li>Shortness of breath</li>
                <li>Nausea and vomiting</li>
                <li>Sweating</li>
                <li>Pain radiating to arm, jaw, or back</li>
              </ul>
              
              {isAutismMode && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="text-sm font-medium text-purple-800">Learning Progress</div>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <div className="text-xs text-purple-600 mt-1">60% complete - 2 more sections</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Base */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence-Based Accessibility</CardTitle>
          <CardDescription>
            Our accommodations are based on peer-reviewed research in medical education accessibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Research Foundation</h4>
              <ul className="space-y-2 text-sm">
                <li>• Universal Design for Learning (UDL) principles in medical education</li>
                <li>• Cognitive load theory applications for neurodiverse learners</li>
                <li>• Assistive technology effectiveness in healthcare training</li>
                <li>• Inclusive assessment methods for medical licensing exams</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Professional Standards</h4>
              <ul className="space-y-2 text-sm">
                <li>• GMC requirements for reasonable adjustments</li>
                <li>• Equality Act 2010 compliance</li>
                <li>• WCAG 2.1 AAA accessibility standards</li>
                <li>• Medical education equality and diversity frameworks</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> These accommodations maintain full medical education rigor while providing 
              equitable access. All assessment standards remain unchanged, ensuring graduates meet professional 
              competency requirements.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Users, Trophy, Clock, BookOpen, Video, MessageCircle, Target, Zap, Shield, Star, Play, CheckCircle, Globe, Award } from "lucide-react";
import { Logo } from "@/components/logo";
import nhsPrepWomanImg from "@assets/image_1749071491789.png";
import heroBackgroundImg from "@assets/image_1749074194942.jpeg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-[move_20s_linear_infinite]"></div>
        </div>
        
        {/* Background Image for Right Side */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/40 z-10"></div>
          <img 
            src={heroBackgroundImg} 
            alt="Hero background"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-start min-h-screen px-4">
          <div className="max-w-7xl mx-auto w-full">
            {/* Left Side - Content */}
            <div className="hero-text text-white space-y-8 max-w-2xl">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 shadow-lg">
                  <Star className="w-5 h-5 mr-3 text-yellow-400" />
                  <span className="text-sm font-semibold">Comprehensive Medical Exam Preparation</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{ color: 'white' }}>
                  <span style={{ color: 'white' }}>Master Your</span>{" "}
                  <div className="inline-flex items-center">
                    <Logo size="xl" />
                  </div>{" "}
                  <span style={{ color: 'white' }}>Journey</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl" style={{ color: 'white' }}>
                  <span style={{ color: 'white' }}>The world's most advanced AI-powered platform for NHSprep featuring{" "}</span>
                  <span className="text-blue-400 font-semibold">video OSCE simulations</span><span style={{ color: 'white' }}>,{" "}</span>
                  <span className="text-purple-400 font-semibold">adaptive learning</span><span style={{ color: 'white' }}>, and{" "}</span>
                  <span className="text-green-400 font-semibold">expert mentorship</span><span style={{ color: 'white' }}>.</span>
                </p>
              </div>
              

              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group transform hover:scale-105">
                    <span className="text-white">Start Your Free Trial</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/50 bg-transparent text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group">
                    <Play className="mr-2 w-5 h-5 text-white" />
                    <span className="text-white">Try Demo</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer hover:border-white/60 transition-colors">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Why We're Different Section - Core NHSprep Features */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-800 rounded-full mb-4 sm:mb-6">
              <span className="text-white font-semibold text-sm sm:text-base">Premium PLAB Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight px-2">
              Why We're Different
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              The world's first comprehensive PLAB preparation ecosystem combining AI-powered learning, 
              real-time expert consultations, and immersive clinical training in 17 languages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Video,
                title: "Live Video Consultations",
                subtitle: "£25/session",
                description: "Real-time OSCE practice with qualified UK doctors and PLAB examiners. Get instant feedback on clinical skills, communication, and examination techniques.",
                features: ["Qualified UK doctors", "Live OSCE simulations", "Instant expert feedback", "Flexible scheduling"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Brain,
                title: "AI Essay Marking System",
                subtitle: "£15/essay",
                description: "Advanced AI evaluation of clinical reasoning essays with detailed feedback on medical knowledge, communication skills, and professional development.",
                features: ["Instant marking", "Clinical reasoning analysis", "Improvement tracking", "Professional writing skills"],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Award,
                title: "VR Clinical Scenarios",
                subtitle: "£12/month",
                description: "Immersive hospital ward simulations for realistic NHS environment training, cultural communication practice, and hands-on clinical experience.",
                features: ["3D hospital environments", "Cultural communication", "Realistic patient interactions", "NHS protocol training"],
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="premium-plab-card group border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 bg-white overflow-hidden text-gray-900">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardContent className="p-8 text-gray-900">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <span className="text-sm font-semibold text-white bg-blue-800 px-3 py-1 rounded-full">
                      {feature.subtitle}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-6 leading-relaxed font-medium">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-800 font-medium">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Competitive Advantages */}
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">NHSprep</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique advantages that make NHSprep the most comprehensive PLAB preparation platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="premium-plab-card">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Competitive <span className="text-blue-600">Advantages</span>
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Globe,
                    title: "17-Language Support",
                    description: "First-to-market multi-language PLAB preparation for international medical graduates studying abroad before UK arrival."
                  },
                  {
                    icon: Zap,
                    title: "AI-Powered Personalisation",
                    description: "Advanced machine learning algorithms adapt to your learning style, pace, and weak areas for optimised study plans."
                  },
                  {
                    icon: Shield,
                    title: "Digital Certification Pathways",
                    description: "Comprehensive professional development with CPD tracking, blockchain verification, and career advancement tools (£199/pathway)."
                  },
                  {
                    icon: Users,
                    title: "Expert Tutor Marketplace",
                    description: "Verified UK medical professionals offering specialised coaching, mock exams, and career mentorship with revenue sharing."
                  }
                ].map((advantage, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h4>
                      <p className="text-gray-800 leading-relaxed font-medium">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(to bottom right, #1e3a8a, #1e1b4b)', 
              borderRadius: '1.5rem', 
              padding: '2rem', 
              border: '1px solid #1e40af',
              color: 'white'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', WebkitTextFillColor: '#ffffff' }}>Complete Premium Package</h4>
                <div style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', WebkitTextFillColor: '#ffffff' }}>£79<span style={{ color: '#ffffff', fontSize: '1.25rem', WebkitTextFillColor: '#ffffff' }}>/month</span></div>
                <p style={{ color: '#ffffff', textAlign: 'center', WebkitTextFillColor: '#ffffff' }}>Everything you need for PLAB success</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "Unlimited video consultations",
                  "AI essay marking & feedback",
                  "VR clinical scenario access",
                  "All certification pathways",
                  "Expert tutor marketplace",
                  "17-language content library",
                  "Advanced analytics & insights",
                  "Priority customer support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm font-medium" style={{ color: '#ffffff' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-white hover:bg-gray-100 font-bold py-3 rounded-xl" style={{ color: '#2563eb' }}>
                Start Premium Trial
                <ArrowRight className="ml-2 w-5 h-5" style={{ color: '#2563eb' }} />
              </Button>
            </div>
          </div>

          {/* Revenue Projections & Market Position */}
          <div className="mt-20 text-center">
            <div className="premium-plab-card bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Market-Leading PLAB Platform</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Live</div>
                  <p className="text-gray-800 font-medium">Video Consultations</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">AI</div>
                  <p className="text-gray-800 font-medium">Essay Marking</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">VR</div>
                  <p className="text-gray-800 font-medium">Clinical Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NHSprep+ Global Expansion Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 shadow-lg mb-6">
              <Globe className="w-5 h-5 mr-3 text-purple-300" />
              <span className="text-sm font-semibold text-white">Now Available Globally</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-white">Beyond</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">NHSprep</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Introducing <span className="font-bold">NHSprep+</span> - Your gateway to medical careers across 6 countries with support for 15+ international medical exams
            </p>
          </div>

          {/* Global Exam Coverage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                country: "🇺🇸 United States",
                exam: "USMLE Steps 1, 2, 3",
                description: "Complete preparation for US medical licensing",
                placements: "Preparation program available"
              },
              {
                country: "🇦🇺 Australia", 
                exam: "AMC CAT & Clinical",
                description: "Australian Medical Council certification",
                placements: "Study materials included"
              },
              {
                country: "🇨🇦 Canada",
                exam: "MCCEE & NAC OSCE",
                description: "Medical Council of Canada evaluation",
                placements: "Comprehensive exam prep"
              },
              {
                country: "🇪🇺 European Union",
                exam: "MRCP & Specialty",
                description: "Royal College certification pathways",
                placements: "Specialty training support"
              },
              {
                country: "🇦🇪 Middle East",
                exam: "DHA, MOH, HAAD",
                description: "Gulf region medical licensing",
                placements: "Regional exam preparation"
              },
              {
                country: "🌍 Global English",
                exam: "IELTS Medical",
                description: "Medical English proficiency testing",
                placements: "Language skills development"
              }
            ].map((region, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white country-name mb-2">{region.country}</h3>
                  <div className="text-purple-300 font-semibold mb-3">{region.exam}</div>
                  <p className="text-gray-300 text-sm mb-4">{region.description}</p>
                  <div className="text-xs text-green-300 font-medium">{region.placements}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Statistics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Global Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">6</div>
                <p className="text-gray-300">Countries Covered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                <p className="text-gray-300">Medical Exams</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">Active</div>
                <p className="text-gray-300">Platform Status</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">17</div>
                <p className="text-gray-300">Languages Supported</p>
              </div>
            </div>
          </div>

          {/* Global Features */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Advanced Global Features</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Globe,
                    title: "Multi-Language Support",
                    description: "Study in your native language with 17 supported languages including Arabic, Hindi, and Chinese"
                  },
                  {
                    icon: Award,
                    title: "Regional Job Placement",
                    description: "Direct partnerships with 156 hospitals across 6 countries for guaranteed placement opportunities"
                  },
                  {
                    icon: Brain,
                    title: "Country-Specific AI",
                    description: "Localized AI tutoring adapted to each country's medical system and examination patterns"
                  },
                  {
                    icon: Video,
                    title: "Cultural Adaptation",
                    description: "Scenario-based training adapted to local healthcare systems and patient interaction styles"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-white mb-4">NHSprep+ Global Access</h4>
                <div className="text-5xl font-bold text-white mb-2">£129<span className="text-xl">/month</span></div>
                <p className="text-gray-300">Access to all global medical exams</p>
              </div>
              
              <div className="space-y-3 mb-8">
                {[
                  "All 15+ international medical exams",
                  "17-language content library",
                  "Global job placement network",
                  "Country-specific AI tutoring",
                  "Cultural adaptation training",
                  "Regional exam strategies",
                  "International mentor network",
                  "Multi-timezone support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/plab1-new">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl">
                  Start Global Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
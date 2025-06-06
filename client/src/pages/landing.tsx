import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Users, Trophy, Clock, BookOpen, Video, MessageCircle, Target, Zap, Shield, Star, Play, CheckCircle, Globe, Award } from "lucide-react";
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
                  <span className="text-sm font-semibold">Trusted by 10,000+ Medical Graduates</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{ color: 'white' }}>
                  Master Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    NHSprep
                  </span>{" "}
                  Journey
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl" style={{ color: 'white' }}>
                  The world's most advanced AI-powered platform for NHSprep featuring{" "}
                  <span className="text-blue-400 font-semibold">video OSCE simulations</span>,{" "}
                  <span className="text-purple-400 font-semibold">adaptive learning</span>, and{" "}
                  <span className="text-green-400 font-semibold">expert mentorship</span>.
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



      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              REVOLUTIONARY FEATURES
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why We're Different
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              12 innovative features that set us apart from every other NHSprep platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Adaptive Learning",
                description: "Personalized question difficulty that adapts to your performance in real-time",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Video,
                title: "Video-Based OSCE Simulations",
                description: "Practice with real clinical scenarios and patient interactions",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Expert Mentor Matching",
                description: "Connect with successful PLAB graduates for personalized guidance",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Target,
                title: "Smart Study Planner",
                description: "AI-optimized study schedules based on your exam date and goals",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Trophy,
                title: "Gamification & Achievements",
                description: "Stay motivated with progress tracking, streaks, and rewards",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Globe,
                title: "UK Cultural Context Training",
                description: "Master NHS protocols and UK healthcare system nuances",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-800 leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="space-y-8">
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-white font-semibold">Join The Success Story</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Master
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                NHSprep?
              </span>
            </h2>
            
            <p id="landing-hero-text" className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Join thousands of international medical graduates who achieved their UK medical career dreams with NHSprep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/auth">
                <Button id="trial-button" size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100 px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                  Start Free Trial Today
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button id="demo-button" variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-xl font-semibold rounded-xl transition-all duration-300">
                  <Play className="mr-3 w-6 h-6" />
                  Try Demo Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why We're Different Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 bg-blue-100 rounded-full mb-6">
              <span className="text-blue-700 font-semibold">Premium PLAB Ecosystem</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why We're <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
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

            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-8 text-white border border-blue-800">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold mb-4 text-white">Complete Premium Package</h4>
                <div className="text-5xl font-bold mb-2 text-white">£79<span className="text-xl text-gray-300">/month</span></div>
                <p className="text-white">Everything you need for PLAB success</p>
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
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-white text-slate-900 hover:bg-gray-100 font-bold py-3 rounded-xl">
                Start Premium Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Revenue Projections & Market Position */}
          <div className="mt-20 text-center">
            <div className="premium-plab-card bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Market-Leading PLAB Platform</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">£2-3M</div>
                  <p className="text-gray-800 font-medium">Projected Annual Revenue</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-gray-800 font-medium">PLAB Pass Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                  <p className="text-gray-800 font-medium">Successful Graduates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
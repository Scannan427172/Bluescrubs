import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Users, Trophy, Clock, BookOpen, Video, MessageCircle, Target, Zap, Shield, Star, Play, CheckCircle, Globe, Award } from "lucide-react";
import nhsPrepWomanImg from "@assets/image_1749071491789.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-[move_20s_linear_infinite]"></div>
        </div>
        
        {/* Extended Blue Background for Right Side */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-96 bg-blue-800/30 rounded-l-3xl blur-xl"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white space-y-8 lg:pr-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 shadow-lg">
                  <Star className="w-5 h-5 mr-3 text-yellow-400" />
                  <span className="text-sm font-semibold">Trusted by 10,000+ Medical Graduates</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Master Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    NHSprep
                  </span>{" "}
                  Journey
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                  The world's most advanced AI-powered platform for NHSprep featuring{" "}
                  <span className="text-blue-400 font-semibold">video OSCE simulations</span>,{" "}
                  <span className="text-purple-400 font-semibold">adaptive learning</span>, and{" "}
                  <span className="text-green-400 font-semibold">expert mentorship</span>.
                </p>
              </div>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-slate-300">AI-Powered Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-slate-300">Video OSCE Prep</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-slate-300">Expert Mentors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-slate-300">95% Pass Rate</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group transform hover:scale-105">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Side - Feature Cards */}
            <div className="relative lg:pl-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Floating Achievement Cards */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-8 h-8" />
                    <div>
                      <div className="text-xl font-bold">95%</div>
                      <div className="text-sm opacity-90">Pass Rate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Video className="w-8 h-8" />
                    <div>
                      <div className="text-xl font-bold">Video</div>
                      <div className="text-sm opacity-90">OSCE Prep</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8" />
                    <div>
                      <div className="text-xl font-bold">AI</div>
                      <div className="text-sm opacity-90">Learning</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8" />
                    <div>
                      <div className="text-xl font-bold">10K+</div>
                      <div className="text-sm opacity-90">Students</div>
                    </div>
                  </div>
                </div>
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

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">10,000+</div>
              <div className="text-slate-600 font-medium">Successful Students</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-slate-600 font-medium">Pass Rate</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">12+</div>
              <div className="text-slate-600 font-medium">Unique Features</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-slate-600 font-medium">Expert Support</div>
            </div>
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
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
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
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Join thousands of international medical graduates who achieved their UK medical career dreams with NHSprep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                  Start Free Trial Today
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-xl font-semibold rounded-xl transition-all duration-300">
                  <Play className="mr-3 w-6 h-6" />
                  Try Demo Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, Users, Stethoscope, Palette, Mail, Linkedin, 
  Award, Target, Heart, Globe, BookOpen, Shield, Activity
} from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/more" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-4xl font-bold">Who are NHSprep</h1>
          </div>
          <p className="text-xl text-blue-100 leading-relaxed">
            We're a dedicated team committed to supporting international medical graduates 
            through their PLAB journey with innovative, accessible learning technology.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Mission Statement */}
        <Card className="mb-12 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
              <Target className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 text-lg leading-relaxed">
              To democratize medical education by providing cutting-edge, AI-powered learning 
              tools that help international medical graduates succeed in their PLAB examinations 
              and integrate successfully into the UK healthcare system.
            </p>
          </CardContent>
        </Card>

        {/* Founders Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Founders</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Tass - NHS Doctor */}
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-900">Dr. Yasa</CardTitle>
                <CardDescription className="text-green-700 font-medium">NHS Doctor & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">
                    Medical Expert
                  </Badge>
                  <p className="text-gray-700 leading-relaxed">
                    An experienced NHS doctor who understands the challenges faced by 
                    international medical graduates. Yasa brings deep clinical knowledge 
                    and firsthand experience of the UK healthcare system to ensure our 
                    content is clinically accurate and practically relevant.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="text-xs">Clinical Medicine</Badge>
                    <Badge variant="secondary" className="text-xs">PLAB Expert</Badge>
                    <Badge variant="secondary" className="text-xs">NHS Experience</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keith Hunter - Sports Therapy Expert */}
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-900">Keith Hunter</CardTitle>
                <CardDescription className="text-purple-700 font-medium">Multidisciplinary Digital Creative, Sports Therapy Expert & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-300">
                    Multidisciplinary Digital Creative
                  </Badge>
                  <p className="text-gray-700 leading-relaxed">
                    BA Graphic Design graduate from Leeds University (1982) and multidisciplinary freelance 
                    digital creative with over 30 years commercial experience in web, print, motion graphics, 
                    identity design, app design and build. Also a nationally recognised authority in training 
                    design and deep tissue therapy. Co-founder of Core Principles and former Head Jumps Coach 
                    for British Athletics Paralympics. Has coached European and World champion long jumpers, 
                    including 33 English Schools gold medallists, bringing comprehensive creative design 
                    expertise and elite athletic development knowledge to medical education technology.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="text-xs">Level 4 Sports Massage</Badge>
                    <Badge variant="secondary" className="text-xs">British Athletics Coach</Badge>
                    <Badge variant="secondary" className="text-xs">BA Graphic Design</Badge>
                    <Badge variant="secondary" className="text-xs">Biomechanics</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-orange-900">Accessibility First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800 text-sm text-center">
                  We believe education should be accessible to everyone, regardless of 
                  learning differences, language barriers, or economic circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-blue-900">Clinical Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 text-sm text-center">
                  All our content is developed by qualified medical professionals 
                  and aligned with UK medical guidelines and best practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-green-900">Global Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 text-sm text-center">
                  We support medical professionals from diverse backgrounds, 
                  offering multilingual resources and culturally sensitive content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Keith Hunter's Professional Background */}
        <Card className="mb-12 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-900 flex items-center gap-3">
              <Award className="h-6 w-6" />
              Keith Hunter's Professional Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Career Highlights</h3>
                <ul className="text-purple-800 space-y-2 text-sm">
                  <li>• Coached European and World champion long jumpers</li>
                  <li>• Coached 33 English Schools gold medallists</li>
                  <li>• Head Jumps Coach – British Athletics Paralympics</li>
                  <li>• England Team Coach – Loughborough International 2012</li>
                  <li>• Coached Clovis Asong (European & Commonwealth Junior Champion)</li>
                  <li>• Mentored Lee Whiteley (World Championship Bronze, 2013)</li>
                  <li>• Co-founder of Core Principles training organisation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Qualifications & Education</h3>
                <ul className="text-purple-800 space-y-2 text-sm">
                  <li>• BA Graphic Design – Leeds University (1982)</li>
                  <li>• Web Design & Development Specialist</li>
                  <li>• App Design & Development Expert</li>
                  <li>• Motion Graphics & Identity Design Expert</li>
                  <li>• Print & Corporate Design Professional</li>
                  <li>• Level 4 Sports Massage Therapist</li>
                  <li>• Level 4 British Athletics Coach</li>
                  <li>• British Athletics Certified (All Phases)</li>
                  <li>• Biomechanical Assessment Specialist</li>
                  <li>• Sports Therapy Organisation Ambassador</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology & Innovation */}
        <Card className="mb-12 border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              Technology & Innovation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Learning</h3>
                <p className="text-gray-700 mb-4">
                  Our platform uses advanced AI to generate authentic UK medical questions, 
                  provide personalized feedback, and adapt to individual learning patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">OpenAI Integration</Badge>
                  <Badge variant="outline" className="text-xs">Adaptive Learning</Badge>
                  <Badge variant="outline" className="text-xs">Intelligent Feedback</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility Features</h3>
                <p className="text-gray-700 mb-4">
                  Built with neurodiversity in mind, featuring voice reading, multilingual 
                  support, customizable interfaces, and specialized tools for ADHD, dyslexia, and autism.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">40+ Languages</Badge>
                  <Badge variant="outline" className="text-xs">Voice Reading</Badge>
                  <Badge variant="outline" className="text-xs">WCAG 2.1 AA</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
              <Mail className="h-6 w-6" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p className="text-gray-700 mb-4">
                  We'd love to hear from you. Whether you have questions, feedback, 
                  or need support, our team is here to help.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> hello@nhsprep.com
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Support:</strong> support@nhsprep.com
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Company:</strong> NHSprep Ltd.</p>
                  <p><strong>Registration:</strong> England and Wales</p>
                  <p><strong>Compliance:</strong> WCAG 2.1 AA Accessible</p>
                  <p><strong>Data:</strong> GDPR Compliant</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
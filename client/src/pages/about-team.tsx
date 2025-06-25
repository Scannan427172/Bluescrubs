import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Stethoscope,
  Code,
  Heart,
  Award,
  Globe,
  Users,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import aboutBgImage from '@assets/B3683B89-D3EA-491F-9C14-D3A42E53CAE3_4_5005_c_1749821477572.jpeg';

export default function AboutTeam() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden"
        style={{
          backgroundImage: `url(${aboutBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="relative z-50 flex flex-col items-center justify-center text-center px-8 py-16 hero-text text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl">
            Meet BlueScrubsPrep
          </h1>
          <p className="text-xl lg:text-2xl mb-6 drop-shadow-2xl">
            Dedicated NHS professionals helping international medical graduates succeed
          </p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">About Our Team</h2>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Dr. Yasa */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-blue-900">Dr. Yasa</CardTitle>
                  <p className="text-blue-700">NHS Doctor & Co-Founder</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Dr. Yasa is a practicing NHS doctor who understands the unique challenges faced by international medical graduates. Having navigated the PLAB process personally, she brings authentic clinical experience and genuine empathy to BlueScrubsPrep.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">NHS Doctor</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">PLAB Graduate</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Medical Education</Badge>
              </div>
              <p className="text-sm text-gray-600">
                "I created BlueScrubsPrep because I know how overwhelming the PLAB journey can be. Every feature is designed from real clinical experience to help you succeed."
              </p>
            </CardContent>
          </Card>

          {/* Keith Hunter */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-purple-900">Keith Hunter</CardTitle>
                  <p className="text-purple-700">Lead Developer & Co-Founder</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Keith is a passionate developer with expertise in medical education technology. He transforms Dr. Yasa's clinical insights into powerful, user-friendly tools that make PLAB preparation more effective and accessible.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Full-Stack Developer</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">AI Integration</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">EdTech Specialist</Badge>
              </div>
              <p className="text-sm text-gray-600">
                "Building BlueScrubsPrep means creating technology that genuinely helps medical professionals achieve their dreams of practicing in the UK."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              BlueScrubsPrep was born from Dr. Yasa's personal PLAB journey and Keith's passion for educational technology. 
              We understand that international medical graduates bring invaluable skills and perspectives to UK healthcare. 
              Our platform removes barriers to success by providing authentic, NHS-aligned preparation tools that respect 
              your clinical expertise while helping you adapt to UK medical practice standards.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                Every question, every feature is crafted to meet the highest standards of medical education
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-sm text-gray-600">
                Supporting diverse learning styles and cultural backgrounds in medical education
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Building a supportive network where medical professionals help each other succeed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your PLAB Journey?</h3>
            <p className="mb-6 opacity-90">
              Join thousands of international medical graduates who trust BlueScrubsPrep for their PLAB preparation
            </p>
            <Link href="/plab1-new">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Start PLAB 1 Practice
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
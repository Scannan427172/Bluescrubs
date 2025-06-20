import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Code, 
  GraduationCap, 
  Award, 
  Heart, 
  Users,
  ChevronLeft,
  Mail,
  Linkedin,
  Globe
} from "lucide-react";
import { Link } from "wouter";

export default function AboutTeam() {
  const founders = [
    {
      name: "Dr. Yasa",
      role: "Co-Founder & Medical Director",
      title: "NHS Doctor & Medical Education Specialist",
      icon: Stethoscope,
      background: "NHS-trained medical professional with extensive experience in UK healthcare systems and medical education. Passionate about supporting international medical graduates in their journey to practice medicine in the UK.",
      expertise: [
        "NHS Clinical Practice",
        "PLAB Examination Systems", 
        "Medical Education & Training",
        "UK Healthcare Regulations",
        "International Medical Graduate Support"
      ],
      achievements: [
        "Active NHS practicing physician",
        "PLAB examination expert",
        "Medical education specialist",
        "International healthcare advocate"
      ]
    },
    {
      name: "Keith Hunter",
      role: "Co-Founder & Lead Developer",
      title: "Software Engineer & Education Technology Expert",
      icon: Code,
      background: "Experienced software developer specializing in educational technology and AI-powered learning platforms. Dedicated to creating innovative solutions that make medical education more accessible and effective.",
      expertise: [
        "Educational Technology Development",
        "AI & Machine Learning Systems",
        "Medical Software Platforms",
        "Learning Management Systems",
        "User Experience Design"
      ],
      achievements: [
        "Educational technology innovator",
        "AI learning systems architect",
        "Medical platform specialist",
        "User-centered design advocate"
      ]
    }
  ];

  const mission = [
    {
      icon: Heart,
      title: "Our Mission",
      description: "To empower international medical graduates with comprehensive, authentic UK medical training that bridges cultural and educational gaps."
    },
    {
      icon: Users,
      title: "Our Vision", 
      description: "Creating a world where talented healthcare professionals can seamlessly transition to practice medicine in the UK, improving healthcare outcomes globally."
    },
    {
      icon: Award,
      title: "Our Values",
      description: "Excellence in medical education, authentic UK healthcare training, inclusive learning environments, and unwavering support for medical professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/more" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronLeft className="h-5 w-5 text-white" />
            </Link>
            <h1 className="text-3xl lg:text-5xl font-bold">Who Are NHS Prep</h1>
          </div>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl">
            Founded by NHS doctor Yasa and developer Keith Hunter, NHS Prep is dedicated to providing 
            authentic, comprehensive medical education for international graduates preparing for UK practice.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Founders Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The unique combination of medical expertise and technology innovation that powers NHS Prep
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                    <founder.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{founder.name}</CardTitle>
                  <p className="text-lg font-semibold text-blue-600">{founder.role}</p>
                  <p className="text-md text-gray-600">{founder.title}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{founder.background}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {founder.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Foundation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <Card key={index} className="text-center border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  NHS Prep was born from a shared vision between Dr. Yasa, an experienced NHS physician, and Keith Hunter, 
                  a passionate educational technology developer. Having witnessed firsthand the challenges faced by 
                  international medical graduates, they recognized the critical need for authentic, comprehensive 
                  preparation that goes beyond traditional study materials.
                </p>
                <p>
                  Dr. Yasa brings invaluable insights from years of practice within the NHS system, understanding 
                  both the clinical excellence required and the cultural nuances that international graduates must 
                  navigate. Her expertise in PLAB examinations and UK medical regulations ensures that our content 
                  remains current, accurate, and aligned with real-world practice.
                </p>
                <p>
                  Keith Hunter's background in educational technology and AI-powered learning systems enables the 
                  platform to deliver personalized, adaptive learning experiences. His commitment to user-centered 
                  design ensures that complex medical concepts are presented in accessible, engaging formats that 
                  accommodate diverse learning styles.
                </p>
                <p>
                  Together, they have created NHS Prep as more than just an exam preparation platform—it's a 
                  comprehensive ecosystem that supports international medical graduates throughout their entire 
                  journey to UK medical practice, from initial preparation through successful integration into 
                  the NHS workforce.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Our Team</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about NHS Prep or want to learn more about our mission? 
            We'd love to hear from you and support your medical career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Link href="/community">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  UserCheck,
  Briefcase,
  Award,
  BookOpen,
  Users,
  Video,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  Clock,
  Star,
  Globe,
  MessageSquare,
  Download
} from "lucide-react";
import { Link } from "wouter";

export default function ProfessionalDevelopment() {
  const developmentStats = {
    coursesAvailable: 45,
    certificationsOffered: 12,
    mentorSessions: 1247,
    careerPlacements: 89,
    skillAssessments: 156,
    networkingEvents: 23
  };

  const developmentAreas = [
    {
      icon: UserCheck,
      title: "Leadership Skills",
      description: "Develop essential leadership capabilities for medical practice",
      progress: 65,
      courses: 8,
      certificates: 3,
      skills: ["Team Management", "Clinical Leadership", "Decision Making", "Conflict Resolution"]
    },
    {
      icon: MessageSquare,
      title: "Communication Excellence",
      description: "Master patient communication and professional interactions",
      progress: 78,
      courses: 6,
      certificates: 2,
      skills: ["Patient Communication", "Breaking Bad News", "Multidisciplinary Teams", "Medical Writing"]
    },
    {
      icon: Globe,
      title: "Cultural Competency",
      description: "Navigate UK healthcare culture and diverse patient populations",
      progress: 45,
      courses: 5,
      certificates: 2,
      skills: ["Cultural Awareness", "UK NHS Culture", "Diversity & Inclusion", "Patient Advocacy"]
    },
    {
      icon: TrendingUp,
      title: "Research & Innovation",
      description: "Develop research skills and contribute to medical advancement",
      progress: 32,
      courses: 7,
      certificates: 4,
      skills: ["Research Methods", "Data Analysis", "Grant Writing", "Publication Skills"]
    }
  ];

  const careerPaths = [
    {
      title: "Foundation Training Pathway",
      description: "Structured program for UK foundation doctor preparation",
      duration: "24 months",
      participants: 2847,
      completionRate: 94,
      outcomes: ["FY1 Placement", "Clinical Skills", "Professional Network", "GMC Registration"]
    },
    {
      title: "Specialty Training Route",
      description: "Advanced preparation for specialty training applications",
      duration: "18 months",
      participants: 1432,
      completionRate: 87,
      outcomes: ["ST Application", "Research Portfolio", "Clinical Experience", "Interview Skills"]
    },
    {
      title: "GP Training Preparation",
      description: "Comprehensive preparation for General Practice training",
      duration: "12 months",
      participants: 3256,
      completionRate: 91,
      outcomes: ["GPST Application", "Community Medicine", "Patient-Centered Care", "Practice Management"]
    },
    {
      title: "Academic Medicine Track",
      description: "Combined clinical and academic career development",
      duration: "36 months",
      participants: 782,
      completionRate: 78,
      outcomes: ["PhD Preparation", "Research Skills", "Teaching Ability", "Academic Network"]
    }
  ];

  const professionalServices = [
    {
      icon: Video,
      title: "1-on-1 Mentoring",
      description: "Personal guidance from experienced UK doctors",
      features: ["Weekly Sessions", "Career Planning", "CV Review", "Interview Prep"],
      availability: "24/7 Booking",
      rating: 4.9
    },
    {
      icon: FileText,
      title: "CV & Portfolio Review",
      description: "Professional CV optimization and portfolio development",
      features: ["Expert Review", "Industry Standards", "ATS Optimization", "Personal Branding"],
      availability: "48hr Turnaround",
      rating: 4.8
    },
    {
      icon: Users,
      title: "Networking Events",
      description: "Connect with UK medical professionals and peers",
      features: ["Monthly Events", "Specialty Groups", "Career Fairs", "Alumni Network"],
      availability: "Regular Schedule",
      rating: 4.7
    },
    {
      icon: Award,
      title: "Certification Programs",
      description: "Industry-recognized professional certifications",
      features: ["Accredited Courses", "Digital Badges", "CPD Points", "Career Advancement"],
      availability: "Self-Paced",
      rating: 4.9
    }
  ];

  const upcomingEvents = [
    {
      title: "NHS Leadership Masterclass",
      date: "March 25, 2024",
      time: "14:00 GMT",
      speaker: "Dr. James Wilson, NHS Trust Manager",
      attendees: 156,
      type: "Webinar"
    },
    {
      title: "Research Methodology Workshop",
      date: "March 28, 2024",
      time: "16:00 GMT",
      speaker: "Prof. Sarah Chen, Imperial College",
      attendees: 89,
      type: "Workshop"
    },
    {
      title: "Career Transition Panel",
      date: "April 2, 2024",
      time: "18:00 GMT",
      speaker: "Panel of UK Consultants",
      attendees: 234,
      type: "Panel Discussion"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Professional Development</h1>
            <p className="text-gray-600">Career advancement and professional skills for medical professionals</p>
          </div>
        </div>

        {/* Development Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{developmentStats.coursesAvailable}</div>
              <div className="text-sm text-gray-600">Courses</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{developmentStats.certificationsOffered}</div>
              <div className="text-sm text-gray-600">Certificates</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{developmentStats.mentorSessions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Mentor Sessions</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{developmentStats.careerPlacements}</div>
              <div className="text-sm text-gray-600">Placements</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{developmentStats.skillAssessments}</div>
              <div className="text-sm text-gray-600">Assessments</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{developmentStats.networkingEvents}</div>
              <div className="text-sm text-gray-600">Events</div>
            </CardContent>
          </Card>
        </div>

        {/* Development Areas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Development Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developmentAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <area.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{area.title}</CardTitle>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{area.progress}%</span>
                      </div>
                      <Progress value={area.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-blue-600">{area.courses}</div>
                        <div className="text-xs text-gray-500">Courses</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">{area.certificates}</div>
                        <div className="text-xs text-gray-500">Certificates</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      Start Development
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Pathways */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{path.title}</h3>
                    <p className="text-gray-600 text-sm">{path.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{path.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{path.participants}</div>
                      <div className="text-xs text-gray-500">Participants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{path.completionRate}%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Career Outcomes:</div>
                    <div className="flex flex-wrap gap-1">
                      {path.outcomes.map((outcome, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs">
                          {outcome}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Explore Pathway
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <service.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Availability:</span>
                      <span className="text-sm font-medium text-green-600">{service.availability}</span>
                    </div>

                    <Button className="w-full">
                      Book Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Professional Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">by {event.speaker}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>{event.date} at {event.time}</span>
                          <span>{event.attendees} registered</span>
                          <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button>Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Video className="h-5 w-5" />
              <span className="text-sm">Book Mentor</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">View Certificates</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Join Network</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="h-5 w-5" />
              <span className="text-sm">Career Resources</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
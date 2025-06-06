import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  Briefcase,
  MapPin,
  FileText,
  Phone,
  Users,
  Calendar,
  TrendingUp,
  Award,
  MessageSquare,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  Heart
} from "lucide-react";
import { Link } from "wouter";

export default function CareerSupport() {
  const supportStats = {
    jobPlacements: 2847,
    averageSalary: "£32,000",
    placementRate: 94,
    partnerHospitals: 156,
    activeRecruiters: 78,
    careerConsultations: 4563
  };

  const careerServices = [
    {
      icon: FileText,
      title: "CV & Application Support",
      description: "Professional CV writing and application assistance",
      features: ["CV Optimization", "Cover Letters", "Application Forms", "Personal Statements"],
      success: "96% approval rate",
      duration: "2-3 days",
      priority: "high"
    },
    {
      icon: Phone,
      title: "Interview Preparation",
      description: "Comprehensive interview coaching and practice sessions",
      features: ["Mock Interviews", "Question Banks", "Video Practice", "Feedback Sessions"],
      success: "89% success rate",
      duration: "1-2 weeks",
      priority: "high"
    },
    {
      icon: MapPin,
      title: "Job Placement Assistance",
      description: "Direct connections with NHS trusts and healthcare providers",
      features: ["Job Matching", "Direct Referrals", "Salary Negotiation", "Contract Review"],
      success: "94% placement rate",
      duration: "1-3 months",
      priority: "medium"
    },
    {
      icon: Users,
      title: "Networking & Mentorship",
      description: "Connect with medical professionals and career mentors",
      features: ["Mentor Matching", "Professional Events", "Alumni Network", "Industry Contacts"],
      success: "4.8/5 satisfaction",
      duration: "Ongoing",
      priority: "low"
    }
  ];

  const jobOpportunities = [
    {
      title: "Foundation Year 1 Doctor",
      hospital: "Royal London Hospital",
      location: "London, UK",
      salary: "£29,384",
      type: "Full-time",
      specialty: "General Medicine",
      deadline: "March 30, 2024",
      applicants: 23,
      status: "Active"
    },
    {
      title: "Foundation Year 2 Doctor",
      hospital: "Manchester University Hospital",
      location: "Manchester, UK",
      salary: "£34,012",
      type: "Full-time",
      specialty: "Emergency Medicine",
      deadline: "April 5, 2024",
      applicants: 18,
      status: "Active"
    },
    {
      title: "Specialty Trainee",
      hospital: "Edinburgh Royal Infirmary",
      location: "Edinburgh, UK",
      salary: "£40,257",
      type: "Full-time",
      specialty: "Internal Medicine",
      deadline: "April 12, 2024",
      applicants: 31,
      status: "Hot"
    },
    {
      title: "Locum SHO",
      hospital: "Cardiff University Hospital",
      location: "Cardiff, UK",
      salary: "£25-35/hour",
      type: "Locum",
      specialty: "Paediatrics",
      deadline: "March 28, 2024",
      applicants: 7,
      status: "Urgent"
    }
  ];

  const careerPathways = [
    {
      pathway: "Foundation Training",
      description: "2-year foundation programme in UK hospitals",
      requirements: ["PLAB 1 & 2", "GMC Registration", "English Proficiency"],
      duration: "24 months",
      averageSalary: "£29,000-£34,000",
      placements: 1247,
      progression: "Specialty Training"
    },
    {
      pathway: "GP Training",
      description: "3-year training to become a General Practitioner",
      requirements: ["Foundation Training", "GPST Application", "Clinical Experience"],
      duration: "36 months",
      averageSalary: "£38,000-£50,000",
      placements: 892,
      progression: "GP Partner/Salaried GP"
    },
    {
      pathway: "Specialty Training",
      description: "3-8 year training in medical specialties",
      requirements: ["Foundation Training", "Specialty Exams", "Research Portfolio"],
      duration: "36-96 months",
      averageSalary: "£40,000-£80,000",
      placements: 634,
      progression: "Consultant Position"
    },
    {
      pathway: "Locum Work",
      description: "Flexible temporary positions across the NHS",
      requirements: ["GMC Registration", "Relevant Experience", "Indemnity Insurance"],
      duration: "Flexible",
      averageSalary: "£25-£60/hour",
      placements: 2156,
      progression: "Permanent Positions"
    }
  ];

  const upcomingEvents = [
    {
      title: "NHS Career Fair 2024",
      date: "April 15, 2024",
      location: "ExCeL London",
      type: "In-Person",
      attendees: 2500,
      recruiters: 45
    },
    {
      title: "Foundation Training Webinar",
      date: "March 30, 2024",
      location: "Online",
      type: "Virtual",
      attendees: 850,
      recruiters: 12
    },
    {
      title: "Specialty Training Information Session",
      date: "April 8, 2024",
      location: "Birmingham Convention Centre",
      type: "Hybrid",
      attendees: 650,
      recruiters: 28
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Hot':
        return 'bg-red-100 text-red-800';
      case 'Urgent':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Support</h1>
            <p className="text-gray-600">Comprehensive career services for medical professionals in the UK</p>
          </div>
        </div>

        {/* Support Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{supportStats.jobPlacements.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Job Placements</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{supportStats.averageSalary}</div>
              <div className="text-sm text-gray-600">Avg Salary</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{supportStats.placementRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{supportStats.partnerHospitals}</div>
              <div className="text-sm text-gray-600">Partner Hospitals</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{supportStats.activeRecruiters}</div>
              <div className="text-sm text-gray-600">Recruiters</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{supportStats.careerConsultations.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Consultations</div>
            </CardContent>
          </Card>
        </div>

        {/* Career Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    {getPriorityIcon(service.priority)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Success Rate:</span>
                        <div className="font-medium text-green-600">{service.success}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <div className="font-medium text-blue-600">{service.duration}</div>
                      </div>
                    </div>

                    <Button className="w-full">
                      Get Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Opportunities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Job Opportunities</h2>
          <div className="space-y-4">
            {jobOpportunities.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.hospital} • {job.location}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>{job.salary}</span>
                          <span>{job.type}</span>
                          <span>{job.specialty}</span>
                          <span>Deadline: {job.deadline}</span>
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(job.status)} mb-2>
                        {job.status}
                      </Badge>
                      <div>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
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
            {careerPathways.map((pathway, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{pathway.pathway}</h3>
                    <p className="text-gray-600 text-sm">{pathway.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{pathway.duration}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Salary:</span>
                      <span className="ml-2 font-medium text-green-600">{pathway.averageSalary}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Placements:</span>
                      <span className="ml-2 font-medium text-blue-600">{pathway.placements}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Progression:</span>
                      <span className="ml-2 font-medium">{pathway.progression}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Requirements:</div>
                    <div className="flex flex-wrap gap-1">
                      {pathway.requirements.map((req, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {req}
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

        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Career Events</h2>
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
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>{event.date}</span>
                          <span>{event.attendees} attendees</span>
                          <span>{event.recruiters} recruiters</span>
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
              <FileText className="h-5 w-5" />
              <span className="text-sm">Upload CV</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Phone className="h-5 w-5" />
              <span className="text-sm">Book Consultation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm">Browse Jobs</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Join Network</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
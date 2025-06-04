import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, Users, Calendar, MessageCircle, Video, 
  Award, Clock, MapPin, Stethoscope, GraduationCap,
  BookOpen, Heart, DollarSign, CheckCircle
} from "lucide-react";

export default function Mentors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Mock mentor data with diverse backgrounds
  const mentors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialties: ["Internal Medicine", "Cardiology"],
      currentPosition: "ST4 Cardiology, Royal London Hospital",
      plabPassDate: "2022-03-15",
      rating: 4.9,
      totalSessions: 156,
      hourlyRate: 25, // £25/hour
      bio: "Passed PLAB 1 and 2 on first attempt. Now helping international doctors navigate the UK healthcare system. Specialized in interview preparation and clinical skills.",
      availability: "Weekends and evenings",
      location: "London, UK",
      languages: ["English", "Hindi", "Gujarati"],
      verified: true,
      responseTime: "2 hours",
      successStories: 23,
      avatar: "PS"
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      specialties: ["Emergency Medicine", "OSCE Skills"],
      currentPosition: "Emergency Registrar, Manchester Royal Infirmary",
      plabPassDate: "2021-08-22",
      rating: 4.8,
      totalSessions: 203,
      hourlyRate: 30,
      bio: "Emergency medicine doctor with extensive OSCE teaching experience. Helped 50+ doctors pass PLAB 2. Focus on communication skills and clinical examination techniques.",
      availability: "Flexible, including nights",
      location: "Manchester, UK",
      languages: ["English", "Arabic", "French"],
      verified: true,
      responseTime: "1 hour",
      successStories: 31,
      avatar: "AH"
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      specialties: ["General Practice", "NHS Integration"],
      currentPosition: "GP Partner, Birmingham Health Centre",
      plabPassDate: "2020-11-10",
      rating: 4.9,
      totalSessions: 89,
      hourlyRate: null, // Free mentor
      bio: "Volunteer mentor passionate about helping international doctors succeed in the NHS. Expertise in NHS systems, GP training applications, and work-life balance.",
      availability: "Tuesday and Thursday evenings",
      location: "Birmingham, UK",
      languages: ["English"],
      verified: true,
      responseTime: "4 hours",
      successStories: 18,
      avatar: "SW"
    },
    {
      id: 4,
      name: "Dr. Raj Patel",
      specialties: ["Psychiatry", "Communication Skills"],
      currentPosition: "CT2 Psychiatry, Edinburgh Royal Infirmary",
      plabPassDate: "2023-01-28",
      rating: 4.7,
      totalSessions: 67,
      hourlyRate: 20,
      bio: "Recently qualified through PLAB pathway. Fresh perspective on current exam patterns and requirements. Strong focus on mental health and communication scenarios.",
      availability: "Weekends primarily",
      location: "Edinburgh, UK",
      languages: ["English", "Hindi", "Punjabi"],
      verified: true,
      responseTime: "3 hours",
      successStories: 12,
      avatar: "RP"
    }
  ];

  const specialties = ["all", "Internal Medicine", "Emergency Medicine", "General Practice", "Cardiology", "Psychiatry", "OSCE Skills", "NHS Integration"];

  const filteredMentors = mentors.filter(mentor => 
    selectedSpecialty === "all" || mentor.specialties.includes(selectedSpecialty)
  );

  const getRateDisplay = (rate: number | null) => {
    return rate ? `£${rate}/hour` : "Free";
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 mr-3 text-green-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>PLAB Mentors</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Connect with doctors who successfully passed PLAB and are now thriving in the NHS</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>127</div>
              <div className="text-sm" style={{ color: '#666666' }}>Verified Mentors</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>2,847</div>
              <div className="text-sm" style={{ color: '#666666' }}>Sessions Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>4.8</div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>94%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Success Rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="become">Become a Mentor</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>Specialty</label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty === "all" ? "All Specialties" : specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>Price Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="low">£10-£20/hour</SelectItem>
                        <SelectItem value="mid">£20-£30/hour</SelectItem>
                        <SelectItem value="high">£30+/hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>Availability</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Cards */}
            <div className="grid gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                            {mentor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold" style={{ color: '#000000' }}>{mentor.name}</h3>
                            {mentor.verified && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{mentor.currentPosition}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {getRatingStars(mentor.rating)}
                            <span className="text-sm text-gray-600 ml-2">({mentor.totalSessions})</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {mentor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{mentor.bio}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{mentor.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{mentor.responseTime} response</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>{mentor.successStories} success stories</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="w-3 h-3" />
                            <span>PLAB passed {new Date(mentor.plabPassDate).getFullYear()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                            {getRateDisplay(mentor.hourlyRate)}
                          </div>
                          <div className="text-sm text-gray-600">{mentor.availability}</div>
                        </div>
                        <div className="space-y-2 mt-4">
                          <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => setSelectedMentor(mentor)}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Session
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Book Session with {selectedMentor?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 p-4">
                                <p style={{ color: '#666666' }}>Select your preferred session type and time.</p>
                                <div className="grid gap-3">
                                  <Button variant="outline" className="justify-start">
                                    <Video className="w-4 h-4 mr-2" />
                                    Video Call (60 min) - {getRateDisplay(selectedMentor?.hourlyRate)}
                                  </Button>
                                  <Button variant="outline" className="justify-start">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat Session (30 min) - {selectedMentor?.hourlyRate ? `£${Math.round(selectedMentor.hourlyRate * 0.5)}` : 'Free'}
                                  </Button>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                  Continue to Booking
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Your Mentoring Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium" style={{ color: '#000000' }}>No sessions booked yet</h3>
                  <p className="text-gray-600 mb-6">Book your first mentoring session to get personalized guidance</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Browse Mentors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="become" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Become a PLAB Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>Help Others Succeed</h3>
                    <p className="text-gray-600 mb-6">Share your PLAB journey and help international doctors achieve their NHS dreams</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2" style={{ color: '#000000' }}>Requirements</h4>
                      <p className="text-sm text-gray-600">PLAB 1 & 2 passed, currently working in NHS</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2" style={{ color: '#000000' }}>Earn Income</h4>
                      <p className="text-sm text-gray-600">Set your own rates or volunteer as a free mentor</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2" style={{ color: '#000000' }}>Make Impact</h4>
                      <p className="text-sm text-gray-600">Guide the next generation of NHS doctors</p>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Apply to Become a Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
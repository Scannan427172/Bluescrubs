import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Heart,
  Share,
  Search,
  Plus,
  Filter,
  Stethoscope,
  Globe,
  Video,
  UserPlus,
  Star,
  Clock
} from 'lucide-react';

interface CommunityPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    title: string;
    location: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

interface StudyGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  specialty: string;
  meetingTime: string;
  location: string;
  isJoined: boolean;
}

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  attendees: number;
  host: string;
  isRegistered: boolean;
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');

  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      author: {
        name: "Dr. Ahmed Khan",
        avatar: "AK",
        title: "IMT2 Doctor",
        location: "Manchester, UK"
      },
      content: "Just passed my PLAB 2! The OSCE stations were challenging but the practice here really helped. Happy to share tips with anyone preparing. Key advice: practice clinical communication and stay calm during examination stations.",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 8,
      tags: ["PLAB2", "Success Story", "Tips"],
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: "Dr. Sarah Patel",
        avatar: "SP",
        title: "F1 Doctor",
        location: "London, UK"
      },
      content: "Starting my foundation year next month! Looking for other international graduates in London area for study groups and networking. The journey from PLAB to practicing in the NHS has been incredible.",
      timestamp: "5 hours ago",
      likes: 18,
      replies: 12,
      tags: ["Networking", "London", "Foundation"],
      isLiked: true
    },
    {
      id: 3,
      author: {
        name: "Dr. Michael Chen",
        avatar: "MC",
        title: "Core Trainee",
        location: "Birmingham, UK"
      },
      content: "Hosting a virtual study session this weekend covering cardiovascular medicine topics. We'll go through recent NICE guidelines and practice clinical scenarios. All levels welcome!",
      timestamp: "1 day ago",
      likes: 31,
      replies: 15,
      tags: ["Study Group", "Cardiology", "Virtual"],
      isLiked: false
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: 1,
      name: "PLAB 1 Prep Warriors",
      description: "Intensive preparation group for PLAB 1 with weekly mock tests and discussion sessions",
      members: 156,
      specialty: "General Medicine",
      meetingTime: "Saturdays 2:00 PM GMT",
      location: "Online",
      isJoined: true
    },
    {
      id: 2,
      name: "OSCE Masters London",
      description: "In-person OSCE practice sessions in Central London with experienced doctors",
      members: 89,
      specialty: "PLAB 2 OSCE",
      meetingTime: "Sundays 10:00 AM GMT",
      location: "London, UK",
      isJoined: false
    },
    {
      id: 3,
      name: "International Med Grads UK",
      description: "Support network for international medical graduates navigating the UK healthcare system",
      members: 234,
      specialty: "All Specialties",
      meetingTime: "Bi-weekly Thursdays 7:00 PM GMT",
      location: "Online",
      isJoined: false
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "PLAB Success Webinar",
      type: "Educational",
      date: "June 20, 2025",
      time: "6:00 PM GMT",
      attendees: 145,
      host: "Dr. Williams",
      isRegistered: false
    },
    {
      id: 2,
      title: "Mock OSCE Session",
      type: "Practice",
      date: "June 22, 2025",
      time: "2:00 PM GMT",
      attendees: 78,
      host: "PLAB Masters",
      isRegistered: true
    },
    {
      id: 3,
      title: "NHS Application Workshop",
      type: "Career",
      date: "June 25, 2025",
      time: "4:00 PM GMT",
      attendees: 92,
      host: "Dr. Thompson",
      isRegistered: false
    }
  ];

  const handleLikePost = (postId: number) => {
    // In a real app, this would update the backend
    console.log(`Liked post ${postId}`);
  };

  const handleJoinGroup = (groupId: number) => {
    // In a real app, this would update the backend
    console.log(`Joined group ${groupId}`);
  };

  const handleRegisterEvent = (eventId: number) => {
    // In a real app, this would update the backend
    console.log(`Registered for event ${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground text-lg">
          Connect with fellow medical professionals preparing for PLAB and working in the UK
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">Discussions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">456</div>
            <div className="text-sm text-muted-foreground">Success Stories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Study Groups
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Mentorship
          </TabsTrigger>
        </TabsList>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* New Post */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your experience, ask questions, or start a discussion..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Badge variant="outline">PLAB1</Badge>
                      <Badge variant="outline">PLAB2</Badge>
                      <Badge variant="outline">Tips</Badge>
                    </div>
                    <Button disabled={!newPost.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discussion Posts */}
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{post.author.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {post.author.title}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {post.author.location}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1 ${post.isLiked ? 'text-red-600' : ''}`}
                          >
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.replies}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Study Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Study Groups</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>

          <div className="grid gap-6">
            {studyGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                      <p className="text-muted-foreground mb-3">{group.description}</p>
                    </div>
                    <Button
                      variant={group.isJoined ? "outline" : "default"}
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {group.isJoined ? (
                        <>
                          <Users className="w-4 h-4 mr-2" />
                          Joined
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Group
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{group.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>

          <div className="grid gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <Badge className="mb-3">{event.type}</Badge>
                    </div>
                    <Button
                      variant={event.isRegistered ? "outline" : "default"}
                      onClick={() => handleRegisterEvent(event.id)}
                    >
                      {event.isRegistered ? "Registered" : "Register"}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      <span>Host: {event.host}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mentorship Tab */}
        <TabsContent value="mentorship" className="space-y-6">
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Mentorship Program</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with experienced UK doctors who can guide you through your PLAB journey 
              and NHS career development. Get personalized advice and support from those who've 
              successfully navigated the path you're on.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Find a Mentor
              </Button>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Become a Mentor
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
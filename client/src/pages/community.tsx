import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  GraduationCap, 
  Heart, 
  Send, 
  Clock,
  MapPin,
  Star,
  Globe
} from "lucide-react";

interface CommunityPost {
  id: number;
  content: string;
  tags: string[] | null;
  likes: number;
  replies: number;
  createdAt: string;
  authorId: number;
  author: {
    id: number;
    username: string;
    currentStage: string;
    country: string | null;
    city: string | null;
  };
}

interface StudyGroup {
  id: number;
  name: string;
  description: string;
  specialty: string;
  meetingTime: string;
  location: string;
  members: number;
  maxMembers: number;
  createdAt: string;
  creator: {
    username: string;
  };
}

interface CommunityEvent {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  host: {
    username: string;
  };
}

interface Mentor {
  id: number;
  title: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
  totalSessions: number;
  hourlyRate: number;
  languages: string[];
  user: {
    username: string;
    country: string | null;
  };
}

export default function Community() {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const queryClient = useQueryClient();

  // Fetch community posts
  const { data: posts = [], isLoading: postsLoading } = useQuery<CommunityPost[]>({
    queryKey: ['/api/community/posts'],
  });

  // Fetch study groups
  const { data: studyGroups = [], isLoading: groupsLoading } = useQuery<StudyGroup[]>({
    queryKey: ['/api/community/study-groups'],
  });

  // Fetch events
  const { data: events = [], isLoading: eventsLoading } = useQuery<CommunityEvent[]>({
    queryKey: ['/api/community/events'],
  });

  // Fetch mentors
  const { data: mentors = [], isLoading: mentorsLoading } = useQuery<Mentor[]>({
    queryKey: ['/api/community/mentors'],
  });

  // Create new post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: { content: string; tags: string[] }) => {
      return apiRequest('/api/community/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/community/posts'] });
      setNewPostContent("");
      setNewPostTags("");
    },
  });

  // Like post mutation
  const likePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      return apiRequest(`/api/community/posts/${postId}/like`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/community/posts'] });
    },
  });

  // Join study group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: number) => {
      return apiRequest(`/api/community/study-groups/${groupId}/join`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/community/study-groups'] });
    },
  });

  // Register for event mutation
  const registerEventMutation = useMutation({
    mutationFn: async (eventId: number) => {
      return apiRequest(`/api/community/events/${eventId}/register`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/community/events'] });
    },
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const tags = newPostTags.split(',').map(tag => tag.trim()).filter(Boolean);
    createPostMutation.mutate({ content: newPostContent, tags });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Medical Community Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with fellow medical professionals, join study groups, attend events, and get mentorship from experienced practitioners
          </p>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Community Posts
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Study Groups
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Mentors
            </TabsTrigger>
          </TabsList>

          {/* Community Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your experience, ask a question, or start a discussion..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <Input
                  placeholder="Add tags (separated by commas): plab1, plab2, study-tips..."
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                />
                <Button 
                  onClick={handleCreatePost}
                  disabled={createPostMutation.isPending || !newPostContent.trim()}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {createPostMutation.isPending ? 'Posting...' : 'Post to Community'}
                </Button>
              </CardContent>
            </Card>

            {/* Posts List */}
            {postsLoading ? (
              <div className="text-center py-8">Loading community posts...</div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {post.author?.username?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {post.author?.username || 'Anonymous'}
                            </span>
                            <Badge variant="secondary">{post.author?.currentStage || 'Medical Student'}</Badge>
                            {post.author?.country && (
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {post.author.country}
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {post.content}
                          </p>
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => likePostMutation.mutate(post.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {post.replies}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            {groupsLoading ? (
              <div className="text-center py-8">Loading study groups...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge className="w-fit">{group.specialty}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {group.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="h-4 w-4" />
                          {group.meetingTime}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {group.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="h-4 w-4" />
                          {group.members}/{group.maxMembers} members
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Created by {group.creator?.username}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => joinGroupMutation.mutate(group.id)}
                          disabled={joinGroupMutation.isPending}
                        >
                          Join Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {eventsLoading ? (
              <div className="text-center py-8">Loading events...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="secondary">{event.type}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="h-4 w-4" />
                          {event.attendees}/{event.maxAttendees} attendees
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Hosted by {event.host?.username}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => registerEventMutation.mutate(event.id)}
                          disabled={registerEventMutation.isPending}
                        >
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            {mentorsLoading ? (
              <div className="text-center py-8">Loading mentors...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {mentor.user?.username?.charAt(0).toUpperCase() || 'M'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentor.user?.username}</CardTitle>
                          <p className="text-sm text-gray-500">{mentor.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Badge className="w-fit">{mentor.specialty}</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {mentor.experience}
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{mentor.rating}/5.0 ({mentor.totalSessions} sessions)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Globe className="h-4 w-4" />
                          {mentor.user?.country || 'Global'}
                        </div>
                        <div className="text-gray-500">
                          Languages: {mentor.languages?.join(', ') || 'English'}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-600">
                          £{mentor.hourlyRate}/hour
                        </span>
                        <Button size="sm">
                          Book Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Users, MessageSquare, ThumbsUp, Reply, Plus, Search, 
  TrendingUp, Award, Calendar, BookOpen, Stethoscope 
} from "lucide-react";
import type { CommunityPost, PostReply } from "@/lib/types";

// Mock user ID for demo
const DEMO_USER_ID = 1;

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("plab1");

  // Fetch community posts
  const { data: posts, isLoading: postsLoading } = useQuery<(CommunityPost & { author: { username: string } })[]>({
    queryKey: [`/api/community/posts`, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      params.append('limit', '20');
      
      const response = await fetch(`/api/community/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  // Create new post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string; category: string }) => {
      return apiRequest('POST', '/api/community/posts', {
        ...postData,
        userId: DEMO_USER_ID
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/community/posts`] });
      setNewPostOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("plab1");
    }
  });

  const categories = [
    { value: "all", label: "All Categories", icon: "🏠" },
    { value: "plab1", label: "PLAB 1 Questions", icon: "📚" },
    { value: "plab2", label: "PLAB 2 OSCE", icon: "🩺" },
    { value: "study-groups", label: "Study Groups", icon: "👥" },
    { value: "nhs-prep", label: "NHS Applications", icon: "🏥" },
    { value: "success-stories", label: "Success Stories", icon: "🎉" }
  ];

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      createPostMutation.mutate({
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory
      });
    }
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'plab1': return 'bg-medical-blue/10 text-medical-blue';
      case 'plab2': return 'bg-deep-rose/10 text-deep-rose';
      case 'study-groups': return 'bg-purple-accent/10 text-purple-accent';
      case 'nhs-prep': return 'bg-mint-green/10 text-mint-green';
      case 'success-stories': return 'bg-amber-warning/10 text-amber-warning';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-accent to-medical-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">PLAB Community</h1>
            <p className="text-xl opacity-90">Connect, learn, and support each other on your PLAB journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-accent" />
              </div>
              <div className="text-2xl font-bold text-purple-accent mb-1">15,247</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-medical-blue" />
              </div>
              <div className="text-2xl font-bold text-medical-blue mb-1">{posts?.length || 0}</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-mint-green" />
              </div>
              <div className="text-2xl font-bold text-mint-green mb-1">2,841</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-amber-warning" />
              </div>
              <div className="text-2xl font-bold text-amber-warning mb-1">84%</div>
              <div className="text-sm text-gray-600">Help Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-medical-blue text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Mentors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Active Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-mint-green rounded-full flex items-center justify-center text-white font-semibold">
                      SA
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Dr. Sarah Ahmed</div>
                      <div className="text-xs text-mint-green">PLAB Mentor • Online</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-semibold">
                      MC
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Dr. Michael Chen</div>
                      <div className="text-xs text-medical-blue">OSCE Specialist • Online</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-accent rounded-full flex items-center justify-center text-white font-semibold">
                      RP
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Dr. Rahul Patel</div>
                      <div className="text-xs text-purple-accent">NHS Advisor • Away</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Resources
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Exam Dates
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    OSCE Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and New Post */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-medical flex-shrink-0">
                    <Plus className="w-4 h-4 mr-2" />
                    New Discussion
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Start a New Discussion</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c.value !== 'all').map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.icon} {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="What would you like to discuss?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <Textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your question, experience, or knowledge..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setNewPostOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPostTitle.trim() || !newPostContent.trim() || createPostMutation.isPending}
                        className="btn-medical"
                      >
                        {createPostMutation.isPending ? 'Posting...' : 'Post Discussion'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {postsLoading ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading discussions...</span>
                  </div>
                </div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {post.author.username.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{post.author.username}</h3>
                            <Badge className={getCategoryColor(post.category)}>
                              {categories.find(c => c.value === post.category)?.label || post.category}
                            </Badge>
                            <span className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</span>
                          </div>
                          
                          <h2 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h2>
                          <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                          
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-medical-blue transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{post.likes} helpful</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-medical-blue transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">{post.replies} replies</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-medical-blue transition-colors">
                              <Reply className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No discussions found' : 'No discussions yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? 'Try adjusting your search terms or browse different categories.'
                      : 'Be the first to start a discussion in this category!'
                    }
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setNewPostOpen(true)} className="btn-medical">
                      <Plus className="w-4 h-4 mr-2" />
                      Start First Discussion
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center">
                <Button variant="outline" className="px-8">
                  Load More Discussions
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

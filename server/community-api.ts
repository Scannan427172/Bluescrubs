import type { Express } from "express";

// Mock data for community features
const mockPosts = [
  {
    id: 1,
    content: "Just passed my PLAB2 OSCE! The key was practicing with standardized patients and really focusing on communication skills. Happy to share study tips with anyone preparing. The clinical examination stations were challenging but manageable with proper preparation.",
    tags: ["plab2", "osce", "success-story", "communication-skills"],
    likes: 24,
    replies: 8,
    createdAt: new Date("2024-06-15T10:30:00Z").toISOString(),
    authorId: 1,
    author: {
      id: 1,
      username: "DrAishaPatel",
      currentStage: "PLAB2 Candidate",
      country: "United Kingdom",
      city: "London"
    }
  },
  {
    id: 2,
    content: "Starting my Foundation Year 1 rotation next month. Any advice from current FY1s about transitioning from medical school to actual practice? Particularly interested in tips for managing the on-call shifts and patient documentation.",
    tags: ["fy1", "foundation-year", "advice", "nhs"],
    likes: 18,
    replies: 12,
    createdAt: new Date("2024-06-14T14:45:00Z").toISOString(),
    authorId: 2,
    author: {
      id: 2,
      username: "MedMohamed",
      currentStage: "Junior Doctor",
      country: "United Kingdom",
      city: "Manchester"
    }
  },
  {
    id: 3,
    content: "Excellent webinar on evidence-based medicine this morning. The focus on critical appraisal skills is exactly what we need more of in medical education. Would recommend the RCP's upcoming series on clinical research methodology.",
    tags: ["evidence-based-medicine", "webinar", "education", "rcp"],
    likes: 31,
    replies: 6,
    createdAt: new Date("2024-06-13T09:15:00Z").toISOString(),
    authorId: 3,
    author: {
      id: 3,
      username: "SarahMD",
      currentStage: "Consultant",
      country: "United Kingdom",
      city: "Birmingham"
    }
  },
  {
    id: 4,
    content: "PLAB1 preparation update: Completed 2000+ practice questions this month. Focusing heavily on pharmacology and ethics now. The GMC guidelines are extensive but essential reading. Anyone else finding the drug interactions particularly challenging?",
    tags: ["plab1", "pharmacology", "ethics", "gmc-guidelines"],
    likes: 15,
    replies: 9,
    createdAt: new Date("2024-06-12T16:20:00Z").toISOString(),
    authorId: 4,
    author: {
      id: 4,
      username: "RajMedical",
      currentStage: "PLAB1 Candidate",
      country: "India",
      city: "Mumbai"
    }
  },
  {
    id: 5,
    content: "Incredible experience shadowing in A&E this week. The multidisciplinary approach to patient care here in the UK is impressive. Learning so much about triage protocols and emergency management procedures.",
    tags: ["ae", "shadowing", "emergency-medicine", "uk-healthcare"],
    likes: 22,
    replies: 4,
    createdAt: new Date("2024-06-11T11:50:00Z").toISOString(),
    authorId: 5,
    author: {
      id: 5,
      username: "DrFatimaAli",
      currentStage: "PLAB2 Candidate",
      country: "Pakistan",
      city: "Karachi"
    }
  }
];

const mockStudyGroups = [
  {
    id: 1,
    name: "PLAB2 OSCE Practice Group",
    description: "Weekly practice sessions for PLAB2 OSCE preparation. We cover all stations including history taking, clinical examination, and communication skills with simulated patients.",
    specialty: "General Medicine",
    meetingTime: "Saturdays 10:00 AM GMT",
    location: "London (Central Library)",
    members: 8,
    maxMembers: 12,
    createdAt: new Date("2024-05-20T10:00:00Z").toISOString(),
    creator: {
      username: "DrAishaPatel"
    }
  },
  {
    id: 2,
    name: "Cardiology Study Circle",
    description: "In-depth study sessions focusing on cardiovascular medicine. Perfect for FY2s preparing for specialty training applications and Core Medical Training.",
    specialty: "Cardiology",
    meetingTime: "Wednesdays 7:00 PM GMT",
    location: "Manchester (Virtual/Hybrid)",
    members: 6,
    maxMembers: 10,
    createdAt: new Date("2024-05-18T19:00:00Z").toISOString(),
    creator: {
      username: "MedMohamed"
    }
  },
  {
    id: 3,
    name: "Medical Ethics Discussion Forum",
    description: "Monthly discussions on complex medical ethics cases. Great for PLAB candidates and practicing doctors to explore ethical dilemmas in modern medicine.",
    specialty: "Medical Ethics",
    meetingTime: "First Sunday of each month 2:00 PM GMT",
    location: "Birmingham (University Campus)",
    members: 15,
    maxMembers: 20,
    createdAt: new Date("2024-05-15T14:00:00Z").toISOString(),
    creator: {
      username: "SarahMD"
    }
  }
];

const mockEvents = [
  {
    id: 1,
    title: "PLAB Success Workshop",
    type: "Workshop",
    date: "2024-07-15",
    time: "14:00",
    description: "Comprehensive workshop covering PLAB1 and PLAB2 preparation strategies. Includes mock OSCE stations, study planning, and Q&A with recent PLAB graduates.",
    attendees: 45,
    maxAttendees: 60,
    host: {
      username: "SarahMD"
    }
  },
  {
    id: 2,
    title: "UK Medical Career Pathways Seminar",
    type: "Seminar",
    date: "2024-07-22",
    time: "18:30",
    description: "Learn about different specialty training pathways in the UK NHS. Panel discussion with consultants from various specialties sharing their career journeys.",
    attendees: 32,
    maxAttendees: 50,
    host: {
      username: "MedMohamed"
    }
  },
  {
    id: 3,
    title: "Clinical Communication Skills Masterclass",
    type: "Masterclass",
    date: "2024-07-28",
    time: "10:00",
    description: "Advanced communication skills training with focus on breaking bad news, obtaining informed consent, and dealing with difficult conversations in clinical practice.",
    attendees: 28,
    maxAttendees: 35,
    host: {
      username: "DrAishaPatel"
    }
  }
];

const mockMentors = [
  {
    id: 1,
    title: "Consultant Physician & Medical Educator",
    specialty: "Internal Medicine",
    experience: "15+ years NHS experience, PLAB examiner, medical education specialist",
    availability: "Weekdays 6-8 PM, Weekends by appointment",
    rating: 4.9,
    totalSessions: 156,
    hourlyRate: 75,
    languages: ["English", "Welsh"],
    user: {
      username: "SarahMD",
      country: "United Kingdom"
    }
  },
  {
    id: 2,
    title: "Cardiology Registrar & PLAB Mentor",
    specialty: "Cardiology",
    experience: "5 years post-PLAB, specialized in interventional cardiology",
    availability: "Evenings and weekends",
    rating: 4.8,
    totalSessions: 89,
    hourlyRate: 60,
    languages: ["English", "Arabic", "French"],
    user: {
      username: "MedMohamed",
      country: "United Kingdom"
    }
  }
];

export function registerCommunityRoutes(app: Express) {
  // Get all community posts
  app.get('/api/community/posts', async (req, res) => {
    try {
      res.json(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  // Create a new community post
  app.post('/api/community/posts', async (req, res) => {
    try {
      const { content, tags } = req.body;
      const userId = req.user?.id || 1; // Default to user 1 for now

      const [newPost] = await db
        .insert(communityPosts)
        .values({
          authorId: userId,
          content,
          tags: tags || []
        })
        .returning();

      res.json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  });

  // Like/unlike a post
  app.post('/api/community/posts/:postId/like', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const userId = req.user?.id || 1;

      // Check if user already liked this post
      const existingLike = await db
        .select()
        .from(communityLikes)
        .where(eq(communityLikes.postId, postId))
        .where(eq(communityLikes.userId, userId))
        .limit(1);

      if (existingLike.length > 0) {
        // Unlike the post
        await db
          .delete(communityLikes)
          .where(eq(communityLikes.postId, postId))
          .where(eq(communityLikes.userId, userId));

        await db
          .update(communityPosts)
          .set({ likes: sql`${communityPosts.likes} - 1` })
          .where(eq(communityPosts.id, postId));

        res.json({ liked: false });
      } else {
        // Like the post
        await db
          .insert(communityLikes)
          .values({ postId, userId });

        await db
          .update(communityPosts)
          .set({ likes: sql`${communityPosts.likes} + 1` })
          .where(eq(communityPosts.id, postId));

        res.json({ liked: true });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      res.status(500).json({ error: 'Failed to toggle like' });
    }
  });

  // Get study groups
  app.get('/api/community/study-groups', async (req, res) => {
    try {
      const groups = await db
        .select({
          id: communityStudyGroups.id,
          name: communityStudyGroups.name,
          description: communityStudyGroups.description,
          specialty: communityStudyGroups.specialty,
          meetingTime: communityStudyGroups.meetingTime,
          location: communityStudyGroups.location,
          members: communityStudyGroups.members,
          maxMembers: communityStudyGroups.maxMembers,
          createdAt: communityStudyGroups.createdAt,
          creator: {
            username: users.username
          }
        })
        .from(communityStudyGroups)
        .leftJoin(users, eq(communityStudyGroups.creatorId, users.id))
        .where(eq(communityStudyGroups.isPublic, true))
        .orderBy(desc(communityStudyGroups.createdAt));

      res.json(groups);
    } catch (error) {
      console.error('Error fetching study groups:', error);
      res.status(500).json({ error: 'Failed to fetch study groups' });
    }
  });

  // Join a study group
  app.post('/api/community/study-groups/:groupId/join', async (req, res) => {
    try {
      const groupId = parseInt(req.params.groupId);
      const userId = req.user?.id || 1;

      // Check if already a member
      const existingMembership = await db
        .select()
        .from(studyGroupMemberships)
        .where(eq(studyGroupMemberships.groupId, groupId))
        .where(eq(studyGroupMemberships.userId, userId))
        .limit(1);

      if (existingMembership.length > 0) {
        return res.json({ joined: true, message: 'Already a member' });
      }

      // Add membership
      await db
        .insert(studyGroupMemberships)
        .values({ groupId, userId });

      // Update member count
      await db
        .update(communityStudyGroups)
        .set({ members: sql`${communityStudyGroups.members} + 1` })
        .where(eq(communityStudyGroups.id, groupId));

      res.json({ joined: true });
    } catch (error) {
      console.error('Error joining study group:', error);
      res.status(500).json({ error: 'Failed to join study group' });
    }
  });

  // Get community events
  app.get('/api/community/events', async (req, res) => {
    try {
      const events = await db
        .select({
          id: communityEvents.id,
          title: communityEvents.title,
          type: communityEvents.type,
          date: communityEvents.date,
          time: communityEvents.time,
          description: communityEvents.description,
          attendees: communityEvents.attendees,
          maxAttendees: communityEvents.maxAttendees,
          host: {
            username: users.username
          }
        })
        .from(communityEvents)
        .leftJoin(users, eq(communityEvents.hostId, users.id))
        .orderBy(communityEvents.date);

      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  // Register for an event
  app.post('/api/community/events/:eventId/register', async (req, res) => {
    try {
      const eventId = parseInt(req.params.eventId);
      const userId = req.user?.id || 1;

      // Check if already registered
      const existingRegistration = await db
        .select()
        .from(eventRegistrations)
        .where(eq(eventRegistrations.eventId, eventId))
        .where(eq(eventRegistrations.userId, userId))
        .limit(1);

      if (existingRegistration.length > 0) {
        return res.json({ registered: true, message: 'Already registered' });
      }

      // Add registration
      await db
        .insert(eventRegistrations)
        .values({ eventId, userId });

      // Update attendee count
      await db
        .update(communityEvents)
        .set({ attendees: sql`${communityEvents.attendees} + 1` })
        .where(eq(communityEvents.id, eventId));

      res.json({ registered: true });
    } catch (error) {
      console.error('Error registering for event:', error);
      res.status(500).json({ error: 'Failed to register for event' });
    }
  });

  // Get mentors
  app.get('/api/community/mentors', async (req, res) => {
    try {
      const mentors = await db
        .select({
          id: communityMentors.id,
          title: communityMentors.title,
          specialty: communityMentors.specialty,
          experience: communityMentors.experience,
          availability: communityMentors.availability,
          rating: communityMentors.rating,
          totalSessions: communityMentors.totalSessions,
          hourlyRate: communityMentors.hourlyRate,
          languages: communityMentors.languages,
          user: {
            username: users.username,
            country: users.country
          }
        })
        .from(communityMentors)
        .leftJoin(users, eq(communityMentors.userId, users.id))
        .orderBy(desc(communityMentors.rating));

      res.json(mentors);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      res.status(500).json({ error: 'Failed to fetch mentors' });
    }
  });

  // Book a mentor session
  app.post('/api/community/mentors/:mentorId/book', async (req, res) => {
    try {
      const mentorId = parseInt(req.params.mentorId);
      const userId = req.user?.id || 1;
      const { scheduledAt, duration, notes } = req.body;

      const [session] = await db
        .insert(mentorSessions)
        .values({
          mentorId,
          menteeId: userId,
          scheduledAt: new Date(scheduledAt),
          duration: duration || 60,
          notes
        })
        .returning();

      res.json(session);
    } catch (error) {
      console.error('Error booking mentor session:', error);
      res.status(500).json({ error: 'Failed to book session' });
    }
  });

  // Get comments for a post
  app.get('/api/community/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);

      const comments = await db
        .select({
          id: communityComments.id,
          content: communityComments.content,
          likes: communityComments.likes,
          createdAt: communityComments.createdAt,
          author: {
            username: users.username,
            currentStage: users.currentStage
          }
        })
        .from(communityComments)
        .leftJoin(users, eq(communityComments.authorId, users.id))
        .where(eq(communityComments.postId, postId))
        .orderBy(communityComments.createdAt);

      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  // Add a comment to a post
  app.post('/api/community/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const userId = req.user?.id || 1;
      const { content } = req.body;

      const [comment] = await db
        .insert(communityComments)
        .values({
          postId,
          authorId: userId,
          content
        })
        .returning();

      // Update reply count
      await db
        .update(communityPosts)
        .set({ replies: sql`${communityPosts.replies} + 1` })
        .where(eq(communityPosts.id, postId));

      res.json(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });
}
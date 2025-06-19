import type { Express } from "express";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import { 
  communityPosts, 
  communityComments, 
  communityLikes,
  communityStudyGroups,
  studyGroupMemberships,
  communityEvents,
  eventRegistrations,
  communityMentors,
  mentorSessions,
  users 
} from "@shared/schema";

export function registerCommunityRoutes(app: Express) {
  // Get all community posts with author info
  app.get('/api/community/posts', async (req, res) => {
    try {
      const posts = await db
        .select({
          id: communityPosts.id,
          content: communityPosts.content,
          tags: communityPosts.tags,
          likes: communityPosts.likes,
          replies: communityPosts.replies,
          createdAt: communityPosts.createdAt,
          authorId: communityPosts.authorId,
          author: {
            id: users.id,
            username: users.username,
            currentStage: users.currentStage,
            country: users.country,
            city: users.city
          }
        })
        .from(communityPosts)
        .leftJoin(users, eq(communityPosts.authorId, users.id))
        .orderBy(desc(communityPosts.createdAt));

      res.json(posts);
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
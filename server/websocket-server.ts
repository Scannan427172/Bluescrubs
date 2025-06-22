import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { storage } from './storage';

interface WebSocketClient extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

interface LeaderboardUpdate {
  type: 'leaderboard_update';
  data: {
    globalRankings: any[];
    weeklyRankings: any[];
    userRank: number;
    userWeeklyRank: number;
  };
}

interface StudySessionUpdate {
  type: 'study_session_update';
  data: {
    userId: string;
    questionsAnswered: number;
    currentStreak: number;
    sessionTime: number;
  };
}

interface NotificationUpdate {
  type: 'notification';
  data: {
    id: number;
    title: string;
    message: string;
    type: string;
    timestamp: string;
  };
}

type WebSocketMessage = LeaderboardUpdate | StudySessionUpdate | NotificationUpdate;

class WebSocketManager {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, Set<WebSocketClient>> = new Map();

  initialize(server: Server) {
    this.wss = new WebSocketServer({ 
      server, 
      path: '/ws',
      perMessageDeflate: {
        zlibDeflateOptions: {
          level: 3, // Set compression level
        },
      },
    });

    this.wss.on('connection', (ws: WebSocketClient, request) => {
      console.log('WebSocket client connected');
      
      ws.isAlive = true;
      
      // Extract user ID from query parameters or headers
      const url = new URL(request.url!, `http://${request.headers.host}`);
      const userId = url.searchParams.get('userId');
      
      if (userId) {
        ws.userId = userId;
        
        if (!this.clients.has(userId)) {
          this.clients.set(userId, new Set());
        }
        this.clients.get(userId)!.add(ws);
        
        console.log(`User ${userId} connected via WebSocket`);
      }

      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message.toString());
          await this.handleMessage(ws, data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });

      ws.on('pong', () => {
        ws.isAlive = true;
      });

      ws.on('close', () => {
        if (ws.userId) {
          const userClients = this.clients.get(ws.userId);
          if (userClients) {
            userClients.delete(ws);
            if (userClients.size === 0) {
              this.clients.delete(ws.userId);
            }
          }
          console.log(`User ${ws.userId} disconnected from WebSocket`);
        }
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      // Send initial data
      this.sendInitialData(ws);
    });

    // Heartbeat to keep connections alive
    setInterval(() => {
      this.wss?.clients.forEach((ws: WebSocketClient) => {
        if (!ws.isAlive) {
          ws.terminate();
          return;
        }
        
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000); // 30 seconds

    // Periodic leaderboard updates
    setInterval(async () => {
      await this.broadcastLeaderboardUpdates();
    }, 60000); // 1 minute

    console.log('WebSocket server initialized on /ws');
  }

  private async handleMessage(ws: WebSocketClient, data: any) {
    switch (data.type) {
      case 'subscribe_leaderboard':
        // Client wants real-time leaderboard updates
        if (ws.userId) {
          await this.sendLeaderboardUpdate(ws.userId);
        }
        break;
        
      case 'question_answered':
        // Update study session and broadcast to user's other clients
        if (ws.userId && data.payload) {
          await this.handleQuestionAnswered(ws.userId, data.payload);
        }
        break;
        
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        break;
    }
  }

  private async sendInitialData(ws: WebSocketClient) {
    if (!ws.userId) return;

    try {
      // Send current leaderboard position
      await this.sendLeaderboardUpdate(ws.userId);
      
      // Send any unread notifications
      const notifications = await storage.getUnreadNotifications(ws.userId);
      notifications.forEach(notification => {
        this.sendToUser(ws.userId!, {
          type: 'notification',
          data: {
            id: notification.id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            timestamp: notification.createdAt.toISOString()
          }
        });
      });
    } catch (error) {
      console.error('Error sending initial WebSocket data:', error);
    }
  }

  private async handleQuestionAnswered(userId: string, payload: any) {
    try {
      // Update user progress
      await storage.recordProgress(userId, {
        questionId: payload.questionId,
        isCorrect: payload.isCorrect,
        timeSpent: payload.timeSpent
      });

      // Get updated user stats
      const user = await storage.getUser(userId);
      if (!user) return;

      // Broadcast study session update to all user's clients
      this.sendToUser(userId, {
        type: 'study_session_update',
        data: {
          userId,
          questionsAnswered: payload.totalAnswered || 1,
          currentStreak: user.studyStreak,
          sessionTime: payload.sessionTime || 0
        }
      });

      // Check for achievements
      const newAchievements = await this.checkAchievements(userId, payload);
      newAchievements.forEach(achievement => {
        this.sendToUser(userId, {
          type: 'notification',
          data: {
            id: Date.now(),
            title: 'Achievement Unlocked!',
            message: `You earned: ${achievement.name}`,
            type: 'achievement',
            timestamp: new Date().toISOString()
          }
        });
      });

      // Update leaderboards if significant progress
      if (payload.isCorrect || payload.totalAnswered % 10 === 0) {
        setTimeout(() => this.broadcastLeaderboardUpdates(), 2000);
      }
    } catch (error) {
      console.error('Error handling question answered:', error);
    }
  }

  private async checkAchievements(userId: string, payload: any): Promise<any[]> {
    const achievements = [];
    const userStats = await storage.getUserStats(userId);
    
    // Example achievement checks
    if (userStats.totalAnswered === 100) {
      achievements.push({ name: 'Century Club', description: '100 questions answered!' });
    }
    
    if (userStats.totalAnswered === 500) {
      achievements.push({ name: 'Question Master', description: '500 questions answered!' });
    }
    
    if (userStats.accuracyRate >= 80 && userStats.totalAnswered >= 50) {
      achievements.push({ name: 'Accuracy Expert', description: '80%+ accuracy on 50+ questions!' });
    }
    
    return achievements;
  }

  private async sendLeaderboardUpdate(userId: string) {
    try {
      const [globalRankings, weeklyRankings, userStats] = await Promise.all([
        storage.getGlobalLeaderboard(10),
        storage.getWeeklyLeaderboard(10),
        storage.getUserStats(userId)
      ]);

      const userGlobalRank = await storage.getUserGlobalRank(userId);
      const userWeeklyRank = await storage.getUserWeeklyRank(userId);

      this.sendToUser(userId, {
        type: 'leaderboard_update',
        data: {
          globalRankings,
          weeklyRankings,
          userRank: userGlobalRank,
          userWeeklyRank: userWeeklyRank
        }
      });
    } catch (error) {
      console.error('Error sending leaderboard update:', error);
    }
  }

  private async broadcastLeaderboardUpdates() {
    try {
      const [globalRankings, weeklyRankings] = await Promise.all([
        storage.getGlobalLeaderboard(10),
        storage.getWeeklyLeaderboard(10)
      ]);

      // Send updates to all connected users
      for (const [userId, userClients] of this.clients.entries()) {
        if (userClients.size > 0) {
          const [userGlobalRank, userWeeklyRank] = await Promise.all([
            storage.getUserGlobalRank(userId),
            storage.getUserWeeklyRank(userId)
          ]);

          const message: LeaderboardUpdate = {
            type: 'leaderboard_update',
            data: {
              globalRankings,
              weeklyRankings,
              userRank: userGlobalRank,
              userWeeklyRank: userWeeklyRank
            }
          };

          userClients.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(message));
            }
          });
        }
      }
    } catch (error) {
      console.error('Error broadcasting leaderboard updates:', error);
    }
  }

  sendToUser(userId: string, message: WebSocketMessage) {
    const userClients = this.clients.get(userId);
    if (!userClients) return;

    const messageStr = JSON.stringify(message);
    userClients.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }

  broadcast(message: WebSocketMessage, excludeUserId?: string) {
    const messageStr = JSON.stringify(message);
    
    this.wss?.clients.forEach((ws: WebSocketClient) => {
      if (ws.readyState === WebSocket.OPEN && ws.userId !== excludeUserId) {
        ws.send(messageStr);
      }
    });
  }

  getConnectedUsers(): string[] {
    return Array.from(this.clients.keys());
  }

  getConnectionCount(): number {
    return this.wss?.clients.size || 0;
  }
}

export const websocketManager = new WebSocketManager();
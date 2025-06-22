import { MailService } from '@sendgrid/mail';
import { storage } from './storage';
import { CONTACT_EMAIL } from '../client/src/components/contact-info';

interface EmailParams {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  templateData?: any;
}

interface StudyReminderData {
  username: string;
  streak: number;
  todayGoal: string;
}

interface AchievementData {
  username: string;
  achievementName: string;
  description: string;
  badgeUrl?: string;
}

interface PlacementUpdateData {
  username: string;
  hospitalName: string;
  status: string;
  nextSteps?: string;
}

class EmailService {
  private mailService: MailService;
  private isConfigured: boolean = false;

  constructor() {
    this.mailService = new MailService();
    
    if (process.env.SENDGRID_API_KEY) {
      this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
      this.isConfigured = true;
    } else {
      console.warn('SENDGRID_API_KEY not configured - email notifications disabled');
    }
  }

  async sendEmail(params: EmailParams): Promise<boolean> {
    if (!this.isConfigured) {
      console.log('Email service not configured, skipping email:', params.subject);
      return false;
    }

    try {
      await this.mailService.send({
        to: params.to,
        from: params.from || CONTACT_EMAIL,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      
      console.log(`Email sent successfully to ${params.to}: ${params.subject}`);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendStudyReminder(userEmail: string, data: StudyReminderData): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏥 NHS Prep Study Reminder</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Hi ${data.username}! 👋</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            It's time for your daily PLAB study session! You're currently on a 
            <strong style="color: #3b82f6;">${data.streak}-day streak</strong> - let's keep it going!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0; color: #1e293b;">Today's Goal:</h3>
            <p style="margin: 10px 0 0 0; color: #475569;">${data.todayGoal}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://nhsprep.co.uk/plab1-new" 
               style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Start Studying Now
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            💡 Remember: Consistent daily practice is the key to PLAB success!
          </p>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>NHS Prep - Your path to UK medical practice</p>
          <p>Contact us: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject: `🏥 Daily Study Reminder - ${data.streak} Day Streak!`,
      html
    });
  }

  async sendAchievementNotification(userEmail: string, data: AchievementData): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏆 Achievement Unlocked!</h1>
        </div>
        
        <div style="padding: 30px; background: #f0fdf4;">
          <h2 style="color: #1e293b;">Congratulations ${data.username}! 🎉</h2>
          
          <div style="background: white; padding: 25px; border-radius: 12px; margin: 20px 0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            ${data.badgeUrl ? `<img src="${data.badgeUrl}" alt="Achievement Badge" style="width: 80px; height: 80px; margin-bottom: 15px;">` : '🏆'}
            <h3 style="margin: 0; color: #10b981; font-size: 24px;">${data.achievementName}</h3>
            <p style="margin: 10px 0 0 0; color: #475569; font-size: 16px;">${data.description}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://nhsprep.co.uk/analytics" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              View All Achievements
            </a>
          </div>
          
          <p style="color: #059669; font-size: 16px; text-align: center; font-weight: bold;">
            Keep up the excellent work on your PLAB journey! 💪
          </p>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>NHS Prep - Your path to UK medical practice</p>
          <p>Contact us: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject: `🏆 Achievement Unlocked: ${data.achievementName}`,
      html
    });
  }

  async sendPlacementUpdate(userEmail: string, data: PlacementUpdateData): Promise<boolean> {
    const statusColors = {
      'accepted': '#10b981',
      'rejected': '#ef4444',
      'pending': '#f59e0b',
      'interview': '#3b82f6'
    };

    const statusEmojis = {
      'accepted': '✅',
      'rejected': '❌',
      'pending': '⏳',
      'interview': '📅'
    };

    const color = statusColors[data.status as keyof typeof statusColors] || '#6b7280';
    const emoji = statusEmojis[data.status as keyof typeof statusEmojis] || '📄';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, ${color}, ${color}dd); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">${emoji} Placement Update</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Hi ${data.username}!</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            We have an update regarding your clinical placement application:
          </p>
          
          <div style="background: white; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${color};">
            <h3 style="margin: 0; color: #1e293b;">Hospital: ${data.hospitalName}</h3>
            <p style="margin: 10px 0; color: ${color}; font-weight: bold; font-size: 18px;">
              Status: ${data.status.charAt(0).toUpperCase() + data.status.slice(1)} ${emoji}
            </p>
            ${data.nextSteps ? `<p style="margin: 15px 0 0 0; color: #475569;"><strong>Next Steps:</strong> ${data.nextSteps}</p>` : ''}
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://nhsprep.co.uk/placements" 
               style="background: ${color}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              View All Applications
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            Questions about your placement? Contact us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
          </p>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>NHS Prep - Your path to UK medical practice</p>
          <p>Contact us: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject: `${emoji} Placement Update: ${data.hospitalName} - ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`,
      html
    });
  }

  async sendWeeklyProgressReport(userEmail: string, username: string, weeklyStats: any): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">📊 Weekly Progress Report</h1>
        </div>
        
        <div style="padding: 30px; background: #faf5ff;">
          <h2 style="color: #1e293b;">Hi ${username}!</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Here's your weekly study progress summary:
          </p>
          
          <div style="display: grid; gap: 15px; margin: 25px 0;">
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
              <h4 style="margin: 0; color: #1e293b;">Questions Answered</h4>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #8b5cf6;">${weeklyStats.questionsAnswered}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h4 style="margin: 0; color: #1e293b;">Accuracy Rate</h4>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #10b981;">${weeklyStats.accuracy}%</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="margin: 0; color: #1e293b;">Study Time</h4>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #f59e0b;">${weeklyStats.studyTime} hours</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://nhsprep.co.uk/analytics" 
               style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              View Detailed Analytics
            </a>
          </div>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>NHS Prep - Your path to UK medical practice</p>
          <p>Contact us: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject: `📊 Your Weekly Progress Report - ${weeklyStats.questionsAnswered} Questions Completed`,
      html
    });
  }

  async processScheduledNotifications(): Promise<void> {
    try {
      const notifications = await storage.getPendingNotifications();
      
      for (const notification of notifications) {
        const user = await storage.getUser(notification.userId);
        if (!user || !user.email) continue;

        let emailSent = false;

        switch (notification.type) {
          case 'study_reminder':
            emailSent = await this.sendStudyReminder(user.email, {
              username: user.username || user.firstName || 'Student',
              streak: user.studyStreak,
              todayGoal: notification.data?.goal || 'Complete 20 PLAB questions'
            });
            break;

          case 'achievement':
            emailSent = await this.sendAchievementNotification(user.email, {
              username: user.username || user.firstName || 'Student',
              achievementName: notification.data?.name || 'Achievement',
              description: notification.data?.description || 'You earned a new achievement!',
              badgeUrl: notification.data?.badgeUrl
            });
            break;

          case 'placement_update':
            emailSent = await this.sendPlacementUpdate(user.email, {
              username: user.username || user.firstName || 'Student',
              hospitalName: notification.data?.hospital || 'Hospital',
              status: notification.data?.status || 'pending',
              nextSteps: notification.data?.nextSteps
            });
            break;
        }

        if (emailSent) {
          await storage.markNotificationSent(notification.id);
        }
      }
    } catch (error) {
      console.error('Error processing scheduled notifications:', error);
    }
  }
}

export const emailService = new EmailService();

// Schedule notification processing every 5 minutes
setInterval(async () => {
  await emailService.processScheduledNotifications();
}, 5 * 60 * 1000);
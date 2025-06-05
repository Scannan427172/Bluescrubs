import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, Shield, Lock, Eye, Users, 
  Cookie, Scale, HelpCircle, Mail, Phone,
  Building, Globe, Download, ExternalLink, Heart
} from "lucide-react";

export default function More() {
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  const legalDocuments = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: Shield,
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "June 2025"
    },
    {
      id: "terms-of-service",
      title: "Terms of Service",
      icon: FileText,
      description: "Terms and conditions for using NHSprep platform",
      lastUpdated: "June 2025"
    },
    {
      id: "gdpr-compliance",
      title: "GDPR Compliance",
      icon: Lock,
      description: "Your rights under the General Data Protection Regulation",
      lastUpdated: "June 2025"
    },
    {
      id: "cookie-policy",
      title: "Cookie Policy",
      icon: Cookie,
      description: "Information about cookies and tracking technologies",
      lastUpdated: "June 2025"
    },
    {
      id: "data-processing",
      title: "Data Processing Agreement",
      icon: Eye,
      description: "How we process and handle your educational data",
      lastUpdated: "June 2025"
    },
    {
      id: "user-rights",
      title: "User Rights & Responsibilities",
      icon: Users,
      description: "Your rights and responsibilities as a platform user",
      lastUpdated: "June 2025"
    },
    {
      id: "disclaimer",
      title: "Medical Disclaimer",
      icon: Scale,
      description: "Important disclaimers about medical education content",
      lastUpdated: "June 2025"
    },
    {
      id: "accessibility",
      title: "Accessibility Statement",
      icon: Globe,
      description: "Our commitment to digital accessibility",
      lastUpdated: "June 2025"
    },
    {
      id: "nhs-compliance",
      title: "NHS Standards Compliance",
      icon: Heart,
      description: "Compliance with NHS standards and regulatory requirements",
      lastUpdated: "June 2025"
    },
    {
      id: "nhs-code-of-conduct",
      title: "NHS Code of Conduct",
      icon: Shield,
      description: "NHS values and professional standards in medical education",
      lastUpdated: "June 2025"
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Notice",
      icon: Scale,
      description: "Copyright, trademark, and intellectual property protection",
      lastUpdated: "June 2025"
    },
    {
      id: "platform-security",
      title: "Platform Security & Data Protection",
      icon: Lock,
      description: "Security measures and data protection protocols",
      lastUpdated: "June 2025"
    }
  ];

  const supportOptions = [
    {
      title: "Contact Support",
      description: "Get help with technical issues or account problems",
      icon: HelpCircle,
      action: "mailto:support@nhsprep.com"
    },
    {
      title: "Email Us",
      description: "General inquiries and feedback",
      icon: Mail,
      action: "mailto:hello@nhsprep.com"
    },
    {
      title: "Phone Support",
      description: "Speak to our team directly",
      icon: Phone,
      action: "tel:+44-20-1234-5678"
    },
    {
      title: "Company Information",
      description: "Learn more about NHSprep Ltd",
      icon: Building,
      action: "/company-info"
    }
  ];

  const documentContent = {
    "privacy-policy": {
      title: "Privacy Policy",
      content: `
# Privacy Policy

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Introduction

NHSprep Ltd ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our medical education platform.

## 2. Information We Collect

### 2.1 Personal Information
- Name, email address, and contact details
- Educational background and medical qualifications
- Study progress and performance data
- User-generated content (recordings, posts, comments)

### 2.2 Technical Information
- IP address and browser information
- Device identifiers and operating system
- Usage analytics and interaction data
- Cookies and similar tracking technologies

### 2.3 Medical Education Data
- PLAB preparation progress and scores
- OSCE performance recordings and feedback
- Study patterns and learning analytics
- Mentor session recordings and notes

## 3. How We Use Your Information

### 3.1 Educational Services
- Providing personalized learning experiences
- Tracking study progress and performance
- Generating AI-powered feedback and recommendations
- Facilitating mentor-student connections

### 3.2 Platform Improvement
- Analyzing usage patterns to improve our services
- Developing new features and content
- Ensuring platform security and integrity
- Providing customer support

### 3.3 Communications
- Sending important platform updates
- Providing study reminders and notifications
- Sharing relevant educational content
- Responding to your inquiries

## 4. Legal Basis for Processing (GDPR)

We process your personal data based on:
- **Consent**: For marketing communications and optional features
- **Contract**: To provide educational services you've subscribed to
- **Legitimate Interest**: For platform improvement and security
- **Legal Obligation**: To comply with applicable laws and regulations

## 5. Data Sharing and Disclosure

### 5.1 We Share Data With:
- **Mentors**: Only session-related information for educational purposes
- **Service Providers**: Trusted partners who assist in platform operations
- **Analytics Services**: Anonymized data for usage analysis
- **Legal Authorities**: When required by law or to protect rights

### 5.2 We Do Not:
- Sell your personal data to third parties
- Share your medical education records without consent
- Use your data for purposes outside this policy
- Transfer data outside the UK without adequate protections

## 6. Data Security

We implement robust security measures including:
- End-to-end encryption for sensitive data
- Regular security audits and vulnerability assessments
- Secure data centers with physical access controls
- Staff training on data protection best practices

## 7. Your Rights Under GDPR

You have the right to:
- **Access**: Request copies of your personal data
- **Rectification**: Correct inaccurate or incomplete data
- **Erasure**: Request deletion of your personal data
- **Portability**: Receive your data in a structured format
- **Restriction**: Limit how we process your data
- **Objection**: Object to processing based on legitimate interests
- **Withdraw Consent**: For processing based on consent

## 8. Data Retention

We retain your data for:
- **Account Data**: Until you delete your account
- **Study Records**: 7 years after course completion
- **Support Communications**: 3 years from last contact
- **Analytics Data**: Anonymized after 2 years

## 9. International Transfers

If we transfer data outside the UK, we ensure:
- Adequate protection through UK adequacy decisions
- Standard contractual clauses approved by UK authorities
- Binding corporate rules or certification schemes
- Your explicit consent for specific transfers

## 10. Contact Information

**Data Protection Officer**  
Email: dpo@nhsprep.com  
Phone: +44 20 1234 5678  
Address: NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

**Supervisory Authority**  
Information Commissioner's Office (ICO)  
Website: ico.org.uk  
Phone: 0303 123 1113

## 11. Changes to This Policy

We may update this privacy policy to reflect changes in our practices or legal requirements. We will notify you of material changes via email or platform notification.

## 12. Complaints

If you have concerns about how we handle your data, you can:
1. Contact our Data Protection Officer
2. File a complaint with the ICO
3. Seek legal remedies through UK courts
      `
    },
    "terms-of-service": {
      title: "Terms of Service",
      content: `
# Terms of Service

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Agreement Overview

These Terms of Service ("Terms") govern your use of the NHSprep platform operated by NHSprep Ltd, a company registered in England and Wales (Company Number: 12345678).

## 2. Acceptance of Terms

By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.

## 3. Description of Service

NHSprep provides an online medical education platform designed to help international medical graduates prepare for PLAB examinations and UK medical practice, including:

- Interactive MCQ practice questions
- Video OSCE simulations with AI feedback
- Mentor matching and booking services
- Cultural training modules for NHS practice
- Analytics and progress tracking
- Community discussion forums

## 4. User Accounts and Registration

### 4.1 Account Requirements
- You must be at least 18 years old
- Provide accurate, current, and complete information
- Maintain the security of your account credentials
- Notify us immediately of any unauthorized use

### 4.2 Account Responsibilities
- You are responsible for all activities under your account
- One person may not maintain multiple accounts
- Sharing account credentials is prohibited
- Account termination may result from violations

## 5. Acceptable Use Policy

### 5.1 Permitted Uses
- Personal, non-commercial educational purposes
- Sharing educational insights in community forums
- Booking and attending mentor sessions
- Downloading content for offline study

### 5.2 Prohibited Activities
- Sharing or distributing copyrighted content
- Creating fake accounts or impersonating others
- Interfering with platform security or functionality
- Using automated tools to access content
- Harassment, discrimination, or inappropriate behavior
- Commercial use without written permission

## 6. Intellectual Property Rights

### 6.1 Our Content
- Platform content is protected by copyright and trademark laws
- You may not reproduce, modify, or distribute our content
- Limited license granted for personal educational use only
- All AI-generated feedback remains our intellectual property

### 6.2 User Content
- You retain ownership of content you create
- Grant us license to use, modify, and display your content
- Ensure you have rights to share any content you upload
- We may remove content that violates these Terms

## 7. Payment and Subscription Terms

### 7.1 Subscription Plans
- Various subscription tiers available with different features
- Prices displayed in British Pounds (GBP) including VAT
- Payment processed securely through third-party providers
- Automatic renewal unless cancelled

### 7.2 Refund Policy
- 14-day cooling-off period for new subscriptions
- Pro-rated refunds for technical issues on our part
- No refunds for completed mentor sessions
- Refund requests must be submitted via support channels

## 8. Mentor Services

### 8.1 Mentor-Student Relationship
- Mentors are independent contractors, not employees
- We facilitate connections but don't guarantee outcomes
- Professional conduct expected from all parties
- Sessions are recorded for quality and safety purposes

### 8.2 Booking and Cancellation
- Cancellations must be made 24 hours in advance
- Late cancellations may result in charges
- Repeated no-shows may restrict booking privileges
- Technical issues during sessions may warrant rescheduling

## 9. Privacy and Data Protection

Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information. By using our service, you consent to data processing as described.

## 10. Platform Availability and Modifications

### 10.1 Service Availability
- We strive for 99.9% uptime but cannot guarantee uninterrupted access
- Scheduled maintenance will be announced in advance
- Emergency maintenance may occur without notice
- We are not liable for service interruptions

### 10.2 Platform Changes
- We may modify features, content, or these Terms at any time
- Material changes will be communicated via email or platform notification
- Continued use constitutes acceptance of modifications
- You may terminate your account if you disagree with changes

## 11. Disclaimers and Limitation of Liability

### 11.1 Educational Disclaimer
- Content is for educational purposes only
- Does not constitute medical advice or guarantee exam success
- We are not responsible for exam outcomes or career decisions
- Always consult official sources for current exam requirements

### 11.2 Limitation of Liability
- Our liability is limited to the amount paid for services
- We are not liable for indirect, incidental, or consequential damages
- This limitation applies to the fullest extent permitted by law
- Some jurisdictions may not allow these limitations

## 12. Indemnification

You agree to indemnify and hold harmless NHSprep Ltd, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:
- Your use of the platform
- Violation of these Terms
- Infringement of third-party rights
- Your user-generated content

## 13. Termination

### 13.1 Termination by You
- Cancel subscription at any time through account settings
- Account deletion removes access to all content and data
- Some information may be retained for legal or business purposes
- Refunds subject to our refund policy

### 13.2 Termination by Us
- We may suspend or terminate accounts for Terms violations
- Immediate termination for serious violations or illegal activity
- Notice will be provided except in cases of imminent harm
- You remain liable for charges incurred before termination

## 14. Governing Law and Dispute Resolution

### 14.1 Applicable Law
These Terms are governed by the laws of England and Wales, without regard to conflict of law principles.

### 14.2 Dispute Resolution
- Disputes should first be addressed through our support channels
- Unresolved disputes subject to binding arbitration in London
- Small claims court remains available for qualifying disputes
- Class action lawsuits are waived to the extent permitted by law

## 15. Contact Information

**NHSprep Ltd**  
123 Medical Square  
London, SW1A 1AA  
United Kingdom  

Email: legal@nhsprep.com  
Phone: +44 20 1234 5678  
Support: support@nhsprep.com

## 16. Miscellaneous

### 16.1 Severability
If any provision is found unenforceable, the remaining provisions will continue in full force and effect.

### 16.2 Entire Agreement
These Terms, together with our Privacy Policy, constitute the entire agreement between you and NHSprep Ltd.

### 16.3 Assignment
We may assign our rights and obligations under these Terms. You may not assign your rights without our written consent.
      `
    },
    "gdpr-compliance": {
      title: "GDPR Compliance Statement",
      content: `
# GDPR Compliance Statement

**Last Updated:** June 5, 2025

## 1. Our Commitment to GDPR

NHSprep Ltd is fully committed to compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This document outlines our comprehensive approach to data protection and your rights as a data subject.

## 2. Data Controller Information

**Data Controller:** NHSprep Ltd  
**Registration:** Information Commissioner's Office (ICO)  
**Registration Number:** Z1234567  
**Address:** 123 Medical Square, London, SW1A 1AA  
**Data Protection Officer:** dpo@nhsprep.com

## 3. Legal Basis for Processing

We process personal data under the following legal bases:

### 3.1 Consent (Article 6(1)(a))
- Marketing communications
- Optional platform features
- Research participation
- Newsletter subscriptions

### 3.2 Contract (Article 6(1)(b))
- Account creation and management
- Educational service delivery
- Payment processing
- Customer support

### 3.3 Legitimate Interest (Article 6(1)(f))
- Platform security and fraud prevention
- Service improvement and development
- Analytics and usage optimization
- Business administration

### 3.4 Legal Obligation (Article 6(1)(c))
- Tax and accounting requirements
- Regulatory compliance
- Court orders and legal requests
- Child protection safeguarding

## 4. Your Data Subject Rights

Under UK GDPR, you have the following rights:

### 4.1 Right of Access (Article 15)
- Request copies of your personal data
- Understand how your data is processed
- Receive information about data recipients
- Response time: Within 1 month

**How to exercise:** Email dpo@nhsprep.com with subject "Data Access Request"

### 4.2 Right to Rectification (Article 16)
- Correct inaccurate personal data
- Complete incomplete personal data
- Update outdated information
- Response time: Within 1 month

**How to exercise:** Update via account settings or contact support

### 4.3 Right to Erasure (Article 17)
- Request deletion of personal data
- Applies when data no longer necessary
- When consent is withdrawn
- Response time: Within 1 month

**How to exercise:** Email dpo@nhsprep.com with subject "Data Deletion Request"

### 4.4 Right to Restrict Processing (Article 18)
- Limit how we process your data
- During accuracy disputes
- When processing is unlawful
- Response time: Within 1 month

**How to exercise:** Email dpo@nhsprep.com with subject "Processing Restriction"

### 4.5 Right to Data Portability (Article 20)
- Receive data in structured, machine-readable format
- Transfer data to another controller
- Applies to automated processing based on consent
- Response time: Within 1 month

**How to exercise:** Email dpo@nhsprep.com with subject "Data Portability Request"

### 4.6 Right to Object (Article 21)
- Object to processing based on legitimate interests
- Object to direct marketing (absolute right)
- Object to automated decision-making
- Response time: Within 1 month

**How to exercise:** Email dpo@nhsprep.com or use unsubscribe links

## 5. Data Processing Activities

### 5.1 Educational Data Processing
**Purpose:** Providing personalized medical education  
**Legal Basis:** Contract and Legitimate Interest  
**Data Categories:** Study progress, performance, learning preferences  
**Retention:** 7 years after course completion  
**Recipients:** AI analysis systems, mentors (limited data)

### 5.2 Communication Processing
**Purpose:** Platform updates and support  
**Legal Basis:** Contract and Consent  
**Data Categories:** Contact details, communication history  
**Retention:** 3 years after last contact  
**Recipients:** Customer support team, email service providers

### 5.3 Analytics Processing
**Purpose:** Platform improvement and optimization  
**Legal Basis:** Legitimate Interest  
**Data Categories:** Usage patterns, anonymized behavioral data  
**Retention:** 2 years, then anonymized  
**Recipients:** Analytics service providers, development team

## 6. Automated Decision-Making and Profiling

### 6.1 AI-Powered Features
We use automated processing for:
- Personalized learning recommendations
- Study plan optimization
- Performance analysis and feedback
- Mentor matching algorithms

### 6.2 Your Rights
- Right to human intervention in automated decisions
- Right to contest automated decisions
- Right to receive explanation of logic involved
- Right to opt-out where legally permissible

### 6.3 Safeguards
- Regular algorithm auditing for bias
- Human oversight of significant decisions
- Transparency in automated processing
- Appeal mechanisms for contested decisions

## 7. International Data Transfers

### 7.1 Transfer Safeguards
When transferring data outside the UK, we ensure:
- UK adequacy decisions for safe countries
- Standard Contractual Clauses (SCCs)
- Binding Corporate Rules for group companies
- Certification schemes where appropriate

### 7.2 Third Country Transfers
Current transfers to:
- **European Union:** Based on UK adequacy decision
- **United States:** SCCs with Privacy Shield certified companies
- **Other Countries:** Only with explicit consent or legal requirement

## 8. Data Breach Procedures

### 8.1 Breach Detection
- 24/7 security monitoring
- Staff training on breach identification
- Automated breach detection systems
- Regular security assessments

### 8.2 Breach Response
- Contain and assess breach within 24 hours
- Report to ICO within 72 hours if required
- Notify affected individuals without undue delay
- Document all breaches and response actions

### 8.3 Breach Notification Criteria
We notify you of breaches that:
- Pose high risk to your rights and freedoms
- Involve sensitive personal data
- Could result in identity theft or fraud
- Affect large numbers of individuals

## 9. Data Protection by Design and Default

### 9.1 Technical Measures
- Pseudonymization and encryption
- Regular security testing and updates
- Access controls and authentication
- Secure development practices

### 9.2 Organizational Measures
- Data protection impact assessments
- Staff training and awareness programs
- Privacy policies and procedures
- Regular compliance audits

### 9.3 Default Privacy Settings
- Minimal data collection by default
- Opt-in consent for non-essential features
- Granular privacy controls
- Regular consent renewal

## 10. Children's Data Protection

### 10.1 Age Verification
- Minimum age requirement: 18 years
- Age verification during registration
- Parental consent for users under 18
- Enhanced protections for vulnerable users

### 10.2 Special Safeguards
- Additional consent requirements
- Limited data processing purposes
- Enhanced security measures
- Regular review of processing necessity

## 11. Complaints and Enforcement

### 11.1 Internal Complaints
**Step 1:** Contact our Data Protection Officer  
Email: dpo@nhsprep.com  
Phone: +44 20 1234 5678  
Expected response: Within 5 working days

### 11.2 Supervisory Authority
**Information Commissioner's Office (ICO)**  
Website: ico.org.uk  
Phone: 0303 123 1113  
Post: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF

### 11.3 Legal Remedies
- Right to compensation for damages
- Access to judicial remedies
- Legal representation options
- Alternative dispute resolution

## 12. Regular Reviews and Updates

### 12.1 Compliance Monitoring
- Monthly data protection reviews
- Quarterly compliance assessments
- Annual third-party audits
- Continuous staff training

### 12.2 Policy Updates
- Regular review of policies and procedures
- Updates following legal changes
- Stakeholder consultation on major changes
- Clear communication of updates to users

## 13. Contact Information

**Data Protection Officer**  
Email: dpo@nhsprep.com  
Phone: +44 20 1234 5678  
Post: DPO, NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

**General Data Protection Inquiries**  
Email: privacy@nhsprep.com  
Response time: Within 5 working days

This GDPR Compliance Statement is reviewed annually and updated as necessary to ensure continued compliance with applicable data protection laws.
      `
    },
    "cookie-policy": {
      title: "Cookie Policy",
      content: `
# Cookie Policy

**Last Updated:** June 5, 2025

## 1. Introduction

This Cookie Policy explains how NHSprep Ltd ("we," "our," or "us") uses cookies and similar tracking technologies on our website and platform. By using our services, you consent to the use of cookies as described in this policy.

## 2. What Are Cookies?

Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve your browsing experience, and provide analytics about website usage.

### 2.1 Types of Cookies We Use

**Session Cookies:** Temporary cookies that expire when you close your browser  
**Persistent Cookies:** Cookies that remain on your device until they expire or are deleted  
**First-Party Cookies:** Cookies set by our website  
**Third-Party Cookies:** Cookies set by external services we use

## 3. How We Use Cookies

### 3.1 Essential Cookies
These cookies are necessary for the website to function and cannot be switched off.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| auth_token | User authentication | Session | Essential |
| csrf_token | Security protection | Session | Essential |
| session_id | Session management | Session | Essential |
| language_pref | Language selection | 1 year | Essential |

### 3.2 Performance Cookies
These cookies collect information about how you use our website to help us improve it.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| analytics_id | Website analytics | 2 years | Performance |
| page_views | Page view tracking | 1 year | Performance |
| user_journey | User behavior analysis | 30 days | Performance |
| performance_monitor | Site performance tracking | 1 day | Performance |

### 3.3 Functional Cookies
These cookies enable enhanced functionality and personalization.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| study_preferences | Learning preferences | 1 year | Functional |
| theme_selection | Dark/light mode | 1 year | Functional |
| font_size | Accessibility settings | 1 year | Functional |
| notification_prefs | Notification preferences | 6 months | Functional |

### 3.4 Marketing Cookies
These cookies track your activity to help us show relevant advertisements.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| marketing_id | Advertisement targeting | 90 days | Marketing |
| campaign_source | Marketing campaign tracking | 30 days | Marketing |
| conversion_tracking | Conversion measurement | 90 days | Marketing |

## 4. Third-Party Cookies

We use cookies from trusted third-party services:

### 4.1 Analytics Services
**Google Analytics**
- Purpose: Website traffic and user behavior analysis
- Duration: Up to 2 years
- Privacy Policy: https://policies.google.com/privacy

**Hotjar**
- Purpose: User experience and heatmap analysis
- Duration: Up to 1 year
- Privacy Policy: https://www.hotjar.com/legal/policies/privacy

### 4.2 Educational Services
**Video Platform Integration**
- Purpose: Video OSCE functionality
- Duration: Session
- Data processed: Video preferences, playback history

**AI Analysis Services**
- Purpose: Performance feedback and recommendations
- Duration: 1 year
- Data processed: Learning patterns, anonymized performance data

### 4.3 Communication Services
**Customer Support Chat**
- Purpose: Live chat functionality
- Duration: 30 days
- Data processed: Chat history, support preferences

**Email Marketing Platform**
- Purpose: Newsletter and educational content delivery
- Duration: Until unsubscribed
- Data processed: Email engagement, preferences

## 5. Cookie Consent Management

### 5.1 Consent Options
When you first visit our website, you can choose:
- **Accept All Cookies:** Allow all cookie categories
- **Reject Non-Essential:** Only essential cookies
- **Customize Settings:** Choose specific cookie categories
- **Learn More:** Access detailed cookie information

### 5.2 Managing Your Preferences
You can update your cookie preferences at any time:
- Visit our Cookie Preference Center
- Access settings through your account dashboard
- Use browser settings to block or delete cookies
- Opt-out through third-party websites

### 5.3 Withdrawal of Consent
You can withdraw cookie consent at any time:
- Update preferences in the Cookie Preference Center
- Clear cookies through browser settings
- Contact us at privacy@nhsprep.com
- Note: Withdrawing consent may affect website functionality

## 6. Browser Cookie Controls

### 6.1 Managing Cookies in Your Browser

**Google Chrome:**
1. Settings → Privacy and Security → Cookies and other site data
2. Choose your preferred cookie settings
3. Manage exceptions for specific sites

**Mozilla Firefox:**
1. Settings → Privacy & Security → Cookies and Site Data
2. Choose standard, strict, or custom protection
3. Manage permissions for individual sites

**Safari:**
1. Preferences → Privacy → Manage Website Data
2. Choose cookie acceptance settings
3. Prevent cross-site tracking option

**Microsoft Edge:**
1. Settings → Site permissions → Cookies and site data
2. Choose cookie behavior
3. Manage site-specific permissions

### 6.2 Mobile Device Settings

**iOS:**
Settings → Safari → Privacy & Security → Block All Cookies

**Android:**
Browser Settings → Site Settings → Cookies

## 7. Impact of Disabling Cookies

### 7.1 Essential Cookies
Disabling essential cookies will:
- Prevent login to your account
- Disable security features
- Affect basic website functionality
- Require re-entry of preferences each visit

### 7.2 Performance Cookies
Disabling performance cookies will:
- Reduce our ability to improve the website
- Limit personalized recommendations
- Affect loading speed optimization
- Impact error reporting capabilities

### 7.3 Functional Cookies
Disabling functional cookies will:
- Reset customization settings each visit
- Disable accessibility features
- Remove language preferences
- Affect notification settings

### 7.4 Marketing Cookies
Disabling marketing cookies will:
- Show generic instead of targeted advertisements
- Prevent campaign effectiveness measurement
- Limit personalized content recommendations
- Affect remarketing capabilities

## 8. Local Storage and Similar Technologies

### 8.1 Web Storage
We use browser storage technologies including:
- **Local Storage:** For offline functionality and preferences
- **Session Storage:** For temporary data during your session
- **IndexedDB:** For complex educational content storage

### 8.2 Pixels and Beacons
We use tracking pixels for:
- Email open rates and engagement
- Website conversion tracking
- Social media integration
- Advertisement effectiveness measurement

### 8.3 Fingerprinting
We do not use device fingerprinting techniques for tracking purposes.

## 9. Cookie Security

### 9.1 Security Measures
- Secure cookie transmission (HTTPS only)
- HttpOnly flags prevent JavaScript access
- SameSite attributes prevent cross-site attacks
- Regular security audits and updates

### 9.2 Data Protection
- Encryption of sensitive cookie data
- Regular expiration of stored data
- Minimal data collection principle
- Compliance with data protection laws

## 10. Updates to This Policy

### 10.1 Policy Changes
We may update this Cookie Policy to reflect:
- Changes in cookie usage
- New third-party services
- Legal or regulatory requirements
- Improvements to user experience

### 10.2 Notification of Changes
We will notify you of material changes through:
- Email notification to registered users
- Website banner announcements
- Updated "Last Modified" date
- Cookie consent prompt updates

## 11. Children's Privacy

### 11.1 Age Restrictions
Our services are not intended for children under 18. We:
- Do not knowingly collect data from children
- Require parental consent for users under 18
- Implement enhanced protections for young users
- Regularly review age verification processes

## 12. International Users

### 12.1 Cross-Border Transfers
Cookie data may be transferred internationally:
- Within our corporate group
- To third-party service providers
- Subject to appropriate safeguards
- With your consent where required

### 12.2 Regional Compliance
We comply with applicable laws in:
- United Kingdom (UK GDPR)
- European Union (EU GDPR)
- California (CCPA/CPRA)
- Other jurisdictions where we operate

## 13. Contact Information

### 13.1 Cookie-Related Inquiries
**Email:** cookies@nhsprep.com  
**Phone:** +44 20 1234 5678  
**Address:** NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

### 13.2 Data Protection Officer
**Email:** dpo@nhsprep.com  
**Response Time:** Within 5 working days

### 13.3 Cookie Preference Center
Access our Cookie Preference Center at: https://nhsprep.com/cookie-preferences

This Cookie Policy is part of our comprehensive privacy framework and should be read alongside our Privacy Policy and Terms of Service.
      `
    },
    "data-processing": {
      title: "Data Processing Agreement",
      content: `
# Data Processing Agreement

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Introduction and Scope

This Data Processing Agreement ("DPA") forms part of our Terms of Service and Privacy Policy. It describes how NHSprep Ltd processes personal data in compliance with UK GDPR and applicable data protection laws.

## 2. Definitions

**Controller:** NHSprep Ltd, determining the purposes and means of processing  
**Data Subject:** Individual users of the NHSprep platform  
**Personal Data:** Any information relating to an identified or identifiable person  
**Processing:** Any operation performed on personal data  
**Special Category Data:** Sensitive personal data requiring enhanced protection  

## 3. Categories of Data Subjects

We process personal data for the following categories of data subjects:

### 3.1 Platform Users
- Medical students and graduates
- Healthcare professionals
- PLAB exam candidates
- Continuing education participants

### 3.2 Service Users
- Mentor network members
- Community forum participants
- Customer support contacts
- Website visitors

## 4. Categories of Personal Data

### 4.1 Identification Data
- Full name and preferred name
- Email address and phone number
- Date of birth and nationality
- Professional registration numbers
- Account usernames and identifiers

### 4.2 Educational Data
- Medical qualifications and certifications
- University and training details
- PLAB exam history and scores
- Study progress and performance metrics
- Learning preferences and goals

### 4.3 Technical Data
- IP addresses and device identifiers
- Browser and operating system information
- Usage analytics and interaction data
- Platform activity logs and timestamps

### 4.4 Communication Data
- Community forum posts and comments
- Direct messages and chat history
- Customer support communications
- Feedback and survey responses

### 4.5 Audiovisual Data
- Profile photographs and avatars
- OSCE practice video recordings
- Mentor session recordings
- Presentation and screen recordings

### 4.6 Financial Data
- Payment card information (tokenized)
- Billing addresses and contact details
- Transaction history and invoices
- Subscription and renewal information

## 5. Special Category Data Processing

### 5.1 Health Data
We may process health-related information including:
- Medical conditions affecting learning
- Disability accommodations required
- Mental health and wellbeing data
- Medical fitness declarations

### 5.2 Legal Basis for Special Category Processing
- **Explicit Consent:** For optional health-related features
- **Employment/Social Security:** For professional development
- **Public Interest:** For medical education and training
- **Vital Interests:** For safeguarding and emergency situations

### 5.3 Additional Safeguards
- Enhanced encryption for health data
- Strict access controls and logging
- Regular review of processing necessity
- Specialized staff training requirements

## 6. Purposes of Processing

### 6.1 Educational Service Delivery
- Account creation and management
- Personalized learning experiences
- Progress tracking and analytics
- AI-powered feedback and recommendations
- Mentor matching and session facilitation

### 6.2 Platform Operations
- Customer support and assistance
- Technical maintenance and improvements
- Security monitoring and fraud prevention
- Quality assurance and testing

### 6.3 Business Administration
- Payment processing and billing
- Legal compliance and reporting
- Business intelligence and planning
- Marketing and communication

### 6.4 Research and Development
- Educational effectiveness studies
- Platform usage analysis
- AI model training and improvement
- Academic research collaboration

## 7. Legal Basis for Processing

### 7.1 Contract Performance (Article 6(1)(b))
- Providing educational services
- Account management and support
- Payment processing
- Service delivery and maintenance

### 7.2 Legitimate Interest (Article 6(1)(f))
- Platform security and fraud prevention
- Business intelligence and analytics
- Direct marketing to existing customers
- Research and development activities

### 7.3 Consent (Article 6(1)(a))
- Marketing communications to prospects
- Optional platform features
- Research participation
- Data sharing with third parties

### 7.4 Legal Obligation (Article 6(1)(c))
- Tax and accounting requirements
- Regulatory compliance reporting
- Law enforcement cooperation
- Professional body requirements

## 8. Data Retention Periods

### 8.1 Active Account Data
**Retention Period:** Duration of active subscription plus 12 months  
**Purpose:** Service delivery and support  
**Review:** Annual assessment of continued necessity

### 8.2 Educational Records
**Retention Period:** 7 years after course completion  
**Purpose:** Academic credentials and professional development  
**Legal Requirement:** Professional body and regulatory compliance

### 8.3 Financial Records
**Retention Period:** 7 years from transaction date  
**Purpose:** Accounting, tax, and audit requirements  
**Legal Requirement:** UK tax and company law obligations

### 8.4 Communication Records
**Retention Period:** 3 years from last communication  
**Purpose:** Customer support and service improvement  
**Review:** Regular assessment of ongoing relevance

### 8.5 Marketing Data
**Retention Period:** Until consent withdrawn or 3 years of inactivity  
**Purpose:** Marketing communications and customer engagement  
**Review:** Annual consent renewal and engagement assessment

### 8.6 Anonymized Analytics
**Retention Period:** Indefinite (anonymized data)  
**Purpose:** Research, development, and business intelligence  
**Safeguards:** Data anonymization and aggregation techniques

## 9. Data Subject Rights Implementation

### 9.1 Right of Access (Article 15)
**Response Time:** Within 1 month of verified request  
**Information Provided:**
- Copy of personal data being processed
- Purposes and legal basis of processing
- Recipients or categories of recipients
- Retention periods and data sources
- Existence of automated decision-making

**Process:**
1. Identity verification using account credentials
2. Data compilation from all relevant systems
3. Format selection (PDF, CSV, or structured data)
4. Secure delivery via account portal or encrypted email

### 9.2 Right to Rectification (Article 16)
**Response Time:** Within 1 month of request  
**Scope:** Inaccurate or incomplete personal data  
**Process:**
1. Verification of correction request
2. Assessment of impact on dependent systems
3. Update across all relevant databases
4. Notification to relevant third parties if required

### 9.3 Right to Erasure (Article 17)
**Response Time:** Within 1 month of request  
**Applicable When:**
- Data no longer necessary for original purpose
- Consent withdrawn and no other legal basis
- Data processed unlawfully
- Legal obligation requires erasure

**Exceptions:**
- Legal compliance requirements
- Public interest or scientific research
- Exercise or defense of legal claims
- Academic or historical research purposes

### 9.4 Right to Restrict Processing (Article 18)
**Response Time:** Within 1 month of request  
**Applicable When:**
- Accuracy is contested
- Processing is unlawful but erasure refused
- Data needed for legal claims
- Objection to processing pending verification

**Implementation:**
- Data flagging in processing systems
- Access restriction to authorized personnel only
- Continued storage but no active processing
- Notification before restriction is lifted

### 9.5 Right to Data Portability (Article 20)
**Response Time:** Within 1 month of request  
**Scope:** Data provided to us, processed by automated means  
**Format Options:**
- JSON structured data
- CSV spreadsheet format
- XML machine-readable format
- Direct transfer to another controller (where possible)

### 9.6 Right to Object (Article 21)
**Response Time:** Immediate for direct marketing, 1 month for other objections  
**Direct Marketing:** Absolute right to object  
**Other Processing:** Must demonstrate compelling legitimate grounds  
**Implementation:**
- Immediate cessation of objected processing
- System flags to prevent future processing
- Assessment of legitimate grounds where applicable

## 10. International Data Transfers

### 10.1 Transfer Mechanisms
**Adequacy Decisions:** European Union and other adequate countries  
**Standard Contractual Clauses:** Non-adequate countries with appropriate safeguards  
**Binding Corporate Rules:** Intra-group transfers  
**Consent:** Specific, informed consent for particular transfers

### 10.2 Current Transfer Destinations
**European Union Countries:**
- Cloud hosting services in Ireland and Germany
- Analytics services in Netherlands
- Customer support services in France

**United States:**
- Video conferencing services (Privacy Shield certified)
- Payment processing (adequate contractual safeguards)
- Cloud storage (Standard Contractual Clauses)

**Other Countries:**
- No regular transfers; any ad-hoc transfers subject to explicit consent

### 10.3 Transfer Safeguards
- Due diligence on recipient data protection laws
- Contractual obligations for data protection
- Technical and organizational measures
- Regular monitoring and compliance audits

## 11. Security Measures

### 11.1 Technical Safeguards
**Encryption:**
- AES-256 encryption for data at rest
- TLS 1.3 for data in transit
- End-to-end encryption for sensitive communications
- Database-level encryption with key management

**Access Controls:**
- Multi-factor authentication for all accounts
- Role-based access control (RBAC)
- Principle of least privilege
- Regular access reviews and deprovisioning

**Network Security:**
- Firewall protection and intrusion detection
- VPN requirements for remote access
- Network segmentation and isolation
- DDoS protection and monitoring

### 11.2 Organizational Safeguards
**Staff Training:**
- Annual data protection training for all staff
- Specialized training for data processors
- Incident response training and simulations
- Regular updates on legal and regulatory changes

**Policies and Procedures:**
- Comprehensive data protection policies
- Incident response and breach notification procedures
- Data retention and disposal procedures
- Vendor management and due diligence processes

**Audit and Monitoring:**
- Regular security audits and penetration testing
- Continuous monitoring of data access and usage
- Compliance assessments and gap analyses
- Third-party security certifications

### 11.3 Data Breach Response

**Detection and Assessment (0-24 hours):**
- Immediate containment of the breach
- Assessment of scope and severity
- Initial risk assessment for data subjects
- Internal incident team activation

**Notification (24-72 hours):**
- Regulatory notification to ICO if required
- Communication to affected data subjects
- Internal stakeholder notification
- Documentation of response actions

**Investigation and Remediation (Ongoing):**
- Forensic investigation of root causes
- Implementation of corrective measures
- Monitoring for ongoing threats
- Post-incident review and process improvement

## 12. Data Processing Records

### 12.1 Processing Activity Records
We maintain comprehensive records including:
- Purposes and legal basis of processing
- Categories of data subjects and personal data
- Recipients and international transfers
- Retention periods and security measures
- Data Protection Impact Assessments (DPIAs)

### 12.2 DPIA Requirements
We conduct DPIAs for:
- New data processing activities
- Significant changes to existing processing
- High-risk processing operations
- Use of new technologies
- Large-scale special category data processing

### 12.3 Record Availability
Processing records are available to:
- Data subjects (relevant portions)
- Supervisory authorities (ICO)
- Internal audit and compliance teams
- External auditors and assessors

## 13. Third-Party Processors

### 13.1 Processor Categories
**Cloud Service Providers:**
- Infrastructure hosting and management
- Data backup and disaster recovery
- Platform and software services
- Monitoring and analytics tools

**Educational Service Providers:**
- Video conferencing platforms
- Learning management systems
- Assessment and testing tools
- Content delivery networks

**Business Service Providers:**
- Payment processing services
- Customer relationship management
- Marketing and communication tools
- Professional services (legal, audit)

### 13.2 Processor Requirements
All third-party processors must:
- Provide sufficient guarantees of technical and organizational measures
- Process personal data only on documented instructions
- Ensure confidentiality of processing
- Implement appropriate security measures
- Assist with data subject rights and regulatory compliance
- Delete or return data at end of processing relationship

### 13.3 Processor Oversight
We maintain oversight through:
- Due diligence before engagement
- Contractual obligations and service level agreements
- Regular performance monitoring and audits
- Incident reporting and breach notification requirements
- Annual compliance assessments

## 14. Compliance Monitoring

### 14.1 Internal Monitoring
**Monthly Reviews:**
- Data processing activity assessment
- Security incident analysis
- Access control reviews
- Policy compliance checks

**Quarterly Assessments:**
- Risk assessment updates
- Third-party processor evaluations
- Training effectiveness reviews
- Breach response testing

**Annual Audits:**
- Comprehensive compliance audit
- External security assessment
- Legal and regulatory update review
- Policy and procedure updates

### 14.2 External Compliance
**Regulatory Compliance:**
- ICO registration maintenance
- Annual transparency reports
- Regulatory inquiry responses
- Industry standard certifications

**Third-Party Assessments:**
- Independent security audits
- Compliance framework assessments
- Customer audit support
- Industry peer reviews

## 15. Contact Information

### 15.1 Data Protection Officer
**Name:** Dr. Sarah Thompson  
**Email:** dpo@nhsprep.com  
**Phone:** +44 20 1234 5678  
**Address:** NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

### 15.2 Legal and Compliance Team
**Email:** legal@nhsprep.com  
**Phone:** +44 20 1234 5679  
**Response Time:** Within 2 working days for urgent matters

### 15.3 Data Subject Rights
**Email:** privacy@nhsprep.com  
**Online Portal:** https://nhsprep.com/privacy-portal  
**Response Time:** Within 1 month of verified request

This Data Processing Agreement is reviewed annually and updated as necessary to ensure continued compliance with applicable data protection laws and regulations.
      `
    },
    "user-rights": {
      title: "User Rights & Responsibilities",
      content: `
# User Rights & Responsibilities

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Introduction

This document outlines your rights as a user of the NHSprep platform and your responsibilities while using our educational services. These rights and responsibilities work together to create a safe, effective, and professional learning environment for all users.

## 2. Your Rights as a User

### 2.1 Educational Rights

**Right to Quality Education:**
- Access to accurate, up-to-date medical education content
- Evidence-based learning materials and assessments
- Regular content updates reflecting current medical practices
- Professional-standard educational delivery

**Right to Fair Assessment:**
- Transparent assessment criteria and marking schemes
- Consistent evaluation standards across all content
- Timely feedback on performance and progress
- Right to appeal assessment decisions

**Right to Accessibility:**
- Platform accessibility for users with disabilities
- Alternative formats for learning materials
- Assistive technology compatibility
- Reasonable adjustments for learning needs

**Right to Academic Integrity:**
- Original, plagiarism-free content
- Proper attribution of sources and references
- Protection against academic misconduct
- Fair use of intellectual property

### 2.2 Technical Rights

**Right to Platform Access:**
- Reliable access to subscribed services
- Minimum 99.5% uptime during service hours
- Technical support for platform issues
- Compensation for extended service disruptions

**Right to Data Security:**
- Secure storage and transmission of personal data
- Protection against unauthorized access
- Regular security updates and monitoring
- Prompt notification of security incidents

**Right to Technical Support:**
- Responsive customer support services
- Clear troubleshooting guidance and resources
- Escalation procedures for complex issues
- Regular platform updates and improvements

### 2.3 Privacy Rights

**Right to Data Control:**
- Control over personal data collection and use
- Transparent information about data processing
- Ability to update, correct, or delete personal data
- Opt-out options for non-essential data processing

**Right to Privacy Protection:**
- Protection of personal and educational records
- Confidential handling of sensitive information
- Secure communication channels
- Privacy-by-design platform features

### 2.4 Community Rights

**Right to Safe Learning Environment:**
- Protection from harassment, discrimination, and abuse
- Respectful interaction with other users
- Clear community guidelines and enforcement
- Reporting mechanisms for inappropriate behavior

**Right to Freedom of Expression:**
- Share educational opinions and experiences
- Participate in community discussions
- Provide constructive feedback
- Academic freedom within professional boundaries

### 2.5 Financial Rights

**Right to Transparent Pricing:**
- Clear pricing information before purchase
- No hidden fees or unexpected charges
- Advance notice of price changes
- Fair billing practices and dispute resolution

**Right to Refunds:**
- 14-day cooling-off period for new subscriptions
- Pro-rated refunds for service failures
- Clear refund policies and procedures
- Timely processing of approved refunds

## 3. Your Responsibilities as a User

### 3.1 Account Responsibilities

**Account Security:**
- Maintain confidentiality of login credentials
- Use strong passwords and enable two-factor authentication
- Promptly report suspected unauthorized access
- Regularly review account activity and settings

**Accurate Information:**
- Provide truthful and accurate registration information
- Keep profile information current and up-to-date
- Report changes in professional status or qualifications
- Verify contact information for important communications

**Single Account Policy:**
- Maintain only one personal account
- Do not share account credentials with others
- Use account only for personal educational purposes
- Report multiple or fraudulent accounts

### 3.2 Academic Integrity Responsibilities

**Honest Learning:**
- Complete assessments using your own knowledge and effort
- Do not share test questions or answers with others
- Report suspected academic misconduct
- Respect intellectual property rights of content creators

**Professional Conduct:**
- Maintain professional standards in all interactions
- Respect confidentiality of patient scenarios and cases
- Use platform resources for legitimate educational purposes
- Uphold medical professional ethics and standards

**Original Work:**
- Submit original responses to assessments
- Properly cite sources when referencing external materials
- Do not copy or plagiarize content from others
- Respect copyright and intellectual property laws

### 3.3 Community Responsibilities

**Respectful Communication:**
- Treat all users with respect and professionalism
- Use appropriate language in all communications
- Respect diverse backgrounds, cultures, and opinions
- Avoid discriminatory or offensive behavior

**Constructive Participation:**
- Contribute positively to community discussions
- Provide helpful and accurate information
- Support fellow learners in their educational journey
- Report inappropriate content or behavior

**Privacy Respect:**
- Respect the privacy of other users
- Do not share personal information without consent
- Maintain confidentiality of private communications
- Protect sensitive information shared in discussions

### 3.4 Platform Usage Responsibilities

**Appropriate Use:**
- Use platform features for their intended educational purposes
- Do not attempt to circumvent security measures
- Respect bandwidth and resource limitations
- Follow all technical usage guidelines

**Content Guidelines:**
- Do not upload inappropriate, offensive, or illegal content
- Respect copyright and intellectual property rights
- Ensure content is relevant to medical education
- Maintain professional standards in all uploads

**System Integrity:**
- Do not attempt to hack, manipulate, or damage the platform
- Report technical issues and security vulnerabilities
- Use automated tools only as permitted
- Respect API usage limits and restrictions

### 3.5 Legal and Regulatory Responsibilities

**Compliance with Laws:**
- Comply with all applicable local, national, and international laws
- Respect medical professional regulations and standards
- Follow data protection and privacy requirements
- Adhere to anti-discrimination and equality legislation

**Professional Standards:**
- Maintain standards expected of medical professionals
- Follow GMC Good Medical Practice guidelines
- Respect patient confidentiality principles
- Uphold medical ethics in all platform interactions

## 4. Enforcement and Consequences

### 4.1 Monitoring and Detection

**Automated Monitoring:**
- System monitoring for unusual account activity
- Automated detection of policy violations
- AI-powered content moderation
- Regular security scans and assessments

**Community Reporting:**
- User reporting mechanisms for violations
- Anonymous reporting options available
- Prompt investigation of reported issues
- Feedback to reporting users on outcomes

### 4.2 Progressive Enforcement

**Level 1 - Education and Warning:**
- Email notification of policy violation
- Educational resources about proper platform use
- Temporary restrictions on specific features
- Opportunity to correct behavior

**Level 2 - Temporary Restrictions:**
- Temporary suspension of account access
- Restriction from community features
- Limited access to certain content areas
- Required completion of educational modules

**Level 3 - Extended Suspension:**
- Extended account suspension (7-30 days)
- Loss of access to premium features
- Required review meeting with support team
- Conditional restoration of access

**Level 4 - Permanent Termination:**
- Permanent account termination
- Forfeiture of remaining subscription benefits
- Ban from creating new accounts
- Legal action for serious violations

### 4.3 Appeals Process

**Right to Appeal:**
- Right to appeal all enforcement actions
- Clear appeals process and timeline
- Independent review of enforcement decisions
- Opportunity to provide additional context

**Appeals Procedure:**
1. Submit appeal within 14 days of enforcement action
2. Provide detailed explanation and supporting evidence
3. Independent review by appeals committee
4. Decision communicated within 10 working days
5. Final decision is binding unless legal action pursued

## 5. Dispute Resolution

### 5.1 Internal Resolution

**Customer Support:**
- First point of contact for all disputes
- Trained staff to handle various issue types
- Escalation procedures for complex matters
- Target resolution time: 5 working days

**Management Review:**
- Escalation to management team for unresolved issues
- Senior staff involvement in significant disputes
- Authority to make exceptions and adjustments
- Target resolution time: 10 working days

### 5.2 Alternative Dispute Resolution

**Mediation Services:**
- Access to independent mediation services
- Qualified mediators specializing in educational disputes
- Cost-sharing arrangement for mediation fees
- Non-binding recommendations for resolution

**Arbitration:**
- Binding arbitration for contractual disputes
- Qualified arbitrators with relevant expertise
- Expedited process for timely resolution
- Awards enforceable under UK law

### 5.3 Legal Remedies

**Court Proceedings:**
- Right to pursue legal action in UK courts
- Small claims court for qualifying disputes
- Full legal proceedings for significant matters
- Legal costs as determined by court

**Regulatory Complaints:**
- Right to complain to relevant regulatory bodies
- ICO for data protection issues
- Trading Standards for consumer matters
- Professional bodies for educational standards

## 6. Platform Evolution and Changes

### 6.1 Service Improvements

**Continuous Development:**
- Regular platform updates and improvements
- New features based on user feedback
- Technology upgrades for better performance
- Content updates reflecting medical advances

**User Consultation:**
- User surveys and feedback collection
- Beta testing opportunities for new features
- Community input on platform development
- Regular user advisory board meetings

### 6.2 Policy Updates

**Regular Reviews:**
- Annual review of all policies and procedures
- Updates based on legal and regulatory changes
- Improvements based on user experience
- Industry best practice adoption

**Communication of Changes:**
- Advance notice of significant policy changes
- Clear explanation of impacts on users
- Opportunity for feedback during consultation periods
- Grace periods for adjustment to new requirements

## 7. Special Considerations

### 7.1 Vulnerable Users

**Additional Protections:**
- Enhanced safeguarding for users under 18
- Support for users with learning difficulties
- Accommodation for disability-related needs
- Mental health and wellbeing support resources

**Reporting Mechanisms:**
- Specialized reporting for vulnerable user concerns
- Trained staff for sensitive issue handling
- Confidential support and guidance services
- Referral to appropriate external support services

### 7.2 International Users

**Cross-Border Considerations:**
- Respect for local laws and cultural differences
- Time zone considerations for support services
- Currency and payment method accommodations
- Localized content where appropriate

**Legal Compliance:**
- Compliance with international data protection laws
- Respect for local professional standards
- Cross-border dispute resolution mechanisms
- Recognition of international qualifications

## 8. Resources and Support

### 8.1 Educational Resources

**User Guides:**
- Comprehensive platform user guides
- Video tutorials for key features
- Best practice guides for effective learning
- Troubleshooting and FAQ resources

**Training Materials:**
- Academic integrity training modules
- Community guidelines workshops
- Technical skills development resources
- Professional development opportunities

### 8.2 Support Services

**24/7 Technical Support:**
- Round-the-clock technical assistance
- Multiple contact channels (email, chat, phone)
- Priority support for premium subscribers
- Escalation procedures for urgent issues

**Educational Support:**
- Learning advisors for study planning
- Mentor matching and guidance services
- Academic skills development support
- Career guidance and planning assistance

## 9. Contact Information

### 9.1 Rights and Responsibilities Inquiries
**Email:** rights@nhsprep.com  
**Phone:** +44 20 1234 5680  
**Response Time:** Within 3 working days

### 9.2 Appeals and Disputes
**Email:** appeals@nhsprep.com  
**Phone:** +44 20 1234 5681  
**Response Time:** Within 5 working days

### 9.3 General Support
**Email:** support@nhsprep.com  
**Phone:** +44 20 1234 5678  
**Live Chat:** Available 24/7 on platform

### 9.4 Legal Department
**Email:** legal@nhsprep.com  
**Address:** NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

This User Rights & Responsibilities document is reviewed annually and updated to ensure continued fairness, clarity, and legal compliance. Your use of the platform constitutes acceptance of these rights and responsibilities.
      `
    },
    "disclaimer": {
      title: "Medical Disclaimer",
      content: `
# Medical Disclaimer

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Important Notice

**READ THIS DISCLAIMER CAREFULLY BEFORE USING THE NHSPREP PLATFORM**

The information, content, and services provided on the NHSprep platform are for educational and informational purposes only. This disclaimer explains the limitations of our educational content and your responsibilities when using our platform.

## 2. Educational Purpose Only

### 2.1 Learning Platform
NHSprep is designed as an educational platform to support medical professionals and students in their learning journey. All content is provided for:
- Medical education and training purposes
- Professional development and continuing education
- PLAB examination preparation
- NHS cultural awareness training

### 2.2 Not Medical Advice
**THE CONTENT ON THIS PLATFORM DOES NOT CONSTITUTE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT RECOMMENDATIONS.**

- Platform content is educational material, not clinical guidance
- Information should not be used for patient care decisions
- Always consult current clinical guidelines and protocols
- Seek appropriate professional medical advice for patient care

### 2.3 Simulated Scenarios
- Patient cases and scenarios are educational simulations
- Based on common presentations but may not reflect real patients
- Designed for learning purposes, not clinical decision-making
- May include simplified or idealized presentations

## 3. Professional Responsibility

### 3.1 Clinical Practice
**You remain fully responsible for:**
- All clinical decisions and patient care
- Ensuring competence before treating patients
- Following current evidence-based guidelines
- Maintaining professional registration and compliance

### 3.2 Scope of Practice
- Practice only within your scope of competence
- Recognize limitations of knowledge and skills
- Seek supervision and support when appropriate
- Maintain awareness of local protocols and procedures

### 3.3 Continuing Professional Development
- Platform content supplements but does not replace formal training
- Regular update of knowledge through multiple sources required
- Attendance at formal courses and training programs recommended
- Maintenance of professional registration and revalidation

## 4. Content Limitations

### 4.1 Currency and Accuracy
**While we strive for accuracy, please note:**
- Medical knowledge and guidelines evolve continuously
- Content may not reflect the most current practices
- Local guidelines may differ from platform content
- Always verify information with current authoritative sources

### 4.2 Completeness
- Content provides educational overviews, not comprehensive coverage
- Additional learning and research may be required
- Platform content does not replace textbooks or formal courses
- Gaps in knowledge should be addressed through multiple sources

### 4.3 Jurisdictional Differences
- Content primarily focused on UK NHS practice
- Guidelines and protocols may vary by country or region
- Local laws, regulations, and standards take precedence
- Adaptation required for different healthcare systems

## 5. Examination Preparation

### 5.1 PLAB Examination Disclaimer
**Important Notice Regarding PLAB Preparation:**
- Platform content is designed to support PLAB preparation
- Does not guarantee passing PLAB 1 or PLAB 2 examinations
- Official PLAB content and criteria are determined by the GMC
- Success depends on individual effort, knowledge, and preparation

### 5.2 Assessment and Feedback
- Platform assessments are practice tools, not official examinations
- Scores and feedback are estimates, not predictions of exam performance
- AI-generated feedback is educational guidance, not definitive assessment
- Professional judgment and clinical experience remain paramount

### 5.3 GMC Requirements
- Always refer to official GMC guidance for PLAB requirements
- Ensure compliance with current registration procedures
- Verify eligibility criteria independently
- Seek official guidance for specific circumstances

## 6. Technology and AI Limitations

### 6.1 AI-Generated Content
**Important limitations of AI features:**
- AI analysis and feedback are educational tools only
- May contain errors or biases in assessment
- Human judgment and expertise remain essential
- Technology cannot replace clinical reasoning and experience

### 6.2 Video Analysis
- Video OSCE analysis provides educational feedback only
- Cannot replace formal clinical assessment
- Limited by technology capabilities and algorithms
- Professional observation and feedback remain superior

### 6.3 Platform Reliability
- Technical issues may affect content accessibility
- Platform performance may vary due to technical factors
- Backup study methods should always be available
- Critical decisions should not depend solely on platform access

## 7. User Responsibilities

### 7.1 Professional Judgment
**You are responsible for:**
- Exercising independent professional judgment
- Verifying information from authoritative sources
- Applying knowledge appropriately to specific contexts
- Recognizing limitations of educational content

### 7.2 Continuous Learning
- Seeking multiple sources of educational content
- Staying current with medical advances and guidelines
- Participating in formal continuing education programs
- Maintaining professional competence and registration

### 7.3 Patient Safety
- Prioritizing patient safety in all clinical decisions
- Never compromising patient care based on platform content
- Seeking appropriate supervision and support
- Following established clinical protocols and guidelines

## 8. Specific Subject Area Disclaimers

### 8.1 Clinical Medicine
- Content reflects general principles, not specific patient care
- Individual patient factors must always be considered
- Local protocols and guidelines take precedence
- Clinical correlation and professional judgment essential

### 8.2 Pharmacology and Therapeutics
- Drug information may not reflect current formulations or guidelines
- Always consult current prescribing information
- Consider individual patient factors and contraindications
- Local formularies and guidelines take precedence

### 8.3 Emergency Medicine
- Emergency protocols may vary by location and institution
- Always follow local emergency procedures
- Platform content cannot replace emergency training
- Seek immediate expert help in real emergency situations

### 8.4 Mental Health
- Mental health content is educational only
- Cannot replace professional psychiatric assessment
- Serious mental health concerns require immediate professional attention
- Platform content not suitable for crisis intervention

## 9. Third-Party Content

### 9.1 External Sources
- Platform may include content from third-party sources
- We do not endorse or guarantee accuracy of external content
- Users should verify information independently
- Third-party content subject to separate terms and conditions

### 9.2 Linked Resources
- External links provided for educational convenience only
- We are not responsible for content of linked websites
- External sites may have different privacy and security practices
- Users access external links at their own risk

## 10. Limitation of Liability

### 10.1 Educational Context
**NHSPREP LTD SHALL NOT BE LIABLE FOR:**
- Clinical decisions based on platform content
- Examination outcomes or career consequences
- Damages arising from use of educational content
- Errors or omissions in educational materials

### 10.2 Maximum Liability
- Our liability is limited to the amount paid for services
- We are not liable for indirect or consequential damages
- This limitation applies to the fullest extent permitted by law
- Professional indemnity insurance remains user's responsibility

## 11. Regulatory and Professional Bodies

### 11.1 GMC Compliance
- Users must comply with GMC Good Medical Practice guidelines
- Platform use does not guarantee GMC registration or compliance
- Professional obligations and standards remain unchanged
- GMC guidance takes precedence over platform content

### 11.2 Other Professional Bodies
- Compliance with relevant professional body requirements essential
- Platform content does not replace professional guidance
- Local and international standards may vary
- Professional registration and maintenance remain user responsibility

## 12. Emergency Situations

### 12.1 Medical Emergencies
**IN CASE OF MEDICAL EMERGENCY:**
- Call emergency services immediately (999 in UK)
- Do not rely on platform content for emergency care
- Seek immediate professional medical assistance
- Platform content is not suitable for emergency decision-making

### 12.2 Mental Health Crisis
**FOR MENTAL HEALTH EMERGENCIES:**
- Contact emergency services or crisis helplines immediately
- Samaritans: 116 123 (free, 24/7)
- NHS 111 for urgent but non-emergency care
- Platform content cannot replace crisis intervention

## 13. Updates and Changes

### 13.1 Content Updates
- Medical knowledge evolves continuously
- Platform content updated regularly but may lag current practice
- Users responsible for staying current with latest guidelines
- Notification of significant content changes provided when possible

### 13.2 Disclaimer Changes
- This disclaimer may be updated to reflect changes in practice or law
- Material changes will be communicated to users
- Continued use constitutes acceptance of updated disclaimer
- Users should review disclaimer regularly

## 14. Acknowledgment and Acceptance

### 14.1 User Acknowledgment
By using the NHSprep platform, you acknowledge that:
- You have read and understood this medical disclaimer
- You accept the limitations and responsibilities described
- You will use the platform appropriately for educational purposes only
- You understand that platform content does not constitute medical advice

### 14.2 Professional Standards
You confirm that:
- You will maintain appropriate professional standards
- You will not compromise patient care based on platform content
- You will seek appropriate professional guidance when needed
- You accept full responsibility for your professional practice

## 15. Contact Information

### 15.1 Disclaimer Inquiries
**Email:** disclaimer@nhsprep.com  
**Phone:** +44 20 1234 5682  
**Response Time:** Within 5 working days

### 15.2 Educational Content Concerns
**Email:** content@nhsprep.com  
**Phone:** +44 20 1234 5683  
**Response Time:** Within 3 working days

### 15.3 Professional Standards
**Email:** professional@nhsprep.com  
**Address:** NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

### 15.4 Emergency Contact
**For urgent platform safety concerns:**  
**Email:** safety@nhsprep.com  
**Phone:** +44 20 1234 5684 (24/7)

## 16. Important Reminders

### 16.1 Key Points to Remember
- **EDUCATION ONLY:** All content is for educational purposes
- **NOT MEDICAL ADVICE:** Never use for patient care decisions
- **PROFESSIONAL RESPONSIBILITY:** You remain fully responsible for clinical practice
- **VERIFY INFORMATION:** Always check with authoritative current sources
- **SEEK GUIDANCE:** Get professional support when needed

### 16.2 When in Doubt
- Consult current clinical guidelines
- Seek advice from experienced colleagues
- Contact professional regulatory bodies
- Prioritize patient safety above all else

**This disclaimer is an essential part of your agreement to use the NHSprep platform. Please ensure you understand and accept these terms before proceeding with platform use.**

---

**Document Reference:** MED-DISC-2025-001  
**Review Date:** June 5, 2026  
**Approved by:** Medical Education Board, NHSprep Ltd
      `
    },
    "nhs-compliance": {
      title: "NHS Standards Compliance",
      content: `
NHS Standards Compliance

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

1. Introduction

NHSprep Ltd is committed to maintaining full compliance with NHS standards and regulatory requirements for medical education. This document outlines our adherence to NHS frameworks and our ongoing commitment to supporting international medical graduates in their journey to NHS practice.

2. NHS Standards Compliance

2.1 NHS Constitution Compliance
- **Working together for patients:** All educational content prioritizes patient safety and wellbeing
- **Respect and dignity:** Cultural sensitivity training integrated throughout the platform
- **Commitment to quality of care:** Evidence-based curriculum aligned with NHS standards
- **Compassion:** Emphasis on compassionate care in all educational scenarios
- **Improving lives:** Focus on continuous improvement and professional development
- **Everyone counts:** Equal access to educational resources regardless of background

2.2 Care Quality Commission (CQC) Standards
- **Safe:** Educational content promotes safe clinical practices
- **Effective:** Evidence-based learning materials aligned with current best practices
- **Caring:** Emphasis on person-centered care approaches
- **Responsive:** Adaptive learning system responsive to individual needs
- **Well-led:** Strong governance and quality assurance processes

2.3 General Medical Council (GMC) Standards
- **Good Medical Practice:** Integration of GMC guidance throughout curriculum
- **Professional standards:** Emphasis on professional behavior and ethics
- **Continuing professional development:** Lifelong learning approach
- **Patient safety:** Focus on safe clinical practice and risk management

3. Information Governance Compliance

3.1 NHS Data Security and Protection Toolkit
- **Data Security Standards:** Implementation of NHS Digital security requirements
- **Staff responsibilities:** Regular training on data protection and security
- **Technical security:** Encryption, access controls, and monitoring systems
- **Incident management:** Robust incident response and reporting procedures

3.2 Information Governance Framework
- **Data protection impact assessments:** Regular assessment of data processing activities
- **Privacy by design:** Built-in privacy protections in all platform features
- **Data sharing agreements:** Formal agreements for any data sharing activities
- **Audit and monitoring:** Regular review of information governance practices

3.3 Caldicott Principles
- **Justify the purpose:** Clear justification for all personal data processing
- **Don't use personal data unless necessary:** Minimal data collection principles
- **Use minimum necessary:** Only collect and process essential data
- **Access on need-to-know basis:** Strict access controls and permissions
- **Everyone is responsible:** Clear responsibilities for data protection
- **Understand and comply:** Regular training and compliance monitoring

4. Clinical Education Standards

4.1 NHS Education England Requirements
- **Quality standards:** Adherence to medical education quality frameworks
- **Curriculum alignment:** Content aligned with NHS training curricula
- **Assessment standards:** Fair and transparent assessment processes
- **Support systems:** Comprehensive learner support and guidance

4.2 Royal College Standards
- **Professional competencies:** Integration of relevant Royal College competencies
- **Examination preparation:** Alignment with professional examination standards
- **Continuing education:** Support for ongoing professional development
- **Quality assurance:** Regular review and updating of educational content

4.3 Medical Schools Council Standards
- **Educational quality:** High-quality educational delivery and content
- **Student support:** Comprehensive support services for learners
- **Assessment validity:** Valid and reliable assessment methods
- **Continuous improvement:** Regular review and enhancement of services

5. Equality and Diversity Compliance

5.1 Equality Act 2010 Compliance
- **Protected characteristics:** Protection against discrimination
- **Reasonable adjustments:** Accommodation for disability-related needs
- **Equal access:** Fair access to educational opportunities
- **Harassment prevention:** Zero tolerance for harassment or discrimination

5.2 NHS Equality Delivery System
- **Better health outcomes:** Support for diverse healthcare workforce
- **Improved patient access:** Cultural competency training for better patient care
- **Empowered communities:** Support for underrepresented groups in medicine
- **Inclusive leadership:** Diverse representation in educational leadership

6. Patient Safety Standards

6.1 NHS Patient Safety Strategy
- **Safety culture:** Promotion of safety culture in medical education
- **Safety systems:** Integration of safety thinking in all educational content
- **Safety improvement:** Continuous improvement in patient safety education

6.2 National Patient Safety Alerts
- **Alert integration:** Incorporation of relevant safety alerts in education
- **Learning from incidents:** Case studies based on safety incidents
- **Prevention focus:** Emphasis on prevention rather than reaction

7. Quality Assurance

7.1 Continuous Monitoring
- **Regular audits:** Monthly compliance audits and assessments
- **Performance indicators:** Key performance indicators for NHS compliance
- **Stakeholder feedback:** Regular feedback from NHS partners and users
- **Improvement planning:** Continuous improvement based on audit findings

7.2 External Validation
- **Third-party assessments:** Independent validation of compliance standards
- **Peer review:** Review by NHS education professionals
- **Regulatory engagement:** Active engagement with relevant regulatory bodies

8. Training and Development

8.1 Staff Training
- **NHS standards training:** Regular training on NHS standards and requirements
- **Cultural competency:** Training on NHS values and culture
- **Data protection:** Comprehensive data protection and security training
- **Quality assurance:** Training on quality standards and processes

8.2 Continuous Professional Development
- **Regular updates:** Ongoing education on changing NHS standards
- **Best practice sharing:** Learning from NHS best practices
- **Professional networks:** Active participation in NHS education networks

9. Reporting and Communication

9.1 Compliance Reporting
- **Regular reports:** Monthly compliance reports to senior management
- **Stakeholder communication:** Regular updates to NHS partners
- **Public reporting:** Annual compliance statement publication
- **Incident reporting:** Prompt reporting of any compliance issues

9.2 Contact Information
**NHS Compliance Officer:**  
Email: nhscompliance@nhsprep.com  
Phone: +44 20 1234 5690  
Address: NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

**Regulatory Affairs:**  
Email: regulatory@nhsprep.com  
Response time: Within 2 working days

This NHS Standards Compliance document is reviewed quarterly and updated as necessary to ensure continued alignment with NHS requirements and best practices.
      `
    },
    "nhs-code-of-conduct": {
      title: "NHS Code of Conduct",
      content: `
NHS Code of Conduct

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

1. Introduction

This Code of Conduct embeds NHS values throughout our educational platform and ensures all users understand and commit to the highest standards of professional behavior expected in NHS practice.

2. NHS Constitution Values

2.1 Working Together for Patients
- **Patient-centered education:** All learning activities prioritize patient wellbeing
- **Collaborative approach:** Emphasis on multidisciplinary teamwork
- **Communication skills:** Development of effective patient communication
- **Cultural sensitivity:** Understanding diverse patient populations

2.2 Respect and Dignity
- **Person-centered care:** Recognition of individual patient needs and preferences
- **Equality and inclusion:** Respect for all individuals regardless of background
- **Professional boundaries:** Maintaining appropriate professional relationships
- **Confidentiality:** Protecting patient and personal information

2.3 Commitment to Quality of Care
- **Evidence-based practice:** Use of current best evidence in all educational content
- **Continuous improvement:** Commitment to ongoing learning and development
- **Safety first:** Prioritizing patient safety in all scenarios
- **Quality standards:** Adherence to professional quality standards

2.4 Compassion
- **Empathetic care:** Understanding and responding to patient emotions
- **Kindness and consideration:** Treating all individuals with kindness
- **Support for colleagues:** Providing support and assistance to fellow learners
- **Emotional intelligence:** Developing emotional awareness and regulation

2.5 Improving Lives
- **Health promotion:** Focus on improving health outcomes
- **Innovation:** Embracing new approaches to healthcare delivery
- **Prevention:** Emphasis on preventive care and health maintenance
- **Community impact:** Understanding broader health and social determinants

2.6 Everyone Counts
- **Equality:** Equal treatment and opportunities for all
- **Diversity:** Celebrating and leveraging diversity in healthcare teams
- **Inclusion:** Creating inclusive learning and working environments
- **Accessibility:** Ensuring educational resources are accessible to all

3. Professional Standards

3.1 Clinical Excellence
- **Evidence-based practice:** Commitment to using best available evidence
- **Continuous learning:** Ongoing professional development and education
- **Reflective practice:** Regular reflection on performance and learning
- **Quality improvement:** Active participation in quality improvement activities

### 3.2 Professional Behavior
- **Integrity:** Honest and transparent in all professional interactions
- **Accountability:** Taking responsibility for actions and decisions
- **Reliability:** Consistent and dependable in professional commitments
- **Respect:** Treating all individuals with respect and courtesy

### 3.3 Communication Excellence
- **Clear communication:** Using clear, understandable language
- **Active listening:** Listening actively to patients, colleagues, and learners
- **Cultural sensitivity:** Adapting communication to cultural contexts
- **Conflict resolution:** Managing disagreements professionally and constructively

## 4. Educational Commitment

### 4.1 Learning Excellence
- **Academic integrity:** Honest and ethical approach to learning and assessment
- **Collaborative learning:** Supporting fellow learners and sharing knowledge
- **Constructive feedback:** Providing and receiving feedback professionally
- **Continuous improvement:** Commitment to ongoing learning and development

### 4.2 Teaching and Mentoring
- **Knowledge sharing:** Willingness to share knowledge and experience
- **Supportive guidance:** Providing constructive and supportive mentoring
- **Role modeling:** Demonstrating professional behavior and values
- **Inclusive teaching:** Ensuring teaching approaches are inclusive and accessible

## 5. Community Standards

### 5.1 Respectful Interaction
- **Professional communication:** Using respectful and professional language
- **Constructive engagement:** Contributing positively to community discussions
- **Diversity appreciation:** Valuing and learning from diverse perspectives
- **Conflict resolution:** Addressing conflicts constructively and professionally

### 5.2 Prohibited Behavior
- **Discrimination:** Zero tolerance for discrimination based on protected characteristics
- **Harassment:** No harassment, bullying, or inappropriate behavior
- **Unprofessional conduct:** Maintaining professional standards at all times
- **Confidentiality breaches:** Protecting confidential information

## 6. Technology and Digital Citizenship

### 6.1 Responsible Use
- **Platform guidelines:** Following all platform terms of use and guidelines
- **Digital professionalism:** Maintaining professional standards online
- **Data protection:** Protecting personal and educational data
- **Appropriate content:** Sharing only appropriate and relevant content

### 6.2 Innovation and Improvement
- **Feedback provision:** Providing constructive feedback on platform features
- **Best practice sharing:** Sharing effective learning strategies and approaches
- **Technology adoption:** Embracing new technologies for improved learning
- **Digital literacy:** Developing and maintaining digital skills

## 7. Patient Safety and Quality

### 7.1 Safety Culture
- **Safety first:** Prioritizing patient safety in all educational scenarios
- **Error reporting:** Learning from mistakes and near misses
- **Risk awareness:** Understanding and managing clinical risks
- **Continuous improvement:** Contributing to safety improvement initiatives

### 7.2 Quality Standards
- **Evidence-based care:** Using current best evidence in all scenarios
- **Standard adherence:** Following established clinical guidelines and protocols
- **Quality measurement:** Understanding and contributing to quality metrics
- **Improvement participation:** Active involvement in quality improvement activities

## 8. Reporting and Support

### 8.1 Reporting Concerns
- **Professional concerns:** Reporting unprofessional behavior or conduct
- **Educational issues:** Reporting problems with educational content or delivery
- **Technical problems:** Reporting platform technical issues
- **Safety concerns:** Reporting any safety-related concerns

### 8.2 Support Services
- **Academic support:** Access to academic guidance and support
- **Professional development:** Support for career development and planning
- **Wellbeing support:** Access to mental health and wellbeing resources
- **Equality support:** Support for equality, diversity, and inclusion issues

## 9. Compliance and Accountability

### 9.1 Code Adherence
- **Understanding:** Ensuring full understanding of code requirements
- **Compliance:** Consistent adherence to all code provisions
- **Accountability:** Taking responsibility for code compliance
- **Reporting violations:** Reporting violations of the code when observed

### 9.2 Consequences
- **Progressive response:** Graduated response to code violations
- **Support and education:** Providing support and additional training when needed
- **Corrective action:** Taking appropriate corrective action for violations
- **Appeals process:** Fair appeals process for disciplinary actions

## 10. Contact Information

### 10.1 Code of Conduct Inquiries
**Email:** conduct@nhsprep.com  
**Phone:** +44 20 1234 5691  
**Response time:** Within 1 working day

### 10.2 Professional Standards Support
**Email:** professional@nhsprep.com  
**Phone:** +44 20 1234 5692  
**Address:** NHSprep Ltd, 123 Medical Square, London, SW1A 1AA

### 10.3 Anonymous Reporting
**Online form:** Available 24/7 on platform  
**Email:** anonymous@nhsprep.com  
**Confidential telephone:** +44 20 1234 5693

By using the NHSprep platform, you acknowledge that you have read, understood, and agree to abide by this NHS Code of Conduct. This code reflects our commitment to NHS values and standards in medical education.

This code is reviewed annually and updated to reflect current NHS standards and best practices.
      `
    },
    "intellectual-property": {
      title: "Intellectual Property Notice",
      content: `
Intellectual Property Notice

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

1. Copyright Protection

All content, materials, and resources on the NHSprep platform are protected by intellectual property laws including copyright, trademark, and trade secret laws. This includes but is not limited to:

- Educational content and curriculum materials
- Medical question databases and explanations
- Video content and OSCE scenarios
- Software code and platform functionality
- Branding, logos, and visual design elements
- AI-generated feedback and analysis tools

2. Trademark Rights

The following are registered trademarks of NHSprep Ltd:
- NHSprep® (Registered trademark)
- PLAB Master® (Registered trademark)
- Video OSCE Pro® (Registered trademark)
- Smart Learning Engine® (Registered trademark)

3. User License and Restrictions

By using this platform, you are granted a limited, non-exclusive, non-transferable license to:
- Access educational content for personal study purposes
- Download materials for offline study (where permitted)
- Participate in community discussions and mentoring

You may NOT:
- Reproduce, distribute, or sell any platform content
- Create derivative works based on our materials
- Reverse engineer our software or AI systems
- Use our content for commercial purposes without permission
- Share access credentials with others

4. Digital Millennium Copyright Act (DMCA) Compliance

We respect intellectual property rights and comply with the DMCA. If you believe content infringes your copyright:

Email: dmca@nhsprep.com
Include: Description of copyrighted work, location of infringing material, your contact information, and a good faith statement.

5. Medical Content Disclaimer

Educational materials are for training purposes only and do not constitute medical advice. Always consult current clinical guidelines and seek professional medical advice for patient care decisions.

**Contact for IP matters:** legal@nhsprep.com
      `
    },
    "platform-security": {
      title: "Platform Security & Data Protection",
      content: `
Platform Security & Data Protection

**Last Updated:** June 5, 2025

1. Security Measures

We implement comprehensive security measures to protect your data:

Technical Security:
- End-to-end encryption for all data transmission
- Advanced firewall protection and intrusion detection
- Regular security audits and penetration testing
- Secure data centers with 24/7 monitoring
- Multi-factor authentication options
- Regular security updates and patches

Data Protection:
- GDPR compliant data processing
- NHS Data Security and Protection Toolkit compliance
- Regular backup systems with encryption
- Access controls and audit logging
- Staff security training and background checks

2. User Responsibilities

To maintain platform security, users must:
- Use strong, unique passwords
- Enable two-factor authentication when available
- Report suspected security incidents immediately
- Keep personal devices secure when accessing the platform
- Log out from shared or public computers
- Report any unauthorized access to your account

3. Incident Response

In case of security incidents:
- Immediate containment and investigation
- Notification to affected users within 24 hours
- Cooperation with relevant authorities
- Transparent reporting of incident details
- Implementation of additional safeguards

4. Data Breach Procedures

If a data breach occurs:
- Users notified within 72 hours
- Detailed explanation of what data was involved
- Steps taken to secure the breach
- Recommendations for user protection
- Support services provided at no cost

**Report Security Issues:** security@nhsprep.com
**Emergency Contact:** +44 20 1234 5684 (24/7)
      `
    },
    "accessibility": {
      title: "Accessibility Statement",
      content: `
Accessibility Statement

**Effective Date:** June 5, 2025  
**Last Updated:** June 5, 2025

## 1. Our Commitment to Accessibility

NHSprep Ltd is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards to provide equal access to information and functionality for all users.

### 1.1 Our Promise
We believe that everyone should have equal access to medical education, regardless of ability or disability. This commitment extends to:
- Making our platform accessible to users with diverse needs
- Providing alternative formats and assistive technology support
- Continuously improving accessibility based on user feedback
- Training our team on accessibility best practices

### 1.2 Legal Compliance
We strive to comply with:
- Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
- UK Equality Act 2010
- EU Web Accessibility Directive
- Section 508 of the Rehabilitation Act (US)
- Accessibility for Ontarians with Disabilities Act (AODA)

## 2. Current Accessibility Features

### 2.1 Visual Accessibility

**High Contrast and Color:**
- High contrast mode available in user settings
- Text contrast ratios meet WCAG AA standards (4.5:1 minimum)
- Color is not the only means of conveying information
- Support for custom color themes and dark mode

**Text and Typography:**
- Resizable text up to 200% without loss of functionality
- Clear, readable fonts (minimum 12px, recommended 16px)
- Adequate line spacing and paragraph breaks
- No text embedded in images where possible

**Images and Media:**
- Descriptive alt text for all informational images
- Transcripts provided for audio content
- Captions available for video content
- Audio descriptions for complex visual content

### 2.2 Motor Accessibility

**Keyboard Navigation:**
- Full keyboard navigation support throughout the platform
- Logical tab order for all interactive elements
- Skip links to main content and navigation areas
- No keyboard traps or inaccessible interactive elements

**Mouse and Touch Alternatives:**
- Large click targets (minimum 44x44 pixels)
- Adequate spacing between interactive elements
- Support for voice control and switch navigation
- No time-sensitive interactions that cannot be extended

**Motor Impairment Support:**
- Adjustable timeout settings for timed activities
- Pause, stop, and hide options for moving content
- No content that flashes more than 3 times per second
- Multiple ways to access the same functionality

### 2.3 Cognitive Accessibility

**Clear Navigation and Structure:**
- Consistent navigation and page layout
- Clear headings and page structure
- Breadcrumb navigation where appropriate
- Search functionality with filters and suggestions

**Content Presentation:**
- Plain language used throughout the platform
- Clear instructions for all interactive elements
- Error messages that clearly explain how to fix issues
- Progress indicators for multi-step processes

**Memory and Attention Support:**
- Auto-save functionality for forms and progress
- Session timeout warnings with extension options
- Bookmark and progress tracking features
- Reminders and notification options

### 2.4 Hearing Accessibility

**Audio Content Support:**
- Captions for all video content
- Transcripts for audio-only content
- Visual indicators for audio alerts
- Volume controls with mute options

**Communication Alternatives:**
- Text-based chat support as alternative to phone support
- Visual feedback for audio notifications
- Sign language interpretation available upon request
- Written instructions alongside audio directions

## 3. Assistive Technology Support

### 3.1 Screen Readers
**Compatible Screen Readers:**
- JAWS (Windows)
- NVDA (Windows)
- VoiceOver (Mac/iOS)
- TalkBack (Android)
- Dragon NaturallySpeaking

**Features for Screen Reader Users:**
- Proper heading structure (H1-H6)
- Descriptive link text and button labels
- Form labels associated with input fields
- ARIA landmarks and labels where appropriate
- Table headers and captions for data tables

### 3.2 Voice Recognition Software
**Supported Software:**
- Dragon NaturallySpeaking
- Windows Speech Recognition
- Mac Dictation
- Voice Access (Android)

**Voice Control Features:**
- Voice commands for navigation
- Dictation support in text fields
- Click labels for interactive elements
- Voice shortcuts for common actions

### 3.3 Alternative Input Devices
**Supported Devices:**
- Switch navigation devices
- Eye-tracking systems
- Head-operated input devices
- Single-switch scanning systems

**Device Compatibility:**
- Standard keyboard shortcuts and hotkeys
- Customizable input settings
- Compatibility with adaptive hardware
- Support for multiple input methods simultaneously

## 4. Platform-Specific Accessibility

### 4.1 Learning Management Features

**MCQ Practice:**
- Keyboard navigation through question options
- Screen reader announcement of correct/incorrect answers
- Extended time limits available upon request
- Alternative question formats for specific needs

**Video OSCE:**
- Captions and transcripts for all video content
- Audio descriptions for visual elements
- Keyboard controls for video playback
- Alternative assessment methods available

**Community Features:**
- Accessible forum posting and reading
- Screen reader compatible discussion threads
- Keyboard navigation through community content
- Clear labels for social interaction elements

### 4.2 Assessment Accessibility

**Accommodations Available:**
- Extended time for assessments
- Alternative formats (audio, large print, digital)
- Screen reader compatible test interfaces
- Separate testing environment options

**Assessment Features:**
- Progress saving during long assessments
- Clear instructions and navigation
- Alternative input methods for responses
- Review and edit capabilities before submission

### 4.3 Mobile Accessibility

**Mobile App Features:**
- VoiceOver and TalkBack support
- Gesture-based navigation alternatives
- Adjustable text size and contrast
- Offline accessibility features

**Responsive Design:**
- Touch targets optimized for accessibility
- Swipe gestures with alternative access methods
- Portrait and landscape orientation support
- Zoom functionality up to 500%

## 5. Known Accessibility Limitations

### 5.1 Current Limitations
We are aware of the following accessibility challenges and are working to address them:

**Video Content:**
- Some legacy video content may lack audio descriptions
- Automatic captions may have accuracy limitations
- Timeline: Audio descriptions for all content by September 2025

**Complex Diagrams:**
- Some medical diagrams may need enhanced alternative descriptions
- Working on tactile and audio alternatives
- Timeline: Improved diagram accessibility by August 2025

**Third-Party Content:**
- Some integrated third-party tools may have accessibility limitations
- Working with vendors to improve compliance
- Timeline: Vendor compliance review completed by July 2025

### 5.2 Planned Improvements

**Short-term (Next 3 months):**
- Enhanced keyboard navigation for video players
- Improved color contrast in data visualization
- Additional ARIA labels for complex interfaces
- Mobile app accessibility testing and improvements

**Medium-term (3-6 months):**
- Voice control integration
- Enhanced screen reader support for interactive elements
- Tactile feedback options for mobile devices
- Customizable interface options

**Long-term (6-12 months):**
- AI-powered alternative text generation
- Real-time transcription services
- Advanced cognitive accessibility features
- Integration with emerging assistive technologies

## 6. Getting Accessibility Support

### 6.1 Requesting Accommodations

**How to Request:**
- Email: accessibility@nhsprep.com
- Phone: +44 20 1234 5685
- Online form: https://nhsprep.com/accessibility-request
- Response time: Within 2 working days

**Information to Include:**
- Description of your accessibility needs
- Specific barriers you're experiencing
- Preferred accommodation or solution
- Urgency of the request

### 6.2 Available Accommodations

**Learning Accommodations:**
- Extended time for assessments and activities
- Alternative formats for content and materials
- Customized interface settings
- One-on-one support sessions

**Technical Accommodations:**
- Assistive technology setup assistance
- Custom keyboard shortcuts
- Specialized software recommendations
- Device compatibility testing

**Communication Accommodations:**
- Sign language interpretation for video calls
- Text-based alternatives to audio content
- Written instructions and confirmations
- Alternative contact methods

### 6.3 Support Process

**Step 1: Initial Contact**
- Contact our accessibility team with your needs
- Brief discussion of requirements and barriers
- Documentation of accommodation request
- Initial timeline provided

**Step 2: Assessment and Planning**
- Detailed assessment of accommodation needs
- Consultation with technical and educational teams
- Development of accommodation plan
- Timeline and implementation schedule

**Step 3: Implementation**
- Setup and configuration of accommodations
- Testing and refinement as needed
- Training and support provided
- Ongoing monitoring and adjustments

**Step 4: Follow-up**
- Regular check-ins on accommodation effectiveness
- Adjustments and improvements as needed
- Feedback collection and incorporation
- Annual review of accommodation needs

## 7. Feedback and Complaints

### 7.1 Accessibility Feedback

**We Welcome Feedback On:**
- Accessibility barriers you encounter
- Suggestions for improvement
- Positive experiences with accessible features
- Ideas for new accessibility features

**How to Provide Feedback:**
- Email: accessibility@nhsprep.com
- Accessibility feedback form on our website
- During customer support interactions
- Through user surveys and research studies

### 7.2 Complaint Process

**If You Experience Accessibility Issues:**

**Step 1: Report the Issue**
- Contact our accessibility team immediately
- Provide specific details about the barrier
- Include information about your assistive technology
- Request immediate accommodation if needed

**Step 2: Investigation**
- We will investigate within 1 working day
- Technical team will assess and test the issue
- Temporary workarounds provided if possible
- Regular updates on progress provided

**Step 3: Resolution**
- Permanent fix implemented as soon as possible
- Testing with affected users where possible
- Documentation updated to prevent recurrence
- Follow-up to ensure satisfaction

**Step 4: External Complaint Options**
- Equality and Human Rights Commission (UK)
- Disability Rights Commission
- Relevant professional and regulatory bodies
- Legal advice and representation options

## 8. Testing and Compliance

### 8.1 Regular Testing

**Automated Testing:**
- Daily automated accessibility scans
- WCAG compliance checking tools
- Color contrast and text analysis
- Keyboard navigation testing

**Manual Testing:**
- Monthly manual accessibility audits
- Screen reader testing with real users
- Keyboard-only navigation testing
- Mobile accessibility assessment

**User Testing:**
- Quarterly testing with users with disabilities
- Feedback collection and analysis
- Usability testing for accessibility features
- Assistive technology compatibility testing

### 8.2 Third-Party Audits

**Annual Accessibility Audit:**
- Independent accessibility consultant review
- Comprehensive WCAG 2.1 AA compliance assessment
- Detailed recommendations for improvement
- Public availability of audit results

**Certification and Standards:**
- ISO 14289 (PDF accessibility) compliance
- Section 508 voluntary compliance
- WCAG 2.1 AA certification pursuit
- Industry accessibility benchmarking

### 8.3 Continuous Improvement

**Monthly Reviews:**
- Accessibility team performance review
- User feedback analysis and action planning
- Technical improvement identification
- Training needs assessment

**Quarterly Planning:**
- Accessibility roadmap updates
- Budget allocation for improvements
- Vendor and partner accessibility requirements
- Stakeholder communication and updates

## 9. Training and Awareness

### 9.1 Staff Training

**All Staff Training:**
- Disability awareness and etiquette
- Basic accessibility principles
- Customer service for users with disabilities
- Legal requirements and compliance

**Technical Team Training:**
- WCAG guidelines and implementation
- Assistive technology compatibility
- Accessible design and development practices
- Testing tools and methodologies

**Content Team Training:**
- Creating accessible educational content
- Alternative text writing best practices
- Video captioning and audio description
- Plain language and cognitive accessibility

### 9.2 Community Education

**User Education:**
- Accessibility features guidance and tutorials
- Assistive technology compatibility information
- Self-advocacy and accommodation request guidance
- Peer support and community building

**Partner Education:**
- Vendor accessibility requirements
- Third-party content accessibility standards
- Industry best practice sharing
- Accessibility procurement guidelines

## 10. Contact Information

### 10.1 Accessibility Team
**Email:** accessibility@nhsprep.com  
**Phone:** +44 20 1234 5685  
**Text Phone:** +44 20 1234 5686  
**BSL Video Relay:** Available upon request

### 10.2 Accessibility Coordinator
**Name:** Dr. Michael Chen  
**Email:** m.chen@nhsprep.com  
**Phone:** +44 20 1234 5687  
**Office Hours:** Monday-Friday, 9 AM-5 PM GMT

### 10.3 Emergency Accessibility Support
**24/7 Support Line:** +44 20 1234 5688  
**Emergency Email:** urgent-access@nhsprep.com  
**Response Time:** Within 2 hours for urgent accessibility barriers

### 10.4 Postal Address
**NHSprep Ltd Accessibility Team**  
123 Medical Square  
London, SW1A 1AA  
United Kingdom

## 11. Additional Resources

### 11.1 External Accessibility Resources
- **AbilityNet:** https://abilitynet.org.uk
- **RNIB:** https://rnib.org.uk
- **Action on Hearing Loss:** https://actiononhearingloss.org.uk
- **Scope:** https://scope.org.uk

### 11.2 Assistive Technology Resources
- **My Computer My Way:** BBC accessibility tutorials
- **WebAIM:** Web accessibility evaluation tools
- **NVDA:** Free screen reader software
- **Colour Contrast Analyser:** Free color testing tool

### 11.3 User Guides and Documentation
- Platform accessibility features guide
- Assistive technology setup instructions
- Keyboard shortcut reference
- Alternative format request procedures

This accessibility statement is reviewed and updated every six months to ensure accuracy and continued commitment to accessibility improvements. Our next review is scheduled for December 2025.

---

**Document Reference:** ACC-STMT-2025-001  
**Review Date:** December 5, 2025  
**Approved by:** Accessibility Steering Committee, NHSprep Ltd
      `
    }
  };

  const renderDocument = (docId: string) => {
    const doc = documentContent[docId as keyof typeof documentContent];
    if (!doc) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">{doc.title}</h2>
          <Button
            variant="outline"
            onClick={() => setActiveDocument(null)}
            className="text-sm"
          >
            Back to Documents
          </Button>
        </div>
        <ScrollArea className="h-[600px] w-full rounded-md border p-6 bg-white">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-900 bg-white">
              {doc.content}
            </pre>
          </div>
        </ScrollArea>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([doc.content], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = `${doc.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Document
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            Print Document
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 mr-3 text-purple-600" />
              <h1 className="text-4xl font-bold text-black">Legal & Support</h1>
            </div>
            <p className="text-xl text-gray-600">Legal documents, policies, and support information</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDocument ? (
          renderDocument(activeDocument)
        ) : (
          <Tabs defaultValue="legal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="legal">Legal Documents</TabsTrigger>
              <TabsTrigger value="support">Support & Contact</TabsTrigger>
              <TabsTrigger value="company">Company Information</TabsTrigger>
            </TabsList>

            <TabsContent value="legal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalDocuments.map((doc) => {
                  const IconComponent = doc.icon;
                  return (
                    <Card
                      key={doc.id}
                      className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveDocument(doc.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-black mb-2">{doc.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Updated: {doc.lastUpdated}</span>
                              <ExternalLink className="w-4 h-4 text-purple-600" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <Card key={index} className="bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-black mb-2">{option.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                            <Button
                              variant="outline"
                              onClick={() => {
                                if (option.action.startsWith('mailto:')) {
                                  window.location.href = option.action;
                                } else if (option.action.startsWith('tel:')) {
                                  window.location.href = option.action;
                                } else {
                                  // Handle other actions
                                }
                              }}
                            >
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-black mb-2">How do I request my personal data?</h4>
                      <p className="text-gray-600 text-sm">
                        You can request a copy of your personal data by emailing dpo@nhsprep.com or using our privacy portal. We'll respond within 1 month.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-2">What are my rights under GDPR?</h4>
                      <p className="text-gray-600 text-sm">
                        You have the right to access, rectify, erase, restrict, port, and object to processing of your personal data. See our GDPR Compliance document for details.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-2">How do I cancel my subscription?</h4>
                      <p className="text-gray-600 text-sm">
                        You can cancel your subscription at any time through your account settings or by contacting support@nhsprep.com.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-2">Is the platform content medically accurate?</h4>
                      <p className="text-gray-600 text-sm">
                        Our content is created by medical professionals and regularly reviewed. However, it's for educational purposes only and not a substitute for clinical guidance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-black">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-black">NHSprep Ltd</h4>
                      <p className="text-gray-600 text-sm">
                        Company Number: 12345678<br />
                        Registered in England and Wales<br />
                        VAT Number: GB123456789
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Registered Address</h4>
                      <p className="text-gray-600 text-sm">
                        123 Medical Square<br />
                        London, SW1A 1AA<br />
                        United Kingdom
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Business Address</h4>
                      <p className="text-gray-600 text-sm">
                        456 Education Hub<br />
                        Manchester, M1 2AB<br />
                        United Kingdom
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-black">Regulatory Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-black">Data Protection</h4>
                      <p className="text-gray-600 text-sm">
                        ICO Registration: Z1234567<br />
                        Data Protection Officer: Dr. Sarah Thompson<br />
                        Email: dpo@nhsprep.com
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Professional Memberships</h4>
                      <p className="text-gray-600 text-sm">
                        Association of Medical Education<br />
                        UK e-Learning Association<br />
                        Educational Technology Association
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Certifications</h4>
                      <p className="text-gray-600 text-sm">
                        ISO 27001 Information Security<br />
                        Cyber Essentials Plus<br />
                        WCAG 2.1 AA Accessibility
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mission and Values */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    NHSprep is dedicated to supporting international medical graduates in their journey to practice medicine in the UK. 
                    We provide comprehensive, accessible, and culturally relevant educational resources to help healthcare professionals 
                    succeed in PLAB examinations and integrate successfully into the NHS. Our platform combines cutting-edge AI 
                    technology with expert medical knowledge to deliver personalized learning experiences that respect diversity 
                    and promote excellence in medical practice.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
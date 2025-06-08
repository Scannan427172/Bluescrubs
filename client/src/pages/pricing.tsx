import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, X, Star, Crown, Zap, Globe, Brain, Users, Video, Calendar, Award, Shield, Clock, ArrowRight } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Essential",
      description: "Perfect for getting started with PLAB preparation",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: false,
      features: [
        "1,500+ PLAB 1 practice questions",
        "Basic performance analytics",
        "Study progress tracking",
        "Mobile app access",
        "Email support",
        "Basic multilingual support (5 languages)",
        "Standard study materials"
      ],
      limitations: [
        "No PLAB 2 OSCE practice",
        "No AI-powered learning",
        "No video OSCE sessions",
        "No mentor access",
        "Limited exam simulations"
      ],
      cta: "Start Essential",
      color: "blue"
    },
    {
      name: "Professional",
      description: "Complete PLAB preparation with AI-powered learning",
      monthlyPrice: 79,
      annualPrice: 790,
      popular: true,
      features: [
        "5,000+ PLAB 1 & 2 practice questions",
        "AI-powered adaptive learning",
        "Video OSCE practice sessions",
        "Advanced analytics & insights",
        "Live mentor consultations (2/month)",
        "Full multilingual support (30+ languages)",
        "Personalized study plans",
        "Exam simulation mode",
        "UK culture training modules",
        "Priority email & chat support",
        "Mobile offline mode"
      ],
      limitations: [],
      cta: "Start Professional",
      color: "emerald"
    },
    {
      name: "Elite",
      description: "Premium preparation with unlimited access and personal mentoring",
      monthlyPrice: 149,
      annualPrice: 1490,
      popular: false,
      features: [
        "Unlimited practice questions (all exams)",
        "1-on-1 personal mentor (weekly sessions)",
        "Advanced AI study companion",
        "Real-time video OSCE feedback",
        "Global exam support (USMLE, AMC, MRCP)",
        "Career guidance & job placement support",
        "Priority customer support (24/7)",
        "Advanced performance analytics",
        "Custom study schedules",
        "Peer study groups",
        "Interview preparation",
        "CV/Resume optimization",
        "NHS application assistance"
      ],
      limitations: [],
      cta: "Start Elite",
      color: "purple"
    }
  ];

  const additionalExams = [
    { name: "USMLE Complete", price: 89, description: "Full preparation for all USMLE steps" },
    { name: "AMC Preparation", price: 69, description: "Australian Medical Council exam prep" },
    { name: "MRCP Modules", price: 99, description: "Membership of Royal Colleges preparation" },
    { name: "IELTS Medical", price: 49, description: "Medical English language training" },
    { name: "Middle East Licensing", price: 79, description: "DHA, HAAD, SCFHS exam preparation" }
  ];

  const features = [
    {
      category: "Practice & Questions",
      items: [
        { name: "PLAB 1 Questions", essential: "1,500+", professional: "3,000+", elite: "5,000+" },
        { name: "PLAB 2 OSCE Cases", essential: "❌", professional: "500+", elite: "1,000+" },
        { name: "Video OSCE Practice", essential: "❌", professional: "✅", elite: "✅ + Feedback" },
        { name: "Exam Simulations", essential: "Basic", professional: "Advanced", elite: "Unlimited" }
      ]
    },
    {
      category: "AI & Learning",
      items: [
        { name: "Adaptive Learning", essential: "❌", professional: "✅", elite: "✅ Advanced" },
        { name: "AI Study Companion", essential: "❌", professional: "Basic", elite: "Full Access" },
        { name: "Personalized Study Plans", essential: "❌", professional: "✅", elite: "✅ Custom" },
        { name: "Performance Prediction", essential: "❌", professional: "✅", elite: "✅ Detailed" }
      ]
    },
    {
      category: "Support & Mentoring",
      items: [
        { name: "Mentor Access", essential: "❌", professional: "2 sessions/month", elite: "Weekly 1-on-1" },
        { name: "Support Response", essential: "48 hours", professional: "24 hours", elite: "4 hours" },
        { name: "Career Guidance", essential: "❌", professional: "Basic", elite: "Comprehensive" },
        { name: "Job Placement Support", essential: "❌", professional: "❌", elite: "✅" }
      ]
    }
  ];

  const getPrice = (plan: typeof plans[0]) => isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const getSavings = (plan: typeof plans[0]) => plan.monthlyPrice * 12 - plan.annualPrice;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-yellow-500" />
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive medical exam preparation designed for international graduates
        </p>
        
        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${plan.popular ? 'border-emerald-500 border-2 shadow-lg scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold">£{getPrice(plan)}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                </div>
                {isAnnual && getSavings(plan) > 0 && (
                  <p className="text-sm text-emerald-600 mt-1">
                    Save £{getSavings(plan)} annually
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button 
                className={`w-full mt-6 ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                size="lg"
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Detailed Feature Comparison</h2>
        <div className="bg-white rounded-lg border overflow-hidden">
          {features.map((category) => (
            <div key={category.category}>
              <div className="bg-gray-50 px-6 py-3 border-b">
                <h3 className="font-semibold text-lg">{category.category}</h3>
              </div>
              {category.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 px-6 py-3 border-b last:border-b-0">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-center text-sm">{item.essential}</div>
                  <div className="text-center text-sm">{item.professional}</div>
                  <div className="text-center text-sm">{item.elite}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Exam Modules */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Additional Exam Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalExams.map((exam) => (
            <Card key={exam.name}>
              <CardHeader>
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">£{exam.price}/month</span>
                  <Button variant="outline" size="sm">
                    Add Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-8 text-center mb-16">
        <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're confident in our platform. If you're not completely satisfied within 30 days, 
          we'll refund your full payment, no questions asked.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Trusted by 15,000+ doctors</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Can I switch plans anytime?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
            },
            {
              question: "Do you offer student discounts?",
              answer: "Yes, we offer a 20% discount for verified medical students. Contact our support team with your student ID for verification."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe."
            },
            {
              question: "Is there a free trial available?",
              answer: "Yes, we offer a 7-day free trial of our Professional plan. No credit card required to start your trial."
            },
            {
              question: "Can I access content offline?",
              answer: "Yes, our mobile app allows you to download practice questions and study materials for offline access."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Medical Journey?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of international medical graduates preparing for their UK career
        </p>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
          Start Your Free Trial
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
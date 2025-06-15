import { useState } from 'react';
import { Check, Star, Zap, Crown, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Foundation',
      description: 'Perfect for getting started with PLAB preparation',
      monthlyPrice: 39,
      annualPrice: 390,
      originalAnnualPrice: 468,
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      features: [
        '5,000 AI-generated PLAB questions',
        'Basic AI study recommendations',
        'Progress tracking & analytics',
        'Mobile app access',
        'Community forums',
        '3 language support',
        'Email support',
        'Offline study mode'
      ],
      limitations: [
        'Limited AI systems (5 basic)',
        'No VR OSCE training',
        'Standard question difficulty'
      ]
    },
    {
      name: 'Professional',
      description: 'Complete PLAB preparation with advanced AI',
      monthlyPrice: 69,
      annualPrice: 590,
      originalAnnualPrice: 828,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      popular: true,
      features: [
        'Everything in Foundation',
        '20 Advanced AI systems',
        'VR OSCE training (10 stations)',
        'Live NHS guidelines integration',
        '15 language support',
        'Predictive success analytics',
        'Professional development tools',
        'Priority support',
        'Adaptive learning engine',
        'Weakness pattern analysis',
        'Custom study schedules'
      ],
      limitations: []
    },
    {
      name: 'Premium',
      description: 'Elite preparation with personalized guidance',
      monthlyPrice: 99,
      annualPrice: 890,
      originalAnnualPrice: 1188,
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      features: [
        'Everything in Professional',
        'All 40+ AI systems',
        'Complete VR OSCE suite (50+ stations)',
        'All 35 languages',
        'AI patient actors',
        'Career guidance & hospital partnerships',
        '1-on-1 mentorship matching',
        'Custom study plans',
        'Priority queue for new features',
        'Phone support',
        'Dedicated success manager',
        'Advanced performance analytics'
      ],
      limitations: []
    }
  ];

  const enterpriseFeatures = [
    'Bulk licenses (50+ users)',
    'Institution branding',
    'Admin dashboard & reporting',
    'Custom content integration',
    'Dedicated account manager',
    'On-site training',
    'API access',
    'Custom integrations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>
            Choose Your Path to PLAB Success
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of international medical graduates who've passed PLAB with our AI-powered platform. 
            From basic preparation to elite mentorship - we have the right plan for your journey.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`mr-3 ${!isAnnual ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="mx-2"
          />
          <span className={`ml-3 ${isAnnual ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>Annual</span>
          <Badge variant="secondary" className="ml-3 bg-green-100 text-green-800">
            Save up to 33%
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const originalPrice = isAnnual ? plan.originalAnnualPrice : null;
            const savings = isAnnual && originalPrice ? originalPrice - price : 0;

            return (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 font-semibold">
                    Most Popular Choice
                  </div>
                )}
                
                <CardHeader className={`${plan.popular ? 'pt-12' : 'pt-6'} pb-4 bg-white`}>
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-black">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-900">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold text-black">
                      £{price}
                    </span>
                    <span className="text-gray-900 ml-1">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                    {originalPrice && isAnnual && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        £{originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {savings > 0 && (
                    <Badge variant="secondary" className="w-fit mt-2 bg-green-100 text-green-800">
                      Save £{savings}
                    </Badge>
                  )}
                  
                  {!isAnnual && (
                    <p className="text-sm text-gray-900 mt-2">
                      Less than £{(price / 30).toFixed(2)}/day
                    </p>
                  )}
                </CardHeader>

                <CardContent className="pt-0 bg-white">
                  <Button 
                    className={`w-full mb-6 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-3`}
                    onClick={() => console.log(`Starting ${plan.name} plan`)}
                  >
                    Start {plan.name} Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-black">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <p className="text-xs text-gray-500 mb-2">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-5 h-5 text-gray-300 mr-3 mt-0.5 text-xs">✗</span>
                          <span className="text-xs text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enterprise Section */}
        <Card className="mb-16 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold" style={{ color: '#000000' }}>
              Enterprise & Institutional
            </CardTitle>
            <CardDescription className="text-lg">
              Perfect for medical schools, hospitals, and training institutions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold mb-4" style={{ color: '#000000' }}>What's Included:</h4>
                <div className="space-y-2">
                  {enterpriseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 text-left">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-center mb-6">
                  <p className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>
                    Starting from £25-35 per user/month
                  </p>
                  <p className="text-gray-600">Volume discounts available</p>
                </div>
                
                <Button 
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-800 text-white font-semibold"
                  onClick={() => console.log('Requesting enterprise demo')}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
              40+ AI Systems
            </h3>
            <p className="text-gray-600">
              No competitor offers this level of AI integration for personalized learning
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
              VR OSCE Training
            </h3>
            <p className="text-gray-600">
              World's first VR clinical skills training for PLAB candidates
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
              95% Pass Rate
            </h3>
            <p className="text-gray-600">
              Our students achieve significantly higher PLAB pass rates
            </p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Risk-Free Investment in Your Medical Career
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">14-Day Free Trial</h4>
              <p className="text-blue-100">Experience the full platform before committing</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">30-Day Money Back</h4>
              <p className="text-blue-100">Not satisfied? Get a full refund, no questions asked</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Success Guarantee</h4>
              <p className="text-blue-100">Pass PLAB or get additional support at no cost</p>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
            onClick={() => console.log('Starting free trial')}
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </div>
    </div>
  );
}
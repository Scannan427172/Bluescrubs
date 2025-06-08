import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, ArrowRight, Users, Stethoscope, AlertTriangle, 
  CheckCircle, Book, Heart, Building2, Scale
} from "lucide-react";

export default function CulturalBridge() {
  const [selectedHomeCountry, setSelectedHomeCountry] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [comparisonType, setComparisonType] = useState<'protocols' | 'guidelines' | 'ethics' | 'practice'>('protocols');

  const homeCountries = [
    { code: 'IN', name: 'India', healthcare: 'Mixed Public-Private', regulation: 'MCI/NMC' },
    { code: 'PK', name: 'Pakistan', healthcare: 'Public-Private Mix', regulation: 'PMDC' },
    { code: 'BD', name: 'Bangladesh', healthcare: 'Government-NGO', regulation: 'BMDC' },
    { code: 'NG', name: 'Nigeria', healthcare: 'Federal-State', regulation: 'MDCN' },
    { code: 'EG', name: 'Egypt', healthcare: 'Public Insurance', regulation: 'MOH Egypt' },
    { code: 'MY', name: 'Malaysia', healthcare: 'Universal Coverage', regulation: 'MMC' },
    { code: 'PH', name: 'Philippines', healthcare: 'Social Insurance', regulation: 'PRC' },
    { code: 'LK', name: 'Sri Lanka', healthcare: 'Free Public', regulation: 'SLMC' }
  ];

  const medicalSpecialties = [
    'General Practice', 'Internal Medicine', 'Surgery', 'Paediatrics', 
    'Obstetrics & Gynaecology', 'Psychiatry', 'Emergency Medicine', 'Radiology'
  ];

  // Cultural medical practice differences database
  const culturalDifferences = {
    protocols: {
      'Hypertension Management': {
        UK: {
          guideline: 'NICE NG136',
          firstLine: 'ACE inhibitor or ARB',
          targetBP: '<140/90 (under 80), <150/90 (over 80)',
          monitoring: '6-monthly reviews',
          culturalNote: 'Patient autonomy emphasized'
        },
        India: {
          guideline: 'Indian Guidelines on Hypertension',
          firstLine: 'ACE inhibitor or CCB',
          targetBP: '<140/90 all ages',
          monitoring: 'Monthly initially',
          culturalNote: 'Family involvement in decisions'
        },
        differences: [
          'UK emphasizes patient choice; India involves family',
          'Different age-based targets in UK',
          'UK has structured recall systems',
          'Cost considerations differ significantly'
        ]
      },
      'Diabetes Type 2': {
        UK: {
          guideline: 'NICE NG28',
          firstLine: 'Metformin',
          targetHbA1c: '48mmol/mol (6.5%)',
          monitoring: 'Annual diabetic checks',
          culturalNote: 'Dietary advice culturally adapted'
        },
        Pakistan: {
          guideline: 'Pakistan Diabetes Guidelines',
          firstLine: 'Metformin',
          targetHbA1c: '<7%',
          monitoring: '3-monthly HbA1c',
          culturalNote: 'Ramadan considerations essential'
        },
        differences: [
          'UK uses mmol/mol units vs % in Pakistan',
          'Ramadan fasting requires special protocols',
          'Different dietary staples require adapted advice',
          'Access to continuous glucose monitoring varies'
        ]
      }
    },
    ethics: {
      'End of Life Care': {
        UK: {
          approach: 'Patient autonomy paramount',
          decisionMaker: 'Patient or valid proxy',
          withdrawal: 'Legal and accepted',
          documentation: 'Advanced directives honored',
          culturalNote: 'Individual rights focus'
        },
        Nigeria: {
          approach: 'Family-centered decisions',
          decisionMaker: 'Extended family elders',
          withdrawal: 'Culturally sensitive',
          documentation: 'Verbal agreements common',
          culturalNote: 'Community involvement expected'
        },
        differences: [
          'Individual vs collective decision-making',
          'Role of extended family vs nuclear family',
          'Religious considerations vary significantly',
          'Legal frameworks differ substantially'
        ]
      },
      'Mental Health': {
        UK: {
          approach: 'Bio-psycho-social model',
          stigma: 'Reducing but present',
          family: 'Confidentiality prioritized',
          treatment: 'Medication + talking therapies',
          culturalNote: 'Privacy and individual treatment'
        },
        Bangladesh: {
          approach: 'Often spiritual/religious lens',
          stigma: 'Significant societal stigma',
          family: 'Family heavily involved',
          treatment: 'Traditional + modern mix',
          culturalNote: 'Community and family-based care'
        },
        differences: [
          'Western vs traditional explanatory models',
          'Confidentiality vs family involvement',
          'Medication compliance cultural factors',
          'Role of religious/spiritual healing'
        ]
      }
    }
  };

  const practiceContexts = {
    'Patient Communication': {
      UK: [
        'Direct, honest communication expected',
        'Shared decision-making standard',
        'Written information provided',
        'Interpreter services available',
        'Patient feedback actively sought'
      ],
      International: [
        'Hierarchical doctor-patient relationship',
        'Family spokesperson common',
        'Oral tradition preferred',
        'Limited interpreter access',
        'Feedback culturally inappropriate'
      ]
    },
    'Healthcare System': {
      UK: [
        'Universal free healthcare (NHS)',
        'GP gatekeeper system',
        'Planned care pathways',
        'Evidence-based protocols',
        'Quality metrics driven'
      ],
      International: [
        'Mixed public-private systems',
        'Direct specialist access',
        'Resource-limited settings',
        'Experience-based practice',
        'Outcome measures limited'
      ]
    },
    'Professional Development': {
      UK: [
        'Mandatory CPD requirements',
        'Revalidation every 5 years',
        'Appraisal system',
        'Clinical governance',
        'Multidisciplinary teams'
      ],
      International: [
        'Variable CPD systems',
        'License renewal focus',
        'Hierarchical structures',
        'Individual responsibility',
        'Specialist-led care'
      ]
    }
  };

  const getSelectedComparison = () => {
    if (!selectedHomeCountry || !selectedSpecialty) return null;
    
    const homeCountryData = homeCountries.find(c => c.code === selectedHomeCountry);
    return {
      homeCountry: homeCountryData,
      specialty: selectedSpecialty,
      data: culturalDifferences[comparisonType]
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Cultural Medical Bridge</h1>
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            Industry Exclusive
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Navigate the differences between UK medical practice and your home country's healthcare system. 
          Understand cultural, ethical, and procedural variations to excel in the UK environment.
        </p>
      </div>

      {/* Selection Panel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Compare Medical Practices
          </CardTitle>
          <CardDescription>
            Select your background and area of interest to see detailed comparisons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Home Country</label>
              <Select value={selectedHomeCountry} onValueChange={setSelectedHomeCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {homeCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Medical Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {medicalSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Comparison Type</label>
              <Select value={comparisonType} onValueChange={(value: any) => setComparisonType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="protocols">Clinical Protocols</SelectItem>
                  <SelectItem value="guidelines">Guidelines</SelectItem>
                  <SelectItem value="ethics">Ethical Considerations</SelectItem>
                  <SelectItem value="practice">Practice Context</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                disabled={!selectedHomeCountry || !selectedSpecialty}
                className="w-full"
              >
                Compare
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {selectedHomeCountry && selectedSpecialty && (
        <div className="space-y-6">
          {/* Protocol Comparison */}
          {comparisonType === 'protocols' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(culturalDifferences.protocols).map(([condition, data]) => (
                <Card key={condition}>
                  <CardHeader>
                    <CardTitle className="text-lg">{condition}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">🇬🇧 UK Approach</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Guideline:</strong> {data.UK.guideline}</div>
                            <div><strong>First Line:</strong> {data.UK.firstLine}</div>
                            <div><strong>Target:</strong> {data.UK.targetBP || data.UK.targetHbA1c}</div>
                            <div><strong>Monitoring:</strong> {data.UK.monitoring}</div>
                          </div>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">
                            🌍 {homeCountries.find(c => c.code === selectedHomeCountry)?.name} Approach
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Guideline:</strong> {data.India?.guideline || data.Pakistan?.guideline}</div>
                            <div><strong>First Line:</strong> {data.India?.firstLine || data.Pakistan?.firstLine}</div>
                            <div><strong>Target:</strong> {data.India?.targetBP || data.India?.targetHbA1c || data.Pakistan?.targetHbA1c}</div>
                            <div><strong>Monitoring:</strong> {data.India?.monitoring || data.Pakistan?.monitoring}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Key Differences to Remember
                        </h4>
                        <ul className="text-sm space-y-1">
                          {data.differences.map((diff, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                              {diff}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Ethics Comparison */}
          {comparisonType === 'ethics' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(culturalDifferences.ethics).map(([topic, data]) => (
                <Card key={topic}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="w-5 h-5" />
                      {topic}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">🇬🇧 UK Approach</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Approach:</strong> {data.UK.approach}</div>
                            <div><strong>Decision Maker:</strong> {data.UK.decisionMaker}</div>
                            <div><strong>Cultural Note:</strong> {data.UK.culturalNote}</div>
                          </div>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">
                            🌍 Traditional Approach
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Approach:</strong> {data.Nigeria?.approach || data.Bangladesh?.approach}</div>
                            <div><strong>Decision Maker:</strong> {data.Nigeria?.decisionMaker || data.Bangladesh?.decisionMaker}</div>
                            <div><strong>Cultural Note:</strong> {data.Nigeria?.culturalNote || data.Bangladesh?.culturalNote}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Cultural Adaptation Tips
                        </h4>
                        <ul className="text-sm space-y-1">
                          {data.differences.map((diff, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                              {diff}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Practice Context */}
          {comparisonType === 'practice' && (
            <div className="grid gap-6">
              {Object.entries(practiceContexts).map(([context, data]) => (
                <Card key={context}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {context}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-3">🇬🇧 UK NHS Context</h4>
                        <ul className="space-y-2">
                          {data.UK.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-green-800 mb-3">🌍 International Context</h4>
                        <ul className="space-y-2">
                          {data.International.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Globe className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Access Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Cultural Competency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-3">
              Learn to navigate cultural differences in patient care, family involvement, and medical decision-making.
            </p>
            <Button variant="outline" size="sm" className="border-green-300">
              Explore Module
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Book className="w-5 h-5" />
              NHS Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 mb-3">
              Understand NICE guidelines, local protocols, and evidence-based practice in the UK healthcare system.
            </p>
            <Button variant="outline" size="sm" className="border-blue-300">
              Study Guidelines
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Medical Ethics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 mb-3">
              Navigate ethical dilemmas with UK-specific considerations for consent, confidentiality, and end-of-life care.
            </p>
            <Button variant="outline" size="sm" className="border-purple-300">
              Ethics Training
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
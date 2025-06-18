import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Volume2, BookOpen, Users, CheckCircle } from "lucide-react";

export default function LanguageDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧", speakers: "1.5B+" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", speakers: "420M+" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", speakers: "600M+" },
    { code: "ur", name: "Urdu", flag: "🇵🇰", speakers: "230M+" },
    { code: "bn", name: "Bengali", flag: "🇧🇩", speakers: "300M+" },
    { code: "es", name: "Spanish", flag: "🇪🇸", speakers: "500M+" },
    { code: "fr", name: "French", flag: "🇫🇷", speakers: "280M+" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹", speakers: "260M+" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", speakers: "1.1B+" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", speakers: "125M+" },
    { code: "ko", name: "Korean", flag: "🇰🇷", speakers: "77M+" },
    { code: "ru", name: "Russian", flag: "🇷🇺", speakers: "258M+" },
    { code: "de", name: "German", flag: "🇩🇪", speakers: "132M+" },
    { code: "it", name: "Italian", flag: "🇮🇹", speakers: "65M+" },
    { code: "tr", name: "Turkish", flag: "🇹🇷", speakers: "88M+" },
    { code: "pl", name: "Polish", flag: "🇵🇱", speakers: "45M+" },
    { code: "nl", name: "Dutch", flag: "🇳🇱", speakers: "24M+" },
    { code: "sv", name: "Swedish", flag: "🇸🇪", speakers: "10M+" },
    { code: "da", name: "Danish", flag: "🇩🇰", speakers: "6M+" },
    { code: "no", name: "Norwegian", flag: "🇳🇴", speakers: "5M+" },
    { code: "fi", name: "Finnish", flag: "🇫🇮", speakers: "5.5M+" },
    { code: "hu", name: "Hungarian", flag: "🇭🇺", speakers: "13M+" },
    { code: "cs", name: "Czech", flag: "🇨🇿", speakers: "10M+" },
    { code: "sk", name: "Slovak", flag: "🇸🇰", speakers: "5M+" },
    { code: "ro", name: "Romanian", flag: "🇷🇴", speakers: "24M+" },
    { code: "bg", name: "Bulgarian", flag: "🇧🇬", speakers: "9M+" },
    { code: "hr", name: "Croatian", flag: "🇭🇷", speakers: "5M+" },
    { code: "sr", name: "Serbian", flag: "🇷🇸", speakers: "12M+" },
    { code: "sl", name: "Slovenian", flag: "🇸🇮", speakers: "2.5M+" },
    { code: "et", name: "Estonian", flag: "🇪🇪", speakers: "1.1M+" },
    { code: "lv", name: "Latvian", flag: "🇱🇻", speakers: "1.9M+" },
    { code: "lt", name: "Lithuanian", flag: "🇱🇹", speakers: "3M+" },
    { code: "mt", name: "Maltese", flag: "🇲🇹", speakers: "520K+" },
    { code: "ga", name: "Irish", flag: "🇮🇪", speakers: "1.7M+" },
    { code: "cy", name: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", speakers: "580K+" },
    { code: "gd", name: "Scottish Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", speakers: "57K+" },
    { code: "eu", name: "Basque", flag: "🇪🇸", speakers: "750K+" },
    { code: "ca", name: "Catalan", flag: "🇪🇸", speakers: "10M+" }
  ];

  const features = [
    {
      icon: Globe,
      title: "37+ Languages Supported",
      description: "Complete PLAB preparation in your native language",
      details: "Full question banks, explanations, and study materials"
    },
    {
      icon: Volume2,
      title: "Audio Pronunciation",
      description: "Learn medical terminology with proper pronunciation",
      details: "Native speaker audio for medical terms in each language"
    },
    {
      icon: BookOpen,
      title: "Localized Content",
      description: "Medical knowledge adapted to your cultural context",
      details: "UK medical guidelines explained with cultural considerations"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers who speak your language",
      details: "Language-specific study groups and mentorship"
    }
  ];

  const sampleTranslations = {
    English: {
      question: "A 65-year-old man presents with chest pain. What is the most appropriate initial investigation?",
      options: ["ECG", "Chest X-ray", "Blood tests", "CT scan"],
      explanation: "An ECG should be performed immediately for any patient presenting with chest pain to rule out acute coronary syndrome."
    },
    Spanish: {
      question: "Un hombre de 65 años presenta dolor torácico. ¿Cuál es la investigación inicial más apropiada?",
      options: ["ECG", "Radiografía de tórax", "Análisis de sangre", "TC"],
      explanation: "Se debe realizar un ECG inmediatamente a cualquier paciente que presente dolor torácico para descartar síndrome coronario agudo."
    },
    Arabic: {
      question: "رجل يبلغ من العمر 65 عامًا يعاني من ألم في الصدر. ما هو الفحص الأولي الأنسب؟",
      options: ["تخطيط القلب", "أشعة الصدر", "فحوصات الدم", "الأشعة المقطعية"],
      explanation: "يجب إجراء تخطيط القلب فورًا لأي مريض يعاني من ألم في الصدر لاستبعاد متلازمة الشريان التاجي الحادة."
    },
    Hindi: {
      question: "65 वर्षीय व्यक्ति को सीने में दर्द है। सबसे उपयुक्त प्रारंभिक जांच क्या है?",
      options: ["ईसीजी", "छाती का एक्स-रे", "रक्त परीक्षण", "सीटी स्कैन"],
      explanation: "तीव्र कोरोनरी सिंड्रोम को खारिज करने के लिए सीने में दर्द के साथ आने वाले किसी भी रोगी के लिए तुरंत ईसीजी किया जाना चाहिए।"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Multilingual PLAB Preparation</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Study for PLAB exams in your native language. Our platform supports 37+ languages with 
            culturally adapted content and native-speaking medical professionals.
          </p>
        </div>

        {/* Language Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Choose Your Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select your preferred language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.name}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {lang.speakers}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                <p className="text-xs text-gray-500">{feature.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Question Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sample Question in {selectedLanguage}</CardTitle>
          </CardHeader>
          <CardContent>
            {sampleTranslations[selectedLanguage as keyof typeof sampleTranslations] ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-3">
                    {sampleTranslations[selectedLanguage as keyof typeof sampleTranslations].question}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleTranslations[selectedLanguage as keyof typeof sampleTranslations].options.map((option, index) => (
                      <Button key={index} variant="outline" className="justify-start">
                        {String.fromCharCode(65 + index)}. {option}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Explanation</span>
                  </div>
                  <p className="text-green-700">
                    {sampleTranslations[selectedLanguage as keyof typeof sampleTranslations].explanation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Sample translation coming soon for {selectedLanguage}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  All 37+ languages will have complete question banks and explanations
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supported Languages Grid */}
        <Card>
          <CardHeader>
            <CardTitle>All Supported Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {languages.map((lang) => (
                <div 
                  key={lang.code}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                    selectedLanguage === lang.name 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedLanguage(lang.name)}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-sm font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.speakers}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
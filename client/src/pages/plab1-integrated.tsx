import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home, Globe, Languages, Trophy, Crown, Medal
} from "lucide-react";
import { COMPREHENSIVE_FLASHCARD_COLLECTION, FLASHCARD_STATS, type Flashcard } from "@shared/high-yield-flashcards";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/hooks/useI18n";

// Simple leaderboard component with guaranteed readable text
const SimpleLeaderboard = () => {
  const { data: globalScoreboard, isLoading } = useQuery({
    queryKey: ["/api/scoreboard/global"],
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!globalScoreboard || !Array.isArray(globalScoreboard) || globalScoreboard.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No leaderboard data available
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-700">#{index + 1}</span>;
  };

  return (
    <div className="space-y-3">
      {globalScoreboard.slice(0, 10).map((user: any, index: number) => (
        <div
          key={user.id}
          className={`p-4 rounded-lg border ${
            index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white border-gray-200'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                {getRankIcon(index)}
              </div>
              
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-black truncate">{user.username}</span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {user.plabCategory?.toUpperCase() || 'PLAB1'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <span>{user.flagEmoji || '🌍'}</span>
                  <span className="truncate">{user.city || 'Unknown'}, {user.country || 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
              <div className="text-xl font-bold text-blue-700">{user.totalScore?.toLocaleString() || '0'}</div>
              <div className="text-sm font-semibold text-green-700">{user.accuracyRate || 0}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


// Official PLAB 1 Categories - No separate specialties, all integrated
const PLAB1_CATEGORIES = [
  "Medicine",
  "Surgery", 
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Psychiatry",
  "ENT, Ophthalmology, and Orthopaedics",
  "Medical ethics, law, and professionalism",
  "Emergency care",
  "Prescribing and drug interactions"
];

// Convert flashcards to PLAB 1 questions format
const generatePLAB1Questions = (category: string) => {
  return COMPREHENSIVE_FLASHCARD_COLLECTION
    .filter(card => card.category === category)
    .slice(0, 200) // Increased limit to show more questions
    .map((card, index) => ({
      id: `${category.toLowerCase().replace(/[^a-z]/g, '')}_${index + 1}`,
      category: category,
      stem: card.front.text,
      options: [
        card.back.text,
        ...card.back.keyPoints.slice(0, 3)
      ].slice(0, 4),
      correctAnswer: 0,
      explanation: card.back.explanation,
      difficulty: card.difficulty,
      tags: card.tags
    }));
};

// Calculate question counts for each category
const getCategoryQuestionCounts = () => {
  const counts: Record<string, number> = {};
  PLAB1_CATEGORIES.forEach(category => {
    counts[category] = COMPREHENSIVE_FLASHCARD_COLLECTION.filter(card => card.category === category).length;
  });
  return counts;
};

const categoryQuestionCounts = getCategoryQuestionCounts();

// Supported languages for international medical graduates
const SUPPORTED_LANGUAGES = {
  en: { name: "English", flag: "🇬🇧", code: "EN" },
  ar: { name: "Arabic", flag: "🇸🇦", code: "عربي" },
  ur: { name: "Urdu", flag: "🇵🇰", code: "اردو" },
  hi: { name: "Hindi", flag: "🇮🇳", code: "हिंदी" },
  bn: { name: "Bengali", flag: "🇧🇩", code: "বাংলা" },
  fr: { name: "French", flag: "🇫🇷", code: "FR" },
  es: { name: "Spanish", flag: "🇪🇸", code: "ES" },
  pt: { name: "Portuguese", flag: "🇵🇹", code: "PT" },
  de: { name: "German", flag: "🇩🇪", code: "DE" },
  ru: { name: "Russian", flag: "🇷🇺", code: "RU" },
  zh: { name: "Chinese", flag: "🇨🇳", code: "中文" },
  ja: { name: "Japanese", flag: "🇯🇵", code: "日本語" },
  ko: { name: "Korean", flag: "🇰🇷", code: "한국어" },
  tr: { name: "Turkish", flag: "🇹🇷", code: "TR" },
  fa: { name: "Persian", flag: "🇮🇷", code: "فارسی" },
  sw: { name: "Swahili", flag: "🇰🇪", code: "SW" },
  yo: { name: "Yoruba", flag: "🇳🇬", code: "YO" },
  ha: { name: "Hausa", flag: "🇳🇬", code: "HA" },
  am: { name: "Amharic", flag: "🇪🇹", code: "አማርኛ" },
  ta: { name: "Tamil", flag: "🇮🇳", code: "தமிழ்" },
};

// Medical terminology translations for multiple languages
const MEDICAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    "heart": "قلب", "patient": "مريض", "diagnosis": "تشخيص", "treatment": "علاج",
    "symptoms": "أعراض", "blood pressure": "ضغط الدم", "chest pain": "ألم في الصدر",
    "shortness of breath": "ضيق في التنفس", "fever": "حمى", "headache": "صداع",
    "What is the": "ما هو", "Which of the following": "أي مما يلي",
    "The most likely": "الأكثر احتمالا", "best treatment": "أفضل علاج",
    "Explanation": "شرح", "crushing central dolour thoracique radiating": "ألم صدري مركزي ضاغط ينتشر",
    "to left arm and jaw": "إلى الذراع الأيسر والفك", "ECG shows ST elevation": "تخطيط القلب يظهر ارتفاع ST",
    "leads II, III, aVF": "المشاوير II، III، aVF", "diagnostic and immediate management": "التشخيص والعلاج الفوري",
    "Inferior STEMI": "احتشاء عضلة القلب السفلي", "Primary PCI within 90 minutes": "التدخل التاجي الأولي خلال 90 دقيقة",
    "thrombolysis within 30 minutes": "إذابة الجلطة خلال 30 دقيقة", "Inferior leads": "المشاوير السفلية",
    "Usually RCA occlusion": "عادة انسداد الشريان التاجي الأيمن", "preferred": "مفضل"
  },
  ur: {
    "heart": "دل", "patient": "مریض", "diagnosis": "تشخیص", "treatment": "علاج",
    "symptoms": "علامات", "blood pressure": "بلڈ پریشر", "chest pain": "سینے میں درد",
    "fever": "بخار", "headache": "سر درد", "What is the": "کیا ہے",
    "Which of the following": "مندرجہ ذیل میں سے کون سا", "Explanation": "وضاحت"
  },
  hi: {
    "heart": "हृदय", "patient": "रोगी", "diagnosis": "निदान", "treatment": "इलाज",
    "symptoms": "लक्षण", "blood pressure": "रक्तचाप", "chest pain": "छाती में दर्द",
    "fever": "बुखार", "headache": "सिरदर्द", "What is the": "क्या है",
    "Which of the following": "निम्नलिखित में से कौन सा", "Explanation": "व्याख्या"
  },
  bn: {
    "heart": "হৃদয়", "patient": "রোগী", "diagnosis": "নির্ণয়", "treatment": "চিকিৎসা",
    "symptoms": "উপসর্গ", "blood pressure": "রক্তচাপ", "fever": "জ্বর",
    "headache": "মাথাব্যথা", "What is the": "কি", "Explanation": "ব্যাখ্যা"
  },
  fr: {
    "heart": "cœur", "patient": "patient", "diagnosis": "diagnostic", "treatment": "traitement",
    "symptoms": "symptômes", "blood pressure": "tension artérielle", "chest pain": "douleur thoracique",
    "fever": "fièvre", "headache": "mal de tête", "What is the": "Qu'est-ce que",
    "Which of the following": "Lequel des suivants", "Explanation": "Explication",
    "crushing central dolour thoracique radiating": "douleur thoracique centrale écrasante irradiant",
    "to left arm and jaw": "vers le bras gauche et la mâchoire", "ECG shows ST elevation": "ECG montre une élévation du ST",
    "leads II, III, aVF": "dérivations II, III, aVF", "diagnostic and immediate management": "diagnostic et prise en charge immédiate",
    "Inferior STEMI": "STEMI inférieur", "Primary PCI within 90 minutes": "ICP primaire dans les 90 minutes",
    "thrombolysis within 30 minutes": "thrombolyse dans les 30 minutes", "Inferior leads": "Dérivations inférieures",
    "Usually RCA occlusion": "Généralement occlusion de l'artère coronaire droite", "preferred": "préféré"
  },
  es: {
    "heart": "corazón", "patient": "paciente", "diagnosis": "diagnóstico", "treatment": "tratamiento",
    "symptoms": "síntomas", "blood pressure": "presión arterial", "chest pain": "dolor en el pecho",
    "fever": "fiebre", "headache": "dolor de cabeza", "What is the": "¿Cuál es",
    "Which of the following": "¿Cuál de los siguientes", "Explanation": "Explicación",
    "crushing central dolour thoracique radiating": "dolor torácico central aplastante que irradia",
    "to left arm and jaw": "al brazo izquierdo y mandíbula", "ECG shows ST elevation": "ECG muestra elevación del ST",
    "leads II, III, aVF": "derivaciones II, III, aVF", "diagnostic and immediate management": "diagnóstico y manejo inmediato",
    "Inferior STEMI": "STEMI inferior", "Primary PCI within 90 minutes": "ICP primario dentro de 90 minutos",
    "thrombolysis within 30 minutes": "trombólisis dentro de 30 minutos", "Inferior leads": "Derivaciones inferiores",
    "Usually RCA occlusion": "Usualmente oclusión de ACD", "preferred": "preferido"
  },
  de: {
    "heart": "Herz", "patient": "Patient", "diagnosis": "Diagnose", "treatment": "Behandlung",
    "symptoms": "Symptome", "blood pressure": "Blutdruck", "chest pain": "Brustschmerzen",
    "fever": "Fieber", "headache": "Kopfschmerzen", "What is the": "Was ist",
    "Which of the following": "Welche der folgenden", "Explanation": "Erklärung",
    "crushing central dolour thoracique radiating": "zentrale quetschende Brustschmerzen ausstrahlend",
    "to left arm and jaw": "in den linken Arm und Kiefer", "ECG shows ST elevation": "EKG zeigt ST-Hebung",
    "Inferior STEMI": "Hinterwand-STEMI", "Primary PCI within 90 minutes": "Primäre PCI innerhalb 90 Minuten",
    "preferred": "bevorzugt"
  },
  it: {
    "heart": "cuore", "patient": "paziente", "diagnosis": "diagnosi", "treatment": "trattamento",
    "symptoms": "sintomi", "blood pressure": "pressione sanguigna", "chest pain": "dolore al petto",
    "fever": "febbre", "headache": "mal di testa", "What is the": "Qual è",
    "Which of the following": "Quale dei seguenti", "Explanation": "Spiegazione",
    "crushing central dolour thoracique radiating": "dolore toracico centrale schiacciante irradiante",
    "to left arm and jaw": "al braccio sinistro e mascella", "ECG shows ST elevation": "ECG mostra elevazione ST",
    "Inferior STEMI": "STEMI inferiore", "Primary PCI within 90 minutes": "PCI primaria entro 90 minuti",
    "preferred": "preferito"
  },
  pt: {
    "heart": "coração", "patient": "paciente", "diagnosis": "diagnóstico", "treatment": "tratamento",
    "symptoms": "sintomas", "blood pressure": "pressão arterial", "chest pain": "dor no peito",
    "fever": "febre", "headache": "dor de cabeça", "What is the": "Qual é",
    "Which of the following": "Qual dos seguintes", "Explanation": "Explicação",
    "crushing central dolour thoracique radiating": "dor torácica central esmagadora irradiando",
    "to left arm and jaw": "para braço esquerdo e mandíbula", "ECG shows ST elevation": "ECG mostra elevação ST",
    "Inferior STEMI": "STEMI inferior", "Primary PCI within 90 minutes": "ICP primária em 90 minutos",
    "preferred": "preferido"
  },
  zh: {
    "heart": "心脏", "patient": "患者", "diagnosis": "诊断", "treatment": "治疗",
    "symptoms": "症状", "blood pressure": "血压", "chest pain": "胸痛",
    "fever": "发热", "headache": "头痛", "What is the": "什么是",
    "Which of the following": "以下哪项", "Explanation": "解释",
    "crushing central dolour thoracique radiating": "压榨性中央胸痛放射至",
    "to left arm and jaw": "左臂和下颌", "ECG shows ST elevation": "心电图显示ST段抬高",
    "Inferior STEMI": "下壁STEMI", "Primary PCI within 90 minutes": "90分钟内原发PCI",
    "preferred": "首选"
  },
  ja: {
    "heart": "心臓", "patient": "患者", "diagnosis": "診断", "treatment": "治療",
    "symptoms": "症状", "blood pressure": "血圧", "chest pain": "胸痛",
    "fever": "発熱", "headache": "頭痛", "What is the": "何ですか",
    "Which of the following": "次のうちどれ", "Explanation": "説明",
    "crushing central dolour thoracique radiating": "圧迫性中央胸痛が放散する",
    "to left arm and jaw": "左腕と顎に", "ECG shows ST elevation": "心電図でST上昇を認める",
    "Inferior STEMI": "下壁STEMI", "Primary PCI within 90 minutes": "90分以内のプライマリーPCI",
    "preferred": "推奨"
  },
  ko: {
    "heart": "심장", "patient": "환자", "diagnosis": "진단", "treatment": "치료",
    "symptoms": "증상", "blood pressure": "혈압", "chest pain": "흉통",
    "fever": "발열", "headache": "두통", "What is the": "무엇입니까",
    "Which of the following": "다음 중 어느 것", "Explanation": "설명",
    "crushing central dolour thoracique radiating": "압박성 중앙 흉통이 방사되는",
    "to left arm and jaw": "왼쪽 팔과 턱으로", "ECG shows ST elevation": "심전도에서 ST 상승 보임",
    "Inferior STEMI": "하벽 STEMI", "Primary PCI within 90 minutes": "90분 내 일차 PCI",
    "preferred": "선호"
  },
  ru: {
    "heart": "сердце", "patient": "пациент", "diagnosis": "диагноз", "treatment": "лечение",
    "symptoms": "симптомы", "blood pressure": "артериальное давление", "chest pain": "боль в груди",
    "fever": "лихорадка", "headache": "головная боль", "What is the": "Что такое",
    "Which of the following": "Что из следующего", "Explanation": "Объяснение",
    "crushing central dolour thoracique radiating": "давящая центральная боль в груди иррадиирующая",
    "to left arm and jaw": "в левую руку и челюсть", "ECG shows ST elevation": "ЭКГ показывает подъем ST",
    "Inferior STEMI": "Нижний ИМпST", "Primary PCI within 90 minutes": "Первичное ЧКВ в течение 90 минут",
    "preferred": "предпочтительный"
  },
  tr: {
    "heart": "kalp", "patient": "hasta", "diagnosis": "tanı", "treatment": "tedavi",
    "symptoms": "semptomlar", "blood pressure": "kan basıncı", "chest pain": "göğüs ağrısı",
    "fever": "ateş", "headache": "baş ağrısı", "What is the": "Nedir",
    "Which of the following": "Aşağıdakilerden hangisi", "Explanation": "Açıklama",
    "crushing central dolour thoracique radiating": "ezici merkezi göğüs ağrısı yayılan",
    "to left arm and jaw": "sol kol ve çeneye", "ECG shows ST elevation": "EKG ST yükselmesi gösteriyor",
    "Inferior STEMI": "Alt duvar STEMI", "Primary PCI within 90 minutes": "90 dakika içinde primer PCI",
    "preferred": "tercih edilen"
  },
  pl: {
    "heart": "serce", "patient": "pacjent", "diagnosis": "diagnoza", "treatment": "leczenie",
    "symptoms": "objawy", "blood pressure": "ciśnienie krwi", "chest pain": "ból w klatce piersiowej",
    "fever": "gorączka", "headache": "ból głowy", "What is the": "Co to jest",
    "Which of the following": "Które z poniższych", "Explanation": "Wyjaśnienie",
    "crushing central dolour thoracique radiating": "miażdżący centralny ból w klatce piersiowej promieniujący",
    "to left arm and jaw": "do lewej ręki i szczęki", "ECG shows ST elevation": "EKG pokazuje uniesienie ST",
    "Inferior STEMI": "Dolny STEMI", "Primary PCI within 90 minutes": "Pierwotne PCI w ciągu 90 minut",
    "preferred": "preferowany"
  },
  nl: {
    "heart": "hart", "patient": "patiënt", "diagnosis": "diagnose", "treatment": "behandeling",
    "symptoms": "symptomen", "blood pressure": "bloeddruk", "chest pain": "pijn op de borst",
    "fever": "koorts", "headache": "hoofdpijn", "What is the": "Wat is",
    "Which of the following": "Welke van de volgende", "Explanation": "Uitleg",
    "crushing central dolour thoracique radiating": "knellende centrale borstpijn uitstralend",
    "to left arm and jaw": "naar linkerarm en kaak", "ECG shows ST elevation": "ECG toont ST-elevatie",
    "Inferior STEMI": "Inferieure STEMI", "Primary PCI within 90 minutes": "Primaire PCI binnen 90 minuten",
    "preferred": "geprefereerd"
  },
  sv: {
    "heart": "hjärta", "patient": "patient", "diagnosis": "diagnos", "treatment": "behandling",
    "symptoms": "symtom", "blood pressure": "blodtryck", "chest pain": "bröstsmärta",
    "fever": "feber", "headache": "huvudvärk", "What is the": "Vad är",
    "Which of the following": "Vilken av följande", "Explanation": "Förklaring",
    "crushing central dolour thoracique radiating": "krossande central bröstsmärta utstrålande",
    "to left arm and jaw": "till vänster arm och käke", "ECG shows ST elevation": "EKG visar ST-höjning",
    "Inferior STEMI": "Inferior STEMI", "Primary PCI within 90 minutes": "Primär PCI inom 90 minuter",
    "preferred": "föredragen"
  },
  th: {
    "heart": "หัวใจ", "patient": "ผู้ป่วย", "diagnosis": "การวินิจฉัย", "treatment": "การรักษา",
    "symptoms": "อาการ", "blood pressure": "ความดันโลหิต", "chest pain": "เจ็บหน้าอก",
    "fever": "ไข้", "headache": "ปวดหัว", "What is the": "อะไรคือ",
    "Which of the following": "ข้อใดต่อไปนี้", "Explanation": "คำอธิบาย",
    "crushing central dolour thoracique radiating": "อาการเจ็บหน้าอกกดทับกลางลามไป",
    "to left arm and jaw": "แขนซ้ายและขากรรไกร", "ECG shows ST elevation": "EKG แสดง ST elevation",
    "Inferior STEMI": "Inferior STEMI", "Primary PCI within 90 minutes": "Primary PCI ภายใน 90 นาที",
    "preferred": "ที่ต้องการ"
  },
  vi: {
    "heart": "tim", "patient": "bệnh nhân", "diagnosis": "chẩn đoán", "treatment": "điều trị",
    "symptoms": "triệu chứng", "blood pressure": "huyết áp", "chest pain": "đau ngực",
    "fever": "sốt", "headache": "đau đầu", "What is the": "Cái gì là",
    "Which of the following": "Cái nào sau đây", "Explanation": "Giải thích",
    "crushing central dolour thoracique radiating": "đau ngực trung tâm nghiền nát lan tỏa",
    "to left arm and jaw": "đến cánh tay trái và hàm", "ECG shows ST elevation": "ECG cho thấy ST elevation",
    "Inferior STEMI": "STEMI dưới", "Primary PCI within 90 minutes": "PCI chính trong 90 phút",
    "preferred": "ưa thích"
  },
  fa: {
    "heart": "قلب", "patient": "بیمار", "diagnosis": "تشخیص", "treatment": "درمان",
    "symptoms": "علائم", "blood pressure": "فشار خون", "chest pain": "درد قفسه سینه",
    "fever": "تب", "headache": "سردرد", "What is the": "چیست",
    "Which of the following": "کدام یک از موارد زیر", "Explanation": "توضیح",
    "crushing central dolour thoracique radiating": "درد شدید مرکزی قفسه سینه که منتشر می‌شود",
    "to left arm and jaw": "به بازوی چپ و فک", "ECG shows ST elevation": "ECG نشان دهنده بالا رفتن ST",
    "Inferior STEMI": "STEMI تحتانی", "Primary PCI within 90 minutes": "PCI اولیه در 90 دقیقه",
    "preferred": "ترجیح داده شده"
  },
  no: {
    "heart": "hjerte", "patient": "pasient", "diagnosis": "diagnose", "treatment": "behandling",
    "symptoms": "symptomer", "blood pressure": "blodtrykk", "chest pain": "brystsmerter",
    "fever": "feber", "headache": "hodepine", "What is the": "Hva er",
    "Which of the following": "Hvilken av følgende", "Explanation": "Forklaring",
    "crushing central dolour thoracique radiating": "knusende sentral brystsmerte som stråler",
    "to left arm and jaw": "til venstre arm og kjeve", "ECG shows ST elevation": "EKG viser ST-elevering",
    "Inferior STEMI": "Inferior STEMI", "Primary PCI within 90 minutes": "Primær PCI innen 90 minutter",
    "preferred": "foretrukket"
  },
  da: {
    "heart": "hjerte", "patient": "patient", "diagnosis": "diagnose", "treatment": "behandling",
    "symptoms": "symptomer", "blood pressure": "blodtryk", "chest pain": "brystsmerter",
    "fever": "feber", "headache": "hovedpine", "What is the": "Hvad er",
    "Which of the following": "Hvilken af følgende", "Explanation": "Forklaring",
    "crushing central dolour thoracique radiating": "knusende central brystsmerte udstrålende",
    "to left arm and jaw": "til venstre arm og kæbe", "ECG shows ST elevation": "EKG viser ST-elevation",
    "Inferior STEMI": "Inferior STEMI", "Primary PCI within 90 minutes": "Primær PCI inden 90 minutter",
    "preferred": "foretrukket"
  },
  fi: {
    "heart": "sydän", "patient": "potilas", "diagnosis": "diagnoosi", "treatment": "hoito",
    "symptoms": "oireet", "blood pressure": "verenpaine", "chest pain": "rintakipu",
    "fever": "kuume", "headache": "päänsärky", "What is the": "Mikä on",
    "Which of the following": "Mikä seuraavista", "Explanation": "Selitys",
    "crushing central dolour thoracique radiating": "murskaava keskimerkkinen rintakipu säteilee",
    "to left arm and jaw": "vasempaan käteen ja leukaan", "ECG shows ST elevation": "EKG näyttää ST-nousu",
    "Inferior STEMI": "Alainen STEMI", "Primary PCI within 90 minutes": "Ensisijainen PCI 90 minuutissa",
    "preferred": "suositeltava"
  },
  el: {
    "heart": "καρδιά", "patient": "ασθενής", "diagnosis": "διάγνωση", "treatment": "θεραπεία",
    "symptoms": "συμπτώματα", "blood pressure": "αρτηριακή πίεση", "chest pain": "πόνος στο στήθος",
    "fever": "πυρετός", "headache": "πονοκέφαλος", "What is the": "Τι είναι",
    "Which of the following": "Ποιο από τα παρακάτω", "Explanation": "Εξήγηση",
    "crushing central dolour thoracique radiating": "συνθλιπτικός κεντρικός θωρακικός πόνος που ακτινοβολεί",
    "to left arm and jaw": "στο αριστερό χέρι και γνάθο", "ECG shows ST elevation": "ΗΚΓ δείχνει ανύψωση ST",
    "Inferior STEMI": "Κατώτερο STEMI", "Primary PCI within 90 minutes": "Πρωτογενής PCI εντός 90 λεπτών",
    "preferred": "προτιμώμενο"
  },
  he: {
    "heart": "לב", "patient": "מטופל", "diagnosis": "אבחנה", "treatment": "טיפול",
    "symptoms": "תסמינים", "blood pressure": "לחץ דם", "chest pain": "כאב חזה",
    "fever": "חום", "headache": "כאב ראש", "What is the": "מה זה",
    "Which of the following": "איזה מהבאים", "Explanation": "הסבר",
    "crushing central dolour thoracique radiating": "כאב חזה מרכזי מועך המקרין",
    "to left arm and jaw": "לזרוע שמאל ולסנטר", "ECG shows ST elevation": "אק״ג מראה עליית ST",
    "Inferior STEMI": "STEMI תחתון", "Primary PCI within 90 minutes": "PCI ראשוני תוך 90 דקות",
    "preferred": "מועדף"
  },
  id: {
    "heart": "jantung", "patient": "pasien", "diagnosis": "diagnosis", "treatment": "pengobatan",
    "symptoms": "gejala", "blood pressure": "tekanan darah", "chest pain": "nyeri dada",
    "fever": "demam", "headache": "sakit kepala", "What is the": "Apa itu",
    "Which of the following": "Manakah dari berikut ini", "Explanation": "Penjelasan",
    "crushing central dolour thoracique radiating": "nyeri dada sentral yang menghancurkan menyebar",
    "to left arm and jaw": "ke lengan kiri dan rahang", "ECG shows ST elevation": "EKG menunjukkan elevasi ST",
    "Inferior STEMI": "STEMI Inferior", "Primary PCI within 90 minutes": "PCI primer dalam 90 menit",
    "preferred": "disukai"
  },
  ms: {
    "heart": "jantung", "patient": "pesakit", "diagnosis": "diagnosis", "treatment": "rawatan",
    "symptoms": "simptom", "blood pressure": "tekanan darah", "chest pain": "sakit dada",
    "fever": "demam", "headache": "sakit kepala", "What is the": "Apakah",
    "Which of the following": "Yang manakah antara berikut", "Explanation": "Penjelasan",
    "crushing central dolour thoracique radiating": "sakit dada pusat yang menghancurkan memancar",
    "to left arm and jaw": "ke lengan kiri dan rahang", "ECG shows ST elevation": "EKG menunjukkan peningkatan ST",
    "Inferior STEMI": "STEMI Inferior", "Primary PCI within 90 minutes": "PCI primer dalam 90 minit",
    "preferred": "dikehendaki"
  },
  tl: {
    "heart": "puso", "patient": "pasyente", "diagnosis": "diagnosis", "treatment": "paggamot",
    "symptoms": "mga sintomas", "blood pressure": "presyon ng dugo", "chest pain": "pananakit ng dibdib",
    "fever": "lagnat", "headache": "sakit ng ulo", "What is the": "Ano ang",
    "Which of the following": "Alin sa mga sumusunod", "Explanation": "Paliwanag",
    "crushing central dolour thoracique radiating": "nakakadugong gitnang pananakit ng dibdib na kumakalat",
    "to left arm and jaw": "sa kaliwang braso at panga", "ECG shows ST elevation": "ECG nagpapakita ng ST elevation",
    "Inferior STEMI": "Inferior STEMI", "Primary PCI within 90 minutes": "Primary PCI sa loob ng 90 minuto",
    "preferred": "mas gusto"
  },
  sw: {
    "heart": "moyo", "patient": "mgonjwa", "diagnosis": "utambuzi", "treatment": "matibabu",
    "symptoms": "dalili", "blood pressure": "shinikizo la damu", "chest pain": "maumivu ya kifua",
    "fever": "homa", "headache": "maumivu ya kichwa", "What is the": "Ni nini",
    "Which of the following": "Ni ipi kati ya zifuatazo", "Explanation": "Maelezo",
    "crushing central dolour thoracique radiating": "maumivu makali ya kati ya kifua yanayoenea",
    "to left arm and jaw": "kwenye mkono wa kushoto na taya", "ECG shows ST elevation": "ECG inaonyesha kupanda kwa ST",
    "Inferior STEMI": "STEMI ya chini", "Primary PCI within 90 minutes": "PCI ya msingi ndani ya dakika 90",
    "preferred": "inayopendelewa"
  },
  am: {
    "heart": "ልብ", "patient": "ታካሚ", "diagnosis": "ምርመራ", "treatment": "ህክምና",
    "symptoms": "ምልክቶች", "blood pressure": "የደም ግፊት", "chest pain": "የደረት ህመም",
    "fever": "ትኩሳት", "headache": "የራስ ምታት", "What is the": "ምንድነው",
    "Which of the following": "ከሚከተሉት ውስጥ የቱ", "Explanation": "ማብራሪያ",
    "crushing central dolour thoracique radiating": "የሚያሰቃይ መሃከለኛ የደረት ህመም የሚሰራጭ",
    "to left arm and jaw": "ወደ ግራ እጅ እና መንጋጋ", "ECG shows ST elevation": "ኢሲጂ የST ከፍታ ያሳያል",
    "Inferior STEMI": "የታች STEMI", "Primary PCI within 90 minutes": "በ90 ደቂቃ ውስጥ ቀዳሚ PCI",
    "preferred": "የተመረጠ"
  }
};

// Enhanced translation function with better pattern matching
const translateText = (text: string, targetLang: string): string => {
  if (targetLang === "en" || !text) return text;
  
  const translations = MEDICAL_TRANSLATIONS[targetLang];
  if (!translations) return text;
  
  let translated = text;
  
  // Sort translations by length (longest first) to avoid partial replacements
  const sortedTranslations = Object.entries(translations)
    .sort(([a], [b]) => b.length - a.length);
  
  sortedTranslations.forEach(([english, native]) => {
    // Use word boundaries and case-insensitive matching
    const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translated = translated.replace(regex, native);
  });
  
  return translated;
};

export default function PLAB1Integrated() {
  const [localLanguage, setLocalLanguage] = useState<string>("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Generate questions based on selected category
  const questions = selectedCategory === "all" 
    ? PLAB1_CATEGORIES.flatMap(cat => generatePLAB1Questions(cat)).slice(0, 200)
    : generatePLAB1Questions(selectedCategory);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    // Start timer on first answer selection
    if (!sessionStarted) {
      setSessionStarted(true);
      setIsActive(true);
    }
    
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    setShowExplanation(true);
  };

  const uploadToLeaderboard = async (finalScore: number, timeSpent: number) => {
    try {
      const response = await fetch('/api/scoreboard/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Current user
          category: selectedCategory,
          score: finalScore,
          timeSpent,
          questionsAnswered: Object.keys(userAnswers).length + 1,
          accuracy: Math.round((finalScore / (Object.keys(userAnswers).length + 1)) * 100)
        }),
      });
      
      if (response.ok) {
        console.log('Score uploaded to leaderboard successfully');
      }
    } catch (error) {
      console.error('Failed to upload score:', error);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Stop timer and upload to leaderboard when finishing last question
      setIsActive(false);
      const finalScore = score.correct + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      await uploadToLeaderboard(finalScore, timeElapsed);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[questions[currentQuestionIndex - 1].id] || null);
      setShowExplanation(!!userAnswers[questions[currentQuestionIndex - 1].id]);
    }
  };

  const getScore = () => {
    const answered = Object.keys(userAnswers).length;
    const correct = Object.entries(userAnswers).filter(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      return question && answer === question.correctAnswer;
    }).length;
    return { answered, correct, total: questions.length };
  };

  const score = getScore();

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">PLAB 1 Practice</h1>
          <p className="text-gray-700">Select a category to begin practice</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB 1 Practice</h1>
          <p className="text-gray-700 font-medium">Practice questions based on GMC Medical Licensing Assessment guidelines</p>
        </div>

        {/* Practice Configuration */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="bg-white">
            <CardTitle className="text-gray-900">Practice Configuration</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="mb-2 block text-gray-700 font-medium">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select category" className="text-gray-900" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="all" className="text-gray-900 hover:bg-gray-100">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-gray-900">All Categories</span>
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">{COMPREHENSIVE_FLASHCARD_COLLECTION.length}</Badge>
                      </div>
                    </SelectItem>
                    {PLAB1_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category} className="text-gray-900 hover:bg-gray-100">
                        <div className="flex justify-between items-center w-full">
                          <span className="truncate text-gray-900">{category}</span>
                          <Badge variant="outline" className="ml-2 border-gray-300 text-gray-700">{categoryQuestionCounts[category] || 0}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end gap-2">
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "destructive" : "default"}
                >
                  {isActive ? 'Pause' : 'Start'} Timer
                </Button>
                <Button 
                  onClick={() => {
                    setTimeElapsed(0);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">{currentQuestion.category}</Badge>
                <Badge className={
                  currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              
              {/* Language translator in question block */}
              <div className="flex items-center gap-2 relative">
                <Languages className="w-4 h-4 text-gray-500" />
                <Select value={localLanguage} onValueChange={setLocalLanguage}>
                  <SelectTrigger className="w-32 h-8 text-xs border-gray-200 hover:border-blue-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end" className="w-48 max-h-60">
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                    <SelectItem value="pt">🇵🇹 Português</SelectItem>
                    <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
                    <SelectItem value="ur">🇵🇰 اردو</SelectItem>
                    <SelectItem value="bn">🇧🇩 বাংলা</SelectItem>
                    <SelectItem value="zh">🇨🇳 中文</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                    <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                    <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                    <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                    <SelectItem value="pl">🇵🇱 Polski</SelectItem>
                    <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
                    <SelectItem value="sv">🇸🇪 Svenska</SelectItem>
                    <SelectItem value="no">🇳🇴 Norsk</SelectItem>
                    <SelectItem value="da">🇩🇰 Dansk</SelectItem>
                    <SelectItem value="fi">🇫🇮 Suomi</SelectItem>
                    <SelectItem value="el">🇬🇷 Ελληνικά</SelectItem>
                    <SelectItem value="he">🇮🇱 עברית</SelectItem>
                    <SelectItem value="fa">🇮🇷 فارسی</SelectItem>
                    <SelectItem value="th">🇹🇭 ไทย</SelectItem>
                    <SelectItem value="vi">🇻🇳 Tiếng Việt</SelectItem>
                    <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
                    <SelectItem value="ms">🇲🇾 Bahasa Melayu</SelectItem>
                    <SelectItem value="tl">🇵🇭 Filipino</SelectItem>
                    <SelectItem value="sw">🇰🇪 Kiswahili</SelectItem>
                    <SelectItem value="am">🇪🇹 አማርኛ</SelectItem>
                  </SelectContent>
                </Select>
                {localLanguage !== 'en' && (
                  <div className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded font-medium">
                    ON
                  </div>
                )}
              </div>
            </div>
            <CardTitle className="text-xl leading-relaxed text-gray-900">
              {localLanguage === "en" ? (
                currentQuestion.stem
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-900">{currentQuestion.stem}</div>
                  <div className="text-gray-600 text-base font-normal italic">{translateText(currentQuestion.stem, localLanguage)}</div>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50'
                    : selectedAnswer === index
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-900 font-medium">
                    {localLanguage === "en" ? (
                      `${String.fromCharCode(65 + index)}. ${option}`
                    ) : (
                      <div className="space-y-1">
                        <div>{String.fromCharCode(65 + index)}. {option}</div>
                        <div className="text-gray-600 text-sm font-normal italic ml-4">{translateText(option, localLanguage)}</div>
                      </div>
                    )}
                  </Label>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {showExplanation && (
              <div className="mt-6 p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {localLanguage === "en" ? 'Explanation' : `Explanation / ${translateText('Explanation', localLanguage)}`}
                </h4>
                {localLanguage === "en" ? (
                  <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                    <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-300 pl-3">{translateText(currentQuestion.explanation, localLanguage)}</p>
                  </div>
                )}
                {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {currentQuestion.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Progress and Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-6 mb-6">
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-blue-600">{currentQuestionIndex + 1}</div>
              <p className="text-sm text-gray-700">of {questions.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
              <p className="text-sm text-gray-700">Correct</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-orange-600">
                {score.answered > 0 ? Math.round((score.correct / score.answered) * 100) : 0}%
              </div>
              <p className="text-sm text-gray-700">Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-purple-600">{formatTime(timeElapsed)}</div>
              <p className="text-sm text-gray-700">Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
        </div>

        {/* Final Results */}
        {currentQuestionIndex === questions.length - 1 && showExplanation && (
          <Card className="mt-6 bg-white shadow-lg">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Award className="w-6 h-6 text-yellow-500" />
                Practice Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{score.correct}/{score.total}</div>
                  <p className="text-gray-700">Questions Correct</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((score.correct / score.total) * 100)}%
                  </div>
                  <p className="text-gray-700">Overall Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{formatTime(timeElapsed)}</div>
                  <p className="text-gray-700">Total Time</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={(score.correct / score.total) * 100} className="h-3" />
                <p className="text-center mt-2 text-sm text-gray-700 font-medium">
                  {score.correct / score.total >= 0.7 ? 'Excellent work! You\'re ready for PLAB 1.' :
                   score.correct / score.total >= 0.5 ? 'Good progress! Keep practicing to improve.' :
                   'More practice needed. Focus on weak areas.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 10 Global Leaderboard */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  Top 10 Global Leaders
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = '/global-scoreboard'}
                  className="gap-2"
                >
                  <Globe className="w-4 h-4" />
                  View Global Leaderboard
                </Button>
              </div>
              <CardDescription>
                See how you rank against medical students worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleLeaderboard />
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
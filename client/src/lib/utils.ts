import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    "all": "🏥",
    "cardiovascular": "❤️",
    "infectious-diseases": "🦠",
    "respiratory": "🫁",
    "gastrointestinal": "🦠",
    "gastroenterology": "🦠",
    "neurology": "🧠",
    "endocrinology": "⚡",
    "psychiatry": "🧘",
    "obstetrics-gynaecology": "👶",
    "paediatrics": "🧸",
    "surgery": "🔪",
    "emergency-medicine": "🚨",
    "rheumatology": "🦴",
    "dermatology": "🫧", // Fixed: Using skin/soap bubble icon instead of eye
    "ophthalmology": "👁️",
    "ent": "👂",
    "pharmacology": "💊",
    "ethics-law": "⚖️",
    "nephrology": "🫘",
    "haematology": "🩸",
    "public-health": "🏛️",
    "clinical-pharmacology": "⚗️"
  };
  
  return iconMap[category.toLowerCase()] || "📋";
}

export function getDifficultyColor(difficulty: string): string {
  const colorMap: Record<string, string> = {
    "basic": "bg-green-500",
    "intermediate": "bg-yellow-500", 
    "advanced": "bg-blue-600" // PLAB standard
  };
  
  return colorMap[difficulty.toLowerCase()] || "bg-gray-500";
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

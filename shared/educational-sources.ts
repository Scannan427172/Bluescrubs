export interface EducationalSource {
  id: string;
  title: string;
  url: string;
  type: "nhs" | "guideline" | "educational" | "government" | "bmj";
  categories: string[];
  description?: string;
}

// Centralized educational source database
export const EDUCATIONAL_SOURCES: Record<string, EducationalSource> = {
  // NHS Sources
  "nhs-heart-attack": {
    id: "nhs-heart-attack",
    title: "NHS - Heart attack (myocardial infarction)",
    url: "https://www.nhs.uk/conditions/heart-attack/",
    type: "nhs",
    categories: ["cardiovascular", "emergency"]
  },
  "nhs-heart-failure": {
    id: "nhs-heart-failure",
    title: "NHS - Heart failure overview",
    url: "https://www.nhs.uk/conditions/heart-failure/",
    type: "nhs",
    categories: ["cardiovascular"]
  },
  "nhs-arrhythmia": {
    id: "nhs-arrhythmia",
    title: "NHS - Heart rhythm problems (arrhythmias)",
    url: "https://www.nhs.uk/conditions/arrhythmia/",
    type: "nhs",
    categories: ["cardiovascular"]
  },
  "nhs-asthma": {
    id: "nhs-asthma",
    title: "NHS - Asthma overview",
    url: "https://www.nhs.uk/conditions/asthma/",
    type: "nhs",
    categories: ["respiratory"]
  },
  "nhs-pneumonia": {
    id: "nhs-pneumonia",
    title: "NHS - Pneumonia overview",
    url: "https://www.nhs.uk/conditions/pneumonia/",
    type: "nhs",
    categories: ["respiratory"]
  },
  "nhs-diabetes": {
    id: "nhs-diabetes",
    title: "NHS - Type 2 diabetes overview",
    url: "https://www.nhs.uk/conditions/type-2-diabetes/",
    type: "nhs",
    categories: ["endocrinology"]
  },
  "nhs-depression": {
    id: "nhs-depression",
    title: "NHS - Clinical depression (depression in adults)",
    url: "https://www.nhs.uk/mental-health/conditions/clinical-depression/",
    type: "nhs",
    categories: ["psychiatry"]
  },
  "nhs-stroke": {
    id: "nhs-stroke",
    title: "NHS - Stroke symptoms and causes",
    url: "https://www.nhs.uk/conditions/stroke/",
    type: "nhs",
    categories: ["neurology"]
  },
  "nhs-peptic-ulcer": {
    id: "nhs-peptic-ulcer",
    title: "NHS - Stomach ulcer (peptic ulcer)",
    url: "https://www.nhs.uk/conditions/stomach-ulcer/",
    type: "nhs",
    categories: ["gastroenterology"]
  },
  "nhs-appendicitis": {
    id: "nhs-appendicitis",
    title: "NHS - Appendicitis",
    url: "https://www.nhs.uk/conditions/appendicitis/",
    type: "nhs",
    categories: ["surgery"]
  },
  "nhs-gallstones": {
    id: "nhs-gallstones",
    title: "NHS - Gallstones",
    url: "https://www.nhs.uk/conditions/gallstones/",
    type: "nhs",
    categories: ["surgery", "gastroenterology"]
  },
  "nhs-hernia": {
    id: "nhs-hernia",
    title: "NHS - Inguinal hernia",
    url: "https://www.nhs.uk/conditions/inguinal-hernia/",
    type: "nhs",
    categories: ["surgery"]
  },
  "nhs-measles": {
    id: "nhs-measles",
    title: "NHS - Measles",
    url: "https://www.nhs.uk/conditions/measles/",
    type: "nhs",
    categories: ["paediatrics", "infectious-diseases"]
  },
  "nhs-pregnancy-bleeding": {
    id: "nhs-pregnancy-bleeding",
    title: "NHS - Bleeding during pregnancy",
    url: "https://www.nhs.uk/pregnancy/related-conditions/complications/bleeding/",
    type: "nhs",
    categories: ["obstetrics-gynaecology"]
  },

  // NICE Guidelines
  "nice-mi": {
    id: "nice-mi",
    title: "NICE Guidelines - Myocardial infarction",
    url: "https://www.nice.org.uk/guidance/cg167",
    type: "guideline",
    categories: ["cardiovascular"]
  },
  "nice-heart-failure": {
    id: "nice-heart-failure",
    title: "NICE Guidelines - Chronic heart failure in adults",
    url: "https://www.nice.org.uk/guidance/cg108",
    type: "guideline",
    categories: ["cardiovascular"]
  },
  "nice-asthma": {
    id: "nice-asthma",
    title: "NICE Guidelines - Asthma diagnosis and monitoring",
    url: "https://www.nice.org.uk/guidance/ng80",
    type: "guideline",
    categories: ["respiratory"]
  },
  "nice-pneumonia": {
    id: "nice-pneumonia",
    title: "NICE Guidelines - Pneumonia (community-acquired)",
    url: "https://www.nice.org.uk/guidance/cg191",
    type: "guideline",
    categories: ["respiratory"]
  },
  "nice-diabetes": {
    id: "nice-diabetes",
    title: "NICE Guidelines - Type 2 diabetes in adults",
    url: "https://www.nice.org.uk/guidance/ng28",
    type: "guideline",
    categories: ["endocrinology"]
  },
  "nice-depression": {
    id: "nice-depression",
    title: "NICE Guidelines - Depression in adults",
    url: "https://www.nice.org.uk/guidance/cg90",
    type: "guideline",
    categories: ["psychiatry"]
  },
  "nice-stroke": {
    id: "nice-stroke",
    title: "NICE Guidelines - Stroke and transient ischaemic attack",
    url: "https://www.nice.org.uk/guidance/cg68",
    type: "guideline",
    categories: ["neurology"]
  },
  "nice-dyspepsia": {
    id: "nice-dyspepsia",
    title: "NICE Guidelines - Dyspepsia and GORD",
    url: "https://www.nice.org.uk/guidance/cg184",
    type: "guideline",
    categories: ["gastroenterology"]
  },
  "nice-appendicitis": {
    id: "nice-appendicitis",
    title: "NICE Guidelines - Appendicitis",
    url: "https://www.nice.org.uk/guidance/cg141",
    type: "guideline",
    categories: ["surgery"]
  },
  "nice-gallstones": {
    id: "nice-gallstones",
    title: "NICE Guidelines - Gallstone disease",
    url: "https://www.nice.org.uk/guidance/cg188",
    type: "guideline",
    categories: ["surgery", "gastroenterology"]
  },
  "nice-hernia": {
    id: "nice-hernia",
    title: "NICE Guidelines - Inguinal hernia management",
    url: "https://www.nice.org.uk/guidance/cg138",
    type: "guideline",
    categories: ["surgery"]
  },

  // Educational Charities
  "bhf-heart-attack": {
    id: "bhf-heart-attack",
    title: "British Heart Foundation - Heart attack information",
    url: "https://www.bhf.org.uk/informationsupport/conditions/heart-attack",
    type: "educational",
    categories: ["cardiovascular"]
  },
  "bhf-heart-failure": {
    id: "bhf-heart-failure",
    title: "British Heart Foundation - Heart failure information",
    url: "https://www.bhf.org.uk/informationsupport/conditions/heart-failure",
    type: "educational",
    categories: ["cardiovascular"]
  },
  "bhf-arrhythmia": {
    id: "bhf-arrhythmia",
    title: "British Heart Foundation - Heart rhythm disorders",
    url: "https://www.bhf.org.uk/informationsupport/conditions/arrhythmias",
    type: "educational",
    categories: ["cardiovascular"]
  },
  "asthma-lung-uk": {
    id: "asthma-lung-uk",
    title: "Asthma + Lung UK - Educational resources",
    url: "https://www.asthmaandlung.org.uk/",
    type: "educational",
    categories: ["respiratory"]
  },
  "blf-pneumonia": {
    id: "blf-pneumonia",
    title: "British Lung Foundation - Pneumonia information",
    url: "https://www.blf.org.uk/support-for-you/pneumonia",
    type: "educational",
    categories: ["respiratory"]
  },
  "diabetes-uk": {
    id: "diabetes-uk",
    title: "Diabetes UK - Educational resources",
    url: "https://www.diabetes.org.uk/",
    type: "educational",
    categories: ["endocrinology"]
  },
  "mind-depression": {
    id: "mind-depression",
    title: "Mind - Mental health charity resources",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/",
    type: "educational",
    categories: ["psychiatry"]
  },
  "stroke-association": {
    id: "stroke-association",
    title: "Stroke Association - Educational resources",
    url: "https://www.stroke.org.uk/",
    type: "educational",
    categories: ["neurology"]
  },
  "patient-info-peptic": {
    id: "patient-info-peptic",
    title: "Patient.info - Peptic ulcers",
    url: "https://patient.info/digestive-health/dyspepsia-indigestion/peptic-ulcers",
    type: "educational",
    categories: ["gastroenterology"]
  },
  "patient-info-appendicitis": {
    id: "patient-info-appendicitis",
    title: "Patient.info - Acute appendicitis",
    url: "https://patient.info/digestive-health/appendicitis",
    type: "educational",
    categories: ["surgery"]
  },
  "patient-info-gallbladder": {
    id: "patient-info-gallbladder",
    title: "Patient.info - Gallbladder and bile duct problems",
    url: "https://patient.info/digestive-health/gallstones-and-bile-problems",
    type: "educational",
    categories: ["surgery", "gastroenterology"]
  },
  "patient-info-hernia": {
    id: "patient-info-hernia",
    title: "Patient.info - Inguinal hernia",
    url: "https://patient.info/digestive-health/abdominal-pain/inguinal-hernia",
    type: "educational",
    categories: ["surgery"]
  },

  // Government Sources
  "resus-council": {
    id: "resus-council",
    title: "Resuscitation Council UK - Guidelines",
    url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines",
    type: "government",
    categories: ["cardiovascular", "emergency"]
  },
  "gov-measles": {
    id: "gov-measles",
    title: "Gov.UK - Measles: guidance and data",
    url: "https://www.gov.uk/government/collections/measles-guidance-data-and-analysis",
    type: "government",
    categories: ["paediatrics", "infectious-diseases", "public-health"]
  },
  "nhs-mmr": {
    id: "nhs-mmr",
    title: "NHS - MMR vaccine",
    url: "https://www.nhs.uk/conditions/vaccinations/mmr-vaccine/",
    type: "nhs",
    categories: ["paediatrics", "public-health"]
  },

  // BMJ Best Practice Sources
  "bmj-acute-mi": {
    id: "bmj-acute-mi",
    title: "BMJ Best Practice - Acute myocardial infarction",
    url: "https://bestpractice.bmj.com/topics/en-us/3000022",
    type: "bmj",
    categories: ["cardiovascular", "emergency"],
    description: "Evidence-based diagnosis and management of acute MI"
  },
  "bmj-heart-failure": {
    id: "bmj-heart-failure",
    title: "BMJ Best Practice - Heart failure",
    url: "https://bestpractice.bmj.com/topics/en-us/3000032",
    type: "bmj",
    categories: ["cardiovascular"],
    description: "Comprehensive approach to heart failure management"
  },
  "bmj-atrial-fibrillation": {
    id: "bmj-atrial-fibrillation",
    title: "BMJ Best Practice - Atrial fibrillation",
    url: "https://bestpractice.bmj.com/topics/en-us/3000098",
    type: "bmj",
    categories: ["cardiovascular"],
    description: "AF diagnosis, anticoagulation, and rhythm management"
  },
  "bmj-asthma": {
    id: "bmj-asthma",
    title: "BMJ Best Practice - Asthma",
    url: "https://bestpractice.bmj.com/topics/en-us/3000097",
    type: "bmj",
    categories: ["respiratory"],
    description: "Evidence-based asthma diagnosis and treatment"
  },
  "bmj-pneumonia": {
    id: "bmj-pneumonia",
    title: "BMJ Best Practice - Community-acquired pneumonia",
    url: "https://bestpractice.bmj.com/topics/en-us/3000148",
    type: "bmj",
    categories: ["respiratory", "infectious-diseases"],
    description: "CAP assessment, severity scoring, and antibiotic selection"
  },
  "bmj-copd": {
    id: "bmj-copd",
    title: "BMJ Best Practice - COPD",
    url: "https://bestpractice.bmj.com/topics/en-us/3000069",
    type: "bmj",
    categories: ["respiratory"],
    description: "COPD diagnosis, spirometry interpretation, and management"
  },
  "bmj-diabetes-t2": {
    id: "bmj-diabetes-t2",
    title: "BMJ Best Practice - Type 2 diabetes mellitus",
    url: "https://bestpractice.bmj.com/topics/en-us/3000107",
    type: "bmj",
    categories: ["endocrinology"],
    description: "T2DM diagnosis, HbA1c targets, and medication algorithms"
  },
  "bmj-hypothyroidism": {
    id: "bmj-hypothyroidism",
    title: "BMJ Best Practice - Hypothyroidism",
    url: "https://bestpractice.bmj.com/topics/en-us/3000114",
    type: "bmj",
    categories: ["endocrinology"],
    description: "Thyroid function testing and levothyroxine therapy"
  },
  "bmj-depression": {
    id: "bmj-depression",
    title: "BMJ Best Practice - Depression",
    url: "https://bestpractice.bmj.com/topics/en-us/3000101",
    type: "bmj",
    categories: ["psychiatry"],
    description: "Depression screening, risk assessment, and treatment algorithms"
  },
  "bmj-stroke": {
    id: "bmj-stroke",
    title: "BMJ Best Practice - Acute ischaemic stroke",
    url: "https://bestpractice.bmj.com/topics/en-us/3000124",
    type: "bmj",
    categories: ["neurology", "emergency"],
    description: "Acute stroke protocols, thrombolysis, and secondary prevention"
  },
  "bmj-peptic-ulcer": {
    id: "bmj-peptic-ulcer",
    title: "BMJ Best Practice - Peptic ulcer disease",
    url: "https://bestpractice.bmj.com/topics/en-us/3000146",
    type: "bmj",
    categories: ["gastroenterology"],
    description: "H. pylori testing, PPI therapy, and ulcer complications"
  },
  "bmj-appendicitis": {  
    id: "bmj-appendicitis",
    title: "BMJ Best Practice - Acute appendicitis",
    url: "https://bestpractice.bmj.com/topics/en-us/3000025",
    type: "bmj",
    categories: ["surgery", "emergency"],
    description: "Appendicitis diagnosis, imaging, and surgical management"
  },
  "bmj-cholecystitis": {
    id: "bmj-cholecystitis",
    title: "BMJ Best Practice - Acute cholecystitis",
    url: "https://bestpractice.bmj.com/topics/en-us/3000043",
    type: "bmj",
    categories: ["surgery", "gastroenterology"],
    description: "Gallbladder inflammation diagnosis and laparoscopic surgery"
  },
  "bmj-inguinal-hernia": {
    id: "bmj-inguinal-hernia",
    title: "BMJ Best Practice - Inguinal hernia",
    url: "https://bestpractice.bmj.com/topics/en-us/3000116",
    type: "bmj",
    categories: ["surgery"],
    description: "Hernia examination, surgical techniques, and mesh repair"
  }
};

// Question-to-source mapping for efficient lookups
export const QUESTION_SOURCE_MAP: Record<string, string[]> = {
  // Cardiovascular - using actual question IDs from the bank
  "cv001": ["nhs-heart-attack", "nice-mi", "bhf-heart-attack"],
  "cardio001": ["nhs-heart-attack", "nice-mi", "bhf-heart-attack"],
  "cardio002": ["nhs-heart-failure", "nice-heart-failure", "bhf-heart-failure"],
  "cardio004": ["nhs-arrhythmia", "resus-council", "bhf-arrhythmia"],
  
  // Respiratory
  "resp001": ["nhs-asthma", "nice-asthma", "asthma-lung-uk"],
  "resp002": ["nhs-pneumonia", "nice-pneumonia", "blf-pneumonia"],
  "resp003": ["nhs-asthma", "nice-asthma", "asthma-lung-uk"],
  
  // Gastroenterology
  "gi001": ["nhs-peptic-ulcer", "nice-dyspepsia", "patient-info-peptic"],
  "gastro001": ["nhs-peptic-ulcer", "nice-dyspepsia", "patient-info-peptic"],
  
  // Neurology
  "neuro001": ["nhs-stroke", "nice-stroke", "stroke-association"],
  "neuro002": ["nhs-stroke", "nice-stroke", "stroke-association"],
  
  // Endocrinology
  "endo001": ["nhs-diabetes", "nice-diabetes", "diabetes-uk"],
  
  // Psychiatry
  "psych001": ["nhs-depression", "nice-depression", "mind-depression"],
  
  // Obstetrics & Gynaecology
  "obsgyn001": ["nhs-pregnancy-bleeding"],
  
  // Paediatrics
  "paeds001": ["nhs-measles", "gov-measles", "nhs-mmr"],
  
  // Surgery
  "surg001": ["nhs-appendicitis", "nice-appendicitis", "patient-info-appendicitis"],
  "surg002": ["nhs-gallstones", "nice-gallstones", "patient-info-gallbladder"],
  "surg003": ["nhs-hernia", "nice-hernia", "patient-info-hernia"]
};

// Helper function to get sources for a question
export function getSourcesForQuestion(questionId: string): EducationalSource[] {
  const sourceIds = QUESTION_SOURCE_MAP[questionId] || [];
  return sourceIds.map(id => EDUCATIONAL_SOURCES[id]).filter(Boolean);
}

// Helper function to get sources by category
export function getSourcesByCategory(category: string): EducationalSource[] {
  return Object.values(EDUCATIONAL_SOURCES)
    .filter(source => source.categories.includes(category));
}
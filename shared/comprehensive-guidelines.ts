// Comprehensive Medical Guidelines Integration
// All major UK and international medical authorities

export interface GuidelineAuthority {
  id: string;
  name: string;
  fullName: string;
  type: 'UK_National' | 'UK_Specialty' | 'UK_Regulatory' | 'International' | 'European' | 'US_Major';
  url: string;
  description: string;
  specialties: string[];
  priority: 'Primary' | 'Secondary' | 'Reference';
}

export const MEDICAL_GUIDELINES: GuidelineAuthority[] = [
  // UK National Guidelines
  {
    id: 'nice',
    name: 'NICE',
    fullName: 'National Institute for Health and Care Excellence',
    type: 'UK_National',
    url: 'https://www.nice.org.uk',
    description: 'Primary UK clinical guidelines, technology appraisals, and quality standards',
    specialties: ['All medical specialties'],
    priority: 'Primary'
  },
  {
    id: 'cks',
    name: 'CKS',
    fullName: 'Clinical Knowledge Summaries',
    type: 'UK_National',
    url: 'https://cks.nice.org.uk',
    description: 'Practical clinical guidance for primary care professionals',
    specialties: ['Primary Care', 'General Practice'],
    priority: 'Primary'
  },
  {
    id: 'sign',
    name: 'SIGN',
    fullName: 'Scottish Intercollegiate Guidelines Network',
    type: 'UK_National',
    url: 'https://www.sign.ac.uk',
    description: 'Evidence-based clinical practice guidelines for Scotland and UK',
    specialties: ['All medical specialties'],
    priority: 'Primary'
  },

  // UK Specialty Medical Societies
  {
    id: 'bts',
    name: 'BTS',
    fullName: 'British Thoracic Society',
    type: 'UK_Specialty',
    url: 'https://www.brit-thoracic.org.uk',
    description: 'Respiratory medicine guidelines and standards',
    specialties: ['Respiratory Medicine', 'Pulmonology'],
    priority: 'Primary'
  },
  {
    id: 'rcog',
    name: 'RCOG',
    fullName: 'Royal College of Obstetricians and Gynaecologists',
    type: 'UK_Specialty',
    url: 'https://www.rcog.org.uk',
    description: 'Women\'s health, obstetrics and gynaecology guidelines',
    specialties: ['Obstetrics', 'Gynaecology', 'Women\'s Health'],
    priority: 'Primary'
  },
  {
    id: 'rcpch',
    name: 'RCPCH',
    fullName: 'Royal College of Paediatrics and Child Health',
    type: 'UK_Specialty',
    url: 'https://www.rcpch.ac.uk',
    description: 'Paediatric medicine guidelines and child health standards',
    specialties: ['Paediatrics', 'Child Health'],
    priority: 'Primary'
  },
  {
    id: 'rcpsych',
    name: 'RCPsych',
    fullName: 'Royal College of Psychiatrists',
    type: 'UK_Specialty',
    url: 'https://www.rcpsych.ac.uk',
    description: 'Mental health and psychiatric treatment guidelines',
    specialties: ['Psychiatry', 'Mental Health'],
    priority: 'Primary'
  },
  {
    id: 'bsg',
    name: 'BSG',
    fullName: 'British Society of Gastroenterology',
    type: 'UK_Specialty',
    url: 'https://www.bsg.org.uk',
    description: 'Gastroenterology and hepatology clinical guidelines',
    specialties: ['Gastroenterology', 'Hepatology'],
    priority: 'Primary'
  },
  {
    id: 'bhs',
    name: 'BHS',
    fullName: 'British Hypertension Society',
    type: 'UK_Specialty',
    url: 'https://bihsoc.org',
    description: 'Hypertension management and cardiovascular guidelines',
    specialties: ['Cardiology', 'Hypertension'],
    priority: 'Primary'
  },
  {
    id: 'bsr',
    name: 'BSR',
    fullName: 'British Society for Rheumatology',
    type: 'UK_Specialty',
    url: 'https://www.rheumatology.org.uk',
    description: 'Rheumatology and musculoskeletal disease guidelines',
    specialties: ['Rheumatology', 'Musculoskeletal'],
    priority: 'Primary'
  },

  // UK Regulatory Bodies
  {
    id: 'gmc',
    name: 'GMC',
    fullName: 'General Medical Council',
    type: 'UK_Regulatory',
    url: 'https://www.gmc-uk.org',
    description: 'Medical ethics, professional standards and guidance',
    specialties: ['Medical Ethics', 'Professional Practice'],
    priority: 'Primary'
  },
  {
    id: 'mhra',
    name: 'MHRA',
    fullName: 'Medicines and Healthcare products Regulatory Agency',
    type: 'UK_Regulatory',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    description: 'Drug safety, medical device regulation and guidance',
    specialties: ['Pharmacology', 'Drug Safety'],
    priority: 'Primary'
  },
  {
    id: 'dvla',
    name: 'DVLA',
    fullName: 'Driver and Vehicle Licensing Agency',
    type: 'UK_Regulatory',
    url: 'https://www.gov.uk/dvla',
    description: 'Medical standards for driving and fitness to drive guidelines',
    specialties: ['Occupational Health', 'Neurology'],
    priority: 'Secondary'
  },
  {
    id: 'ukhsa',
    name: 'UKHSA',
    fullName: 'UK Health Security Agency',
    type: 'UK_Regulatory',
    url: 'https://www.gov.uk/government/organisations/uk-health-security-agency',
    description: 'Infectious diseases, public health and emergency preparedness',
    specialties: ['Infectious Diseases', 'Public Health'],
    priority: 'Primary'
  },

  // European Guidelines
  {
    id: 'esc',
    name: 'ESC',
    fullName: 'European Society of Cardiology',
    type: 'European',
    url: 'https://www.escardio.org',
    description: 'European cardiovascular disease guidelines and standards',
    specialties: ['Cardiology', 'Cardiovascular Medicine'],
    priority: 'Primary'
  },
  {
    id: 'easd',
    name: 'EASD',
    fullName: 'European Association for the Study of Diabetes',
    type: 'European',
    url: 'https://www.easd.org',
    description: 'European diabetes management and research guidelines',
    specialties: ['Endocrinology', 'Diabetes'],
    priority: 'Primary'
  },
  {
    id: 'ehra',
    name: 'EHRA',
    fullName: 'European Heart Rhythm Association',
    type: 'European',
    url: 'https://www.escardio.org/Sub-specialty-communities/European-Heart-Rhythm-Association-(EHRA)',
    description: 'Cardiac arrhythmia and electrophysiology guidelines',
    specialties: ['Cardiology', 'Electrophysiology'],
    priority: 'Primary'
  },
  {
    id: 'esh',
    name: 'ESH',
    fullName: 'European Society of Hypertension',
    type: 'European',
    url: 'https://www.eshonline.org',
    description: 'European hypertension management guidelines',
    specialties: ['Cardiology', 'Hypertension'],
    priority: 'Primary'
  },
  {
    id: 'esmo',
    name: 'ESMO',
    fullName: 'European Society for Medical Oncology',
    type: 'European',
    url: 'https://www.esmo.org',
    description: 'European cancer treatment and oncology guidelines',
    specialties: ['Oncology', 'Haematology'],
    priority: 'Primary'
  },
  {
    id: 'eular',
    name: 'EULAR',
    fullName: 'European Alliance of Associations for Rheumatology',
    type: 'European',
    url: 'https://www.eular.org',
    description: 'European rheumatology and autoimmune disease guidelines',
    specialties: ['Rheumatology', 'Immunology'],
    priority: 'Primary'
  },
  {
    id: 'ecdc',
    name: 'ECDC',
    fullName: 'European Centre for Disease Prevention and Control',
    type: 'European',
    url: 'https://www.ecdc.europa.eu',
    description: 'European infectious disease surveillance and control',
    specialties: ['Infectious Diseases', 'Public Health'],
    priority: 'Secondary'
  },

  // Major US Guidelines (Used Internationally)
  {
    id: 'ada',
    name: 'ADA',
    fullName: 'American Diabetes Association',
    type: 'US_Major',
    url: 'https://www.diabetes.org',
    description: 'Diabetes care standards and clinical practice recommendations',
    specialties: ['Endocrinology', 'Diabetes'],
    priority: 'Primary'
  },
  {
    id: 'asco',
    name: 'ASCO',
    fullName: 'American Society of Clinical Oncology',
    type: 'US_Major',
    url: 'https://www.asco.org',
    description: 'Oncology treatment guidelines and cancer care standards',
    specialties: ['Oncology', 'Haematology'],
    priority: 'Primary'
  },
  {
    id: 'nccn',
    name: 'NCCN',
    fullName: 'National Comprehensive Cancer Network',
    type: 'US_Major',
    url: 'https://www.nccn.org',
    description: 'Comprehensive cancer treatment guidelines and protocols',
    specialties: ['Oncology', 'Haematology'],
    priority: 'Primary'
  },
  {
    id: 'kdigo',
    name: 'KDIGO',
    fullName: 'Kidney Disease: Improving Global Outcomes',
    type: 'International',
    url: 'https://kdigo.org',
    description: 'Global kidney disease management guidelines',
    specialties: ['Nephrology', 'Renal Medicine'],
    priority: 'Primary'
  },
  {
    id: 'ats',
    name: 'ATS',
    fullName: 'American Thoracic Society',
    type: 'US_Major',
    url: 'https://www.thoracic.org',
    description: 'Pulmonary and critical care medicine guidelines',
    specialties: ['Respiratory Medicine', 'Critical Care'],
    priority: 'Primary'
  },
  {
    id: 'gold',
    name: 'GOLD',
    fullName: 'Global Initiative for Chronic Obstructive Lung Disease',
    type: 'International',
    url: 'https://goldcopd.org',
    description: 'Global COPD diagnosis and management guidelines',
    specialties: ['Respiratory Medicine', 'COPD'],
    priority: 'Primary'
  },
  {
    id: 'gina',
    name: 'GINA',
    fullName: 'Global Initiative for Asthma',
    type: 'International',
    url: 'https://ginasthma.org',
    description: 'Global asthma management and prevention guidelines',
    specialties: ['Respiratory Medicine', 'Asthma'],
    priority: 'Primary'
  },
  {
    id: 'acr',
    name: 'ACR',
    fullName: 'American College of Rheumatology',
    type: 'US_Major',
    url: 'https://www.rheumatology.org',
    description: 'Rheumatology treatment guidelines and recommendations',
    specialties: ['Rheumatology', 'Autoimmune Diseases'],
    priority: 'Primary'
  },
  {
    id: 'idsa',
    name: 'IDSA',
    fullName: 'Infectious Diseases Society of America',
    type: 'US_Major',
    url: 'https://www.idsociety.org',
    description: 'Infectious disease treatment and antimicrobial guidelines',
    specialties: ['Infectious Diseases', 'Antimicrobial Stewardship'],
    priority: 'Primary'
  },

  // International/WHO
  {
    id: 'who',
    name: 'WHO',
    fullName: 'World Health Organization',
    type: 'International',
    url: 'https://www.who.int',
    description: 'Global health guidelines and disease management standards',
    specialties: ['Public Health', 'Global Medicine'],
    priority: 'Reference'
  }
];

export function getGuidelinesBySpecialty(specialty: string): GuidelineAuthority[] {
  return MEDICAL_GUIDELINES.filter(guideline => 
    guideline.specialties.some(s => 
      s.toLowerCase().includes(specialty.toLowerCase()) || 
      specialty.toLowerCase().includes(s.toLowerCase()) ||
      s === 'All medical specialties'
    )
  ).sort((a, b) => {
    // Sort by priority: Primary first, then Secondary, then Reference
    const priorityOrder = { 'Primary': 0, 'Secondary': 1, 'Reference': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function getUKPrimaryGuidelines(): GuidelineAuthority[] {
  return MEDICAL_GUIDELINES.filter(g => 
    g.type === 'UK_National' || 
    (g.type === 'UK_Specialty' && g.priority === 'Primary')
  );
}

export function getInternationalGuidelines(): GuidelineAuthority[] {
  return MEDICAL_GUIDELINES.filter(g => 
    g.type === 'European' || 
    g.type === 'International' || 
    (g.type === 'US_Major' && g.priority === 'Primary')
  );
}

export function getGuidelineById(id: string): GuidelineAuthority | undefined {
  return MEDICAL_GUIDELINES.find(g => g.id === id);
}

// Mapping for question generation to ensure comprehensive guideline coverage
export const SPECIALTY_GUIDELINE_MAP: Record<string, string[]> = {
  'cardiology': ['nice', 'esc', 'bhs', 'ehra', 'esh'],
  'respiratory': ['nice', 'bts', 'ats', 'gold', 'gina'],
  'endocrinology': ['nice', 'ada', 'easd'],
  'oncology': ['nice', 'esmo', 'asco', 'nccn'],
  'rheumatology': ['nice', 'bsr', 'eular', 'acr'],
  'nephrology': ['nice', 'kdigo'],
  'infectious_diseases': ['nice', 'ukhsa', 'idsa', 'ecdc'],
  'gastroenterology': ['nice', 'bsg'],
  'obstetrics_gynaecology': ['nice', 'rcog'],
  'paediatrics': ['nice', 'rcpch'],
  'psychiatry': ['nice', 'rcpsych'],
  'general': ['nice', 'cks', 'sign', 'gmc']
};
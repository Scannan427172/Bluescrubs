import fs from 'fs';

// Load all comprehensive stations
const allStations = JSON.parse(fs.readFileSync('comprehensive-osce-stations.json', 'utf8'));
console.log(`Total stations loaded: ${allStations.length}`);

// Define exam types and their proportions
const examTypes = {
  'USMLE': { target: 650, country: 'USA', suffix: 'usmle' },
  'AMC': { target: 550, country: 'Australia', suffix: 'amc' },
  'MCCQE': { target: 500, country: 'Canada', suffix: 'mccqe' },
  'SCHS': { target: 400, country: 'Saudi Arabia', suffix: 'schs' },
  'DHA': { target: 400, country: 'UAE', suffix: 'dha' },
  'HAAD': { target: 350, country: 'UAE', suffix: 'haad' }
};

// Distribute stations across exam types
let stationIndex = 0;
for (const [examType, config] of Object.entries(examTypes)) {
  const examStations = [];
  
  for (let i = 0; i < config.target && stationIndex < allStations.length; i++) {
    const station = { ...allStations[stationIndex] };
    
    // Add exam-specific metadata
    station.exam_specific = {
      exam_type: examType,
      country: config.country,
      duration: "8 minutes",
      difficulty: station.difficulty || "Intermediate"
    };
    
    // Update guideline links for country-specific context
    if (examType === 'USMLE') {
      station.guideline_links = {
        "AHA/ACC": "https://www.acc.org/guidelines",
        "CDC": "https://www.cdc.gov/healthcare",
        "FDA": "https://www.fda.gov/drugs",
        "USPSTF": "https://www.uspreventiveservicestaskforce.org"
      };
    } else if (examType === 'AMC') {
      station.guideline_links = {
        "TGA": "https://www.tga.gov.au",
        "NHMRC": "https://www.nhmrc.gov.au",
        "RACGP": "https://www.racgp.org.au",
        "Therapeutic Guidelines": "https://tgldcdp.tg.org.au"
      };
    } else if (examType === 'MCCQE') {
      station.guideline_links = {
        "Health Canada": "https://www.canada.ca/en/health-canada",
        "CCS": "https://www.ccs.ca",
        "CPSO": "https://www.cpso.on.ca",
        "Medical Council of Canada": "https://mcc.ca"
      };
    } else if (examType === 'DHA' || examType === 'HAAD') {
      station.guideline_links = {
        "UAE Ministry of Health": "https://www.mohap.gov.ae",
        "DHA Guidelines": "https://www.dha.gov.ae",
        "WHO Eastern Mediterranean": "https://www.who.int/emergencies",
        "GCC Health Guidelines": "https://www.gcc-sg.org"
      };
    } else if (examType === 'SCHS') {
      station.guideline_links = {
        "Saudi MOH": "https://www.moh.gov.sa",
        "SCHS": "https://www.scfhs.org.sa",
        "Saudi FDA": "https://www.sfda.gov.sa",
        "Saudi Heart Association": "https://sha.org.sa"
      };
    }
    
    examStations.push(station);
    stationIndex++;
  }
  
  // Save to exam-specific file
  const filename = `generated-${config.suffix}-stations.json`;
  fs.writeFileSync(filename, JSON.stringify(examStations, null, 2));
  console.log(`Created ${filename} with ${examStations.length} stations`);
}

// Save remaining stations as additional PLAB stations if any
if (stationIndex < allStations.length) {
  const remainingStations = allStations.slice(stationIndex).map(station => ({
    ...station,
    exam_specific: {
      exam_type: 'PLAB',
      country: 'UK',
      duration: "8 minutes", 
      difficulty: station.difficulty || "Intermediate"
    }
  }));
  
  fs.writeFileSync('generated-plab-additional.json', JSON.stringify(remainingStations, null, 2));
  console.log(`Created additional PLAB file with ${remainingStations.length} stations`);
}

console.log('\nInternational exam station distribution complete!');
console.log('Files created:');
Object.values(examTypes).forEach(config => {
  console.log(`- generated-${config.suffix}-stations.json`);
});
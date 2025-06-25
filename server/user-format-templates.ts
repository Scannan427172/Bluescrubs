export const userFormatTemplates = [
  {
    "station_type": "History Taking",
    "scenario_title": "Chest Pain in a 54-Year-Old Male",
    "brief": "You are in GP surgery. A 54-year-old man presents with chest pain. Take a relevant history.",
    "actor_script": {
      "opening": "Doctor, I've been having this chest discomfort for two days.",
      "details": "Pain is central, pressure-like, radiates to left arm. Worse with exertion. Smoker. Family history of MI.",
      "hidden_info": "Pain started while walking upstairs, relieved with rest. No previous episodes."
    },
    "mark_scheme": [
      "Introduces self and confirms identity",
      "Clarifies SOCRATES pain features",
      "Asks about red flags (e.g. breathlessness, syncope)",
      "Screens for cardiac risk factors",
      "ICE (Ideas, Concerns, Expectations)",
      "Summarises history",
      "Safety nets and seeks help"
    ],
    "mnemonic": "SOCRATES + ICE",
    "communication_notes": "Empathise about pain, acknowledge fear of heart issues",
    "guideline_links": {
      "NICE": "https://www.nice.org.uk/guidance/cg95/chapter/Recommendations",
      "BNF": "https://bnf.nice.org.uk/drug/glyceryl-trinitrate.html",
      "RCGP": "https://www.rcgp.org.uk/clinical-and-research/resources/toolkits/chest-pain-toolkit.aspx"
    }
  },
  {
    "station_type": "Ethics / Consent",
    "scenario_title": "Refusal of Blood Transfusion",
    "brief": "A patient with a bleeding duodenal ulcer refuses a blood transfusion for religious reasons. Explain their options.",
    "actor_script": {
      "opening": "I don't want any blood products, doctor.",
      "details": "Jehovah's Witness. Wants treatment but no blood. Anxious about dying but firm in beliefs.",
      "hidden_info": "Would accept volume expanders or alternatives if safe."
    },
    "mark_scheme": [
      "Clarifies understanding and confirms capacity",
      "Explains condition and consequences of refusing transfusion",
      "Explores beliefs respectfully",
      "Uses BRAN (Benefits, Risks, Alternatives, Nothing)",
      "Documents decision and offers ongoing care"
    ],
    "mnemonic": "BRAN + CURB (Capacity: Understand, Retain, Balance, Communicate)",
    "communication_notes": "Non-judgemental, calm, supportive",
    "guideline_links": {
      "GMC": "https://www.gmc-uk.org/ethical-guidance/ethical-hub/refusing-treatment",
      "NHS": "https://www.nhs.uk/conditions/refusing-consent-to-treatment/",
      "RCGP": "https://www.rcgp.org.uk/clinical-and-research/resources/toolkits/end-of-life-care-toolkit.aspx"
    }
  },
  {
    "station_type": "Physical Examination",
    "scenario_title": "Respiratory Examination - Shortness of Breath",
    "brief": "You are in A&E. A 65-year-old patient presents with acute shortness of breath. Perform a focused respiratory examination.",
    "actor_script": {
      "opening": "Doctor, I can't catch my breath properly.",
      "details": "Started this morning. Getting worse. Smoker for 30 years. Had a cough for weeks.",
      "hidden_info": "Pain on deep inspiration. Usually walks 2 miles daily but can't today."
    },
    "mark_scheme": [
      "Introduces self and gains consent",
      "Positions patient at 45 degrees",
      "Inspects for respiratory distress and cyanosis",
      "Palpates for chest expansion and tactile fremitus",
      "Percusses systematically",
      "Auscultates all lung fields",
      "Summarises findings professionally"
    ],
    "mnemonic": "IPPA (Inspect, Palpate, Percuss, Auscultate)",
    "communication_notes": "Ensure patient comfort, explain each step, maintain dignity",
    "guideline_links": {
      "BTS": "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/",
      "NICE": "https://www.nice.org.uk/guidance/cg121",
      "NHS": "https://www.nhs.uk/conditions/shortness-of-breath/"
    }
  }
];
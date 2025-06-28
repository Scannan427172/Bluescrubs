// Clean test questions endpoint with category filtering
export function createTestQuestionsEndpoint(app: any) {
  app.get("/api/test/questions", async (req: any, res: any) => {
    try {
      // Get query parameters for filtering
      const { category, difficulty, count, questionId } = req.query;
      const requestedCategory = typeof category === 'string' ? category : 'all';
      const requestedCount = parseInt(typeof count === 'string' ? count : '20');

      // Questions organized by category
      const questionsByCategory = {
        'infectious-diseases': [
          {
            id: "q1", 
            topic: "Urinary Tract Infection Management",
            category: "infectious-diseases",
            question: "A 28-year-old non-pregnant woman presents to your GP practice with a 2-day history of dysuria, urinary frequency, and suprapubic pain. She has no fever, flank pain, or vaginal discharge. Urine dipstick shows nitrites positive and leucocytes 2+. What is the most appropriate first-line antibiotic treatment?",
            options: {
              A: "Nitrofurantoin 100mg modified-release twice daily for 3 days",
              B: "Trimethoprim 200mg twice daily for 3 days",
              C: "Amoxicillin 500mg three times daily for 3 days", 
              D: "Ciprofloxacin 250mg twice daily for 3 days",
              E: "Fosfomycin 3g single dose"
            },
            answer: "A",
            explanation: "Nitrofurantoin is the first-line treatment for uncomplicated UTIs in non-pregnant women according to NICE NG109 guidelines.",
            mnemonic: "UTI Treatment: NITRO = Nice Initial Treatment Recommended Option",
            links: {
              primary: { title: "NICE NG109", url: "https://www.nice.org.uk/guidance/ng109" }
            }
          }
        ],
        'dermatology': [
          {
            id: "derm1",
            topic: "Eczema Management",
            category: "dermatology",
            question: "A 25-year-old woman presents with a 6-month history of itchy, red, scaly patches on her hands and flexural areas. The rash worsens with stress and certain soaps. What is the most likely diagnosis?",
            options: {
              A: "Atopic dermatitis (eczema)",
              B: "Contact dermatitis",
              C: "Psoriasis",
              D: "Seborrheic dermatitis",
              E: "Fungal infection"
            },
            answer: "A",
            explanation: "Atopic dermatitis typically affects flexural areas, is triggered by stress and irritants, and presents with itchy, inflamed skin. The chronic nature and distribution are characteristic.",
            mnemonic: "Eczema: ITCH = Inflammation, Triggers (stress/soaps), Chronic, Hereditary",
            links: {
              primary: { title: "NICE CKS Eczema", url: "https://cks.nice.org.uk/topics/eczema-atopic/" }
            }
          },
          {
            id: "derm2", 
            topic: "Acne Management",
            category: "dermatology",
            question: "A 17-year-old presents with moderate acne affecting the face and back, with inflammatory papules, pustules, and some comedones. What is the most appropriate first-line treatment?",
            options: {
              A: "Topical retinoid + topical antibiotic",
              B: "Oral antibiotics alone",
              C: "Topical benzoyl peroxide alone",
              D: "Oral isotretinoin",
              E: "Topical corticosteroids"
            },
            answer: "A",
            explanation: "For moderate inflammatory acne, NICE recommends combination therapy with topical retinoid and topical antibiotic as first-line treatment.",
            mnemonic: "Acne treatment: COMBINE = Combination therapy for Optimal Management in Better Inflammatory Non-comedonal Eczema",
            links: {
              primary: { title: "NICE CKS Acne", url: "https://cks.nice.org.uk/topics/acne-vulgaris/" }
            }
          },
          {
            id: "derm3",
            topic: "Skin Cancer Recognition", 
            category: "dermatology",
            question: "A 55-year-old man presents with a dark, irregularly-shaped lesion on his back that has grown and changed color over 3 months. Using the ABCDE criteria, which feature is most concerning for malignant melanoma?",
            options: {
              A: "Asymmetry of the lesion",
              B: "Border irregularity",
              C: "Color variation within the lesion",
              D: "Diameter >6mm",
              E: "Evolution (change over time)"
            },
            answer: "E",
            explanation: "Evolution (change in size, shape, or color) is the most significant warning sign for melanoma. Any changing pigmented lesion requires urgent dermatological assessment.",
            mnemonic: "ABCDE: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution (most important)",
            links: {
              primary: { title: "NICE NG14 Melanoma", url: "https://www.nice.org.uk/guidance/ng14" }
            }
          }
        ],
        'cardiovascular': [
          {
            id: "cardio1",
            topic: "Acute Coronary Syndrome Management", 
            category: "cardiovascular",
            question: "A 58-year-old man presents to the emergency department with severe central chest pain radiating to his left arm, lasting 45 minutes. ECG shows ST elevation >2mm in leads II, III, and aVF. What is the most appropriate immediate management?",
            options: {
              A: "Primary percutaneous coronary intervention (PCI) within 120 minutes",
              B: "Thrombolytic therapy with alteplase immediately", 
              C: "High-dose atorvastatin and dual antiplatelet therapy",
              D: "Coronary angiography within 24 hours",
              E: "Conservative management with aspirin and clopidogrel"
            },
            answer: "A",
            explanation: "Primary PCI is the gold standard for STEMI when deliverable within 120 minutes according to NICE CG167.",
            mnemonic: "STEMI management: PCI = Primary Care Intervention (within 120 minutes)",
            links: {
              primary: { title: "NICE CG167", url: "https://www.nice.org.uk/guidance/cg167" }
            }
          }
        ]
      };

      // Get all questions or filter by category
      let selectedQuestions: any[] = [];
      if (requestedCategory === 'all') {
        selectedQuestions = Object.values(questionsByCategory).flat();
      } else if (questionsByCategory[requestedCategory as keyof typeof questionsByCategory]) {
        selectedQuestions = questionsByCategory[requestedCategory as keyof typeof questionsByCategory];
      } else {
        // If category not found, return empty array
        selectedQuestions = [];
      }

      // Handle single question request
      if (questionId) {
        const question = selectedQuestions.find(q => q.id === questionId);
        if (!question) {
          return res.status(404).json({ error: "Question not found" });
        }
        return res.json(question);
      }

      // Apply count limit and return filtered questions  
      const limitedQuestions = selectedQuestions.slice(0, requestedCount);
      res.json(limitedQuestions);
    } catch (error) {
      console.error('Error fetching test questions:', error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });
}
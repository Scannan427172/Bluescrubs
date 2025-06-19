import axios from "axios";
import { load } from "cheerio";

export interface GuidelineLinks {
  nice?: string;
  cks?: string;
  error?: string;
}

// Dynamic NICE/CKS guideline fetching
export async function fetchGuidelineLinks(topic: string): Promise<GuidelineLinks> {
  const results: GuidelineLinks = {};

  try {
    // Fetch NICE guideline link
    const niceLink = await fetchFirstSearchResult(topic, "nice.org.uk");
    if (niceLink) {
      results.nice = niceLink;
    }

    // Fetch CKS topic link
    const cksLink = await fetchFirstSearchResult(topic, "cks.nice.org.uk");
    if (cksLink) {
      results.cks = cksLink;
    }

    // Fallback to static guidelines if dynamic fetching fails
    if (!results.nice && !results.cks) {
      return getStaticGuidelineForTopic(topic);
    }

    return results;
  } catch (error) {
    console.error(`Error fetching guidelines for ${topic}:`, error);
    return getStaticGuidelineForTopic(topic);
  }
}

async function fetchFirstSearchResult(query: string, site: string): Promise<string | null> {
  const encodedQuery = encodeURIComponent(`${query} site:${site}`);
  const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;

  try {
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 8000,
    });

    const $ = load(data);
    const firstResult = $("a")
      .map((i: number, link: any) => $(link).attr("href"))
      .get()
      .find((href: string) => href && href.includes(site));

    if (firstResult && firstResult.includes("/url?q=")) {
      return decodeURIComponent(firstResult.split("/url?q=")[1].split("&")[0]);
    }

    return firstResult || null;
  } catch (err: any) {
    console.error(`Error fetching link for ${query} on ${site}:`, err.message || err);
    return null;
  }
}

function getStaticGuidelineForTopic(topic: string): GuidelineLinks {
  const topicKey = topic.toLowerCase();
  
  // Enhanced topic-based guideline mapping
  if (topicKey.includes('diabetes') || topicKey.includes('sglt2') || topicKey.includes('metformin')) {
    return {
      nice: "https://www.nice.org.uk/guidance/ng28",
      cks: "https://cks.nice.org.uk/topics/diabetes-type-2/"
    };
  }
  
  if (topicKey.includes('hypertension') || topicKey.includes('ace inhibitor') || topicKey.includes('blood pressure')) {
    return {
      nice: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#lifestyle-interventions",
      cks: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#starting-antihypertensive-drug-treatment"
    };
  }
  
  if (topicKey.includes('asthma') || topicKey.includes('inhaler') || topicKey.includes('corticosteroid')) {
    return {
      nice: "https://www.nice.org.uk/guidance/ng80",
      cks: "https://cks.nice.org.uk/topics/asthma/"
    };
  }
  
  if (topicKey.includes('heart failure') || topicKey.includes('hf') || topicKey.includes('ejection fraction')) {
    return {
      nice: "https://www.nice.org.uk/guidance/cg108",
      cks: "https://cks.nice.org.uk/topics/heart-failure-chronic/"
    };
  }

  if (topicKey.includes('depression') || topicKey.includes('antidepressant')) {
    return {
      nice: "https://www.nice.org.uk/guidance/cg90",
      cks: "https://cks.nice.org.uk/topics/depression/"
    };
  }

  if (topicKey.includes('copd') || topicKey.includes('chronic obstructive')) {
    return {
      nice: "https://www.nice.org.uk/guidance/cg101",
      cks: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/"
    };
  }

  if (topicKey.includes('stroke') || topicKey.includes('tia')) {
    return {
      nice: "https://www.nice.org.uk/guidance/ng128",
      cks: "https://cks.nice.org.uk/topics/stroke-tia/"
    };
  }
  
  // Specialty-specific fallbacks
  return {
    nice: "https://www.nice.org.uk/guidance",
    cks: "https://cks.nice.org.uk/topics/"
  };
}

// Enhanced guideline fetcher with fallback to known guidelines
export async function getVerifiedGuidelineLinks(specialty: string, topic: string): Promise<GuidelineLinks> {
  // First try dynamic fetching
  const searchTerm = `${topic} ${specialty}`;
  const dynamicResults = await fetchGuidelineLinks(searchTerm);

  // If dynamic fetching fails, use verified static guidelines
  if (!dynamicResults.nice && !dynamicResults.cks) {
    const staticGuidelines = getStaticGuidelineLinks(specialty, topic);
    return staticGuidelines;
  }

  return dynamicResults;
}

// Fallback static guidelines for reliability
function getStaticGuidelineLinks(specialty: string, topic: string): GuidelineLinks {
  const staticGuidelines: Record<string, Record<string, GuidelineLinks>> = {
    cardiology: {
      hypertension: {
        nice: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#lifestyle-interventions",
        cks: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#starting-antihypertensive-drug-treatment"
      },
      heart_failure: {
        nice: "https://www.nice.org.uk/guidance/cg108",
        cks: "https://cks.nice.org.uk/topics/heart-failure-chronic/"
      },
      atrial_fibrillation: {
        nice: "https://www.nice.org.uk/guidance/cg180",
        cks: "https://cks.nice.org.uk/topics/atrial-fibrillation/"
      }
    },
    respiratory: {
      asthma: {
        nice: "https://www.nice.org.uk/guidance/ng80",
        cks: "https://cks.nice.org.uk/topics/asthma/"
      },
      copd: {
        nice: "https://www.nice.org.uk/guidance/cg101",
        cks: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/"
      },
      pneumonia: {
        nice: "https://www.nice.org.uk/guidance/ng138",
        cks: "https://cks.nice.org.uk/topics/chest-infections-adult/"
      }
    },
    endocrinology: {
      diabetes_type2: {
        nice: "https://www.nice.org.uk/guidance/ng28",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-2/"
      },
      diabetes_type1: {
        nice: "https://www.nice.org.uk/guidance/ng17",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-1/"
      },
      thyroid: {
        nice: "https://www.nice.org.uk/guidance/ng145",
        cks: "https://cks.nice.org.uk/topics/hyperthyroidism/"
      }
    },
    psychiatry: {
      depression: {
        nice: "https://www.nice.org.uk/guidance/cg90",
        cks: "https://cks.nice.org.uk/topics/depression/"
      },
      anxiety: {
        nice: "https://www.nice.org.uk/guidance/cg113",
        cks: "https://cks.nice.org.uk/topics/anxiety/"
      }
    },
    gastroenterology: {
      ibd: {
        nice: "https://www.nice.org.uk/guidance/ng129",
        cks: "https://cks.nice.org.uk/topics/inflammatory-bowel-disease/"
      },
      gord: {
        nice: "https://www.nice.org.uk/guidance/cg184",
        cks: "https://cks.nice.org.uk/topics/dyspepsia-proven-gord/"
      }
    }
  };

  const specialtyKey = specialty.toLowerCase().replace(/\s+/g, '_');
  const topicKey = topic.toLowerCase().replace(/\s+/g, '_');

  return staticGuidelines[specialtyKey]?.[topicKey] || {
    nice: `https://www.nice.org.uk/guidance`,
    cks: `https://cks.nice.org.uk/topics/`
  };
}

// Test function for guideline fetching
export async function testGuidelineFetching(): Promise<void> {
  console.log("Testing guideline fetching...");
  
  const testCases = [
    { topic: "type 2 diabetes SGLT2", label: "Diabetes Type 2" },
    { topic: "hypertension ACE inhibitors", label: "Hypertension" },
    { topic: "asthma inhaled corticosteroids", label: "Asthma" }
  ];

  for (const testCase of testCases) {
    console.log(`\nTesting: ${testCase.label}`);
    const links = await fetchGuidelineLinks(testCase.topic);
    console.log(`NICE: ${links.nice || 'Not found'}`);
    console.log(`CKS: ${links.cks || 'Not found'}`);
  }
}
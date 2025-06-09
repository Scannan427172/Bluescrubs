import { db } from "./db";
import { users, globalScoreboard, weeklyLeaderboard, countryStats } from "../shared/schema";

const GLOBAL_USERS = [
  // United Kingdom
  { username: "DrSarahLondon", country: "United Kingdom", city: "London", flag: "🇬🇧", score: 2450, accuracy: 87, streak: 15 },
  { username: "DrJamesMCH", country: "United Kingdom", city: "Manchester", flag: "🇬🇧", score: 2200, accuracy: 84, streak: 12 },
  { username: "DrAyeshaEdin", country: "United Kingdom", city: "Edinburgh", flag: "🇬🇧", score: 2100, accuracy: 89, streak: 18 },
  
  // India
  { username: "DrAnjaliMumbai", country: "India", city: "Mumbai", flag: "🇮🇳", score: 2380, accuracy: 92, streak: 22 },
  { username: "DrRahulDelhi", country: "India", city: "New Delhi", flag: "🇮🇳", score: 2150, accuracy: 86, streak: 14 },
  { username: "DrPriyaBang", country: "India", city: "Bangalore", flag: "🇮🇳", score: 2050, accuracy: 88, streak: 11 },
  { username: "DrVikasChennai", country: "India", city: "Chennai", flag: "🇮🇳", score: 1980, accuracy: 85, streak: 9 },
  
  // Pakistan
  { username: "DrFatimaKHI", country: "Pakistan", city: "Karachi", flag: "🇵🇰", score: 2320, accuracy: 91, streak: 19 },
  { username: "DrAhmedLHR", country: "Pakistan", city: "Lahore", flag: "🇵🇰", score: 2180, accuracy: 87, streak: 13 },
  { username: "DrZainabISB", country: "Pakistan", city: "Islamabad", flag: "🇵🇰", score: 2000, accuracy: 83, streak: 8 },
  
  // Bangladesh
  { username: "DrNasirDhaka", country: "Bangladesh", city: "Dhaka", flag: "🇧🇩", score: 2250, accuracy: 89, streak: 16 },
  { username: "DrRashidaCHT", country: "Bangladesh", city: "Chittagong", flag: "🇧🇩", score: 1950, accuracy: 82, streak: 10 },
  
  // Nigeria
  { username: "DrChiomaLagos", country: "Nigeria", city: "Lagos", flag: "🇳🇬", score: 2300, accuracy: 90, streak: 17 },
  { username: "DrIbrahimABV", country: "Nigeria", city: "Abuja", flag: "🇳🇬", score: 2080, accuracy: 84, streak: 12 },
  { username: "DrAdelaideIBD", country: "Nigeria", city: "Ibadan", flag: "🇳🇬", score: 1920, accuracy: 81, streak: 7 },
  
  // Egypt
  { username: "DrYousefCairo", country: "Egypt", city: "Cairo", flag: "🇪🇬", score: 2280, accuracy: 88, streak: 15 },
  { username: "DrLailaAlex", country: "Egypt", city: "Alexandria", flag: "🇪🇬", score: 2020, accuracy: 85, streak: 11 },
  
  // South Africa
  { username: "DrThandi_CT", country: "South Africa", city: "Cape Town", flag: "🇿🇦", score: 2190, accuracy: 86, streak: 13 },
  { username: "DrPieterJHB", country: "South Africa", city: "Johannesburg", flag: "🇿🇦", score: 1970, accuracy: 83, streak: 9 },
  
  // Kenya
  { username: "DrGraceNairobi", country: "Kenya", city: "Nairobi", flag: "🇰🇪", score: 2160, accuracy: 87, streak: 14 },
  { username: "DrSamuelMombasa", country: "Kenya", city: "Mombasa", flag: "🇰🇪", score: 1890, accuracy: 80, streak: 6 },
  
  // Philippines
  { username: "DrMariaManila", country: "Philippines", city: "Manila", flag: "🇵🇭", score: 2140, accuracy: 88, streak: 12 },
  { username: "DrJoseCebu", country: "Philippines", city: "Cebu", flag: "🇵🇭", score: 1960, accuracy: 84, streak: 8 },
  
  // Malaysia
  { username: "DrLiWeiKL", country: "Malaysia", city: "Kuala Lumpur", flag: "🇲🇾", score: 2200, accuracy: 89, streak: 15 },
  { username: "DrAishaJB", country: "Malaysia", city: "Johor Bahru", flag: "🇲🇾", score: 1940, accuracy: 82, streak: 7 },
  
  // Singapore
  { username: "DrTanSG", country: "Singapore", city: "Singapore", flag: "🇸🇬", score: 2350, accuracy: 93, streak: 20 },
  
  // Australia
  { username: "DrEmilySydney", country: "Australia", city: "Sydney", flag: "🇦🇺", score: 2120, accuracy: 85, streak: 11 },
  { username: "DrJackMelb", country: "Australia", city: "Melbourne", flag: "🇦🇺", score: 2040, accuracy: 86, streak: 10 },
  
  // Canada
  { username: "DrSophieTOR", country: "Canada", city: "Toronto", flag: "🇨🇦", score: 2260, accuracy: 88, streak: 16 },
  { username: "DrLucVAN", country: "Canada", city: "Vancouver", flag: "🇨🇦", score: 2070, accuracy: 84, streak: 9 },
  
  // United States
  { username: "DrMichaelNYC", country: "United States", city: "New York", flag: "🇺🇸", score: 2180, accuracy: 87, streak: 13 },
  { username: "DrJenniferLA", country: "United States", city: "Los Angeles", flag: "🇺🇸", score: 2010, accuracy: 83, streak: 8 },
  
  // Germany
  { username: "DrAnaBerlin", country: "Germany", city: "Berlin", flag: "🇩🇪", score: 2240, accuracy: 89, streak: 14 },
  { username: "DrKlausMUN", country: "Germany", city: "Munich", flag: "🇩🇪", score: 1990, accuracy: 85, streak: 10 },
  
  // France
  { username: "DrClémentParis", country: "France", city: "Paris", flag: "🇫🇷", score: 2210, accuracy: 88, streak: 15 },
  { username: "DrNatalieLyon", country: "France", city: "Lyon", flag: "🇫🇷", score: 1930, accuracy: 81, streak: 7 },
  
  // Brazil
  { username: "DrCarlosSP", country: "Brazil", city: "São Paulo", flag: "🇧🇷", score: 2170, accuracy: 86, streak: 12 },
  { username: "DrIsabelaRJ", country: "Brazil", city: "Rio de Janeiro", flag: "🇧🇷", score: 1960, accuracy: 84, streak: 9 },
  
  // Saudi Arabia
  { username: "DrAhmedRiyadh", country: "Saudi Arabia", city: "Riyadh", flag: "🇸🇦", score: 2290, accuracy: 90, streak: 18 },
  { username: "DrFatimaJeddah", country: "Saudi Arabia", city: "Jeddah", flag: "🇸🇦", score: 2030, accuracy: 85, streak: 11 },
  
  // UAE
  { username: "DrOmarDubai", country: "United Arab Emirates", city: "Dubai", flag: "🇦🇪", score: 2310, accuracy: 91, streak: 17 },
  { username: "DrLaylaAD", country: "United Arab Emirates", city: "Abu Dhabi", flag: "🇦🇪", score: 2080, accuracy: 86, streak: 13 },
];

export async function seedGlobalScoreboard() {
  console.log("🌍 Seeding global scoreboard with users from around the world...");
  
  try {
    // First, create users with location data
    const userPromises = GLOBAL_USERS.map(async (userData, index) => {
      const userId = index + 1;
      
      // Insert user with location
      await db.insert(users).values({
        id: userId,
        email: `${userData.username.toLowerCase()}@example.com`,
        username: userData.username,
        password: "hashedpassword123",
        currentStage: "plab1",
        studyStreak: userData.streak,
        totalPoints: userData.score,
        country: userData.country,
        city: userData.city,
        flagEmoji: userData.flag,
        timezone: "UTC",
        isLocationPublic: true,
      }).onConflictDoNothing();

      // Create global scoreboard entry
      await db.insert(globalScoreboard).values({
        userId,
        totalScore: userData.score,
        questionsAnswered: Math.floor(userData.score / 10) + Math.floor(Math.random() * 50),
        correctAnswers: Math.floor((userData.score / 10) * (userData.accuracy / 100)),
        accuracyRate: userData.accuracy,
        studyStreak: userData.streak,
        totalStudyTime: Math.floor(Math.random() * 200) + 50, // 50-250 hours
        plabCategory: Math.random() > 0.3 ? "plab1" : "plab2",
        rank: index + 1,
        countryRank: 1, // Will be recalculated
      }).onConflictDoNothing();

      // Create weekly leaderboard entry
      const now = new Date();
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weeklyQuestions = Math.floor(Math.random() * 100) + 20;
      const weeklyCorrect = Math.floor(weeklyQuestions * (userData.accuracy / 100));

      await db.insert(weeklyLeaderboard).values({
        userId,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        questionsThisWeek: weeklyQuestions,
        correctThisWeek: weeklyCorrect,
        studyTimeThisWeek: Math.floor(Math.random() * 30) + 5, // 5-35 hours this week
        weeklyRank: index + 1,
        countryWeeklyRank: 1, // Will be recalculated
      }).onConflictDoNothing();

      return { userId, country: userData.country, flag: userData.flag, score: userData.score };
    });

    const userResults = await Promise.all(userPromises);

    // Create country statistics
    const countryCounts = userResults.reduce((acc, user) => {
      if (!acc[user.country]) {
        acc[user.country] = {
          country: user.country,
          flag: user.flag,
          users: [],
          totalQuestions: 0
        };
      }
      acc[user.country].users.push(user);
      acc[user.country].totalQuestions += Math.floor(Math.random() * 1000) + 100;
      return acc;
    }, {} as Record<string, any>);

    for (const [country, data] of Object.entries(countryCounts)) {
      const scores = data.users.map((u: any) => u.score);
      const avgScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
      const topScore = Math.max(...scores);

      await db.insert(countryStats).values({
        country: data.country,
        flagEmoji: data.flag,
        totalUsers: data.users.length,
        activeUsers: Math.floor(data.users.length * 0.8), // 80% active
        averageScore: Math.round(avgScore),
        topUserScore: topScore,
        totalQuestionsAnswered: data.totalQuestions,
      }).onConflictDoNothing();
    }

    console.log(`✅ Successfully seeded ${GLOBAL_USERS.length} users across ${Object.keys(countryCounts).length} countries`);
    console.log("🎯 Global scoreboard is ready with worldwide competition!");
    
  } catch (error) {
    console.error("❌ Error seeding global scoreboard:", error);
    throw error;
  }
}

// Auto-seed when file is imported
if (require.main === module) {
  seedGlobalScoreboard().then(() => {
    console.log("🌟 Global scoreboard seeding completed!");
    process.exit(0);
  }).catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
}
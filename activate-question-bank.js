#!/usr/bin/env node

// Activate the 5000+ question bank generation system
import { generateFullQuestionBank } from './server/bulk-uk-generator.js';

console.log('🚀 Activating BlueScrubsPrep 5000+ Question Bank Generation...');
console.log('📚 Target: 5000 authentic medical questions across 20 specialties');
console.log('⏱️  Estimated time: 15-20 minutes');
console.log('💰 Estimated cost: $15-25 USD');

async function activateQuestionBank() {
  try {
    console.log('\n🔥 Starting comprehensive question generation...');
    await generateFullQuestionBank(5000);
    console.log('\n✅ SUCCESS: 5000+ question bank is now active!');
    console.log('📊 Questions available across all medical specialties');
    console.log('🎯 Ready for PLAB 1 practice testing');
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('💡 Ensure OpenAI API key is configured');
    process.exit(1);
  }
}

activateQuestionBank();
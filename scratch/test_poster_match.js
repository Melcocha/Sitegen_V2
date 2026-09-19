import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplatePoster.jsx');
const content = fs.readFileSync(targetFile, 'utf8');

// Section IDs to find
const sectionMap = {
  hero: /<section id="wp-hero"[\s\S]*?<\/section>/,
  planAVisit: /<section id="wp-plan-visit"[\s\S]*?<\/section>/,
  nucleusColumns: /<section id="wp-columns"[\s\S]*?<\/section>/,
  nextSteps: /<section id="wp-next-steps-split"[\s\S]*?<\/section>/,
  missionBlock: /<section id="wp-mission"[\s\S]*?<\/section>/,
  events: /<section id="wp-events"[\s\S]*?<\/section>/,
  donation: /<section id="wp-donations"[\s\S]*?<\/section>/,
  prayerRequest: /<section id="wp-prayer"[\s\S]*?<\/section>/
};

for (const [key, regex] of Object.entries(sectionMap)) {
  const m = content.match(regex);
  if (m) {
    console.log(`Found ${key}: length ${m[0].length}`);
  } else {
    console.error(`MISSING: ${key}`);
  }
}

// Check footer / contact
const contactMatch = content.match(/<footer id="wp-contact"[\s\S]*?<\/footer>/);
if (contactMatch) {
  console.log(`Found contact/footer: length ${contactMatch[0].length}`);
} else {
  console.error('MISSING contact/footer');
}

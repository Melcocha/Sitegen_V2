import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateNucleus.jsx');
const content = fs.readFileSync(targetFile, 'utf8');

const sectionMap = {
  hero: /<section id="wp-hero"[\s\S]*?<\/section>/,
  vision: /<section id="wp-vision"[\s\S]*?<\/section>/,
  panoramas: /<section id="wp-panoramas"[\s\S]*?<\/section>/,
  sermons: /<section id="wp-sermons"[\s\S]*?<\/section>/,
  planAVisit: /<section id="wp-plan-visit"[\s\S]*?<\/section>/,
  welcome: /<section id="wp-welcome"[\s\S]*?<\/section>/,
  values: /<section id="wp-values"[\s\S]*?<\/section>/,
  ministries: /<section id="wp-ministries"[\s\S]*?<\/section>/,
  nextSteps: /<section id="wp-next-steps"[\s\S]*?<\/section>/,
  prayer: /<section id="wp-prayer"[\s\S]*?<\/section>/,
  about: /<section id="wp-about"[\s\S]*?<\/section>/,
  events: /<section id="wp-events"[\s\S]*?<\/section>/,
  donation: /<section id="wp-donations"[\s\S]*?<\/section>/
};

for (const [key, regex] of Object.entries(sectionMap)) {
  const m = content.match(regex);
  if (m) {
    console.log(`Found ${key}: length ${m[0].length}`);
  } else {
    console.error(`MISSING: ${key}`);
  }
}

const contactMatch = content.match(/<footer id="wp-contact"[\s\S]*?<\/footer>/);
if (contactMatch) {
  console.log(`Found contact/footer: length ${contactMatch[0].length}`);
} else {
  console.error('MISSING contact/footer');
}

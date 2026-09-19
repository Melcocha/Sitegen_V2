import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateMyGateway.jsx');
const content = fs.readFileSync(targetFile, 'utf8');

const sectionMap = {
  nextSteps: /<section id="wp-next-steps"[\s\S]*?<\/section>/,
  events: /<section id="wp-eventos"[\s\S]*?<\/section>/,
  testimonials: /<section style=\{\{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' \}\}>[\s\S]*?<\/section>/,
  planAVisit: /<section id="wp-plan-visit"[\s\S]*?<\/section>/,
  welcome: /<section id="wp-welcome"[\s\S]*?<\/section>/,
  values: /<section id="wp-values"[\s\S]*?<\/section>/,
  ministries: /<section id="wp-ministries"[\s\S]*?<\/section>/,
  sermons: /<section id="wp-sermons"[\s\S]*?<\/section>/,
  donation: /<section id="wp-donations"[\s\S]*?<\/section>/,
  prayerRequest: /<section id="wp-prayer"[\s\S]*?<\/section>/,
  about: /<section id="wp-about"[\s\S]*?<\/section>/,
  contact: /<footer id="wp-contact"[\s\S]*?<\/footer>/
};

for (const [key, regex] of Object.entries(sectionMap)) {
  const m = content.match(regex);
  if (m) {
    console.log(`Found ${key}: length ${m[0].length}`);
  } else {
    console.error(`MISSING: ${key}`);
  }
}

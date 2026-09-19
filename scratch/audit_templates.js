import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = [
  'ChurchTemplateNucleus.jsx',
  'ChurchTemplateMyGateway.jsx',
  'ChurchTemplatePoster.jsx',
  'ChurchTemplateAfiche.jsx'
];

const checkKeys = [
  'hero',
  'welcome',
  'planAVisit',
  'values',
  'ministries',
  'nextSteps',
  'sermons',
  'events',
  'donation',
  'prayerRequest',
  'about',
  'contact'
];

for (const t of templates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', t);
  const code = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================== ${t} ==================`);
  console.log(`Lines: ${code.split('\n').length}, Bytes: ${code.length}`);
  console.log(`Has sectionOrder:`, code.includes('sectionOrder'));
  console.log(`Has SectionControlBar:`, code.includes('SectionControlBar'));

  const foundKeys = [];
  const missingKeys = [];
  for (const k of checkKeys) {
    if (code.includes(`case '${k}'`) || code.includes(`case "${k}"`)) {
      foundKeys.push(k);
    } else {
      missingKeys.push(k);
    }
  }
  console.log(`Cases found (${foundKeys.length}):`, foundKeys.join(', '));
  console.log(`Cases MISSING (${missingKeys.length}):`, missingKeys.join(', '));
}

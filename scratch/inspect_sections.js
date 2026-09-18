import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'ChurchTemplateAfiche.jsx',
  'ChurchTemplateNucleus.jsx',
  'ChurchTemplatePoster.jsx',
  'ChurchTemplateMyGateway.jsx'
];

files.forEach(f => {
  const p = path.join(__dirname, '..', 'src', 'components', f);
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n=================== ${f} ===================`);
  
  // Look at events section
  const eventsMatch = content.match(/<section[^>]*id=["'](?:wp-events|wp-eventos)["'][\s\S]*?<\/section>/);
  if (eventsMatch) {
    const evSec = eventsMatch[0];
    const handles = (evSec.match(/handleEdit\(/g) || []).length;
    console.log(`Events section length: ${evSec.length}, handleEdit calls inside: ${handles}`);
  } else {
    console.log('NO events section matched');
  }

  // Look at donations section
  const donMatches = [...content.matchAll(/<section[^>]*id=["']wp-donations?["'][\s\S]*?<\/section>/g)];
  console.log(`Donations sections found: ${donMatches.length}`);
  donMatches.forEach((dm, i) => {
    const handles = (dm[0].match(/handleEdit\(/g) || []).length;
    console.log(`  Donation section #${i+1} length: ${dm[0].length}, handleEdit calls: ${handles}`);
  });
});

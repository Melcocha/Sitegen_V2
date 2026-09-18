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
  
  // Find sections
  const sectionMatches = [...content.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>/g)];
  console.log('Sections found:');
  sectionMatches.forEach(m => console.log('  -', m[1]));
  
  // Check events & donations occurrences
  const hasEvents = /id=["']wp-events?["']/.test(content);
  const hasDonation = /id=["']wp-donations?["']/.test(content);
  const hasPrayer = /id=["']wp-prayer["']/.test(content);
  console.log(`hasEvents: ${hasEvents}, hasDonation: ${hasDonation}, hasPrayer: ${hasPrayer}`);
  
  // Count how many editable elements exist
  const editables = (content.match(/handleEdit\(/g) || []).length;
  console.log(`Total handleEdit calls: ${editables}`);
});

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

const checkVars = ['welcome', 'hero', 'values', 'ministries', 'sermons', 'events', 'about', 'planAVisit'];

for (const t of templates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', t);
  const code = fs.readFileSync(filePath, 'utf8');

  console.log(`\n=== ${t} ===`);
  for (const v of checkVars) {
    const hasDef = new RegExp(`(?:const|let|var)\\s+${v}\\s*=`, 'i').test(code);
    const hasUsage = new RegExp(`\\b${v}=\\{${v}\\}`, 'i').test(code);
    console.log(`Variable "${v}": defined=${hasDef}, passedInProps=${hasUsage}`);
  }
}

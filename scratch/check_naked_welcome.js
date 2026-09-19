import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = [
  'ChurchTemplateNucleus.jsx',
  'ChurchTemplateMyGateway.jsx',
  'ChurchTemplatePoster.jsx',
  'ChurchTemplateAfiche.jsx',
  'ChurchSectionLayouts.jsx'
];

for (const t of templates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', t);
  const code = fs.readFileSync(filePath, 'utf8');

  // Check for any naked welcome. something without data.welcome
  const nakedWelcomeMatches = [...code.matchAll(/(?<![a-zA-Z0-9_.])welcome\.[a-zA-Z0-9_]+/g)].map(m => m[0]);
  console.log(`${t}: naked welcome references:`, nakedWelcomeMatches.length, nakedWelcomeMatches.slice(0, 5));
}

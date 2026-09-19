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

for (const t of templates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', t);
  const code = fs.readFileSync(filePath, 'utf8');

  console.log(`\n=== Verification for ${t} ===`);
  console.log('Has ChurchSectionLayouts import:', code.includes("from './ChurchSectionLayouts'"));
  console.log('Has layouts declaration:', code.includes("const layouts = data.sectionLayouts || {}"));
  console.log('Has hero visual/split:', code.includes("layouts.hero === 'visual'") && code.includes("layouts.hero === 'split'"));
  console.log('Has welcome visual:', code.includes("layouts.welcome === 'visual'"));
  console.log('Has ministries visual:', code.includes("layouts.ministries === 'visual'"));
  console.log('Has sermons visual:', code.includes("layouts.sermons === 'visual'"));
  console.log('Has events visual:', code.includes("layouts.events === 'visual'"));
  console.log('Has about visual:', code.includes("layouts.about === 'visual'"));
}

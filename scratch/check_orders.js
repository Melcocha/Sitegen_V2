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
  const match = code.match(/DEFAULT_[A-Z_]+_ORDER\s*=\s*(\[[^\]]+\])/);
  console.log(`${t}:`, match ? match[1] : 'None');
}

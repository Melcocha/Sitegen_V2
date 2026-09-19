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
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace welcome={welcome} with welcome={data.welcome || {}}
  code = code.replaceAll('welcome={welcome}', 'welcome={data.welcome || {}}');

  // Also ensure const welcome = data.welcome || {} is declared inside the component body
  if (!code.includes('const welcome = data.welcome || {}')) {
    code = code.replace(
      'const visibility = data.sectionsVisibility || {}',
      'const visibility = data.sectionsVisibility || {}\n  const welcome = data.welcome || {}'
    );
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Fixed ${t} successfully!`);
}

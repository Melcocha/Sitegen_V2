import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplatePoster.jsx');
const content = fs.readFileSync(p, 'utf8');

const sectionMatches = [...content.matchAll(/<section[^>]*id=["']([^"']+)["'][\s\S]*?<\/section>/g)];
sectionMatches.forEach(m => {
  const id = m[1];
  const sec = m[0];
  const handles = (sec.match(/handleEdit\(/g) || []).length;
  console.log(`Poster section [${id}]: length=${sec.length}, handleEdit calls=${handles}`);
});

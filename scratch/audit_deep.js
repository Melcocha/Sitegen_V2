import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = [
  'ChurchTemplateAfiche.jsx',
  'ChurchTemplateNucleus.jsx',
  'ChurchTemplatePoster.jsx',
  'ChurchTemplateMyGateway.jsx'
];

templates.forEach(file => {
  const p = path.join(__dirname, '..', 'src', 'components', file);
  const content = fs.readFileSync(p, 'utf8');
  console.log('\n========================================');
  console.log('FILE:', file);
  console.log('========================================');

  // List all handleEdit calls
  const regex = /handleEdit\([^,]+,\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]/g;
  const fields = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    fields.push({ field: m[1], label: m[2] });
  }
  console.log('Configured handleEdit fields (' + fields.length + '):');
  fields.slice(0, 15).forEach(f => console.log('  -', f.field, ':', f.label));
  if (fields.length > 15) console.log('  ... and', fields.length - 15, 'more.');

  // Find images without handleEdit
  const imgRegex = /<img[^>]*>/g;
  const uneditableImages = [];
  while ((m = imgRegex.exec(content)) !== null) {
    if (!m[0].includes('handleEdit') && !m[0].includes('onClick')) {
      uneditableImages.push(m[0].slice(0, 100));
    }
  }
  console.log('Images without direct edit onClick:', uneditableImages.length);
  uneditableImages.forEach(img => console.log('  IMG:', img));

  // Find sections in order
  const secRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/g;
  const sections = [];
  while ((m = secRegex.exec(content)) !== null) {
    sections.push(m[1]);
  }
  console.log('Sections with IDs:', sections);
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateMyGateway.jsx');
const content = fs.readFileSync(targetFile, 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('<section') || line.includes('<footer')) {
    console.log((i + 1) + ': ' + line.trim());
  }
});

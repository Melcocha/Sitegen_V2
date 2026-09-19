import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateNucleus.jsx');
const code = fs.readFileSync(file, 'utf8');

const cases = [...code.matchAll(/case ['"]([^'"]+)['"]:/g)].map(m => m[1]);
console.log('Nucleus cases:', cases);

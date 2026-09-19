import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = [
  {
    file: 'ChurchTemplatePoster.jsx',
    accentVar: 'accentIndigo',
    primaryBg: "'#000000'",
    altBg: "'#0A0A0A'",
    fontVar: 'activeFont'
  },
  {
    file: 'ChurchTemplateNucleus.jsx',
    accentVar: 'accentGold',
    primaryBg: "primaryBg",
    altBg: "'#07080D'",
    fontVar: 'activeFont'
  },
  {
    file: 'ChurchTemplateMyGateway.jsx',
    accentVar: 'accentCyan',
    primaryBg: "'#0B0F19'",
    altBg: "'#0F172A'",
    fontVar: 'activeFont'
  },
  {
    file: 'ChurchTemplateAfiche.jsx',
    accentVar: 'accentYellow',
    primaryBg: "primaryBg",
    altBg: "'#090B10'",
    fontVar: 'activeFont'
  }
];

for (const t of templates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', t.file);
  let code = fs.readFileSync(filePath, 'utf8');

  // Update import to include VisitVisualLayout and ValuesVisualLayout
  if (!code.includes("VisitVisualLayout")) {
    code = code.replace(
      "HeroSplitLayout,",
      "HeroSplitLayout,\n  VisitVisualLayout,\n  ValuesVisualLayout,"
    );
  }

  // Update case 'planAVisit':
  const visitCode = `case 'planAVisit':
            if (layouts.visit === 'visual') {
              return wrap(
                <VisitVisualLayout
                  data={data}
                  planAVisit={data.planAVisit || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={${t.accentVar}}
                  primaryBg={${t.primaryBg}}
                  font={${t.fontVar}}
                />,
                'Visítanos (Solo Fotos)'
              )
            }`;
  if (!code.includes("if (layouts.visit === 'visual')")) {
    code = code.replace("case 'planAVisit':", visitCode);
  }

  // Update case 'values':
  const valuesCode = `case 'values':
            if (layouts.values === 'visual') {
              return wrap(
                <ValuesVisualLayout
                  data={data}
                  values={data.values || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={${t.accentVar}}
                  primaryBg={${t.primaryBg}}
                  font={${t.fontVar}}
                />,
                'Valores (Solo Imágenes)'
              )
            }`;
  if (!code.includes("if (layouts.values === 'visual')")) {
    code = code.replace("case 'values':", valuesCode);
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Updated visit and values in ${t.file}`);
}

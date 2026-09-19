import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplatePoster.jsx');
const content = fs.readFileSync(targetFile, 'utf8');

// Find header end
const headerEndMarker = '</header>';
const headerEndIdx = content.indexOf(headerEndMarker);
if (headerEndIdx === -1) {
  throw new Error('Header end not found');
}
const beforeSections = content.slice(0, headerEndIdx + headerEndMarker.length);

// Extract each section
const getMatch = (regex, name) => {
  const m = content.match(regex);
  if (!m) throw new Error('Missing section ' + name);
  return m[0];
};

const heroSec = getMatch(/<section id="wp-hero"[\s\S]*?<\/section>/, 'hero');
const planVisitSec = getMatch(/<section id="wp-plan-visit"[\s\S]*?<\/section>/, 'planAVisit');
const columnsSec = getMatch(/<section id="wp-columns"[\s\S]*?<\/section>/, 'nucleusColumns');
const nextStepsSec = getMatch(/<section id="wp-next-steps-split"[\s\S]*?<\/section>/, 'nextSteps');
const missionSec = getMatch(/<section id="wp-mission"[\s\S]*?<\/section>/, 'missionBlock');
const eventsSec = getMatch(/<section id="wp-events"[\s\S]*?<\/section>/, 'events');
const donationSec = getMatch(/<section id="wp-donations"[\s\S]*?<\/section>/, 'donation');
const prayerSec = getMatch(/<section id="wp-prayer"[\s\S]*?<\/section>/, 'prayerRequest');

// Contact & copyright split
const fullFooterMatch = content.match(/<footer id="wp-contact"[\s\S]*?<\/footer>/);
if (!fullFooterMatch) throw new Error('Missing footer');
const fullFooter = fullFooterMatch[0];

// In fullFooter, separate the contact grid and the copyright strip
const borderTopIdx = fullFooter.indexOf('<div style={{ maxWidth: 1400, margin: \'0 auto\', paddingTop: 32');
let contactGrid = fullFooter.slice(0, borderTopIdx).replace('<footer id="wp-contact"', '<section id="wp-contact"') + '</div>\n      </section>';
// Ensure proper closing tags
if (!contactGrid.endsWith('</section>')) {
  contactGrid = fullFooter.slice(0, borderTopIdx) + '</section>';
}

const copyrightStrip = `<footer style={{ width: '100%', background: '#000000', color: '#FFFFFF', padding: '24px 8% 32px', boxSizing: 'border-box' }}>
        ${fullFooter.slice(borderTopIdx)}`;

const dynamicBlock = `

      {/* ── DYNAMIC SECTIONS LOOP (DRIVEN BY data.sectionOrder & sectionsVisibility) ── */}
      {activeOrder.map((sectionKey, sIdx) => {
        if (visibility[sectionKey] === false) return null
        const canUp = sIdx > 0
        const canDown = sIdx < activeOrder.length - 1

        const wrap = (secContent, label) => (
          <SectionControlBar
            key={sectionKey}
            sectionKey={sectionKey}
            label={label}
            canMoveUp={canUp}
            canMoveDown={canDown}
            onMoveUp={() => handleMoveUp(sectionKey)}
            onMoveDown={() => handleMoveDown(sectionKey)}
            onDelete={() => handleDeleteSection(sectionKey)}
            editMode={editMode}
            accentColor={data.accentColor || '#C4A35A'}
            primaryColor="#000000"
          >
            {secContent}
          </SectionControlBar>
        )

        switch (sectionKey) {
          case 'hero':
            return wrap(
              ${heroSec},
              'Hero Portada'
            )
          case 'planAVisit':
            return wrap(
              ${planVisitSec},
              'Planifica tu Visita'
            )
          case 'nucleusColumns':
            return wrap(
              ${columnsSec},
              'Líderes & Calendario'
            )
          case 'nextSteps':
            return wrap(
              ${nextStepsSec},
              'Próximos Pasos'
            )
          case 'missionBlock':
          case 'mission':
            return wrap(
              ${missionSec},
              'Nuestra Misión'
            )
          case 'events':
            return wrap(
              ${eventsSec},
              'Eventos & Calendario'
            )
          case 'donation':
            return wrap(
              ${donationSec},
              'Ofrendas / Donaciones'
            )
          case 'prayerRequest':
            return wrap(
              ${prayerSec},
              'Petición de Oración'
            )
          case 'contact':
            return wrap(
              ${fullFooter},
              'Contacto & Horarios'
            )
          default:
            return null
        }
      })}

    </div>
  )
}
`;

const newFileContent = beforeSections + dynamicBlock;
fs.writeFileSync(targetFile, newFileContent, 'utf8');
console.log('Successfully updated ChurchTemplatePoster.jsx!');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateNucleus.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add SectionControlBar import
if (!content.includes("import SectionControlBar from './SectionControlBar'")) {
  content = content.replace("import TemplateDragHandles from './TemplateDragHandles'", "import TemplateDragHandles from './TemplateDragHandles'\nimport SectionControlBar from './SectionControlBar'");
}

// 2. Add onSectionChange to props
content = content.replace(
  "export default function ChurchTemplateNucleus({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {",
  "export default function ChurchTemplateNucleus({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {"
);

// 3. Add order helper code
const helperCode = `
  const DEFAULT_NUCLEUS_ORDER = [
    'hero',
    'missionBlock',
    'panoramas',
    'sermons',
    'planAVisit',
    'welcome',
    'values',
    'ministries',
    'nextSteps',
    'events',
    'donation',
    'prayerRequest',
    'about',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_NUCLEUS_ORDER
  const visibility = data.sectionsVisibility || {}

  const handleMoveUp = (key) => {
    const curIdx = activeOrder.indexOf(key)
    if (curIdx > 0) {
      const newOrder = [...activeOrder]
      const temp = newOrder[curIdx]
      newOrder[curIdx] = newOrder[curIdx - 1]
      newOrder[curIdx - 1] = temp
      if (onSectionChange) onSectionChange('sectionOrder', newOrder)
      else if (onQuickUpdate) onQuickUpdate('sectionOrder', newOrder)
    }
  }

  const handleMoveDown = (key) => {
    const curIdx = activeOrder.indexOf(key)
    if (curIdx >= 0 && curIdx < activeOrder.length - 1) {
      const newOrder = [...activeOrder]
      const temp = newOrder[curIdx]
      newOrder[curIdx] = newOrder[curIdx + 1]
      newOrder[curIdx + 1] = temp
      if (onSectionChange) onSectionChange('sectionOrder', newOrder)
      else if (onQuickUpdate) onQuickUpdate('sectionOrder', newOrder)
    }
  }

  const handleDeleteSection = (key) => {
    if (onSectionChange) onSectionChange(\`sectionsVisibility.\${key}\`, false)
    else if (onQuickUpdate) onQuickUpdate(\`sectionsVisibility.\${key}\`, false)
  }
`;

if (!content.includes('DEFAULT_NUCLEUS_ORDER')) {
  content = content.replace(
    "const activeFont = data.font || 'Playfair Display'\n  const primaryBg = data.primaryColor || '#07080D'\n\n  return (",
    `const activeFont = data.font || 'Playfair Display'\n  const primaryBg = data.primaryColor || '#07080D'\n${helperCode}\n  return (`
  );
}

// Extract sections
const getMatch = (regex, name) => {
  const m = content.match(regex);
  if (!m) throw new Error('Missing section ' + name);
  return m[0];
};

const heroSec = getMatch(/<section id="wp-hero"[\s\S]*?<\/section>/, 'hero');
const visionSec = getMatch(/<section id="wp-vision"[\s\S]*?<\/section>/, 'vision');
const panoramasSec = getMatch(/<section id="wp-panoramas"[\s\S]*?<\/section>/, 'panoramas');
const sermonsSec = getMatch(/<section id="wp-sermons"[\s\S]*?<\/section>/, 'sermons');
const planVisitSec = getMatch(/<section id="wp-plan-visit"[\s\S]*?<\/section>/, 'planAVisit');
const welcomeSec = getMatch(/<section id="wp-welcome"[\s\S]*?<\/section>/, 'welcome');
const valuesSec = getMatch(/<section id="wp-values"[\s\S]*?<\/section>/, 'values');
const ministriesSec = getMatch(/<section id="wp-ministries"[\s\S]*?<\/section>/, 'ministries');
const nextStepsSec = getMatch(/<section id="wp-next-steps"[\s\S]*?<\/section>/, 'nextSteps');
const prayerSec = getMatch(/<section id="wp-prayer"[\s\S]*?<\/section>/, 'prayer');
const aboutSec = getMatch(/<section id="wp-about"[\s\S]*?<\/section>/, 'about');
const eventsSec = getMatch(/<section id="wp-events"[\s\S]*?<\/section>/, 'events');
const donationSec = getMatch(/<section id="wp-donations"[\s\S]*?<\/section>/, 'donation');
const contactSec = getMatch(/<footer id="wp-contact"[\s\S]*?<\/footer>/, 'contact');

// Find header end
const headerEndMarker = '</header>';
const headerEndIdx = content.indexOf(headerEndMarker);
if (headerEndIdx === -1) throw new Error('Header end not found');
const beforeSections = content.slice(0, headerEndIdx + headerEndMarker.length);

const dynamicLoop = `

      {/* ── DYNAMIC SECTIONS LOOP ── */}
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
            accentColor={accentGold}
            primaryColor={primaryBg}
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
          case 'missionBlock':
          case 'vision':
            return wrap(
              ${visionSec},
              'Visión & Propósito'
            )
          case 'panoramas':
            return wrap(
              ${panoramasSec},
              'Franjas Panorámicas'
            )
          case 'sermons':
            return wrap(
              ${sermonsSec},
              'Prédicas & Mensajes'
            )
          case 'planAVisit':
            return wrap(
              ${planVisitSec},
              'Planifica tu Visita'
            )
          case 'welcome':
            return wrap(
              ${welcomeSec},
              'Bienvenida'
            )
          case 'values':
            return wrap(
              ${valuesSec},
              'Valores & Creencias'
            )
          case 'ministries':
            return wrap(
              ${ministriesSec},
              'Ministerios'
            )
          case 'nextSteps':
            return wrap(
              ${nextStepsSec},
              'Próximos Pasos'
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
          case 'about':
            return wrap(
              ${aboutSec},
              'Sobre Nosotros'
            )
          case 'contact':
            return wrap(
              ${contactSec},
              'Contacto & Footer'
            )
          default:
            return null
        }
      })}

    </div>
  )
}
`;

const updatedFile = beforeSections + dynamicLoop;
fs.writeFileSync(targetFile, updatedFile, 'utf8');
console.log('Successfully updated ChurchTemplateNucleus.jsx!');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateAfiche.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add SectionControlBar import
if (!content.includes("import SectionControlBar from './SectionControlBar'")) {
  content = content.replace("import TemplateDragHandles from './TemplateDragHandles'", "import TemplateDragHandles from './TemplateDragHandles'\nimport SectionControlBar from './SectionControlBar'");
}

// 2. Add onSectionChange to props
content = content.replace(
  "export default function ChurchTemplateAfiche({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {",
  "export default function ChurchTemplateAfiche({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {"
);

// 3. Add order helper code
const helperCode = `
  const DEFAULT_AFICHE_ORDER = [
    'hero',
    'nucleusColumns',
    'ministries',
    'planAVisit',
    'welcome',
    'values',
    'nextSteps',
    'sermons',
    'events',
    'prayerRequest',
    'about',
    'donation',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_AFICHE_ORDER
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

if (!content.includes('DEFAULT_AFICHE_ORDER')) {
  content = content.replace(
    "const activeFont = data.font || 'Syne'\n\n  return (",
    `const activeFont = data.font || 'Syne'\n${helperCode}\n  return (`
  );
}

// Extract sections
const getMatch = (regex, name) => {
  const m = content.match(regex);
  if (!m) throw new Error('Missing section ' + name);
  return m[0];
};

const heroSec = getMatch(/<section id="wp-afiche-hero"[\s\S]*?<\/section>/, 'hero');
const gallerySec = getMatch(/<section id="wp-afiche-gallery"[\s\S]*?<\/section>/, 'nucleusColumns');
const ministriesSec = getMatch(/<section id="wp-ministerios"[\s\S]*?<\/section>/, 'ministries');
const planVisitSec = getMatch(/<section id="wp-plan-visit"[\s\S]*?<\/section>/, 'planAVisit');
const welcomeSec = getMatch(/<section id="wp-welcome"[\s\S]*?<\/section>/, 'welcome');
const valuesSec = getMatch(/<section id="wp-values"[\s\S]*?<\/section>/, 'values');
const nextStepsSec = getMatch(/<section id="wp-next-steps"[\s\S]*?<\/section>/, 'nextSteps');
const sermonsSec = getMatch(/<section id="wp-sermons"[\s\S]*?<\/section>/, 'sermons');
const eventsSec = getMatch(/<section id="wp-events"[\s\S]*?<\/section>/, 'events');
const prayerSec = getMatch(/<section id="wp-prayer"[\s\S]*?<\/section>/, 'prayerRequest');
const aboutSec = getMatch(/<section id="wp-about"[\s\S]*?<\/section>/, 'about');
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
            accentColor={data.accentColor || '#FACC15'}
            primaryColor="#090B10"
          >
            {secContent}
          </SectionControlBar>
        )

        switch (sectionKey) {
          case 'hero':
            return wrap(
              ${heroSec},
              'Hero Afiche'
            )
          case 'nucleusColumns':
          case 'gallery':
            return wrap(
              ${gallerySec},
              'Galería de Afiches'
            )
          case 'ministries':
            return wrap(
              ${ministriesSec},
              'Ministerios & Grupos'
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
          case 'nextSteps':
            return wrap(
              ${nextStepsSec},
              'Próximos Pasos'
            )
          case 'sermons':
            return wrap(
              ${sermonsSec},
              'Prédicas & Mensajes'
            )
          case 'events':
            return wrap(
              ${eventsSec},
              'Eventos & Calendario'
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
          case 'donation':
            return wrap(
              ${donationSec},
              'Ofrendas / Donaciones'
            )
          case 'contact':
            return wrap(
              ${contactSec},
              'Contacto & Redes'
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
console.log('Successfully updated ChurchTemplateAfiche.jsx!');

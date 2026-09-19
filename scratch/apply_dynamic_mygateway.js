import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplateMyGateway.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add SectionControlBar import
if (!content.includes("import SectionControlBar from './SectionControlBar'")) {
  content = content.replace("import TemplateDragHandles from './TemplateDragHandles'", "import TemplateDragHandles from './TemplateDragHandles'\nimport SectionControlBar from './SectionControlBar'");
}

// 2. Add onSectionChange to props
content = content.replace(
  "export default function ChurchTemplateMyGateway({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {",
  "export default function ChurchTemplateMyGateway({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {"
);

// 3. Add order helper code
const helperCode = `
  const DEFAULT_MYGATEWAY_ORDER = [
    'hero',
    'nextSteps',
    'nucleusColumns',
    'testimonials',
    'planAVisit',
    'welcome',
    'values',
    'ministries',
    'sermons',
    'donation',
    'prayerRequest',
    'about',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_MYGATEWAY_ORDER
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

if (!content.includes('DEFAULT_MYGATEWAY_ORDER')) {
  content = content.replace(
    "const activeFont = data.font || 'Syne'\n  const primaryBg = data.primaryColor || '#05070C'\n\n  return (",
    `const activeFont = data.font || 'Syne'\n  const primaryBg = data.primaryColor || '#05070C'\n${helperCode}\n  return (`
  );
}

// Extract sections
const getMatch = (regex, name) => {
  const m = content.match(regex);
  if (!m) throw new Error('Missing section ' + name);
  return m[0];
};

const heroSecMatch = content.match(/<section style=\{\{ position: 'relative', width: '100%', minHeight: '100vh'[\s\S]*?<\/section>/);
if (!heroSecMatch) throw new Error('Missing hero section');
const heroSec = heroSecMatch[0].replace(
  "<section style={{ position: 'relative', width: '100%', minHeight: '100vh'",
  "<section id=\"wp-hero\" style={{ position: 'relative', width: '100%', minHeight: '100vh'"
);

const nextStepsSec = getMatch(/<section id="wp-next-steps"[\s\S]*?<\/section>/, 'nextSteps');
const eventsSec = getMatch(/<section id="wp-eventos"[\s\S]*?<\/section>/, 'events');
const testimonialsSecMatch = content.match(/<section style=\{\{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' \}\}>[\s\S]*?<\/section>/);
if (!testimonialsSecMatch) throw new Error('Missing testimonials section');
const testimonialsSec = testimonialsSecMatch[0].replace(
  "<section style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>",
  "<section id=\"wp-testimonials\" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>"
);

const planVisitSec = getMatch(/<section id="wp-plan-visit"[\s\S]*?<\/section>/, 'planAVisit');
const welcomeSec = getMatch(/<section id="wp-welcome"[\s\S]*?<\/section>/, 'welcome');
const valuesSec = getMatch(/<section id="wp-values"[\s\S]*?<\/section>/, 'values');
const ministriesSec = getMatch(/<section id="wp-ministries"[\s\S]*?<\/section>/, 'ministries');
const sermonsSec = getMatch(/<section id="wp-sermons"[\s\S]*?<\/section>/, 'sermons');
const donationSec = getMatch(/<section id="wp-donations"[\s\S]*?<\/section>/, 'donation');
const prayerSec = getMatch(/<section id="wp-prayer"[\s\S]*?<\/section>/, 'prayer');
const aboutSec = getMatch(/<section id="wp-about"[\s\S]*?<\/section>/, 'about');
const contactSec = getMatch(/<footer id="wp-contact"[\s\S]*?<\/footer>/, 'contact');

// Find style tag end
const styleEndMarker = '</style>';
const styleEndIdx = content.indexOf(styleEndMarker);
if (styleEndIdx === -1) throw new Error('Style end not found');
const beforeSections = content.slice(0, styleEndIdx + styleEndMarker.length);

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
            accentColor="#E11D48"
            primaryColor="#05070C"
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
          case 'nextSteps':
            return wrap(
              ${nextStepsSec},
              'Próximos Pasos'
            )
          case 'nucleusColumns':
          case 'events':
            return wrap(
              ${eventsSec},
              'Eventos & Calendario'
            )
          case 'testimonials':
            return wrap(
              ${testimonialsSec},
              'Testimonios'
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
          case 'sermons':
            return wrap(
              ${sermonsSec},
              'Prédicas & Mensajes'
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
console.log('Successfully updated ChurchTemplateMyGateway.jsx!');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '..', 'src', 'components', 'ChurchTemplatePoster.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add SectionControlBar import
if (!content.includes("import SectionControlBar from './SectionControlBar'")) {
  content = content.replace("import TemplateDragHandles from './TemplateDragHandles'", "import TemplateDragHandles from './TemplateDragHandles'\nimport SectionControlBar from './SectionControlBar'");
}

// 2. Add onSectionChange to props
content = content.replace(
  "export default function ChurchTemplatePoster({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {",
  "export default function ChurchTemplatePoster({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {"
);

// 3. Add order helpers right before the return statement
const helperCode = `
  const DEFAULT_POSTER_ORDER = ['hero', 'planAVisit', 'nucleusColumns', 'nextSteps', 'missionBlock', 'events', 'donation', 'prayerRequest', 'contact']
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_POSTER_ORDER
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

if (!content.includes('DEFAULT_POSTER_ORDER')) {
  content = content.replace(
    "const primaryBg = data.primaryColor || '#000000'\n\n  return (",
    `const primaryBg = data.primaryColor || '#000000'\n${helperCode}\n  return (`
  );
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Poster step 1 applied.');

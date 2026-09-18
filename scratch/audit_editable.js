const fs = require('fs');

function auditTemplate(filePath, name) {
  console.log('Auditing', name);
  const code = fs.readFileSync(filePath, 'utf8');
  
  // Find all sections
  const sectionRegex = /<section[^>]*id="([^"]+)"[^>]*>/g;
  let match;
  while ((match = sectionRegex.exec(code)) !== null) {
    const sectionId = match[1];
    const startIndex = match.index;
    const nextSectionIndex = code.indexOf('<section', startIndex + 1);
    const sectionBody = nextSectionIndex !== -1 ? code.slice(startIndex, nextSectionIndex) : code.slice(startIndex);
    
    // Count handleEdit
    const editCount = (sectionBody.match(/handleEdit/g) || []).length;
    console.log(`Section ${sectionId}: ${editCount} editable elements`);
  }
}

auditTemplate('src/components/ChurchTemplateAfiche.jsx', 'Afiche (Opción 1)');
auditTemplate('src/components/ChurchTemplateNucleus.jsx', 'Nucleus (Opción 2)');
auditTemplate('src/components/ChurchTemplatePoster.jsx', 'Poster (Opción 3)');
auditTemplate('src/components/ChurchTemplateMyGateway.jsx', 'MyGateway (Opción 4)');

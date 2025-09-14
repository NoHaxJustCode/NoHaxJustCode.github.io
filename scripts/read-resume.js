// scripts/read-resume.js
// Extracts text from src/pages/AvinashPaluri_Resume.pdf and writes public/resume-data.json
// Usage: node scripts/read-resume.js

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

async function main() {
  const pdfPath = path.resolve(__dirname, '..', 'src', 'pages', 'AvinashPaluri_Resume.pdf');
  const outJsonPath = path.resolve(__dirname, '..', 'public', 'resume-data.json');
  const outTxtPath = path.resolve(__dirname, '..', 'public', 'resume-raw.txt');

  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF not found at: ${pdfPath}`);
    process.exit(1);
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);

  // Basic heuristic to split sections by common headings
  const raw = data.text;
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const sections = {
    summary: '',
    experience: [],
    education: [],
    skills: [],
    awards: [],
    raw,
  };

  // Very naive heuristics; we’ll refine after seeing actual content
  let currentSection = 'summary';
  for (const line of lines) {
    const l = line.toLowerCase();
    if (/(experience|work experience)/i.test(line)) { currentSection = 'experience'; continue; }
    if (/education/i.test(line)) { currentSection = 'education'; continue; }
    if (/(skills|technical skills)/i.test(line)) { currentSection = 'skills'; continue; }
    if (/(awards|certifications|honors)/i.test(line)) { currentSection = 'awards'; continue; }

    switch (currentSection) {
      case 'summary':
        sections.summary += (sections.summary ? ' ' : '') + line;
        break;
      case 'skills':
        // split by commas
        line.split(/[,•]|\s{2,}/).map(s => s.trim()).filter(Boolean).forEach(s => sections.skills.push(s));
        break;
      case 'experience':
        // capture role/company heuristically: Role at Company or Company – Role
        // collect bullets starting with - or •
        if (/^[-•]/.test(line)) {
          const last = sections.experience[sections.experience.length - 1];
          if (last) {
            last.bullets.push(line.replace(/^[-•]\s?/, ''));
          }
        } else {
          // start a new item if line looks like a title
          if (/(engineer|developer|intern|manager|lead|architect)/i.test(line)) {
            sections.experience.push({ title: line, bullets: [] });
          } else {
            const last = sections.experience[sections.experience.length - 1];
            if (last) {
              if (!last.meta) last.meta = [];
              last.meta.push(line);
            }
          }
        }
        break;
      case 'education':
        sections.education.push(line);
        break;
      case 'awards':
        sections.awards.push(line);
        break;
    }
  }

  // Write artifacts
  fs.writeFileSync(outTxtPath, raw, 'utf-8');
  fs.writeFileSync(outJsonPath, JSON.stringify(sections, null, 2), 'utf-8');

  console.log('Extraction complete. Outputs:');
  console.log(` - ${outJsonPath}`);
  console.log(` - ${outTxtPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('scratch/resume_template.html');
const tempPdfPath = path.resolve('scratch/output_resume.pdf');
const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'edge_pdf_profile_' + Date.now());

const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

const command = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf-no-header --user-data-dir="${userDataDir}" --print-to-pdf="${tempPdfPath}" "${fileUrl}"`;

console.log('Generating PDF using Microsoft Edge engine...');
execSync(command, { stdio: 'inherit' });

if (fs.existsSync(tempPdfPath)) {
  const pdfBytes = fs.readFileSync(tempPdfPath);
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'Anand Kumar Mishra.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'Anand_Kumar_Mishra_Resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'Anand Kumar Mishra.pdf'), pdfBytes);
    fs.writeFileSync(path.join(distDir, 'Anand_Kumar_Mishra_Resume.pdf'), pdfBytes);
    fs.writeFileSync(path.join(distDir, 'resume.pdf'), pdfBytes);
  }

  console.log('✅ PDF generated and synced successfully to public/ and dist/:');
  console.log('- Anand Kumar Mishra.pdf');
  console.log('- Anand_Kumar_Mishra_Resume.pdf');
  console.log('- resume.pdf');
} else {
  console.error('Failed to generate PDF at', tempPdfPath);
}

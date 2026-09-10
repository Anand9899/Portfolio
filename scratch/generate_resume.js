import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  
  // A4 Page size: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  // Color Palette
  const darkBlack = rgb(0.08, 0.08, 0.08); // #141414
  const bodyText = rgb(0.15, 0.15, 0.15); // #262626
  const grayText = rgb(0.35, 0.35, 0.35); // #595959
  const primaryBlue = rgb(0.25, 0.45, 0.75); // Section title blue #4073bf
  const lineBlue = rgb(0.65, 0.78, 0.92); // Horizontal line #a6c7eb
  const linkBlue = rgb(0.15, 0.45, 0.82); // Clickable link blue #2673d1

  const marginX = 45;
  const contentWidth = pageWidth - (marginX * 2);
  let y = pageHeight - 42;

  // Helper to center text
  function drawCenteredText(text, yPos, font, size, color) {
    const width = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (pageWidth - width) / 2,
      y: yPos,
      font,
      size,
      color
    });
  }

  // --- HEADER ---
  drawCenteredText('Anand Kumar Mishra', y, fontBold, 20, darkBlack);
  y -= 18;

  drawCenteredText('Full Stack .NET Developer | Final Year MCA Student', y, fontItalic, 9.5, grayText);
  y -= 14;

  // Contact line: Phone | Email | Location
  const phoneText = '+91-95769 89908';
  const sep = ' | ';
  const emailText = 'anandmishra02.com@gmail.com';
  const locText = 'Noida, UP';

  const fullContactWidth = 
    fontRegular.widthOfTextAtSize(phoneText, 9) +
    fontRegular.widthOfTextAtSize(sep, 9) * 2 +
    fontRegular.widthOfTextAtSize(emailText, 9) +
    fontRegular.widthOfTextAtSize(locText, 9);

  let contactX = (pageWidth - fullContactWidth) / 2;
  page.drawText(phoneText, { x: contactX, y, font: fontRegular, size: 9, color: bodyText });
  contactX += fontRegular.widthOfTextAtSize(phoneText, 9);

  page.drawText(sep, { x: contactX, y, font: fontRegular, size: 9, color: grayText });
  contactX += fontRegular.widthOfTextAtSize(sep, 9);

  page.drawText(emailText, { x: contactX, y, font: fontRegular, size: 9, color: linkBlue });
  // Underline email
  const emailW = fontRegular.widthOfTextAtSize(emailText, 9);
  page.drawLine({
    start: { x: contactX, y: y - 1.5 },
    end: { x: contactX + emailW, y: y - 1.5 },
    thickness: 0.6,
    color: linkBlue
  });
  contactX += emailW;

  page.drawText(sep, { x: contactX, y, font: fontRegular, size: 9, color: grayText });
  contactX += fontRegular.widthOfTextAtSize(sep, 9);

  page.drawText(locText, { x: contactX, y, font: fontRegular, size: 9, color: bodyText });
  y -= 14;

  // Links line: Portfolio | LinkedIn | GitHub
  const pText = 'Portfolio';
  const lText = 'LinkedIn';
  const gText = 'GitHub';
  const linksWidth = 
    fontRegular.widthOfTextAtSize(pText, 9) +
    fontRegular.widthOfTextAtSize(sep, 9) * 2 +
    fontRegular.widthOfTextAtSize(lText, 9) +
    fontRegular.widthOfTextAtSize(gText, 9);

  let linkX = (pageWidth - linksWidth) / 2;
  
  // Portfolio Link
  page.drawText(pText, { x: linkX, y, font: fontRegular, size: 9, color: linkBlue });
  page.drawLine({
    start: { x: linkX, y: y - 1.5 },
    end: { x: linkX + fontRegular.widthOfTextAtSize(pText, 9), y: y - 1.5 },
    thickness: 0.6,
    color: linkBlue
  });
  linkX += fontRegular.widthOfTextAtSize(pText, 9);

  page.drawText(sep, { x: linkX, y, font: fontRegular, size: 9, color: grayText });
  linkX += fontRegular.widthOfTextAtSize(sep, 9);

  // LinkedIn Link
  page.drawText(lText, { x: linkX, y, font: fontRegular, size: 9, color: linkBlue });
  page.drawLine({
    start: { x: linkX, y: y - 1.5 },
    end: { x: linkX + fontRegular.widthOfTextAtSize(lText, 9), y: y - 1.5 },
    thickness: 0.6,
    color: linkBlue
  });
  linkX += fontRegular.widthOfTextAtSize(lText, 9);

  page.drawText(sep, { x: linkX, y, font: fontRegular, size: 9, color: grayText });
  linkX += fontRegular.widthOfTextAtSize(sep, 9);

  // GitHub Link
  page.drawText(gText, { x: linkX, y, font: fontRegular, size: 9, color: linkBlue });
  page.drawLine({
    start: { x: linkX, y: y - 1.5 },
    end: { x: linkX + fontRegular.widthOfTextAtSize(gText, 9), y: y - 1.5 },
    thickness: 0.6,
    color: linkBlue
  });

  y -= 18;

  // --- SECTION DRAWING HELPER ---
  function drawSectionTitle(title) {
    page.drawText(title, {
      x: marginX,
      y,
      font: fontBold,
      size: 9.8,
      color: primaryBlue
    });
    y -= 4;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 1.2,
      color: lineBlue
    });
    y -= 11;
  }

  // Word wrap helper for justified/left-aligned paragraph text
  function drawParagraph(text, fontSize = 8.6, lineHeight = 11.5) {
    const words = text.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const width = fontRegular.widthOfTextAtSize(testLine, fontSize);
      if (width > contentWidth) {
        page.drawText(currentLine, {
          x: marginX,
          y,
          font: fontRegular,
          size: fontSize,
          color: bodyText
        });
        y -= lineHeight;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: marginX,
        y,
        font: fontRegular,
        size: fontSize,
        color: bodyText
      });
      y -= lineHeight;
    }
  }

  // Bullet point helper with optional bold label
  function drawBullet(boldPrefix, normalText, fontSize = 8.5, lineHeight = 11.5, bulletIndent = 16) {
    const bulletSymbol = '•';
    page.drawText(bulletSymbol, {
      x: marginX + bulletIndent - 10,
      y,
      font: fontBold,
      size: fontSize + 1,
      color: darkBlack
    });

    const words = normalText.split(' ');
    let lineX = marginX + bulletIndent;
    let isFirstLine = true;
    let currentLine = '';

    const prefixWidth = boldPrefix ? fontBold.widthOfTextAtSize(boldPrefix, fontSize) : 0;
    if (boldPrefix) {
      page.drawText(boldPrefix, {
        x: lineX,
        y,
        font: fontBold,
        size: fontSize,
        color: darkBlack
      });
      lineX += prefixWidth;
    }

    const firstLineAvailable = contentWidth - bulletIndent - prefixWidth;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      const maxW = isFirstLine ? firstLineAvailable : (contentWidth - bulletIndent);

      if (testWidth > maxW) {
        if (currentLine) {
          page.drawText(currentLine, {
            x: lineX,
            y,
            font: fontRegular,
            size: fontSize,
            color: bodyText
          });
        }
        y -= lineHeight;
        isFirstLine = false;
        lineX = marginX + bulletIndent;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: lineX,
        y,
        font: fontRegular,
        size: fontSize,
        color: bodyText
      });
      y -= lineHeight;
    }
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionTitle('PROFESSIONAL SUMMARY');
  drawParagraph('Final-year MCA student (Expected 2027) specializing in Full Stack .NET Development. Skilled in ASP.NET Core, ASP.NET MVC 5, C#, SQL Server, MySQL, HTML, CSS, JavaScript, and Bootstrap, with hands-on experience in developing web applications using MVC Architecture, RESTful APIs, and CRUD operations. Familiar with Git, Visual Studio, and responsive web development. Passionate about building scalable and user-friendly web applications, and eager to contribute as a Full Stack .NET Developer in a collaborative and growth-oriented environment.', 8.6, 11.6);
  y -= 4;

  // 2. TECHNICAL SKILLS
  drawSectionTitle('TECHNICAL SKILLS');
  drawBullet('Frontend : ', 'HTML, CSS, JavaScript, Bootstrap', 8.6, 11.8, 16);
  drawBullet('Backend: ', 'ASP.NET Core, ASP.NET MVC 5, ASP.NET Core Web API, ASP.NET Web Forms, C#', 8.6, 11.8, 16);
  drawBullet('Concepts: ', 'MVC Architecture, RESTful APIs, CRUD Operations', 8.6, 11.8, 16);
  drawBullet('Databases: ', 'SQL Server, MySQL', 8.6, 11.8, 16);
  drawBullet('Tools/Platforms: ', 'Visual Studio 2019/2022, Git, GitHub, Postman', 8.6, 11.8, 16);
  y -= 4;

  // 3. PROJECTS
  drawSectionTitle('PROJECTS');
  
  // Project 1
  page.drawText('Recruitment Management System', {
    x: marginX,
    y,
    font: fontBold,
    size: 8.8,
    color: darkBlack
  });
  y -= 11.5;
  drawBullet('', 'Developed a web-based system using ASP.NET and C# for managing job postings and applications', 8.4, 11.2, 16);
  drawBullet('', 'Implemented user authentication and registration functionalities', 8.4, 11.2, 16);
  drawBullet('', 'Designed responsive UI using HTML, CSS, JavaScript, and Bootstrap', 8.4, 11.2, 16);
  drawBullet('', 'Integrated SQL Server database with efficient CRUD operations', 8.4, 11.2, 16);
  drawBullet('', 'Applied MVC concepts to ensure clean and maintainable code structure', 8.4, 11.2, 16);
  y -= 2;

  // Project 2
  page.drawText('Simon Game', {
    x: marginX,
    y,
    font: fontBold,
    size: 8.8,
    color: darkBlack
  });
  y -= 11.5;
  drawBullet('', 'Developed an interactive Simon Game using HTML, CSS, and JavaScript.', 8.4, 11.2, 16);
  drawBullet('', 'Implemented random color sequence generation and user input validation for gameplay.', 8.4, 11.2, 16);
  drawBullet('', 'Applied DOM Manipulation and Event Handling to create an interactive user experience.', 8.4, 11.2, 16);
  drawBullet('', 'Designed a responsive and visually engaging interface with level progression and game-over functionality.', 8.4, 11.2, 16);
  y -= 4;

  // 4. STRENGTHS
  drawSectionTitle('STRENGTHS');
  drawParagraph('Strong in problem-solving, communication, and teamwork, with good leadership and time management skills. A quick learner who easily adapts to new technologies and environments.', 8.6, 11.6);
  y -= 4;

  // 5. EDUCATION
  drawSectionTitle('EDUCATION');
  drawBullet('', 'Master of Computer Applications (MCA) – Mangalayatan University, Aligarh (Expected 2027)', 8.5, 11.5, 16);
  drawBullet('', 'Bachelor of Computer Applications (BCA) — Maulana Mazharul Haque Arabic and Persian University, Patna (MMHAPU) (2025)', 8.5, 11.5, 16);
  drawBullet('', '10+2 — Bihar Intermediate Education Council (2021)', 8.5, 11.5, 16);
  drawBullet('', '10th — Central Board of Secondary Education (CBSE) (2019)', 8.5, 11.5, 16);
  y -= 4;

  // 6. CERTIFICATIONS
  drawSectionTitle('CERTIFICATIONS');
  drawBullet('', 'Full Stack Web Development — Apna College (2024)', 8.5, 11.5, 16);
  drawBullet('', 'DSA with Java — Apna College (2024)', 8.5, 11.5, 16);
  drawBullet('', 'Java Expert — Ducat (2025)', 8.5, 11.5, 16);
  drawBullet('', 'Microsoft Power BI — Skill Course(2025)', 8.5, 11.5, 16);

  // Save PDF bytes
  const pdfBytes = await pdfDoc.save();
  
  // Write to public directory
  const publicDir = path.resolve('public');
  fs.writeFileSync(path.join(publicDir, 'Anand Kumar Mishra.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'Anand_Kumar_Mishra_Resume.pdf'), pdfBytes);

  console.log('PDF generated successfully at public/Anand Kumar Mishra.pdf & public/Anand_Kumar_Mishra_Resume.pdf');
}

createResume().catch(console.error);

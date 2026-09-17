import { PDFDocument, PDFString, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4 dimensions: 595.28 x 841.89 pt
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Exact matching color palette from original resume
  const pureBlack = rgb(0.0, 0.0, 0.0);
  const darkBlack = rgb(0.08, 0.08, 0.08); 
  const bodyText = rgb(0.12, 0.12, 0.12);
  const grayText = rgb(0.40, 0.40, 0.40);
  const sectionBlue = rgb(0.20, 0.42, 0.70); // #336bb2
  const lineBlue = rgb(0.58, 0.72, 0.88);    // #94b8e0
  const linkBlue = rgb(0.12, 0.42, 0.78);    // #1f6bc7

  const marginX = 44;
  const contentWidth = pageWidth - (marginX * 2);
  const bulletX = marginX + 16;
  const textX = marginX + 28;

  let y = pageHeight - 42;

  // Helper for clickable hyperlinks
  function drawClickableLink(text, url, xPos, yPos, font = fontRegular, fontSize = 9.5, color = linkBlue) {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    
    page.drawText(text, {
      x: xPos,
      y: yPos,
      font,
      size: fontSize,
      color
    });

    page.drawLine({
      start: { x: xPos, y: yPos - 1.2 },
      end: { x: xPos + textWidth, y: yPos - 1.2 },
      thickness: 0.7,
      color
    });

    const linkAnnot = pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [xPos - 1, yPos - 3, xPos + textWidth + 1, yPos + fontSize + 2],
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });
    const linkRef = pdfDoc.context.register(linkAnnot);
    page.node.addAnnot(linkRef);

    return textWidth;
  }

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

  // ==================== HEADER ====================
  drawCenteredText('Anand Kumar Mishra', y, fontBold, 21, pureBlack);
  y -= 18;

  drawCenteredText('Full Stack .NET Developer | Final Year MCA Student', y, fontItalic, 9.8, grayText);
  y -= 15;

  // Contact line: Phone | Email | Location
  const phoneText = '+91-95769 89908';
  const sep = ' | ';
  const emailText = 'anandmishra02.com@gmail.com';
  const locText = 'Noida, UP';

  const fullContactWidth = 
    fontRegular.widthOfTextAtSize(phoneText, 9.5) +
    fontRegular.widthOfTextAtSize(sep, 9.5) * 2 +
    fontRegular.widthOfTextAtSize(emailText, 9.5) +
    fontRegular.widthOfTextAtSize(locText, 9.5);

  let contactX = (pageWidth - fullContactWidth) / 2;
  page.drawText(phoneText, { x: contactX, y, font: fontRegular, size: 9.5, color: bodyText });
  contactX += fontRegular.widthOfTextAtSize(phoneText, 9.5);

  page.drawText(sep, { x: contactX, y, font: fontRegular, size: 9.5, color: grayText });
  contactX += fontRegular.widthOfTextAtSize(sep, 9.5);

  const emailW = drawClickableLink(emailText, `mailto:${emailText}`, contactX, y, fontRegular, 9.5, linkBlue);
  contactX += emailW;

  page.drawText(sep, { x: contactX, y, font: fontRegular, size: 9.5, color: grayText });
  contactX += fontRegular.widthOfTextAtSize(sep, 9.5);

  page.drawText(locText, { x: contactX, y, font: fontRegular, size: 9.5, color: bodyText });
  y -= 14;

  // Links line: Portfolio | LinkedIn | GitHub
  const pText = 'Portfolio';
  const lText = 'LinkedIn';
  const gText = 'GitHub';
  const linksWidth = 
    fontRegular.widthOfTextAtSize(pText, 9.5) +
    fontRegular.widthOfTextAtSize(sep, 9.5) * 2 +
    fontRegular.widthOfTextAtSize(lText, 9.5) +
    fontRegular.widthOfTextAtSize(gText, 9.5);

  let linkX = (pageWidth - linksWidth) / 2;
  
  const portfolioUrl = 'https://anand9899.github.io/Portfolio/';
  const pW = drawClickableLink(pText, portfolioUrl, linkX, y, fontRegular, 9.5, linkBlue);
  linkX += pW;

  page.drawText(sep, { x: linkX, y, font: fontRegular, size: 9.5, color: grayText });
  linkX += fontRegular.widthOfTextAtSize(sep, 9.5);

  const linkedInUrl = 'https://www.linkedin.com/in/anand-kumar-mishra-3b4a9717a/';
  const lW = drawClickableLink(lText, linkedInUrl, linkX, y, fontRegular, 9.5, linkBlue);
  linkX += lW;

  page.drawText(sep, { x: linkX, y, font: fontRegular, size: 9.5, color: grayText });
  linkX += fontRegular.widthOfTextAtSize(sep, 9.5);

  const githubUrl = 'https://github.com/Anand9899';
  drawClickableLink(gText, githubUrl, linkX, y, fontRegular, 9.5, linkBlue);

  y -= 20;

  // ==================== SECTION TITLE HELPER ====================
  function drawSectionTitle(title) {
    page.drawText(title, {
      x: marginX,
      y,
      font: fontBold,
      size: 10.2,
      color: sectionBlue
    });
    y -= 3.5;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 1.2,
      color: lineBlue
    });
    y -= 11.5;
  }

  // Word wrapped paragraph
  function drawParagraph(text, fontSize = 9.2, lineHeight = 12.8) {
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

  // Bullet point with optional bold prefix
  function drawBulletItem(boldPrefix, normalText, fontSize = 8.8, lineHeight = 12.0) {
    page.drawText('•', {
      x: bulletX,
      y,
      font: fontBold,
      size: fontSize + 1,
      color: pureBlack
    });

    let currentX = textX;
    let isFirstLine = true;

    if (boldPrefix) {
      page.drawText(boldPrefix, {
        x: currentX,
        y,
        font: fontBold,
        size: fontSize,
        color: pureBlack
      });
      currentX += fontBold.widthOfTextAtSize(boldPrefix, fontSize);
    }

    const availableFirst = pageWidth - marginX - currentX;
    const availableRest = pageWidth - marginX - textX;

    const words = normalText.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      const maxW = isFirstLine ? availableFirst : availableRest;

      if (testWidth > maxW) {
        if (currentLine) {
          page.drawText(currentLine, {
            x: isFirstLine ? currentX : textX,
            y,
            font: fontRegular,
            size: fontSize,
            color: bodyText
          });
        }
        y -= lineHeight;
        isFirstLine = false;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: isFirstLine ? currentX : textX,
        y,
        font: fontRegular,
        size: fontSize,
        color: bodyText
      });
      y -= lineHeight;
    }
  }

  // Technical skills row with aligned columns
  function drawSkillRow(category, details, colX = 138, fontSize = 8.8, lineHeight = 12.2) {
    page.drawText('•', {
      x: bulletX,
      y,
      font: fontBold,
      size: fontSize + 1,
      color: pureBlack
    });

    page.drawText(category, {
      x: textX,
      y,
      font: fontRegular,
      size: fontSize,
      color: pureBlack
    });

    const words = details.split(' ');
    let currentLine = '';
    let isFirst = true;
    const maxFirstWidth = pageWidth - marginX - colX;
    const maxRestWidth = pageWidth - marginX - colX;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      const limit = isFirst ? maxFirstWidth : maxRestWidth;

      if (testWidth > limit) {
        if (currentLine) {
          page.drawText(currentLine, {
            x: colX,
            y,
            font: fontRegular,
            size: fontSize,
            color: bodyText
          });
        }
        y -= lineHeight;
        isFirst = false;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: colX,
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
  drawParagraph('Final-year MCA student (Expected 2027) specializing in Full Stack .NET Development. Skilled in ASP.NET Core, ASP.NET MVC 5, C#, SQL Server, MySQL, HTML, CSS, JavaScript, and Bootstrap, with hands-on experience in developing web applications using MVC Architecture, RESTful APIs, and CRUD operations. Familiar with Git, Visual Studio, and responsive web development. Passionate about building scalable and user-friendly web applications, and eager to contribute as a Full Stack .NET Developer in a collaborative and growth-oriented environment.', 9.2, 12.8);
  y -= 5;

  // 2. TECHNICAL SKILLS
  drawSectionTitle('TECHNICAL SKILLS');
  drawSkillRow('Frontend :', 'HTML, CSS, JavaScript, Bootstrap', 135, 8.9, 12.2);
  drawSkillRow('Backend:', 'ASP.NET Core, ASP.NET MVC 5, ASP.NET Core Web API, ASP.NET Web Forms, C#', 135, 8.9, 12.2);
  drawSkillRow('Concepts:', 'MVC Architecture, RESTful APIs, CRUD Operations', 135, 8.9, 12.2);
  drawSkillRow('Databases:', 'SQL Server, MySQL', 135, 8.9, 12.2);
  drawSkillRow('Tools/Platforms:', 'Visual Studio 2019/2022, Git, GitHub, Postman', 135, 8.9, 12.2);
  y -= 5;

  // 3. PROJECTS
  drawSectionTitle('PROJECTS');
  
  // Project 1
  page.drawText('Recruitment Management System', {
    x: marginX,
    y,
    font: fontBold,
    size: 9.3,
    color: pureBlack
  });
  y -= 12.5;
  drawBulletItem('', 'Developed a web-based system using ASP.NET and C# for managing job postings and applications', 8.8, 12.0);
  drawBulletItem('', 'Implemented user authentication and registration functionalities', 8.8, 12.0);
  drawBulletItem('', 'Designed responsive UI using HTML, CSS, JavaScript, and Bootstrap', 8.8, 12.0);
  drawBulletItem('', 'Integrated SQL Server database with efficient CRUD operations', 8.8, 12.0);
  drawBulletItem('', 'Applied MVC concepts to ensure clean and maintainable code structure', 8.8, 12.0);
  y -= 2;

  // Project 2
  page.drawText('Simon Game', {
    x: marginX,
    y,
    font: fontBold,
    size: 9.3,
    color: pureBlack
  });
  y -= 12.5;
  drawBulletItem('', 'Developed an interactive Simon Game using HTML, CSS, and JavaScript.', 8.8, 12.0);
  drawBulletItem('', 'Implemented random color sequence generation and user input validation for gameplay.', 8.8, 12.0);
  drawBulletItem('', 'Applied DOM Manipulation and Event Handling to create an interactive user experience.', 8.8, 12.0);
  drawBulletItem('', 'Designed a responsive and visually engaging interface with level progression and game-over functionality.', 8.8, 12.0);
  y -= 5;

  // 4. INTERNSHIP EXPERIENCE
  drawSectionTitle('INTERNSHIP EXPERIENCE');
  page.drawText('Full Stack Development Intern | Sysslan IT Solutions Aug 2026 – Sep 2026', {
    x: marginX,
    y,
    font: fontBold,
    size: 9.3,
    color: pureBlack
  });
  y -= 12.5;
  drawBulletItem('', 'Completed a Full Stack Development Internship involving practical web application development.', 8.8, 12.0);
  drawBulletItem('', 'Worked on responsive user interface development and frontend application development.', 8.8, 12.0);
  drawBulletItem('', 'Gained practical exposure to backend services and REST APIs.', 8.8, 12.0);
  drawBulletItem('', 'Worked with database integration, authentication, debugging, and testing.', 8.8, 12.0);
  y -= 5;

  // 5. EDUCATION
  drawSectionTitle('EDUCATION');
  drawBulletItem('Master of Computer Applications (MCA) ', '– Mangalayatan University, Aligarh (Expected 2027)', 8.8, 12.0);
  drawBulletItem('Bachelor of Computer Applications (BCA) ', '— Maulana Mazharul Haque Arabic and Persian University, Patna (MMHAPU) (2025)', 8.8, 12.0);
  y -= 5;

  // 6. Internship Certificate
  drawSectionTitle('Internship Certificate');
  drawBulletItem('', 'Sysslan IT Solutions | Full Stack Development Sep 2026', 8.8, 12.0);
  y -= 5;

  // 7. CERTIFICATIONS
  drawSectionTitle('CERTIFICATIONS');
  drawBulletItem('Full Stack Web Development ', '— Apna College (2024)', 8.8, 12.0);
  drawBulletItem('DSA with Java ', '— Apna College (2024)', 8.8, 12.0);
  drawBulletItem('Java Expert ', '— Ducat (2025)', 8.8, 12.0);
  drawBulletItem('Microsoft Power BI ', '— Skill Course(2025)', 8.8, 12.0);

  console.log(`Final Y position remaining on page: ${y.toFixed(2)} pt (Page height: ${pageHeight} pt)`);

  // Save PDF bytes
  const pdfBytes = await pdfDoc.save();
  
  // Write to public directory
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'Anand Kumar Mishra.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'Anand_Kumar_Mishra_Resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);

  console.log('PDF generated successfully with clickable links at:');
  console.log('- public/Anand Kumar Mishra.pdf');
  console.log('- public/Anand_Kumar_Mishra_Resume.pdf');
  console.log('- public/resume.pdf');
}

createResume().catch(console.error);

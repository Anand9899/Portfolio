import fs from 'fs';

const imgBuffer = fs.readFileSync('public/logo.png');
const base64 = imgBuffer.toString('base64');
const dataUri = 'data:image/jpeg;base64,' + base64;

// The ChatGPT icon fills the entire 16x16 tab box.
// We make the AK circle touch the outer boundaries completely (full bleed 0 to 500)
// and zoom into the inner blue ring so it fills 100% of the canvas.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="250" cy="250" r="250" />
    </clipPath>
  </defs>
  <g clip-path="url(#circle-clip)">
    <!-- Full-bleed zoom so the blue circular ring is at the very outer edge -->
    <image href="${dataUri}" x="-50" y="-50" width="600" height="600" preserveAspectRatio="xMidYMid slice" />
  </g>
</svg>`;

fs.writeFileSync('public/favicon.svg', svgContent);
console.log('Full-bleed SVG Favicon created!');

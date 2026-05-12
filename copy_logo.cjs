const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\24346\\.gemini\\antigravity\\brain\\b6861623-a653-403e-a82b-135faadc0ae5\\media__1778397796783.png';
const dest = path.join(__dirname, 'public', 'logo.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
} else {
  console.log(`File not found: ${src}`);
}

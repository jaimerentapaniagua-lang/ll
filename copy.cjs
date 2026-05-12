const fs = require('fs');
const path = require('path');

const filesToCopy = [
  { src: 'C:\\Users\\24346\\.gemini\\antigravity\\brain\\b6861623-a653-403e-a82b-135faadc0ae5\\dental_hero_bg_1778396006993.png', dest: path.join(__dirname, 'public', 'hero.png') },
  { src: 'C:\\Users\\24346\\.gemini\\antigravity\\brain\\b6861623-a653-403e-a82b-135faadc0ae5\\dental_scanner_1778396379625.png', dest: path.join(__dirname, 'public', 'scanner.png') },
  { src: 'C:\\Users\\24346\\.gemini\\antigravity\\brain\\b6861623-a653-403e-a82b-135faadc0ae5\\dental_printer_1778396428266.png', dest: path.join(__dirname, 'public', 'printer.png') }
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file.src)) {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.log(`File not found: ${file.src}`);
  }
});

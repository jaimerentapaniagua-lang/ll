const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\24346\\.gemini\\antigravity\\brain\\b6861623-a653-403e-a82b-135faadc0ae5';
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
  .map(f => ({
    name: f,
    time: fs.statSync(path.join(dir, f)).mtime.getTime()
  }))
  .sort((a, b) => b.time - a.time);

console.log(files.slice(0, 5));

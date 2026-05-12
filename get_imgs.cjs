const fs = require('fs');
const html = fs.readFileSync('catalog.html', 'utf8');
const regex = /<img[^>]+src=['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}

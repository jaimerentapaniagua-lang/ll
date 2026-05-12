const https = require('https');
const fs = require('fs');

https.get('https://www.clvmexico.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const urls = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].toLowerCase().includes('logo') || match[1].toLowerCase().includes('brand') || match[1].toLowerCase().includes('marcas') || match[1].toLowerCase().includes('.png') || match[1].toLowerCase().includes('.svg') || match[1].toLowerCase().includes('webp')) {
        urls.push(match[1]);
      }
    }
    fs.writeFileSync('C:\\Users\\24346\\OneDrive\\Escritorio\\dental\\logos.txt', urls.join('\n'));
  });
}).on('error', err => fs.writeFileSync('C:\\Users\\24346\\OneDrive\\Escritorio\\dental\\logos.txt', err.message));

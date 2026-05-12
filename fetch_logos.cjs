const https = require('https');

https.get('https://www.clvmexico.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const urls = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].includes('logo') || match[1].includes('marcas') || match[1].includes('brand') || match[1].includes('webp')) {
        urls.push(match[1]);
      }
    }
    console.log(urls.join('\n'));
  });
}).on('error', err => console.log(err.message));

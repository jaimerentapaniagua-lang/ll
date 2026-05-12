const https = require('https');
const http = require('http');
const fs = require('fs');

const fetchHtml = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

(async () => {
  try {
    const exo = await fetchHtml('https://exocad.com/our-products/exocad-dentalcad');
    const m = exo.match(/<img[^>]+src=["']([^"']*csm_[^"']+)["']/i);
    console.log("Exocad:", m ? m[1] : "Not found");

    const asiga = await fetchHtml('https://www.asiga.com/3d-printers/max-uv/');
    const m2 = asiga.match(/<img[^>]+src=["']([^"']+png)["']/i);
    console.log("Asiga:", m2 ? m2[1] : "Not found");
  } catch(e) {
    console.error(e);
  }
})();

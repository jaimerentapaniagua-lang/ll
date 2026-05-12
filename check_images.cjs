const fs = require('fs');
const https = require('https');
const http = require('http');

const html = fs.readFileSync('catalog.html', 'utf8');
const regex = /<img[^>]+src=["'](https?:\/\/[^"']+)["']/g;
let match;
const urls = [];
while ((match = regex.exec(html)) !== null) {
  urls.push(match[1]);
}

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: e.message });
    });
  });
};

(async () => {
  for (const url of new Set(urls)) {
    const result = await checkUrl(url);
    console.log(`[${result.status}] ${result.url}`);
  }
})();

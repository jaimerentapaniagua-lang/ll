const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const htmlFile = 'catalog.html';
const destDir = path.join(__dirname, 'public', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let html = fs.readFileSync(htmlFile, 'utf8');
const regex = /<img[^>]+src=['"](https?:\/\/[^'"]+)['"]/g;
let match;
const urls = [];

while ((match = regex.exec(html)) !== null) {
  urls.push(match[1]);
}

// Ensure unique downloads
const uniqueUrls = [...new Set(urls)].filter(url => !url.includes('unsplash'));

async function downloadImage(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(urlStr);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': parsedUrl.origin
      }
    };

    const req = client.get(urlStr, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
         return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${urlStr}. Status: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    });
    req.on('error', reject);
  });
}

(async () => {
  let modifiedHtml = html;
  for (const url of uniqueUrls) {
    try {
      const parsed = new URL(url);
      let filename = path.basename(parsed.pathname);
      // fallback if no extension
      if (!filename.includes('.')) filename += '.jpg';
      
      const destPath = path.join(destDir, filename);
      console.log(`Downloading ${url} to ${filename}...`);
      await downloadImage(url, destPath);
      
      // Replace in HTML
      const localUrl = `./public/products/${filename}`;
      // replaceAll is supported in Node 15+
      modifiedHtml = modifiedHtml.split(url).join(localUrl);
      console.log(`✔ Replaced with ${localUrl}`);
    } catch (err) {
      console.error(`✘ Error downloading ${url}:`, err.message);
    }
  }

  fs.writeFileSync(htmlFile, modifiedHtml, 'utf8');
  console.log('Done updating catalog.html!');
})();

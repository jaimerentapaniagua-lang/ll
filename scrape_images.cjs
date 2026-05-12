const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const products = [
  { name: 'exocad DentalCAD', query: 'exocad DentalCAD software interface png', oldUrlPart: 'csm_exocad_DentalCAD_3.2_Eleon' },
  { name: 'exocad ChairsideCAD', query: 'exocad ChairsideCAD software png', oldUrlPart: 'csm_ChairsideCAD_3.1_Rijeka' },
  { name: 'exocad exoplan', query: 'exocad exoplan software gui png', oldUrlPart: 'csm_exoplan_3.1_Rijeka' },
  { name: 'Ceramill Matron', query: 'Ceramill Matron Amann Girrbach png', oldUrlPart: 'csm_Ceramill_Matron_Frontal' },
  { name: 'Ceramill Motion 3', query: 'Ceramill Motion 3 Amann Girrbach png', oldUrlPart: 'csm_Ceramill_Motion_3_Frontal' },
  { name: 'Ceramill Matik', query: 'Ceramill Matik Amann Girrbach png', oldUrlPart: 'csm_Ceramill_Matik_Frontal' },
  { name: 'Medit i700', query: 'Medit i700 intraoral scanner png', oldUrlPart: 'i700_main_img' },
  { name: 'Medit T710', query: 'Medit T710 lab scanner png', oldUrlPart: 'T710_main_img' },
  { name: 'Medit i600', query: 'Medit i600 intraoral scanner png', oldUrlPart: 'i600_main_img' },
  { name: 'Ceramill Map 600+', query: 'Ceramill Map 600+ Amann Girrbach png', oldUrlPart: 'csm_Ceramill_Map_600_Frontal' },
  { name: 'Asiga Ultra', query: 'Asiga Ultra 3D printer png', oldUrlPart: 'Ultra-Product-Page-Image' },
  { name: 'Asiga MAX UV', query: 'Asiga MAX UV 3D printer png', oldUrlPart: 'MAX-UV-Product-Page-Image' },
  { name: 'Asiga PRO 4K', query: 'Asiga PRO 4K 3D printer png', oldUrlPart: 'PRO4K-Product-Page-Image' },
  { name: 'VITA Zyrcomat', query: 'VITA Zyrcomat 6100 MS furnace png', oldUrlPart: 'csm_VITA_ZYRCOMAT_6100_MS_frontal' },
  { name: 'VITA Vacumat', query: 'VITA Vacumat 6000 M furnace png', oldUrlPart: 'csm_VITA_VACUMAT_6000_M_frontal' },
  { name: 'VITA V60 i-Line', query: 'VITA V60 i-Line furnace png', oldUrlPart: 'csm_VITA_V60_i-Line_Frontal' },
  { name: 'Ceramill Therm 3', query: 'Ceramill Therm 3 Amann Girrbach png', oldUrlPart: 'csm_Ceramill_Therm_3_Frontal' },
  { name: 'Zolid Gen X', query: 'Zolid Gen X Amann Girrbach disc png', oldUrlPart: 'csm_Zolid_Gen-X_Product_Image' },
  { name: 'MiYO Liquid Ceramic', query: 'MiYO Liquid Ceramic Kit Jensen png', oldUrlPart: 'miyo_kit_1' },
  { name: 'Aidite 3D Pro Multilayer', query: 'Aidite 3D Pro Multilayer zirconia block png', oldUrlPart: '20210722153624_57365' }
];

const destDir = path.join(__dirname, 'public', 'products');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('data:')) {
      const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFile(filepath, base64Data, 'base64', (err) => err ? reject(err) : resolve());
      return;
    }
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Status Code ${res.statusCode}`));
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', reject);
  });
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let html = fs.readFileSync('catalog.html', 'utf8');

  for (const product of products) {
    console.log(`Searching for: ${product.name}...`);
    try {
      await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(product.query)}&iax=images&ia=images`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('img.tile--img__img', { timeout: 10000 });
      
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector('img.tile--img__img');
        return img ? img.src : null;
      });

      if (imgUrl) {
        const safeName = product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filepath = path.join(destDir, `${safeName}.png`);
        await downloadImage(imgUrl, filepath);
        
        // Update HTML: replace any src that contains the oldUrlPart
        const regex = new RegExp(`src=["'][^"']*${product.oldUrlPart}[^"']*["']`, 'gi');
        html = html.replace(regex, `src="./public/products/${safeName}.png"`);
        console.log(`✔ Downloaded and replaced ${product.name}`);
      } else {
        console.log(`✘ No image found for ${product.name}`);
      }
    } catch (e) {
      console.log(`✘ Failed to process ${product.name}: ${e.message}`);
    }
  }

  fs.writeFileSync('catalog.html', html, 'utf8');
  await browser.close();
  console.log('All done. catalog.html updated!');
})();

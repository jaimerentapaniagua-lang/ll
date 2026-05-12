const https = require('https');
https.get('https://www.dentalkart.com/media/catalog/product/e/x/exocad_dentalcad_core_version.jpg', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log(res.statusCode);
});

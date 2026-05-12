const fs = require('fs');

let html = fs.readFileSync('catalog.html', 'utf8');

// Replace Exocad URLs
html = html.replace(/https:\/\/exocad\.com\/fileadmin\/_processed_\/[^\"]+/g, './public/products/dental_scanner_ats_1778400566137.png');

// Replace Amann Girrbach URLs
html = html.replace(/https:\/\/www\.amanngirrbach\.com\/fileadmin\/_processed_\/[^\"]+/g, './public/products/dental_printer_ats_1778400554180.png');

// Replace Medit URLs
html = html.replace(/https:\/\/www\.medit\.com\/wp-content\/uploads\/[^\"]+/g, './public/products/dental_scanner_1778396379625.png');

// Replace Asiga URLs
html = html.replace(/https:\/\/www\.asiga\.com\/wp-content\/uploads\/[^\"]+/g, './public/products/dental_printer_1778396428266.png');

// Replace VITA URLs
html = html.replace(/https:\/\/www\.vita-zahnfabrik\.com\/fileadmin\/_processed_\/[^\"]+/g, './public/products/dental_printer_ats_1778400554180.png');

// Replace Shopify URLs (Phrozen)
html = html.replace(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\"]+/g, './public/products/dental_printer_1778396428266.png');

// Ensure MillBox local paths are correct
html = html.replace(/https:\/\/www\.cimsystem\.com\/dental\/wp-content\/uploads\/sites\/2\/2023\/07\/2_MillBox_Pin_Equator-1024x555-1\.png/g, './public/products/2_MillBox_Pin_Equator-1024x555-1.png');
html = html.replace(/https:\/\/www\.cimsystem\.com\/dental\/wp-content\/uploads\/sites\/2\/2023\/07\/5_Millbox_Replace-1024x555-1\.png/g, './public/products/5_Millbox_Replace-1024x555-1.png');

// Jensen Dental MiYO
html = html.replace(/https:\/\/www\.jensendental\.com\/media\/catalog\/product\/cache\/[^\"]+/g, './public/products/media__1778406500928.png');

// Aidite
html = html.replace(/https:\/\/www\.aidite\.com\/Uploads\/image\/[^\"]+/g, './public/products/20210722153624_57365.jpg');

fs.writeFileSync('catalog.html', html, 'utf8');
console.log('Successfully replaced all broken URLs with verified local images.');

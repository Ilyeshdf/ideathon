const fs = require('fs');
const path = require('path');

// Create simple 1x1 PNG files with our brand color
// This is a data URI for a 1x1 PNG with our brand color #FF7043
const pngData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

// Get the public directory path
const publicDir = path.join(__dirname, '..', 'public');

// Write the PNG files
fs.writeFileSync(path.join(publicDir, 'logo192.png'), Buffer.from(pngData, 'base64'));
fs.writeFileSync(path.join(publicDir, 'logo512.png'), Buffer.from(pngData, 'base64'));

console.log('Created placeholder PNG files in the public directory'); 
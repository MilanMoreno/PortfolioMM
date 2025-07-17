const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path to the original image
const inputPath = path.join(__dirname, 'src', 'assets', 'img', 'hero.png');

// Path for the backup of the original image
const backupPath = path.join(__dirname, 'src', 'assets', 'img', 'hero.png.backup');

// First, create a backup of the original image
fs.copyFileSync(inputPath, backupPath);
console.log(`Original image backed up to ${backupPath}`);

// Resize the image
sharp(inputPath)
  .resize({
    width: 646,
    height: 705,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
  })
  .toBuffer()
  .then(data => {
    // Write the resized image back to the original location
    fs.writeFileSync(inputPath, data);
    console.log(`Image resized to 646x705 pixels and saved to ${inputPath}`);
  })
  .catch(err => {
    console.error('Error resizing image:', err);
  });

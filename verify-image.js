const sharp = require('sharp');
const path = require('path');

// Path to the resized image
const imagePath = path.join(__dirname, 'src', 'assets', 'img', 'hero.png');

// Get image metadata
sharp(imagePath)
  .metadata()
  .then(metadata => {
    console.log('Image dimensions:');
    console.log(`Width: ${metadata.width} pixels`);
    console.log(`Height: ${metadata.height} pixels`);
    console.log(`Format: ${metadata.format}`);
  })
  .catch(err => {
    console.error('Error getting image metadata:', err);
  });

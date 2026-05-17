const Jimp = require('jimp');
const fs = require('fs');

async function processImage() {
  console.log('Loading image...');
  const image = await Jimp.read('assets/flame_sprites.png');
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  console.log(`Image size: ${width}x${height}`);
  
  // Crop the purple border (approx 10px on each side based on visual)
  // We'll figure out exact bounding box later, or just remove the purple pixels
  
  image.scan(0, 0, width, height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // The background is around #222222 (rgb: 34, 34, 34)
    // The purple border is around #a259ff (rgb: 162, 89, 255)
    
    // If pixel is close to dark grey background, make it transparent
    if (r < 60 && g < 60 && b < 60) {
      this.bitmap.data[idx + 3] = 0; // Alpha to 0
    }
    // If pixel is close to purple border, make it transparent
    else if (r > 130 && g < 130 && b > 200) {
      this.bitmap.data[idx + 3] = 0; // Alpha to 0
    }
    else {
      // For semi-dark pixels (the edge of the glow), we scale their alpha 
      // based on how bright they are, to keep the soft glow!
      // Glow is mostly orange (high R, medium G, low B).
      // We can use luminosity to set alpha.
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      // Map lum from [40, 255] to alpha [0, 255]
      let alpha = Math.max(0, Math.min(255, (lum - 40) * (255 / (255 - 40))));
      
      // If it's part of the flame, keep the original color but reduce opacity to fade out the background mixing
      // We also need to strip out the grey base color from the pixel itself
      // since a dark pixel with 50% opacity still darkens the background!
      // Real pre-multiplied alpha extraction:
      // If original pixel C = alpha * Flame + (1-alpha) * Background
      // Flame = (C - (1-alpha)*Bg) / alpha
      // Assuming Bg is (34, 34, 34)
      if (alpha > 0 && alpha < 255) {
        const a_norm = alpha / 255;
        const newR = Math.min(255, Math.max(0, (r - (1 - a_norm) * 34) / a_norm));
        const newG = Math.min(255, Math.max(0, (g - (1 - a_norm) * 34) / a_norm));
        const newB = Math.min(255, Math.max(0, (b - (1 - a_norm) * 34) / a_norm));
        this.bitmap.data[idx + 0] = newR;
        this.bitmap.data[idx + 1] = newG;
        this.bitmap.data[idx + 2] = newB;
      }
      this.bitmap.data[idx + 3] = alpha;
    }
  });

  await image.writeAsync('assets/flame_sprites_clean.png');
  console.log('Saved clean sprite sheet!');
}

processImage().catch(console.error);

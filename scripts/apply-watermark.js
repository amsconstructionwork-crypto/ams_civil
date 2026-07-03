const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/real-projects');
// We will output to a temporary directory, then replace the original files
const tempDir = path.resolve(__dirname, '../public/temp-watermarked');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const imageFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

// SVG Watermark definition
// Semi-transparent white text with a slight shadow for visibility on light/dark backgrounds
const svgWatermark = Buffer.from(`
  <svg width="600" height="150">
    <style>
      .text { 
        fill: rgba(255, 255, 255, 0.4); 
        font-size: 48px; 
        font-family: Arial, sans-serif; 
        font-weight: bold; 
      }
      .shadow {
        fill: rgba(0, 0, 0, 0.4); 
        font-size: 48px; 
        font-family: Arial, sans-serif; 
        font-weight: bold; 
      }
    </style>
    <text x="52%" y="52%" text-anchor="middle" dominant-baseline="middle" class="shadow">AMS Civil Work</text>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="text">AMS Civil Work</text>
  </svg>
`);

async function applyWatermarks() {
  console.log("Applying watermarks to " + imageFiles.length + " images...");
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(tempDir, file);
    
    try {
      await sharp(inputPath)
        .composite([
          { 
            input: svgWatermark, 
            gravity: 'center' 
          }
        ])
        .toFile(outputPath);
      console.log("Watermarked: " + file);
    } catch (err) {
      console.error("Failed to watermark " + file + ":", err.message);
    }
  }

  // Overwrite original files with watermarked ones
  for (const file of imageFiles) {
    const tempPath = path.join(tempDir, file);
    const inputPath = path.join(inputDir, file);
    if (fs.existsSync(tempPath)) {
      fs.copyFileSync(tempPath, inputPath);
      fs.unlinkSync(tempPath);
    }
  }
  
  fs.rmdirSync(tempDir);
  console.log("All watermarks applied and original files replaced permanently!");
}

applyWatermarks();

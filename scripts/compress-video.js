#!/usr/bin/env node

/**
 * Video Compression Script for Celestial Chronicle
 *
 * Compresses videos to optimal size for web (target: 1-2MB for 2-3 sec clips)
 *
 * Usage:
 *   node scripts/compress-video.js <input-file> [output-file]
 *   node scripts/compress-video.js public/videos/animations/input.mp4
 *
 * Or compress all videos in a directory:
 *   node scripts/compress-video.js public/videos/animations/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Compression settings
const SETTINGS = {
  // Quality (18-28 = good, 28-32 = high compression)
  crf: 30,

  // Resolution (1280x720 = 720p, 960x540 = 540p)
  scale: '1280:720',

  // Frame rate (24fps is cinematic, saves space)
  fps: 24,

  // Preset (veryslow = best compression but slower)
  preset: 'slow',

  // Suffix for compressed files
  suffix: '-compressed'
};

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2); // MB
}

function compressVideo(inputPath, outputPath) {
  console.log(`\n📹 Compressing: ${path.basename(inputPath)}`);

  const originalSize = getFileSize(inputPath);
  console.log(`   Original size: ${originalSize} MB`);

  const cmd = `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${SETTINGS.crf} -preset ${SETTINGS.preset} -vf "scale=${SETTINGS.scale},fps=${SETTINGS.fps}" -an -movflags +faststart -y "${outputPath}"`;

  try {
    console.log(`   Compressing...`);
    execSync(cmd, { stdio: 'pipe' });

    const newSize = getFileSize(outputPath);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Compressed size: ${newSize} MB (${savings}% smaller)`);
    console.log(`   Saved to: ${outputPath}`);

    return true;
  } catch (error) {
    console.error(`   ❌ Error compressing video:`, error.message);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node compress-video.js <input-file> [output-file]');
    console.log('       node compress-video.js <directory>');
    process.exit(1);
  }

  const inputPath = args[0];

  // Check if ffmpeg is available
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ FFmpeg is not installed or not in PATH');
    console.error('   Download from: https://ffmpeg.org/download.html');
    process.exit(1);
  }

  // Check if input exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(inputPath);

  // If directory, compress all videos
  if (stats.isDirectory()) {
    console.log(`\n🎬 Compressing all videos in: ${inputPath}\n`);

    const files = fs.readdirSync(inputPath);
    const videoFiles = files.filter(f => /\.(mp4|mov|avi|mkv)$/i.test(f));

    if (videoFiles.length === 0) {
      console.log('No video files found in directory');
      process.exit(0);
    }

    let successCount = 0;
    videoFiles.forEach(file => {
      const fullPath = path.join(inputPath, file);
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(inputPath, `${basename}${SETTINGS.suffix}${ext}`);

      if (compressVideo(fullPath, outputPath)) {
        successCount++;
      }
    });

    console.log(`\n✨ Compressed ${successCount}/${videoFiles.length} videos successfully`);
  } else {
    // Single file
    let outputPath = args[1];

    if (!outputPath) {
      const ext = path.extname(inputPath);
      const basename = path.basename(inputPath, ext);
      const dir = path.dirname(inputPath);
      outputPath = path.join(dir, `${basename}${SETTINGS.suffix}${ext}`);
    }

    compressVideo(inputPath, outputPath);
  }
}

main();

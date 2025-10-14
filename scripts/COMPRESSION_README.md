# Video Compression Guide

## Quick Start

### If you don't have FFmpeg installed:

**Use an online tool (easiest):**

1. Go to https://www.freeconvert.com/video-compressor
2. Upload your video
3. Settings:
   - Resolution: 1280x720
   - Compression level: High
   - Remove audio: Yes
4. Download compressed version
5. Replace the original file

### If you want to install FFmpeg:

**Windows (Easiest with Chocolatey):**
```powershell
# Install Chocolatey first (if not installed): https://chocolatey.org/install
choco install ffmpeg

# Then run compression
.\scripts\compress-video.ps1
```

**Windows (Manual):**
1. Download: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to your PATH
4. Run: `.\scripts\compress-video.ps1`

**Mac/Linux:**
```bash
# Mac
brew install ffmpeg

# Linux
sudo apt install ffmpeg

# Then run
node scripts/compress-video.js public/videos/animations/
```

## Compression Scripts

We have two scripts:

1. **compress-video.ps1** (PowerShell for Windows)
   ```powershell
   .\scripts\compress-video.ps1
   ```

2. **compress-video.js** (Node.js, cross-platform)
   ```bash
   node scripts/compress-video.js public/videos/animations/
   ```

Both will:
- Compress all videos in the animations folder
- Create new files with `-compressed` suffix
- Show before/after file sizes
- Target: 1-2MB per 2-3 second video

## Manual Compression Settings

If using online tools or Handbrake:

- **Format:** MP4 (H.264)
- **Resolution:** 1280x720 (720p)
- **Frame Rate:** 24fps
- **Quality/CRF:** 28-32
- **Audio:** Remove (not needed)
- **Optimize for web:** Yes

## File Size Targets

| Duration | Target Size |
|----------|-------------|
| 2 seconds | 800KB - 1.5MB |
| 3 seconds | 1.2MB - 2MB |

## After Compression

1. Compare quality with original (should be nearly identical for short clips)
2. If satisfied, replace the original file
3. Delete the `-compressed` suffix version or use it as the main file
4. Test in the app by clicking the event

## Recommended Workflow

For best results:

1. Generate your videos at the highest quality
2. Compress them using the script or online tool
3. Test in the app
4. Only keep compressed versions in the repository
5. Keep originals backed up elsewhere if you want to re-compress later

## Need Help?

- Scripts not working? Use the online tools instead
- Quality too low? Reduce CRF from 30 to 28
- File still too big? Try 960x540 resolution instead of 720p

# Video Optimization Guide

## Goal
Keep each animation under **1-2MB** for 2-3 second clips while maintaining good quality.

## Compression Techniques

### Using FFmpeg (Best Results)

#### Ultra-Compressed MP4 (Target: 1-2MB)
```bash
# High compression, good quality for short clips
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:720" \
  -an \
  -movflags +faststart \
  output.mp4
```

**Settings explained:**
- `-crf 28` - Higher = more compression (23 is default, 28-32 for web)
- `scale=1280:720` - 720p instead of 1080p (saves 40-50%)
- `-an` - Remove audio (not needed since videos are muted)
- `-movflags +faststart` - Optimize for web streaming

#### WebM Format (Even Smaller!)
```bash
# WebM can be 30-40% smaller than MP4
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 500k \
  -vf "scale=1280:720" \
  -an \
  output.webm
```

#### For Very Short Clips (2-3 seconds)
```bash
# Maximum compression for ultra-short videos
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 32 \
  -preset veryslow \
  -vf "scale=960:540,fps=24" \
  -an \
  -movflags +faststart \
  output.mp4
```

**This can get 2-3 second clips down to 500KB-1MB!**

Settings:
- `scale=960:540` - 540p (mobile-friendly)
- `fps=24` - Reduce from 30/60fps to 24fps
- `-preset veryslow` - Takes longer but better compression

### Online Tools (No Command Line)

1. **HandBrake** (Free, GUI)
   - Set Quality to RF 28-32
   - Resolution: 1280x720 or 960x540
   - Remove audio track
   - Container: MP4 with Web Optimized

2. **CloudConvert** (Online)
   - Upload video
   - Set quality to "low" or "medium"
   - Convert to MP4 or WebM
   - Download compressed version

3. **Clipchamp** (Free online editor)
   - Export at 720p
   - Compression: "High"

## File Size Targets

| Duration | 1080p HD | 720p | 540p |
|----------|----------|------|------|
| 2 sec    | 2-3 MB   | 1-1.5 MB | 500KB-800KB |
| 3 sec    | 3-4 MB   | 1.5-2 MB | 800KB-1.2MB |

## Strategy for 10 Videos

**Option A: Mix of Qualities**
- 3-4 "hero" events at 720p (~1.5MB each) = ~6MB
- 6-7 regular events at 540p (~800KB each) = ~5MB
- **Total: ~11MB for 10 videos**

**Option B: All Optimized**
- All 10 at 720p, aggressive compression (~1MB each)
- **Total: ~10MB for 10 videos**

**Option C: Lazy Loading**
- Keep all videos but only load when needed
- Implement caching strategy

## Lazy Loading Implementation

Currently videos load on-demand (good!), but we can add:

### Preload Priority Videos
```typescript
// In your component
useEffect(() => {
  // Preload most popular/important events
  const priorityVideos = [
    '/videos/animations/buddha-enlightenment.mp4',
    '/videos/animations/norse-mythology.mp4',
    // ... top 3-4 events
  ];

  priorityVideos.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
  });
}, []);
```

### Use WebM with MP4 Fallback
```typescript
<video>
  <source src="/videos/animations/buddha.webm" type="video/webm" />
  <source src="/videos/animations/buddha.mp4" type="video/mp4" />
</video>
```

## Alternative: Animated GIFs (Not Recommended)
GIFs are usually LARGER than compressed video for the same quality.

## Alternative: Lottie Animations

**Lottie JSON files are 50-200KB!**

Pros:
- Tiny file size (10-20x smaller)
- Vector-based (scales perfectly)
- Easy to customize colors

Cons:
- Less cinematic/realistic than video
- Need After Effects + Bodymovin plugin
- More stylized/illustrated look

Example Lottie sources:
- LottieFiles.com (free animations)
- Create custom in After Effects

## Recommended Approach

1. **Compress your current video** to ~1MB using the FFmpeg commands above
2. **Choose your top 10 most important events** for video animations
3. **Keep them all at 720p with CRF 28-30** for consistency
4. **Total budget: 10-15MB** for all animations (acceptable for modern web)

## Testing Your Compressed Videos

Compare before/after:
```bash
# Check file size
ls -lh output.mp4

# Quick preview quality
ffplay output.mp4
```

For 2-3 second clips with aggressive compression, **the quality loss is minimal** since:
- Short duration = less time to notice artifacts
- Full-screen = cinematic feel makes up for quality
- Movement/effects hide compression artifacts

## Want Help?

I can help you:
1. Batch compress multiple videos
2. Set up Lottie animations as an alternative
3. Implement smart preloading for priority videos

# Animation Guide for Celestial Chronicle

This guide explains how to add high-quality cinematic video animations to religious events in the app.

## Overview

When users click on an event node, you can display a 2-3 second full-screen cinematic video before showing the event details popup. This creates an immersive, dramatic experience.

## Video Specifications

### Technical Requirements
- **Format**: MP4 (H.264) or WebM (VP9)
- **Resolution**: 1920x1080 (Full HD) minimum
- **Duration**: 2-3 seconds recommended
- **File Size**: Under 5MB for fast loading
- **Aspect Ratio**: 16:9 or adapt to viewport
- **Frame Rate**: 30fps or 60fps

### Optimization Tips
- Use high compression for web (H.264 profile: High, CRF: 23-28)
- Consider WebM format for better compression
- Add a poster frame for initial load
- Preload videos for frequently accessed events

## How to Add Video Animations

### 1. Create Your Video

You can create videos using:

#### AI Video Generators (Easiest)
- **Runway ML** (runway.ml) - Text/image to video
- **Pika Labs** (pika.art) - AI video generation
- **Stable Video Diffusion** - Open source option
- **Leonardo.ai** - Motion mode for animations

**Example Prompts:**
- Buddha: "Cinematic shot of a silhouetted Buddha meditating under the Bodhi tree at night, golden aura glowing, moonlight, serene, mystical atmosphere"
- Viking: "Epic cinematic shot of Viking longship in stormy seas, lightning in the sky, dramatic waves, northern lights, dark and moody"
- Egyptian: "Cinematic view of Egyptian pyramids at sunset, golden light, sand dunes, mystical atmosphere, torch-lit temple interior"

#### Professional Tools
- **After Effects** - Motion graphics and VFX
- **Blender** - 3D animation and rendering
- **DaVinci Resolve** - Video editing and effects

### 2. Optimize Your Video

```bash
# Using FFmpeg to optimize
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4

# Convert to WebM for better compression
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2M -c:a libopus output.webm
```

### 3. Add Video to Project

Place your video file in:
```
public/videos/animations/your-event-name.mp4
```

### 4. Update Event Data

In `data/sample-events.json`, add the `animationVideo` field to your event:

```json
{
  "id": "buddha-enlightenment",
  "title": "Buddha's Enlightenment",
  "description": "...",
  "startYear": -528,
  "animationVideo": "/videos/animations/buddha-enlightenment.mp4",
  ...
}
```

That's it! The app will automatically play the video when the event is clicked.

## Example Video Ideas by Religion/Culture

### Buddhism
- Monk meditating with lotus flowers blooming
- Temple bells ringing with incense smoke
- Golden Buddha statue with candles

### Norse/Viking
- Stormy seas with Viking ship
- Northern lights over fjords
- Thor's hammer with lightning

### Ancient Egypt
- Pyramids at sunrise/sunset
- Hieroglyphics glowing on temple walls
- Nile River with papyrus boats

### Hinduism
- Ganges River with floating candles (diya)
- Temple with oil lamps and incense
- Sacred cow in misty morning

### Christianity
- Stained glass window with light rays
- Candles in cathedral
- Dove descending with light beams

### Islam
- Mosque at sunset with call to prayer
- Intricate geometric patterns morphing
- Calligraphy appearing elegantly

### Mayan/Aztec
- Jungle temple with vines
- Stone calendar with sun alignment
- Ceremonial fire with embers

### Aboriginal Australian
- Dreamtime rock art coming to life
- Uluru at sunset with stars appearing
- Didgeridoo vibrations visualized

### African Traditional
- Savanna sunset with acacia trees
- Tribal drums with fire
- Baobab tree with spirits

## Tips for Great Cinematic Videos

1. **Use dramatic lighting** - Golden hour, moonlight, fire light
2. **Add atmosphere** - Fog, dust, smoke, particles
3. **Keep it subtle** - Slow camera movements, gentle animations
4. **Focus on mood** - Match the spiritual essence of the event
5. **Use symbolism** - Incorporate cultural symbols and motifs
6. **Sound optional** - Videos are muted by default (can add audio later)

## Advanced: Custom Animation Component

If you need more control than a video, you can create custom React animation components like `BuddhaEnlightenmentScene.tsx` using:
- Framer Motion for animations
- SVG with gradients and filters
- CSS animations
- Three.js for 3D scenes

See `components/events/animations/BuddhaEnlightenmentScene.tsx` for an example.

## Performance Considerations

- Videos are only loaded when needed
- Users can skip with button in bottom-right
- Preload important videos using `<link rel="preload">`
- Consider lazy loading for less-accessed events
- Use CDN for hosting if files are large

## Need Help?

- Check existing animations in `/public/videos/animations/`
- Look at `VideoOverlay.tsx` component
- Test videos in browser before adding
- Compress videos to keep file sizes small

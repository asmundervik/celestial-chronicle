# CelestialChronicle - Project Context

## Project Overview

CelestialChronicle is a stunning, highly interactive web application that takes users on a visual journey through religious history across time and space. The app combines educational content with magnificent graphics and animations to inspire interest in the religious aspects of human history, from the earliest times to today.

**Status**: ✅ **DEPLOYED TO VERCEL** - Live production application
**Repository**: https://github.com/asmundervik/celestial-chronicle
**Stack**: Next.js 15 + React Three Fiber + TypeScript + Tailwind CSS

## Purpose & Goals

**Primary Goal**: Create an immersive, visually captivating experience that inspires interest in the magnificent aspects of religious history.

**Secondary Goal**: Serve as an educational tool for exploring religion and religious history across different regions and time periods.

**Key Aspects**:
- ✅ Showcase how religion has moved and evolved over time and space
- ✅ Reveal "red threads" - persistent insights and connections across religions
- ✅ Make religious history accessible and engaging through interactivity
- ✅ Deliver a world-class user experience with stunning graphics and animations

## Technology Stack

**Framework**: Next.js 15 with App Router
**Language**: TypeScript
**3D Graphics**: React Three Fiber + Three.js
**Animation**: Framer Motion + GSAP
**Styling**: Tailwind CSS v4
**State Management**: Zustand
**UI Components**: Shadcn/ui
**Deployment**: Vercel (auto-deploy from GitHub)

**Approach**: Web app only - no backend, client-side focus, logically simple

## Architecture & Design

### File Structure
```
celestial-chronicle/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with Timeline + Globe
│   └── globals.css         # Global styles
├── components/
│   ├── globe/
│   │   ├── Globe.tsx       # Main 3D canvas container
│   │   ├── Earth.tsx       # Earth sphere with textures + rotation
│   │   ├── EventMarker.tsx # 3D markers on globe surface
│   │   └── ConnectionLines.tsx # Red thread connections
│   ├── timeline/
│   │   └── Timeline.tsx    # Dual-slider timeline control
│   └── events/
│       ├── EventPopup.tsx  # Event detail popup
│       └── animations/
│           ├── MayanAnimation.tsx
│           ├── AztecAnimation.tsx
│           ├── OlmecAnimation.tsx
│           └── NorseAnimation.tsx
├── stores/
│   └── useAppStore.ts      # Zustand state management
├── types/
│   └── index.ts            # TypeScript definitions
├── data/
│   └── sample-events.json  # 29 religious events
└── lib/
    └── utils.ts            # Utility functions
```

### Core Components

**1. Interactive Globe (components/globe/)**
- ✅ 3D Earth with realistic textures (NASA Blue Marble)
- ✅ Auto-rotation that stops on user interaction
- ✅ Event markers positioned via lat/lng coordinates
- ✅ OrbitControls for zoom, rotate, pan
- ✅ Ambient + directional lighting
- ✅ Starfield background
- ✅ Event markers rotate with Earth (synchronized)

**2. Timeline Explorer (components/timeline/)**
- ✅ Dual-slider range control (start year / end year)
- ✅ Spans 3000 BCE to 2025 CE
- ✅ Visual era markers (Ancient, Axial Age, Classical, Modern, Contemporary)
- ✅ Quick preset buttons (Ancient, Classical, Modern, All Time)
- ✅ BCE/CE year formatting
- ✅ Real-time filtering of globe events

**3. Red Threads (components/globe/ConnectionLines.tsx)**
- ✅ Curved Bezier arcs between connected events
- ✅ Color-coded by religion
- ✅ Pulsing glow animation
- ✅ Highlights connections on event selection
- ✅ Additive blending for ethereal effect

**4. Event Markers (components/globe/EventMarker.tsx)**
- ✅ 3D sphere markers at geographic locations
- ✅ Color-coded by religion
- ✅ Pulsing animation
- ✅ Hover effects with glow ring
- ✅ Clickable to show event popup

**5. Event Popups (components/events/EventPopup.tsx)**
- ✅ Beautiful slide-up modal
- ✅ Event details: title, description, significance, location, dates
- ✅ Color accent bar matching religion
- ✅ Cultural animations for specific religions
- ✅ Smooth Framer Motion transitions

**6. Cultural Animations (components/events/animations/)**
- ✅ **Mayan**: Glyphs, pyramids, sun deity, stepped patterns
- ✅ **Aztec**: Rotating sun stone with Tonatiuh face
- ✅ **Olmec**: Were-jaguar with glowing eyes, shamanic markings
- ✅ **Norse**: Yggdrasil, Valknut, Elder Futhark runes, Nine Realms
- Monochrome/sepia aesthetic for historical feel

### State Management (stores/useAppStore.ts)

**Zustand Store**:
- `timeline`: Selected time period + current year
- `globe`: Selected region, zoom, rotation
- `events`: All religious events (loaded from JSON)
- `selectedEvent`: Currently clicked event
- `getFilteredEvents()`: Real-time filtering by timeline + region

## Implemented Features

### Content & Data
- ✅ **29 Religious Events** spanning 50,000 BCE to 1517 CE
- ✅ **9 Religious Traditions**: Aboriginal, Olmec, Mayan, Aztec, Vedic/Hindu, Buddhist, Taoist, Confucian, Zoroastrian, Jewish, Christian, Islamic, Norse/Viking, Native American, Sikh
- ✅ **Keywords** for thematic linking
- ✅ **Connections** array linking related events (red threads)
- ✅ Geographic coordinates for all events

### Regions Covered
- ✅ Australia (Aboriginal Dreamtime)
- ✅ Central America (Olmec, Maya, Aztec)
- ✅ North America (Cahokia Mounds, Native American)
- ✅ South Asia (Vedas, Buddhism, Sikhism, Tibetan Buddhism)
- ✅ East Asia (Taoism, Confucianism, Zen Buddhism, Taoist Alchemy)
- ✅ Middle East (Zoroastrianism, Judaism, Christianity, Islam, Sufism)
- ✅ Europe (Christian expansion, Great Schism, Reformation)
- ✅ Scandinavia (Norse mythology, Viking Age, Christianization)

### Visual Features
- ✅ Realistic Earth with cloud layer + atmosphere glow
- ✅ Smooth rotation animation
- ✅ Event filtering by time period
- ✅ Connection visualization (red threads)
- ✅ Cultural animations for 4 traditions
- ✅ Responsive design
- ✅ Dark theme with gradient background

## Deployment & DevOps

**Git Repository**: https://github.com/asmundervik/celestial-chronicle
**Hosting**: Vercel
**Auto-Deploy**: Enabled (every push to `master` branch)
**Build Command**: `npm run build`
**Framework**: Next.js (detected via vercel.json)

**Deployment Files**:
- ✅ `vercel.json` - Framework configuration
- ✅ `.gitignore` - Excludes node_modules, .next, .env
- ✅ `DEPLOYMENT.md` - Deployment guide

## Development Session Summary

### What We Built (October 9, 2024)

**Phase 1 - Foundation**
- ✅ Initialized Next.js 15 project with TypeScript + Tailwind CSS
- ✅ Set up project structure (app/, components/, stores/, data/, types/)
- ✅ Installed dependencies: Three.js, React Three Fiber, Framer Motion, Zustand
- ✅ Created type definitions for events, regions, religions
- ✅ Built Zustand store for state management

**Phase 2 - 3D Globe**
- ✅ Created interactive 3D Earth with React Three Fiber
- ✅ Added realistic NASA textures (color, normal, specular maps)
- ✅ Implemented cloud layer + atmosphere glow effects
- ✅ Added auto-rotation with stop-on-interaction
- ✅ Configured OrbitControls for zoom/rotate
- ✅ Added starfield background

**Phase 3 - Timeline**
- ✅ Built dual-slider timeline control (3000 BCE - 2025 CE)
- ✅ Added visual era markers
- ✅ Created quick preset buttons
- ✅ Implemented BCE/CE year formatting
- ✅ Connected timeline to event filtering

**Phase 4 - Content & Events**
- ✅ Created 29 religious events across world history
- ✅ Added event markers with geographic positioning
- ✅ Implemented event popups with details
- ✅ Built "red threads" connection visualization
- ✅ Added keywords for thematic linking

**Phase 5 - Cultural Animations**
- ✅ Mayan animation (glyphs, pyramids)
- ✅ Aztec animation (sun stone)
- ✅ Olmec animation (were-jaguar)
- ✅ Norse animation (Yggdrasil, Valknut, runes)

**Phase 6 - Norse Mythology**
- ✅ Added 5 Norse events (Bronze Age → Christianization)
- ✅ Created Norse animation with Viking symbolism
- ✅ Integrated with event system

**Phase 7 - Synchronization Fix**
- ✅ Fixed marker rotation to sync with Earth
- ✅ Refactored Earth component to include markers as children
- ✅ Ensured all geographic elements rotate together

**Phase 8 - Deployment**
- ✅ Initialized Git repository
- ✅ Pushed to GitHub (github.com/asmundervik/celestial-chronicle)
- ✅ Configured Vercel deployment
- ✅ Fixed TypeScript/ESLint errors for production build
- ✅ Fixed React Three Fiber JSX syntax issues
- ✅ Added vercel.json for framework detection
- ✅ Successfully deployed to Vercel

### Technical Challenges Solved

1. **Auto-rotation synchronization**: Markers weren't rotating with Earth
   - **Solution**: Made markers children of Earth group, rotate entire group

2. **Vercel folder structure**: Build failing due to incorrect path assumptions
   - **Solution**: Removed nested folder references, used repository root

3. **TypeScript errors**: Unused variables and `any` types
   - **Solution**: Removed unused imports, specified proper types

4. **React Three Fiber JSX**: `<line>` conflicting with SVG elements
   - **Solution**: Used `primitive` component with Three.js Line object

5. **Framework detection**: Vercel not detecting Next.js
   - **Solution**: Added explicit vercel.json with framework configuration

### Next Steps & Future Enhancements

**Content Expansion**:
- Add more religious traditions (Celtic, Shinto, African religions, etc.)
- Expand event coverage to present day
- Add more cultural animations for all traditions

**Features**:
- Search/filter by religion or keyword
- Timeline playback mode (animate through time)
- Region clustering when zoomed out
- Event detail pages with more content
- Mobile optimization
- Add sound/music for immersion

**Technical**:
- Performance optimization for large event datasets
- Add loading states for textures
- Implement error boundaries
- Add analytics
- Custom domain setup

## Additional Notes

**Design Philosophy**:
- Simplicity in logic and architecture
- Complexity and richness in visual presentation
- User interaction as the primary mode of exploration
- Beauty and inspiration over pure information delivery

**Performance**:
- Client-side only, no API calls
- Events loaded from static JSON
- Textures loaded from CDN
- Optimized for Vercel edge network

**Browser Compatibility**:
- Modern browsers with WebGL support required
- Chrome, Firefox, Safari, Edge supported
- Mobile browsers supported (iOS Safari, Chrome Android)

---
*Last updated: 2025-10-09*
*Session: Full application built from concept to production deployment*

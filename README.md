# CelestialChronicle

An immersive, visually stunning web application that takes users on an interactive journey through religious history across time and space.

## Overview

CelestialChronicle explores the magnificent aspects of religious history from the earliest times to today, focusing on:

- **Eastern religions** (Hinduism, Buddhism, Taoism, etc.)
- **Native American spiritual traditions**
- **Aboriginal Australian traditions**
- And more to come...

## Features

- **Interactive 3D Globe** - Rotate and explore religious events by geographic region
- **Timeline Navigation** - Traverse thousands of years of religious history
- **Rich Animations** - Beautiful transitions and visual storytelling
- **Red Threads** - Discover connections between religions across time and space
- **Detailed Event Views** - Immersive content with texts and animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: Framer Motion + GSAP
- **State Management**: Zustand

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
celestial-chronicle/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── globe/       # 3D globe components
│   ├── timeline/    # Timeline components
│   ├── events/      # Event detail components
│   └── ui/          # Shadcn UI components
├── stores/          # Zustand state management
├── data/            # Religious events data (JSON)
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Development

The app is designed to be:
- Logically simple
- Visually stunning
- Highly interactive
- Educational yet inspirational

Focus on creating beautiful, smooth animations and an immersive user experience.

## License

MIT

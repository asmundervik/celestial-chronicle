# CelestialChronicle

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed to Vercel](https://img.shields.io/badge/deployed_to-Vercel-black?logo=vercel)](https://www.celestialchronicle.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

An immersive, visually stunning web application that takes users on an interactive journey through religious history across time and space.

## 🌏 Overview

CelestialChronicle explores the magnificent aspects of religious history from the earliest times to today, focusing on:

- **Eastern Religions** (Hinduism, Buddhism, Taoism, Confucianism)
- **Indigenous Americas** (Olmec, Mayan, Aztec traditions)
- **Norse Mythology** (Viking Age, Sagas, Christianization)
- **Abrahamic Faiths** (Zoroastrianism, Judaism, Christianity, Islam)
- **Ancient Origins** (Aboriginal Dreamtime traditions)

## ✨ Features

- **Interactive 3D Globe** - Rotate and explore religious events by geographic region.
- **Timeline Navigation** - Traverse thousands of years of religious history.
- **Rich Animations** - Custom visual storytelling for each major tradition.
- **Red Threads** - Discover connections between religions across time and space.
- **Immersive Details** - High-quality video overlays and procedural animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Graphics**: [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Three.js](https://threejs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/asmundervik/celestial-chronicle.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** to view the app locally.

## 📂 Project Structure

```
celestial-chronicle/
├── app/              # Next.js app router & pages
├── components/       # React components
│   ├── events/       # Event detail animations & popups
│   ├── globe/        # 3D globe & marker logic
│   └── timeline/     # Navigation timeline
├── data/             # Historical datasets (JSON)
├── lib/              # Shared utilities
├── public/           # Static assets & videos
├── scripts/          # Optimization & helper scripts
├── stores/           # Zustand state management
└── types/            # TypeScript interfaces
```

## 🌐 Deployment

The project is live at **[www.celestialchronicle.org](https://www.celestialchronicle.org)** and is hosted on **Vercel**.

### Continuous Deployment
Every push to the `main` branch is automatically built and deployed via the Vercel CI/CD pipeline.

### Build Configuration
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment**: Node.js 18+

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help expand the historical coverage or improve the visual experience.

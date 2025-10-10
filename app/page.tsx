'use client';

import Timeline from '@/components/timeline/Timeline';
import Globe from '@/components/globe/Globe';

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
          Celestial Chronicle
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          A Journey Through Religious History
        </p>
      </header>

      {/* Timeline - positioned at top */}
      <div className="absolute top-24 left-0 right-0 z-40 px-8">
        <Timeline />
      </div>

      {/* Main Globe Area */}
      <div className="w-full h-full pt-48">
        <Globe />
      </div>
    </div>
  );
}

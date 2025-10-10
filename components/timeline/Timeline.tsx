'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';

const Timeline = () => {
  const { timeline, setTimeline } = useAppStore();
  const [startYear, setStartYear] = useState(timeline.selectedPeriod.start);
  const [endYear, setEndYear] = useState(timeline.selectedPeriod.end);

  // Update store when slider values change
  useEffect(() => {
    setTimeline({
      selectedPeriod: { start: startYear, end: endYear },
      currentYear: startYear,
    });
  }, [startYear, endYear, setTimeline]);

  // Helper to format years (BCE/CE)
  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    }
    return `${year} CE`;
  };

  // Timeline bounds
  const MIN_YEAR = -3000; // 3000 BCE - start of major civilizations
  const MAX_YEAR = 2025;

  // Convert year to percentage for visual positioning
  const yearToPercent = (year: number) => {
    return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  };

  // Major eras for visual markers
  const eras = [
    { year: -3000, label: 'Ancient World', color: 'bg-orange-500' },
    { year: -500, label: 'Axial Age', color: 'bg-yellow-500' },
    { year: 500, label: 'Classical Period', color: 'bg-lime-500' },
    { year: 1500, label: 'Modern Era', color: 'bg-emerald-500' },
    { year: 2000, label: 'Contemporary', color: 'bg-cyan-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
        {/* Timeline Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-200">
              Timeline Explorer
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore {formatYear(startYear)} to {formatYear(endYear)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400">
              {formatYear(timeline.currentYear)}
            </div>
            <div className="text-xs text-slate-500">Current View</div>
          </div>
        </div>

        {/* Visual Timeline Track */}
        <div className="relative h-24 mb-8">
          {/* Background gradient bar */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-gradient-to-r from-amber-900 via-orange-600 to-cyan-600 rounded-full opacity-30" />

          {/* Era markers */}
          {eras.map((era) => (
            <motion.div
              key={era.year}
              className="absolute top-0"
              style={{ left: `${yearToPercent(era.year)}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
            >
              <div className="flex flex-col items-center -translate-x-1/2">
                <div className={`w-1 h-16 ${era.color} opacity-60`} />
                <div className="text-[10px] text-slate-400 mt-1 whitespace-nowrap">
                  {era.label}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Selected range indicator */}
          <motion.div
            className="absolute top-7 h-4 bg-amber-400/30 border-2 border-amber-400 rounded-full"
            style={{
              left: `${yearToPercent(startYear)}%`,
              width: `${yearToPercent(endYear) - yearToPercent(startYear)}%`,
            }}
            layoutId="selectedRange"
          />
        </div>

        {/* Range Sliders */}
        <div className="space-y-4">
          {/* Start Year Slider */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Start Period: {formatYear(startYear)}
            </label>
            <input
              type="range"
              min={MIN_YEAR}
              max={endYear - 100} // Ensure at least 100 year range
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* End Year Slider */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              End Period: {formatYear(endYear)}
            </label>
            <input
              type="range"
              min={startYear + 100} // Ensure at least 100 year range
              max={MAX_YEAR}
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {[
            { label: 'Ancient', start: -3000, end: 500 },
            { label: 'Classical', start: -500, end: 1500 },
            { label: 'Modern', start: 1500, end: 2025 },
            { label: 'All Time', start: MIN_YEAR, end: MAX_YEAR },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setStartYear(preset.start);
                setEndYear(preset.end);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-amber-500/50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { Journey } from '@/types';
import journeysData from '@/data/journeys.json';

const Timeline = () => {
  const { timeline, setTimeline, activeJourney, startJourney } = useAppStore();
  const [startYear, setStartYear] = useState(timeline.selectedPeriod.start);
  const [endYear, setEndYear] = useState(timeline.selectedPeriod.end);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showJourneys, setShowJourneys] = useState(false);

  const journeys = journeysData as Journey[];

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
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Minimized View (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-slate-200 text-left">
                Timeline Explorer
              </h2>
              <p className="text-xs text-slate-400 mt-1 text-left">
                {formatYear(startYear)} to {formatYear(endYear)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-lg font-bold text-amber-400">
                  {formatYear(timeline.currentYear)}
                </div>
              </div>
              <motion.svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>

          {/* Expanded Controls (Mobile) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-slate-700/50">
                  {/* Journey Selector (Mobile) */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowJourneys(!showJourneys)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-gradient-to-r from-purple-600/20 to-amber-600/20 rounded-lg border border-purple-500/30"
                    >
                      <span>🗺️</span>
                      <span>{showJourneys ? 'Hide' : 'Guided'} Journeys</span>
                    </button>

                    {showJourneys && (
                      <div className="mt-2 space-y-2">
                        {journeys.map((journey) => (
                          <button
                            key={journey.id}
                            onClick={() => {
                              startJourney(journey);
                              setShowJourneys(false);
                              setIsExpanded(false);
                            }}
                            className="w-full p-2 text-left rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{journey.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-slate-200 truncate">
                                  {journey.title}
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  {journey.eventIds.length} stops
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Visual Timeline Track */}
                  <div className="relative h-20 mb-6">
                    {/* Background gradient bar */}
                    <div className="absolute top-6 left-0 right-0 h-2 bg-gradient-to-r from-amber-900 via-orange-600 to-cyan-600 rounded-full opacity-30" />

                    {/* Era markers (simplified for mobile) */}
                    {eras.filter((_, i) => i % 2 === 0).map((era) => (
                      <motion.div
                        key={era.year}
                        className="absolute top-0"
                        style={{ left: `${yearToPercent(era.year)}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}
                      >
                        <div className="flex flex-col items-center -translate-x-1/2">
                          <div className={`w-0.5 h-12 ${era.color} opacity-60`} />
                          <div className="text-[8px] text-slate-400 mt-1 whitespace-nowrap">
                            {era.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Selected range indicator */}
                    <motion.div
                      className="absolute top-5 h-4 bg-amber-400/30 border-2 border-amber-400 rounded-full"
                      style={{
                        left: `${yearToPercent(startYear)}%`,
                        width: `${yearToPercent(endYear) - yearToPercent(startYear)}%`,
                      }}
                      layoutId="selectedRangeMobile"
                    />
                  </div>

                  {/* Range Sliders */}
                  <div className="space-y-3">
                    {/* Start Year Slider */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Start: {formatYear(startYear)}
                      </label>
                      <input
                        type="range"
                        min={MIN_YEAR}
                        max={endYear - 100}
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>

                    {/* End Year Slider */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        End: {formatYear(endYear)}
                      </label>
                      <input
                        type="range"
                        min={startYear + 100}
                        max={MAX_YEAR}
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
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
                        className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-amber-500/50"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View (Full) */}
        <div className="hidden md:block p-6">
          {/* Journey Selector Toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowJourneys(!showJourneys)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-gradient-to-r from-purple-600/20 to-amber-600/20 hover:from-purple-600/30 hover:to-amber-600/30 rounded-lg transition-all border border-purple-500/30 hover:border-amber-500/50"
            >
              <span className="text-lg">🗺️</span>
              <span>{showJourneys ? 'Hide' : 'Start'} Guided Journeys</span>
              {activeJourney && <span className="text-xs text-amber-400">({activeJourney.title})</span>}
            </button>

            {/* Journeys Grid */}
            <AnimatePresence>
              {showJourneys && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    {journeys.map((journey) => (
                      <motion.button
                        key={journey.id}
                        onClick={() => {
                          startJourney(journey);
                          setShowJourneys(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          activeJourney?.id === journey.id
                            ? 'bg-slate-700/70 border-amber-400'
                            : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                        }`}
                        style={{
                          borderColor: activeJourney?.id === journey.id ? journey.color : undefined
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-2xl">{journey.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-slate-200 leading-tight">
                              {journey.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {journey.description}
                        </p>
                        <div className="mt-2 text-xs text-slate-500">
                          {journey.eventIds.length} stops
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
      </div>
    </motion.div>
  );
};

export default Timeline;

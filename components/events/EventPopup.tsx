'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReligiousEvent } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useState, useEffect } from 'react';
import MayanAnimation from './animations/MayanAnimation';
import AztecAnimation from './animations/AztecAnimation';
import OlmecAnimation from './animations/OlmecAnimation';
import NorseAnimation from './animations/NorseAnimation';
import BuddhismAnimation from './animations/BuddhismAnimation';
import HinduismAnimation from './animations/HinduismAnimation';
import ChristianityAnimation from './animations/ChristianityAnimation';
import IslamAnimation from './animations/IslamAnimation';
import TaoismAnimation from './animations/TaoismAnimation';
import ZoroastrianismAnimation from './animations/ZoroastrianismAnimation';
import AboriginalAnimation from './animations/AboriginalAnimation';
import ConfucianismAnimation from './animations/ConfucianismAnimation';

interface EventPopupProps {
  event: ReligiousEvent | null;
  onClose: () => void;
}

const EventPopup = ({ event, onClose }: EventPopupProps) => {
  const {
    activeJourney,
    currentStepIndex,
    nextStep,
    previousStep,
    endJourney
  } = useAppStore();

  const [isVisible, setIsVisible] = useState(true);

  // Detect when step changes and temporarily hide popup
  useEffect(() => {
    if (activeJourney) {
      setIsVisible(false);

      // Show popup again after camera animation (zoom out + move + zoom in = ~4 seconds)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // Not in journey, show immediately
      setIsVisible(true);
    }
  }, [currentStepIndex, activeJourney]);

  if (!event) return null;

  const isInJourney = activeJourney !== null;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = activeJourney && currentStepIndex === activeJourney.eventIds.length - 1;

  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    }
    return `${year} CE`;
  };

  // Map religion IDs to animation components
  const getAnimation = () => {
    switch (event.religion.id) {
      case 'mayan-religion':
        return <MayanAnimation />;
      case 'aztec-religion':
        return <AztecAnimation />;
      case 'olmec-religion':
        return <OlmecAnimation />;
      case 'norse-paganism':
        return <NorseAnimation />;
      case 'buddhism':
        return <BuddhismAnimation />;
      case 'hinduism':
        return <HinduismAnimation />;
      case 'christianity':
      case 'coptic-christianity':
      case 'ethiopian-orthodox':
        return <ChristianityAnimation />;
      case 'islam':
        return <IslamAnimation />;
      case 'taoism':
        return <TaoismAnimation />;
      case 'zoroastrianism':
        return <ZoroastrianismAnimation />;
      case 'aboriginal-spirituality':
      case 'torres-strait-spirituality':
        return <AboriginalAnimation />;
      case 'confucianism':
        return <ConfucianismAnimation />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-slate-900/30 rounded-lg border-2 border-dashed border-slate-700/50">
            <span className="text-slate-600 text-sm">
              Animation coming soon
            </span>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Header with color accent */}
          <div
            className="h-2"
            style={{ backgroundColor: event.religion.color }}
          />

          <div className="p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {/* Event header */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: event.religion.color }}
                />
                <span className="text-sm text-slate-400">
                  {event.religion.name}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                {event.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>
                  {formatYear(event.startYear)}
                  {event.endYear && ` - ${formatYear(event.endYear)}`}
                </span>
                <span>•</span>
                <span>{event.location.name}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Significance */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                Significance
              </div>
              <p className="text-slate-300 text-sm">{event.significance}</p>
            </div>

            {/* Cultural Animation */}
            <div className="mt-4 h-48 rounded-lg overflow-hidden">
              {getAnimation()}
            </div>

            {/* Journey Navigation Controls */}
            {isInJourney && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-amber-900/30 rounded-lg border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{activeJourney.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-purple-300">
                        {activeJourney.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Step {currentStepIndex + 1} of {activeJourney.eventIds.length}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      endJourney();
                      onClose();
                    }}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    Exit Journey
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={previousStep}
                    disabled={isFirstStep}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isFirstStep
                        ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                        : 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/50'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm">Previous</span>
                  </button>

                  <button
                    onClick={isLastStep ? () => { endJourney(); onClose(); } : nextStep}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/50 transition-all"
                  >
                    <span className="text-sm">
                      {isLastStep ? 'Complete Journey' : 'Next'}
                    </span>
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStepIndex + 1) / activeJourney.eventIds.length) * 100}%`
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopup;
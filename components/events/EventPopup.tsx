'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReligiousEvent } from '@/types';
import { X } from 'lucide-react';
import MayanAnimation from './animations/MayanAnimation';
import AztecAnimation from './animations/AztecAnimation';
import OlmecAnimation from './animations/OlmecAnimation';
import NorseAnimation from './animations/NorseAnimation';

interface EventPopupProps {
  event: ReligiousEvent | null;
  onClose: () => void;
}

const EventPopup = ({ event, onClose }: EventPopupProps) => {
  if (!event) return null;

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
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventPopup;
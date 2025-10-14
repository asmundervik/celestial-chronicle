'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface VideoOverlayProps {
  videoSrc: string;
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const VideoOverlay = ({ videoSrc, onComplete, duration = 3000 }: VideoOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video
    video.play().catch((err) => {
      console.error('Error playing video:', err);
    });

    // Complete after duration
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    // Also complete when video ends
    const handleVideoEnd = () => {
      onComplete?.();
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [onComplete, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* Optional: Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-colors"
      >
        Skip →
      </motion.button>
    </motion.div>
  );
};

export default VideoOverlay;

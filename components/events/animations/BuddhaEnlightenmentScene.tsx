'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BuddhaEnlightenmentSceneProps {
  onComplete?: () => void;
}

const BuddhaEnlightenmentScene = ({ onComplete }: BuddhaEnlightenmentSceneProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 500);
    const timer2 = setTimeout(() => setPhase(2), 1500);
    const timer3 = setTimeout(() => {
      setPhase(3);
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      {/* Stars twinkling in background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-20 right-32 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fff9e6, #f4e4c1)',
          boxShadow: '0 0 60px rgba(255, 249, 230, 0.4)',
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Bodhi Tree - Trunk */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom' }}
      >
        <svg width="120" height="400" viewBox="0 0 120 400" className="relative">
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a3228" />
              <stop offset="50%" stopColor="#5c4033" />
              <stop offset="100%" stopColor="#4a3228" />
            </linearGradient>
          </defs>
          <path
            d="M 40 400 Q 35 300 45 200 Q 50 100 55 0 M 80 400 Q 75 300 70 200 Q 65 100 60 0 M 40 400 Q 60 400 80 400"
            fill="url(#trunkGradient)"
            stroke="#3a2218"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Bodhi Tree - Leaves (multiple layers for depth) */}
      <motion.div
        className="absolute top-32 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        {/* Back layer leaves */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`leaf-back-${i}`}
            className="absolute"
            style={{
              left: `${Math.cos((i / 12) * Math.PI * 2) * 180 + 200}px`,
              top: `${Math.sin((i / 12) * Math.PI * 2) * 180 + 200}px`,
            }}
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -3, 3, 0],
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <path
                d="M 30 10 Q 15 25 30 50 Q 45 25 30 10"
                fill="rgba(34, 139, 34, 0.3)"
                stroke="rgba(34, 100, 34, 0.4)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        ))}

        {/* Front layer leaves */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`leaf-front-${i}`}
            className="absolute"
            style={{
              left: `${Math.cos((i / 20) * Math.PI * 2) * 150 + 200}px`,
              top: `${Math.sin((i / 20) * Math.PI * 2) * 150 + 200}px`,
            }}
            animate={{
              rotate: [0, -5, 5, 0],
              y: [0, 3, -3, 0],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.05,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <path
                d="M 40 15 Q 20 35 40 65 Q 60 35 40 15"
                fill="rgba(50, 205, 50, 0.7)"
                stroke="rgba(34, 139, 34, 0.8)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Buddha Silhouette */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="buddhaGlow">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.8)" />
              <stop offset="50%" stopColor="rgba(255, 215, 0, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
            </radialGradient>
          </defs>

          {/* Glow aura */}
          <motion.circle
            cx="100"
            cy="80"
            r="80"
            fill="url(#buddhaGlow)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Buddha sitting in meditation */}
          <g transform="translate(100, 100)">
            {/* Head */}
            <ellipse cx="0" cy="-30" rx="20" ry="25" fill="#8B4513" opacity="0.9" />

            {/* Body/Robes */}
            <path
              d="M -25 -10 Q -30 20 -25 50 L 25 50 Q 30 20 25 -10 Q 15 -15 0 -15 Q -15 -15 -25 -10"
              fill="#FF8C00"
              opacity="0.9"
            />

            {/* Arms in meditation pose */}
            <ellipse cx="-15" cy="10" rx="8" ry="20" fill="#8B4513" opacity="0.9" />
            <ellipse cx="15" cy="10" rx="8" ry="20" fill="#8B4513" opacity="0.9" />

            {/* Legs crossed */}
            <path
              d="M -20 50 Q -25 60 -15 65 L 15 65 Q 25 60 20 50"
              fill="#FF8C00"
              opacity="0.9"
            />
          </g>
        </svg>
      </motion.div>

      {/* Enlightenment particles */}
      {phase >= 2 && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: '50%',
                bottom: '25%',
                background: 'radial-gradient(circle, #FFD700, #FFA500)',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              }}
              animate={{
                x: Math.cos((i / 30) * Math.PI * 2) * 150,
                y: Math.sin((i / 30) * Math.PI * 2) * 150 - 100,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Sacred text appearing */}
      {phase >= 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.p
              className="text-6xl font-serif text-amber-300"
              style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ॐ
            </motion.p>
            <motion.p
              className="mt-4 text-xl text-amber-100 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Enlightenment
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Fog effect at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(200, 200, 220, 0.3), transparent)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default BuddhaEnlightenmentScene;

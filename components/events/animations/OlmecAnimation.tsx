'use client';

import { motion } from 'framer-motion';

const OlmecAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-900/20 to-amber-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.4))' }}
      >
        {/* Mystical background energy */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#8B4513"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />

        {/* Were-Jaguar face */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          {/* Head outline - rounded, boulder-like */}
          <ellipse
            cx="100"
            cy="100"
            rx="50"
            ry="55"
            fill="#654321"
            opacity="0.2"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="50"
            ry="55"
            fill="none"
            stroke="#8B4513"
            strokeWidth="3"
          />

          {/* Jaguar spots pattern */}
          {[
            { x: 70, y: 80 },
            { x: 130, y: 80 },
            { x: 75, y: 110 },
            { x: 125, y: 110 },
            { x: 85, y: 130 },
            { x: 115, y: 130 },
          ].map((spot, i) => (
            <motion.circle
              key={i}
              cx={spot.x}
              cy={spot.y}
              r="4"
              fill="#D2691E"
              opacity="0.6"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Glowing jaguar eyes */}
          <motion.g
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {/* Left eye */}
            <ellipse cx="80" cy="90" rx="12" ry="15" fill="#DAA520" />
            <ellipse cx="80" cy="92" rx="6" ry="10" fill="#1a1a1a" />
            <motion.circle
              cx="80"
              cy="88"
              r="3"
              fill="#FFD700"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Right eye */}
            <ellipse cx="120" cy="90" rx="12" ry="15" fill="#DAA520" />
            <ellipse cx="120" cy="92" rx="6" ry="10" fill="#1a1a1a" />
            <motion.circle
              cx="120"
              cy="88"
              r="3"
              fill="#FFD700"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.g>

          {/* Flared nostrils */}
          <ellipse cx="92" cy="105" rx="6" ry="8" fill="#654321" />
          <ellipse cx="108" cy="105" rx="6" ry="8" fill="#654321" />

          {/* Fanged mouth - downturned, mystical */}
          <motion.path
            d="M 75 115 Q 100 125 125 115"
            fill="none"
            stroke="#8B4513"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              d: [
                "M 75 115 Q 100 125 125 115",
                "M 75 115 Q 100 128 125 115",
                "M 75 115 Q 100 125 125 115",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* Fangs */}
          <motion.path
            d="M 85 115 L 85 128"
            stroke="#D2691E"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 115 115 L 115 128"
            stroke="#D2691E"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />

          {/* Shamanic markings on forehead */}
          <motion.g
            animate={{
              y: [0, -2, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <path d="M 100 70 L 95 75 L 100 80 L 105 75 Z" fill="#CD853F" />
            <line x1="100" y1="65" x2="100" y2="75" stroke="#D2691E" strokeWidth="2" />
          </motion.g>
        </motion.g>

        {/* Mystical shamanic particles floating around */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          const x = 100 + Math.cos(angle * Math.PI / 180) * 75;
          const y = 100 + Math.sin(angle * Math.PI / 180) * 75;

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#CD853F"
              animate={{
                opacity: [0, 0.8, 0],
                y: [y, y - 20, y],
              }}
              transition={{
                duration: 4,
                delay: i * 0.7,
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* Ancient stone texture overlay */}
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="url(#stone-texture)"
          opacity="0.1"
        />

        <defs>
          <pattern id="stone-texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="transparent" />
            <circle cx="2" cy="2" r="0.5" fill="#8B4513" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default OlmecAnimation;

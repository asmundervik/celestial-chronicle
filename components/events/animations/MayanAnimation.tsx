'use client';

import { motion } from 'framer-motion';

const MayanAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-950/20 to-orange-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.3))' }}
      >
        {/* Central Mayan glyph inspired design */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer ring with step pattern (pyramid steps) */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Middle ring */}
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#DAA520"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Central glyph - stylized sun/deity face */}
          <motion.g
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Face outline */}
            <circle cx="100" cy="100" r="35" fill="none" stroke="#B8860B" strokeWidth="3" />

            {/* Eyes */}
            <rect x="85" y="90" width="8" height="12" fill="#D4AF37" rx="2" />
            <rect x="107" y="90" width="8" height="12" fill="#D4AF37" rx="2" />

            {/* Mouth - stepped design */}
            <path
              d="M 85 115 L 90 120 L 95 115 L 100 120 L 105 115 L 110 120 L 115 115"
              fill="none"
              stroke="#DAA520"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Headdress elements */}
            <rect x="95" y="70" width="10" height="15" fill="#B8860B" />
            <motion.path
              d="M 100 65 L 95 75 L 105 75 Z"
              fill="#D4AF37"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Corner glyphs rotating */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              <rect
                x="95"
                y="15"
                width="10"
                height="10"
                fill="#DAA520"
                transform={`rotate(${angle} 100 100)`}
              />
            </motion.g>
          ))}
        </motion.g>

        {/* Ambient particles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + Math.cos(i * Math.PI / 4) * 70}
            cy={100 + Math.sin(i * Math.PI / 4) * 70}
            r="2"
            fill="#D4AF37"
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default MayanAnimation;

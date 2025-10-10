'use client';

import { motion } from 'framer-motion';

const AztecAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-950/20 to-amber-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 15px rgba(184, 134, 11, 0.4))' }}
      >
        {/* Rotating sun stone */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        >
          {/* Outer ring with glyphs */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#B8860B"
            strokeWidth="4"
          />

          {/* Decorative outer segments */}
          {[...Array(20)].map((_, i) => {
            const angle = (i * 360) / 20;
            return (
              <motion.rect
                key={i}
                x="98"
                y="10"
                width="4"
                height="12"
                fill="#D4AF37"
                transform={`rotate(${angle} 100 100)`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Middle ring */}
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="none"
            stroke="#DAA520"
            strokeWidth="3"
          />
        </motion.g>

        {/* Central Tonatiuh (Sun God) face - does not rotate */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Face circle */}
          <circle cx="100" cy="100" r="40" fill="#8B6914" opacity="0.3" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#B8860B" strokeWidth="3" />

          {/* Tongue/blade */}
          <motion.path
            d="M 100 115 L 95 125 L 105 125 Z"
            fill="#D4AF37"
            animate={{
              y: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Eyes - squared design */}
          <rect x="85" y="90" width="10" height="10" fill="#D4AF37" />
          <rect x="105" y="90" width="10" height="10" fill="#D4AF37" />

          {/* Inner eye detail */}
          <circle cx="90" cy="95" r="3" fill="#8B6914" />
          <circle cx="110" cy="95" r="3" fill="#8B6914" />

          {/* Nose bridge */}
          <rect x="97" y="95" width="6" height="15" fill="#B8860B" />

          {/* Ear ornaments */}
          <motion.circle
            cx="60"
            cy="100"
            r="8"
            fill="none"
            stroke="#DAA520"
            strokeWidth="2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="140"
            cy="100"
            r="8"
            fill="none"
            stroke="#DAA520"
            strokeWidth="2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.g>

        {/* Four movement symbols in corners */}
        {[
          { x: 100, y: 30, label: 'N' },
          { x: 170, y: 100, label: 'E' },
          { x: 100, y: 170, label: 'S' },
          { x: 30, y: 100, label: 'W' },
        ].map((pos, i) => (
          <motion.g
            key={i}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            <rect
              x={pos.x - 8}
              y={pos.y - 8}
              width="16"
              height="16"
              fill="#B8860B"
              transform={`rotate(45 ${pos.x} ${pos.y})`}
            />
          </motion.g>
        ))}

        {/* Pulsing energy waves */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#DAA520"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AztecAnimation;

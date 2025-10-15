'use client';

import { motion } from 'framer-motion';

const TaoismAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-950/20 to-cyan-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(78, 205, 196, 0.3))' }}
      >
        {/* Yin Yang symbol with flowing energy */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#4ECDC4"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              rotate: 360,
            }}
            transition={{
              pathLength: { duration: 2 },
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformOrigin: "100px 100px" }}
          />

          {/* Yin Yang symbol */}
          <motion.g
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {/* White half (Yang) */}
            <path
              d="M 100 40 A 30 30 0 0 1 100 100 A 30 30 0 0 0 100 160 A 60 60 0 0 1 100 40"
              fill="#4ECDC4"
            />

            {/* Black half (Yin) */}
            <path
              d="M 100 40 A 30 30 0 0 0 100 100 A 30 30 0 0 1 100 160 A 60 60 0 0 0 100 40"
              fill="#1A3A3A"
            />

            {/* White dot in black */}
            <circle cx="100" cy="130" r="8" fill="#4ECDC4" />

            {/* Black dot in white */}
            <circle cx="100" cy="70" r="8" fill="#1A3A3A" />
          </motion.g>

          {/* Flowing energy lines */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <motion.path
                key={`flow-${i}`}
                d={`M 100 100 Q ${100 + Math.cos(angle) * 50} ${100 + Math.sin(angle) * 50}, ${100 + Math.cos(angle) * 75} ${100 + Math.sin(angle) * 75}`}
                fill="none"
                stroke="#3AA39A"
                strokeWidth="1"
                opacity="0.3"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Eight trigrams (Bagua) positions */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <motion.g key={`trigram-${i}`}>
                {/* Three lines representing trigram */}
                {[0, 1, 2].map((line) => (
                  <motion.line
                    key={`${i}-${line}`}
                    x1={100 + Math.cos(angle) * (85 + line * 3)}
                    y1={100 + Math.sin(angle) * (85 + line * 3) - 3}
                    x2={100 + Math.cos(angle) * (85 + line * 3)}
                    y2={100 + Math.sin(angle) * (85 + line * 3) + 3}
                    stroke="#4ECDC4"
                    strokeWidth="1.5"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.3 + line * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.g>
            );
          })}

          {/* Wu Wei - natural flow particles */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <motion.circle
                key={`particle-${i}`}
                cx={100}
                cy={100}
                r="2"
                fill="#4ECDC4"
                animate={{
                  cx: [100, 100 + Math.cos(angle) * 80, 100],
                  cy: [100, 100 + Math.sin(angle) * 80, 100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};

export default TaoismAnimation;

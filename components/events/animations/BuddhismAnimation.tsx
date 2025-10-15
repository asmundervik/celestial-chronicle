'use client';

import { motion } from 'framer-motion';

const BuddhismAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-950/20 to-yellow-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}
      >
        {/* Dharma Wheel (Dharmachakra) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer rim */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Inner circle */}
          <circle cx="100" cy="100" r="15" fill="none" stroke="#FFD700" strokeWidth="2" />

          {/* 8 spokes representing the Noble Eightfold Path */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos((angle * Math.PI) / 180) * 55}
              y2={100 + Math.sin((angle * Math.PI) / 180) * 55}
              stroke="#DAA520"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}

          {/* Lotus petals at the base */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <motion.ellipse
                key={`petal-${i}`}
                cx={100 + Math.cos(angle) * 80}
                cy={100 + Math.sin(angle) * 80}
                rx="8"
                ry="15"
                fill="#FFD700"
                opacity="0.4"
                transform={`rotate(${i * 45} ${100 + Math.cos(angle) * 80} ${100 + Math.sin(angle) * 80})`}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Central hub with pulsing effect */}
          <motion.circle
            cx="100"
            cy="100"
            r="8"
            fill="#FFD700"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Ambient light particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={100 + Math.cos((i * 60 * Math.PI) / 180) * 85}
            cy={100 + Math.sin((i * 60 * Math.PI) / 180) * 85}
            r="2"
            fill="#FFD700"
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BuddhismAnimation;

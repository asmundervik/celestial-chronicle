'use client';

import { motion } from 'framer-motion';

const IslamAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-950/20 to-emerald-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(34, 139, 34, 0.3))' }}
      >
        {/* Crescent Moon and Star */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Decorative geometric pattern (Islamic art inspired) */}
          <motion.circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="#228B22"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              rotate: 360,
            }}
            transition={{
              pathLength: { duration: 2 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformOrigin: "100px 100px" }}
          />

          {/* Inner octagon (8-pointed star base) */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const nextAngle = ((i + 1) * 45 * Math.PI) / 180;
            return (
              <motion.line
                key={`octagon-${i}`}
                x1={100 + Math.cos(angle) * 60}
                y1={100 + Math.sin(angle) * 60}
                x2={100 + Math.cos(nextAngle) * 60}
                y2={100 + Math.sin(nextAngle) * 60}
                stroke="#2E8B57"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            );
          })}

          {/* Crescent moon */}
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
            <circle cx="90" cy="95" r="28" fill="#228B22" />
            <circle cx="98" cy="95" r="28" fill="#0B1A0B" />
          </motion.g>

          {/* Five-pointed star */}
          <motion.g
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "115px 85px" }}
          >
            <path
              d="M 115 75 L 118 83 L 127 83 L 120 88 L 123 97 L 115 91 L 107 97 L 110 88 L 103 83 L 112 83 Z"
              fill="#228B22"
            />
          </motion.g>

          {/* Calligraphic swirl decorations */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.path
              key={`swirl-${i}`}
              d={`M ${100 + Math.cos((angle * Math.PI) / 180) * 50} ${100 + Math.sin((angle * Math.PI) / 180) * 50} Q ${100 + Math.cos((angle * Math.PI) / 180) * 65} ${100 + Math.sin((angle * Math.PI) / 180) * 55}, ${100 + Math.cos((angle * Math.PI) / 180) * 70} ${100 + Math.sin((angle * Math.PI) / 180) * 50}`}
              fill="none"
              stroke="#2E8B57"
              strokeWidth="1.5"
              opacity="0.4"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Sacred geometry - interconnected circles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.circle
              key={`circle-${i}`}
              cx={100 + Math.cos((angle * Math.PI) / 180) * 45}
              cy={100 + Math.sin((angle * Math.PI) / 180) * 45}
              r="15"
              fill="none"
              stroke="#228B22"
              strokeWidth="1"
              opacity="0.3"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                delay: i * 0.6,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Ambient light particles */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.cos((i * 45 * Math.PI) / 180) * 82}
              cy={100 + Math.sin((i * 45 * Math.PI) / 180) * 82}
              r="2"
              fill="#228B22"
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.5, 1.3, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default IslamAnimation;

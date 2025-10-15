'use client';

import { motion } from 'framer-motion';

const ChristianityAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/20 to-purple-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(139, 0, 0, 0.3))' }}
      >
        {/* Cross with radiating light */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Radiating light rays */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <motion.line
                key={`ray-${i}`}
                x1="100"
                y1="100"
                x2={100 + Math.cos(angle) * 75}
                y2={100 + Math.sin(angle) * 75}
                stroke="#8B0000"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Central Cross */}
          <motion.g
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Vertical beam */}
            <rect
              x="92"
              y="50"
              width="16"
              height="100"
              fill="#8B0000"
              rx="2"
            />

            {/* Horizontal beam */}
            <rect
              x="65"
              y="82"
              width="70"
              height="16"
              fill="#8B0000"
              rx="2"
            />

            {/* Center highlight */}
            <circle
              cx="100"
              cy="100"
              r="12"
              fill="#CD5C5C"
              opacity="0.6"
            />
          </motion.g>

          {/* Sacred circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="65"
            fill="none"
            stroke="#8B0000"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              rotate: 360,
            }}
            transition={{
              pathLength: { duration: 2 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformOrigin: "100px 100px" }}
          />

          {/* Three circles representing Trinity */}
          {[
            { cx: 100, cy: 45, delay: 0 },
            { cx: 75, cy: 130, delay: 0.5 },
            { cx: 125, cy: 130, delay: 1 },
          ].map((pos, i) => (
            <motion.circle
              key={`trinity-${i}`}
              cx={pos.cx}
              cy={pos.cy}
              r="8"
              fill="none"
              stroke="#A0522D"
              strokeWidth="2"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                delay: pos.delay,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Dove symbol (simplified) */}
          <motion.path
            d="M 100 35 Q 95 30, 90 32 L 85 35 Q 90 33, 95 35 Q 100 37, 100 35"
            fill="#CD5C5C"
            opacity="0.5"
            animate={{
              y: [0, -3, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Ambient light particles */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.cos((i * 60 * Math.PI) / 180) * 80}
              cy={100 + Math.sin((i * 60 * Math.PI) / 180) * 80}
              r="2"
              fill="#8B0000"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default ChristianityAnimation;

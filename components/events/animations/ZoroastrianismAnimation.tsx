'use client';

import { motion } from 'framer-motion';

const ZoroastrianismAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-950/20 to-orange-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}
      >
        {/* Faravahar (winged disc) inspired design and sacred fire */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Sacred fire at center */}
          <motion.g
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Flames */}
            {[
              { d: "M 100 120 Q 95 100, 90 80 Q 92 90, 100 70", color: "#FFD700" },
              { d: "M 100 120 Q 100 100, 100 75 Q 100 90, 100 70", color: "#FFA500" },
              { d: "M 100 120 Q 105 100, 110 80 Q 108 90, 100 70", color: "#FFD700" },
            ].map((flame, i) => (
              <motion.path
                key={`flame-${i}`}
                d={flame.d}
                fill={flame.color}
                opacity="0.8"
                animate={{
                  d: [
                    flame.d,
                    flame.d.replace("70", "65"),
                    flame.d,
                  ],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Fire base */}
            <rect
              x="85"
              y="120"
              width="30"
              height="10"
              fill="#CD853F"
              rx="2"
            />
          </motion.g>

          {/* Winged disc elements */}
          {/* Left wing */}
          <motion.path
            d="M 70 100 Q 50 90, 40 85 Q 45 95, 50 100 Q 45 105, 40 115 Q 50 110, 70 100"
            fill="#FFD700"
            opacity="0.6"
            initial={{ x: -10, opacity: 0 }}
            animate={{
              x: 0,
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              x: { duration: 1 },
              opacity: { duration: 2, repeat: Infinity },
            }}
          />

          {/* Right wing */}
          <motion.path
            d="M 130 100 Q 150 90, 160 85 Q 155 95, 150 100 Q 155 105, 160 115 Q 150 110, 130 100"
            fill="#FFD700"
            opacity="0.6"
            initial={{ x: 10, opacity: 0 }}
            animate={{
              x: 0,
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              x: { duration: 1 },
              opacity: { duration: 2, repeat: Infinity },
            }}
          />

          {/* Central circle/disc */}
          <motion.circle
            cx="100"
            cy="100"
            r="25"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Three rings representing good thoughts, good words, good deeds */}
          {[35, 45, 55].map((radius, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#DAA520"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.4"
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                rotate: {
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                },
              }}
              style={{ transformOrigin: "100px 100px" }}
            />
          ))}

          {/* Star points representing divine light */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <motion.line
                key={`ray-${i}`}
                x1="100"
                y1="100"
                x2={100 + Math.cos(angle) * 70}
                y2={100 + Math.sin(angle) * 70}
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.3"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Ambient light particles */}
          {[...Array(10)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.cos((i * 36 * Math.PI) / 180) * 65}
              cy={100 + Math.sin((i * 36 * Math.PI) / 180) * 65}
              r="2"
              fill="#FFD700"
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default ZoroastrianismAnimation;

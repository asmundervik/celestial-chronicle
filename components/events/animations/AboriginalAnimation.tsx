'use client';

import { motion } from 'framer-motion';

const AboriginalAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-950/20 to-yellow-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(139, 69, 19, 0.3))' }}
      >
        {/* Dreamtime inspired design with Rainbow Serpent and celestial elements */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Rainbow Serpent path */}
          <motion.path
            d="M 30 100 Q 50 70, 70 90 Q 90 110, 110 85 Q 130 60, 150 80 Q 170 100, 170 100"
            fill="none"
            stroke="#8B4513"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              d: [
                "M 30 100 Q 50 70, 70 90 Q 90 110, 110 85 Q 130 60, 150 80 Q 170 100, 170 100",
                "M 30 100 Q 50 75, 70 95 Q 90 105, 110 90 Q 130 65, 150 85 Q 170 100, 170 100",
                "M 30 100 Q 50 70, 70 90 Q 90 110, 110 85 Q 130 60, 150 80 Q 170 100, 170 100",
              ],
            }}
            transition={{
              pathLength: { duration: 2 },
              d: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Dots along serpent (scales) */}
          {[40, 60, 80, 100, 120, 140, 160].map((x, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={x}
              cy={90}
              r="3"
              fill="#D2691E"
              animate={{
                cy: [85, 95, 85],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Sun (creation being) */}
          <motion.g>
            <motion.circle
              cx="100"
              cy="50"
              r="20"
              fill="#DAA520"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{ transformOrigin: "100px 50px" }}
            />

            {/* Sun rays */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <motion.line
                  key={`ray-${i}`}
                  x1={100 + Math.cos(angle) * 22}
                  y1={50 + Math.sin(angle) * 22}
                  x2={100 + Math.cos(angle) * 30}
                  y2={50 + Math.sin(angle) * 30}
                  stroke="#DAA520"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              );
            })}
          </motion.g>

          {/* Songlines - connecting paths */}
          {[
            { x1: 50, y1: 150, x2: 150, y2: 150 },
            { x1: 70, y1: 140, x2: 130, y2: 160 },
          ].map((line, i) => (
            <motion.line
              key={`songline-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#8B4513"
              strokeWidth="2"
              strokeDasharray="5 3"
              opacity="0.4"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Ancestor spirits (circles) */}
          {[
            { cx: 50, cy: 140 },
            { cx: 100, cy: 155 },
            { cx: 150, cy: 145 },
          ].map((pos, i) => (
            <motion.circle
              key={`spirit-${i}`}
              cx={pos.cx}
              cy={pos.cy}
              r="8"
              fill="none"
              stroke="#CD853F"
              strokeWidth="2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
              }}
              style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}
            />
          ))}

          {/* Rock art handprint */}
          <motion.g
            opacity="0.6"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <circle cx="40" cy="40" r="8" fill="#A0522D" />
            <rect x="35" y="42" width="3" height="12" fill="#A0522D" rx="1" />
            <rect x="40" y="40" width="3" height="14" fill="#A0522D" rx="1" />
            <rect x="45" y="42" width="3" height="12" fill="#A0522D" rx="1" />
            <rect x="50" y="44" width="3" height="10" fill="#A0522D" rx="1" />
          </motion.g>

          {/* Stars (celestial navigation) */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`star-${i}`}
              cx={30 + i * 25}
              cy={20 + (i % 3) * 5}
              r="1.5"
              fill="#F4A460"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
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

export default AboriginalAnimation;

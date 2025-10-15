'use client';

import { motion } from 'framer-motion';

const ConfucianismAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/20 to-pink-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(205, 92, 92, 0.3))' }}
      >
        {/* Confucian harmony and social order */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Central hexagon representing social harmony */}
          <motion.g
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const nextAngle = ((i + 1) * 60 * Math.PI) / 180;
              return (
                <motion.line
                  key={`hex-${i}`}
                  x1={100 + Math.cos(angle) * 50}
                  y1={100 + Math.sin(angle) * 50}
                  x2={100 + Math.cos(nextAngle) * 50}
                  y2={100 + Math.sin(nextAngle) * 50}
                  stroke="#CD5C5C"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
          </motion.g>

          {/* Five relationships represented by concentric circles */}
          {[30, 40, 50, 60, 70].map((radius, i) => (
            <motion.circle
              key={`circle-${i}`}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#CD5C5C"
              strokeWidth="1"
              opacity="0.3"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}

          {/* I Ching trigrams at cardinal directions */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 75;
            const y = 100 + Math.sin(rad) * 75;

            return (
              <motion.g key={`trigram-${i}`}>
                {/* Three lines */}
                {[0, 1, 2].map((line) => (
                  <motion.line
                    key={`${i}-line-${line}`}
                    x1={x - 6}
                    y1={y - 8 + line * 6}
                    x2={x + 6}
                    y2={y - 8 + line * 6}
                    stroke={line === 1 ? "#CD5C5C" : "#8B4545"}
                    strokeWidth="2"
                    animate={{
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4 + line * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.g>
            );
          })}

          {/* Scholarly scrolls/books (stylized) */}
          <motion.g
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {/* Central book/scroll */}
            <rect
              x="85"
              y="90"
              width="30"
              height="20"
              fill="none"
              stroke="#A0522D"
              strokeWidth="2"
              rx="2"
            />
            <line x1="90" y1="95" x2="110" y2="95" stroke="#CD5C5C" strokeWidth="1" opacity="0.5" />
            <line x1="90" y1="100" x2="110" y2="100" stroke="#CD5C5C" strokeWidth="1" opacity="0.5" />
            <line x1="90" y1="105" x2="110" y2="105" stroke="#CD5C5C" strokeWidth="1" opacity="0.5" />
          </motion.g>

          {/* Ritual vessel elements */}
          <motion.path
            d="M 90 115 L 85 130 L 115 130 L 110 115 Z"
            fill="none"
            stroke="#8B4545"
            strokeWidth="2"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Particles representing wisdom and learning */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <motion.circle
                key={`wisdom-${i}`}
                cx={100 + Math.cos(angle) * 85}
                cy={100 + Math.sin(angle) * 85}
                r="2"
                fill="#CD5C5C"
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Virtue symbols (stylized Chinese characters) */}
          {[
            { x: 100, y: 60 },
            { x: 130, y: 100 },
            { x: 100, y: 140 },
            { x: 70, y: 100 },
          ].map((pos, i) => (
            <motion.g
              key={`virtue-${i}`}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              <rect
                x={pos.x - 4}
                y={pos.y - 4}
                width="8"
                height="8"
                fill="none"
                stroke="#CD5C5C"
                strokeWidth="1"
              />
              <line
                x1={pos.x}
                y1={pos.y - 4}
                x2={pos.x}
                y2={pos.y + 4}
                stroke="#CD5C5C"
                strokeWidth="1"
              />
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default ConfucianismAnimation;

'use client';

import { motion } from 'framer-motion';

const HinduismAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-950/20 to-red-950/20">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))' }}
      >
        {/* Om symbol inspired design */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer sacred circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Stylized Om (ॐ) symbol */}
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
            {/* Main curve of Om */}
            <path
              d="M 70 110 Q 80 90, 100 90 Q 120 90, 130 110"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Upper curve */}
            <path
              d="M 100 90 Q 110 75, 120 70"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Dot above */}
            <circle cx="120" cy="65" r="4" fill="#FF6B35" />

            {/* Lower flourish */}
            <path
              d="M 85 110 Q 80 120, 75 130"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Right flourish */}
            <path
              d="M 115 110 Q 120 120, 125 130"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Sacred geometry - lotus petals */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <motion.path
                key={i}
                d={`M 100 100 Q ${100 + Math.cos(angle) * 50} ${100 + Math.sin(angle) * 50}, ${100 + Math.cos(angle) * 65} ${100 + Math.sin(angle) * 65}`}
                fill="none"
                stroke="#D2691E"
                strokeWidth="1"
                opacity="0.3"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.15,
                  repeat: Infinity,
                }}
              />
            );
          })}

          {/* Trishul (Trident) elements - simplified */}
          {[0, 120, 240].map((angle, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.7,
                repeat: Infinity,
              }}
            >
              <line
                x1="100"
                y1="100"
                x2={100 + Math.cos((angle * Math.PI) / 180) * 40}
                y2={100 + Math.sin((angle * Math.PI) / 180) * 40}
                stroke="#CD5C5C"
                strokeWidth="2"
              />
            </motion.g>
          ))}

          {/* Ambient particles representing divine energy */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.cos((i * 45 * Math.PI) / 180) * 70}
              cy={100 + Math.sin((i * 45 * Math.PI) / 180) * 70}
              r="2.5"
              fill="#FF6B35"
              animate={{
                opacity: [0, 0.8, 0],
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

export default HinduismAnimation;

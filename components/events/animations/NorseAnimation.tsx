'use client';

import { motion } from 'framer-motion';

/**
 * Norse/Viking themed animation featuring:
 * - Yggdrasil (World Tree) at the center
 * - Rotating Valknut symbols
 * - Runic inscriptions
 * - Interlaced knotwork patterns
 * - Nine realms orbital paths
 */
const NorseAnimation = () => {
  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for mystical glow */}
        <radialGradient id="norseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
        </radialGradient>

        {/* Pattern for wood grain texture */}
        <pattern id="woodGrain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#8B7355" opacity="0.1" />
          <line x1="0" y1="0" x2="4" y2="4" stroke="#654321" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Background glow */}
      <motion.circle
        cx="150"
        cy="150"
        r="120"
        fill="url(#norseGlow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Nine Realms - orbital rings */}
      {[80, 100, 120].map((radius, index) => (
        <motion.circle
          key={`realm-${index}`}
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="#4169E1"
          strokeWidth="0.5"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            pathLength: { duration: 2, delay: index * 0.3 },
            rotate: { duration: 20 + index * 10, repeat: Infinity, ease: 'linear' },
          }}
          style={{ originX: '150px', originY: '150px' }}
        />
      ))}

      {/* Yggdrasil - World Tree trunk */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ originX: '150px', originY: '150px' }}
      >
        {/* Tree trunk */}
        <rect
          x="140"
          y="100"
          width="20"
          height="100"
          fill="url(#woodGrain)"
          stroke="#654321"
          strokeWidth="2"
        />

        {/* Tree base/roots */}
        <path
          d="M 140 200 Q 120 210 100 220 M 160 200 Q 180 210 200 220 M 150 200 Q 150 215 150 230"
          stroke="#654321"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Yggdrasil branches */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Left branches */}
        <motion.path
          d="M 140 130 Q 110 120 90 110"
          stroke="#654321"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 140 130 Q 110 120 90 110', 'M 140 130 Q 110 118 90 108', 'M 140 130 Q 110 120 90 110'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 140 150 Q 100 145 70 140"
          stroke="#654321"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 140 150 Q 100 145 70 140', 'M 140 150 Q 100 143 70 138', 'M 140 150 Q 100 145 70 140'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Right branches */}
        <motion.path
          d="M 160 130 Q 190 120 210 110"
          stroke="#654321"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 160 130 Q 190 120 210 110', 'M 160 130 Q 190 118 210 108', 'M 160 130 Q 190 120 210 110'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 160 150 Q 200 145 230 140"
          stroke="#654321"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 160 150 Q 200 145 230 140', 'M 160 150 Q 200 143 230 138', 'M 160 150 Q 200 145 230 140'] }}
          transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Top branches */}
        <motion.path
          d="M 145 100 Q 135 80 130 60"
          stroke="#654321"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 145 100 Q 135 80 130 60', 'M 145 100 Q 135 78 130 58', 'M 145 100 Q 135 80 130 60'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 155 100 Q 165 80 170 60"
          stroke="#654321"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M 155 100 Q 165 80 170 60', 'M 155 100 Q 165 78 170 58', 'M 155 100 Q 165 80 170 60'] }}
          transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>

      {/* Valknut - Odin's knot (three interlocking triangles) */}
      <motion.g
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          scale: { duration: 1, delay: 1 },
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
        }}
        style={{ originX: '150px', originY: '60px' }}
      >
        {/* Three interlocking triangles forming Valknut */}
        <path
          d="M 150 45 L 140 60 L 160 60 Z"
          fill="none"
          stroke="#4169E1"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 145 53 L 135 68 L 155 68 Z"
          fill="none"
          stroke="#4169E1"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 155 53 L 145 68 L 165 68 Z"
          fill="none"
          stroke="#4169E1"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Runic circle - Elder Futhark runes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {/* Simplified runic symbols positioned in a circle */}
        {[
          { angle: 0, rune: 'ᚠ' },    // Fehu
          { angle: 45, rune: 'ᚢ' },   // Uruz
          { angle: 90, rune: 'ᚦ' },   // Thurisaz
          { angle: 135, rune: 'ᚨ' },  // Ansuz
          { angle: 180, rune: 'ᚱ' },  // Raidho
          { angle: 225, rune: 'ᚲ' },  // Kenaz
          { angle: 270, rune: 'ᚷ' },  // Gebo
          { angle: 315, rune: 'ᚹ' },  // Wunjo
        ].map((item, index) => {
          const radius = 135;
          const x = 150 + radius * Math.cos((item.angle - 90) * (Math.PI / 180));
          const y = 150 + radius * Math.sin((item.angle - 90) * (Math.PI / 180));

          return (
            <motion.text
              key={index}
              x={x}
              y={y}
              fontSize="16"
              fill="#4169E1"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="serif"
              fontWeight="bold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: 1 }}
              transition={{
                opacity: { duration: 3, delay: index * 0.1, repeat: Infinity },
                scale: { duration: 0.5, delay: 1.5 + index * 0.1 },
              }}
            >
              {item.rune}
            </motion.text>
          );
        })}
      </motion.g>

      {/* Norse knotwork at bottom */}
      <motion.g
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Interlaced pattern */}
        <path
          d="M 100 240 Q 125 230 150 240 Q 175 250 200 240"
          stroke="#4169E1"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 100 250 Q 125 260 150 250 Q 175 240 200 250"
          stroke="#4169E1"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Floating particles/runes */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx={80 + i * 30}
          cy={270}
          r="1.5"
          fill="#4169E1"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-20, -40, -60],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  );
};

export default NorseAnimation;

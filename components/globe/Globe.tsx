'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import Earth from './Earth';
import EventPopup from '@/components/events/EventPopup';
import { useAppStore } from '@/stores/useAppStore';
import { ReligiousEvent } from '@/types';
import sampleEvents from '@/data/sample-events.json';

const Globe = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<ReligiousEvent | null>(null);
  const { setEvents, getFilteredEvents } = useAppStore();

  // Load events on mount
  useEffect(() => {
    setEvents(sampleEvents as ReligiousEvent[]);
  }, [setEvents]);

  // Get filtered events based on timeline
  const filteredEvents = getFilteredEvents();

  // Stop auto-rotation on first user interaction
  const handleInteractionStart = () => {
    if (autoRotate) {
      setAutoRotate(false);
    }
  };

  const handleEventClick = (event: ReligiousEvent) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full h-full"
      >
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          className="bg-transparent"
        >
          <Suspense fallback={null}>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.3} />

            {/* Main directional light (like the sun) */}
            <directionalLight position={[5, 3, 5]} intensity={1.5} />

            {/* Fill light from the other side */}
            <directionalLight position={[-5, -3, -5]} intensity={0.5} />

            {/* Point light for highlights */}
            <pointLight position={[10, 10, 10]} intensity={0.5} />

            {/* Stars in the background */}
            <Stars
              radius={300}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            {/* The Earth with markers and connections */}
            <Earth
              isRotating={autoRotate}
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onEventClick={handleEventClick}
            />

            {/* Orbit controls for interaction */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={8}
              autoRotate={false}
              dampingFactor={0.05}
              enableDamping={true}
              onStart={handleInteractionStart}
            />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Event Popup */}
      <EventPopup event={selectedEvent} onClose={handleClosePopup} />
    </>
  );
};

export default Globe;

'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Earth from './Earth';
import EventPopup from '@/components/events/EventPopup';
import { useAppStore } from '@/stores/useAppStore';
import { ReligiousEvent } from '@/types';
import sampleEvents from '@/data/sample-events.json';

// Helper to convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Camera controller component that smoothly moves to events
function CameraController({
  targetEvent,
  onInteractionStart
}: {
  targetEvent: ReligiousEvent | null;
  onInteractionStart: () => void;
}) {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (targetEvent && controlsRef.current) {
      // Get the position of the event on the globe
      const eventPosition = latLngToVector3(
        targetEvent.location.lat,
        targetEvent.location.lng,
        1
      );

      // Calculate camera target position (looking at the event from a distance)
      const distance = 3; // Distance from globe
      const cameraPosition = eventPosition.clone().multiplyScalar(distance);

      // Smoothly animate camera to new position
      const startPosition = camera.position.clone();
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease in-out function
        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        camera.position.lerpVectors(startPosition, cameraPosition, eased);

        // Update controls target to point at the event
        if (controlsRef.current) {
          controlsRef.current.target.lerp(eventPosition, eased);
          controlsRef.current.update();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [targetEvent, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={2}
      maxDistance={8}
      autoRotate={false}
      dampingFactor={0.05}
      enableDamping={true}
      onStart={onInteractionStart}
    />
  );
}

const Globe = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const { setEvents, getFilteredEvents, selectedEvent, setSelectedEvent } = useAppStore();

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

            {/* Camera controller with smooth animation to events */}
            <CameraController
              targetEvent={selectedEvent}
              onInteractionStart={handleInteractionStart}
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

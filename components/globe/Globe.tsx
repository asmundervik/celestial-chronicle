'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Earth from './Earth';
import EventPopup from '@/components/events/EventPopup';
import BuddhaEnlightenmentScene from '@/components/events/animations/BuddhaEnlightenmentScene';
import VideoOverlay from '@/components/events/animations/VideoOverlay';
import { useAppStore } from '@/stores/useAppStore';
import { ReligiousEvent } from '@/types';
import sampleEvents from '@/data/sample-events.json';
import { AnimatePresence } from 'framer-motion';

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
  const animFrameRef = useRef<number | null>(null);

  const cancelAnimation = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  useEffect(() => {
    cancelAnimation();

    if (targetEvent && controlsRef.current) {
      const eventPosition = latLngToVector3(
        targetEvent.location.lat,
        targetEvent.location.lng,
        1
      );

      const closeDistance = 2.2;
      const farDistance = 5;
      const finalPosition = eventPosition.clone().multiplyScalar(closeDistance);
      const startPosition = camera.position.clone();

      const currentDirection = startPosition.clone().normalize();
      const zoomOutPosition = currentDirection.multiplyScalar(farDistance);

      const startTime = Date.now();
      const phase1Duration = 800;
      const phase2Duration = 1500;
      const phase3Duration = 1200;
      const totalDuration = phase1Duration + phase2Duration + phase3Duration;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        let currentPosition;
        let targetLookAt;

        if (elapsed < phase1Duration) {
          const phase1Progress = elapsed / phase1Duration;
          const eased = phase1Progress < 0.5
            ? 2 * phase1Progress * phase1Progress
            : -1 + (4 - 2 * phase1Progress) * phase1Progress;

          currentPosition = new THREE.Vector3().lerpVectors(startPosition, zoomOutPosition, eased);
          targetLookAt = new THREE.Vector3(0, 0, 0);
        } else if (elapsed < phase1Duration + phase2Duration) {
          const phase2Progress = (elapsed - phase1Duration) / phase2Duration;
          const eased = phase2Progress < 0.5
            ? 2 * phase2Progress * phase2Progress
            : -1 + (4 - 2 * phase2Progress) * phase2Progress;

          const targetDirection = eventPosition.clone().normalize();
          const targetZoomedOut = targetDirection.multiplyScalar(farDistance);
          currentPosition = new THREE.Vector3().lerpVectors(zoomOutPosition, targetZoomedOut, eased);
          targetLookAt = new THREE.Vector3().lerpVectors(new THREE.Vector3(0, 0, 0), eventPosition, eased);
        } else {
          const phase3Progress = (elapsed - phase1Duration - phase2Duration) / phase3Duration;
          const eased = phase3Progress < 0.5
            ? 2 * phase3Progress * phase3Progress
            : -1 + (4 - 2 * phase3Progress) * phase3Progress;

          const targetDirection = eventPosition.clone().normalize();
          const targetZoomedOut = targetDirection.multiplyScalar(farDistance);
          currentPosition = new THREE.Vector3().lerpVectors(targetZoomedOut, finalPosition, eased);
          targetLookAt = eventPosition;
        }

        camera.position.copy(currentPosition);

        if (controlsRef.current && targetLookAt) {
          controlsRef.current.target.copy(targetLookAt);
          controlsRef.current.update();
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    } else if (!targetEvent && controlsRef.current) {
      // Reset both the orbit target and the camera distance so OrbitControls
      // resumes at a comfortable radius instead of the zoomed-in position.
      const centerTarget = new THREE.Vector3(0, 0, 0);
      const startTarget = controlsRef.current.target.clone();
      const startCamPos = camera.position.clone();
      // Pull the camera back out to the default orbit radius along its current direction
      const resetCamPos = camera.position.clone().normalize().multiplyScalar(3);
      const startTime = Date.now();
      const duration = 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        if (controlsRef.current) {
          controlsRef.current.target.lerpVectors(startTarget, centerTarget, eased);
          controlsRef.current.update();
        }
        camera.position.lerpVectors(startCamPos, resetCamPos, eased);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    }

    return cancelAnimation;
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
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatingEvent, setAnimatingEvent] = useState<ReligiousEvent | null>(null);
  const [showJourneyIntro, setShowJourneyIntro] = useState(false);
  const [journeyIntroVideo, setJourneyIntroVideo] = useState<string | null>(null);
  const { setEvents, getFilteredEvents, selectedEvent, setSelectedEvent, activeJourney } = useAppStore();

  // Load events on mount
  useEffect(() => {
    setEvents(sampleEvents as ReligiousEvent[]);
  }, [setEvents]);

  // Disable auto-rotation when a journey is active
  useEffect(() => {
    if (activeJourney) {
      setAutoRotate(false);
    }
  }, [activeJourney]);

  // Play journey intro video when journey starts
  useEffect(() => {
    if (activeJourney && activeJourney.introVideo) {
      setJourneyIntroVideo(activeJourney.introVideo);
      setShowJourneyIntro(true);
    }
  }, [activeJourney]);

  // Get filtered events based on timeline
  const filteredEvents = getFilteredEvents();

  // Stop auto-rotation on first user interaction
  const handleInteractionStart = () => {
    if (autoRotate) {
      setAutoRotate(false);
    }
  };

  const handleEventClick = (event: ReligiousEvent) => {
    // Check if this event has a video animation or special animation
    if (event.animationVideo || event.id === 'buddha-enlightenment') {
      setAnimatingEvent(event);
      setShowAnimation(true);
      // Animation will call handleAnimationComplete when done
    } else {
      setSelectedEvent(event);
    }
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    if (animatingEvent) {
      setSelectedEvent(animatingEvent);
      setAnimatingEvent(null);
    }
  };

  const handleJourneyIntroComplete = () => {
    setShowJourneyIntro(false);
    setJourneyIntroVideo(null);
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

      {/* Animated Scene Overlay */}
      <AnimatePresence>
        {/* Journey Intro Video */}
        {showJourneyIntro && journeyIntroVideo && (
          <VideoOverlay
            videoSrc={journeyIntroVideo}
            onComplete={handleJourneyIntroComplete}
            duration={10000}
          />
        )}

        {/* Event Animation */}
        {showAnimation && animatingEvent && (
          <>
            {/* Video animation if available */}
            {animatingEvent.animationVideo && (
              <VideoOverlay
                videoSrc={animatingEvent.animationVideo}
                onComplete={handleAnimationComplete}
                duration={3000}
              />
            )}

            {/* Fallback to custom animation for specific events */}
            {!animatingEvent.animationVideo && animatingEvent.id === 'buddha-enlightenment' && (
              <BuddhaEnlightenmentScene onComplete={handleAnimationComplete} />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Globe;

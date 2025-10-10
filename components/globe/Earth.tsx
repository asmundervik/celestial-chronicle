'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { ReligiousEvent } from '@/types';
import EventMarker from './EventMarker';
import ConnectionLines from './ConnectionLines';

interface EarthProps {
  isRotating: boolean;
  events: ReligiousEvent[];
  selectedEvent: ReligiousEvent | null;
  onEventClick: (event: ReligiousEvent) => void;
}

const Earth = ({ isRotating, events, selectedEvent, onEventClick }: EarthProps) => {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load Earth textures
  const [colorMap, normalMap, specularMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  ]);

  // Load clouds texture
  const cloudsMap = useLoader(
    THREE.TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  );

  // Gentle rotation animation - only when isRotating is true
  // Rotate the entire group so markers rotate with the Earth
  useFrame((state) => {
    if (isRotating) {
      if (earthGroupRef.current) {
        earthGroupRef.current.rotation.y += 0.001;
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0012 - 0.001; // Clouds rotate slightly faster (relative to Earth)
      }
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += 0.0005 - 0.001; // Atmosphere rotates slower (relative to Earth)
      }
    }
  });

  return (
    <group ref={earthGroupRef}>
      {/* Main Earth sphere with realistic textures */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          roughnessMap={specularMap}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmosphere glow effect */}
      <Sphere ref={atmosphereRef} args={[1.08, 32, 32]}>
        <meshBasicMaterial
          color="#4dabf7"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[1.03, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
        />
      </Sphere>

      {/* Connection Lines - Red Threads */}
      <ConnectionLines
        events={events}
        selectedEvent={selectedEvent}
      />

      {/* Event Markers */}
      {events.map((event) => (
        <EventMarker
          key={event.id}
          event={event}
          onClick={onEventClick}
        />
      ))}
    </group>
  );
};

export default Earth;

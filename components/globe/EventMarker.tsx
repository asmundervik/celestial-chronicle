'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ReligiousEvent } from '@/types';

interface EventMarkerProps {
  event: ReligiousEvent;
  onClick: (event: ReligiousEvent) => void;
}

const EventMarker = ({ event, onClick }: EventMarkerProps) => {
  const markerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Convert lat/lng to 3D coordinates on sphere
  const getPosition = (lat: number, lng: number, radius: number = 1.02) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  const position = getPosition(event.location.lat, event.location.lng);

  // Gentle pulsing animation
  useFrame((state) => {
    if (markerRef.current) {
      const scale = hovered ? 1.3 : 1;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      markerRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh
      ref={markerRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Marker sphere */}
      <sphereGeometry args={[0.015, 16, 16]} />
      <meshStandardMaterial
        color={event.religion.color || '#FFA500'}
        emissive={event.religion.color || '#FFA500'}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        transparent
        opacity={0.9}
      />

      {/* Glow ring around marker */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.02, 0.03, 32]} />
          <meshBasicMaterial
            color={event.religion.color || '#FFA500'}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </mesh>
  );
};

export default EventMarker;
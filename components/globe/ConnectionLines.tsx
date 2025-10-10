'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ReligiousEvent } from '@/types';

interface ConnectionLinesProps {
  events: ReligiousEvent[];
  selectedEvent?: ReligiousEvent | null;
}

const ConnectionLines = ({ events, selectedEvent }: ConnectionLinesProps) => {
  const linesRef = useRef<THREE.Group>(null);

  // Convert lat/lng to 3D coordinates
  const getPosition = (lat: number, lng: number, radius: number = 1.03) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  // Create a curved line between two points on the sphere
  const createCurvedLine = (start: THREE.Vector3, end: THREE.Vector3) => {
    // Calculate midpoint and lift it up for arc effect
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);

    // Lift the midpoint outward from sphere center
    const liftAmount = 0.3; // How high the arc rises
    mid.normalize().multiplyScalar(1 + liftAmount);

    // Create curve through start, mid, end
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

    return curve;
  };

  // Generate all connection lines
  const connectionLines = useMemo(() => {
    const lines: Array<{
      curve: THREE.QuadraticBezierCurve3;
      color: string;
      isHighlighted: boolean;
    }> = [];

    // Create event lookup map
    const eventMap = new Map(events.map(e => [e.id, e]));

    // If there's a selected event, only show its connections
    if (selectedEvent && selectedEvent.connections) {
      selectedEvent.connections.forEach(connId => {
        const connectedEvent = eventMap.get(connId);
        if (connectedEvent) {
          const start = getPosition(
            selectedEvent.location.lat,
            selectedEvent.location.lng
          );
          const end = getPosition(
            connectedEvent.location.lat,
            connectedEvent.location.lng
          );
          const curve = createCurvedLine(start, end);

          lines.push({
            curve,
            color: selectedEvent.religion.color || '#FFD700',
            isHighlighted: true,
          });
        }
      });
    } else {
      // Show all connections (subdued)
      events.forEach(event => {
        if (event.connections && event.connections.length > 0) {
          event.connections.forEach(connId => {
            const connectedEvent = eventMap.get(connId);
            if (connectedEvent) {
              const start = getPosition(event.location.lat, event.location.lng);
              const end = getPosition(
                connectedEvent.location.lat,
                connectedEvent.location.lng
              );
              const curve = createCurvedLine(start, end);

              lines.push({
                curve,
                color: event.religion.color || '#FFD700',
                isHighlighted: false,
              });
            }
          });
        }
      });
    }

    return lines;
  }, [events, selectedEvent]);

  // Animate the lines
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        if (connectionLines[i]?.isHighlighted) {
          // Pulsing effect for highlighted connections
          material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        } else {
          // Subtle opacity for non-highlighted
          material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {connectionLines.map((lineData, index) => {
        const points = lineData.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial
              color={lineData.color}
              transparent
              opacity={lineData.isHighlighted ? 0.7 : 0.2}
              linewidth={2}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}
    </group>
  );
};

export default ConnectionLines;

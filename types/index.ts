// Core type definitions for CelestialChronicle

export interface ReligiousEvent {
  id: string;
  title: string;
  description: string;
  startYear: number;
  endYear?: number;
  region: Region;
  location: Location;
  religion: Religion;
  category: EventCategory;
  significance: string;
  keywords?: string[]; // Thematic keywords for filtering and linking
  connections?: string[]; // IDs of related events (red threads)
  media?: Media[];
  animationVideo?: string; // Optional path to cinematic video overlay
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Region {
  id: string;
  name: string;
  continent: string;
}

export interface Religion {
  id: string;
  name: string;
  tradition: string; // e.g., "Eastern", "Abrahamic", "Indigenous"
  color?: string; // For visual representation
}

export interface Media {
  type: 'image' | 'animation' | 'video';
  url: string;
  alt?: string;
}

export type EventCategory =
  | 'origin'
  | 'ritual'
  | 'text'
  | 'movement'
  | 'figure'
  | 'architecture'
  | 'reform'
  | 'syncretism';

export interface TimelineState {
  selectedPeriod: {
    start: number;
    end: number;
  };
  currentYear: number;
}

export interface GlobeState {
  selectedRegion: Region | null;
  zoom: number;
  rotation: { x: number; y: number };
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  introVideo?: string; // Optional path to intro video for the journey
  eventIds: string[];
}

export interface JourneyState {
  activeJourney: Journey | null;
  currentStepIndex: number;
}

export interface AppState {
  timeline: TimelineState;
  globe: GlobeState;
  selectedEvent: ReligiousEvent | null;
  filteredEvents: ReligiousEvent[];
  journey: JourneyState;
}

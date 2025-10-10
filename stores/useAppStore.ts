import { create } from 'zustand';
import { ReligiousEvent, Region, TimelineState, GlobeState } from '@/types';

interface AppStore {
  // Timeline state
  timeline: TimelineState;
  setTimeline: (timeline: Partial<TimelineState>) => void;

  // Globe state
  globe: GlobeState;
  setGlobe: (globe: Partial<GlobeState>) => void;
  setSelectedRegion: (region: Region | null) => void;

  // Events
  events: ReligiousEvent[];
  selectedEvent: ReligiousEvent | null;
  setSelectedEvent: (event: ReligiousEvent | null) => void;
  setEvents: (events: ReligiousEvent[]) => void;

  // Filtered events based on timeline and region
  getFilteredEvents: () => ReligiousEvent[];
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial timeline state (start with major civilizations period)
  timeline: {
    selectedPeriod: {
      start: -3000, // 3000 BCE - early civilizations
      end: 2025,    // Present
    },
    currentYear: -1500, // Start view at major religious developments
  },
  setTimeline: (timeline) =>
    set((state) => ({
      timeline: { ...state.timeline, ...timeline },
    })),

  // Initial globe state
  globe: {
    selectedRegion: null,
    zoom: 1,
    rotation: { x: 0, y: 0 },
  },
  setGlobe: (globe) =>
    set((state) => ({
      globe: { ...state.globe, ...globe },
    })),
  setSelectedRegion: (region) =>
    set((state) => ({
      globe: { ...state.globe, selectedRegion: region },
    })),

  // Events state
  events: [],
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setEvents: (events) => set({ events }),

  // Filter events based on current timeline and region
  getFilteredEvents: () => {
    const { events, timeline, globe } = get();

    return events.filter((event) => {
      // Filter by time period
      const inTimePeriod =
        event.startYear >= timeline.selectedPeriod.start &&
        event.startYear <= timeline.selectedPeriod.end;

      // Filter by region if one is selected
      const inRegion = globe.selectedRegion
        ? event.region.id === globe.selectedRegion.id
        : true;

      return inTimePeriod && inRegion;
    });
  },
}));

import { create } from 'zustand';
import { ReligiousEvent, Region, TimelineState, GlobeState, Journey } from '@/types';

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

  // Journey state
  activeJourney: Journey | null;
  currentStepIndex: number;
  startJourney: (journey: Journey) => void;
  endJourney: () => void;
  nextStep: () => void;
  previousStep: () => void;
  getCurrentJourneyEvent: () => ReligiousEvent | null;

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

  // Journey state
  activeJourney: null,
  currentStepIndex: 0,

  startJourney: (journey) => {
    set({
      activeJourney: journey,
      currentStepIndex: 0
    });
    // Auto-select the first event in the journey
    const { events } = get();
    const firstEvent = events.find(e => e.id === journey.eventIds[0]);
    if (firstEvent) {
      set({ selectedEvent: firstEvent });
    }
  },

  endJourney: () => {
    set({
      activeJourney: null,
      currentStepIndex: 0,
      selectedEvent: null
    });
  },

  nextStep: () => {
    const { activeJourney, currentStepIndex, events } = get();
    if (!activeJourney) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < activeJourney.eventIds.length) {
      set({ currentStepIndex: nextIndex });
      const nextEvent = events.find(e => e.id === activeJourney.eventIds[nextIndex]);
      if (nextEvent) {
        set({ selectedEvent: nextEvent });
      }
    }
  },

  previousStep: () => {
    const { activeJourney, currentStepIndex, events } = get();
    if (!activeJourney) return;

    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      set({ currentStepIndex: prevIndex });
      const prevEvent = events.find(e => e.id === activeJourney.eventIds[prevIndex]);
      if (prevEvent) {
        set({ selectedEvent: prevEvent });
      }
    }
  },

  getCurrentJourneyEvent: () => {
    const { activeJourney, currentStepIndex, events } = get();
    if (!activeJourney) return null;

    const eventId = activeJourney.eventIds[currentStepIndex];
    return events.find(e => e.id === eventId) || null;
  },

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

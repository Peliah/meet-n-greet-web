"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/lib/types";

// Sample events data for demo purposes
const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year with speakers from around the world.",
    date: "2025-03-15",
    time: "09:00",
    location: "San Francisco Convention Center",
    capacity: 500,
    remainingSlots: 375,
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Technology",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Art Exhibition Opening",
    description: "Featuring works from contemporary artists exploring themes of nature and technology.",
    date: "2025-04-10",
    time: "18:00",
    location: "Modern Art Gallery",
    capacity: 200,
    remainingSlots: 125,
    image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Art",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Music Festival",
    description: "Three days of amazing music across multiple stages with food and camping.",
    date: "2025-07-20",
    time: "12:00",
    location: "Riverside Park",
    capacity: 3000,
    remainingSlots: 1500,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Music",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Cooking Workshop",
    description: "Learn to cook authentic Italian dishes with our expert chef.",
    date: "2025-05-05",
    time: "16:00",
    location: "Culinary Institute",
    capacity: 30,
    remainingSlots: 12,
    image: "https://images.pexels.com/photos/5907591/pexels-photo-5907591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Food",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface EventState {
  events: Event[];
  getEvent: (id: string) => Event | undefined;
  addEvent: (event: Omit<Event, "id" | "createdAt" | "updatedAt" | "remainingSlots">) => string;
  updateEvent: (id: string, event: Partial<Event>) => boolean;
  deleteEvent: (id: string) => boolean;
  decreaseCapacity: (id: string) => boolean;
  increaseCapacity: (id: string) => boolean;
  getFilteredEvents: (
    searchTerm?: string,
    category?: string,
    sortBy?: "date" | "title"
  ) => Event[];
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: SAMPLE_EVENTS,

      getEvent: (id: string) => {
        return get().events.find((event) => event.id === id);
      },

      addEvent: (eventData) => {
        const id = `event-${Date.now()}`;
        const newEvent: Event = {
          ...eventData,
          id,
          remainingSlots: eventData.capacity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          events: [...state.events, newEvent],
        }));

        return id;
      },

      updateEvent: (id, eventData) => {
        const eventExists = get().events.some((event) => event.id === id);
        
        if (!eventExists) return false;

        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? {
                  ...event,
                  ...eventData,
                  remainingSlots: 
                    'capacity' in eventData
                      ? (eventData.capacity as number) - (event.capacity - event.remainingSlots)
                      : event.remainingSlots,
                  updatedAt: new Date().toISOString(),
                }
              : event
          ),
        }));

        return true;
      },

      deleteEvent: (id) => {
        const eventExists = get().events.some((event) => event.id === id);
        
        if (!eventExists) return false;

        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));

        return true;
      },

      decreaseCapacity: (id) => {
        const event = get().getEvent(id);
        
        if (!event || event.remainingSlots <= 0) return false;

        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? {
                  ...event,
                  remainingSlots: event.remainingSlots - 1,
                  updatedAt: new Date().toISOString(),
                }
              : event
          ),
        }));

        return true;
      },

      increaseCapacity: (id) => {
        const event = get().getEvent(id);
        
        if (!event || event.remainingSlots >= event.capacity) return false;

        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? {
                  ...event,
                  remainingSlots: event.remainingSlots + 1,
                  updatedAt: new Date().toISOString(),
                }
              : event
          ),
        }));

        return true;
      },

      getFilteredEvents: (searchTerm, category, sortBy) => {
        let filteredEvents = [...get().events];
        
        if (searchTerm) {
          const search = searchTerm.toLowerCase();
          filteredEvents = filteredEvents.filter(
            (event) =>
              event.title.toLowerCase().includes(search) ||
              event.description.toLowerCase().includes(search) ||
              event.location.toLowerCase().includes(search)
          );
        }
        
        if (category) {
          filteredEvents = filteredEvents.filter(
            (event) => event.category === category
          );
        }
        
        if (sortBy === "date") {
          filteredEvents.sort((a, b) => a.date.localeCompare(b.date));
        } else if (sortBy === "title") {
          filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        return filteredEvents;
      },
    }),
    {
      name: "event-storage",
    }
  )
);
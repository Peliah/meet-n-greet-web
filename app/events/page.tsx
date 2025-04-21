"use client";

import { useState, useEffect } from "react";
import { PageTransition } from "@/components/navigation/page-transition";
import { EventCard } from "@/components/events/event-card";
import { EventFilters } from "@/components/events/event-filters";
import { useEventStore } from "@/hooks/use-event-store";
import { Event } from "@/lib/types";
import { motion } from "framer-motion";

export default function EventsPage() {
  const { events } = useEventStore();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  useEffect(() => {
    // Initialize with all events
    setFilteredEvents(events);
  }, [events]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold">
              UPCOMING <span className="text-yellow-400">EVENTS</span>
            </h1>
            <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
            <p className="mt-4 text-lg text-gray-700">
              Browse and book events that match your interests.
            </p>
          </div>

          <EventFilters onFilter={setFilteredEvents} />

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No events found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find events.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
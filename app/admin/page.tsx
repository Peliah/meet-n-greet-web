"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEventStore } from "@/hooks/use-event-store";
import { useBookingStore } from "@/hooks/use-booking-store";
import { Booking, Event } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarPlus, BarChart, Clock, Users } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { events } = useEventStore();
  const { bookings } = useBookingStore();
  
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalBookings: 0,
    averageCapacity: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/events");
      return;
    }

    // Calculate dashboard stats
    const now = new Date();
    const upcoming = events.filter(
      (event) => new Date(event.date) > now
    ).length;
    
    const avgCapacity =
      events.length > 0
        ? events.reduce((sum, event) => sum + event.capacity, 0) / events.length
        : 0;

    setStats({
      totalEvents: events.length,
      upcomingEvents: upcoming,
      totalBookings: bookings.length,
      averageCapacity: Math.round(avgCapacity),
    });
  }, [isAuthenticated, isAdmin, router, events, bookings]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            ADMIN <span className="text-yellow-400">DASHBOARD</span>
          </h1>
          <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
          <p className="mt-4 text-lg text-gray-700">
            Manage your events and view bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NeoCard variant="primary" className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 bg-yellow-400 border-4 border-black mb-4">
                <BarChart size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold">{stats.totalEvents}</h3>
              <p className="text-gray-600">Total Events</p>
            </NeoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NeoCard variant="secondary" className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 bg-blue-400 border-4 border-black mb-4">
                <Clock size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold">{stats.upcomingEvents}</h3>
              <p className="text-gray-600">Upcoming Events</p>
            </NeoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NeoCard variant="accent" className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 bg-pink-400 border-4 border-black mb-4">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              <p className="text-gray-600">Total Bookings</p>
            </NeoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NeoCard variant="white" className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 bg-gray-200 border-4 border-black mb-4">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold">{stats.averageCapacity}</h3>
              <p className="text-gray-600">Avg. Capacity</p>
            </NeoCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NeoCard className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Events</h2>
                <Link href="/admin/events">
                  <NeoButton variant="secondary" size="sm">
                    View All
                  </NeoButton>
                </Link>
              </div>
              
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No events created yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border-2 border-black bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                        </div>
                        <Link href={`/admin/events/${event.id}`}>
                          <NeoButton variant="primary" size="sm">
                            Edit
                          </NeoButton>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6">
                <Link href="/admin/events/new">
                  <NeoButton variant="primary" fullWidth>
                    <CalendarPlus size={18} className="mr-2" />
                    Create New Event
                  </NeoButton>
                </Link>
              </div>
            </NeoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NeoCard className="h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
              
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No bookings yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => {
                    const event = events.find((e) => e.id === booking.eventId);
                    
                    return (
                      <div
                        key={booking.id}
                        className="p-4 border-2 border-black bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">
                              {event?.title || "Unknown Event"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Booked by: {booking.userName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Status: {booking.status}
                            </p>
                          </div>
                          {event && (
                            <Link href={`/admin/events/${event.id}/bookings`}>
                              <NeoButton variant="secondary" size="sm">
                                View
                              </NeoButton>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </NeoCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
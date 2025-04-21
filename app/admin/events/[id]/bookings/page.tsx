"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoBadge } from "@/components/ui/neo-badge";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEventStore } from "@/hooks/use-event-store";
import { useBookingStore } from "@/hooks/use-booking-store";
import { Booking, Event } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Mail, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EventBookingsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { getEvent } = useEventStore();
  const { getEventBookings } = useBookingStore();
  
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/events");
      return;
    }

    const eventData = getEvent(eventId);
    
    if (!eventData) {
      router.push("/admin/events");
      return;
    }
    
    setEvent(eventData);
    
    const eventBookings = getEventBookings(eventId);
    setBookings(eventBookings);
  }, [isAuthenticated, isAdmin, router, eventId, getEvent, getEventBookings]);

  if (!event) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <Link href="/admin/events" className="inline-block mb-6">
          <NeoButton variant="secondary">
            <ArrowLeft size={18} className="mr-2" />
            Back to Events
          </NeoButton>
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            EVENT <span className="text-yellow-400">BOOKINGS</span>
          </h1>
          <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
        </div>

        <NeoCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-700" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-700" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-700" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-700" />
                  <span>
                    {event.capacity - event.remainingSlots} bookings (
                    {event.remainingSlots} spots remaining)
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border-4 border-black overflow-hidden h-40">
                <img
                  src={
                    event.image ||
                    "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </NeoCard>

        <NeoCard>
          <h2 className="text-2xl font-bold mb-6">Bookings ({bookings.length})</h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings for this event yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left border-4 border-black">
                      Name
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Email
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Booking Date
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b-2 border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 border-4 border-black">
                        {booking.userName}
                      </td>
                      <td className="p-4 border-4 border-black">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-600" />
                          <span>{booking.userEmail}</span>
                        </div>
                      </td>
                      <td className="p-4 border-4 border-black">
                        {formatDate(booking.bookingDate)}
                      </td>
                      <td className="p-4 border-4 border-black">
                        <NeoBadge
                          variant={
                            booking.status === "confirmed"
                              ? "primary"
                              : "destructive"
                          }
                        >
                          {booking.status}
                        </NeoBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </NeoCard>
      </div>
    </PageTransition>
  );
}
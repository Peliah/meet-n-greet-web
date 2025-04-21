"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-navigation";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoBadge } from "@/components/ui/neo-badge";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEventStore } from "@/hooks/use-event-store";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarPlus, Edit, Trash2, Users, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { NeoInput } from "@/components/ui/neo-input";

export default function AdminEventsPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { events, deleteEvent } = useEventStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/events");
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      setFilteredEvents(
        events.filter(
          (event) =>
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search)
        )
      );
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const handleDeleteEvent = (id: string) => {
    setIsDeleting(id);
    
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
    
    setIsDeleting(null);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold">
              MANAGE <span className="text-yellow-400">EVENTS</span>
            </h1>
            <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/admin/events/new">
              <NeoButton variant="primary">
                <CalendarPlus size={18} className="mr-2" />
                Create New Event
              </NeoButton>
            </Link>
          </div>
        </div>

        <NeoCard className="mb-8">
          <div className="mb-6">
            <NeoInput
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No events found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left border-4 border-black">
                      Event
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Date
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Location
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Capacity
                    </th>
                    <th className="p-4 text-left border-4 border-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b-2 border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 border-4 border-black">
                        <div>
                          <h3 className="font-bold">{event.title}</h3>
                          {event.category && (
                            <NeoBadge
                              variant="secondary"
                              className="mt-1"
                            >
                              {event.category}
                            </NeoBadge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 border-4 border-black">
                        {formatDate(event.date)}
                        <br />
                        <span className="text-sm text-gray-600">
                          {event.time}
                        </span>
                      </td>
                      <td className="p-4 border-4 border-black">
                        {event.location}
                      </td>
                      <td className="p-4 border-4 border-black">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-gray-600" />
                          <span>
                            {event.remainingSlots} / {event.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-4 border-black">
                        <div className="flex gap-2">
                          <Link href={`/events/${event.id}`}>
                            <NeoButton
                              variant="secondary"
                              size="sm"
                              className="p-2"
                            >
                              <Eye size={16} />
                            </NeoButton>
                          </Link>
                          <Link href={`/admin/events/${event.id}`}>
                            <NeoButton
                              variant="primary"
                              size="sm"
                              className="p-2"
                            >
                              <Edit size={16} />
                            </NeoButton>
                          </Link>
                          <Link href={`/admin/events/${event.id}/bookings`}>
                            <NeoButton
                              variant="accent"
                              size="sm"
                              className="p-2"
                            >
                              <Users size={16} />
                            </NeoButton>
                          </Link>
                          <NeoButton
                            variant="destructive"
                            size="sm"
                            className="p-2"
                            onClick={() => handleDeleteEvent(event.id)}
                            disabled={isDeleting === event.id}
                          >
                            <Trash2 size={16} />
                          </NeoButton>
                        </div>
                      </td>
                    </motion.tr>
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
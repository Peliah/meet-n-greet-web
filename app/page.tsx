"use client";

import { motion } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoCard } from "@/components/ui/neo-card";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoBadge } from "@/components/ui/neo-badge";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useEventStore } from "@/hooks/use-event-store";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const { events } = useEventStore();
  const featuredEvents = events.slice(0, 3);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                DISCOVER <span className="text-yellow-400">BRUTALIST</span>{" "}
                EVENTS
              </h1>
              <p className="text-xl mb-8">
                Browse and book events with our neo-brutalist event platform.
                Clean, simple, and effective.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events">
                  <NeoButton size="lg" variant="primary">
                    Browse Events
                  </NeoButton>
                </Link>
                <Link href="/login">
                  <NeoButton size="lg" variant="secondary">
                    Sign In
                  </NeoButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 bg-yellow-400 border-4 border-black hidden md:block"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-blue-400 border-4 border-black hidden md:block"
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        ></motion.div>
      </section>

      {/* Featured Events Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              FEATURED EVENTS
            </h2>
            <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
          </div>
          <Link href="/events" className="mt-4 md:mt-0">
            <NeoButton variant="secondary">
              <span className="flex items-center">
                View All Events
                <ArrowRight size={18} className="ml-2" />
              </span>
            </NeoButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <NeoCard
              key={event.id}
              variant={
                index % 3 === 0
                  ? "primary"
                  : index % 3 === 1
                  ? "secondary"
                  : "accent"
              }
              interactive
              index={index}
              className="h-full flex flex-col"
            >
              <div className="relative mb-4 overflow-hidden border-4 border-black">
                <img
                  src={
                    event.image ||
                    "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                {event.category && (
                  <div className="absolute top-0 right-0 m-2">
                    <NeoBadge
                      variant={
                        index % 3 === 0
                          ? "primary"
                          : index % 3 === 1
                          ? "secondary"
                          : "accent"
                      }
                    >
                      {event.category}
                    </NeoBadge>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-extrabold mb-2">{event.title}</h3>

              <div className="space-y-2 mb-4 flex-grow">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-700" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-700" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-700" />
                  <span>
                    {event.remainingSlots} / {event.capacity} spots available
                  </span>
                </div>
              </div>

              <Link href={`/events/${event.id}`} className="block mt-auto">
                <NeoButton
                  variant={
                    event.remainingSlots === 0 ? "destructive" : "primary"
                  }
                  fullWidth
                  disabled={event.remainingSlots === 0}
                >
                  {event.remainingSlots === 0 ? "Sold Out" : "View Details"}
                </NeoButton>
              </Link>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              WHY CHOOSE <span className="text-yellow-400">EVENT</span>BRUT?
            </h2>
            <div className="h-2 w-20 bg-yellow-400 mt-2 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white text-black border-4 border-white p-6"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-yellow-400 border-4 border-black mb-4">
                <Calendar size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p>
                Browse and book events with just a few clicks. Our platform makes
                it easy to find and secure your spot.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white text-black border-4 border-white p-6"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-blue-400 border-4 border-black mb-4">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Event Management</h3>
              <p>
                For organizers, our platform offers powerful tools to create,
                manage, and promote events with ease.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white text-black border-4 border-white p-6"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-pink-400 border-4 border-black mb-4">
                <MapPin size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Events</h3>
              <p>
                Find events near you or filter by category. Our search and filter
                options help you discover events you'll love.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-400 border-4 border-black p-8 md:p-12 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                READY TO EXPLORE EVENTS?
              </h2>
              <p className="text-lg mb-6">
                Join our platform to discover and book amazing events happening
                around you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events">
                  <NeoButton size="lg" variant="secondary">
                    Browse Events
                  </NeoButton>
                </Link>
                <Link href="/login">
                  <NeoButton size="lg" variant="primary">
                    Sign Up Now
                  </NeoButton>
                </Link>
              </div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 border-4 border-black bg-black opacity-10 rotate-12"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 border-4 border-black bg-black opacity-10 -rotate-12"></div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
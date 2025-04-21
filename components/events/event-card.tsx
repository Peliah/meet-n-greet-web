"use client";

import { Event } from "@/lib/types";
import { NeoCard } from "../ui/neo-card";
import { NeoBadge } from "../ui/neo-badge";
import { NeoButton } from "../ui/neo-button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const {
    id,
    title,
    date,
    time,
    location,
    capacity,
    remainingSlots,
    category,
    image,
  } = event;

  const isSoldOut = remainingSlots === 0;

  return (
    <NeoCard
      variant={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
      interactive
      index={index}
      className="h-full flex flex-col"
    >
      <div className="relative mb-4 overflow-hidden border-4 border-black">
        <img
          src={image || "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {category && (
          <div className="absolute top-0 right-0 m-2">
            <NeoBadge variant={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}>
              {category}
            </NeoBadge>
          </div>
        )}
      </div>

      <h3 className="text-xl font-extrabold mb-2">{title}</h3>

      <div className="space-y-2 mb-4 flex-grow">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-700" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-700" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-gray-700" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gray-700" />
          <span>
            {remainingSlots} / {capacity} spots available
          </span>
        </div>
      </div>

      <Link href={`/events/${id}`} className="block mt-auto">
        <NeoButton
          variant={isSoldOut ? "destructive" : "primary"}
          fullWidth
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "View Details"}
        </NeoButton>
      </Link>
    </NeoCard>
  );
}
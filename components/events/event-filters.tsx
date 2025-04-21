"use client";

import { NeoInput } from "@/components/ui/neo-input";
import { useState, useEffect } from "react";
import { useEventStore } from "@/hooks/use-event-store";
import { NeoButton } from "../ui/neo-button";
import { Search, Filter } from "lucide-react";

interface EventFiltersProps {
  onFilter: (events: any[]) => void;
}

export function EventFilters({ onFilter }: EventFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title" | undefined>(undefined);
  const { getFilteredEvents, events } = useEventStore();

  // Get all unique categories from events
  const categories = Array.from(
    new Set(events.map((event) => event.category).filter(Boolean))
  );

  useEffect(() => {
    const filteredEvents = getFilteredEvents(
      searchTerm || undefined,
      category || undefined,
      sortBy
    );
    onFilter(filteredEvents);
  }, [searchTerm, category, sortBy, onFilter, getFilteredEvents]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <NeoInput
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="relative">
          <select
            className="w-full py-3 px-4 bg-white border-4 border-black outline-none focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none font-medium"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Filter
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        <div>
          <select
            className="w-full py-3 px-4 bg-white border-4 border-black outline-none focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none font-medium"
            value={sortBy || ""}
            onChange={(e) => setSortBy(e.target.value as "date" | "title" | undefined)}
          >
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <NeoButton
          onClick={() => {
            setSearchTerm("");
            setCategory("");
            setSortBy(undefined);
          }}
          variant="secondary"
        >
          Reset Filters
        </NeoButton>
      </div>
    </div>
  );
}
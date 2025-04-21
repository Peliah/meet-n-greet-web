"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Booking } from "@/lib/types";
import { useEventStore } from "./use-event-store";

// Sample bookings for demo purposes
const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    eventId: "1",
    userId: "client-1",
    userName: "Client User",
    userEmail: "client@example.com",
    bookingDate: new Date().toISOString(),
    status: "confirmed",
  },
  {
    id: "booking-2",
    eventId: "3",
    userId: "client-1",
    userName: "Client User",
    userEmail: "client@example.com",
    bookingDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: "confirmed",
  },
];

interface BookingState {
  bookings: Booking[];
  getBooking: (id: string) => Booking | undefined;
  getUserBookings: (userId: string) => Booking[];
  getEventBookings: (eventId: string) => Booking[];
  createBooking: (
    eventId: string,
    userId: string,
    userName: string,
    userEmail: string
  ) => string | null;
  cancelBooking: (id: string) => boolean;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: SAMPLE_BOOKINGS,

      getBooking: (id: string) => {
        return get().bookings.find((booking) => booking.id === id);
      },

      getUserBookings: (userId: string) => {
        return get().bookings.filter((booking) => booking.userId === userId);
      },

      getEventBookings: (eventId: string) => {
        return get().bookings.filter((booking) => booking.eventId === eventId);
      },

      createBooking: (eventId, userId, userName, userEmail) => {
        // Check if event has available capacity
        if (!useEventStore.getState().decreaseCapacity(eventId)) {
          return null;
        }

        const id = `booking-${Date.now()}`;
        const newBooking: Booking = {
          id,
          eventId,
          userId,
          userName,
          userEmail,
          bookingDate: new Date().toISOString(),
          status: "confirmed",
        };

        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }));

        return id;
      },

      cancelBooking: (id: string) => {
        const booking = get().getBooking(id);
        
        if (!booking) return false;

        // Increase event capacity back
        useEventStore.getState().increaseCapacity(booking.eventId);

        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id
              ? { ...booking, status: "cancelled" }
              : booking
          ),
        }));

        return true;
      },
    }),
    {
      name: "booking-storage",
    }
  )
);
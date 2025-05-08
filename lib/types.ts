// Types for the application

export type UserRole = 'admin' | 'client';


declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole
    }
  }
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  hasImage?: boolean;
  role: UserRole;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  remainingSlots: number;
  image?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}
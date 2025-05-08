import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { auth } from '@clerk/nextjs/server';
import { UserRole } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    return dateString;
  }
}

export function formatDateTime(dateString: string, timeString: string): string {
  if (!dateString) return '';

  try {
    const date = parseISO(dateString);
    return `${format(date, 'MMM d, yyyy')} at ${timeString}`;
  } catch (error) {
    return `${dateString} at ${timeString}`;
  }
}

export const checkRole = async (role: UserRole) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

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
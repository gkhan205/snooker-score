import { COST_PER_HOUR } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNumberWithOrdinal = (n: number) => {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) {
    return n + 'st';
  }
  if (j === 2 && k !== 12) {
    return n + 'nd';
  }
  if (j === 3 && k !== 13) {
    return n + 'rd';
  }
  return n + 'th';
};

export const calculateCost = (minute: number) => {
  const hours = minute / 60;
  return Math.round(hours * COST_PER_HOUR);
};

export const currencyFormatter = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

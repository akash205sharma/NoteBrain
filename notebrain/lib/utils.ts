// lib/utils.ts

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// Merge Tailwind classes intelligently
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

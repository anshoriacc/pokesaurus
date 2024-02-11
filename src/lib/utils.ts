import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const heightToMeterConversion = (height: number) =>
  (height / 10).toFixed(1);

export const weightToKgConversion = (weight: number) =>
  (weight / 10).toFixed(1);

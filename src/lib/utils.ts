import config from "@/config";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createCheckout = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/create-checkout`, {
      method: "POST",
      credentials: "include",
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (e) {
    alert(e);
  }
};
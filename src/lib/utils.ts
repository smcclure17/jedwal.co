import config from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const createApi = async (googleId: string, type: "doc" | "api") => {
  const res = await fetch(`${config.apiUrl}/${type}`, {
    method: "POST",
    body: JSON.stringify({ google_id: googleId }),
    credentials: "include",
    headers: { "Content-type": "application/json" },
  });

  if (res.status === 415) {
    const message = await res.json();
    throw new Error(message.detail);
  }

  if (!res.ok) {
    throw new Error(`Request returned status ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

export const savePickerToken = async (token: string, expiresIn: number) => {
  try {
    await fetch(`${config.apiUrl}/google-picker-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, expires_in: expiresIn }),
      credentials: "include",
    });
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};

"use client";
import { createCheckout } from "@/lib/utils";

export const CheckoutButton = () => {
  return <button onClick={() => createCheckout()}>Checkout</button>;
};

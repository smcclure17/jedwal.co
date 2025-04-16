"use client";
import config from "@/config";

export const CheckoutButton = () => {
  const handleClick = async () => {
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

  return <button onClick={() => handleClick()}>Checkout</button>;
};

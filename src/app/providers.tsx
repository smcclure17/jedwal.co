"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY !== undefined) {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
          autocapture: {
            elementInteractions: true,
          },
        });
      }
    }
  }, []);
  return children;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AmplitudeProvider>{children}</AmplitudeProvider>
    </QueryClientProvider>
  );
}

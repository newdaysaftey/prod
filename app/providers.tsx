"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Toaster } from "sonner";
import { FAQChat } from "@/components/molecules/faq/FAQChat";

import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <FAQChat />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster />
    </QueryClientProvider>
  );
}

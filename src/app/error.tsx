"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Container } from "@/components/layout/container";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Alert variant="destructive" className="bg-white dark:bg-neutral-950">
        <AlertCircle className="h-4 w-4" />

        <AlertTitle>Error!</AlertTitle>

        <AlertDescription>
          Something went wrong, click to{" "}
          <a onClick={() => reset()} className="cursor-pointer underline">
            refresh
          </a>
          .
        </AlertDescription>
      </Alert>
    </Container>
  );
}

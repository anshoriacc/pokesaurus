import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      "mx-auto min-h-[100dvh] w-full max-w-[1200px] p-4 pt-20",
      className,
    )}
    {...props}
  />
));

Container.displayName = "Container";

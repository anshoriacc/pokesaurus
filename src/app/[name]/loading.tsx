import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailLoading() {
  return (
    <Container className="flex flex-col gap-6">
      <Skeleton className="h-9 w-1/2" />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[40%_1fr]">
        <Skeleton className="aspect-[1] w-full" />

        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="aspect-[3/2] w-32" />
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/5" />
          </div>
        </section>
      </section>
    </Container>
  );
}

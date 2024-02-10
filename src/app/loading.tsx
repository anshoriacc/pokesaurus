import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <Container>
      <section className="flex flex-wrap justify-center gap-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex w-[200px] flex-col items-center gap-2 overflow-hidden rounded-xl p-4 transition-all hover:-translate-y-1 hover:bg-neutral-50 dark:hover:bg-neutral-900">
            <Skeleton className="aspect-[1] w-full" />

            <div className="flex flex-col items-center gap-0.5">
              <Skeleton className="h-[26px] w-1/2" />

              <Skeleton className="h-[22px] w-1/4" />

              <div className="flex flex-wrap gap-1">
                {[...Array(3)].map((types, index) => (
                  <Skeleton key={index} className="h-[22px] w-12" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
}

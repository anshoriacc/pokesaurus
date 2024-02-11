import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <Container>
      <section className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 lg:grid-cols-4 [@media(min-width:1200px)]:grid-cols-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center gap-2 overflow-hidden rounded-xl bg-neutral-50 p-4 transition-all dark:bg-neutral-900">
            <Skeleton className="aspect-[1] w-full" />

            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-7 w-3/4" />

              <Skeleton className="h-5 w-1/2" />

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

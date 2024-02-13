import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompareLoading() {
  return (
    <Container className="flex flex-col gap-6 items-center">
      <Skeleton className="h-9 w-1/2" />

      <section className="grid grid-cols-2 gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </section>

      <section className="grid flex-1 grid-cols-2 gap-6">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </section>
    </Container>
  );
}

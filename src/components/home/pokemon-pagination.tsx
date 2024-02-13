"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  totalData: number;
};

export const PokemonPagination = ({ totalData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 20;
  const page = Number(searchParams.get("page")) || 1;

  const prevLink = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(Number(page) - 1));
    return `/?${params.toString()}`;
  }, [page, searchParams]);

  const nextLink = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(Number(page) + 1));
    return `/?${params.toString()}`;
  }, [page, searchParams]);

  const totalPage = useMemo(() => {
    return Math.ceil(totalData / limit);
  }, [limit, totalData]);

  const handleChangeLimit = useCallback(
    (value: string) => {
      console.log(value);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.set("limit", String(Number(value)));
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <section className="flex items-center justify-end gap-6 mt-auto">
      <div className="flex items-center gap-3">
        <span>Limit</span>
        <Select value={String(limit)} onValueChange={handleChangeLimit}>
          <SelectTrigger className="w-auto">
            <SelectValue defaultValue={limit} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup defaultValue={20}>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={prevLink} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" className="pointer-events-none">
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPage && (
            <PaginationItem>
              <PaginationNext href={nextLink} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};

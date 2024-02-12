/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "./input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialRender = useRef(true);

  const [text, setText] = useState<string>(searchParams.get("search") ?? "");
  const debouncedText = useDebounce(text);

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
        router.push(`/?${params.toString()}`);
      } else {
        params.delete("search");
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams],
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    handleSearch(debouncedText);
  }, [debouncedText]);

  useEffect(() => {
    if (pathname !== "/") setText("");
  }, [pathname]);

  return (
    <div
      className={cn(
        "relative w-full transition-all duration-1000 has-[input:focus]:max-w-[360px]",
        text.length ? "max-w-[360px]" : "max-w-[160px]",
      )}>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        aria-label="search"
        placeholder="Search pokémon"
        className="peer rounded-full pr-9"
      />

      <Search
        className={cn(
          "pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform transition-all peer-focus:text-inherit",
          text.length ? "text-inherit" : "text-neutral-500",
        )}
      />
    </div>
  );
};

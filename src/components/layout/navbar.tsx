import Image from "next/image";
import Link from "next/link";

import pokeball from "@/assets/pokeball.svg";
import { SearchInput } from "../ui/search";
import { Suspense } from "react";

export const Navbar = () => {
  return (
    <div className="pointer-events-none fixed top-4 z-10 h-0 w-full px-6">
      <header className="pointer-events-auto mx-auto flex h-12 w-full max-w-[800px] items-center justify-between gap-4 rounded-full bg-neutral-950/80 px-1 shadow backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:bg-white/80">
        <Link
          href="/"
          className="group flex items-center gap-0.5 hover:animate-pulse">
          <Image
            src={pokeball}
            alt="logo"
            priority
            draggable={false}
            className="h-10 w-10 group-hover:animate-[spin_10s_linear_infinite]"
          />

          <span className="hidden text-xl font-bold text-neutral-50 transition-all dark:text-neutral-900 [@media(min-width:400px)]:block">
            Pokésaurus
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </header>
    </div>
  );
};

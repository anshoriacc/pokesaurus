import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "../theme-toggle";
import pokeball from "@/assets/pokeball.svg";

export const Navbar = () => {
  return (
    <div className="pointer-events-none fixed top-4 h-0 w-screen px-[5%] z-[1]">
      <header className="pointer-events-auto mx-auto flex h-12 w-full max-w-[800px] items-center justify-between rounded-full bg-neutral-950 pl-0.5 pr-1 shadow transition-all duration-300 hover:shadow-lg dark:bg-white">
        <Link
          href="/"
          className="flex items-center gap-0.5 hover:animate-pulse">
          <Image src={pokeball} alt="logo" className="h-12 w-12" priority />

          <span className="text-xl font-bold text-neutral-50 transition-all dark:text-neutral-900">
            Pokésaurus
          </span>
        </Link>

        <ThemeToggle />
      </header>
    </div>
  );
};

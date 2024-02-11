import Link from "next/link";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

type Props = { className?: string };

export const Footer = async ({ className }: Props) => {
  return (
    <footer className="border-t border-t-neutral-200 dark:border-t-neutral-800">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6",
          className,
        )}>
        <p className="text-neutral-500">
          <Link
            href="https://github.com/anshoriacc/pokesaurus"
            target="_blank"
            className="transition-all hover:text-primary-yellow">
            Source
          </Link>
          . Made with{" "}
          <Link
            href="https://pokeapi.co/"
            target="_blank"
            className="transition-all hover:text-primary-yellow">
            PokéAPI
          </Link>
          .
        </p>

        <ThemeToggle />
      </div>
    </footer>
  );
};

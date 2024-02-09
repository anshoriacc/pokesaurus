import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { className?: string };

export const Footer = async ({ className }: Props) => {
  return (
    <footer className="border-t border-t-neutral-200 dark:border-t-neutral-800">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1200px] items-center justify-center px-6",
          className
        )}
      >
        <span className="text-neutral-500">
          © {dayjs().get("year")} Pokésaurus.{" "}
          <Link
            href="https://github.com/anshoriacc/pokedex-nextjs"
            target="_blank"
            className="hover:text-primary-yellow transition-all"
          >
            src
          </Link>
        </span>
      </div>
    </footer>
  );
};

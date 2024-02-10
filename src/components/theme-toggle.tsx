"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-100 dark:hover:text-neutral-900">
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-1 bg-gray-950 dark:bg-white">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-white hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white dark:text-neutral-950 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 dark:focus:bg-neutral-100 dark:focus:text-neutral-950">
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-white hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white dark:text-neutral-950 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 dark:focus:bg-neutral-100 dark:focus:text-neutral-950">
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-white hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white dark:text-neutral-950 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 dark:focus:bg-neutral-100 dark:focus:text-neutral-950">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

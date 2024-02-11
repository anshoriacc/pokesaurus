"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { setTheme, theme, systemTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? "light"
        : "dark",
    );
  }, [setTheme, systemTheme, theme]);

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="rounded-full">
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

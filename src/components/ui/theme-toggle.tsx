import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple theme toggle using the `dark` class on <html>. Persists to localStorage.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

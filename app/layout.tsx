"use client";
import "./globals.css";
import { Facebook, Github } from "lucide-react";
import { useSunTheme } from "./hooks/useSunTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSunTheme();

  return (
    <html lang="nl">
      <body
        className={`min-h-screen transition-colors duration-700 ${
          theme === "night"
            ? "bg-neutral-900 text-white"
            : "bg-neutral-100 text-black"
        }`}
      >
        {children}

        <footer className="py-6 border-t border-black/10 dark:border-white/10">
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/KAPSALONsener"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook pagina Kapsalon Sener"
              title="Facebook"
              className="opacity-80 hover:opacity-100 transition"
            >
              <Facebook size={22} />
            </a>

            <a
              href="https://github.com/Dj-Shortcut/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profiel Dj-Shortcut"
              title="GitHub"
              className="opacity-60 hover:opacity-100 transition"
            >
              <Github size={20} />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

import "./globals.css";
import { Michroma } from "next/font/google";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body
        className={`
          ${michroma.className}
          bg-black
          text-white
          antialiased
          overflow-x-hidden
        `}
      >
        {children}
      </body>
    </html>
  );
}

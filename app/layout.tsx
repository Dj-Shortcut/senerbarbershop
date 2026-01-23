import "./globals.css";
import { Michroma } from "next/font/google";
import Script from "next/script";
import { Facebook, Instagram, Github, MapPin } from "lucide-react";

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
        {/* JSON-LD Structured Data */}
        <Script
          id="barber-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: "Barber Sener",
              url: "https://www.thesenerbarber.shop/",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Beverstraat 22",
                addressLocality: "Ninove",
                postalCode: "9400",
                addressCountry: "BE",
              },
              telephone: "+32488383871",
              priceRange: "€€",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/KAPSALONsener",
                "https://www.instagram.com/the_barber_sener/",
              ],
            }),
          }}
        />

        {children}

        {/* FOOTER */}
        <footer className="py-6 border-t border-white/10">
          <div className="flex flex-col items-center gap-4 text-sm text-white/60">
            <div className="flex justify-center gap-5">
              <a
                href="https://www.facebook.com/KAPSALONsener"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook pagina Barber Sener"
                className="opacity-70 hover:opacity-100 transition"
              >
                <Facebook size={22} />
              </a>

              <a
                href="https://www.instagram.com/the_barber_sener/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profiel Barber Sener"
                className="opacity-70 hover:opacity-100 transition"
              >
                <Instagram size={22} />
              </a>

              <a
                href="https://github.com/Dj-Shortcut/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profiel Dj-Shortcut"
                className="opacity-40 hover:opacity-70 transition"
              >
                <Github size={20} />
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Beverstraat+22,+9400+Ninove"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
              aria-label="Open adres in Google Maps"
            >
              <MapPin size={16} />
              <span>Beverstraat 22, 9400 Ninove</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

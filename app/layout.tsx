import "./globals.css";
import { Michroma } from "next/font/google";
import Script from "next/script";

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
        {/* JSON-LD Structured Data for Google */}
        <Script
          id="barber-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarberShop",
              name: "The Barber Sener",
              image: "https://thesenerbarber.shop/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Beverstraat 22",
                addressLocality: "Ninove",
                postalCode: "9400",
                addressCountry: "BE"
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
                    "Saturday"
                  ],
                  opens: "09:00",
                  closes: "19:00"
                }
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "120"
              }
            })
          }}
        />

        {children}
      </body>
    </html>
  );
}

import { useEffect, useState } from "react";

function getSunsetTime(lat: number, lon: number): Date {
  const date = new Date();
  const J1970 = 2440588;
  const J2000 = 2451545;

  const toJulian = (d: Date) => d.getTime() / 86400000 - 0.5 + J1970;
  const fromJulian = (j: number) => new Date((j + 0.5 - J1970) * 86400000);

  const lw = (-lon * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const d = toJulian(date) - J2000;

  const M = (357.5291 + 0.98560028 * d) * (Math.PI / 180);
  const C =
    (1.9148 * Math.sin(M) +
      0.02 * Math.sin(2 * M) +
      0.0003 * Math.sin(3 * M)) *
    (Math.PI / 180);

  const L = M + C + Math.PI + 1.796593063;
  const dec = Math.asin(Math.sin(L) * Math.sin(0.4091));

  const w = Math.acos(
    (Math.sin(-0.83 * (Math.PI / 180)) - Math.sin(phi) * Math.sin(dec)) /
      (Math.cos(phi) * Math.cos(dec))
  );

  const Jnoon = J2000 + d + lw / (2 * Math.PI);
  const Jset = Jnoon + w / (2 * Math.PI);

  return fromJulian(Jset);
}

export function useSunTheme() {
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const sunset = getSunsetTime(50.85, 4.35); // België (Brussel)
    const now = new Date();

    setTheme(now > sunset ? "night" : "day");
  }, []);

  return theme;
}

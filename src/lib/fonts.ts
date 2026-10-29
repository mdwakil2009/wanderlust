import { Montserrat, Playfair_Display } from "next/font/google";

/** Display serif used for headings (hero is italic; section titles upright). */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

/** Brand wordmark font used for the "Wanderlust" logo. */
export const logoFont = Montserrat({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
});

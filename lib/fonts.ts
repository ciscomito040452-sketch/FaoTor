import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";

export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-sans-thai",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontClassName = `${ibmPlexSansThai.variable} ${inter.variable}`;

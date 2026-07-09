import localFont from "next/font/local";

export const ibmPlexSansThai = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexSansThai-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansThai-thai-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansThai-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansThai-thai-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansThai-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansThai-thai-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-thai",
  display: "swap",
});

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const fontClassName = `${ibmPlexSansThai.variable} ${inter.variable}`;

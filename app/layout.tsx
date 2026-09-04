import type { Metadata } from "next";
import { Quicksand, Fredoka } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Penelove Pricelist 💖 Katalog Digital & Direct Order WhatsApp",
  description:
    "Pricelist aplikasi premium terpercaya & termurah! AI & Productivity (ChatGPT, Claude, Gemini, MS 365) & Streaming (Netflix, Disney+, WeTV, Viu, Vidio). Garansi Full & Proses Kilat via WhatsApp 6289501485483.",
  keywords: [
    "Penelove Pricelist",
    "Jual Akun Netflix Murah",
    "ChatGPT Plus Murah",
    "Claude Pro Murah",
    "Disney Hotstar Murah",
    "YouTube Premium Murah",
    "Langganan AI Murah",
    "Pricelist Aplikasi Premium",
    "Direct Order WhatsApp",
  ],
  authors: [{ name: "Penelove Store" }],
  openGraph: {
    title: "Penelove Pricelist 💖 Katalog Digital & Order WhatsApp",
    description:
      "Katalog aplikasi premium terlengkap (AI Tools & Streaming Apps) bergaransi 100% legal, aman, & anti-hold!",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${quicksand.variable} ${fredoka.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>" />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] bg-grid-pattern text-slate-800 antialiased selection:bg-penelove-pink-200 selection:text-penelove-pink-700">
        {children}
      </body>
    </html>
  );
}

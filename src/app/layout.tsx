import type { Metadata } from "next";
import { Inter, Cinzel, Bungee_Spice } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});
const bungeeSpice = Bungee_Spice({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee-spice",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Calcu-Mate",
    default: "Calcu-Mate"
  },
  description: "Calcu-Mate - A comprehensive calculator web application with multiple calculator types",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cinzel.variable} ${bungeeSpice.variable}`}>{children}</body>
    </html>
  );
}

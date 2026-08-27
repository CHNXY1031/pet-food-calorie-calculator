import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import { HeartPulse, PawPrint } from "lucide-react";
import "./globals.css";

const BASE_URL = "https://pet-food-calorie-calculator.vercel.app";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pet Daily Calorie & Food Weight Calculator",
    template: "%s | Pet Feeding Calculator",
  },
  description:
    "Calculate science-based daily calories, dry food grams, wet food portions, and cups for 100+ dog and cat breeds using RER and MER formulas.",
  keywords: [
    "pet calorie calculator",
    "dog food calculator",
    "cat food calculator",
    "how much should I feed my dog",
    "pet food grams per day",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Pet Daily Calorie & Food Weight Calculator",
    description: "Turn your pet's weight and life stage into a practical daily dry and wet food plan.",
    siteName: "Pet Feeding Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Daily Calorie & Food Weight Calculator",
    description: "Science-based calorie and feeding estimates for dogs and cats.",
  },
  verification: { google: "google4bf79fc737f0ba77" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="font-[family-name:var(--font-manrope)] antialiased">
        <header className="relative z-40 border-b border-forest/10 bg-oat/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
            <Link href="/" className="flex items-center gap-3 text-forest" aria-label="Pet Feeding Calculator home">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest text-cream"><PawPrint className="h-5 w-5" /></span>
              <span>
                <span className="block font-display text-lg font-semibold leading-none">PetFuel</span>
                <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.2em] text-terracotta">Calorie Calculator</span>
              </span>
            </Link>
            <nav className="flex items-center gap-2 text-xs font-extrabold text-forest sm:gap-5 sm:text-sm" aria-label="Primary navigation">
              <Link href="/#calculator" className="rounded-full px-3 py-2 hover:bg-white/70">Calculator</Link>
              <Link href="/#breeds" className="rounded-full px-3 py-2 hover:bg-white/70">Breed guides</Link>
              <span className="hidden items-center gap-2 rounded-full bg-sage/20 px-3 py-2 text-forest md:flex"><HeartPulse className="h-4 w-4" /> Vet-informed</span>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-24 border-t border-forest/10 bg-forest text-cream">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
            <div>
              <p className="font-display text-2xl font-semibold">Feed with numbers. Care with context.</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/60">Educational estimates for everyday planning—not a diagnosis or substitute for veterinary care.</p>
            </div>
            <div className="text-sm text-white/65 md:col-start-3">
              <p className="font-extrabold text-sage">Method</p>
              <p className="mt-3 leading-6">RER = 70 × kg<sup>0.75</sup>. Daily MER applies life-stage and activity multipliers commonly used in veterinary nutrition.</p>
              <p className="mt-4 text-xs text-white/40">© {new Date().getFullYear()} PetFuel Calculator</p>
              <a href="https://uptime-pulse-saas.vercel.app/?utm_source=pet-food-calorie-calculator&amp;utm_medium=referral&amp;utm_campaign=protected_by" target="_blank" rel="noopener noreferrer nofollow" className="mt-3 block text-xs text-white/35 underline decoration-white/15 underline-offset-4 transition hover:text-sage">Protected by UptimePulse — Free Website &amp; SSL Monitor</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

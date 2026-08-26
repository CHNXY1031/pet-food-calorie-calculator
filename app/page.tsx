import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Calculator, Cat, Dog, PawPrint } from "lucide-react";
import PetCalculator from "@/components/PetCalculator";
import { catBreeds, dogBreeds } from "@/lib/petData";

export const metadata: Metadata = {
  title: "Pet Daily Calorie & Food Weight Calculator",
  description: "Free dog and cat calorie calculator: estimate daily kcal, dry food grams, wet food grams, and cups for 100+ breeds using RER and MER.",
  alternates: { canonical: "/" },
};

const popularDogs = ["golden-retriever", "labrador-retriever", "french-bulldog", "german-shepherd", "poodle", "beagle", "dachshund", "siberian-husky", "pembroke-welsh-corgi", "chihuahua", "pug", "border-collie"];
const popularCats = ["ragdoll", "maine-coon", "british-shorthair", "siamese", "persian", "bengal", "sphynx", "scottish-fold", "russian-blue", "american-shorthair", "siberian", "domestic-shorthair"];

export default function Page() {
  const dogLinks = dogBreeds.filter((breed) => popularDogs.includes(breed.slug));
  const catLinks = catBreeds.filter((breed) => popularCats.includes(breed.slug));

  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute left-[62%] top-12 h-64 w-64 rounded-[42%_58%_62%_38%] bg-sage/20 blur-sm" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-8">
            <p className="eyebrow"><BadgeCheck className="h-4 w-4" /> RER + MER veterinary nutrition method</p>
            <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.96] tracking-tight text-forest md:text-7xl lg:text-[5.6rem]">
              The daily food math <span className="text-terracotta">your pet deserves.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70 md:text-xl">A free calorie and food weight calculator for every cat and dog family—personalized by weight, breed, life stage, activity, and the food in your bowl.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#calculator" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5"><Calculator className="h-5 w-5" /> Calculate daily food</a>
              <a href="#breeds" className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/65 px-6 py-3.5 text-sm font-extrabold text-forest transition hover:bg-white">Explore breed guides <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="reveal-delay grid grid-cols-2 gap-3 lg:col-span-4 lg:pb-3">
            <div className="rounded-[2.5rem_2.5rem_1rem_2.5rem] bg-forest p-6 text-cream shadow-soft">
              <Dog className="h-8 w-8 text-sage" />
              <p className="mt-10 font-display text-4xl font-semibold">{dogBreeds.length}+</p>
              <p className="mt-1 text-xs font-bold text-white/55">dog breed guides</p>
            </div>
            <div className="mt-8 rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-terracotta p-6 text-white shadow-soft">
              <Cat className="h-8 w-8 text-white/75" />
              <p className="mt-10 font-display text-4xl font-semibold">{catBreeds.length}+</p>
              <p className="mt-1 text-xs font-bold text-white/65">cat breed guides</p>
            </div>
          </div>
        </div>
      </section>

      <div id="calculator" className="mx-auto max-w-7xl scroll-mt-24 px-5 md:px-8">
        <PetCalculator />
      </div>

      <section id="breeds" className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-5 md:px-8">
        <div className="grid gap-7 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow"><PawPrint className="h-4 w-4" /> Long-tail feeding guides</p>
            <h2 className="font-display text-4xl font-semibold text-forest md:text-5xl">Popular breed calorie calculators</h2>
            <p className="mt-5 max-w-md leading-7 text-ink/65">Every guide opens with the calculator preloaded for that breed, plus adult weight context and breed-aware nutrition notes.</p>
          </div>
          <div className="space-y-8 lg:col-span-8">
            <BreedGrid title="Dog feeding calculators" icon="dog" breeds={dogLinks} basePath="/dog-food-calculator" />
            <BreedGrid title="Cat feeding calculators" icon="cat" breeds={catLinks} basePath="/cat-food-calculator" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-5 md:px-8">
        <div className="grid overflow-hidden rounded-4xl bg-forest text-cream shadow-soft lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sage">The formula</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">RER = 70 × weight in kg<sup className="text-xl">0.75</sup></h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">Resting Energy Requirement estimates baseline energy. A maintenance factor then reflects species, growth, neuter status, activity, age, or a veterinarian-guided weight goal.</p>
          </div>
          <div className="bg-sage p-8 text-forest md:p-12 lg:translate-y-5 lg:rounded-tl-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em]">The reality check</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">The best number changes with the pet.</h2>
            <p className="mt-5 max-w-xl leading-7 text-forest/70">Treat the result as a starting point. Weigh food, monitor ribs and waist, and adjust in small steps with your veterinary team—especially for puppies, kittens, pregnancy, illness, or weight loss.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function BreedGrid({
  title,
  icon,
  breeds,
  basePath,
}: {
  title: string;
  icon: "dog" | "cat";
  breeds: typeof dogBreeds;
  basePath: string;
}) {
  const Icon = icon === "dog" ? Dog : Cat;
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-forest"><Icon className="h-5 w-5 text-terracotta" /> {title}</h3>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {breeds.map((breed, index) => (
          <Link key={breed.slug} href={`${basePath}/${breed.slug}`} className={`group flex min-h-16 items-center justify-between rounded-2xl border border-forest/10 bg-white/65 px-4 py-3 text-sm font-extrabold text-forest transition hover:-translate-y-0.5 hover:border-terracotta/40 hover:bg-white ${index % 5 === 0 ? "sm:col-span-2 md:col-span-1" : ""}`}>
            {breed.name}<ArrowUpRight className="h-4 w-4 text-terracotta opacity-60 transition group-hover:rotate-6 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, BadgeCheck, Calculator, Scale, Stethoscope } from "lucide-react";
import PetCalculator from "@/components/PetCalculator";
import { Breed } from "@/lib/petData";

const BASE_URL = "https://pet-food-calorie-calculator.vercel.app";

export default function BreedGuide({ breed }: { breed: Breed }) {
  const speciesWord = breed.species === "dog" ? "dog" : "cat";
  const route = `/${breed.species}-food-calculator/${breed.slug}`;
  const faq = [
    {
      question: `How many calories does a ${breed.name} need per day?`,
      answer: `Daily calories depend on current weight, age, neuter status, activity, and body condition. This calculator uses RER = 70 × body weight in kg^0.75, then applies an appropriate MER factor.`,
    },
    {
      question: `How much should an adult ${breed.name} weigh?`,
      answer: `A broad adult reference range is ${breed.minWeightKg}–${breed.maxWeightKg} kg, but sex, frame, and individual health matter. Body-condition score is more useful than breed average alone.`,
    },
    {
      question: `How many cups of food should I feed my ${breed.name}?`,
      answer: "Cup amounts vary greatly with calorie density. Enter the kcal per 100g from your food label; this tool uses approximately 120 grams per US cup as a practical default conversion.",
    },
    {
      question: "Can I combine dry and wet food?",
      answer: "Yes. Set the dry/wet slider and enter each food's calorie density. Keep the combined calories near the daily target and transition diets gradually.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${breed.name} Daily Calorie & Food Weight Calculator`,
      url: `${BASE_URL}${route}`,
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      description: `Estimate daily calories, dry food grams, wet food grams, and cups for a ${breed.name}.`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden border-b border-forest/10 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full border-[48px] border-sage/15" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold text-forest/65 hover:text-terracotta"><ArrowLeft className="h-4 w-4" /> All breed calculators</Link>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="reveal lg:col-span-8">
              <p className="eyebrow"><Calculator className="h-4 w-4" /> Free {speciesWord} feeding calculator</p>
              <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-forest md:text-7xl">
                How Much Should I Feed a <span className="text-terracotta">{breed.name}?</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Calculate a daily calorie target, grams of dry and wet food, and cups per day using your {breed.name}&apos;s real weight and life stage.</p>
            </div>
            <aside className="reveal-delay rounded-4xl border border-forest/10 bg-cream p-6 shadow-soft lg:col-span-4 lg:rotate-1">
              <div className="flex items-center gap-3 text-terracotta"><Scale className="h-5 w-5" /><p className="text-xs font-black uppercase tracking-[0.16em]">Adult weight reference</p></div>
              <p className="mt-4 font-display text-4xl font-semibold text-forest">{breed.minWeightKg}–{breed.maxWeightKg} kg</p>
              <p className="mt-2 text-sm font-bold text-ink/55">{Math.round(breed.minWeightKg * 2.20462)}–{Math.round(breed.maxWeightKg * 2.20462)} lb</p>
              <p className="mt-4 text-xs leading-5 text-ink/55">Use current or veterinarian-set target weight in the calculator—not the midpoint by default.</p>
            </aside>
          </div>
        </div>
      </section>

      <div id="calculator" className="mx-auto -mt-9 max-w-7xl scroll-mt-24 px-5 md:px-8">
        <PetCalculator initialSpecies={breed.species} initialBreed={breed.slug} compactHeading />
      </div>

      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <article className="rounded-4xl bg-cream p-7 shadow-soft md:p-10 lg:col-span-7">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-terracotta"><Stethoscope className="h-4 w-4" /> Breed feeding context</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-forest">A practical {breed.name} feeding guide</h2>
            <p className="mt-5 leading-7 text-ink/75">{breed.nutritionTip}</p>
            <p className="mt-4 leading-7 text-ink/75">{breed.weightAlert}</p>
            <div className="mt-7 rounded-3xl border-l-4 border-sage bg-oat p-5">
              <p className="font-extrabold text-forest">Read the label before measuring</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">AAFCO nutritional adequacy statements help identify complete and balanced foods for a life stage. Calorie density on the package is what converts this energy target into grams; a cup alone is not a universal calorie unit.</p>
            </div>
          </article>
          <aside className="space-y-4 lg:col-span-5">
            {[
              ["1", "Calculate RER", "70 × body weight (kg) raised to 0.75"],
              ["2", "Apply MER", "Match age, neuter status, activity, and goal"],
              ["3", "Convert calories", "Use the food label's kcal per 100g"],
              ["4", "Recheck", "Track weight and body condition every 2–4 weeks"],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4 rounded-3xl border border-forest/10 bg-white/65 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-sm font-black text-white">{number}</span>
                <div><p className="font-extrabold text-forest">{title}</p><p className="mt-1 text-sm leading-6 text-ink/60">{text}</p></div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-5 md:px-8">
        <div className="text-center">
          <p className="eyebrow"><BadgeCheck className="h-4 w-4" /> Clear answers</p>
          <h2 className="font-display text-4xl font-semibold text-forest md:text-5xl">{breed.name} feeding FAQ</h2>
        </div>
        <div className="mt-9 divide-y divide-forest/10 overflow-hidden rounded-4xl border border-forest/10 bg-cream shadow-soft">
          {faq.map((item) => (
            <details key={item.question} className="group p-6 open:bg-white md:px-8">
              <summary className="cursor-pointer list-none pr-8 font-extrabold text-forest marker:hidden">{item.question}</summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

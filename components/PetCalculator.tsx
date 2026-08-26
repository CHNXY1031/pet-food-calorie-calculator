"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Cat,
  Check,
  ChevronRight,
  Clipboard,
  Dog,
  Droplets,
  ExternalLink,
  Flame,
  Info,
  Lightbulb,
  PawPrint,
  Scale,
  Search,
  ShoppingBag,
  Utensils,
  Weight,
} from "lucide-react";
import {
  ActivityLevel,
  Breed,
  catBreeds,
  calculateFeedingPlan,
  DEFAULT_DRY_DENSITY,
  DEFAULT_WET_DENSITY,
  dogBreeds,
  LifeStage,
  Species,
} from "@/lib/petData";
import { cn } from "@/lib/utils";

type PetCalculatorProps = {
  initialSpecies?: Species;
  initialBreed?: string;
  compactHeading?: boolean;
};

const stageOptions: { value: LifeStage; label: string; detail: string }[] = [
  { value: "adult_neutered", label: "Neutered adult", detail: "Standard maintenance" },
  { value: "adult_intact", label: "Intact adult", detail: "Higher maintenance" },
  { value: "young", label: "Puppy / kitten", detail: "Growth under 4 months" },
  { value: "senior", label: "Senior", detail: "Lower-energy years" },
  { value: "weight_loss", label: "Weight reduction", detail: "Vet-guided target" },
];

const dogActivityOptions: { value: ActivityLevel; label: string }[] = [
  { value: "low", label: "Low activity / obesity-prone" },
  { value: "typical", label: "Typical daily activity" },
  { value: "active", label: "Very active / working" },
  { value: "working", label: "Heavy working load" },
  { value: "endurance", label: "Endurance / peak load" },
];

const catActivityOptions: { value: ActivityLevel; label: string }[] = [
  { value: "low", label: "Indoor / low activity" },
  { value: "typical", label: "Typical / active play" },
];

function FieldLabel({ icon: Icon, children }: { icon: typeof Scale; children: React.ReactNode }) {
  return (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-forest">
      <Icon aria-hidden="true" className="h-4 w-4 text-terracotta" />
      {children}
    </span>
  );
}

export default function PetCalculator({
  initialSpecies = "dog",
  initialBreed,
  compactHeading = false,
}: PetCalculatorProps) {
  const initialList = initialSpecies === "dog" ? dogBreeds : catBreeds;
  const initialMatch = initialList.find((breed) => breed.slug === initialBreed) ?? initialList[0];
  const [species, setSpecies] = useState<Species>(initialSpecies);
  const [selectedBreed, setSelectedBreed] = useState<Breed>(initialMatch);
  const [breedQuery, setBreedQuery] = useState(initialMatch.name);
  const [showMatches, setShowMatches] = useState(false);
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState(String(Math.round((initialMatch.minWeightKg + initialMatch.maxWeightKg) / 2)));
  const [stage, setStage] = useState<LifeStage>("adult_neutered");
  const [activity, setActivity] = useState<ActivityLevel>("typical");
  const [dryPercent, setDryPercent] = useState(70);
  const [dryDensity, setDryDensity] = useState(DEFAULT_DRY_DENSITY);
  const [wetDensity, setWetDensity] = useState(DEFAULT_WET_DENSITY);
  const [copied, setCopied] = useState(false);

  const breeds = species === "dog" ? dogBreeds : catBreeds;
  const filteredBreeds = useMemo(() => {
    const needle = breedQuery.trim().toLowerCase();
    if (!needle) return breeds.slice(0, 8);
    return breeds.filter((breed) => breed.name.toLowerCase().includes(needle)).slice(0, 8);
  }, [breedQuery, breeds]);

  const numericWeight = Number.parseFloat(weight) || 0;
  const weightKg = unit === "kg" ? numericWeight : numericWeight / 2.20462;
  const plan = calculateFeedingPlan({
    weightKg,
    species,
    stage,
    activity,
    dryPercent,
    dryDensity,
    wetDensity,
  });

  function changeSpecies(nextSpecies: Species) {
    const nextBreed = nextSpecies === "dog" ? dogBreeds[0] : catBreeds[0];
    setSpecies(nextSpecies);
    setSelectedBreed(nextBreed);
    setBreedQuery(nextBreed.name);
    setWeight(String(Math.round((nextBreed.minWeightKg + nextBreed.maxWeightKg) / 2)));
    setActivity("typical");
  }

  function changeUnit(nextUnit: "kg" | "lb") {
    if (nextUnit === unit) return;
    const converted = nextUnit === "lb" ? numericWeight * 2.20462 : numericWeight / 2.20462;
    setWeight(converted.toFixed(1));
    setUnit(nextUnit);
  }

  function chooseBreed(breed: Breed) {
    setSelectedBreed(breed);
    setBreedQuery(breed.name);
    const midpoint = (breed.minWeightKg + breed.maxWeightKg) / 2;
    setWeight((unit === "kg" ? midpoint : midpoint * 2.20462).toFixed(1));
    setShowMatches(false);
  }

  async function copyPlan() {
    const text = [
      `${selectedBreed.name} daily feeding plan`,
      `Weight: ${numericWeight.toFixed(1)} ${unit}`,
      `Daily calories: ${plan.calories} kcal (RER ${plan.rer} × MER ${plan.merFactor})`,
      `Dry food: ${plan.dryGrams} g / ${plan.cups.toFixed(2)} cups`,
      `Wet food: ${plan.wetGrams} g`,
      `Mix: ${dryPercent}% dry / ${100 - dryPercent}% wet`,
      "Estimate only—confirm with your veterinarian and adjust to body condition.",
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const activityOptions = species === "dog" ? dogActivityOptions : catActivityOptions;
  const selectedStage = stageOptions.find((option) => option.value === stage);
  const foodSearch = encodeURIComponent(`${selectedBreed.name} ${species} food`);

  return (
    <section aria-labelledby="calculator-title" className="relative">
      {!compactHeading && (
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow"><PawPrint className="h-4 w-4" /> Free science-based tool</p>
          <h2 id="calculator-title" className="font-display text-4xl font-semibold tracking-tight text-forest md:text-5xl">
            Build a feeding plan around <span className="text-terracotta">your pet</span>, not an average.
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/75">
            Estimate RER and maintenance energy, then translate calories into the dry and wet food you actually serve.
          </p>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="rounded-4xl border border-forest/10 bg-cream p-5 shadow-soft md:p-8 lg:col-span-5">
          <div className="mb-7 grid grid-cols-2 rounded-2xl bg-oat p-1.5" aria-label="Pet species">
            {(["dog", "cat"] as Species[]).map((item) => {
              const Icon = item === "dog" ? Dog : Cat;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => changeSpecies(item)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition",
                    species === item ? "bg-forest text-cream shadow-md" : "text-forest hover:bg-white/70",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item === "dog" ? "Dog" : "Cat"}
                </button>
              );
            })}
          </div>

          <div className="relative mb-5">
            <FieldLabel icon={Search}>Breed</FieldLabel>
            <input
              type="search"
              value={breedQuery}
              onChange={(event) => {
                setBreedQuery(event.target.value);
                setShowMatches(true);
              }}
              onFocus={() => setShowMatches(true)}
              role="combobox"
              aria-autocomplete="list"
              aria-controls="breed-matches"
              aria-label="Search breed"
              aria-expanded={showMatches}
              className="control pl-11"
              placeholder="Start typing a breed…"
            />
            <Search className="pointer-events-none absolute bottom-3.5 left-4 h-5 w-5 text-forest/45" aria-hidden="true" />
            {showMatches && (
              <div id="breed-matches" role="listbox" className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-forest/10 bg-white p-2 shadow-2xl">
                {filteredBreeds.length ? filteredBreeds.map((breed) => (
                  <button
                    type="button"
                    key={breed.slug}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => chooseBreed(breed)}
                    role="option"
                    aria-selected={selectedBreed.slug === breed.slug}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold text-ink hover:bg-oat"
                  >
                    {breed.name}
                    <span className="text-xs font-semibold text-ink/50">{breed.minWeightKg}–{breed.maxWeightKg} kg</span>
                  </button>
                )) : <p className="px-3 py-4 text-sm text-ink/60">No matching breed. Try another spelling.</p>}
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <FieldLabel icon={Weight}>Current or target weight</FieldLabel>
              <div className="mb-2 flex rounded-lg bg-oat p-1 text-xs font-extrabold">
                {(["kg", "lb"] as const).map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => changeUnit(item)}
                    className={cn("rounded-md px-2.5 py-1", unit === item ? "bg-white text-forest shadow-sm" : "text-ink/55")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              min="0.1"
              max={unit === "kg" ? 150 : 330}
              step="0.1"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="control"
              aria-label={`Pet weight in ${unit}`}
            />
          </div>

          <label className="mb-5 block">
            <FieldLabel icon={PawPrint}>Life stage &amp; neuter status</FieldLabel>
            <select value={stage} onChange={(event) => setStage(event.target.value as LifeStage)} className="control">
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label} — {option.detail}</option>
              ))}
            </select>
          </label>

          <label className="mb-7 block">
            <FieldLabel icon={Activity}>Activity level</FieldLabel>
            <select value={activity} onChange={(event) => setActivity(event.target.value as ActivityLevel)} className="control">
              {activityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>

          <div className="rounded-3xl border border-sage/30 bg-sage/10 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-forest">Dry / wet food mix</p>
                <p className="mt-1 text-xs leading-5 text-ink/60">Slide to match the way you serve each meal.</p>
              </div>
              <span className="rounded-full bg-forest px-3 py-1.5 text-xs font-extrabold text-white">{dryPercent}% / {100 - dryPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={dryPercent}
              onChange={(event) => setDryPercent(Number(event.target.value))}
              className="range"
              aria-label="Dry food percentage"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-ink/70">
                Dry kcal / 100g
                <input type="number" min="250" max="550" value={dryDensity} onChange={(event) => setDryDensity(Number(event.target.value))} className="control mt-1.5 py-2.5 text-sm" />
              </label>
              <label className="text-xs font-bold text-ink/70">
                Wet kcal / 100g
                <input type="number" min="50" max="250" value={wetDensity} onChange={(event) => setWetDensity(Number(event.target.value))} className="control mt-1.5 py-2.5 text-sm" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7 lg:-mt-8">
          <div className="overflow-hidden rounded-4xl bg-forest p-6 text-cream shadow-soft md:p-9">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-sage"><Flame className="h-4 w-4" /> WSAVA-style energy estimate</p>
                <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">🐾 Daily Caloric Need</h3>
                <p className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl">
                  {plan.calories}<span className="ml-2 text-base font-bold text-sage">kcal/day</span>
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm backdrop-blur">
                <p className="text-sage">RER × MER factor</p>
                <p className="mt-1 text-xl font-extrabold">{plan.rer} × {plan.merFactor}</p>
                <p className="mt-1 text-xs text-white/55">{selectedStage?.label} · {weightKg.toFixed(1)} kg</p>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-cream p-5 text-ink">
                <div className="flex items-center gap-3 text-forest"><Utensils className="h-5 w-5" /><span className="text-sm font-extrabold">Dry kibble / day</span></div>
                <p className="mt-4 text-4xl font-black">{plan.dryGrams}<span className="ml-1 text-base font-bold text-ink/50">g</span></p>
                <p className="mt-1 text-sm font-bold text-terracotta">{plan.cups.toFixed(2)} cups / day</p>
              </div>
              <div className="rounded-3xl bg-sage p-5 text-forest">
                <div className="flex items-center gap-3"><Droplets className="h-5 w-5" /><span className="text-sm font-extrabold">Wet food / day</span></div>
                <p className="mt-4 text-4xl font-black">{plan.wetGrams}<span className="ml-1 text-base font-bold text-forest/55">g</span></p>
                <p className="mt-1 text-sm font-bold text-forest/65">at {wetDensity} kcal / 100g</p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-white/10 bg-black/10 p-3 text-xs leading-5 text-white/65">
              <Info className="mt-0.5 h-4 w-4 shrink-0" /> Start here, monitor body condition every 2–4 weeks, and adjust by 5–10%. Weight-loss plans should be supervised by a veterinarian.
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            <div className="rounded-4xl border border-forest/10 bg-white p-6 shadow-soft md:col-span-3">
              <div className="flex items-center gap-3 text-terracotta"><Lightbulb className="h-5 w-5" /><p className="text-xs font-black uppercase tracking-[0.17em]">Breed insight</p></div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-forest">💡 Breed Nutrition &amp; Weight Alert</h3>
              <p className="mt-3 text-sm leading-6 text-ink/75">{selectedBreed.nutritionTip}</p>
              <p className="mt-3 rounded-2xl bg-oat p-3 text-xs font-semibold leading-5 text-ink/65">{selectedBreed.weightAlert}</p>
            </div>
            <div className="flex flex-col justify-between rounded-4xl border border-forest/10 bg-terracotta p-6 text-white shadow-soft md:col-span-2">
              <div>
                <Clipboard className="h-7 w-7" />
                <h3 className="mt-5 font-display text-2xl font-semibold">📋 Copy Feeding Plan</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">Save the numbers for shopping, meal prep, or your next vet visit.</p>
              </div>
              <button type="button" onClick={copyPlan} className="mt-6 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-terracotta transition hover:-translate-y-0.5">
                {copied ? "Plan copied" : "Copy daily plan"}
                {copied ? <Check className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div id="recommended-food" className="rounded-4xl border border-forest/10 bg-cream p-6 shadow-soft md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.17em] text-terracotta"><ShoppingBag className="h-4 w-4" /> Shopping shortlist</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-forest">🥣 Recommended Food for {selectedBreed.name}</h3>
              </div>
              <span className="hidden rounded-full bg-oat px-3 py-1 text-xs font-bold text-ink/55 sm:block">Affiliate-ready</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href={`https://www.amazon.com/s?k=${foodSearch}`} target="_blank" rel="sponsored nofollow noreferrer" className="group flex items-center justify-between rounded-2xl border border-forest/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-terracotta/50">
                <div><p className="text-sm font-extrabold text-forest">Browse on Amazon</p><p className="mt-1 text-xs text-ink/55">Compare complete &amp; balanced formulas</p></div>
                <ExternalLink className="h-5 w-5 text-terracotta transition group-hover:rotate-6" />
              </a>
              <a href={`https://www.chewy.com/s?query=${foodSearch}`} target="_blank" rel="sponsored nofollow noreferrer" className="group flex items-center justify-between rounded-2xl border border-forest/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-terracotta/50">
                <div><p className="text-sm font-extrabold text-forest">Browse on Chewy</p><p className="mt-1 text-xs text-ink/55">Filter by life stage and format</p></div>
                <ExternalLink className="h-5 w-5 text-terracotta transition group-hover:rotate-6" />
              </a>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-ink/45">Retail links are discovery placeholders. Product suitability depends on your pet&apos;s health history; consult your veterinary team for therapeutic diets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

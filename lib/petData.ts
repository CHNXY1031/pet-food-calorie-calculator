export type Species = "dog" | "cat";

export type Breed = {
  name: string;
  slug: string;
  species: Species;
  minWeightKg: number;
  maxWeightKg: number;
  nutritionTip: string;
  weightAlert: string;
};

export type LifeStage =
  | "adult_neutered"
  | "adult_intact"
  | "young"
  | "senior"
  | "weight_loss";

export type ActivityLevel = "low" | "typical" | "active" | "working" | "endurance";

type BreedSeed = readonly [name: string, minKg: number, maxKg: number, concern: string];

const dogSeeds: BreedSeed[] = [
  ["Golden Retriever", 25, 34, "portion control and joint-supportive omega-3 fats"],
  ["Labrador Retriever", 25, 36, "strict portion control because food drive can mask fullness"],
  ["French Bulldog", 8, 14, "lean body condition to reduce pressure on breathing and joints"],
  ["German Shepherd", 22, 40, "digestible protein and measured meals that support hips"],
  ["Poodle", 5, 32, "size-appropriate kibble and consistent lean protein"],
  ["Bulldog", 18, 25, "calorie control to protect breathing, skin folds, and joints"],
  ["Beagle", 9, 14, "measured meals and low-calorie enrichment for a strong appetite"],
  ["Rottweiler", 35, 60, "controlled growth and joint-supportive nutrition"],
  ["Dachshund", 7, 15, "a lean waist to limit stress on the long spine"],
  ["Pembroke Welsh Corgi", 10, 14, "portion control to protect the back and short limbs"],
  ["Australian Shepherd", 16, 32, "energy matched to daily work rather than breed reputation"],
  ["Yorkshire Terrier", 2, 3.5, "small frequent portions and dental-friendly food texture"],
  ["Boxer", 25, 36, "digestible meals divided across the day"],
  ["Cavalier King Charles Spaniel", 5.5, 8, "weight control and heart-conscious sodium moderation"],
  ["Shih Tzu", 4, 7.5, "small-bite food and careful treat accounting"],
  ["Great Dane", 45, 79, "slow growth and multiple smaller meals to reduce bloat risk"],
  ["Miniature Schnauzer", 5, 9, "moderate-fat meals because the breed can be pancreatitis-prone"],
  ["Doberman Pinscher", 27, 45, "lean protein and divided meals for an athletic deep chest"],
  ["Siberian Husky", 16, 27, "efficient metabolism—avoid feeding solely by visual appetite"],
  ["Bernese Mountain Dog", 32, 52, "controlled calories with joint-supportive nutrients"],
  ["Pomeranian", 1.8, 3.5, "tiny measured portions and dental care"],
  ["Boston Terrier", 5.5, 11, "lean condition and easy-to-chew portions"],
  ["Havanese", 3, 6, "consistent portions suited to a small companion dog"],
  ["Cane Corso", 38, 50, "controlled growth with balanced calcium and phosphorus"],
  ["Border Collie", 14, 25, "calories adjusted to actual training and work intensity"],
  ["Chihuahua", 1.5, 3, "small frequent meals that avoid excessive calorie-dense treats"],
  ["Pug", 6, 8, "a lean body condition to protect breathing and joints"],
  ["Belgian Malinois", 18, 36, "high-quality protein with calories matched to real workload"],
  ["Basset Hound", 18, 29, "weight control to protect the back, elbows, and hips"],
  ["Maltese", 2, 4, "small-bite complete food and careful treat portions"],
  ["English Springer Spaniel", 18, 25, "balanced energy for an active sporting frame"],
  ["Akita", 25, 59, "controlled portions and gradual diet transitions"],
  ["Weimaraner", 25, 40, "divided meals for a deep-chested athletic dog"],
  ["Newfoundland", 45, 68, "moderate calories and controlled growth for giant joints"],
  ["German Shorthaired Pointer", 20, 32, "energy-dense food only when activity truly warrants it"],
  ["Shetland Sheepdog", 7, 12, "measured calories under the coat and dental support"],
  ["Vizsla", 20, 27, "digestible protein and calories matched to endurance work"],
  ["West Highland White Terrier", 6.5, 10, "measured food with skin-supportive fatty acids"],
  ["Rhodesian Ridgeback", 29, 41, "lean condition and meals split to reduce bloat risk"],
  ["Shiba Inu", 7, 11, "consistent portions and skin-supportive omega fatty acids"],
  ["Bichon Frise", 5, 8, "portion control and dental-friendly feeding"],
  ["Dalmatian", 20, 32, "adequate water and veterinarian-guided purine awareness"],
  ["Bloodhound", 36, 50, "multiple measured meals for a large deep chest"],
  ["Australian Cattle Dog", 15, 22, "calories scaled to work, with a clearly visible waist"],
  ["Saint Bernard", 54, 82, "slow growth, lean condition, and divided meals"],
  ["Whippet", 11, 18, "lean protein without mistaking the naturally slim outline for underfeeding"],
  ["Scottish Terrier", 8, 10, "measured portions and moderate fat"],
  ["Collie", 23, 34, "steady energy intake and gradual food transitions"],
  ["Italian Greyhound", 3.5, 6.5, "small nutrient-dense meals while maintaining a light frame"],
  ["Samoyed", 16, 30, "portion checks by touch beneath the dense coat"],
  ["Bullmastiff", 45, 59, "controlled calories and joint-supportive nutrition"],
  ["Papillon", 2.5, 4.5, "tiny measured portions with adequate protein"],
  ["Chesapeake Bay Retriever", 25, 36, "calories matched to swimming and field work"],
  ["Airedale Terrier", 18, 29, "consistent lean protein and measured treats"],
  ["Giant Schnauzer", 25, 43, "divided meals and calories matched to working activity"],
  ["Cairn Terrier", 6, 8, "measured meals despite a confident appetite"],
  ["Miniature Pinscher", 3.5, 5, "small portions with calorie-dense treats tightly limited"],
  ["English Cocker Spaniel", 12, 16, "portion control and skin-supportive fatty acids"],
  ["Basenji", 9, 11, "lean maintenance with consistent, digestible meals"],
  ["Mastiff", 54, 104, "slow growth and multiple smaller meals for giant-breed safety"],
  ["Jack Russell Terrier", 5, 8, "energy matched to exercise rather than terrier enthusiasm"],
  ["Lhasa Apso", 5, 8, "small-bite portions and regular body-condition checks"],
  ["Chinese Crested", 3.5, 5.5, "nutrient-dense small meals and skin-supportive fats"],
  ["Alaskan Malamute", 34, 43, "efficient working-dog metabolism and measured portions"],
  ["Soft Coated Wheaten Terrier", 14, 18, "digestible protein with veterinary review for chronic GI signs"],
  ["American Staffordshire Terrier", 18, 32, "lean muscle support and carefully counted treats"],
  ["Chow Chow", 20, 32, "moderate energy and body checks beneath the dense coat"],
  ["Portuguese Water Dog", 16, 27, "energy matched to swimming and daily training"],
  ["Brittany", 14, 20, "high-quality protein with seasonal activity adjustments"],
  ["Old English Sheepdog", 27, 45, "hands-on body checks beneath the coat and joint support"],
  ["Irish Setter", 24, 32, "divided meals and energy matched to field activity"],
  ["Greyhound", 27, 32, "digestible protein while respecting the naturally lean outline"],
  ["Dogue de Bordeaux", 45, 68, "controlled growth, lean condition, and divided meals"],
];

const catSeeds: BreedSeed[] = [
  ["Ragdoll", 4.5, 9, "portion control and coat-supportive omega fatty acids"],
  ["Maine Coon", 4.5, 11, "slow growth, joint support, and a lean waist under the coat"],
  ["British Shorthair", 3.5, 8, "measured portions because the sturdy build can hide excess fat"],
  ["Siamese", 2.5, 5.5, "high-quality protein matched to an active, lean frame"],
  ["Persian", 3, 5.5, "hairball support, hydration, and easy-to-pick-up food shapes"],
  ["Bengal", 3.5, 7, "protein-rich complete food matched to high activity"],
  ["Sphynx", 3, 6, "energy adjusted for heat loss without allowing excess body fat"],
  ["Scottish Fold", 2.5, 6, "strict weight control to reduce stress on joints"],
  ["Russian Blue", 3, 7, "measured portions because appetite may outpace indoor activity"],
  ["American Shorthair", 3, 7, "portion control and daily play to preserve muscle"],
  ["Abyssinian", 2.5, 5, "protein-rich meals matched to frequent movement"],
  ["Birman", 3, 6, "measured food and coat-supportive fatty acids"],
  ["Norwegian Forest Cat", 3.5, 9, "seasonal calorie review and hands-on body checks"],
  ["Exotic Shorthair", 3, 6, "hydration and calorie control for a quieter lifestyle"],
  ["Devon Rex", 2.5, 4.5, "nutrient-dense complete food with careful body monitoring"],
  ["Burmese", 3, 6, "portion control despite a compact, muscular build"],
  ["Siberian", 3.5, 9, "joint support and body checks beneath the triple coat"],
  ["Oriental Shorthair", 2.5, 5.5, "high-quality protein for a naturally slender frame"],
  ["Turkish Angora", 2.5, 5, "hydration and coat-supportive nutrition"],
  ["Bombay", 3, 6, "measured portions to maintain a sleek muscular shape"],
  ["Cornish Rex", 2.5, 4.5, "energy adjusted for activity and heat loss"],
  ["Tonkinese", 2.5, 5.5, "protein-forward food matched to social, active play"],
  ["Savannah", 5, 11, "complete feline nutrition—never substitute unbalanced raw meat"],
  ["Egyptian Mau", 3, 6, "lean protein and calories matched to athletic play"],
  ["Manx", 3.5, 6, "weight control to limit strain on the spine and hindquarters"],
  ["Himalayan", 3, 6, "hydration, hairball support, and measured indoor portions"],
  ["Balinese", 2.5, 5, "high-quality protein and hydration for a lean active cat"],
  ["Chartreux", 3, 7.5, "portion control beneath a dense woolly coat"],
  ["Selkirk Rex", 3, 7, "measured portions and coat-supportive fatty acids"],
  ["Ocicat", 3, 7, "protein-rich complete food matched to active play"],
  ["Singapura", 1.8, 3.5, "small nutrient-dense meals with regular weight checks"],
  ["American Curl", 2.5, 5, "balanced maintenance food and routine body-condition checks"],
  ["Turkish Van", 3, 8, "protein-rich meals with hydration and active play"],
  ["Japanese Bobtail", 2.5, 5, "lean maintenance through measured portions"],
  ["Korat", 2.5, 5, "measured calories for a compact muscular body"],
  ["Ragamuffin", 4, 9, "portion control and hands-on checks beneath the plush coat"],
  ["Domestic Shorthair", 3, 6, "individual body-condition scoring rather than breed assumptions"],
];

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildBreeds(seeds: BreedSeed[], species: Species): Breed[] {
  return seeds.map(([name, minWeightKg, maxWeightKg, concern]) => ({
    name,
    slug: toSlug(name),
    species,
    minWeightKg,
    maxWeightKg,
    nutritionTip: `${name}s generally benefit from ${concern}. Choose a complete and balanced food for the pet's life stage, and count treats within the daily calorie budget.`,
    weightAlert: `A typical adult ${name} is often around ${minWeightKg}–${maxWeightKg} kg (${Math.round(minWeightKg * 2.20462)}–${Math.round(maxWeightKg * 2.20462)} lb), but frame and sex matter. Aim for ribs that are easy to feel with a visible waist, then confirm the target with your veterinarian.`,
  }));
}

export const dogBreeds = buildBreeds(dogSeeds, "dog");
export const catBreeds = buildBreeds(catSeeds, "cat");
export const allBreeds = [...dogBreeds, ...catBreeds];

export const DEFAULT_DRY_DENSITY = 375;
export const DEFAULT_WET_DENSITY = 95;
export const GRAMS_PER_CUP = 120;

export function getBreed(species: Species, slug: string) {
  return (species === "dog" ? dogBreeds : catBreeds).find((breed) => breed.slug === slug);
}

export function getMerFactor(species: Species, stage: LifeStage, activity: ActivityLevel) {
  if (species === "dog") {
    if (stage === "young") return 3.0;
    if (stage === "weight_loss") return 1.0;
    if (stage === "senior") return 1.2;
    if (activity === "low") return 1.4;
    if (activity === "active") return 2.0;
    if (activity === "working") return 2.5;
    if (activity === "endurance") return 3.0;
    return stage === "adult_intact" ? 1.8 : 1.6;
  }

  if (stage === "young") return 2.5;
  if (stage === "weight_loss") return 0.8;
  if (stage === "senior") return 1.1;
  if (activity === "low") return 1.0;
  return stage === "adult_intact" ? 1.4 : 1.2;
}

export function calculateFeedingPlan({
  weightKg,
  species,
  stage,
  activity,
  dryPercent,
  dryDensity = DEFAULT_DRY_DENSITY,
  wetDensity = DEFAULT_WET_DENSITY,
}: {
  weightKg: number;
  species: Species;
  stage: LifeStage;
  activity: ActivityLevel;
  dryPercent: number;
  dryDensity?: number;
  wetDensity?: number;
}) {
  const safeWeight = Math.max(0.1, weightKg);
  const rer = 70 * Math.pow(safeWeight, 0.75);
  const merFactor = getMerFactor(species, stage, activity);
  const calories = rer * merFactor;
  const dryRatio = Math.min(100, Math.max(0, dryPercent)) / 100;
  const wetRatio = 1 - dryRatio;
  const safeDryDensity = Math.max(1, dryDensity);
  const safeWetDensity = Math.max(1, wetDensity);
  const dryGrams = (calories * dryRatio) / (safeDryDensity / 100);
  const wetGrams = (calories * wetRatio) / (safeWetDensity / 100);

  return {
    rer: Math.round(rer),
    merFactor,
    calories: Math.round(calories),
    dryGrams: Math.round(dryGrams),
    wetGrams: Math.round(wetGrams),
    cups: dryGrams / GRAMS_PER_CUP,
  };
}

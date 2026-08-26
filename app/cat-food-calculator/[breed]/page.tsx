import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreedGuide from "@/components/BreedGuide";
import { catBreeds, getBreed } from "@/lib/petData";

type BreedPageProps = { params: { breed: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return catBreeds.map((breed) => ({ breed: breed.slug }));
}

export function generateMetadata({ params }: BreedPageProps): Metadata {
  const breed = getBreed("cat", params.breed);
  if (!breed) return {};
  const title = `How Much Should I Feed a ${breed.name}? (Daily Calorie & Grams Calculator)`;
  const description = `Calculate how much to feed a ${breed.name}: daily calories, dry food grams, wet food grams, and cups based on weight, life stage, and activity.`;
  return {
    title,
    description,
    alternates: { canonical: `/cat-food-calculator/${breed.slug}` },
    openGraph: { title, description, url: `/cat-food-calculator/${breed.slug}` },
  };
}

export default function CatBreedPage({ params }: BreedPageProps) {
  const breed = getBreed("cat", params.breed);
  if (!breed) notFound();
  return <BreedGuide breed={breed} />;
}

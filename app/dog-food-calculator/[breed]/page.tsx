import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreedGuide from "@/components/BreedGuide";
import { dogBreeds, getBreed } from "@/lib/petData";

type BreedPageProps = { params: { breed: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return dogBreeds.map((breed) => ({ breed: breed.slug }));
}

export function generateMetadata({ params }: BreedPageProps): Metadata {
  const breed = getBreed("dog", params.breed);
  if (!breed) return {};
  const title = `How Much Should I Feed a ${breed.name}? (Daily Calorie & Grams Calculator)`;
  const description = `Calculate how much to feed a ${breed.name}: daily calories, dry food grams, wet food grams, and cups based on weight, life stage, and activity.`;
  return {
    title,
    description,
    alternates: { canonical: `/dog-food-calculator/${breed.slug}` },
    openGraph: { title, description, url: `/dog-food-calculator/${breed.slug}` },
  };
}

export default function DogBreedPage({ params }: BreedPageProps) {
  const breed = getBreed("dog", params.breed);
  if (!breed) notFound();
  return <BreedGuide breed={breed} />;
}

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import {
  getClient,
  TPokemonNameList,
  getPokemonNameListQuery,
  getPokemonDetailQuery,
  TPokemonDetailList,
} from "@/lib/graphql-client";
import TypeBadge from "@/components/type-badge";
import { cn, heightToMeterConversion, weightToKgConversion } from "@/lib/utils";

type Props = {
  params: { name: string };
};

export async function generateStaticParams() {
  const { data } = await getClient().query({
    query: getPokemonNameListQuery,
  });

  const { pokemon } = data as TPokemonNameList;

  return pokemon.map(({ name }) => ({ name: name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = params;

  return {
    title: name
      .split("-")
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(" "),
  };
}

export default async function DetailPage({ params }: Props) {
  const { name } = params;

  const { data } = await getClient().query({
    query: getPokemonDetailQuery,
    variables: {
      name,
    },
  });

  const { pokemon } = data as TPokemonDetailList;

  if (!pokemon.length) {
    notFound();
  }

  const detail = pokemon[0];

  return (
    <Container className="flex flex-col gap-6">
      <section className="flex items-center gap-3">
        <span className="text-3xl text-neutral-500">
          #{detail.id.toString().padStart(4, "0")}
        </span>
        <h1 className="text-3xl font-bold">
          {detail.name
            .split("-")
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[40%_1fr]">
        <section className="flex flex-col gap-6">
          <img
            src={
              detail.pokemon_sprites[0].sprites.other["official-artwork"]
                .front_default ??
              detail.pokemon_sprites[0].sprites.front_default ??
              "/assets/fallback.webp"
            }
            alt={detail.name}
            width={480}
            height={480}
            loading="lazy"
            className={cn(
              "aspect-[1] w-full animate-reveal rounded-3xl object-cover",
              "bg-neutral-950/80 shadow backdrop-blur-sm dark:bg-white/80",
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            {detail.pokemon_sprites[0].sprites.other.showdown.front_default && (
              <div
                className={cn(
                  "flex w-full flex-col items-center rounded-3xl p-3",
                  "bg-neutral-950/80 shadow backdrop-blur-sm dark:bg-white/80",
                )}>
                <p className="absolute top-6 left-6 self-start text-neutral-50 dark:text-neutral-900">
                  Front
                </p>
                <img
                  src={
                    detail.pokemon_sprites[0].sprites.other.showdown
                      .front_default ?? "/assets/fallback.webp"
                  }
                  alt={detail.name + " gif"}
                  width={120}
                  height={120}
                  loading="lazy"
                  className="aspect-[1] h-full animate-reveal rounded object-contain"
                />
              </div>
            )}

            {detail.pokemon_sprites[0].sprites.other.showdown.back_default && (
              <div
                className={cn(
                  "flex w-full flex-col items-center rounded-3xl p-3",
                  "bg-neutral-950/80 shadow backdrop-blur-sm dark:bg-white/80",
                )}>
                <p className="absolute top-6 left-6 self-start text-neutral-50 dark:text-neutral-900">
                  Back
                </p>
                <img
                  src={
                    detail.pokemon_sprites[0].sprites.other.showdown
                      .back_default ?? "/assets/fallback.webp"
                  }
                  alt={detail.name + " gif"}
                  width={120}
                  height={120}
                  loading="lazy"
                  className="aspect-[1] h-full animate-reveal rounded object-contain"
                />
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {detail.pokemon_types.map((types, index) => (
              <TypeBadge
                key={index}
                type={types.types.name}
                className="text-base"
              />
            ))}
          </div>

          <p>{detail.pokemon_specy.flavor_text[0].flavor_text}</p>

          <div className="flex gap-6">
            <div className="flex flex-col gap-1 text-center">
              <p>Height</p>
              <p>
                {detail.height
                  ? `${heightToMeterConversion(detail.height)}m`
                  : "no data"}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p>Weight</p>
              <p>
                {detail.weight
                  ? `${weightToKgConversion(detail.weight)}kg`
                  : "no data"}
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="flex flex-col gap-6">
        <p>{JSON.stringify(detail)}</p>
      </section>
    </Container>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { cn, heightToMeterConversion, weightToKgConversion } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import {
  getClient,
  TPokemonNameList,
  getPokemonNameListQuery,
  getPokemonDetailQuery,
  TPokemonDetailList,
  getStatListQuery,
  TStatList,
} from "@/lib/graphql-client";
import TypeBadge from "@/components/type-badge";
import { Stats } from "@/components/pokemon-detail/stats";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  params: { name: string };
};

export const dynamic = "force-dynamic";

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

  const { data: statList } = await getClient().query({
    query: getStatListQuery,
  });

  const { pokemon } = data as TPokemonDetailList;
  const detail = pokemon[0];
  const { stats } = statList as TStatList;

  if (!pokemon.length) {
    notFound();
  }

  return (
    <Container className="flex flex-col gap-6">
      {/* title */}
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

      {/* left side */}
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
              "aspect-[1] w-full animate-reveal rounded-2xl object-cover",
              "bg-neutral-50 shadow dark:bg-neutral-900",
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            {detail.pokemon_sprites[0].sprites.other.showdown.front_default && (
              <div
                className={cn(
                  "relative flex w-full flex-col items-center rounded-2xl p-3",
                  "bg-neutral-50 shadow dark:bg-neutral-900",
                )}>
                <span className="absolute left-4 top-4 z-0 self-start text-neutral-500 hover:z-[1]">
                  Front
                </span>
                <img
                  src={
                    detail.pokemon_sprites[0].sprites.other.showdown
                      .front_default ?? "/assets/fallback.webp"
                  }
                  alt={detail.name + " gif"}
                  width={120}
                  height={120}
                  loading="lazy"
                  className="z-[1] aspect-[1] h-full animate-reveal rounded object-contain"
                />
              </div>
            )}

            {detail.pokemon_sprites[0].sprites.other.showdown.back_default && (
              <div
                className={cn(
                  "relative flex w-full flex-col items-center rounded-2xl p-3",
                  "bg-neutral-50 shadow dark:bg-neutral-900",
                )}>
                <span className="absolute left-4 top-4 z-0 self-start text-neutral-500 hover:z-[1]">
                  Back
                </span>
                <img
                  src={
                    detail.pokemon_sprites[0].sprites.other.showdown
                      .back_default ?? "/assets/fallback.webp"
                  }
                  alt={detail.name + " gif"}
                  width={120}
                  height={120}
                  loading="lazy"
                  className="z-[1] aspect-[1] h-full animate-reveal rounded object-contain"
                />
              </div>
            )}
          </div>
        </section>

        {/* right side */}
        <section className="flex flex-col gap-6">
          {/* type, height, weight */}
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-6">
              <div className="flex aspect-[3/2] w-32 flex-col justify-center gap-1 rounded-2xl bg-neutral-50 p-3 text-center shadow dark:bg-neutral-900">
                <p className="text-neutral-500">Height</p>

                <p className="font-semibold">
                  {detail.height
                    ? `${heightToMeterConversion(detail.height)}m`
                    : "no data"}
                </p>
              </div>

              <div className="flex aspect-[3/2] w-32 flex-col justify-center gap-1 rounded-2xl bg-neutral-50 p-3 text-center shadow dark:bg-neutral-900">
                <p className="text-neutral-500">Weight</p>

                <p className="font-semibold">
                  {detail.weight
                    ? `${weightToKgConversion(detail.weight)}kg`
                    : "no data"}
                </p>
              </div>
            </div>

            <div className="flex min-w-32 flex-col justify-center gap-1 rounded-2xl bg-neutral-50 p-3 text-center shadow dark:bg-neutral-900">
              <p className="text-neutral-500">Type</p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {detail.pokemon_types.map((types, index) => (
                  <TypeBadge
                    key={index}
                    type={types.types.name}
                    className="text-base"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* description */}
          <p>{detail.pokemon_specy.flavor_text[0].flavor_text}</p>

          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Base Stats</h2>
            <Stats columns={stats} data={detail.pokemon_stats} />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Evolution Chain</h2>

            <div className="flex flex-wrap items-center gap-3">
              {detail.pokemon_specy.evolution_chain.species.map(
                (specy, index) => (
                  <Fragment key={index}>
                    <Link
                      href={
                        specy.pokemon[0].name === detail.name
                          ? ""
                          : `/${specy.pokemon[0].name}`
                      }
                      className={cn(
                        "relative flex w-[200px] flex-col items-center gap-1 rounded-2xl p-3 text-center shadow transition-all duration-300 hover:-translate-y-1",
                        specy.pokemon[0].name === detail.name
                          ? "bg-neutral-900 dark:bg-neutral-50"
                          : "bg-neutral-50 dark:bg-neutral-900",
                      )}>
                      <span className="text-neutral-500">
                        {specy.pokemon[0].name}
                      </span>
                      <span className="absolute bottom-3 left-3 text-neutral-500">
                        {index + 1}
                      </span>

                      <img
                        src={
                          specy.pokemon[0].pokemon_sprites[0].sprites ??
                          "/assets/fallback.webp"
                        }
                        alt={specy.pokemon[0].name}
                        width={200}
                        height={200}
                        loading="lazy"
                        className="pointer-events-none w-full flex-1 animate-reveal rounded object-cover"
                      />
                    </Link>
                  </Fragment>
                ),
              )}
            </div>
          </div>
        </section>
      </section>
    </Container>
  );
}

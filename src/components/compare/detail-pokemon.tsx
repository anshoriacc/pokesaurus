import {
  TPokemonDetailList,
  TStatList,
  getClient,
  getStatListQuery,
} from "@/lib/graphql-client";
import { cn, heightToMeterConversion, weightToKgConversion } from "@/lib/utils";
import TypeBadge from "../type-badge";
import { Stats } from "./stats";
import Link from "next/link";

type Props = {
  data: TPokemonDetailList;
  isReversed?: boolean;
};

export const DetailPokemon = async ({ data, isReversed }: Props) => {
  const detail = data.pokemon[0];

  const { data: statList } = await getClient().query({
    query: getStatListQuery,
  });
  const { stats } = statList as TStatList;

  return (
    <section
      className={cn(
        "rounded-2xl bg-neutral-50 shadow dark:bg-neutral-900",
        "[&_>div]:border-b [&_>div]:border-b-neutral-200 [&_>div]:dark:border-b-neutral-800",
      )}>
      {detail && (
        <>
          {/* name */}
          <div className="flex h-[72px] items-center justify-center p-3">
            <Link href={`/${detail.name}`}>
              <h2 className="font-bold">
                {detail.name
                  .split("-")
                  .map(word => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </h2>
            </Link>
          </div>

          {/* form */}
          <div className="flex h-[144px] items-center justify-center p-3">
            <img
              src={
                detail.pokemon_sprites[0].sprites.other.showdown
                  .front_default ??
                detail.pokemon_sprites[0].sprites.other["official-artwork"]
                  .front_default ??
                detail.pokemon_sprites[0].sprites.front_default ??
                "/assets/fallback.webp"
              }
              alt={detail.name}
              loading="lazy"
              className="aspect-[1] h-full animate-reveal object-contain"
            />
          </div>

          {/* type */}
          <div className="flex h-[138px] flex-wrap items-center justify-center gap-3 p-3">
            {detail.pokemon_types.map((types, index) => (
              <TypeBadge
                key={index}
                type={types.types.name}
                className="text-base"
              />
            ))}
          </div>

          {/* height */}
          <div className="flex h-12 items-center justify-center p-3">
            <span>
              {detail.height
                ? `${heightToMeterConversion(detail.height)}m`
                : "N/A"}
            </span>
          </div>

          {/* weight */}
          <div className="flex h-12 items-center justify-center p-3">
            <span>
              {detail.weight
                ? `${weightToKgConversion(detail.weight)}kg`
                : "N/A"}
            </span>
          </div>

          {/* stats */}
          <div className="h-[213px] p-3">
            <Stats
              columns={stats}
              data={detail.pokemon_stats}
              isReversed={isReversed}
            />
          </div>
        </>
      )}
    </section>
  );
};

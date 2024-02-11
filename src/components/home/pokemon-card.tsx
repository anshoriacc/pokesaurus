import Link from "next/link";

import { TPokemon } from "@/lib/graphql-client";
import TypeBadge from "./type-badge";
import { heightToMeterConversion, weightToKgConversion } from "@/lib/utils";

type Props = { pokemon: TPokemon };

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Link
      href={`${pokemon.name ?? pokemon.id ?? ""}`}
      className="relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <img
        src={pokemon.pokemon_sprites[0].sprites ?? "/assets/fallback.webp"}
        alt={pokemon.name}
        width={200}
        height={200}
        loading="lazy"
        className="pointer-events-none z-[1] aspect-[1] w-full animate-reveal rounded object-cover"
      />

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold">{pokemon.name}</h3>

        <p className="text-sm text-neutral-500">
          #{pokemon.id.toString().padStart(4, "0")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {pokemon.pokemon_types.map((types, index) => (
            <TypeBadge key={index} type={types.types.name} />
          ))}
        </div>
      </div>

      <div className="absolute left-4 top-4 z-0 flex flex-col text-xs hover:z-[1]">
        <p>height</p>
        <p>
          {pokemon.height
            ? `${heightToMeterConversion(pokemon.height)}m`
            : "no data"}
        </p>
      </div>

      <div className="absolute right-4 top-4 z-0 flex flex-col text-right text-xs hover:z-[1]">
        <p>weight</p>
        {pokemon.weight
          ? `${weightToKgConversion(pokemon.weight)}kg`
          : "no data"}
      </div>
    </Link>
  );
};

export default PokemonCard;

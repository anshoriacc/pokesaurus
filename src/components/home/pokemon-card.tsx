import Link from "next/link";

import { TPokemonBase } from "@/lib/graphql-client";
import TypeBadge from "../type-badge";
import { heightToMeterConversion, weightToKgConversion } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = { pokemon: TPokemonBase };

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`${pokemon.name}`}
            className="relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-[20px] bg-neutral-50 p-4 shadow transition-all duration-300 hover:-translate-y-1 dark:bg-neutral-900">
            <img
              src={
                pokemon.pokemon_sprites[0].sprites ?? "/assets/fallback.webp"
              }
              alt={pokemon.name}
              width={200}
              height={200}
              loading="lazy"
              className="pointer-events-none z-[1] aspect-[1] w-full animate-reveal rounded object-cover"
            />

            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-semibold">
                {pokemon.name
                  .split("-")
                  .map(word => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </h3>

              <p className="text-sm text-neutral-500">
                #{pokemon.id.toString().padStart(4, "0")}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {pokemon.pokemon_types.map((types, index) => (
                  <TypeBadge key={index} type={types.types.name} />
                ))}
              </div>
            </div>

            <div className="absolute left-4 top-4 z-0 flex flex-col text-xs text-neutral-500 hover:text-inherit hover:z-[1]">
              <p>height</p>
              <p>
                {pokemon.height
                  ? `${heightToMeterConversion(pokemon.height)}m`
                  : "no data"}
              </p>
            </div>

            <div className="absolute right-4 top-4 z-0 flex flex-col text-right text-xs text-neutral-500 hover:text-inherit hover:z-[1]">
              <p>weight</p>
              <p>
                {pokemon.weight
                  ? `${weightToKgConversion(pokemon.weight)}kg`
                  : "no data"}
              </p>
            </div>
          </Link>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p>Go to {pokemon.name}&apos;s detail</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PokemonCard;

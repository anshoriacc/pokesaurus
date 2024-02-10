import Image from "next/image";

import { TPokemon } from "@/lib/graphql-client";
import Link from "next/link";
import TypeBadge from "./type-badge";

type Props = { pokemon: TPokemon };

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Link
      href={`pokemon/${pokemon.id}`}
      className="flex w-[200px] flex-col items-center gap-2 overflow-hidden rounded-xl p-4 transition-all hover:-translate-y-1 hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <Image
        src={pokemon.pokemon_sprites[0].sprites ?? "/assets/fallback.webp"}
        alt={pokemon.name}
        width={168}
        height={168}
        placeholder="blur"
        blurDataURL="/assets/fallback.webp"
        className="aspect-[1] w-[168px] object-cover"
      />

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">{pokemon.name}</h3>

        <p className="text-neutral-500">
          #{pokemon.id.toString().padStart(4, "0")}
        </p>

        <div className="flex flex-wrap gap-1">
          {pokemon.pokemon_types.map((types, index) => (
            <TypeBadge key={index} type={types.types.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

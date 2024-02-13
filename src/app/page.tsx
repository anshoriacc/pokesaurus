import Image from "next/image";

import { Container } from "@/components/layout/container";
import {
  TPokemonList,
  getClient,
  getPokemonListQuery,
} from "@/lib/graphql-client";
import PokemonCard from "../components/home/pokemon-card";
import { PokemonPagination } from "@/components/home/pokemon-pagination";
import pokeball from "@/assets/pokeball.svg";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const { limit = 20, page = 1, search = "" } = searchParams;

  const { data } = await getClient().query({
    query: getPokemonListQuery,
    variables: {
      limit: isNaN(Number(limit)) ? 20 : Number(limit),
      offset: isNaN(Number(page))
        ? 0
        : (Number(page) - 1) * (isNaN(Number(limit)) ? 20 : Number(limit)),
      name: search,
    },
  });

  const { pokemon, pokemon_aggregate } = data as TPokemonList;
  const { count } = pokemon_aggregate.aggregate;

  return (
    <Container className="flex flex-col gap-6">
      {pokemon.length > 0 ? (
        <>
          <section className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 lg:grid-cols-4 [@media(min-width:1200px)]:grid-cols-5">
            {pokemon.map((item, index) => (
              <PokemonCard key={index} pokemon={item} />
            ))}
          </section>

          <PokemonPagination totalData={count} />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-neutral-500">
          <Image
            src={pokeball}
            alt="logo"
            priority
            draggable={false}
            className="h-40 w-40 animate-[spin_10s_linear_infinite] opacity-50 grayscale"
          />

          <p>
            No pokemon found with the name{" "}
            <span className="font-bold">{search}</span>
          </p>
        </div>
      )}
    </Container>
  );
}

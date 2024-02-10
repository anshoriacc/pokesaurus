import { Container } from "@/components/layout/container";
import {
  TPokemonList,
  getClient,
  getPokemonListQuery,
} from "@/lib/graphql-client";
import PokemonCard from "./card";

export default async function Home() {
  const { data } = await getClient().query({ query: getPokemonListQuery });

  const { pokemon } = data as TPokemonList;

  return (
    <Container>
      <section className="grid grid-cols-2 justify-center gap-3 sm:grid-cols-3 lg:grid-cols-4 [@media(min-width:1200px)]:grid-cols-5">
        {pokemon.map((item, index) => (
          <PokemonCard key={index} pokemon={item} />
        ))}
      </section>
    </Container>
  );
}

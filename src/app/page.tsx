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
      <section className="flex flex-wrap justify-center gap-3">
        {pokemon.map((item, index) => (
          <PokemonCard key={index} pokemon={item} />
        ))}
      </section>
    </Container>
  );
}

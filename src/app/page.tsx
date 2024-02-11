import { Container } from "@/components/layout/container";
import {
  TPokemonList,
  getClient,
  getPokemonListQuery,
} from "@/lib/graphql-client";
import PokemonCard from "../components/home/pokemon-card";

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

  const { pokemon } = data as TPokemonList;

  return (
    <Container>
      <section className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 lg:grid-cols-4 [@media(min-width:1200px)]:grid-cols-5">
        {pokemon.map((item, index) => (
          <PokemonCard key={index} pokemon={item} />
        ))}
      </section>
    </Container>
  );
}

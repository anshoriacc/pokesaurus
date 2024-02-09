import { Container } from "@/components/layout/container";
import { getClient } from "@/lib/graphql-client";
import { gql } from "@apollo/client";

const query = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-iii" } } }
      order_by: { id: asc }
    ) {
      name
      id
    }
    generations: pokemon_v2_generation {
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({ query });

  return <Container>{JSON.stringify(data)}</Container>;
}

import { Container } from "@/components/layout/container";
import { getClient } from "@/lib/graphql-client";
import { gql } from "@apollo/client";

const query = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies {
      name
      id
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({ query });

  return <Container>{JSON.stringify(data)}</Container>;
}

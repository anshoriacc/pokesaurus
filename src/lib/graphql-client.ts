import { HttpLink, gql } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: process.env.HOST_URL,
    }),
  });
});

export const getPokemonListQuery = gql`
  query pokemonListQuery {
    pokemon: pokemon_v2_pokemon(limit: 50) {
      id
      name
      height
      weight
      pokemon_sprites: pokemon_v2_pokemonsprites {
        sprites(path: "other.home.front_default")
      }
      pokemon_types: pokemon_v2_pokemontypes {
        types: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export type TPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_sprites: {
    sprites: string;
  }[];
  pokemon_types: {
    types: { name: string };
  }[];
};

export type TPokemonList = {
  pokemon: TPokemon[];
};
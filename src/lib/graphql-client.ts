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
  query pokemonListQuery($limit: Int, $offset: Int, $name: String) {
    pokemon: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _iregex: $name } }
    ) {
      id
      name
      height
      weight
      pokemon_sprites: pokemon_v2_pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemon_types: pokemon_v2_pokemontypes {
        types: pokemon_v2_type {
          name
        }
      }
    }
    pokemon_aggregate: pokemon_v2_pokemon_aggregate(
      where: { name: { _iregex: $name } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const getPokemonDetailQuery = gql`
  query pokemonDetailQuery($name: String) {
    pokemon: pokemon_v2_pokemon(where: { _or: { name: { _ilike: $name } } }) {
      id
      name
      height
      weight
      pokemon_sprites: pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_types: pokemon_v2_pokemontypes {
        types: pokemon_v2_type {
          name
        }
      }
      pokemon_stats: pokemon_v2_pokemonstats {
        base_stat
        stat_id
      }
      pokemon_specy: pokemon_v2_pokemonspecy {
        name
        evolution_chain: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            pokemon: pokemon_v2_pokemons(limit: 1) {
              name
              id
              pokemon_sprites: pokemon_v2_pokemonsprites {
                sprites(path: "other.official-artwork.front_default")
              }
            }
          }
        }
        flavor_text: pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
          limit: 1
        ) {
          flavor_text
        }
      }
    }
  }
`;

export const getPokemonNameListQuery = gql`
  query pokemonNameListQuery {
    pokemon: pokemon_v2_pokemon {
      id
      name
    }
  }
`;

export const getStatListQuery = gql`
  query statListQuery {
    stats: pokemon_v2_stat {
      name
      id
    }
  }
`;

export type TPokemonBase = {
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

export type TPokemonDetail = TPokemonBase & {
  pokemon_sprites: {
    sprites: {
      other: {
        home: {
          front_shiny: string | null;
          front_female: string | null;
          front_default: string | null;
          front_shiny_female: string | null;
        };
        showdown: {
          back_shiny: string | null;
          back_female: string | null;
          front_shiny: string | null;
          back_default: string | null;
          front_female: string | null;
          front_default: string | null;
          back_shiny_female: string | null;
          front_shiny_female: string | null;
        };
        dream_world: {
          front_female: string | null;
          front_default: string | null;
        };
        "official-artwork": {
          front_shiny: string | null;
          front_default: string | null;
        };
      };
      versions: any;
      back_shiny: string | null;
      back_female: string | null;
      front_shiny: string | null;
      back_default: string | null;
      front_female: string | null;
      front_default: string | null;
      back_shiny_female: string | null;
      front_shiny_female: string | null;
    };
  }[];
  pokemon_stats: {
    base_stat: number;
    stat_id: number;
  }[];
  pokemon_specy: {
    name: string;
    evolution_chain: {
      species: {
        pokemon: {
          name: string;
          id: number;
          pokemon_sprites: {
            sprites: string;
          }[];
        }[];
      }[];
    };
    flavor_text: [
      {
        flavor_text: string;
      },
    ];
  };
};

export type TPokemonNameList = {
  pokemon: { id: number; name: string }[];
};

export type TPokemonList = {
  pokemon: TPokemonBase[];
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export type TPokemonDetailList = {
  pokemon: TPokemonDetail[];
};

export type TStat = {
  name: string;
  id: number;
};

export type TStatList = { stats: TStat[] };

import { DetailPokemon } from "@/components/compare/detail-pokemon";
import { SelectPokemon } from "@/components/compare/select-pokemon";
import { Container } from "@/components/layout/container";
import {
  TPokemonDetailList,
  TPokemonNameList,
  TStatList,
  getClient,
  getPokemonDetailQuery,
  getPokemonNameListQuery,
  getStatListQuery,
} from "@/lib/graphql-client";
import { cn } from "@/lib/utils";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ComparePage({ searchParams }: Props) {
  const { pokemon1 = "", pokemon2 = "" } = searchParams;

  const { data: dataPokemon1 } = await getClient().query({
    query: getPokemonDetailQuery,
    variables: {
      name: pokemon1,
    },
  });

  const { data: dataPokemon2 } = await getClient().query({
    query: getPokemonDetailQuery,
    variables: {
      name: pokemon2,
    },
  });

  const { data: statList } = await getClient().query({
    query: getStatListQuery,
  });

  const { stats } = statList as TStatList;

  const { data } = await getClient().query({
    query: getPokemonNameListQuery,
  });

  const { pokemon } = data as TPokemonNameList;

  return (
    <Container className="flex flex-col gap-6">
      <h1 className="text-center text-3xl font-bold">Compare</h1>

      {/* select */}
      <section className="grid grid-cols-2 gap-6">
        <SelectPokemon key="pokemon1" pokemonList={pokemon} params="pokemon1" />

        <SelectPokemon key="pokemon2" pokemonList={pokemon} params="pokemon2" />
      </section>

      {/* comparison */}
      <section className="grid flex-1 grid-cols-[1fr_auto_1fr]">
        {/* pokemon1 */}
        <DetailPokemon data={dataPokemon1 as TPokemonDetailList} />

        {/* divider */}
        <section
          className={cn(
            "flex flex-col text-sm text-neutral-500",
            "[&_>div]:border-b [&_>div]:border-b-neutral-200 [&_>div]:dark:border-b-neutral-800",
          )}>
          {/* name */}
          <div className="flex h-[72px] items-center justify-center p-3">
            <label>Name</label>
          </div>

          {/* form */}
          <div className="flex h-[144px] items-center justify-center p-3">
            <label>Form</label>
          </div>

          {/* type */}
          <div className="flex h-[138px] items-center justify-center p-3">
            <label>Type</label>
          </div>

          {/* height */}
          <div className="flex h-12 items-center justify-center p-3">
            <label>Height</label>
          </div>

          {/* weight */}
          <div className="flex h-12 items-center justify-center p-3">
            <label>Weight</label>
          </div>

          {/* stats */}
          <div className="flex h-[213px] flex-col items-center justify-center gap-3 p-3">
            <label>Stats</label>

            <div className="flex flex-col items-center gap-1 text-center text-xs">
              {stats.map(stat => (
                <label key={stat.id} className="line-clamp-1">
                  {stat.name}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* pokemon2 */}
        <DetailPokemon data={dataPokemon2 as TPokemonDetailList} isReversed />
      </section>
    </Container>
  );
}

"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { ResponsiveCombobox } from "./responsive-combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TPokemonNameList } from "@/lib/graphql-client";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  pokemonList: TPokemonNameList["pokemon"];
  params: string;
};
export const SelectPokemon = ({ pokemonList, params }: Props) => {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(
    searchParams.get(params) || null,
  );

  return (
    <ResponsiveCombobox
      open={open}
      setOpen={setOpen}
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon}>
      <PokemonList
        setOpen={setOpen}
        setSelectedPokemon={setSelectedPokemon}
        pokemonList={pokemonList}
        params={params}
      />
    </ResponsiveCombobox>
  );
};

type PokemonListProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPokemon: Dispatch<SetStateAction<string | null>>;
  pokemonList: TPokemonNameList["pokemon"];
  params: string;
};

const PokemonList = ({
  setOpen,
  setSelectedPokemon,
  pokemonList,
  params,
}: PokemonListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Command>
      <CommandInput placeholder="Select pokemon" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {pokemonList.map(status => (
            <CommandItem
              key={status.name}
              value={status.name}
              onSelect={value => {
                const sParams = new URLSearchParams(searchParams.toString());
                sParams.set(params, value);
                router.push(`/compare?${sParams.toString()}`);

                setSelectedPokemon(
                  pokemonList.find(pokemon => pokemon.name === value)?.name ||
                    null,
                );
                setOpen(false);
              }}>
              {status.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

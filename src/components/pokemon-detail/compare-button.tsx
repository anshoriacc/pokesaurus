"use client";

import Link from "next/link";

import { Button } from "../ui/button";

type Props = { pokemonName: string };

export const CompareButton = ({ pokemonName }: Props) => {
  return (
    <Link href={`/compare?pokemon1=${pokemonName}`} className="w-full">
      <Button size="lg" className="w-full">
        Compare
      </Button>
    </Link>
  );
};

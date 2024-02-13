
# Pokésaurus 

[![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fpokesaurus.vercel.app%2F)](https://pokesaurus.vercel.app)

A Pokémon directory built on top of [PokéAPI](https://pokeapi.co/). Using nextjs' App router, graphql, and shadcn-ui.

## Features
- Search pokémon list (`/`)
- Detail pokémon (`/:name`)
- Compare 2 pokémon (`/compare`)

## Try it locally

1. First, clone this repository:
```
git clone https://github.com/anshoriacc/pokesaurus.git
```

2. Go to pokesaurus folder (if you haven't change it):
```
cd pokesaurus
```

3. Rename file `.env.example` to `.env`

4. If you use pnpm as default, just run:
```
pnpm install
```

5. If you use another package manager, remove `pnpm-lock.yaml` first and run:
```
npm run dev
# or
yarn dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
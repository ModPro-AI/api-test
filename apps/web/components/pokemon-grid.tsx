import type { PokemonSummary } from "../lib/api";
import { PokemonCard } from "./pokemon-card";

export function PokemonGrid({ pokemon }: { pokemon: PokemonSummary[] }) {
  if (pokemon.length === 0) {
    return <p className="text-center text-neutral-400">No Pokémon on this page.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p) => (
        <li key={p.id}>
          <PokemonCard {...p} />
        </li>
      ))}
    </ul>
  );
}

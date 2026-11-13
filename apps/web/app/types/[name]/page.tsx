import { ApiError } from "../../../components/api-error";
import { BackLink } from "../../../components/back-link";
import { PokemonGrid } from "../../../components/pokemon-grid";
import { apiFetch, isPokemonType } from "../../../lib/api";
import { formatName } from "../../../lib/format";

export default async function TypePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const result = await apiFetch(`/types/${encodeURIComponent(name)}`, isPokemonType);

  if (!result.ok) return <ApiError {...result} />;

  return (
    <div className="space-y-8">
      <BackLink />
      <h1 className="text-3xl font-bold">
        {formatName(result.data.name)} type{" "}
        <span className="text-neutral-500">· {result.data.pokemon.length} Pokémon</span>
      </h1>
      <PokemonGrid pokemon={result.data.pokemon} />
    </div>
  );
}

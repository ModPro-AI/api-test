import Image from "next/image";
import { notFound } from "next/navigation";
import { ApiError } from "../../../components/api-error";
import { BackLink } from "../../../components/back-link";
import { StatBar } from "../../../components/stat-bar";
import { TypeBadge } from "../../../components/type-badge";
import { apiFetch, isPokemon } from "../../../lib/api";
import { formatId, formatName } from "../../../lib/format";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await apiFetch(`/pokemon/${encodeURIComponent(id)}`, isPokemon);

  if (!result.ok) {
    if (result.status === 404) notFound();
    return <ApiError {...result} />;
  }

  const pokemon = result.data;

  return (
    <div className="space-y-8">
      <BackLink />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square rounded-3xl bg-neutral-900">
          {pokemon.image && (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-8"
            />
          )}
        </div>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-neutral-500">{formatId(pokemon.id)}</p>
            <h1 className="text-4xl font-bold">{formatName(pokemon.name)}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-neutral-400">Height</dt>
              <dd className="text-lg">{pokemon.height / 10} m</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Weight</dt>
              <dd className="text-lg">{pokemon.weight / 10} kg</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-neutral-400">Abilities</dt>
              <dd className="text-lg">{pokemon.abilities.map(formatName).join(", ")}</dd>
            </div>
          </dl>
          <section className="space-y-2">
            <h2 className="font-semibold">Base stats</h2>
            {pokemon.stats.map((stat) => (
              <StatBar key={stat.name} {...stat} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { PokemonSummary } from "../lib/api";
import { formatId, formatName } from "../lib/format";

export function PokemonCard({ id, name, image }: PokemonSummary) {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="group flex flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition hover:-translate-y-1 hover:border-neutral-600"
    >
      <div className="relative aspect-square w-full">
        {image ? (
          <Image src={image} alt={name} fill sizes="200px" className="object-contain" />
        ) : (
          <span className="flex h-full items-center justify-center text-4xl text-neutral-700">?</span>
        )}
      </div>
      <p className="mt-3 font-mono text-xs text-neutral-500">{formatId(id)}</p>
      <p className="font-semibold group-hover:text-white">{formatName(name)}</p>
    </Link>
  );
}

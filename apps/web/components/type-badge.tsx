import Link from "next/link";
import { formatName } from "../lib/format";

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export function TypeBadge({ type }: { type: string }) {
  return (
    <Link
      href={`/types/${type}`}
      className="rounded-full px-3 py-1 text-sm font-semibold text-neutral-950 hover:opacity-80"
      style={{ backgroundColor: TYPE_COLORS[type] ?? "#a3a3a3" }}
    >
      {formatName(type)}
    </Link>
  );
}

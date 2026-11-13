import type { PokemonStat } from "../lib/api";
import { formatName } from "../lib/format";

const MAX_BASE_STAT = 255;

export function StatBar({ name, value }: PokemonStat) {
  const width = `${Math.min(100, (value / MAX_BASE_STAT) * 100)}%`;

  return (
    <div className="grid grid-cols-[8rem_3rem_1fr] items-center gap-3 text-sm">
      <span className="text-neutral-400">{name === "hp" ? "HP" : formatName(name)}</span>
      <span className="text-right font-mono">{value}</span>
      <div className="h-2 rounded-full bg-neutral-800">
        <div className="h-2 rounded-full bg-emerald-400" style={{ width }} />
      </div>
    </div>
  );
}

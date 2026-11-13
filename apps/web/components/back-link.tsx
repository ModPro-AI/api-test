import Link from "next/link";

export function BackLink() {
  return (
    <Link href="/" className="text-sm text-neutral-400 hover:text-white">
      ← All Pokémon
    </Link>
  );
}

import Link from "next/link";

const linkClass =
  "rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:border-neutral-400";
const disabledClass = `${linkClass} pointer-events-none opacity-40`;

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Pagination">
      <Link
        href={`/?page=${page - 1}`}
        className={hasPrev ? linkClass : disabledClass}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
      >
        ← Prev
      </Link>
      <span className="text-sm text-neutral-400">
        Page {page} of {totalPages}
      </span>
      <Link
        href={`/?page=${page + 1}`}
        className={hasNext ? linkClass : disabledClass}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
      >
        Next →
      </Link>
    </nav>
  );
}

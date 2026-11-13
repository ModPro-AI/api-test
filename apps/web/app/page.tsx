import { ApiError } from "../components/api-error";
import { Pagination } from "../components/pagination";
import { PokemonGrid } from "../components/pokemon-grid";
import { apiFetch, isPokemonList } from "../lib/api";

const PAGE_SIZE = 20;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const result = await apiFetch(
    `/pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
    isPokemonList,
  );

  if (!result.ok) return <ApiError {...result} />;

  const totalPages = Math.max(1, Math.ceil(result.data.count / PAGE_SIZE));

  return (
    <>
      <PokemonGrid pokemon={result.data.results} />
      <Pagination page={page} totalPages={totalPages} />
    </>
  );
}

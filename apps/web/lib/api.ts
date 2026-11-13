/**
 * Client for the NestJS API in apps/api. The types below are the API contract
 * documented in the root README — the API must return exactly these shapes.
 */
export const API_URL = process.env.API_URL ?? "http://localhost:3001";

export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

export interface PokemonList {
  count: number;
  limit: number;
  offset: number;
  results: PokemonSummary[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  /** Decimetres, as returned by PokeAPI. */
  height: number;
  /** Hectograms, as returned by PokeAPI. */
  weight: number;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
}

export interface PokemonType {
  name: string;
  pokemon: PokemonSummary[];
}

export interface ApiFailure {
  ok: false;
  status: number;
  message: string;
  endpoint: string;
}

export type ApiResult<T> = { ok: true; data: T } | ApiFailure;

type Guard<T> = (body: unknown) => body is T;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSummary = (value: unknown): value is PokemonSummary =>
  isObject(value) &&
  typeof value.id === "number" &&
  typeof value.name === "string" &&
  typeof value.image === "string";

export const isPokemonList: Guard<PokemonList> = (body): body is PokemonList =>
  isObject(body) &&
  typeof body.count === "number" &&
  Array.isArray(body.results) &&
  body.results.every(isSummary);

export const isPokemon: Guard<Pokemon> = (body): body is Pokemon =>
  isObject(body) &&
  typeof body.id === "number" &&
  typeof body.name === "string" &&
  typeof body.height === "number" &&
  typeof body.weight === "number" &&
  Array.isArray(body.types) &&
  Array.isArray(body.abilities) &&
  Array.isArray(body.stats);

export const isPokemonType: Guard<PokemonType> = (body): body is PokemonType =>
  isObject(body) &&
  typeof body.name === "string" &&
  Array.isArray(body.pokemon) &&
  body.pokemon.every(isSummary);

const errorMessage = (body: unknown): string | undefined => {
  if (!isObject(body)) return undefined;
  const { message } = body;
  if (Array.isArray(message)) return message.join(", ");
  return typeof message === "string" ? message : undefined;
};

/** GETs an API endpoint and checks the body against the contract. */
export async function apiFetch<T>(
  endpoint: string,
  isValid: Guard<T>,
): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${endpoint}`, { cache: "no-store" });
  } catch {
    return {
      ok: false,
      status: 0,
      message: `Could not reach the API at ${API_URL}. Is apps/api running?`,
      endpoint,
    };
  }

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: errorMessage(body) ?? res.statusText,
      endpoint,
    };
  }

  if (!isValid(body)) {
    return {
      ok: false,
      status: res.status,
      message:
        "The API responded, but the body doesn't match the API contract in the README.",
      endpoint,
    };
  }

  return { ok: true, data: body };
}

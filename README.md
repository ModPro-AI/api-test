# ModPro API Technical Evaluation

Welcome! You have **60 minutes** to build a small, well-structured **NestJS 12** API on top of the free [PokeAPI](https://pokeapi.co/). **No AI tools are allowed.**

A Next.js frontend is already built. It is a working Pokédex, but it can't show anything until your API returns data. Use it to check your work: when your endpoints match the contract below, the pages fill in.

## Getting Started

Prerequisites: **Node.js 24+** and **pnpm** (Corepack or `npm i -g pnpm`).

```bash
pnpm install
pnpm dev        # runs both apps through Turborepo
```

| App | URL | What it is |
|-----|-----|------------|
| `apps/api` | http://localhost:3001 | NestJS 12 API. **This is where you work.** |
| `apps/web` | http://localhost:3000 | Next.js frontend. Finished, so you don't need to change it. |

Open http://localhost:3000. At first you'll see a **"Not implemented yet"** error, which means everything is running correctly.

## Project Structure

```
├── apps/
│   ├── api/        # NestJS 12 (ESM, Vitest, oxlint)
│   └── web/        # Next.js 16 App Router + Tailwind 4
└── packages/
    ├── eslint-config/
    ├── tailwind-config/
    └── typescript-config/
```

Start in `apps/api/src/pokemon/`. The module, controller and service already exist, and the service methods throw `NotImplementedException`.

---

## API Contract

The frontend relies on these exact response shapes.

### `GET /pokemon?limit=20&offset=0`

| Query | Rules |
|-------|-------|
| `limit` | integer from 1 to 100, default `20` |
| `offset` | integer ≥ 0, default `0` |

Invalid query values must return **400**.

```jsonc
{
  "count": 1351,
  "limit": 20,
  "offset": 0,
  "results": [
    { "id": 1, "name": "bulbasaur", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" }
  ]
}
```

> **Hint:** PokeAPI's list endpoint returns only `{ name, url }`. You can get the `id` from the end of the `url`, and the image follows this pattern:
> `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

### `GET /pokemon/:idOrName`

Accepts an id (`25`) or a name (`pikachu`). Names are case-insensitive (`Pikachu` works too). An unknown Pokémon must return **404**.

```jsonc
{
  "id": 25,
  "name": "pikachu",
  "image": "https://raw.githubusercontent.com/.../official-artwork/25.png",
  "height": 4,                 // decimetres, as PokeAPI returns it
  "weight": 60,                // hectograms, as PokeAPI returns it
  "types": ["electric"],
  "abilities": ["static", "lightning-rod"],
  "stats": [{ "name": "hp", "value": 35 }, { "name": "attack", "value": 55 }]
}
```

### Errors

- Return Nest's standard error body (`{ statusCode, message, error }`).
- If PokeAPI is down or returns an unexpected error, respond **502 Bad Gateway**. Don't leak a raw 500 or stack trace.

---

## Part 1: Core API (≈35 minutes)

### Task 1: List Pokémon
Implement `GET /pokemon` so it matches the contract above, including validation of `limit` and `offset`.

### Task 2: Pokémon Details
Implement `GET /pokemon/:idOrName`. Map PokeAPI's response to the contract shape. Don't pass the raw PokeAPI payload through.

### Task 3: Structure & Robustness
- Read the PokeAPI base URL from configuration. See `apps/api/.env.example`.
- Put the PokeAPI HTTP calls behind an injectable provider, not inline in the controller.
- Handle errors as described in [Errors](#errors).
- Add TypeScript types for both the PokeAPI responses and your API's responses.

Install whatever packages you need with `pnpm --filter api add <pkg>`.

## Part 2: Bonus (remaining time)

Pick one or more:

- **Types module:** add `GET /types/:name` that returns `{ "name": "fire", "pokemon": [{ "id", "name", "image" }] }` (404 for an unknown type). Build it as a **new module** that reuses your PokeAPI provider. Then click a type badge on a Pokémon's page in the frontend.
- **Caching:** PokeAPI's [fair-use policy](https://pokeapi.co/docs/v2#fairuse) asks clients to cache responses.
- **Tests:** unit-test your service with the PokeAPI client mocked (Vitest is already set up: `pnpm --filter api test`).
- **API docs:** add Swagger / OpenAPI.

---

## Useful Commands

```bash
pnpm dev            # api + web
pnpm build          # build everything
pnpm lint           # lint everything
pnpm check-types    # type-check everything
pnpm test           # run unit tests

curl "http://localhost:3001/pokemon?limit=5&offset=0"
curl http://localhost:3001/pokemon/pikachu
curl http://localhost:3001/pokemon/99999          # should be 404
curl "http://localhost:3001/pokemon?limit=abc"    # should be 400
```

## Evaluation Criteria

1. **Functionality:** the endpoints match the contract, and the frontend works.
2. **NestJS knowledge:** modules, providers, dependency injection, pipes, exceptions and configuration are used the way Nest intends.
3. **Error handling:** 400 / 404 / 502 are each returned in the right situation.
4. **Structure & code quality:** clear responsibilities, readable and consistent code.
5. **Type safety:** typed upstream and response shapes, and as little `any` as possible.

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [Turborepo Documentation](https://turborepo.dev/docs)

Good luck! 🚀

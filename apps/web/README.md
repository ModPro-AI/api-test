# web

The Next.js 16 frontend: a Pokédex that gets **all** of its data from the NestJS API in `apps/api`. It's already built, so **you don't need to change it**. Use it to check that your API matches the contract in the [root README](../../README.md).

## Run

```bash
pnpm dev     # → http://localhost:3000
```

It calls the API at `API_URL`, which defaults to `http://localhost:3001`. To use a different URL, copy `.env.example` to `.env` and set it there.

## Pages

| Route | Calls | Shows |
|-------|-------|-------|
| `/?page=N` | `GET /pokemon?limit=20&offset=…` | Grid of Pokémon with pagination |
| `/pokemon/[id]` | `GET /pokemon/:idOrName` | Detail page: types, stats, abilities. An API 404 shows the Not found page |
| `/types/[name]` | `GET /types/:name` | Bonus: every Pokémon of one type |

## Reading the error card

If the API fails or returns the wrong shape, the page shows an error card with the endpoint, the HTTP status and the API's `message`:

- **Not implemented yet (501):** the endpoint still throws `NotImplementedException`.
- **API unreachable:** the API isn't running on `API_URL`.
- **"The body doesn't match the API contract":** the endpoint responded, but the JSON shape is wrong. Compare it with the contract.

All data is fetched in Server Components with `cache: 'no-store'`, so API changes show up on refresh and CORS doesn't apply.

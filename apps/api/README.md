# api

The NestJS 12 API for the evaluation. **This is where you'll be working.** The tasks and the API contract are in the [root README](../../README.md).

## Run

```bash
cp .env.example .env    # optional: PORT and POKEAPI_BASE_URL
pnpm dev                # nest start --watch → http://localhost:3001
```

You can run it on its own from this folder, or together with the frontend using `pnpm dev` at the repo root.

## Where to start

```
src/
├── app.module.ts            # root module (PokemonModule is already imported)
├── main.ts                  # bootstrap, port 3001
└── pokemon/
    ├── pokemon.module.ts
    ├── pokemon.controller.ts  # GET /pokemon, GET /pokemon/:idOrName
    └── pokemon.service.ts     # throws NotImplementedException: implement me
```

## Notes

- **ESM project:** relative imports end in `.js` (for example `import { X } from './x.js'`).
- **Tests run on Vitest:** use `vi.fn()`, not `jest.fn()`. Specs go next to the code as `*.spec.ts`.
- **Linting is oxlint.**
- **Adding packages:** `pnpm --filter api add <pkg>` from the repo root, or `pnpm add <pkg>` from this folder.

## Scripts

| Script | What it does |
|--------|--------------|
| `pnpm dev` | Start in watch mode |
| `pnpm build` | Compile to `dist/` |
| `pnpm start:prod` | Run the compiled build |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | e2e tests in `test/` |
| `pnpm lint` | oxlint |
| `pnpm check-types` | `tsc --noEmit` |

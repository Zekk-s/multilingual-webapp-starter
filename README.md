# multilingual-webapp-starter

A Next.js 14 + `next-intl` reference for shipping locale-aware web apps with SEO-ready metadata, deterministic locale coverage in CI, and a strict type-safe layout. Use it as a starting point for any product that needs more than one language at launch.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router | Server Components, typed metadata, file-based routing |
| i18n | next-intl 3 | Async-server-config, ICU-friendly, TypeScript-first |
| Locales | en / no / tr (canonical) | Add more in `src/i18n.ts` + `src/messages/<locale>/common.json` |
| Routing | Always-prefixed (`/en/...`, `/no/...`) | Better SEO + cache key clarity |
| Tooling | TypeScript strict, ESLint, Vitest | Type-safe defaults, fast unit loop |

## Quick start

```bash
pnpm install        # or npm install / yarn
pnpm dev            # http://localhost:5175
pnpm build
pnpm test
pnpm validate:i18n  # checks locale key parity against en/
```

## Adding a locale

1. Add the code to `locales` in `src/i18n.ts`.
2. Create `src/messages/<code>/common.json` with the same keys as `en/common.json`.
3. Run `pnpm validate:i18n` to confirm parity.

## Layout

```
src/
  app/
    [locale]/layout.tsx   # locale-gated shell
    [locale]/page.tsx     # home
  components/             # client islands (LocaleSwitcher)
  i18n.ts                 # canonical locale list + request config
  middleware.ts           # locale-prefix middleware
  messages/<locale>/common.json
```

## CI

`.github/workflows/ci.yml` runs on every PR: install, lint, type-check, validate locale parity, build, vitest. Pull requests that break parity are blocked.

## License

MIT — see `LICENSE`.

# multilingual-webapp-starter

Next.js 14.2.18 and next-intl 3.26.0 scaffold. The first service the repo can run is the locale desk: one page at `/en`, `/no`, and `/tr`. The GitHub description is "Scaffold (initializing)".

## Page

`npm run dev` serves it on port 5175. `/` redirects to `/en`.

The page lists the pieces under that service and a status for each:

| Piece | Status on 12 Nov 2026 |
|---|---|
| Prefixed routing, message catalogs, locale switcher, key parity, type check | Running |
| Production build | Running, after `setRequestLocale` on the page |
| Unit tests | Partial. `src/lib/catalog.test.ts` checks the catalog only |
| Document metadata | Partial. Title and description only. No canonical URL |
| CI workflow | Partial. The file exists. No lockfile. Lint still fails. Not a confirmed merge block |
| Lint | Not running. No ESLint config |
| Env placeholders | Not running. `src/` does not read `.env.example` |

Five repos are named on the page. Star counts are from the GitHub API on 12 November 2026. Only `amannn/next-intl` (3.26.0) is installed. `modelcontextprotocol/servers`, `upstash/context7`, `github/github-mcp-server`, and `shadcn-ui/ui` are not dependencies.

## Files

```
.env.example
.gitignore
AGENTS.md
LICENSE
README.md
next.config.js
package.json
scripts/check-locales.mjs
src/app/globals.css
src/app/layout.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/components/LocaleSwitcher.tsx
src/components/RepoPicks.tsx
src/components/ServiceIndex.tsx
src/i18n.ts
src/lib/catalog.ts
src/lib/catalog.test.ts
src/messages/en/common.json
src/messages/no/common.json
src/messages/tr/common.json
src/middleware.ts
tsconfig.json
.cursor/skills/locale-desk/SKILL.md
.github/CODEOWNERS
.github/ISSUE_TEMPLATE/bug_report.yml
.github/ISSUE_TEMPLATE/feature_request.yml
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/ci.yml
```

No lockfile is committed. There is no ESLint config and no Vitest config. `CONTRIBUTING.md` and `SECURITY.md` are not in the repo.

## Scripts

Local run on Node 22, 12 November 2026:

- `npm run validate:i18n` passes.
- `npm run type-check` passes.
- `npm test` passes. One file, two checks, catalog data only.
- `npm run build` prerenders `/en`, `/no`, and `/tr`.
- `npm run lint` fails. `next lint` asks for an ESLint config and exits 1.
- `npm run dev` on port 5175: `/en`, `/no`, and `/tr` return 200. `/fr` returns 404.

`npm start` was not run.

## License

MIT. Copyright (c) 2026 Zekk-s. See `LICENSE`.

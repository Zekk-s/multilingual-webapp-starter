# multilingual-webapp-starter

Next.js 14.2.18 and next-intl 3.26.0 scaffold. The first service the repo can run is the locale desk: one page at `/en`, `/no`, and `/tr`. The GitHub description is "Scaffold (initializing)".

## Page

`npm run dev` serves it on port 5175. `/` redirects to `/en`.

The page lists the pieces under that service and a status for each:

| Piece | Status on 13 Nov 2026 |
|---|---|
| Prefixed routing, message catalogs, locale switcher, key parity, type check, lint | Running |
| Production build | Running, after `setRequestLocale` on the page |
| Unit tests | Partial. `src/lib/catalog.test.ts` checks the catalog and that message strings have no angle brackets. It does not render the page |
| Document metadata | Partial. Title, description, and the same two Open Graph fields. No canonical URL and no image |
| CI workflow | Running. Actions run [43369219478](https://github.com/Zekk-s/multilingual-webapp-starter/actions/runs/43369219478) passed on 13 Nov 2026. Rulesets are empty, and branch protection was not readable, so that green job is not a confirmed merge block |
| Env placeholders | Not running. `src/` does not read `.env.example` |

Five repos are named on the page. Star counts are from the GitHub API on 12 November 2026. Only `amannn/next-intl` (3.26.0) is installed. `modelcontextprotocol/servers`, `upstash/context7`, `github/github-mcp-server`, and `shadcn-ui/ui` are not dependencies.

## Files

```
.env.example
.eslintrc.json
.gitignore
AGENTS.md
LICENSE
README.md
next.config.js
package-lock.json
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

There is no Vitest config. `CONTRIBUTING.md` and `SECURITY.md` are not in the repo.

## Scripts

Local run on Node 22, 13 November 2026:

- `npm ci` installs from `package-lock.json`.
- `npm run validate:i18n` passes.
- `npm run type-check` passes.
- `npm run lint` passes. `.eslintrc.json` extends `next/core-web-vitals`.
- `npm test` passes. One file: catalog checks, plus a check that message strings have no angle brackets.
- `npm run build` prerenders `/en`, `/no`, and `/tr`.
- `npm run dev` on port 5175: `/en`, `/no`, and `/tr` return 200. `/fr` returns 404.

`npm start` on port 5175 served the production build. `/en` returned the title, the description, and the same two Open Graph fields. There was no canonical link.

## License

MIT. Copyright (c) 2026 Zekk-s. See `LICENSE`.

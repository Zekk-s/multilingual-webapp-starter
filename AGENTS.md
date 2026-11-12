# AGENTS.md

Scaffold. The home page is the locale desk. Describe the files that are here. The GitHub description is "Scaffold (initializing)".

## What exists

- Locales `en`, `no`, and `tr` are the array in `src/i18n.ts`. Copy is `src/messages/<locale>/common.json`.
- Status codes for the rows on the page live in `src/lib/catalog.ts`. Change one only after you run the command it describes.
- `npm run validate:i18n` runs `scripts/check-locales.mjs`. It exits 1 when a locale's keys differ from `en/common.json`.
- `tsconfig.json` has `"strict": true`.
- The page calls `setRequestLocale` before `getTranslations`. Message strings must not contain raw angle brackets, or next-intl treats them as tags.
- `LocaleSwitcher` prints the locale codes. It is the only client component.
- `.env.example` is not imported by `src/`.
- `.github/CODEOWNERS` is `* @Zekiog`.
- `.cursor/skills/locale-desk/SKILL.md` is the project skill for this page. It is not loaded into an agent session that started before the file existed.

## What is partial or not running

- `npm run lint` exits 1. There is no ESLint config.
- `npm test` runs `src/lib/catalog.test.ts` only. `@vitejs/plugin-react` and `happy-dom` are not imported.
- `.github/workflows/ci.yml` calls the npm scripts on pull requests and on pushes to `main`, with Node 20 and `cache: npm`. There is no lockfile. Rulesets are empty. Branch protection was not readable here (403).

## Secrets

Do not commit secrets. `.gitignore` ignores `.env`, `.env.local`, `.env.development.local`, and `.env.production.local`. `.env.example` is placeholders.

A new locale needs a new code in `src/i18n.ts` and a `common.json` with the same keys as `en`. The parity script checks keys only.

Do not add `modelcontextprotocol/servers`, `upstash/context7`, `github/github-mcp-server`, or `shadcn-ui/ui` as dependencies unless `src/lib/catalog.ts` and the page copy say they are installed. Only `next-intl` is.

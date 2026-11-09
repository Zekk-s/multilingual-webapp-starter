# AGENTS.md

Scaffold. Describe the files that are here. The GitHub description is "Scaffold (initializing)".

## What exists

- Locales `en`, `no`, and `tr` are the array in `src/i18n.ts`. Copy is `src/messages/<locale>/common.json`.
- `npm run validate:i18n` runs `scripts/check-locales.mjs`. It exits 1 when a locale's keys differ from `en/common.json`. On this tree it passes.
- `tsconfig.json` has `"strict": true`. `npm run type-check` passes.
- `src/app/[locale]/page.tsx` reads `home` through `useTranslations`. `LocaleSwitcher` prints the locale codes. `nav.home` is unused.
- `home.footnote` includes `<locale>`. next-intl reports `UNCLOSED_TAG`, and the dev page shows the key `home.footnote`.
- `.env.example` is not imported by `src/`.
- `.github/CODEOWNERS` is `* @Zekiog`.

## What fails on this tree

- `npm run lint` exits 1. There is no ESLint config, so `next lint` prompts to create one.
- `npm test` exits 1. Vitest is a dependency and there are no test files.
- `npm run build` exits 1 while prerendering `/en`, `/no`, and `/tr`.

`eslint`, `eslint-config-next`, `vitest`, `@vitejs/plugin-react`, and `happy-dom` are in `package.json` only. They are not imported from `src/` or `scripts/`.

## Workflow file

`.github/workflows/ci.yml` calls those npm scripts on pull requests and on pushes to `main`, with Node 20 and `cache: npm`. There is no lockfile in the repo. Rulesets are empty. Branch protection was not readable here (403). A red script in that file is not, by itself, proof that GitHub blocks the merge.

## Secrets

Do not commit secrets. `.gitignore` ignores `.env`, `.env.local`, `.env.development.local`, and `.env.production.local`. `.env.example` is placeholders.

A new locale needs a new code in `src/i18n.ts` and a `common.json` with the same keys as `en`. The parity script checks keys only.

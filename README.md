# multilingual-webapp-starter

Next.js 14.2.18 and next-intl 3.26.0 scaffold. Locales in source are `en`, `no`, and `tr`. The GitHub description is "Scaffold (initializing)".

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
src/app/layout.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/components/LocaleSwitcher.tsx
src/i18n.ts
src/messages/en/common.json
src/messages/no/common.json
src/messages/tr/common.json
src/middleware.ts
tsconfig.json
.github/CODEOWNERS
.github/ISSUE_TEMPLATE/bug_report.yml
.github/ISSUE_TEMPLATE/feature_request.yml
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/ci.yml
```

No lockfile is committed. There is no ESLint config, no Vitest config, and no test file. `CONTRIBUTING.md` and `SECURITY.md` are not in the repo.

## Source

`src/i18n.ts` exports `locales` (`en`, `no`, `tr`), `defaultLocale` (`en`), and a `next-intl` request config that imports `src/messages/<locale>/common.json`.

`src/middleware.ts` calls `createMiddleware` with `localePrefix: "always"` and a matcher that skips `api`, `_next`, `_vercel`, and paths with a dot.

`src/app/layout.tsx` returns `children`. `src/app/[locale]/layout.tsx` rejects unknown locales with `notFound`, calls `setRequestLocale`, and wraps children in `NextIntlClientProvider`. `generateStaticParams` returns the three locales.

`src/app/[locale]/page.tsx` renders `LocaleSwitcher` and the `home` messages through `useTranslations`. `src/components/LocaleSwitcher.tsx` is a client component. It uses `useRouter` and `usePathname` from `next/navigation` and prints `EN`, `NO`, and `TR`.

`scripts/check-locales.mjs` flattens every `common.json` and compares the keys to `en/common.json`.

`tsconfig.json` sets `"strict": true` and maps `@/*` to `./src/*`.

`next.config.js` wraps the config with the next-intl plugin pointed at `./src/i18n.ts`. It sets `reactStrictMode: true`, `experimental.typedRoutes: false`, and `poweredByHeader: false`. The file uses `export default`. `package.json` has no `"type": "module"`. Node warns and reparses it as an ES module.

Nothing in `src/` exports `metadata` or `generateMetadata`. `.env.example` sets `NEXT_PUBLIC_SITE_URL` and `DEFAULT_LOCALE`. No file under `src/` reads them.

`package.json` lists `eslint`, `eslint-config-next`, `vitest`, `@vitejs/plugin-react`, and `happy-dom`. No file under `src/` or `scripts/` imports them.

Each `home.subtitle` string says the app has SEO-ready metadata and CI-tested locale coverage. The page does not set metadata. `home.footnote` contains the characters `<locale>`. next-intl treats that as an unclosed tag (`INVALID_MESSAGE: UNCLOSED_TAG`) and the page renders the key `home.footnote`. `nav.home` is in the JSON and is unused.

## Scripts

Ran after `npm install` on Node v22.23.4:

| Script | Result |
|---|---|
| `npm run validate:i18n` | Passes. Prints `Locale coverage OK across 3 locales.` |
| `npm run type-check` | Passes (`tsc --noEmit`). |
| `npm run lint` | Fails. `next lint` prompts for an ESLint config and exits 1. |
| `npm test` | Fails. Vitest 2.1.3 finds no test files and exits 1. |
| `npm run build` | Fails. Compile succeeds. Static generation then errors on `/en`, `/no`, and `/tr`. |
| `npm run dev` | `next dev -p 5175` becomes ready. `/` returns 307 to `/en`. `/en`, `/no`, and `/tr` return 200. `/fr` returns 404. Response HTML has no `<title>` and no description meta tag. |

`npm start` is `next start -p 5175`. It was not run.

## CI

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`. The job checks out the repo, sets up Node 20 with `cache: npm`, then runs `npm ci || npm install`, `type-check`, `lint`, `validate:i18n`, `test`, and `build`.

No `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` is in the repo. The workflow was not run on GitHub. Repository rulesets are empty. Branch protection was not readable (HTTP 403), so the workflow file is not evidence of a merge block.

## License

MIT. Copyright (c) 2026 Zekk-s. See `LICENSE`.

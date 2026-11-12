---
name: locale-desk
description: Edit the multilingual-webapp-starter locale desk, its message catalogs, and the service statuses. Use when changing the home page, translations, or src/lib/catalog.ts.
---

# Locale desk

The home page is the first service this repo can run: a locale-prefixed page for `en`, `no`, and `tr`. The rows under it describe real files. Some of those pieces do not run. Say so.

## Before editing copy

1. Read `src/lib/catalog.ts`. Status codes live there, not in the JSON.
2. Read `src/messages/en/common.json` and keep the same keys in `no` and `tr`.
3. Run `npm run validate:i18n`. It exits 1 when keys differ.

## Rules that are easy to break

- User-facing sentences go through `next-intl`. The switcher labels are the locale codes themselves.
- Do not put `<tags>` in a message string. next-intl treats them as rich text and the page shows the key instead of the sentence.
- Call `setRequestLocale` in `src/app/[locale]/page.tsx` before `getTranslations`. Without it, `npm run build` fails while prerendering `/en`, `/no`, and `/tr`.
- Change a status in `catalog.ts` only after you run the command that status describes. `lint` has no ESLint config and exits 1. `tests` only covers `src/lib/catalog.test.ts`. `ci` is a workflow file, not proof of branch protection.
- `.env.example` is not read by `src/`. Do not describe `NEXT_PUBLIC_SITE_URL` as a live site.
- Do not add shadcn, the MCP reference servers, Context7, or the GitHub MCP server as dependencies unless the page copy and `picks` say they are installed. Today only `next-intl` is.

## Check

`npm run validate:i18n`, `npm run type-check`, and `npm test`. Then `npm run dev` and open `/en`, `/no`, and `/tr`.

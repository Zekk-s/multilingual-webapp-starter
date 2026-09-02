# AGENTS.md — multilingual-webapp-starter

## Purpose

Reference repo for shipping locale-aware Next.js apps. Keep it boring, predictable, and CI-gated.

## Hard rules

- **Never** commit secrets or API keys. `.env.example` only, placeholder values.
- **Never** bypass `pnpm validate:i18n`. Locale parity is a hard CI gate.
- **Never** introduce a new locale without updating `src/i18n.ts` AND adding `src/messages/<locale>/common.json` with the same keys as `en/`.
- **Never** disable ESLint or TypeScript. `strict: true` stays.
- All copy goes through `useTranslations` — no hardcoded user-facing strings.

## Workflow

1. Branch from `main`: `git switch -c feat/<scope>`.
2. Make the change.
3. `pnpm dev` to smoke-test locally on :5175.
4. `pnpm test && pnpm validate:i18n && pnpm build` before requesting review.
5. Open PR using `.github/PULL_REQUEST_TEMPLATE.md`.

## Code style

- TypeScript strict. Prefer `import type`.
- Server Components by default; mark client islands with `"use client"` at the top.
- Locale codes are ISO-639-1 (`en`, `no`, `tr`).
- Use `next-intl`'s `useTranslations` and `getTranslations` — do not call `messages/<locale>` directly from app code.

## Testing floor

- Vitest covers helper logic and `validate:i18n` script logic.
- No E2E in this repo by default — add Playwright per-app.

## File ownership

`.github/CODEOWNERS` routes every path to `@Zekiog`.

## Things to avoid

- Mixing `next/router` and `next/navigation` — pick one (we use `next/navigation`).
- Storing translations in DB at the framework layer — this repo is static-message only.

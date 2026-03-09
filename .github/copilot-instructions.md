# Copilot Instructions for this Repository

## Build, lint, and test commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Production start: `npm run start`
- Tests: no test script or test framework config is currently defined in this repo (`package.json` has no `test` script; no Jest/Vitest/Playwright config files found).
- Single-test run: not available until a test runner is added.

## High-level architecture

- Framework: Next.js App Router (Next 16, React 19, TypeScript) with locale-first routing under `src/app/[locale]/...`.
- Internationalization: `next-intl` is wired through:
  - `src/proxy.ts` middleware for locale-aware routing/matching
  - `src/i18n/routing.ts` for supported locales (`en-US`, `zh-CN`) and default locale (`zh-CN`)
  - `src/i18n/request.ts` for loading locale messages from `messages/<locale>.json`
  - `src/app/[locale]/layout.tsx` wraps pages in `NextIntlClientProvider`
- Data layer: page/server components call API helper modules in `src/lib/*` (`product`, `news`, `company-news`, etc.), which fetch from `BASE_API` and pass required `tenant-id` headers.
- Caching/rendering model:
  - Most lib fetches use `next: { revalidate: 60 }`
  - Key route pages commonly use static generation patterns (`generateStaticParams`, `dynamic = "force-static"`, `dynamicParams = false`).
- Asset/media path strategy:
  - `next.config.ts` rewrites `/media/:path*` to `NEXT_PUBLIC_MINIO_REMOTE`
  - `src/lib/utils.ts` `toMediaUrl()` rewrites MinIO URLs back to `/media/...` for frontend-safe usage
  - `next.config.ts` also sets headers for `/draco/*` assets (from README’s Draco model-loading setup).

## Key repository conventions

- Use the `@/*` import alias (`tsconfig.json`) instead of deep relative imports.
- Keep locale type usage aligned with the codebase (`"en-US" | "zh-CN"` from `src/types/locale.ts`) when adding locale-aware routes/components.
- For new API access, follow the existing `src/lib/*` pattern:
  - Build query strings with `URLSearchParams`
  - Include `"tenant-id": TENANT_ID`
  - Parse backend envelope `{ code, data, msg }`
  - Return typed defaults (`[]`, `{ list: [], total: 0 }`, etc.) or throw only where the module already does (e.g., `message.ts`).
- Prefer server-side data fetching in route/page modules and pass hydrated data into presentational components.
- When rendering media URLs returned from backend storage, use `toMediaUrl()` instead of hardcoding remote MinIO origins.

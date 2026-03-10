# Copilot Instructions for this Repository

## Build, lint, and test commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Production start: `npm run start`
- Tests: no `npm test` script is defined in `package.json` and no test framework config is present.
- Single-test run: not available in the current repo state.

## High-level architecture

- Framework: Next.js App Router (Next 16, React 19, TypeScript) with locale-first routing under `src/app/[locale]/...`.
- Entry flow: `src/app/page.tsx` statically redirects to `/${routing.defaultLocale}`; locale routing/matching is handled by `next-intl` middleware in `src/proxy.ts`.
- Internationalization: `next-intl` is wired through:
  - `src/proxy.ts` middleware for locale-aware routing/matching
  - `src/i18n/routing.ts` for supported locales (`en-US`, `zh-CN`) and default locale (`zh-CN`)
  - `src/i18n/request.ts` for loading locale messages from `messages/<locale>.json`
  - `src/app/[locale]/layout.tsx` wraps pages in `NextIntlClientProvider`
- Data layer: page/server components call API helper modules in `src/lib/*` (`product`, `news`, `company-news`, etc.), which fetch from `BASE_API` and pass required `tenant-id` headers.
- Caching/rendering model:
  - Most lib fetches use `next: { revalidate: 60 }`
  - Route segments under `[locale]` often pre-render with `generateStaticParams`; some pages enforce static output with `dynamic = "force-static"` and `dynamicParams = false`.
  - Content detail pages (`news`, `company-news`) build static params from API list endpoints (large page sizes) before fetching item detail by ID.
- Asset/media path strategy:
  - `next.config.ts` rewrites `/media/:path*` to `NEXT_PUBLIC_MEDIA_REMOTE`
  - `src/lib/utils.ts` `toMediaUrl()` rewrites MinIO URLs back to `/media/...` for frontend-safe usage
  - `next.config.ts` also sets headers for `/draco/*` assets (from README’s Draco model-loading setup).

## Key repository conventions

- Use the `@/*` import alias (`tsconfig.json`) instead of deep relative imports.
- Keep locale type usage aligned with the codebase (`"en-US" | "zh-CN"` from `src/types/locale.ts`) when adding locale-aware routes/components.
- For new API access, follow the existing `src/lib/*` pattern:
  - Build query strings with `URLSearchParams`
  - Include `"tenant-id": TENANT_ID`
  - Parse backend envelope `{ code, data, msg }`
  - Return typed defaults (`[]`, `{ list: [], total: 0 }`, etc.); only throw where the module pattern already throws (`src/lib/message.ts`).
- Prefer server-side data fetching in route/page modules and pass hydrated data into presentational components.
- When rendering media URLs returned from backend storage, use `toMediaUrl()` instead of hardcoding remote MinIO origins.

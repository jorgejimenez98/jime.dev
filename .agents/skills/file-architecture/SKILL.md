---
name: file-architecture
description: George's preferred file/folder architecture for this Next.js + React project (jime.dev), the same layout used in Crealix. Use whenever creating, moving, or restructuring components, pages, sub-features, or feature directories. Triggers on requests to "estructura de carpetas", "file structure", "reorganizar", "restructure", "mueve", "move components", or whenever a new feature page is being scaffolded. Apply by default — without being asked — every time you scaffold a new feature, page, or section grouping.
---

# File Architecture — George's preferred layout

> Project copy of `~/.ai-rules/file-architecture.md` (the layout used in Crealix), adapted to jime.dev.
> Used by Claude Code, GitHub Copilot, Cursor, Codex, and any other agent working in this repo.

George (the user) has a strict, repeatable layout for organising feature folders inside Next.js apps. Apply it by default whenever you scaffold, move, or restructure any feature/page area in this project. Do not invent variants — if the task does not match a rule below, ask before deviating.

The reference implementation in this repo is `src/features/landing/home/` (it mirrors `src/features/landing/home/` in Crealix). When in doubt, mirror that folder.

**When to apply this:** creating, moving, or restructuring components, pages, sub-features, or feature directories. Triggers on requests like "estructura de carpetas", "file structure", "reorganizar", "restructure", "mueve", "move components", or any new feature page scaffolding. Apply by default — without being asked — every time you scaffold a new feature, page, or section grouping.

---

## The pattern

```
src/features/<area>/<feature>/
├── <feature>.page.tsx              ← entry component for the route
├── components/
│   ├── index.ts                    ← single barrel re-exporting everything
│   ├── <component-a>/
│   │   └── <component-a>.tsx
│   ├── <component-b>/
│   │   ├── <component-b>.tsx
│   │   └── <child-of-b>.tsx        ← child sub-component, same folder
│   └── <component-c>/
│       ├── <component-c>.tsx
│       └── components/             ← nested when sub-component has children
│           └── <grandchild>.tsx
└── constants/                      ← optional, only if the feature has them
    └── index.ts
```

### Hard rules

1. **Page entry is named `<feature>.page.tsx`** at the feature root. It is the only file at the root (besides `components/`, `constants/`, etc.).
2. **No barrel at the feature root.** Don't create `<feature>/index.ts` — the route file imports directly from `<feature>/<feature>.page` (or from a parent `landing/index.ts` that re-exports).
3. **Every component lives in its own folder** named in `kebab-case` matching the file. The file inside is also `kebab-case.tsx` and matches the folder name. Example: `feature-card/feature-card.tsx`.
4. **A single barrel `components/index.ts`** re-exports every component used outside its own folder. The page entry imports from `./components`, never from individual component paths.
5. **Child sub-components stay in the parent component's folder** — flat, no extra nesting — when they're only used by that parent. Example: `home/components/features-grid/{features-grid.tsx,feature-card.tsx}`.
6. **Nested `components/`** appears only when a sub-component itself has multiple children. Example: `home/components/hero/{hero-section.tsx, components/hero-cta.tsx, components/hero-product-preview.tsx}`. Do not create `components/` for a single child file.
7. **Folder + filename must match.** Both are `kebab-case`. The export inside is `PascalCase`. Example: folder `feature-card/`, file `feature-card.tsx`, export `FeatureCard`.
8. **No `*.component.tsx` suffix** for feature components (that's used elsewhere in the codebase for the design-system primitives at `src/components/ui/*`, but not inside `features/`).
   - In this repo those primitives are shadcn/ui (Base UI). `shadcn add <name>` writes a flat `src/components/ui/<name>.tsx`: move it to `src/components/ui/<name>/<name>.component.tsx`, rewrite its sibling imports (`@/components/ui/label` → `../label/label.component`) and export it from `src/components/ui/index.ts`. Everything else imports primitives from `@/components/ui`.
9. **Do not create tests.** Never add `*.test.*`, `*.spec.*`, `__tests__/`, or similar test files unless George explicitly reverses this rule in the current request.
10. **Centralize shared routing/layout maps.** If multiple wrappers, hooks, or components need the same route-to-module, route-to-layout, sidebar priority, or active-section mapping, create one small helper/constants file next to the owning layout or feature shell and import it everywhere. Do not duplicate route prefix arrays or matching logic across wrapper and hook files.

### Naming conventions

| Layer                      | Pattern                                                  |
| -------------------------- | -------------------------------------------------------- |
| Feature folder             | `kebab-case` (`creative-studio`, `script-to-video`)      |
| Page entry filename        | `<feature>.page.tsx`                                     |
| Component folder           | Same kebab-case as the component file                    |
| Component file             | `<component>.tsx`                                        |
| Component export           | `PascalCase`                                             |
| Barrel                     | `components/index.ts` (always at this exact path)        |

---

## When a feature has multiple pages

Some features (like "Features" itself) have an index page AND a per-item detail page. Split them into sibling sub-features under one folder:

```
src/features/landing/features/
├── all/
│   ├── features.page.tsx
│   └── components/
│       ├── index.ts
│       ├── features-hero/features-hero.tsx
│       ├── feature-group-section/
│       │   ├── feature-group-section.tsx
│       │   └── feature-card.tsx          ← child of the group section
│       ├── feature-spotlight/feature-spotlight.tsx
│       ├── social-proof-bar/social-proof-bar.tsx
│       └── final-cta/final-cta.tsx
└── details/
    ├── feature.details.page.tsx
    └── components/
        ├── index.ts
        ├── feature-detail-hero/feature-detail-hero.tsx
        ├── problem-solution-section/problem-solution-section.tsx
        ├── how-it-works-section/how-it-works-section.tsx
        ├── key-features-grid/key-features-grid.tsx
        ├── visual-demo-section/visual-demo-section.tsx
        ├── use-cases-section/use-cases-section.tsx
        ├── comparison-section/comparison-section.tsx
        ├── faq-section/faq-section.tsx
        ├── cta-section/cta-section.tsx
        ├── section-registry/section-registry.tsx
        └── final-cta/final-cta.tsx
```

Rules for multi-page features:

- Sub-feature folders use semantic English names: `all/`, `details/`, `settings/`, `new/`, `[id]/` etc. — not generic `index/` or `list/`.
- The detail-page entry is named `<feature>.details.page.tsx` (note the dot before `details`).
- Each sub-feature owns its own `components/` folder + barrel — they are completely independent. Do not import across sub-features. If a component is genuinely shared (e.g. `final-cta`), duplicate it.

---

## Imports

- The route file (`app/(landing)/<route>/page.tsx`) imports the page entry directly:
  ```ts
  import { FeaturesPageContent } from "@/features/landing/features/all/features.page"
  import { FeaturePageContent } from "@/features/landing/features/details/feature.details.page"
  ```
- The page entry imports its components from the local barrel:
  ```ts
  import {
    FeatureGroupSection,
    FeatureSpotlight,
    FeaturesHero,
    FinalCta,
    SocialProofBar
  } from "./components"
  ```
- A registry/dispatcher component imports its siblings explicitly via relative paths (`../<sibling>/<sibling>`), not via the barrel — keeps the registry's dependencies obvious.
- Cross-feature imports go through the area-level barrel (`@/features/landing` re-exports each page entry) when convenient, otherwise reach into the page file by its full path.

---

## What NOT to do

- ❌ Flat `components/` folder with every file at the same level (e.g. `components/feature-card.tsx`, `components/feature-spotlight.tsx`). Always wrap each component in its own folder.
- ❌ Sub-folder grouping like `components/detail/<file>` to group "kinds" of components. Use sibling sub-features (`details/`) instead.
- ❌ A `<feature>/index.ts` barrel at the feature root. The page entry is the public API.
- ❌ Mixing kebab-case and camelCase filenames inside `features/`.
- ❌ Importing a component via its full path (`./components/feature-card/feature-card`) when the barrel already re-exports it.
- ❌ Adding a `components/` folder under a leaf component just to hold one sub-file. Inline it next to the parent instead.
- ❌ Creating `*.test.*`, `*.spec.*`, `__tests__/`, snapshots, or test fixtures as part of normal implementation.
- ❌ Repeating shared route/module/sidebar matching tables in more than one place. Extract a single helper/constants module owned by the layout or feature shell.

---

## Shared layout and route helpers

When a layout wrapper, sidebar hook, header popup, command menu, or navigation shell depends on the same route/module priority list, keep that knowledge in one helper file beside the layout. Example pattern:

```
src/shared/layouts/main-layout/
├── main-layout-wrapper.tsx
├── main-layout-modules.ts          ← route/module map + resolver helpers
└── hooks/
    └── use-main-layout-sidebar.tsx
```

Use this for constants like `MAIN_LAYOUT_MODULE_ROUTES`, route prefix resolvers, active module derivation, sidebar priority, and similar shell-level decisions. The wrapper and hooks should import the helper instead of rebuilding their own maps.

---

## Tailwind 4 utility rules

When writing Tailwind 4 classes, prefer Tailwind's spacing scale over arbitrary pixel values. Tailwind 4 can express spacing utilities as numeric scale values, where `1` equals `0.25rem` (`4px`). Do not write hardcoded pixel arbitrary values when the scale can represent the same size.

### Required conversions

Use scale utilities for width, height, min/max width, min/max height, spacing, inset, translate, sizing, and similar spacing-derived utilities:

| Avoid                         | Use instead                       |
| ----------------------------- | --------------------------------- |
| `w-[180px]`                   | `w-45`                            |
| `sm:w-[180px]`                | `sm:w-45`                         |
| `h-[400px]`                   | `h-100`                           |
| `min-h-[320px]`               | `min-h-80`                        |
| `max-w-[420px]`               | `max-w-105`                       |
| `w-[150px]`                   | `w-37.5`                          |
| `min-h-[58px]`                | `min-h-14.5`                      |

Decimal scale values are allowed in Tailwind 4 when they map cleanly to the spacing token. Convert `px / 4` and use the result directly, trimming trailing zeros.

### When arbitrary values are allowed

Keep arbitrary values only when the value is not a plain spacing token or when it encodes real layout logic:

- `h-[calc(100vh-250px)]`
- `grid-cols-[220px_1fr]`
- `top-[var(--header-height)]`
- `w-[anchor-size(width)]`
- typography micro-sizes such as `text-[10px]` when the design intentionally needs a compact label that is not covered by the app's type scale

If a value is visually negotiable, prefer an existing Tailwind token (`max-w-xs`, `h-64`, `text-xs`, etc.) over a custom arbitrary value. If a value must be exact and is not a spacing utility, leave a short reason in the component or extract a named token/utility.

### Quick Tailwind 4 checklist

- [ ] No `w-[Npx]`, `h-[Npx]`, `min-w-[Npx]`, `max-w-[Npx]`, `min-h-[Npx]`, or `max-h-[Npx]` when `N / 4` can be represented as a Tailwind 4 scale number.
- [ ] No hardcoded pixel spacing for padding, margin, gap, inset, translate, or sizing when a Tailwind token exists.
- [ ] Arbitrary values are reserved for `calc(...)`, CSS variables, anchor sizing, custom grid tracks, or intentionally exact non-spacing values.
- [ ] Prefer semantic layout constraints (`max-w-xs`, `max-w-sm`, `min-h-screen`, responsive grids) when exact pixels are not required.

---

## i18n (next-intl) — how to wire translations into a feature

This project resolves the locale from the `[locale]` root param: `src/i18n/request.ts` reads `next/root-params` (Next.js 16.3+) unless a `locale` is passed explicitly. That keeps every route statically renderable under Cache Components **without** `setRequestLocale`.

Crealix still uses `setRequestLocale` and was bitten several times by the wrong locale leaking into the prerendered HTML when a deeply-nested async server component called `getTranslations(namespace)` (no `locale` arg) during SSG with parallel build workers. Keep the locale **explicit** at every server-component boundary so that class of bug can't come back here either.

### The rule

1. **Route file** (`src/app/[locale]/.../page.tsx` or `layout.tsx`):
   - Do **not** call `setRequestLocale` — the root param already provides the locale.
   - When the page entry (or any server component under it) needs the locale, read it from `params`, validate it with `hasLocale(routing.locales, locale)` (`notFound()` otherwise) and **pass it as a prop**. Do not rely on the page entry calling `getLocale()`.
   - `generateMetadata` reads `locale` from `params` the same way and calls `getTranslations({ locale, namespace })`.
   - Example:
     ```ts
     export default async function Route({ params }: PageProps<"/[locale]/blog">) {
       const { locale } = await params
       if (!hasLocale(routing.locales, locale)) notFound()
       return <BlogPageContent locale={locale} />
     }
     ```

2. **Server components** (anything `async` that uses translations):
   - Always call `getTranslations({ locale, namespace })` with **both** keys explicit. Never `getTranslations(namespace)` and never `await getLocale()` inside a server component.
   - Accept `locale: AppLocale` as a prop and forward it to any child server component that also needs translations (see `LandingHeader` / `LandingFooter` in `src/components/layouts/landing/`).

3. **Client components** (`"use client"` with `useTranslations`):
   - Safe to call `useTranslations(namespace)` directly — they read from `NextIntlClientProvider` which IS reliably scoped per-tree, no AsyncLocalStorage involved.
   - Do **not** make a section component server-rendered just to call `getTranslations` if it has no server-only data needs. Prefer `"use client"` + `useTranslations`.

4. **Component prop typing**:
   - `locale` props are typed `AppLocale` (imported from `@/i18n`), never bare `string`.

5. **Date / number formatting in server components**:
   - `new Date(iso).toLocaleDateString(locale, …)` is fine — pass the same `locale` prop you got from the route.

### What NOT to do

- ❌ `setRequestLocale(locale)` in new routes or layouts — redundant with `next/root-params`.
- ❌ `const t = await getTranslations("legal")` in an async server component. **Always pass `{ locale, namespace }`.**
- ❌ `const locale = await getLocale()` inside the feature tree.
- ❌ Async server section components that only exist to call `getTranslations`. Make them `"use client"` + `useTranslations` instead.
- ❌ Typing the locale prop as `string`. Use `AppLocale`.

### Quick i18n checklist

- [ ] Route validates `locale` from `params` with `hasLocale` and passes it to the page entry as a prop whenever the tree has translating server components. No `setRequestLocale`.
- [ ] A page entry that receives the locale types it as `({ locale, … }: { locale: AppLocale; … })`.
- [ ] Every async server component that uses translations calls `getTranslations({ locale, namespace })` with both keys explicit.
- [ ] Every client component that uses translations is plain `useTranslations(namespace)`.
- [ ] No `getLocale()` calls inside the feature tree.

---

## Quick checklist before finishing

When you scaffold or restructure a feature, verify:

- [ ] `<feature>.page.tsx` exists at the feature root.
- [ ] No `index.ts` at the feature root (only `components/index.ts`).
- [ ] Every component sits in its own kebab-case folder with a matching filename.
- [ ] `components/index.ts` re-exports every component used outside its folder.
- [ ] The page entry imports from `./components`, not deep paths.
- [ ] No flat `components/<thing>.tsx` files.
- [ ] If the feature has multiple pages, each lives under a sibling sub-feature folder with its own `components/` + barrel.
- [ ] No `*.test.*`, `*.spec.*`, `__tests__/`, snapshots, or test fixtures were created.
- [ ] Shared route/module/sidebar matching logic lives in one helper/constants file, not duplicated across wrappers/hooks/components.

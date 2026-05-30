---
name: storefront-theming
description: Change colors, fonts, spacing, and visual style of the storefront. Use when the user asks to change brand colors, update fonts, adjust the color scheme, customize the look and feel, switch themes, or modify any visual design tokens. Triggers on "change color", "brand color", "font", "theme", "dark mode", "CSS variable", "accent color", "background", "typography", "design tokens".
---

# Storefront Theming

All visual design tokens live in two files. Edit these instead of adding inline styles or one-off Tailwind values.

## Files to edit

| What | File |
|---|---|
| Color variables | `app/globals.css` |
| Font family, typography scale, custom utilities | `tailwind.config.ts` |
| Font imports | `app/layout.tsx` (lines 3, 13–25) |

**Rule:** Always use Tailwind classes for styling. Custom CSS in `globals.css` only for CSS variables and base resets.

## Color variables (`app/globals.css`)

HSL format — `H S% L%` without `hsl()` wrapper (Tailwind injects it):

```css
:root {
  --background: 40 20% 98%;       /* cream page background */
  --foreground: 0 0% 10%;         /* near-black text */
  --muted: 40 10% 94%;            /* subtle card/section backgrounds */
  --muted-foreground: 0 0% 45%;   /* secondary/placeholder text */
  --accent: 35 40% 50%;           /* warm brown — CTAs, focus rings, highlights */
  --border: 40 10% 88%;           /* dividers, input borders */
  --destructive: 0 72% 51%;       /* red — errors, delete actions */
}

.dark {
  --background: 0 0% 8%;
  --foreground: 40 20% 96%;
  /* override others for dark mode */
}
```

To change the brand accent (e.g. to a deep green):
```css
--accent: 160 45% 35%;
```

In Tailwind classes, use as: `bg-accent`, `text-accent`, `border-accent`, `ring-accent`.

## Fonts (`app/layout.tsx`)

```ts
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})
```

To change fonts, replace the import and config. The variables `--font-heading` and `--font-body` are applied to `<html>` and mapped in Tailwind.

**Tailwind font classes:** `font-heading`, `font-body`

## Typography scale (`tailwind.config.ts`)

```ts
fontSize: {
  'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '600' }],
  'h1': ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
  'h2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.3' }],
  'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
  'h4': ['1.125rem', { lineHeight: '1.5' }],
}
```

Use as: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4`.

## Layout utilities

```
container-custom   →  mx-auto max-w-[1280px] with responsive px
text-balance       →  text-wrap: balance (good for headings)
link-underline     →  animated underline on hover (::after pseudo)
```

## Built-in animations (Tailwind keyframes)

Already defined in `tailwind.config.ts` — use without installing anything:

```
animate-fade-in         opacity 0 → 1
animate-fade-in-up      opacity 0 + translateY(10px) → visible
animate-slide-in-right  translateX(100%) → 0
animate-slide-out-right 0 → translateX(100%)
```

For richer animations, use Framer Motion (see `framer-motion` skill).

## Dark mode

Controlled by `next-themes` (class-based on `<html>`). Toggle via `useTheme()` hook:

```tsx
'use client'
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()
setTheme('dark')   // or 'light' or 'system'
```

CSS variables in `.dark {}` in `globals.css` override the light values automatically.

## Common theming tasks

**Change primary accent color:**
Edit `--accent` in `globals.css` `:root`. One change, updates buttons, focus rings, highlights everywhere.

**Change page background:**
Edit `--background` in `:root` and `--foreground` together — keep contrast ratio ≥ 4.5:1.

**Change fonts:**
1. Update imports in `app/layout.tsx`
2. No changes needed in Tailwind — `font-heading` and `font-body` classes auto-pick up the new `--font-heading` / `--font-body` variables.

**Add a new color token:**
1. Add CSS variable to `globals.css`
2. Register it in `tailwind.config.ts` under `extend.colors`:
```ts
colors: {
  'brand-gold': 'hsl(var(--brand-gold) / <alpha-value>)',
}
```
3. Use as `bg-brand-gold`, `text-brand-gold`, etc.
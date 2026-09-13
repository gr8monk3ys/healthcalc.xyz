---
name: HealthCalc
description: Free health and fitness calculators on warm paper, with an indigo accent and frosted result panels.
colors:
  accent: '#4d55e8'
  accent-light: '#7b82ff'
  accent-dark: '#3a41c9'
  accent-alt: '#0d9488'
  accent-alt-light: '#2dd4bf'
  success: '#0e9f6e'
  warning: '#d97706'
  danger: '#dc2626'
  info: '#4f7bff'
  paper: 'hsl(38 25% 97%)'
  ink: 'hsl(210 15% 12%)'
  muted-ink: '#565d8f'
  surface: '#f8f9ff'
  surface-dark: '#e9ebfa'
  card-border: 'rgba(129, 136, 220, 0.2)'
  glass-fill: 'rgba(252, 252, 255, 0.72)'
  glass-fill-strong: 'rgba(255, 255, 255, 0.82)'
  glass-stroke: 'rgba(255, 255, 255, 0.72)'
  surface-muted: 'rgba(95, 99, 167, 0.07)'
  focus-ring: 'rgba(77, 85, 232, 0.4)'
  night-paper: 'hsl(220 15% 8%)'
  night-ink: 'hsl(0 0% 98%)'
  night-accent: '#8b93ff'
  night-surface: '#161b3e'
typography:
  display:
    fontFamily: 'Fraunces, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.9rem, 1.4rem + 2vw, 2.75rem)'
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Fraunces, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.028em'
  title:
    fontFamily: 'Fraunces, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  metric:
    fontFamily: 'Instrument Sans, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.025em'
    fontFeature: 'tnum'
  body:
    fontFamily: 'Instrument Sans, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: '-0.002em'
  label:
    fontFamily: 'Instrument Sans, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '0.08em'
  mono-label:
    fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.72rem'
    fontWeight: 500
    letterSpacing: '0.16em'
    fontFeature: 'tnum'
rounded:
  input: '0.75rem'
  control: '0.875rem'
  panel: '1rem'
  card: '1.25rem'
  hero: '1.75rem'
  pill: '9999px'
spacing:
  xs: '0.5rem'
  sm: '0.75rem'
  md: '1rem'
  lg: '1.5rem'
  xl: '2rem'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '#ffffff'
    typography: '{typography.label}'
    rounded: '{rounded.control}'
    padding: '0.625rem 1.25rem'
    height: '2.875rem'
  button-soft:
    backgroundColor: '{colors.glass-fill-strong}'
    textColor: '{colors.accent}'
    rounded: '{rounded.control}'
    padding: '0.5rem 1.125rem'
    height: '2.875rem'
  input:
    backgroundColor: '{colors.glass-fill-strong}'
    textColor: '{colors.ink}'
    rounded: '{rounded.input}'
    padding: '0.625rem 0.875rem'
    height: '2.875rem'
  segment-pill:
    backgroundColor: '{colors.glass-fill}'
    textColor: '{colors.ink}'
    rounded: '{rounded.input}'
    padding: '0.5rem 0.875rem'
  segment-pill-selected:
    backgroundColor: 'rgba(77, 85, 232, 0.09)'
    textColor: '{colors.accent}'
    rounded: '{rounded.input}'
    padding: '0.5rem 0.875rem'
  card-glass:
    backgroundColor: '{colors.glass-fill}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    padding: '1rem'
  card-catalog:
    backgroundColor: '{colors.glass-fill-strong}'
    textColor: '{colors.ink}'
    rounded: '{rounded.hero}'
    padding: '1.5rem'
  panel-inset:
    backgroundColor: '{colors.glass-fill-strong}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: '1rem'
  nav-pill:
    backgroundColor: '{colors.glass-fill-strong}'
    textColor: '{colors.accent}'
    typography: '{typography.label}'
    rounded: '{rounded.pill}'
    padding: '0.5rem 1rem'
---

# Design System: HealthCalc

## Overview

**Creative North Star: "The Frosted Worksheet"**

HealthCalc looks like a clean worksheet laid on warm paper: the page ground is a faintly warm off-white with two soft indigo-and-teal radial washes in the corners, and every working surface (the calculator form, the result panel, the catalog card) is a frosted, near-white glass pane with a one-pixel lavender hairline and a long, low, blue-tinted shadow. One accent, an electric indigo, does all the pointing: primary buttons, selected segments, links, the brand mark, the hero eyebrow. Teal appears only as the second color in gradients and washes, never as a control color.

Density is moderate and forgiving. Controls are tall (2.875rem), corners are generously rounded (0.75rem to 1.75rem depending on the container's size), and result numbers are set large, heavy and tabular so the answer is the loudest thing on the page. Status is communicated by hue on the number or on a hairline, not by filling panels with color. Dark mode is a slate night: the same glass panes, now translucent indigo-black, over the same three radial washes, with the accent lifted to a lighter periwinkle so it still reads on dark.

The system is inherited from the shared `~/code/ui` identity (warm paper, gallery hairlines, Fraunces display) with two app knobs, `--primary` and `--radius`, and a full layer of HealthCalc-specific glass, shadow and accent tokens on top. The identity's forest-green primary is overridden by the indigo accent everywhere it shows.

**Key Characteristics:**

- Warm paper ground with corner washes; frosted white panels with 1px lavender hairlines.
- One indigo accent; teal only as a gradient partner; status hues reserved for status.
- Fraunces headings, Instrument Sans body, IBM Plex Mono for wall-label metadata.
- Big tabular result numbers; secondary text in a muted indigo-gray, never neutral gray on tinted surfaces.
- Long, soft, blue-tinted shadows at rest; a 4px lift on hover; nothing bounces.

## Colors

An indigo-on-paper palette: one saturated accent, a teal partner, four status hues, and a family of translucent whites for surfaces.

### Primary

- **Electric Indigo** (`accent`): the only control color. Primary buttons (as a 135deg gradient from `accent-light` through `accent` to `accent-dark`), links, selected segment pills, the brand mark, `::selection`, radio and checkbox `accent-color`, the `.section-eyebrow` label and its short gradient rule.
- **Periwinkle** (`accent-light`) and **Deep Indigo** (`accent-dark`): the gradient ends of the primary button and the brand mark; `accent-dark` (light) / `accent-light` (dark) also tint the "Calc" half of the wordmark and secondary stat numbers.
- In dark mode the accent lifts to **Night Periwinkle** (`night-accent`, #8b93ff) so it keeps contrast on the slate ground.

### Secondary

- **Teal** (`accent-alt`, with `accent-alt-light`): the second hue in gradients only: the hero panel wash, the `.text-gradient` tail, the eyebrow rule, and the result-card tint (`from-accent/10 to-accent-alt/10`). Never used on a control.

### Tertiary (status)

- **Success Green** (`success`), **Warning Amber** (`warning`), **Danger Red** (`danger`), **Info Blue** (`info`): result-status colors. They color the result number and a 4px inset rail in `ResultCard`, or a 1px hairline (`border-<tone>-500/40`) on inset panels. They never fill a panel.

### Neutral

- **Warm Paper** (`paper`) / **Ink** (`ink`): page ground and text, inherited from the identity (`hsl(var(--background))`, `hsl(var(--foreground))`).
- **Muted Ink** (`muted-ink`, #565d8f): all secondary copy: page intros, helper text, placeholders (at 75% alpha), blockquotes. It is an indigo-gray, not a neutral gray, so it sits on the tinted surfaces.
- **Surface / Surface Dark** (`surface`, `surface-dark`): the near-white raised-panel fills used by the consent banner and legacy `--surface` consumers.
- **Glass Fill / Glass Fill Strong / Glass Stroke** (`glass-fill`, `glass-fill-strong`, `glass-stroke`): the translucent whites of every panel and its inner highlight stroke.
- **Card Border** (`card-border`): the 1px lavender hairline on inputs, inset panels, pills and the mobile menu divider.
- **Surface Muted** (`surface-muted`): code and table-header tint inside prose; slider track.
- **Night Paper / Night Ink / Night Surface** (`night-paper`, `night-ink`, `night-surface`): the dark-mode ground, text and panel fills.

### Named Rules

**The One Accent Rule.** Indigo is the only color that means "interactive". Teal, green, amber, red and blue may describe a result; they may not invite a click.

**The Hairline Status Rule.** A status color touches a panel only as a 1px hairline border, a 4px inset rail inside `ResultCard`, or the color of the number. It never becomes a 4px side tab and never floods a background beyond a 10% tint.

**The Muted-Ink Rule.** Secondary text on any tinted surface is `muted-ink` (or the `text-slate-700 dark:text-slate-200` pair), never `text-gray-*`.

## Typography

**Display Font:** Fraunces (with ui-sans-serif, system-ui fallback), loaded via `next/font/google`, `display: swap`.
**Body Font:** Instrument Sans (with ui-sans-serif, system-ui fallback).
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, Menlo fallback), weights 400/500/600.

**Character:** a warm, slightly bookish serif carrying the headings over a neutral, tightly-set grotesk body; the mono face appears only as small uppercase "wall labels". Headings are tracked tight (`-0.028em`) and balanced; paragraphs use `text-wrap: pretty`.

### Hierarchy

- **Display** (800, `clamp(1.9rem, 1.4rem + 2vw, 2.75rem)`, 1.15): the calculator page `h1` inside `.calc-hero`, tracked `-0.03em`. The home hero goes larger (`2.15rem` to `3.4rem`, weight 800, line-height 1.05).
- **Headline** (700, 1.5rem, 1.15): section headings (`text-2xl font-semibold` / `font-bold`) and result-card titles.
- **Title** (600, 1.25rem, 1.2): catalog card titles (`text-xl font-semibold tracking-tight`), result sub-headings.
- **Metric** (800, 1.875rem, tabular): the answer. `text-3xl font-extrabold tracking-tight tabular-nums`, colored by status.
- **Body** (400, 1rem, 1.65): default copy. Prose measure is capped at 38rem for running text (about 75 characters in Instrument Sans); calculator intros cap at 46rem at 1.0625rem.
- **Label** (600, 0.75rem, 0.08em, uppercase): `ResultCard` labels and hero stat captions (`text-xs font-semibold uppercase tracking-[0.08em]`).
- **Mono label** (500, 0.72rem, 0.16em, uppercase): the identity's `label-mono` utility for kickers, dates and catalogue numbers.

### Named Rules

**The Tabular Number Rule.** Every result number is `tabular-nums`; digits must not reflow as the value changes.

**The Balanced Heading Rule.** Headings get `text-wrap: balance` on desktop and fall back to `wrap` under 768px.

## Layout

A single centered column. The shell is `min-h-screen flex flex-col`; the header is a sticky pill bar (`sticky top-0 z-40`, padded `px-3 pt-3` / `md:px-4 md:pt-4`) and the main region is `container mx-auto px-4 py-8`. Content pages use `max-w-4xl mx-auto`; the footer and the mobile menu use `max-w-6xl`. Breakpoints are Tailwind's defaults (sm 640, md 768, lg 1024); the desktop nav appears at `lg`, and 768px is where the CSS drops blur and radial washes for performance.

Rhythm is on Tailwind's 0.25rem grid with four working steps: `gap-3` / `gap-4` inside a panel, `space-y-6` between result sections, `mb-6`/`mb-8` between page sections, `py-8` around main. Calculator pages stack: hero (`h1` + intro), form panel, result panel, then related calculators, guides and FAQ; ad units sit between those blocks and are part of the layout.

Catalog and hub grids are `grid-cols-1 md:grid-cols-3` (or 4) with `gap-4` to `gap-8`; macro breakdowns and stat rows use `grid-cols-2 md:grid-cols-4` with centered numbers. Below-fold sections opt into `content-visibility: auto` via `.perf-defer-section`.

## Elevation & Depth

A hybrid: frosted glass panes with long, soft, blue-tinted ambient shadows at rest, and a lift on hover. Depth is never conveyed by hard edges or neutral gray shadows; every shadow is tinted from the indigo family (`rgba(48, 53, 140, ...)`) and pairs a 1px contact shadow with a 10 to 26px blurred drop offset downward. Under 768px the blur (`backdrop-filter`) is removed and every shadow collapses to a single `0 1px 3px` so panels keep definition without paint cost.

### Shadow Vocabulary

- **Ambient** (`box-shadow: 0 1px 2px rgba(30, 34, 90, 0.04), 0 10px 30px -12px rgba(48, 53, 140, 0.18)`): resting state of every glass panel, pill and soft button.
- **Raised** (`box-shadow: 0 1px 2px rgba(30, 34, 90, 0.05), 0 18px 44px -16px rgba(48, 53, 140, 0.26)`): the hero panel, `glass-panel-strong` (catalog cards, footer) and floating hero metric cards.
- **Hover** (`box-shadow: 0 2px 4px rgba(30, 34, 90, 0.06), 0 24px 52px -18px rgba(58, 65, 201, 0.34)`): `.card-interactive:hover` together with `translateY(-4px)`; `.ui-btn-soft:hover` with `translateY(-1px)`.
- **Primary button** (`inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 6px rgba(58,65,201,0.25), 0 12px 28px -8px rgba(58,65,201,0.45)`): the only shadow that is saturated, because the button is the only saturated surface.
- **Focus** (`0 0 0 2px hsl(var(--background)), 0 0 0 4px var(--focus-ring)`): two-ring focus on every control.

### Named Rules

**The Tinted Shadow Rule.** Shadows are indigo-tinted and offset downward with a soft blur; no neutral gray shadows, no zero-offset halos.

**The Mobile Flattening Rule.** At or below 768px, blur is off and shadows collapse to `0 1px 3px`; borders carry the definition.

## Shapes

Soft, continuous rounding scaled to the container: inputs and segment pills `0.75rem`; buttons, inset panels and prose code blocks `0.875rem`; the base `neumorph` panel `1rem`; glass cards and the mobile menu `1.25rem` (`rounded-2xl`); catalog cards and the footer `1.5rem` to `1.75rem`; nav items, badges and unit toggles are full pills. Every surface carries a 1px hairline (`glass-stroke` on glass, `card-border` on inputs and inset panels); borders never exceed 1px except the 4px status rail inside `ResultCard`, which is a separate rounded element, not a border. Blockquotes in prose carry a 2px indigo rule at 60% alpha. Radio inputs stay visible inside their pill and use the accent color.

## Components

### Buttons

- **Shape:** rounded control (0.875rem), min-height 2.875rem, inline-flex with 0.5rem gap.
- **Primary (`.ui-btn-primary`):** white 700-weight label on the 135deg indigo gradient, inset top highlight, saturated indigo shadow, `0.625rem 1.25rem` padding. Dark mode flips the label to near-black ink on the lighter gradient.
- **Hover / Focus:** `translateY(-1px)` + `brightness(1.06)` + the larger shadow over 180ms; active scales to 0.985; focus shows the two-ring focus. Disabled drops opacity to 0.7 with `not-allowed`.
- **Soft (`.ui-btn-soft`):** accent-colored 600-weight label on `glass-fill-strong` with a `card-border` hairline and the ambient shadow; hover lifts 1px and warms the border to `rgba(123,130,255,0.5)`.
- **Neumorph button (`.neumorph-btn`) / nav pill (`.elevated-pill`):** the same glass recipe in pill form for header links, unit toggles and small actions.

### Chips

- **Style:** `bg-accent/10 text-accent text-xs rounded-full px-2 py-0.5` badges for category tags; `.seg-pill` for radio options, a glass pill with a visible accent-colored radio.
- **State:** a selected `.seg-pill` gets an accent border, an inset 1px accent ring, `rgba(77,85,232,0.09)` fill and 600-weight accent text.

### Cards / Containers

- **Corner Style:** `rounded-2xl` (1.25rem) for `Card` / `.glass-panel`; `rounded-3xl` for catalog cards; `1rem` for `.neumorph` / `.neumorph-card`.
- **Background:** `glass-fill` (Card) or `glass-fill-strong` (catalog, footer, neumorph) with 10 to 14px backdrop blur; tinted result cards add `bg-gradient-to-br from-accent/10 to-accent-alt/10`.
- **Shadow Strategy:** ambient at rest, raised for strong panels, hover lift via `.card-interactive`.
- **Border:** 1px `glass-stroke`.
- **Internal Padding:** `p-4` (Card default), `p-6` (catalog, neumorph card, result wrappers).
- **Inset panel (`.neumorph-inset`):** the sub-panel inside a result: `glass-fill-strong`, 1px `card-border`, 0.875rem radius, `p-4`; status is a `border-<tone>-500/40` hairline or an inline `color-mix(in srgb, <hex> 45%, transparent)` border color.

### Inputs / Fields

- **Style:** `.ui-input` / `.ui-select` / `.neumorph-input`: full width, `glass-fill-strong` fill, 1px `card-border`, 0.75rem (ui) or 0.875rem (neumorph) radius, min-height 2.875rem, `0.625rem 0.875rem` padding, placeholder in muted ink at 75%.
- **Focus:** border becomes accent and a `0 0 0 3px var(--focus-ring)` ring appears (neumorph); ui controls use the global two-ring focus.
- **Error / Disabled:** validation text is `text-sm text-red-600` with `role="alert"`; calculation errors sit in a `.neumorph-inset` with a `border-red-500/40` hairline and `text-red-600 dark:text-red-400`. Disabled controls fade to 0.7 opacity.
- **Slider:** 0.5rem track in `surface-muted` with a 1.5rem accent thumb ringed in white.

### Navigation

- **Style:** a sticky bar of `.elevated-pill` links (`rounded-full px-4 py-2 text-sm font-semibold text-accent`) that lift 0.5px on hover; the brand is a 2xl 900-weight wordmark beside a 2.25rem gradient-indigo square glyph. Under `lg` the links collapse into a `.glass-panel` sheet (`rounded-2xl p-4`) toggled by a pill button; the theme toggle and auth controls stay in the bar.

### Result Card (signature)

`ResultCard`: a relative, overflow-hidden panel with a 4px status rail inset 0.75rem from the top and bottom on the left edge (`inset-y-3 left-0 w-1 rounded-r-full`), a status icon, an uppercase 0.75rem label, the metric in `text-3xl font-extrabold tabular-nums` colored by status, a units suffix in muted ink, and a one-line interpretation. Status maps to `success` / `warning` / `danger` / `info`.

### Hero Panel (signature)

`.hero-panel`: a raised panel with two radial washes (teal top-right, indigo top-left) over a white-to-lavender vertical gradient, a `.hero-search-shell` search field and two floating `.hero-metric-card` decorations on a 7s / 9s `ease-in-out` float, plus a sparkline drawn once over 2.2s. All of it is stilled by `prefers-reduced-motion`.

## Do's and Don'ts

### Do:

- **Do** put the answer in a `ResultCard` or an inset panel with a tabular, 800-weight number and a status hue on the number.
- **Do** use `text-accent`, `text-accent-dark dark:text-accent-light` and `bg-accent/10` for emphasis and tints; `from-accent/10 to-accent-alt/10` when a card needs a wash.
- **Do** carry status onto a panel as a 1px hairline (`border-<tone>-500/40`) or an inline `color-mix` border color.
- **Do** keep every control at least 2.75rem tall with the two-ring focus visible.
- **Do** give secondary text on tinted surfaces the `muted-ink` / `text-slate-700 dark:text-slate-200` treatment.
- **Do** pair every animation with the existing `prefers-reduced-motion` block; the only ambient motion is the hero float and sparkline.
- **Do** leave `AdUnit` placements where they are; ads are part of the page layout.

### Don't:

- **Don't** use Tailwind `purple`, `violet` or `indigo` classes; the accent tokens are the indigo.
- **Don't** put a colored `border-l-4` (or any side border above 1px) on a card, callout, alert or list item; that includes inline `borderLeft` styles.
- **Don't** add bounce, elastic or spring easing; the `bounce` keyframes were removed and nothing should re-add them.
- **Don't** flood a panel with a status color; a 10% tint is the ceiling.
- **Don't** use neutral gray shadows or zero-offset glows; every shadow is indigo-tinted and offset downward.
- **Don't** put `text-gray-*` copy on a tinted or glass surface.
- **Don't** rely on `tailwind.config.js`; it is inert under Tailwind v4 and the tokens live in `globals.css` `@theme` and `identity.css`.

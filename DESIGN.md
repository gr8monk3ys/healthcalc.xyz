---
name: HealthCalc
description: Free health and fitness calculators set like a Nutrition Facts label, in black ink, white stock and one highlighter yellow.
colors:
  mark: '#ffd400'
  on-mark: '#0b0b0b'
  ink: '#0b0b0b'
  ink-2: '#45433d'
  paper: '#ffffff'
  paper-2: '#f3f1ea'
  rule-soft: 'rgba(11, 11, 11, 0.22)'
  surface-muted: 'rgba(11, 11, 11, 0.06)'
  success: '#0e7a44'
  warning: '#8f5200'
  danger: '#c81e1e'
  info: '#1d4ed8'
  night-paper: '#0b0b0b'
  night-paper-2: '#1b1a17'
  night-ink: '#f6f3ea'
  night-ink-2: '#bcb8ab'
  night-rule-soft: 'rgba(246, 243, 234, 0.28)'
  night-surface-muted: 'rgba(246, 243, 234, 0.09)'
  night-success: '#4ade80'
  night-warning: '#fbbf24'
  night-danger: '#f87171'
  night-info: '#93b4ff'
  header-paper: '#0b0b0b'
  header-paper-2: '#262521'
  header-ink: '#ffffff'
  header-ink-2: '#cfcabb'
typography:
  display:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 3.25rem)'
    fontWeight: 900
    lineHeight: 1
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.625rem'
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: '-0.03em'
  title:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.4
  figure:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: '-0.02em'
    fontFeature: '"tnum"'
rounded:
  none: '0'
spacing:
  rule-row: '1px'
  rule-group: '4px'
  rule-title: '10px'
  control-y: '0.625rem'
  control-x: '0.875rem'
  panel: '1.5rem'
  grid-gap: '2rem'
  section: '4rem'
  section-wide: '6rem'
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.625rem 1.25rem'
    height: '2.875rem'
  button-primary-hover:
    backgroundColor: '{colors.mark}'
    textColor: '{colors.on-mark}'
  button-soft:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.625rem 1.25rem'
    height: '2.875rem'
  button-soft-hover:
    backgroundColor: '{colors.mark}'
    textColor: '{colors.on-mark}'
  input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.none}'
    padding: '0.625rem 0.875rem'
    height: '2.875rem'
  input-focus:
    backgroundColor: 'color-mix(in srgb, #ffd400 22%, #ffffff)'
  option:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.none}'
    padding: '0.5rem 0.875rem'
  option-hover:
    backgroundColor: '{colors.paper-2}'
  option-checked:
    backgroundColor: '{colors.mark}'
    textColor: '{colors.on-mark}'
  panel:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.none}'
    padding: '1.5rem'
  site-header:
    backgroundColor: '{colors.header-paper}'
    textColor: '{colors.header-ink}'
    height: '4rem'
  nav-link:
    textColor: '{colors.header-ink}'
    typography: '{typography.label}'
    padding: '0 0.75rem'
  nav-link-hover:
    textColor: '{colors.mark}'
---

# Design System: HealthCalc

## Overview

**Creative North Star: "The Nutrition Label"**

A result is set the way a Nutrition Facts panel is set: a heavy bar under the title, a bold label on the left, a tabular figure on the right, and the source underneath. The page is white label stock printed in near-black ink, with one highlighter yellow. Rules do the work that boxes, tints and shadows do elsewhere: the thickness of a line says how big a break it marks.

Nothing is decorated. Corners are square, surfaces are flat, there is one type family, and color other than ink appears only to mark a state or a status. Dark mode is the same label printed in reverse: the ink and paper tokens swap and every rule follows.

The style seam is a single stylesheet. It zeroes Tailwind's radius and shadow scales and redraws the old class names (`neumorph*`, `glass-panel*`, `elevated-pill`, `ui-*`, `seg-pill`) in this system. Those names describe a previous look and are kept as names only; they are slated to become components.

**Key Characteristics:**

- Three rule weights carry the hierarchy: 10px under a title, 4px between groups, 1px between rows.
- One family, Archivo. 900 for titles and figures, 400 for reading.
- Black fill is the primary action. Yellow is the answer to the pointer, the keyboard and a selection.
- Square corners and flat surfaces everywhere, enforced at the theme level.
- The header is a black bar in both themes.
- Figures are tabular and right-aligned against their label.

## Colors

Two inks and two stocks, one highlighter, and four status colors that only ever mean status.

### Primary

- **Highlighter Yellow** (`mark`): selected, focused and hovered states. The checked option, the focus halo, the hovered button and link, text selection, the current unit, the slider thumb, the skip link, the logo square. Text set on it is always `on-mark`, which stays black in both themes.

### Tertiary (status)

- **Label Green / Amber / Red / Blue** (`success`, `warning`, `danger`, `info`): result status only. Each has a lighter `night-*` value for the dark ground.

### Neutral

- **Label Ink** (`ink`): text, every rule, primary button fill, the footer bar.
- **Fine Print** (`ink-2`): intros, descriptions, placeholders, inactive toggles.
- **Label Stock** (`paper`): the page and every panel.
- **Kraft Tint** (`paper-2`): quiet hover on options and search, code blocks, the slider track.
- **Soft Rule** (`rule-soft`): the default color of a bare border. The ink rule is opt-in.
- **Night set** (`night-*`): the same roles with ink and paper reversed.
- **Header set** (`header-*`): ink and paper as re-scoped inside the header bar.

### Named Rules

**The Highlighter Rule.** Yellow means selected, focused or hovered. It is a fill behind black text or a band under it. It is never body text on a light ground; as a text color it appears only on the black header.

**The Black Bar Rule.** The site header is black in both themes. Inside it the ink and paper tokens are re-scoped, so shared controls invert without per-component overrides. This is why color utilities are declared in `@theme inline`: `text-ink` must read the token where the element sits.

**The Neutral Ink Rule.** `gray` and `slate` are aliased to `stone` in the theme. There is no blue-tinted neutral in this system.

## Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo (the same family)
**Label/Mono Font:** none distinct. The system monospace stack appears only in code.

**Character:** One grotesque doing every job, the way a food label does. Weight and rule thickness make the hierarchy; size does less than usual.

### Hierarchy

- **Display** (900, clamp(2rem, 1.4rem + 2.6vw, 3.25rem), 1.0, -0.03em): the page title of a calculator, sitting on a 10px bar. The home title runs larger, up to 4.25rem.
- **Headline** (900, 1.625rem, 1.05, -0.03em): the title that opens a panel, with its own 10px bar. Section titles on index pages use the same treatment at 1.875rem to 2.25rem.
- **Title** (800, 1.25rem, 1.12, -0.02em): card and row headings. All headings default to 800 with balanced wrapping.
- **Body** (400, 1rem, 1.6): reading text. Articles run at 1.0625rem and 1.7, capped at a 40rem measure; a calculator intro caps at 44rem.
- **Label** (700, 0.875rem): buttons, nav links, footer column heads. Form field labels use the same size at 600.
- **Figure** (900, 2.25rem, -0.02em, tabular numerals): the result number. Tables and anything marked tabular use tabular numerals too.

### Named Rules

**The One Family Rule.** Archivo is the only family. Emphasis comes from weight (400, 600 to 700, 800, 900), never from a second typeface or italics.

**The Figure Rule.** A result number is 900 weight with tabular numerals, and nothing in its panel is larger.

## Layout

The page is a centered container with a 1rem gutter. Calculator pages sit in a 56rem column under a sticky 4rem header; anchor jumps and focus scrolling clear it with 5rem of scroll padding.

A calculator opens with the title block on its 10px bar, then a three-column grid at 2rem gap: form in one column, result in two. Before a result exists the form leads alone at a 34rem measure and the explanatory prose follows below; when a result renders the form and result sit side by side. Between 768px and 1024px, and below, everything stacks.

Index and home pages are stacked sections 4rem apart (6rem from 768px), each opened by a title on a 10px bar. Lists are ruled rows: a 4px bar above the first, a hairline under each, label left and count or figure right. Card grids use a 2rem column gap and each card opens with a 4px bar instead of a box.

Controls are at least 2.75rem tall; buttons and inputs are 2.875rem. Breakpoints are Tailwind's defaults (640, 768, 1024px).

Ad slots are part of the layout. They keep their position and size on every page.

## Elevation & Depth

There is none. The shadow scale is zeroed in the theme, so every `shadow-*` utility renders nothing, and there is no blur, glass or gradient surface in the system. A panel is separated from the page by a 1px ink outline; a panel inside a panel loses its box and becomes a section under a 4px bar.

`box-shadow` survives in one job only: drawing a hard, unblurred band in ink or yellow. The focus halo, the highlighter stripe under the current unit or nav item, and the 3px inset frame on an interactive card are all rules, drawn with a shadow because a border would shift layout.

### Named Rules

**The Flat Stock Rule.** No surface is lifted. If a shadow has a blur radius or an offset that reads as depth, it is wrong here.

## Shapes

Every corner is square. The radius scale is zeroed in the theme, and `rounded-full` is squared as well, so pills and chips are rectangles. The loading spinner is the one circle.

Lines come in three weights and each has one meaning: 10px closes a title, 4px separates groups (and opens a card, a table head, an article section, the consent bar), 1px separates rows and outlines panels and controls. Tables have no vertical rules. List bullets are squares.

The logo is this language in miniature: a yellow square holding an equals sign made of one heavy bar and one hairline. Its colors are fixed and do not follow the theme.

### Named Rules

**The Three Rules Rule.** A line is 10px, 4px or 1px. Pick by what it separates: title, group or row.

## Components

### Buttons

- **Shape:** square, 1px ink outline, 700 weight, at least 2.875rem tall with 0.625rem by 1.25rem padding.
- **Primary:** ink fill with paper text. One per form or section.
- **Soft:** paper fill with ink text and the same outline. Compact header buttons share this look.
- **Hover:** both turn yellow with black text over 0.12s. Pressed, the button drops 1px. Disabled is 60% opacity.
- **On an ink band:** the roles reverse. The primary is a yellow fill and the secondary is an outlined paper-colored button; both turn to paper on hover.

### Options

- **Style:** radio choices are outlined rectangles, 500 weight, set in a wrapping row.
- **State:** hover takes the kraft tint. The checked option is filled yellow at 700 weight with black text. Keyboard focus draws a 3px ink outline.

### Cards / Containers

- **Panel:** paper fill, 1px ink outline, square, 1.5rem padding. A leading h2 or h3 becomes the panel title on a 10px bar.
- **Row:** inside a panel, a hairline above, label left, figure right.
- **Nested panel:** no box; a 4px bar on top and no side padding.
- **Calculator card:** no box. A 4px bar, a title that underlines on hover, a description, and a call to action that takes the yellow highlight on hover.
- **Tables:** in panels and articles, a 4px bar under the head, hairlines under rows, left-aligned, no fills.

### Inputs / Fields

- **Style:** paper fill, 1px ink outline, square, 2.875rem tall. Placeholder in fine print.
- **Focus:** the field tints yellow (22% highlighter over paper) and takes the global focus ring: a 3px ink outline, 2px offset, with a yellow halo outside it.
- **Slider:** a 0.5rem outlined track with a square yellow thumb.
- **Disabled:** 60% opacity.

### Navigation

- **Header:** a sticky black bar, 4rem tall, in both themes. Yellow-square logo with a white 900-weight wordmark, bold white links, the units switch, theme toggle and account button.
- **States:** a link turns yellow on hover; the current page carries a 4px yellow band along the bottom of the bar. The current unit is 800 weight over a yellow highlighter stripe.
- **Mobile:** below 1024px the links collapse into a full-width list of 3rem rows separated by hairlines.
- **Footer:** opens with a 10px ink bar. Column heads sit on 4px bars, links underline on hover, and the fine print is separated by hairlines.

### Links

- In running text: ink, 600 weight, underlined at 1.5px. Hover fills the link yellow with black text.

### Result Card (signature)

The label panel in use: a small bold caption, then the figure at 900 weight with tabular numerals and its unit beside it, then one line of meaning. Status is carried by the figure's color using the status tokens.

### Calculator Facts (signature)

The home page's category index, drawn as a literal label: title on a 10px bar, a bold summary line on a 4px bar, one hairline row per category with its count right-aligned, and a footnote above a 4px bar. Rows fill yellow on hover.

## Do's and Don'ts

### Do:

- **Do** build a new surface from the three rules: 10px under its title, 4px between groups, 1px between rows.
- **Do** use the tokens (`ink`, `ink-2`, `paper`, `paper-2`, `mark`, and the status four) through their utilities. They flip for dark mode and inside the header on their own.
- **Do** set text on yellow in `on-mark`. It stays black in both themes; `ink` does not.
- **Do** make the primary action an ink fill, and let hover, focus and selection turn things yellow.
- **Do** set figures at 900 weight with tabular numerals, label on the left and figure on the right.
- **Do** keep every control at least 2.75rem tall and keep the global focus ring.
- **Do** change the look of a shared element in the stylesheet seam, once, so every page follows.
- **Do** leave ad slots exactly where they are.

### Don't:

- **Don't** add a radius, a shadow with blur or offset, a backdrop blur, a gradient or a tinted card. The radius and shadow utilities are zeroed and will silently do nothing.
- **Don't** use yellow as text on a light ground, as a large decorative field, or to mean anything other than selected, focused or hovered.
- **Don't** introduce a second typeface, an accent color, or a blue-tinted gray.
- **Don't** draw a rule at any thickness other than 10px, 4px or 1px.
- **Don't** box a panel inside a panel. The inner one is a section under a 4px bar.
- **Don't** give the header a light variant or theme it. It is black in both.
- **Don't** read the legacy class names as design intent. `neumorph` and `glass-panel` mean "panel" and nothing more; don't coin new names in that family.
- **Don't** hardcode ink or paper hex values in components. The logo and text on yellow are the only fixed colors.
- **Don't** move, resize or remove an ad slot.

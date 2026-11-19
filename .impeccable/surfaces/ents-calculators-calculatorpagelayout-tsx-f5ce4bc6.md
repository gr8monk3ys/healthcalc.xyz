---
version: 1
slug: 'ents-calculators-calculatorpagelayout-tsx-f5ce4bc6'
primary_target: 'src/components/calculators/CalculatorPageLayout.tsx'
related_targets: ['src/components/Header.tsx', 'src/components/Footer.tsx', 'src/app/globals.css']
---

# Calculator shell and shared chrome

Scope: the shared shell every calculator, hub, blog and home page renders through (header, footer, calculator page layout, result panels, tokens). Mode: Operate.

Audience and job: someone arriving from search on a phone or laptop who wants one health number, its meaning and its source in under a minute. Constraints: ad slots stay where they are; calculation, validation and copy are unchanged; dark mode and reduced motion keep working.

## Direction contract

THESIS: A result is set like a Nutrition Facts panel: one heavy rule, bold label on the left, tabular figure on the right, the formula in the footnote. It refuses the category default of soft blue cards with a gradient hero and icon tiles.

OWN-WORLD: White label stock, near-black ink, one highlighter yellow. Rules do the work of boxes: a 10px bar under a panel title, 4px bars between groups, 1px hairlines between rows. Square corners, no shadows, no blur, no gradients. One grotesque family (Archivo), 900 for titles and figures, 400 for reading. Yellow means selected or focused; black fill means primary action.

STORY: The visitor types their numbers, presses Calculate, and reads the answer the way they read a food label: big figure first, the range beside it, the source underneath. They trust it because nothing is decorated.

FIRST VIEWPORT: Black header bar with the yellow equals-mark and white wordmark, nav links, units switch. Below: page title at 900 weight, one-line intro, then the form panel in a 1px ink box with square inputs and a full-width black Calculate button. The result panel sits beside it on desktop and under it on mobile.

FORM: The Nutrition Facts label, first on the ordered list of seven; taken by the user as the pick card. seed:5662a4f5f63aaf39

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

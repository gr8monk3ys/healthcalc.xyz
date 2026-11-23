# HealthCalc

A site of free health and fitness calculators plus a blog, served at healthcalc.xyz. The calculators run in the browser; the server stores only what a visitor chooses to submit or save.

## Language

### Calculators

**Calculator**:
One tool a visitor fills in to get a result (BMI, TDEE, body fat...). Each has a slug, its own route folder, and a pure calculation function in `src/utils/calculators/`.
_Avoid_: widget, tool, app

**Catalog** (`CALCULATOR_CATALOG`):
The single list of every Calculator: slug, title, description, category, hub, image and optional detail. The sitemap, search index, hub pages and `/calculator/[slug]` are built from it. The calculator count is read from it, never typed into copy.
_Avoid_: registry, calculator list

**Hub**:
A themed grouping of Calculators (`CALCULATOR_HUBS`, for example Weight Loss & Management) with its own page at `/calculators/[hub]`. Every catalog entry names exactly one hub.
_Avoid_: category page, section

**Category**:
The free-text label on a catalog entry shown on its card. Not the same as a Hub.
_Avoid_: hub, tag

**Slug**:
The URL-safe identifier of a Calculator or blog post, used as its route segment.
_Avoid_: id, key, handle

### Journeys

**Chain** (`CalculatorChain`):
An ordered, named sequence of Calculators that walks a visitor through one goal, such as the weight loss journey. Its state lives in the visitor's session.
_Avoid_: wizard, flow, funnel

**Chain step** (`ChainStep`):
One Calculator inside a Chain, with a label and the shared fields it reads and produces.
_Avoid_: stage, page

**Shared field** (`sharedFields`, `sharedData`):
An input name (age, gender, height, weight, activityLevel) carried from one Chain step to the next so the visitor does not retype it.
_Avoid_: prefill, carry-over

### Saving and sharing

**Saved result**:
A Calculator's inputs and outcome that a signed-in visitor chose to keep. Stored in the `saved_results` table, readable only by its owner through row-level security, and keyed by a deterministic result key (`computeSavedResultKey`).
_Avoid_: history, bookmark, record

**Shared result**:
A result a visitor sends to someone else as a link, carried entirely in a **share token**: a versioned, base64url-encoded payload of calculator slug and inputs. Only some Calculators can be shared (`ShareCalculatorSlug`). Nothing is stored server-side.
_Avoid_: permalink, snapshot

**Share token**:
The encoded payload in a Shared result link. Decoding it validates the inputs; an invalid token decodes to nothing.
_Avoid_: share id, hash

### Embedding

**Embed**:
A Calculator rendered inside a partner's page through an iframe snippet (`buildEmbedCode`), served from `/{slug}?embed=1` and `/api/embed/[calculator]`. Embeds relax the `X-Frame-Options: DENY` header that every other route keeps.
_Avoid_: widget, plugin

**Embed request**:
A partner's form submission asking to embed a Calculator. Recorded as an embed request submission.
_Avoid_: embed signup

### Content

**Blog registry** (`BLOG_REGISTRY`):
The single source of metadata for every blog post (title, date, category, keywords, affiliate flag). Post bodies are TSX files registered separately.
_Avoid_: posts list, blog index

**Related calculators**:
The calculators suggested beside a result, chosen by `relatedMap`.
_Avoid_: recommendations

### Submissions

**Submission**:
A form entry persisted server-side: newsletter signup, contact message or embed request. Each goes to a provider (Mailchimp, ConvertKit, Resend) and is also recorded in the submissions store.
_Avoid_: lead, entry

**Strict persistence mode** (`SUBMISSIONS_PERSISTENCE_STRICT`):
A setting under which a failure to record a Submission is surfaced as a failed response (`persistSubmissionOrFail`).
_Avoid_: strict mode

**Submissions store**:
The database holding Submissions: Postgres in production, SQLite locally, selected by `SUBMISSIONS_DB_DRIVER`.
_Avoid_: DB, backend

### Request handling

**Proxy** (`src/proxy.ts`):
The Next.js request interceptor that applies canonical-host and trailing-slash redirects, locale-prefix handling and security headers. The repo has no `middleware.ts`.
_Avoid_: middleware

## Relationships

- The **Catalog** lists many **Calculators**; each belongs to exactly one **Hub**.
- A **Chain** is an ordered list of **Chain steps**, each pointing at one **Calculator**.
- A **Saved result** belongs to one signed-in visitor and one **Calculator**.
- A **Shared result** is carried by a **Share token** and is not stored server-side, unlike a **Saved result**.
- An **Embed request** is a kind of **Submission**.

## Flagged ambiguities

- "Category" and "Hub" both group Calculators. A **Hub** is a page with its own route; a **Category** is only a label on a card.

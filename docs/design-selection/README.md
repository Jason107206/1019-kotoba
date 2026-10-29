# Design and multi-chapter selection review

Implemented on latest main `d675276` (the merged Lulu visual pass), retrieved on 2026-10-29. No Japanese learning data, record IDs, chapter memberships, question answers, grading, progress records or timed-practice rules were changed.

## Icon

[Compare the previous and revised icons at 16/32/48/96/180px, including circular masks](icon-comparison.png) · [HTML comparison](icon-comparison.html).

The old elliptical snout is replaced by a broad pink shape with rounded shoulders, two small nostrils and Lulu's gently notched lower contour. The ears are rounded, tilted outward and have filled pink inner areas. The rounded face, tiny eyes, large cheeks and warm-brown outline remain. Reference images 5 and 7 were inspected directly alongside the ten references from the preceding visual pass; no screenshot backgrounds or text are embedded in the icon.

One local SVG drives the navigation logo and SVG favicon. `scripts/build-lulu-icons.cjs` renders the 16px/32px PNG fallbacks, 180px Apple icon and 192px/512px PWA icons. Apple/maskable backgrounds are opaque and full bleed. Every character pixel, including both ears, fits within radius **201.5px** of the 512px canvas centre, inside the required **204.8px** maskable safe circle.

## Chapter and filter behavior

- Chapters use independent toggle chips. Selecting an individual chapter from All starts that selection; All clears individuals; removing the last individual restores All.
- An item belongs to the selection when any selected chapter matches its canonical memberships. Existing ID-based records are filtered once, so shared items cannot duplicate counts, rounds or progress.
- Group, topic, search, readiness and handwriting eligibility intersect with the chapter union. Available groups and topics follow the same source pool. An unavailable group/topic resets to its All option.
- Chapter choices reflect the section's supported inventory. Vocabulary, reference and handwriting offer their actual lexical chapters; Grammar offers 1–4; Pictures offers 1–3; Numbers offers 1, 3, 4 and 5. Generic number forms without assigned chapters remain available only under All chapters, as before.
- Example: Chapters **1, 3, 4 + Objects & belongings** currently yields **four playable records**, not an invented illustrative count. Reference pagination is independent of the complete practice pool.
- Timed practice remains Chapters 1–2, 15 minutes, 20 points. Mixed practice retains its existing sampling/scoring restrictions.

Schema 3 stores `learningScopes.*.chapter` and `numberSelection.chapter` as `["all"]` or sorted unique chapter strings. Old schema 2 single selections and schema 1 exclusive Numbers selections migrate safely. Compatibility strings remain accepted by filtering helpers and old routes. The storage envelope, canonical progress IDs and active timed deadline are preserved.

All selection dropdowns, including legacy filter renderers, now use the shared `selection-chips.js` implementation. Each group has a visible legend. Chapter digits sit under the bilingual Chapters label and have full translated accessible names. Every chip exposes `aria-pressed`; selected/unselected fills and borders differ without checkmarks. Targets are at least 44×44px. One tab stop per group, arrow keys, Home/End, and native Space/Enter activation support keyboards. Stable IDs preserve focus through redraws and language changes; activation preserves document scroll. Moving focus reveals chips above the action panel.

## Layout review

| Surface | Improvement |
| --- | --- |
| Overview/navigation | Smaller, consistently aligned illustrations and cards; clear selected drawer state; shared typography, border and spacing rhythm |
| Learning/filter pages | Labelled wrapping chips in one panel; unsupported choices omitted; current union, group/topic, search and actual count clearly stated |
| Practice entry | Compact bottom-sticky scope/action panel while choosing filters; it returns to its normal position and scrolls away when reading, so long chip groups do not delay the next action |
| Reference cards | Objects/actions beside the word and reading; shorter pages of 12; relationship/spatial scenes keep their complete wide composition and role labels |
| Numbers reference | Shared chip/selection toolbar, aligned table, and notes column shown only when the visible rows have notes |
| Exercises | Compact artwork leaves room for prompts/inputs; the student recall check button moves from y=732px to y=667px in the same 390px test view |
| Feedback/results | Consistent 16px corners, reserved artwork, smaller supportive poses, legible explicit outcomes/scores and unchanged stable variant selection |

The effective inventories remain **338 lexical records, 328 playable, 10 unresolved; 41 dialogue scenes; 18 sentence patterns; 978 existing practice questions**. Source fingerprints remain unchanged. Unresolved records are still reference-only.

## Screenshots

Mobile captures are actual 900px viewports, so the sticky panel and text can be assessed at display size. Companion content captures show the reference/scenes after scrolling. Desktop/tablet captures include the full page.

| Area | Current capture |
| --- | --- |
| Overview | [390px English](screenshots/overview-mobile.png) · [1440px Traditional Chinese](screenshots/overview-desktop.png) |
| Vocabulary: Chapters 1, 3, 4 | [360px selection](screenshots/vocabulary-multi-mobile.png) · [content after scrolling](screenshots/vocabulary-multi-mobile-content.png) |
| Word reference: same union | [1440px Traditional Chinese](screenshots/reference-multi-desktop.png) |
| Grammar: Chapters 1, 3, 4 | [768px Traditional Chinese](screenshots/grammar-multi-tablet.png) |
| Pictures: Chapters 2, 3 | [390px selection](screenshots/pictures-multi-mobile.png) · [complete scene](screenshots/pictures-multi-mobile-content.png) |
| Numbers: chapter unions | [390px English](screenshots/numbers-multi-mobile.png) · [1440px Traditional Chinese](screenshots/numbers-multi-desktop.png) |
| Recall/partial feedback | [390px prompt](screenshots/recall-mobile.png) · [360px Traditional Chinese feedback](screenshots/partial-feedback-mobile.png) |
| Sentence/handwriting | [1440px sentence practice](screenshots/sentence-desktop.png) · [390px clear handwriting pad](screenshots/handwriting-mobile.png) |
| Mixed/results | [1440px Mixed practice](screenshots/mixed-desktop.png) · [1440px timed results](screenshots/timed-results-desktop.png) |

Baselines were captured from an isolated, unchanged `git archive d675276 dist` preview: [desktop overview](screenshots/before-home-1440.png), [mobile Vocabulary](screenshots/before-vocabulary-menu-390.png), [mobile Numbers](screenshots/before-number-menu-390.png). Regenerate current captures with `node scripts/capture-design-selection.cjs` against the local server.

## Validation

- All README core/content/PWA checks passed, including source fingerprints, scoring, duplicate-token handling, progress compatibility and timed rules. [Machine-readable results](../../reports/design-selection-validation.json).
- `tests/chapter-chips.cjs`: **7,348** chapter/group/topic intersections, raw canonical membership comparisons, deduplication, search, exact launch pools, toggle/All semantics, fallback, schema migration/reload and retained progress.
- `tests/chapter-chips-browser.cjs`: **104** bilingual surfaces across **360/390/768/1440px**, with actual clicks, keyboard activation/focus, scroll preservation, background-state distinction, 44px targets, visible selection/actions, exact pools, back navigation, language changes, reload and maskable bounds.
- Existing browser suites: **140** navigation surfaces and **320** Lulu teaching/feedback surfaces, including handwritten self-check, partial/guided/revealed outcomes, image fallback, reduced motion and complete spatial scenes.
- Actual service-worker installation followed by network-disabled reload and all eight sections/local Lulu assets. Service worker regenerated with the new chip module, styles and icons.
- `git diff --check` passed.

Checks use local Chromium and Node. Physical touch/pen devices, native Safari and native PWA installation were not available; browser touch-target sizing, focus, layout, offline loading and mask safety were verified.

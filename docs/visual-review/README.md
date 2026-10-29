# Lulu visual review

Implemented against the effective runtime on main commit `cfc5a2602955e9a744594f328d341fec33a4fa2a`, including imports, repairs, aliases and exclusions. The application remains plain local JavaScript/CSS/SVG/PNG. Japanese content, canonical IDs, chapter/topic memberships, readiness rules, grading, stored progress and timing are unchanged.

## Review artifacts

- [Eight-pose contact sheet](feedback-contact-sheet.png) · [local HTML version](feedback-contact-sheet.html)
- [Teaching distinctions gallery](teaching-gallery.png)
- [Full before/after audit](../../reports/lulu-visual-audit.json): every one of 338 effective lexical records, 41 scenes, 18 patterns, all 42 icon keys, and screen-level findings.
- [Baseline audit](../../reports/lulu-visual-audit-before.json)
- [Atlas registry](../../reports/lulu-atlas-registry.json): exact file dimensions, pixel rectangles `[x,y,width,height]` and pose indices.
- [Measured alpha bounds/padding](../../reports/lulu-asset-bounds.json): transparent padding on each side of all feedback, teaching and action cutouts. Crops use nested SVG clipping so letterboxing cannot show a neighbour.

## Significant before/after changes

| Screen/item | Before | After |
| --- | --- | --- |
| Overview and brand | K mark; line icons; no Lulu | Lulu brand/favicon/install icons, welcome, eight different mode compositions and eight distinct task symbols |
| I/me; you | Waving or reused pose | Self-pointing; pointing at the other pig with consistent accessory colours |
| Books and writing tools | Repeated reading pose / broad emoji | Separate book, tabbed dictionary, magazine, spiral notebook, pencil, ballpoint and mechanical pencil props |
| Jobs and actions | Broad category/idle pose | Teaching, studying, examining, office work, experimenting, eating/drinking, waking/sleeping, listening, watching, photographing, finishing and resting scenes |
| Buying and travel | Category imagery | Two labelled roles, payment/object directions; movement with origin, destination and direction |
| Abstract words and named places | Generic books/category image | Explicit contextual scenes and existing meaning/explanation; no claim that a pig pose alone defines politeness, nationality or a suffix |
| Spatial scenes | Middle crop could omit a speaker/object | Full scenes; both participants, target object and distance; purple learner/speaker and cyan other participant cues |
| Number prompts | Broad symbols | Lulu presents the actual number/date/price/floor; clock hands reflect the actual time |
| Feedback | One happy and one encouraging pose; several text-only flows | Four correct and four supportive poses, stable per graded attempt, with explicit bilingual outcomes and scores |
| Handwriting | Text-only comparison/self-check | Companion outside the drawing surface, model-review pose and explicitly self-assessed result |

## Placements

| Area | Purposeful Lulu placements |
| --- | --- |
| Vocabulary | Student/card mode art and intro; exact lexical visuals in reference, recall and rebuild; single/partial feedback, retry and round results |
| Grammar & Sentences | Tile mode/intro, task and pattern cards, hints/model panels, question-word avatars, guided/independent feedback and results |
| Pictures & Dialogue | Two-character mode/intro, full spatial/location scenes, attention/offer/thanks/bow scenes, role-cued avatars, single and paired-form feedback |
| Numbers | Board mode/intro, question-specific clock/calendar/number/price/floor presenter, matching/rebuild/independent feedback and summaries |
| Kanji Writing | Writing-grid mode/intro, companion beside the clear pad, model reveal, self-check and self-assessed summary |
| Timed practice | Focused office Lulu/stopwatch intro and resume, compact calm in-round art, accurate score/outcome result |
| Mixed practice | Number card + word card + tiles composition, intro, independent/guided/revealed/partial feedback and round results |
| Word reference | Dictionary/index composition distinct from Vocabulary; exact lexical visuals and filtered no-results art |
| Shared | Sidebar/top-bar identity, welcome, first-use progress, real secure-word milestones, empty/retry/completion states, learning/about dialog, favicon and installed-app icons |

The existing happy and encouraging poses are retained. The **only new graded feedback poses** are seated clapping, proud with star badge, party hop, puzzled, gently disappointed, and determined book/pencil review. Other new action art is instructional and is not selected as a feedback variant.

`luluCommitFeedback()` chooses once when an answer is graded. Per-outcome rotation avoids consecutive repeats. Renders, language changes and repeated checks do not choose again. Fully correct independent attempts use the correct pool; wrong/partial attempts use support poses. Revealed/guided attempts use the review pose. Handwriting labels explicitly say the learner assessed it. Summaries retain the round's assistance/self-check status. The explicit result, score and check/cross remain visible without artwork. Controls precede expandable corrections; fixed-size artwork placeholders reserve space. Failed atlas loads use a local inline fallback and leave the question and controls available.

## All ten supplied references

References inform original clean cutouts; screenshot backgrounds, promotional words and watermarks are excluded. Their filenames/provenance stay in developer review material only.

| Reference | Meaningful use |
| --- | --- |
| 1 · fantasy costume | Rounded anatomy, broad snout and warm outlines in feedback sheet; costume omitted from teaching |
| 2 · mermaid/can | Seated proportions, short limbs and relaxed face in feedback sheet; tail/can omitted |
| 3 · party | Party hat, modest confetti and cheerful hop for completion |
| 4 · slumped on chair | Awake rest/chair action, clearly different from sleep |
| 5 · office clothing | Office work/employee and focused timed-practice identity |
| 6 · lying down | Side-lying sleeping pose, pillow and relaxed limbs |
| 7 · night | Soft face/cheeks in feedback; evening/night cues use an explicit moon in relevant time/sleep scenes |
| 8 · walking | Movement/transport pose with bag and directional diagrams |
| 9 · musical prop | Raised-hoof gesture and sitting proportions in action sheet; musical props are omitted because this database has no corresponding music lexical item |
| 10 · shy/concerned | Gentle, supportive retry expression and seated proportions; no shame/anger/crying |

The six-feedback sheet used references 1/2/3/7/10; the twelve-teaching sheet used 4/5/6/8/9; the additional exact-action sheet reused 4/5/8. All ten were supplied to image generation, then the local outputs were inspected. Exact educational labels, clocks, props and relationships remain HTML/SVG. No target Japanese is embedded in generated artwork or recall accessibility labels.

## Actual rendered screenshots

| Mobile | Tablet/desktop |
| --- | --- |
| [Overview · 390px English](screenshots/after-overview-390-en.png) | [Overview · 1440px Traditional Chinese](screenshots/after-overview-1440-zh.png) |
| [Self-pointing recall · 390px](screenshots/after-self-recall-390.png) | [Object reference · 1440px](screenshots/after-object-reference-1440.png) |
| [Partial result · 360px Traditional Chinese](screenshots/after-partial-feedback-360.png) | [Grammar · 768px Traditional Chinese](screenshots/after-grammar-768-zh.png) |
| [Complete spatial scenes · 390px](screenshots/after-spatial-scenes-390.png) | [Mixed practice · 1440px](screenshots/after-mixed-1440.png) |
| [Actual clock prompt · 390px Traditional Chinese](screenshots/after-number-clock-390.png) | [Timed result · 1440px Traditional Chinese](screenshots/after-timed-results-1440.png) |
| [Handwriting · 390px](screenshots/after-handwriting-390.png) | [Timed introduction · 360px](screenshots/after-timed-intro-360.png) |

Baseline captures: [mobile overview](screenshots/before-overview-390.png), [desktop overview](screenshots/before-overview-1440.png), [self recall](screenshots/before-self-recall.png).

## Validation and limits

Core/PWA/content/navigation checks, focused visual/feedback tests, alpha-bound inspection and Chromium workflows are recorded in [validation results](validation.md). The runtime inventory remains **338 records / 328 playable / 10 unresolved**, **41 canonical dialogue scenes / 47 forms**, **18 sentence patterns**. Unresolved readings remain excluded from practice; their artwork is available in Word reference without enabling them.

No requested local artwork is missing. Abstract meanings, proper names, grammar particles and politeness still need their existing textual explanation; visuals provide context rather than inventing distinctions. Chromium was checked in both languages at 360/390/768/1440px, including reduced motion, keyboard focus, fallback, exact scopes, timer persistence and handwriting self-check. Native iOS/Safari/Android installation and physical touch/pen devices were not available for this review. The app uses no recognition or image-generation service at runtime.

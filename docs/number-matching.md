# Number Content, Matching and Rebuild

Numbers opens a content page with All / By Category / By Chapter controls, visual examples, hiragana readings, accepted variants, and concise bilingual pronunciation notes. Twelve examples appear per page. The Matching and Rebuild buttons practise the entire selected scope, including examples on other pages. Returning from either game restores the selection, page and filter scrolling.

The shared bank still contains 502 unique numerical expressions across all ten types: 81 whole numbers, 107 dates, 30 fractions, 46 ages, 30 floors, 125 times, 7 weekdays, 26 prices, 20 relative-time expressions and 30 decimals. Original word IDs, readings, progress and chapter memberships remain intact.

## Chapter scopes

Chapter selection now includes rule-supported values instead of only printed example values. Each rule records the IDs of its source vocabulary and requires a common chapter membership among those records. Memberships inferred from reading rules are recorded separately in each question’s `chapterRules` field; existing direct-example metadata remains intact.

| Chapter | Scope | Expressions |
| --- | --- | ---: |
| 1 | Ages supported by 歳 / 何歳, within the verified 1–99 scope | 45 |
| 3 | Positive cardinal numbers using 百 / 千 / 万, floor counters and yen prices | 136 |
| 4 | Hours, minutes, AM/PM, weekdays and existing relative-day words | 137 |
| 5 | Month/day readings and existing week/month/year expressions | 116 |

The chapter scopes cover 434 expressions. The remaining 68 are available under All and By Category: fractions, decimals, supplemental multi-week offsets, zero and the 100-year age expression. No chapter is assigned to a type without a database basis. In particular, no unsupported Chapters 2 or 6 scope is created. Both games and the content browser call the same selection function.

The current verified integer range is 0–99,999,999; age and floor exercises remain within their tested bounds. Month/day calendars exclude invalid dates and omit leap day without a year. Fraction presentation is not reduced, and decimal strings preserve every displayed digit, including zeros. Midnight/noon AM/PM uses 午前0時/午後0時 readings to avoid ambiguity.

## Reconstruction

Matching uses meaningful reading segments: place-value groups, month/day names, counter units, periods, fraction parts and individual decimal digits. Sound contractions stay attached to their counters. For example, 125 uses `ひゃく / にじゅう / ご`, and 15/100 uses `ひゃく / ぶんの / じゅう / ご`.

Rebuild uses individual hiragana characters. Small kana remain separate characters; Unicode combining marks stay attached to their kana after NFC normalization. Repeated segments and characters keep separate tile identities. Accepted source readings contribute the extra tiles needed to assemble those variants.

Both modes use the same ordered-text validator, independently of tile identity. Learners can return tiles, undo, clear, check, or reveal and mark for review. The canonical answer and pronunciation note appear only at feedback. Happy and encouraging Lulu cards, scoring, manual Next, retry and results follow the existing game behavior. Matching progress remains in `numberMatching`; Rebuild has its own `numberRebuild` namespace.

## Shared game layout

Every game, including results and the mock, uses the same non-sticky app bar and content column:

- Horizontal padding: 16px below 600px, 24px on larger screens.
- Controls: 48px touch targets with 16px top padding.
- Title and round counter: stacked with a 4px gap.
- Progress: 8px below the control row, at the bottom edge of the bar.
- Game content: starts 24px below the progress bar.

The former absolute counter offsets, narrower Dialogue column, duplicate Number top padding and game footer are removed. Breadcrumbs and “correct so far” remain absent from games. The site footer and sidebar footer note remain on content and other non-game pages. Neither is rendered in games. Completion counts remain independent of accuracy.

## Verification

- `node tests/number-matching.cjs`: reading exceptions, every question and accepted variant in both modes, database-backed chapter coverage, repeated and Unicode tiles, ordered validation, wrong/revealed answers, retries, navigation and scope preservation.
- `node tests/verify.cjs`, `node tests/chapters-3-4.cjs`, `node tests/chapter-import.cjs`: existing scoring, persistence, source rows, memberships and import repeatability.
- `CHROMIUM_PATH=/usr/bin/chromium node tests/number-content-browser.cjs`: both languages at 320, 390, 768 and 1440px; content filters and pagination, all scopes and both modes, actual tile taps, undo/reset/return, variants, manual results/retry, back navigation, app-bar geometry and footer visibility on every game and results route.
- `node scripts/build-pwa.cjs` and `node tests/pwa.cjs`: reproducible offline assets.

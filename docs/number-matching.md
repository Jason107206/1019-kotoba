# Dialogue and Number Matching update

Dialogue now contains 48 expressions in Introduction, Polite expressions, Replies, This and That, and WH-words. Numbers/floors, time, days/weekdays, activities, schedules/events, and places no longer appear as Dialogue categories or exclusive entries in All, By Chapter, or game pools. Regrouped questions and place demonstratives retain their IDs, conversations and chapters. All 338 Vocabulary records remain intact; the underlying chapter lesson registry is retained for other functions.

Dialogue exercises render the source conversation in its actual order. In Getting someone’s attention, the learner’s inline blank/answer comes first and the listener’s はい follows. A response that repeats the missing Japanese phrase stays masked until grading. Object exercises call the same `demonstrativeScene` as Content, retaining the book, Lulu positions, distance cues and speaker perspectives throughout answering and feedback. The attention guide illustration, which contains あのう, is not shown as an answer-revealing game scene.

Every game uses one tracker in the app bar: a compact counter plus a bar on its bottom edge. Progress counts completed rounds, including wrong or revealed answers. Vocabulary, Rebuild, Kanji Writing, Sentence Rebuild, Dialogue, Number Matching and the mock share this component. The mock updates completion as answers are entered. Scoring, result pages and manual advancement remain separate from completion.

## Number Matching coverage

The separate Number Matching database has 502 questions. It reuses existing tables, vocabulary readings and chapter lesson values; validated rules supply additional combinations. No expression type from the request is unsupported.

| Type | Questions | Prompt |
| --- | ---: | --- |
| Whole numbers | 81 | Large numeral with thousands separators |
| Dates | 107 | Month/day calendar |
| Fractions | 30 | Numerator over denominator, with localized label |
| Ages | 46 | Person symbol and age |
| Floors | 30 | Floor indicator |
| Clock times | 125 | Digital time and explicit AM/PM |
| Weekdays | 7 | Highlighted calendar strip |
| Money | 26 | Amount and explicit Japanese yen / JPY label |
| Relative time | 20 | Timeline with Today and highlighted target |
| Decimals | 30 | Exact displayed decimal digits |

English and Traditional Chinese labels share the existing typography, chips, answer buttons and feedback components. Games use an open layout with happy/encouraging Lulu feedback and manual Next, New round and retry controls. Type and chapter selections persist; invalid or empty selections recover to a valid scope.

## Reading rules and provenance

- Integer composition supports 0–99,999,999 using existing hundred/thousand exceptions and 万 grouping. Prices append えん; clocks include ごぜん or ごご when AM/PM is displayed.
- Ages include いっさい, はっさい, contracted tens and はたち. Floors reuse the source counter readings and contractions. Hours retain よじ, しちじ and くじ. Minutes retain their ふん/ぷん distinctions and contractions. English 12 AM/PM is read as 午前0時/午後0時 (ごぜんれいじ/ごごれいじ), avoiding ambiguity at midnight and noon.
- Dates reuse supplied CSV readings and implement irregular month/day forms, including しがつ, しちがつ, くがつ, ついたち, よっか, はつか, and the 14/17/19/24/27/29 forms. Invalid calendar dates are excluded; leap day is omitted because no year is shown.
- Fractions read the denominator, then ぶんの, then the numerator. Displayed fractions are never reduced.
- Decimals use strings, preserving the order, leading zero digits after the point, and trailing zeros. Every fractional digit is read separately.
- Relative time reuses the source day/week/month/year vocabulary; supplemental multi-week offsets use verified 週間前/週間後 composition.
- Chapter metadata is attached only to complete values present in existing vocabulary, numerical tables or lesson scenes. Other combinations are General practice. Fractions, decimals, generated month/day combinations and supplemental multi-week offsets have no fabricated chapter assignment.
- Four distinct same-type readings appear per round. Nearby values or similar structures are preferred as distractors. Alternate readings of the correct value are not offered as wrong choices. Prompt markup and accessibility labels never expose the hiragana answer.

`NUMBER_RULES`, `NUMBER_QUESTIONS`, `sourceIds`, and `chapters` are defined in `dist/numbers.js`. They do not alter Vocabulary or the repeatable CSV import.

## Verification

- `node tests/number-matching.cjs`: all 502 pools/choices, irregular readings, exact fractions/decimals, unsupported-range guards, provenance, filters, retries, completion tracking, answer non-disclosure, removed-category recovery, and learner-first turns.
- `node tests/verify.cjs`: existing scoring, persistence, navigation, keyboard behavior, shared games and the original mock.
- `node tests/chapters-3-4.cjs` and `node tests/chapter-import.cjs`: original records, readings, memberships and import repeatability remain intact.
- `CHROMIUM_PATH=/usr/bin/chromium node tests/dialogue-numbers-browser.cjs`: 384 layout checks in both languages at 320, 390 and 1440px, including all numerical types, actual mock input events, app-bar Update controls, correct/wrong feedback, inline answering and the shared object scenes.
- `node scripts/build-pwa.cjs` and `node tests/pwa.cjs`: the new function is included in the offline asset cache.

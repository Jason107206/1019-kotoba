> Updated by the Chapters 1–6 CSV merge: question conversations now appear under WH-words; place demonstratives appear under This and That; the Dialogue locations category and Replies sympathy conversation have been removed. The independent Chapter 4 sympathy expression remains in the library. See [the current audit](../reports/chapter-import.md).

# Chapters 3–4 source coverage and validation

## Source boundaries

The two user-supplied scans were visually inspected, including the printed page numbers, printed Japanese spellings and readings. Handwritten answers were not used as authoritative text.

| Chapter | Printed pages | Numbered vocabulary rows | Study forms after variants, expressions and related words | New dialogue scenes |
| --- | --- | --- | --- | --- |
| 3 | 48–57, first attachment | 36 of 36 | 54 | 24 |
| 4 | 60–69, first five PDF pages of second attachment | 48 of 48 | 62 | 25 |

The repeated Chapter 3 scan in the second attachment is not counted again. Printed pages 58–59 are cumulative Review A and contribute no new Chapter 4 entries. All requested printed material was readable.

`CHAPTER_SOURCE_ROWS` in `dist/chapter-content.js` records numbered rows and separately listed expressions/related vocabulary. The tests require every row from 1–36 and 1–48. Chapter 3 has 39 numbered forms after splitting the toilet pair, optional お in お国, and 階 readings; eight expression forms and seven related words bring it to 54. Chapter 4 has 50 numbered forms after splitting 分 and 晩／夜, three conversation words, 大変ですね from the exercises, and eight related words, bringing it to 62.

そちら is shared between both chapters with one stable ID. Thus 116 chapter memberships add 115 unique entries, for 211 entries in the complete word reference. Vocabulary has 173 study forms: its previous 58 plus the 115 new entries. All 84 numbered rows, the conversation expressions, and related vocabulary are included in Vocabulary Recall and Rebuild.

## Language and learning decisions

- Existing fields (`jp`, `kana`, `en`, `zh`, `ch`, `group`, `c`) are retained. `chapters` permits shared membership, and `sources`/`printedPage` provide provenance. English and Traditional Chinese meanings accompany each form.
- Optional forms such as 国／お国 and 見せてください／～を見せてください have explicit prompts. Suffixes 階・円・時・分, particles から・まで・と and question patterns are labelled by use rather than presented as ordinary nouns. 分 and 階 reading prompts specify their numeric context.
- Printed katakana spelling is preserved, with hiragana readings for the existing Recall convention. Kana-only source entries remain kana-only; they do not acquire invented kanji answers. Repeated pitch-accent depictions of おととい and きのう remain one word each.
- Chapter 3 location words are distinct from Chapter 2 object demonstratives. Lulu scenes label the speaker and listener; reception placement distinguishes near the speaker, near the listener, and far from both. Floors, product origins and prices are rendered as diagrams or UI text.
- Chapter 4 covers all six verbs, time and weekday questions, hours/minutes/half past, 午前／午後, routines, four polite verb forms, specific times with に, relative expressions without に, ranges with から／まで, noun joining with と, telephone numbers, and 大変ですね. Notes state that に with weekdays is optional.
- Clocks derive both hand angles and numeric labels from the same hour/minute values used to generate answers. Calendar and schedule values are explicit UI data. Irregular hundreds/thousands, floors, hours and minutes have reading reference tables. The textbook readings remain the primary targets; valid third-floor and stretched/unstretched telephone digit readings are accepted without ignoring order, repeated digits, or small kana.
- The 49 new exchanges are original, short teaching conversations within the supplied chapter scope. They are not reconstructed listening transcripts. Guide conversations are fully expanded with speaker labels, translations, consistent target highlighting and notes. Games hide answer translations, highlights and corrective notes until grading.

## Navigation, games and compatibility

Vocabulary and Dialogue have Chapters 1–4, All and category selections. Shared vocabulary appears once in All. Both Dialogue games use the selected lesson set, and both Vocabulary games use the selected vocabulary set; restarts and missed-item practice retain that scope. Authored dialogue distractors have enough situational context to produce one intended answer. Existing chip labels/styles/scroll retention, app bar ordering, scoring, manual Next, coloured feedback and Lulu reactions are retained. Game pages remain free of breadcrumbs.

Kanji Writing automatically includes the new printed kanji-bearing entries. Sentence Rebuild (50 puzzles, 16 groups) and the timed mock retain their original Chapter 1–2 assessment scope. No original IDs, localStorage key, content migration revision or active mock deadlines changed.

## Verification

- `node tests/verify.cjs`: complete existing regression suite plus expanded vocabulary/dialogue populations; scoring, strict kana, repeats/order, retries, language changes and original assessment behaviour pass.
- `node tests/chapters-3-4.cjs`: all source rows and variants, shared membership, chapter/category filtering, every new dialogue in both games and languages, exact clock geometry, alternative readings, hidden pre-grading feedback, and seeded Chapter 1–2 progress/active mock compatibility pass.
- Browser matrix in `tests/chapters-layout.html`: **1,530 checks passed**, zero overflow/clipping/undefined-content failures, at **360px, 390px and 1200px** in English and Traditional Chinese. Includes every new guide, every Matching/Rebuild question before and after grading, Vocabulary content, and long Recall/Rebuild/Kanji answers. Large telephone tile banks and representative clock/location scenes were also visually inspected.
- The optional existing browser scripts have updated counts and four-chapter cases. They were not run as standalone Playwright scripts in this environment; the browser matrix above and the Node regression suites were run.
- Offline assets are regenerated with `node scripts/build-pwa.cjs` and checked with `node tests/pwa.cjs`. The Pages workflow now also runs the Chapter 3–4 suite.

To reproduce the browser matrix on a local test server, copy `tests/chapters-layout.html` to `dist/qa-layout.html`, open that page, and choose **Run layout checks** after the app frames load. It runs in the test origin and exercises saved progress there; use a disposable local browser profile. Remove `dist/qa-layout.html` before rebuilding or publishing the offline cache. The fixture is excluded from the deployed app.

## Remaining source gap

The scans do not supply listening audio or a full transcript for the listening questions: Chapter 3 printed p.56, tracks 1-T29/1-T30; Chapter 4 printed p.68, tracks 2-T08–2-T11. No answers or transcripts are invented for those recordings. There are no unreadable or missing requested printed vocabulary rows.

# Kotoba — Chapters 1–2

Buildless study game for GitHub Pages. `dist/` is the entire deployable application.

## Source boundaries

Transcribed and visually checked against the user-provided textbook extract:
- PDF p.1 (printed pp.28–29): Chapter 1, 21 main rows, 6 expressions, 17 related words.
- PDF p.6 (printed pp.38–39): Chapter 2, 37 main rows, 2 dialogue expressions, 7 practice expressions.
- Grammar: Chapter 1 PDF pp.2–5; Chapter 2 pp.7–10.
- Assessment format: Chapters Quiz Information Sheet, Chapter 1–2 section only.

The selected vocabulary has 96 separate recall forms after splitting polite pairs and optional forms. Seven fictional company/institution names are excluded at the user’s request. There are 62 main-vocabulary forms, 10 country names and 24 expression forms. Named fictional characters in sentence puzzles are replaced with syllabus pronouns and generic roles; all 50 puzzles and 16 pattern groups are retained.

Column B follows the sheet's literal Hiragana instruction, including hiragana readings for printed katakana loanwords. Original spelling is retained on study cards and in the reference bank. Column C only accepts the printed Japanese vocabulary-column form; blank and alphabet-only forms use X, following the sheet. Do not introduce alternative kanji for words printed only in kana. Placeholder tilde is ignored in answer grading. Traditional Chinese meanings are labels, not Japanese answer variants.

The 50 sentence puzzles cover all six Exercise A structures in each chapter, the chapter sentence patterns and examples, and Chapter 1 introductions. Sixteen named groups are teaching labels, not an additional claim about exam questions. Mock quizzes sample 5 main-vocabulary forms from each chapter and five different grammar groups (2 from Chapter 1, 3 from Chapter 2), allowing 15 minutes and scoring 10 + 10 marks.

## Implementation

No network dependencies, accounts or analytics. Progress and an active mock are stored in browser localStorage. A reload retains the original mock deadline. Optional speech synthesis only works with an installed Japanese voice. It is a study aid, not part of the assessment.

## Verification

Run `node tests/verify.cjs` for meaningful content, scoring, shuffle, session, timer configuration and persistence checks. Run `node --check dist/app.js` for syntax. Browser visual QA was unavailable in this environment; responsive CSS and semantic controls are supplied.

## GitHub Pages

The `Publish GitHub Pages` workflow runs the verification suite, then publishes only `dist/`. Use GitHub Actions as the repository's Pages build source. Pushes to `main` redeploy automatically. All asset paths are relative, so project Pages paths work without a custom domain.

Original uploaded PDFs, original hosting configuration, and credentials are not included in this repository.

## Hiragana groups

Choose **Hiragana groups** in the menu. Tap a character to see syllabus words beginning with it, hide meanings for recall, or practise that group in cards, written Part A, or kanji matching. Voiced characters have separate groups; katakana words use their hiragana reading. Empty groups are disabled. All 96 forms remain within the original vocabulary bank.

## Kanji display

Study cards, hiragana groups and the word reference show a kanji field only when the supplied form contains kanji. Kanji Match excludes kana-only entries and uses four kanji-bearing choices, including when started from a hiragana group. Written Part A and the mock retain the information sheet’s required X answers.

The repository root also contains a relative entry page for branch-based GitHub Pages publishing. It opens `dist/`; the custom Actions workflow continues to publish the contents of `dist/` directly. Both publishing methods serve the same game.

## Matching menus and simulated dialogue

Matching offers Kanji Match, five Question Words, and seven This/That & Attention words. All activities use the original quiz-page vocabulary. The additional requested time, price and classroom expressions have been removed.

This/That uses precise SVG scenes of a speaker, listener and book. The book appears near the speaker, near the listener, or far from both. A sentence blank distinguishes stand-alone これ/それ/あれ from noun-prefixed この/その/あの. The あのう scene shows the speaker getting the listener’s attention. SVG titles and captions provide accessible descriptions. An expandable visual guide compares the three locations.

Dialogue offers four-choice expressions or hiragana construction for 14 syllabus scenes. Small-kana combinations stay together; small っ stays separate. Duplicate tiles are tracked by position, with correctness based on the resulting text. Each scene has feedback and missed-item replay. Equivalent thank-you variants are excluded as distractors in the same question. Activity progress is stored independently.

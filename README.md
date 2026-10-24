# Kotoba — Chapters 1–2

Buildless study game for GitHub Pages. `dist/` is the entire deployable application.

## Source boundaries

Transcribed and visually checked against the user-provided textbook extract:
- PDF p.1 (printed pp.28–29): Chapter 1, 21 main rows, 6 expressions, 17 related words.
- PDF p.6 (printed pp.38–39): Chapter 2, 37 main rows, 2 dialogue expressions, 7 practice expressions.
- Grammar: Chapter 1 PDF pp.2–5; Chapter 2 pp.7–10.
- Assessment format: Chapters Quiz Information Sheet, Chapter 1–2 section only.

The selected vocabulary has 96 separate recall forms after splitting polite pairs and optional forms. Seven fictional company/institution names are excluded at the user’s request. There are 62 main-vocabulary forms, 10 country names and 24 expression forms. Named fictional characters in sentence puzzles are replaced with syllabus pronouns and generic roles; all 50 puzzles and 16 pattern groups are retained.

Column B follows the sheet's literal Hiragana instruction, including hiragana readings for printed katakana loanwords. Original spelling is retained in the word reference. Column C only accepts the printed Japanese vocabulary-column form; blank and alphabet-only forms use X, following the sheet. Do not introduce alternative kanji for words printed only in kana. Placeholder tilde is ignored in answer grading. Traditional Chinese meanings are labels, not Japanese answer variants.

The 50 sentence puzzles cover all six Exercise A structures in each chapter, the chapter sentence patterns and examples, and Chapter 1 introductions. Sixteen named groups are teaching labels, not an additional claim about exam questions. Mock quizzes sample 5 main-vocabulary forms from each chapter and five different grammar groups (2 from Chapter 1, 3 from Chapter 2), allowing 15 minutes and scoring 10 + 10 marks.

## Implementation

No network dependencies, accounts or analytics. Progress and an active mock are stored in browser localStorage. A reload retains the original mock deadline.

## Verification

Run `node tests/verify.cjs` for meaningful content, scoring, shuffle, session, timer configuration and persistence checks. Run `node --check dist/app.js` for syntax. Browser visual QA was unavailable in this environment; responsive CSS and semantic controls are supplied.

## GitHub Pages

The `Publish GitHub Pages` workflow runs the verification suite, then publishes only `dist/`. Use GitHub Actions as the repository's Pages build source. Pushes to `main` redeploy automatically. All asset paths are relative, so project Pages paths work without a custom domain.

Original uploaded PDFs, original hosting configuration, and credentials are not included in this repository.

## Vocabulary sections

Every vocabulary form belongs to one of 12 categories by meaning and use: people and forms of address, jobs and roles, places, countries and nationality, questions and age, this/that, objects, food and drinks, languages, introductions and greetings, polite expressions and thanks, or replies and reactions. Polite and optional variants stay in the same category. The word reference groups its rows by category and supports chapter, first-hiragana and progress filters. The Write category menu, filters and word labels use the same category definitions. The original 62 printed core forms remain eligible for mock quiz sampling. The word reference can also start a writing round for its filtered and searched selection.

## Kanji display

The word reference shows a kanji field only when the supplied form contains kanji. Kanji Match excludes kana-only entries and uses up to four choices from the same word category, without adding unrelated distractors. Write and the mock retain the information sheet’s required X answers.

The repository root also contains a relative entry page for branch-based GitHub Pages publishing. It opens `dist/`; the custom Actions workflow continues to publish the contents of `dist/` directly. Both publishing methods serve the same game.

## Matching menus and simulated dialogue

Matching opens three choices: Kanji Match, Question Words, and This/That. Kanji Match then offers all words, one chapter, or one category using the same selection component as Write. Its counts, prompts and selectable categories include only entries with taught kanji; categories without any are hidden. Restarts keep the selected set, and missed-item rounds keep only the missed prompts. Question Words has five words; This/That includes the six pointing words and あのう. All activities use the original quiz-page vocabulary.

Correct answers in Matching, Write, Dialogue and Rebuild show a live 2 → 1 countdown, then advance. Write requires full credit in both columns. Incorrect or partial answers wait for Next. The last correct answer opens the round results. Manual advancement, opening the syllabus, or leaving the page cancels the pending advance. The timed mock keeps its existing submission flow.

This/That uses precise SVG scenes of a speaker, listener and book. The book appears near the speaker, near the listener, or far from both. A sentence blank distinguishes stand-alone これ/それ/あれ from noun-prefixed この/その/あの. The あのう scene shows the speaker getting the listener’s attention. SVG titles and captions provide accessible descriptions. Question Words and This/That each open a guide page before practice.

Dialogue offers related expression choices or hiragana construction for 14 syllabus scenes. Choices come from the same communicative category; hiragana tiles contain only the target expression’s units. The visually similar あの / あのう pair is also used as a related contrast in This/That. Small-kana combinations stay together; small っ stays separate. Duplicate tiles are tracked by position, with correctness based on the resulting text. Each scene has feedback and missed-item replay. Equivalent thank-you variants are excluded as distractors in the same question. Activity progress is stored independently.

## Overview

Overview has one responsive study-card navigation in the order Matching, Dialogue, Write, Rebuild, Mock quiz, All words. It uses the same mode names and icons as the other pages, with no repeated activity cards or promotional banners. Vocabulary practice and secure counts share one progress panel alongside sentence-group progress and the best mock score. An active mock changes its existing card action to Resume.

# Kotoba — Chapters 1–2

Buildless study game for GitHub Pages. `dist/` is the entire deployable application.

## Source boundaries

Transcribed and visually checked against the user-provided textbook extract:
- PDF p.1 (printed pp.28–29): Chapter 1, 21 main rows, 6 expressions, 17 related words.
- PDF p.6 (printed pp.38–39): Chapter 2, 37 main rows, 2 dialogue expressions, 7 practice expressions.
- Grammar: Chapter 1 PDF pp.2–5; Chapter 2 pp.7–10.
- Assessment format: Chapters Quiz Information Sheet, Chapter 1–2 section only.

The selected vocabulary has 96 separate recall forms after splitting polite pairs and optional forms. Seven fictional company/institution names are excluded at the user’s request. There are 62 main-vocabulary forms, 10 country names and 24 expression forms. Named fictional characters in sentence puzzles are replaced with syllabus pronouns and generic roles; all 50 puzzles and 16 pattern groups are retained.

Column B follows the sheet's literal Hiragana instruction, including hiragana readings for printed katakana loanwords. Original spelling is retained in the word reference. Column C accepts the printed Japanese vocabulary-column form. In Write, forms without kanji accept either a blank C field or X; the timed mock follows the sheet and requires X. Do not introduce alternative kanji for words printed only in kana. Placeholder tilde is ignored in answer grading. Traditional Chinese meanings are labels, not Japanese answer variants.

The 50 sentence puzzles cover all six Exercise A structures in each chapter, the chapter sentence patterns and examples, and Chapter 1 introductions. Sixteen named groups are teaching labels, not an additional claim about exam questions. Mock quizzes sample 5 main-vocabulary forms from each chapter and five different grammar groups (2 from Chapter 1, 3 from Chapter 2), allowing 15 minutes and scoring 10 + 10 marks.

## Implementation

No network dependencies, accounts or analytics. Progress and an active mock are stored in browser localStorage. A reload retains the original mock deadline.

## Verification

Run `node tests/verify.cjs` for meaningful content, scoring, shuffle, session, timer configuration and persistence checks. Run `node --check dist/app.js` for syntax. Verification uses Node checks for game behavior, bilingual navigation and offline support; browser tests are not required.

## GitHub Pages

The `Publish GitHub Pages` workflow runs the verification suite, then publishes only `dist/`. Use GitHub Actions as the repository's Pages build source. Pushes to `main` redeploy automatically. All asset paths are relative, so project Pages paths work without a custom domain.

Original uploaded PDFs, original hosting configuration, and credentials are not included in this repository.

## Vocabulary sections

Every vocabulary form belongs to one of 12 categories by meaning and use: people and forms of address, jobs and roles, places, countries and nationality, questions and age, this/that, objects, food and drinks, languages, introductions and greetings, polite expressions and thanks, or replies and reactions. Polite and optional variants stay in the same category. The word reference groups its rows by category and supports chapter, first-hiragana and progress filters. Vocabulary Recall and Vocabulary Rebuild use the same category definitions. The original 62 printed core forms remain eligible for mock quiz sampling. The word reference can also start a writing round for its filtered and searched selection.

## Kanji display

The word reference shows a kanji field only when the supplied form contains kanji. Write and the mock retain the information sheet’s required X answers.

The repository root also contains a relative entry page for branch-based GitHub Pages publishing. It opens `dist/`; the custom Actions workflow continues to publish the contents of `dist/` directly. Both publishing methods serve the same game.

## Rebuild and simulated dialogue

Overview has one Vocabulary mode combining Recall and Rebuild. Choose all 96 words, a chapter, or one of 12 categories, then open the shared content page. The page follows Dialogue’s layout: a dropdown, the selection’s title and description, Recall / Rebuild buttons, and a vertical illustrated card for every selected word. Cards include taught spelling, hiragana, Chinese/English meanings and any usage notes. All words have an accessible visual; demonstratives show object positions relative to the speaker and listener. The dropdown switches between all words, either chapter and every category. Both practice buttons use the current selection; restarts and missed-item rounds preserve it. Breadcrumbs return to that selection’s content or parent menu. Recall and Rebuild retain their separate saved progress. Sentence Rebuild remains a separate Overview mode. Build each hiragana reading from shuffled kana tiles mixed with similar alternatives: voicing, small kana, long vowels and visually similar forms. For example, the bank for そうじ includes そ, ぞ, う, じ, し and っじ. All relevant alternatives are included, and repeated target kana have separate tiles. Small-kana combinations stay together; placeholder ～ is omitted. Kana-only words use their meaning as the prompt, while kanji-bearing words show their taught spelling. Correctness depends on the assembled reading, with manual Next, missed-item replay and independent saved progress. Sentence Rebuild retains the existing 50 puzzles and pattern filters. The standalone Matching mode has been removed.

Breadcrumbs show Kotoba, the current mode and the selected vocabulary set or activity; Dialogue omits its category level. Ancestors are clickable; Back links are removed. The Update control sits immediately left of the language switch with the same pill styling, and retains explicit update/reload behavior across page renders.

Vocabulary Recall, Dialogue and Rebuild keep the answer and feedback visible until the user selects Next. After the last answer, Next opens the round results. The timed mock keeps its existing submission flow.

WH-words uses five syllabus question words: だれ, どなた, なんさい, おいくつ and なん. Illustrated guides explain standard and polite forms, and the game asks learners to complete a sentence blank. The age suffix さい is excluded because it is not a question word. The category opens its guide before practice and returns to Dialogue.

Dialogue shows a dropdown for Introduction (5 scenes), Polite expressions (5 scenes), Replies (4 scenes), and WH-words (5 visual questions), with the selected guide and practice buttons directly below it. The selected category’s title and description appear directly under the dropdown. The first three categories offer both expression game modes; WH-words keeps its illustrated guide and sentence-based choice game. Each expression category opens a content page with expression guides, usage explanations, and the Matching / Build with hiragana buttons. Both games use only that category’s scenes; restarts and missed-item rounds retain the category, and Back returns to its guide before the category menu. Across the three categories, Dialogue offers related expression choices or hiragana construction for all 14 syllabus scenes. Choices come from the same communicative category; hiragana tiles contain only the target expression’s units. Small-kana combinations stay together; small っ stays separate. Duplicate tiles are tracked by position, with correctness based on the resulting text. Each scene has feedback and missed-item replay. Equivalent thank-you variants are excluded as distractors in the same question. Activity progress is stored independently.

## Overview

Overview has one responsive study-card navigation in the order Dialogue, Vocabulary, Sentence Rebuild, Kanji Writing, Mock quiz, All words. It uses the same mode names and icons as the other pages, with no repeated activity cards or promotional banners. Vocabulary practice and secure counts share one progress panel alongside sentence-group progress and the best mock score. An active mock changes its existing card action to Resume.

## Visual expression guides

Dialogue content pages show separate expression cards stacked vertically, with illustrated SVG scenes. Introduction, Polite expressions and Replies have a visual scene for each expression in both the guide and the choice/hiragana-building games; WH-words has five illustrated question-word cards. Choice and hiragana-building buttons sit below the category dropdown, above the expression guides. Each scene has an accessible description.

## Kanji Writing and Vocabulary Recall

Recall is one of the two practice options within Vocabulary; it still checks typed hiragana and the printed kanji form, accepting blank or X for no-kanji forms. Its progress stays intact. Kanji Writing is a separate mode with all/chapter/category selection restricted to taught kanji-bearing forms. A word’s hiragana and meaning prompt one drawing pad per kanji, while any surrounding kana remain provided. Mouse, touch and pen input use pointer events; Undo and Clear edit the strokes. Revealing the model locks the pads and offers self-check buttons. Handwriting is self-assessed, with independent progress and missed-item replay; it does not use automatic character recognition. Drawings survive language changes and redraws during the current question.

## Progressive Web App

Kotoba includes an installable web app manifest, 192px/512px icons, a maskable icon and an Apple touch icon. On the first visit, a dismissible installation invitation appears. Install opens the native browser prompt when available, otherwise shows browser-specific instructions. Not now and dismissal are remembered, and the invitation is skipped in installed standalone mode. An Install app button remains available when the browser offers installation. On iPhone/iPad, use Safari’s Share → Add to Home Screen. Installation and offline support require HTTPS (GitHub Pages) or localhost. Open the deployed app online once to finish caching; the installed app then opens offline with every study mode, including Kanji Writing. Progress continues to use browser localStorage.

The manifest, start URL, service worker and assets use relative paths, supporting both the GitHub Actions deployment at the project root and branch publishing under `dist/`. In branch publishing, the installed app starts directly at `dist/`, so its offline launch does not depend on the root redirect.

The service worker precaches a complete release, including all scripts, CSS, icons and the manifest. Each release’s cache revision derives from the content of all deployed assets and the worker template. Cache cleanup is restricted to this app’s own scope. Updates wait until the app is closed, or until the user selects Update; active quizzes are never reloaded automatically. Install/update button labels follow the interface language.

After changing anything in `dist/`, regenerate the offline worker before testing or publishing:

```sh
node scripts/build-pwa.cjs
node tests/pwa.cjs
node tests/verify.cjs
```

The Pages workflow runs these steps automatically. `tests/pwa.cjs` verifies manifest/icon sizes, asset coverage, generated-worker freshness, offline fetch behavior, both Pages paths, scope isolation, install prompts and explicit update activation without browser tests.

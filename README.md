# Kotoba — Chapters 1–4

Buildless study game for GitHub Pages. `dist/` is the entire deployable application.

## Chapters 3–4

Vocabulary and Dialogue now include Chapters 3 and 4, with 84 numbered textbook entries plus conversation expressions and related vocabulary. Optional spellings/readings produce 54 Chapter 3 forms and 62 Chapter 4 forms; shared そちら is stored once with both memberships. There are 173 Vocabulary forms and 74 Dialogue scenes/questions in All, including 49 new original conversations.

See [source coverage and validation](docs/chapters-3-4.md) for page boundaries, reading decisions, game coverage and missing listening audio. Sentence Rebuild and the timed mock retain the existing Chapter 1–2 assessment scope. Existing progress keys and active mock deadlines are preserved.

## Original Chapter 1–2 source boundaries

Transcribed and visually checked against the user-provided textbook extract:
- PDF p.1 (printed pp.28–29): Chapter 1, 21 main rows, 6 expressions, 17 related words.
- PDF p.6 (printed pp.38–39): Chapter 2, 37 main rows, 2 dialogue expressions, 7 practice expressions.
- Grammar: Chapter 1 PDF pp.2–5; Chapter 2 pp.7–10.
- Assessment format: Chapters Quiz Information Sheet, Chapter 1–2 section only.

The original Chapter 1–2 vocabulary has 96 separate recall forms after splitting polite pairs and optional forms. Seven fictional company/institution names are excluded at the user’s request. There are 62 main-vocabulary forms, 10 country names and 24 expression forms. Named fictional characters in sentence puzzles are replaced with syllabus pronouns and generic roles; all 50 puzzles and 16 pattern groups are retained.

Column B follows the sheet's literal Hiragana instruction, including hiragana readings for printed katakana loanwords. Original spelling is retained in the word reference. Column C accepts the printed Japanese vocabulary-column form. In Write, forms without kanji accept either a blank C field or X; the timed mock follows the sheet and requires X. Do not introduce alternative kanji for words printed only in kana. Placeholder tilde is ignored in answer grading. Traditional Chinese meanings are labels, not Japanese answer variants.

The 50 sentence puzzles cover all six Exercise A structures in each chapter, the chapter sentence patterns and examples, and Chapter 1 introductions. Sixteen named groups are teaching labels, not an additional claim about exam questions. Mock quizzes sample 5 main-vocabulary forms from each chapter and five different grammar groups (2 from Chapter 1, 3 from Chapter 2), allowing 15 minutes and scoring 10 + 10 marks.

## Implementation

No network dependencies, accounts or analytics. Progress and an active mock are stored in browser localStorage. A reload retains the original mock deadline.

## Verification

Run `node tests/verify.cjs` for meaningful content, scoring, shuffle, session, timer configuration and persistence checks. Run `node --check dist/app.js` for syntax. The dependency-free Node checks cover game behavior, bilingual navigation and offline support. Optional browser checks are described below.

## GitHub Pages

The `Publish GitHub Pages` workflow runs the verification suite, then publishes only `dist/`. Use GitHub Actions as the repository's Pages build source. Pushes to `main` redeploy automatically. All asset paths are relative, so project Pages paths work without a custom domain.

Original uploaded PDFs, original hosting configuration, and credentials are not included in this repository.

## Vocabulary sections

Every vocabulary form belongs to one of 19 categories by meaning and use: people and forms of address, jobs and roles, places, countries and nationality, questions and age, this/that, objects, food and drinks, languages, introductions and greetings, polite expressions and thanks, or replies and reactions. Polite and optional variants stay in the same category. The word reference groups its rows by category and supports chapter, first-hiragana and progress filters. Vocabulary Recall and Vocabulary Rebuild use the same category definitions. The original 62 printed core forms remain eligible for mock quiz sampling. The word reference can also start a writing round for its filtered and searched selection.

## Kanji display

The word reference shows a kanji field only when the supplied form contains kanji. Write and the mock retain the information sheet’s required X answers.

The repository root also contains a relative entry page for branch-based GitHub Pages publishing. It opens `dist/`; the custom Actions workflow continues to publish the contents of `dist/` directly. Both publishing methods serve the same game.

## Rebuild and simulated dialogue

Overview has one Vocabulary mode combining Recall and Rebuild. Its content page has All words / By category / By chapter chips, followed by the two game buttons and the selected mode’s category or chapter chips. The selection immediately filters the compact illustrated word list and both games. Chip rows scroll horizontally on mobile and keep their scroll offsets during selection and language redraws. Vocabulary contains 173 forms across 17 categories, including the new chapter expressions. Legacy Dialogue-only forms remain in their established section. All 211 forms remain in the separate All words reference and the existing mock coverage is retained.

Rebuild compares the assembled Japanese text in order after canonical Unicode composition and removal of whitespace, invisible formatting and placeholder tildes. Identical duplicate tiles can swap identities; repeated character counts and different Japanese spellings still matter. Check readiness uses text length rather than the original tile count, so an equivalent assembly with combined tiles can be submitted. Recall and Rebuild retain separate progress, manual Next, missed-item practice and existing scoring.

Every page uses the shared Kotoba app title. Content pages keep a dedicated breadcrumb row directly below the app bar; game pages omit the row and its spacing. Each game has an explicit back button: Dialogue returns to its filtered conversation guide, Vocabulary returns to its selected content, Kanji Writing returns to its selection menu, Sentence Rebuild returns to the grammar reference, and Mock returns to its introduction with a Resume control that preserves the timer and answers. The Breadcrumb component’s px property uses the same responsive content padding as the main layout; breadcrumb controls retain their vertical padding. Menu/back controls and the language selector stay in the app bar. The green Update button includes a refresh icon and preserves explicit update activation and loading/disabled behavior.

Vocabulary Recall, Dialogue and Rebuild keep the answer and feedback visible until the user selects Next. After the last answer, Next opens the round results. The timed mock keeps its existing submission flow.

WH-words uses five syllabus question words: だれ, どなた, なんさい, おいくつ and なん. Selectable chips open complete two-speaker conversations using the same bubbles, Lulu characters, primary Japanese text and English/Traditional Chinese translations as Replies. The selected question word is highlighted within the Japanese conversation using bold accent text on a subtle background; surrounding Japanese and both translations retain their normal styling. Short usage notes explain the standard/polite distinctions. Both Matching and Rebuild remain available; さい stays excluded because it is not a question word.

Dialogue retains Introduction (5 scenes), Polite expressions (4 scenes), Replies (4 scenes), This and That (7 Chapter 2 scenes), and WH-words (5 questions). Expression chips select a complete conversation immediately. Each learner bubble highlights the complete target from the selected vocabulary entry using the same treatment as WH-words. This and That reuses これ・それ・あれ and この・その・あの, with near-speaker, near-listener and far-from-both contexts and sentence frames in both games. The realisation situation is “Suddenly notice something” / “突然注意到某件事” in guides and games. Dialogue Content uses All / By category / By chapter chips above its optional localized secondary label and filter row. All exposes 74 expressions, including WH-words. Explicit chapter membership keeps each lesson in scope (8 in Chapter 1, 17 in Chapter 2, 24 in Chapter 3, and 25 in Chapter 4). One complete conversation stays visible. Matching and Rebuild use this exact filtered set and retain it through restarts, missed-item practice, and returning to the same selected expression. Chip scroll offsets are retained by row, filter and language. Their games appear directly on the page background with compact progress, the situation, speaker bubbles and choices or a tile bank. Rebuild builds the answer in the learner’s bubble. After grading, a rounded green or red feedback card spans the answer area: happy or encouraging Lulu sits beside the status and translation, with the usage explanation underneath and manual Next directly below the card. Feedback and conversation Lulu use the same responsive square size, with matching visible scale after transparent margins. Status text and icons accompany the colors. Corrective notes, editing, reveal, Check and missed-item practice remain available. WH-word guide chips show English or Traditional Chinese meanings without hiragana.

## Overview

Overview has one responsive study-card navigation in the order Dialogue, Vocabulary, Sentence Rebuild, Kanji Writing, Mock quiz, All words. It uses the same mode names and icons as the other pages, with no repeated activity cards or promotional banners. Vocabulary practice and secure counts share one progress panel alongside sentence-group progress and the best mock score. An active mock changes its existing card action to Resume.

## Visual expression guides

Dialogue content pages use selectable expression chips and complete conversations with compact Lulu characters beside their speakers. WH-words shares this layout. Vocabulary uses the same chip, typography and action components with compact illustrated word entries. Shared 4dp spacing tokens standardize page sections, cards, chips, controls and navigation. Vocabulary Content keeps All words / By category / By chapter at the top, followed by a localized secondary label and chips when appropriate, the selected heading and description, then Rebuild and Recall in that order. Both games inherit the selected words; returning to Content preserves the selection and chip scroll positions. Recall and Rebuild omit visible page headings and browse controls so progress and the question begin directly below the app bar.

## Kanji Writing and Vocabulary Recall

Recall is one of the two practice options within Vocabulary; it still checks typed hiragana and the printed kanji form, accepting blank or X for no-kanji forms. Its progress stays intact. Kanji Writing is a separate mode with all/chapter/category selection restricted to taught kanji-bearing forms. A word’s hiragana and meaning prompt one drawing pad per kanji, while any surrounding kana remain provided. Mouse, touch and pen input use pointer events; Undo and Clear edit the strokes. Revealing the model locks the pads and offers self-check buttons. Handwriting is self-assessed, with independent progress and missed-item replay; it does not use automatic character recognition. Drawings survive language changes and redraws during the current question.

## Progressive Web App

Kotoba includes an installable web app manifest, 192px/512px icons, a maskable icon and an Apple touch icon. The website has no Install app button or automatic installation invitation. Browser installation remains available through the browser’s own controls; on iPhone/iPad, use Safari’s Share → Add to Home Screen. Installation and offline support require HTTPS (GitHub Pages) or localhost. Open the deployed app online once to finish caching; the installed app then opens offline with every study mode, including Kanji Writing. Progress continues to use browser localStorage.

The manifest, start URL, service worker and assets use relative paths, supporting both the GitHub Actions deployment at the project root and branch publishing under `dist/`. In branch publishing, the installed app starts directly at `dist/`, so its offline launch does not depend on the root redirect.

The service worker precaches a complete release, including all scripts, CSS, icons and the manifest. Each release’s cache revision derives from the content of all deployed assets and the worker template. Cache cleanup is restricted to this app’s own scope. Updates wait until the app is closed, or until the user selects Update; active quizzes are never reloaded automatically. Install/update button labels follow the interface language.

After changing anything in `dist/`, regenerate the offline worker before testing or publishing:

```sh
node scripts/build-pwa.cjs
node tests/pwa.cjs
node tests/verify.cjs
node tests/chapters-3-4.cjs
```

The Pages workflow runs these steps automatically. `tests/pwa.cjs` verifies manifest/icon sizes, asset coverage, generated-worker freshness, offline fetch behavior, both Pages paths, scope isolation, absence of installation buttons and explicit update activation without browser tests.

## Material 3 interface

All study modes share the Material 3 color roles and component styles in `dist/style.css`: violet primary actions, tonal surface containers, rounded cards, outlined fields, 48px touch targets, visible focus indicators, and distinct success/error feedback. Typography uses locally available sans-serif fonts, with Japanese and Traditional Chinese fallbacks; no remote fonts or UI framework are required.

The navigation drawer stays visible from 840px upward. On smaller screens, the app bar opens a modal drawer with a focus trap, Escape dismissal, and background interaction disabled. The active study mode is marked on every screen. The overview retains its six study cards. Lesson selectors have visible labels, all pages have a heading, and keyboard focus survives answer/language redraws. Browser zoom remains enabled, and reduced-motion and forced-color preferences are supported.

The lesson scenes use a shared Lulu pose atlas drawn from the supplied visual references. Vocabulary cards choose a pose that shows the action, such as waving, reading or thanking, without a separate gesture emoji; object symbols remain where they identify a distinct item. The shared occupation atlas adds distinct office employee, bank teller and researcher illustrations, reused in Vocabulary Content, Recall and Rebuild. All Lulu assets are included in the offline cache. Installed-app icons and theme colors match the new palette. `dist/icons/icon.svg` is the vector source for the PNG installation icons. Existing storage keys, study content, quiz grading, and explicit PWA update behavior remain unchanged.

### Optional browser verification

With Playwright and Chromium available locally, serve `dist/` and run:

```sh
# Terminal 1
python -m http.server 4173 --directory dist

# Terminal 2 (use your installed Chromium path, or omit for Playwright's browser)
CHROMIUM_PATH=/usr/bin/chromium node tests/material-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/revision-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/dialogue-modes-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/this-that-browser.cjs
```

Set `KOTOBA_TEST_URL` to test another local URL. This suite checks 23 screen states at 320, 390, 768, 1024 and 1440 pixels in both interface languages, including overflow, active navigation, headings, drawer focus and resizing, modal dismissal, input retention, and word search. It uses an isolated browser context and does not change real learner progress.

The revision browser suite adds 218 layout checks at 360, 390 and 1440 pixels in both languages, covering Vocabulary control order, selected game destinations and scroll retention, WH highlights, feedback card contrast and Lulu sizing, explicit return navigation, the green Update control and responsive breadcrumb padding. The broader suite also checks the shared app title on every route, breadcrumbs on content pages, and back buttons on game pages.

The Dialogue modes browser suite checks All, every category and all four chapters at 320, 390 and 1440px in both languages, including filtered question pools, retries, highlights, retained scrolling, and content destinations from all game back buttons.

This and That shows a shared book scene above each complete conversation. Object placement is relative to the learner, while the listener’s question uses the opposite perspective. Short localized chips keep standalone and noun-modifying forms distinct. あのう joins This and That with a separate waving Lulu scene and a usage note distinguishing it from あの + noun. It is included in both This and That games, All and Chapter 2, and excluded from Polite Expressions.

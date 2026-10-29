# Kotoba

A bilingual English/Traditional Chinese Japanese study app with local progress, Lulu illustrations and offline PWA support. It has no runtime network dependencies or account requirement.

## Learning sections

- **Vocabulary:** learn words, meanings, readings and written forms. Recall, Rebuild, typed Kanji recall and Kanji Writing use the selected chapter/group/topic.
- **Grammar & Sentences:** Question words, Sentence reordering, Particles & timetables, and Verbs & phrase completion. Topics and assistance levels are separate.
- **Pictures & Dialogue:** interpret spatial pictures and practise everyday situational expressions. Normal/polite equivalents stay together.

Numbers, Kanji Writing, Timed practice, Mixed practice and Word reference are also available directly. Timed practice retains the 15-minute Chapters 1–2 activity and its 20-point scoring. Mixed practice combines existing skills for 20 points. Word reference contains the complete lexical inventory, while All vocabulary practice excludes unresolved readings.

Select **Chapters → content group/task → subgroup/topic → practice method** using wrapping Material filter chips. Select one or more chapters; their content is combined without duplicates, then intersected with the other filters. All chapters is exclusive. The visible selection/action panel reports the actual scope and keeps practice accessible while choosing filters; it scrolls away for reading. Reference pagination does not restrict the practice pool. Language switching, returning from practice and reloading retain selections. Saved single-chapter choices migrate automatically.

There are 338 lexical records, of which 328 are ready for practice, 41 canonical dialogue scenes with 47 forms, and 18 sentence patterns. See the generated [classification audit](reports/learning-navigation.json) for current per-group counts. Counts are validated from effective runtime data, including imports, repairs, aliases and exclusions.

## Implementation and content rules

`dist/` is the deployed application. `content-repairs.js` supplies reviewed meanings without changing Japanese/IDs/chapters. `learning-taxonomy.js` defines intentional lexical membership by ID. `learning-navigation.js` defines task homes, canonical scene ownership, scopes and compatibility aliases. Existing datasets remain the permitted Japanese content source.

Read [learning hierarchy, classification decisions and compatibility](docs/learning-navigation.md). Internal provenance and the previous exercise-format review remain in [developer documentation](docs/exam-practice.md); those technical details are not shown in study views.

Progress and active timed practice use the existing browser localStorage keys. Handwriting is self-assessed, with no automatic recognition. Unicode composition is normalised for grading while small kana, long vowels and duplicate-token counts remain significant.

## Local preview and checks

Serve the app locally:

```sh
python -m http.server 4173 --directory dist
```

After changing deployed assets:

```sh
node scripts/build-pwa.cjs
node tests/pwa.cjs
node tests/chapter-import.cjs
node tests/verify.cjs
node tests/chapters-3-4.cjs
node tests/number-matching.cjs
node tests/dialogue-pairs.cjs
node tests/exam-practice.cjs
node tests/learning-navigation.cjs
node tests/chapter-chips.cjs
node tests/lulu.cjs
node scripts/audit-learning-navigation.cjs
node scripts/audit-lulu-visuals.cjs
```

With Playwright and Chromium available, run the current mobile/desktop bilingual workflow suite against the local server:

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/navigation-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/chapter-chips-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/lulu-browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/lulu-offline.cjs
```

The historical browser suites encode the previous flat-menu presentation. The current navigation suite replaces those presentation expectations; the core suites retain game-content and scoring invariants.

The [Lulu visual review](docs/visual-review/README.md) includes the before/after audit, all eight feedback poses, atlas coordinates, reference usage and mobile/desktop screenshots. Regenerate the review captures with `node scripts/capture-lulu-review.cjs`. Optional image-bound inspection uses Pillow: `python scripts/audit-lulu-assets.py` after the visual audit.

See the [design and chapter-selection review](docs/design-selection/README.md) for the revised Lulu icon, multi-chapter behavior, Material refinements and current screenshots. Rebuild icon sizes with `node scripts/build-lulu-icons.cjs` and capture the current review with `node scripts/capture-design-selection.cjs`.

## Offline and deployment

The manifest and service worker use relative paths for both project Pages and `dist/` hosting. Open the app online once to cache the release. Updates require explicit activation or closing existing clients; active rounds are not automatically reloaded. Browser installation controls remain available, with no automatic installation prompt.

The `Publish GitHub Pages` workflow verifies and publishes only `dist/` on pushes to `main`. Configure GitHub Actions as the repository’s Pages build source. Lulu assets, accessibility settings, local progress and explicit PWA update behaviour are retained.

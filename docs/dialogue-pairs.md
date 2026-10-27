# Dialogue forms and explicit targets

Dialogue now has 41 learning entries. Equivalent uses share one chip, one guide and one game round. Original Vocabulary records and the source lesson registry remain intact.

| Entry | Normal | Polite | Chapters |
| --- | --- | --- | --- |
| Who | だれ | どなた | 1 |
| How old | なんさい | おいくつ | 1 |
| Where (location) | どこ | どちら | 3 |
| Here (location) | ここ | こちら | 3 |
| There (location) | そこ | そちら | 3 |
| Over there (location) | あそこ | あちら | 3 |

The existing reception examples teach the last three as equivalent location uses. Country, company and university questions using どちら remain separate; they do not ask physical location. Brief thanks, an emphatic どうも before ありがとうございます, and complete introductory greetings remain distinct uses.

Each pair retains its source form IDs, readings, translations, usage notes and chapter memberships. The normal form ID is the entry ID, with old polite IDs resolved through an alias map. Progress records are not deleted, reset or summed. After practice, each original form gets its own result at its existing progress key, including when one Rebuild form is correct and the other needs correction. Overall scoring and completed-round progress count the pair once.

Matching shows both forms and plausible distractors. Two choices must be selected and submitted; selection order does not matter. Learners can deselect choices, see 0/2–2/2 progress, and identify Normal and Polite in feedback. Single-form expressions retain immediate single-choice grading.

Rebuild has labelled Normal and Polite answer areas, separate shuffled character banks and independent undo, clear and tile-return controls. Small kana remain individual characters; NFC normalization keeps voiced combining marks attached to their kana. Each form validates against its accepted reading independently. Both must be complete to submit and correct to earn the round. Feedback identifies partial correctness and preserves manual Next and retry controls.

## Targets and fixed text

`dist/dialogue-content.js` builds the Dialogue view from existing sources, preserving the raw lesson/Vocabulary data. Every active entry has a target and an explicit `answerSlot` containing the learner turn index, text before the target and text after it. Other repeated occurrences that need masking have their own explicit slots. Games and highlighting use these slots rather than globally stripping answer substrings.

| Complete example | Practised target | Fixed text after the target |
| --- | --- | --- |
| どうもありがとうございます。 | どうも | ありがとうございます。 |
| こちらこそよろしくおねがいします。 | こちらこそ | よろしくおねがいします。 |
| これはどこのワインですか。 | どこの | ワインですか。 |
| あれはだれのかばんですか。 | だれの | かばんですか。 |
| それはなんのざっしですか。 | なんの | ざっしですか。 |

The last two questions reuse Chapter 2 sentence-bank examples (`p14-1` / `p14-3`, `p13-2` / `p13-3`). Their question meanings distinguish possession from kind/topic and origin. Standalone だれ, なん and the location pair remain available. No template adds another の after these targets. All readings and original full examples/translations remain available.

The standalone なんじからなんじまで entry resolves to the existing なんじ entry. Its complete library opening-hours exchange remains a guide example. The existing Sentence Structure reference now includes から and まで in two Chapter 4 groups with four source-derived sentence exercises, bringing the total to 54 sentences / 18 groups. Chapter 4 is selectable there. The mock continues to sample Chapters 1–2 only.

みせてください and じゃ、これをください are excluded from every Dialogue scope and game pool. Independent Vocabulary entries and historical progress remain intact. Removed selections fall back to valid entries; merged selections resolve to their canonical entry. Chapter/category selection uses the same active registry for content and games.

Current scope counts: Introduction 5, Polite expressions 7, Replies 4, This and That 10, WH-words 15. Chapters 1–4 contain 6, 19, 13 and 3 entries respectively.

## Verification

- `node tests/dialogue-pairs.cjs`: all 41 entries across both languages, categories, chapters and games; selection gating/deselection, independent banks, partial grading, progress preservation, explicit hints, の, removals, aliases and mock boundaries.
- `CHROMIUM_PATH=/usr/bin/chromium node tests/dialogue-pairs-browser.cjs`: actual button/tile interactions at 320, 390, 768 and 1440px in English and Traditional Chinese; responsive guides, selection states, independent editing, partial feedback, retries, inline targets/hints and navigation.
- `node tests/verify.cjs`, `node tests/chapters-3-4.cjs`, `node tests/chapter-import.cjs`, `node tests/number-matching.cjs`: app, source coverage, import repeatability and Number regression checks.
- `node scripts/build-pwa.cjs` and `node tests/pwa.cjs`: complete offline assets and reproducible cache revision, including the new Dialogue module.

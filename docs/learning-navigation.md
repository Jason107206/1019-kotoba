# Learning hierarchy and compatibility

The runtime hierarchy is defined in `learning-taxonomy.js` (lexical membership) and `learning-navigation.js` (task and scene ownership). These modules run after the vocabulary import/repair overlay and after scene aliases/exclusions respectively. They reference existing objects; they do not generate Japanese or new questions.

## Primary homes

- **Vocabulary:** meanings, readings and written forms. All vocabulary practice uses the 328 ready lexical records. Word reference contains all 338 records, with short availability messages for the ten unresolved readings. Recall, Rebuild, typed Kanji recall and Kanji Writing use readiness checks.
- **Grammar & Sentences:** Question words; Sentence reordering; Particles & timetables; Verbs & phrase completion. A task must be selected before methods are offered. Topic families and chapters intersect. Question-word conversations are counted as 15 canonical scenes / 18 forms.
- **Pictures & Dialogue:** Picture conversations (9 scenes / 12 forms) and Situational expressions (17 scenes / 17 forms). All-groups rounds deduplicate scenes by canonical ID. Independent methods reuse existing partial- or whole-response questions; multiple-blank practice reuses the eight existing picture questions.

Numbers, Kanji Writing, Timed practice, Mixed practice and Word reference remain utility destinations with links from their primary homes. Timed practice keeps its existing 15-minute deadline, 10-word/5-sentence distribution, 20-point score and original Chapters 1–2 sample pool. Mixed practice keeps its existing 20-point sampling/scoring. The internal route/state names and storage keys for these activities remain unchanged.

## Lexical taxonomy

Every record has one explicit primary group and subgroup, expressed by ID rather than inferred from its spelling, chapter or import origin.

| Group | Reference records |
| --- | ---: |
| People | 11 |
| Jobs & study | 14 |
| Places & geography | 70 |
| Objects & belongings | 32 |
| Food & drinks | 22 |
| Transport & travel | 18 |
| Actions & daily activities | 27 |
| Time & dates | 58 |
| Numbers, prices & counters | 8 |
| Question & pointing words | 32 |
| Linking words & particles | 5 |
| Everyday expressions | 41 |

The old effective `source-vocabulary` and `source-expressions` categories did contain 84 and 12 records. Those records are now explicitly distributed across the semantic groups. Calendar suffixes belong to Time & dates and carry counter tags; the platform suffix belongs with travel services. Age counters belong with counters, separately from age questions. Relative weeks, months, years and frequency belong with time. Event nouns are separate from linking particles. Vehicle words and train types belong with travel; station facilities and named stations remain places. Languages and study materials belong with Jobs & study. Situational expressions also remain searchable and playable as lexical records, with links to canonical scene practice where it exists.

Secondary counter, suffix and introduction tags express overlap without duplicating membership. Unspecified proper names remain in the broad named-place/organisation subgroup; no business type or new reading is inferred. These are deliberate broad classifications, not unresolved primary assignments.

## Sentence families

| Family | Stable patterns |
| --- | --- |
| Identity, affiliation & basic statements | p1, p2, p5, p6 |
| Questions & answers | p3, p4, p7, p10, p11, p12 |
| Introductions | p8 |
| Objects, descriptions & ownership | p9, p13, p14, p15, p16 |
| Time ranges & schedules | p17, p18 |

All 18 IDs and their distinctions remain intact, including p14 (owner plus noun) versus p15 (understood noun omitted). A pattern launch never clears the selected chapter. Reference examples, topic cards and launch pools use the same scope. Example, Guided practice and Independent practice are assistance levels, not topics. Reordering continues to require every supplied token, including duplicate tokens and punctuation. Guided sentence successes are shown separately; the original independent-success score/progress rules are preserved.

## Scene classification

Question-word scenes primarily belong in Grammar even though they use conversation bubbles. Spatial demonstratives and location scenes belong in Pictures. Standalone forms, noun modifiers and locations have separate filters. Paired normal/polite forms stay together, with one scene count and a separate form count. Alias examples, such as the time-range question, remain on their canonical guide.

Situational groups are meeting/introductions, attention/requests, offering/customer service, thanks/responses and replies/reactions. The attention-getting scene is classified by its communicative purpose. A greetings/farewells scene subgroup is not offered because there are no active canonical scenes to populate it; its lexical expressions remain available in Vocabulary/Word reference. No conversation was invented to fill a gap.

## Selection and migration

Selection is Chapter → content group/task → subgroup/topic → practice method. Native stacked selects replace the long exclusive-mode chip rows. Chapter and group filters intersect, including Numbers. Unsupported child combinations disappear and stale selections reset to All groups/All topics. Empty chapters cannot start rounds. Scope summaries distinguish scenes/forms, questions, reference records and playable words. Reference pagination describes the visible subset while practice uses the full selected scope.

Scopes persist under `learningScopes` within the existing localStorage envelope and survive return navigation, language changes and reloads. Existing progress IDs, active timed deadlines and content revision remain compatible. A learning-schema marker migrates old exclusive Numbers filters into their intended category-only or chapter-only scope before enabling intersection filtering. Legacy lexical category aliases map to their intentional successor; the two mixed import buckets map to All groups with a learner-friendly reorganisation notice. Legacy sentence/dialogue/examination routes lead to the new section destinations. Technical provenance remains on the records, in baseline fingerprints and in developer reports, rather than rendered in the learning interface.

## Validation

`reports/navigation-baseline.json` fingerprints the Japanese fields, IDs, chapters, sentence tokens, dialogue targets, number records and all 978 existing exercise answer/scoring definitions before this change. `tests/learning-navigation.cjs` verifies those fingerprints, intentional membership, reachability, scope intersections, launch pools, migrations, paper-free rendered text and accessible labels in both languages. `reports/learning-navigation.json` contains the full classification and reachability audit; regenerate it with `node scripts/audit-learning-navigation.cjs`.

The obsolete flat-navigation assertions in the core verification suite were replaced with current hierarchy tests. Exhaustive number and dialogue grading tests remain, along with source/chapter/import, exact-spelling, scoring, duplicate-token, retry and persistence checks. `tests/navigation-browser.cjs` verifies current responsive workflows; the older browser suites describe the superseded flat menus.

All new JavaScript is precached by the generated service worker. Regenerate `dist/sw.js` after any deployed-file change.

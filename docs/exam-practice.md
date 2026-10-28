# Exam preparation: scope and evidence

All exercises in the new section are **newly composed practice based on paper formats**. None is labelled an original paper question or official marking scheme. Japanese is copied from runtime sentences, dialogues, numbers or usable word records. Time-range substitutions combine existing Chapter 4 start/end tokens and existing study/work predicates. Every question stores dataset and record IDs. No Japanese spelling, reading, ID or chapter membership was changed by the translation repairs.

## Six supplied papers

Inspected all six PDFs supplied in the task using their extracted page text. The files are not redistributed. Percentages below are the printed full-paper allocations, not the available practice score.

| Paper | Printed sections | Supplied marks | Missing pages |
| --- | --- | ---: | --- |
| 2023/24 semester 1 | Vocabulary 30; grammar 20; picture description 36; translation 14 | 100 | none indicated |
| 2023/24 semester 2 | MC 16; vocabulary 20; grammar 40; picture description 24 | 84 | MC |
| 2024/25 semester 1 | MC 15; vocabulary/expressions 20; grammar 44; situations 21 | 85 | MC |
| 2024/25 semester 2 | MC 20; vocabulary 10; grammar 52; pictures 18 | 80 | MC |
| 2025/26 semester 1 | MC 20; vocabulary 10; grammar 58; situations 12 | 80 | MC |
| 2025/26 semester 2 | MC 20; vocabulary 10; grammar 49; pictures 21 | 80 | MC |

2025/26 semester 1 grammar: WH conversation blanks 10 × 1; demonstratives 6 × 1; reordering 7 × 2; particles including X 14 × 1; picture/cue phrase completion 7 × 2. Situations: 6 × 2; vocabulary: 20 answers × 0.5.

2025/26 semester 2 grammar: WH conversation blanks 10 × 1; reordering 6 × 1; timetable particles/verbs 21 × 1; picture/cue verb completion 6 × 2. Picture section: demonstratives 7 × 1, situational kana-slot blanks 7 × 2. Vocabulary: 20 answers × 0.5. Joined kana count as one slot; small stop kana counts separately.

The mini exam deliberately uses **20 available practice marks**, with 12 grammar and 8 recall marks; it is not a replica of any full paper. Grammar-heavy sampling reflects the recent papers' emphasis, without inventing absent MC content. The existing 15-minute, 20-mark Chapters 1–2 mock keeps its original non-imported vocabulary pool, timing, storage and scoring.

## Implemented

- 127 reviewed English/Traditional Chinese meaning repairs in an explicit overlay. Runtime readiness remains strict. Audit report and on-screen chapter counts include unresolved records.
- Grammar launcher from Sentence Rebuild and navigation: examples, assisted practice, exact written completion and unassisted recall. Original reordering mode remains available. Reordering includes the existing Chapter 4 range patterns.
- Particle blanks with per-slot marks/explanations, including reviewed X boundaries between demonstrative modifiers and nouns.
- Verb selection only for attested sentence-bank predicates, with explicit present/past meaning cues; no automatic conjugation.
- Varied, coherent daily study/work timetables: particle blanks, verb blanks, phrase completion and full sentence writing.
- Whole/partial dialogue recall, contextual WH questions, exact slot boundaries and specified source/polite forms. No keyword grading; no unreviewed alternative answers.
- Two-speaker demonstrative blanks and three-book panels with near-you, near-listener and far zones. Standalone and noun-modifying use-once sets reuse Lulu scenes.
- Number recall using the existing number prompts and readings. Kana-slot counting preserves small kana, stop kana and long vowels. Complete-answer drawing pads use explicit self-assessment, separately stored; no recognition claim. Handwriting self-check is excluded from the scored mini exam.
- Separate particle, verb-form, word-order, WH, demonstrative, reading and kanji progress. Assisted, unassisted and handwriting self-check results remain separate. Weakness recommendations use demonstrated unassisted accuracy. Existing progress keys remain intact.

## Limits imposed by the database

10 existing entries remain unresolved, predominantly annotated/mixed readings; the repair does not guess them. Chapter counts overlap for shared words: totals must not be summed as distinct records. Exact IDs/issues are in `reports/exam-content-audit.json`.

Sentence-pattern coverage currently ends at Chapter 4. Chapter 5–6 words becoming usable does **not** establish new grammar. Travel/location/transport timetable sentences, negative/past conjugation drills beyond attested forms, new WH conversations without sufficient source context, and location-expression picture scenes are omitted. Picture practice presently uses existing book objects and spatial zones, not a new illustrated object inventory. Negative nominal patterns remain available in reordering/completion; this is not a complete verb-tense course.

## Validation and maintenance

`node tests/exam-practice.cjs` checks source references, immutable Japanese/IDs/memberships, usable counts, strict alternatives and slot boundaries, rejection of keyword-plus-extra-text, individual blank grading, duplicate-token handling and kana slots. `node tests/exam-browser.cjs` checks all new skills and stages at 390/1440px in both languages, typed grading, no choices in recall, three-book scenes and overflow/runtime errors.

Run the existing verification, chapter, dialogue, number and PWA suites as well. `node scripts/build-pwa.cjs` must run after changes to deployed assets. To change imported content, keep the reviewed repair overlay loaded immediately after `csv-content.js`; reimporting the CSV must not erase that review layer.

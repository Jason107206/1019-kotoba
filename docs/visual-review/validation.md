# Validation results

Validated on 2026-10-28 with Node 24 and local Chromium. All checks passed on the final deployed assets.

| Check | Result |
| --- | --- |
| `node scripts/build-pwa.cjs` | Service worker and complete offline asset cache regenerated |
| `node tests/pwa.cjs` | Icons, manifest, both Pages paths, complete cache, cache isolation and safe updates |
| `node tests/chapter-import.cjs` | Every imported row accounted for; readiness and IDs preserved |
| `node tests/verify.cjs` | Immutable inventories, strict spelling/half points, duplicate tiles, manual Next, handwriting, 15-minute timer, 20-point scoring and saved progress |
| `node tests/chapters-3-4.cjs` | Source rows, variants, scope membership and canonical scenes retained |
| `node tests/number-matching.cjs` | Both reconstruction modes, all readings/variants, duplicates, retries and progress |
| `node tests/dialogue-pairs.cjs` | All 41 scenes and six form pairs, both languages/modes, exact boundaries and partial results |
| `node tests/exam-practice.cjs` | 978 existing sourced questions; Japanese/IDs/chapters, alternatives, boundaries, marks and kana slots unchanged |
| `node tests/learning-navigation.cjs` | 645 chapter/group/topic scopes; exact pools, reachable records, migration/back/language state and learner wording |
| `node scripts/audit-learning-navigation.cjs` | Japanese content, record IDs, chapters, answer boundaries and scores match the pre-change fingerprints |
| `node tests/lulu.cjs` | All 338 visual plans in both languages; semantic distinctions; no target Japanese in recall art; eight feedback poses; stable selection/rotation; assisted/revealed/partial/self outcomes; crop dimensions; all icons; actual numerical values |
| `node scripts/audit-lulu-visuals.cjs` | 338 lexical records, 41 scenes, 18 patterns and 42 icon keys audited |
| `python scripts/audit-lulu-assets.py` | Alpha bounds and transparent padding measured; no opaque art clipped by atlas cells |
| `node tests/lulu-browser.cjs` | **320 rendered surfaces** at **360/390/768/1440px**, both languages; no horizontal overflow or script errors; stable variants through rerenders/language changes; control position stable on grading; partial/guided/revealed/self outcomes; numerical/spatial integrity; unresolved reading remains disabled; reduced motion, keyboard focus and failed-image fallback |
| `node tests/navigation-browser.cjs` | **140 rendered surfaces**, mobile/desktop and both languages; all groups, exact pools/counts, typed-input preservation, back/language state, timer reload and drawer navigation |
| `node tests/lulu-offline.cjs` | Actual service-worker install followed by network-disabled reload, all eight sections/both languages, graded feedback and every Lulu atlas available offline |
| `git diff --check` | No whitespace errors |

[Machine-readable core results](../../reports/lulu-validation.json) retain the output of the nine Node core/content suites. Review captures were regenerated after the final changes.

Native Safari/iOS/Android installation, hardware touch/pen and assistive-technology screen readers were not available. Browser layout, semantics, keyboard interaction, local image fallback and reduced-motion behaviour were checked in Chromium. The existing 10 unresolved lexical records remain reference-only; this visual pass adds no Japanese content or reviewed readings.

# Chapters 1–6 import audit

The source contains 328 rows and five columns: `japanese`, `kanji`, `chapter`, `page`, and `category`. No meanings, translations, usage notes, or conversations are supplied. All page cells are empty.

| Measure | Count |
| --- | ---: |
| Added database records | 239 |
| Existing records enriched with source/chapter metadata | 95 |
| Existing records unchanged | 1 |
| Ambiguous matches left unmerged | 0 |
| Total database records | 335 |
| Source rows added / updated / unchanged | 239 / 89 / 0 |
| Source rows requiring meaning or reading review | 240 |
| Repeat import: added / updated / unchanged / unresolved | 0 / 0 / 328 / 0 |

Source-row counts differ from record counts because optional printed forms can reference several existing variants, and two source rows can reference the same new record. All 96 original IDs remain present. Existing translations, Japanese forms, conversations, and browser progress keys remain intact.

## Mapping and matching

- `japanese` is retained verbatim as `jp` for additions and in `sources` for all matches. Plain kana receives a normalized hiragana `kana` reading; annotated or mixed forms require review.
- `kanji` maps to `c`; populated existing spellings are preserved. Blank kanji uses the existing `X` convention. Conflicting populated kanji or multiple possible senses are held for review.
- `chapter` maps to the full `chapters` membership array while the original primary `ch` is preserved. `そちら` belongs to both Chapters 3 and 4.
- `category` selects vocabulary or expression membership; existing semantic categories are reused where identified. Remaining records use the source collections Vocabulary and Expressions.
- Matching normalizes spacing, punctuation, Unicode, kana and optional bracket variants, checks supplied kanji, and preserves separate senses. The CSV supplies no meanings with which to resolve ambiguous candidates.
- The importer evaluates the current database, keeps source aliases and stable IDs, and verifies an immediate repeat has no mutations. It preserves later valid metadata.

## Dialogue scope

This checkout has 25 complete Dialogue expressions from Chapters 1–2. There is no Location and Direction category, no existing place Dialogue conversations, and no longer WH question conversations. The CSV has no conversations; vocabulary-only entries are not promoted into Dialogue. Place vocabulary is filed under This and That, and identified question words under Questions & age. The complete existing WH entries remain under WH-words.

The CSV expression `たいへんですね。` is preserved under Expressions and Chapter 4. It is not assigned to Replies and cannot enter Replies Matching or Rebuild. Removed/unknown category selections recover to Introduction.

WH chips share stable expression IDs and one selected-state updater. Matching and Rebuild insert answers into the learner’s underlined blank. A long-answer test fixture verifies wrapping without adding that fixture to the learning database. General offer/ownership/thanks labels are shared by guides and games; concrete conversations retain their Japanese and translations.

## Records needing review

239 added records lack meanings/translations, affecting 240 source rows. They remain visible in the library and All / By Category / By Chapter views. They are excluded from Recall, Rebuild, Kanji Writing and mock pools until their required fields are reviewed. The JSON audit lists every source row, destination IDs and review issues.

| CSV row | Japanese | Chapters | Review |
| ---: | --- | --- | --- |
| 3 | アイエムシー(IMC) | 1 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 4 | あいます[ともだちに～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 5 | あさ | 4 | Meaning and translations absent from CSV |
| 6 | あさごはん | 6 | Meaning and translations absent from CSV |
| 7 | あさって | 4 | Meaning and translations absent from CSV |
| 8 | あした | 4 | Meaning and translations absent from CSV |
| 9 | あすか | 4 | Meaning and translations absent from CSV |
| 10 | あそこ | 3 | Meaning and translations absent from CSV |
| 11 | あちら | 3 | Meaning and translations absent from CSV |
| 12 | アップルぎんこう | 4 | Meaning and translations absent from CSV |
| 19 | ありがとう ございました。 | 5 | Meaning and translations absent from CSV |
| 21 | あるいて | 5 | Meaning and translations absent from CSV |
| 24 | いいですね。 | 6 | Meaning and translations absent from CSV |
| 25 | いきます | 5 | Meaning and translations absent from CSV |
| 27 | いくつ | 1 | Meaning and translations absent from CSV |
| 28 | いくら | 3 | Meaning and translations absent from CSV |
| 31 | イタリア | 3 | Meaning and translations absent from CSV |
| 32 | いつ | 5 | Meaning and translations absent from CSV |
| 33 | いつか | 5 | Meaning and translations absent from CSV |
| 34 | いっしょに | 6 | Meaning and translations absent from CSV |
| 35 | いつも | 6 | Meaning and translations absent from CSV |
| 36 | いま | 4 | Meaning and translations absent from CSV |
| 37 | いらっしゃいませ。 | 3 | Meaning and translations absent from CSV |
| 40 | うけつけ | 3 | Meaning and translations absent from CSV |
| 41 | うち | 3 | Meaning and translations absent from CSV |
| 42 | うりば | 3 | Meaning and translations absent from CSV |
| 43 | えいが | 4 | Meaning and translations absent from CSV |
| 45 | ええ | 6 | Meaning and translations absent from CSV |
| 46 | エーケーシー(AKC) | 1 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 47 | えき | 5 | Meaning and translations absent from CSV |
| 48 | エスカレーター | 3 | Meaning and translations absent from CSV |
| 50 | エレベーター | 3 | Meaning and translations absent from CSV |
| 51 | …えん | 3 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 54 | おおさかじょう | 5 | Meaning and translations absent from CSV |
| 55 | おおさかデパート | 6 | Meaning and translations absent from CSV |
| 56 | おきます | 4 | Meaning and translations absent from CSV |
| 57 | おくに | 3 | Meaning and translations absent from CSV |
| 58 | おさけ | 6 | Meaning and translations absent from CSV |
| 59 | おちゃ | 6 | Meaning and translations absent from CSV |
| 60 | おてあらい | 3 | Meaning and translations absent from CSV |
| 61 | おととい／おととい | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 63 | おはなみ | 6 | Meaning and translations absent from CSV |
| 65 | おわります | 4 | Meaning and translations absent from CSV |
| 67 | …かい(がい) | 3 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 68 | かいぎ | 4 | Meaning and translations absent from CSV |
| 69 | かいぎしつ | 3 | Meaning and translations absent from CSV |
| 70 | かいしゃ | 3 | Meaning and translations absent from CSV |
| 72 | かいだん | 3 | Meaning and translations absent from CSV |
| 73 | かいます | 6 | Meaning and translations absent from CSV |
| 74 | かえります | 5 | Meaning and translations absent from CSV |
| 76 | かきます | 6 | Meaning and translations absent from CSV |
| 79 | かぞく | 5 | Meaning and translations absent from CSV |
| 80 | …がつ | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 81 | がっこう | 5 | Meaning and translations absent from CSV |
| 82 | かのじょ | 5 | Meaning and translations absent from CSV |
| 85 | かようび | 4 | Meaning and translations absent from CSV |
| 86 | ～から | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 88 | かれ | 5 | Meaning and translations absent from CSV |
| 90 | ききます | 6 | Meaning and translations absent from CSV |
| 91 | きのう／きのう | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 92 | きます | 5 | Meaning and translations absent from CSV |
| 93 | きゅうこう | 5 | Meaning and translations absent from CSV |
| 94 | ぎゅうにゅう | 6 | Meaning and translations absent from CSV |
| 95 | きょう | 4 | Meaning and translations absent from CSV |
| 97 | きょうしつ | 3 | Meaning and translations absent from CSV |
| 98 | きょねん | 5 | Meaning and translations absent from CSV |
| 99 | ぎんこう | 4 | Meaning and translations absent from CSV |
| 101 | きんようび | 4 | Meaning and translations absent from CSV |
| 102 | [～を] ください。 | 3 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 103 | くだもの | 6 | Meaning and translations absent from CSV |
| 104 | くつ | 3 | Meaning and translations absent from CSV |
| 105 | くに | 3 | Meaning and translations absent from CSV |
| 107 | けさ | 4 | Meaning and translations absent from CSV |
| 108 | げつようび | 4 | Meaning and translations absent from CSV |
| 111 | こうしえん | 5 | Meaning and translations absent from CSV |
| 112 | こうちゃ | 6 | Meaning and translations absent from CSV |
| 113 | こうべびょういん | 1 | Meaning and translations absent from CSV |
| 115 | ここ | 3 | Meaning and translations absent from CSV |
| 116 | ごご | 4 | Meaning and translations absent from CSV |
| 117 | ここのか | 5 | Meaning and translations absent from CSV |
| 118 | ごぜん | 4 | Meaning and translations absent from CSV |
| 119 | こちら | 3 | Meaning and translations absent from CSV |
| 122 | ことし | 5 | Meaning and translations absent from CSV |
| 124 | ごはん | 6 | Meaning and translations absent from CSV |
| 127 | こんげつ | 5 | Meaning and translations absent from CSV |
| 128 | こんしゅう | 5 | Meaning and translations absent from CSV |
| 129 | こんばん | 4 | Meaning and translations absent from CSV |
| 132 | さかな | 6 | Meaning and translations absent from CSV |
| 133 | さくらだいがく | 1 | Meaning and translations absent from CSV |
| 134 | さけ | 6 | Meaning and translations absent from CSV |
| 135 | サッカー | 6 | Meaning and translations absent from CSV |
| 138 | …じ | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 139 | シーディー(CD) | 2 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 140 | しけん | 4 | Meaning and translations absent from CSV |
| 143 | じてんしゃ | 5 | Meaning and translations absent from CSV |
| 144 | じどうはんばいき | 3 | Meaning and translations absent from CSV |
| 145 | します | 6 | Meaning and translations absent from CSV |
| 146 | じむしょ | 3 | Meaning and translations absent from CSV |
| 147 | じゃ | 3 | Meaning and translations absent from CSV |
| 150 | ジャカルタ | 3 | Meaning and translations absent from CSV |
| 151 | しゃしん | 6 | Meaning and translations absent from CSV |
| 152 | じゃ、また [あした]。 | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 153 | ジュース | 6 | Meaning and translations absent from CSV |
| 154 | じゅうよっか | 5 | Meaning and translations absent from CSV |
| 155 | しゅくだい | 6 | Meaning and translations absent from CSV |
| 156 | しょくどう | 3 | Meaning and translations absent from CSV |
| 158 | しんおおさか | 3 | Meaning and translations absent from CSV |
| 159 | しんかんせん | 5 | Meaning and translations absent from CSV |
| 161 | スイス | 3 | Meaning and translations absent from CSV |
| 162 | すいます[たばこを～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 163 | すいようび | 4 | Meaning and translations absent from CSV |
| 164 | スーパー | 5 | Meaning and translations absent from CSV |
| 165 | すみません | 3 | Meaning and translations absent from CSV |
| 166 | せん | 3 | Meaning and translations absent from CSV |
| 167 | せんげつ | 5 | Meaning and translations absent from CSV |
| 168 | せんしゅう | 5 | Meaning and translations absent from CSV |
| 172 | そうですね。 | 5 | Meaning and translations absent from CSV |
| 173 | そこ | 3 | Meaning and translations absent from CSV |
| 174 | そちら | 3, 4 | Meaning and translations absent from CSV |
| 177 | それから | 6 | Meaning and translations absent from CSV |
| 180 | たいへんですね。 | 4 | Meaning and translations absent from CSV |
| 181 | タクシー | 5 | Meaning and translations absent from CSV |
| 182 | たばこ | 6 | Meaning and translations absent from CSV |
| 183 | たべます | 6 | Meaning and translations absent from CSV |
| 184 | たまご | 6 | Meaning and translations absent from CSV |
| 186 | たんじょうび | 5 | Meaning and translations absent from CSV |
| 187 | ちか | 3 | Meaning and translations absent from CSV |
| 189 | ちかてつ | 5 | Meaning and translations absent from CSV |
| 193 | ちょっと | 6 | Meaning and translations absent from CSV |
| 194 | ついたち | 5 | Meaning and translations absent from CSV |
| 195 | つぎの | 5 | Meaning and translations absent from CSV |
| 197 | つるや | 6 | Meaning and translations absent from CSV |
| 198 | てがみ | 6 | Meaning and translations absent from CSV |
| 200 | テニス | 6 | Meaning and translations absent from CSV |
| 201 | デパート | 4 | Meaning and translations absent from CSV |
| 203 | でんしゃ | 5 | Meaning and translations absent from CSV |
| 204 | でんわ | 3 | Meaning and translations absent from CSV |
| 205 | ～と～ | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 206 | トイレ | 3 | Meaning and translations absent from CSV |
| 208 | どう いたしまして。 | 5 | Meaning and translations absent from CSV |
| 211 | どうも。 | 3 | Meaning and translations absent from CSV |
| 212 | [どうも] ありがとう ございました。 | 5 | Meaning and translations absent from CSV |
| 214 | とおか | 5 | Meaning and translations absent from CSV |
| 215 | ときどき | 6 | Meaning and translations absent from CSV |
| 217 | どこ | 3 | Meaning and translations absent from CSV |
| 218 | としょかん | 4 | Meaning and translations absent from CSV |
| 219 | どちら | 3 | Meaning and translations absent from CSV |
| 220 | とっきゅう | 5 | Meaning and translations absent from CSV |
| 222 | ともだち | 5 | Meaning and translations absent from CSV |
| 223 | どようび | 4 | Meaning and translations absent from CSV |
| 224 | とります[しゃしんを～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 225 | なに | 6 | Meaning and translations absent from CSV |
| 226 | なのか | 5 | Meaning and translations absent from CSV |
| 228 | なんがい | 3 | Meaning and translations absent from CSV |
| 229 | なんがつ | 5 | Meaning and translations absent from CSV |
| 231 | なんじ | 4 | Meaning and translations absent from CSV |
| 232 | なんですか。 | 6 | Meaning and translations absent from CSV |
| 233 | なんにち | 5 | Meaning and translations absent from CSV |
| 234 | なんねん | 5 | Meaning and translations absent from CSV |
| 235 | なんばん | 4 | Meaning and translations absent from CSV |
| 236 | なんぷん | 4 | Meaning and translations absent from CSV |
| 237 | なんようび | 4 | Meaning and translations absent from CSV |
| 238 | にく | 6 | Meaning and translations absent from CSV |
| 239 | にじゅうよっか | 5 | Meaning and translations absent from CSV |
| 240 | …にち | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 241 | にちようび | 4 | Meaning and translations absent from CSV |
| 244 | ニューヨーク | 4 | Meaning and translations absent from CSV |
| 245 | にわ | 6 | Meaning and translations absent from CSV |
| 246 | ネクタイ | 3 | Meaning and translations absent from CSV |
| 247 | ねます | 4 | Meaning and translations absent from CSV |
| 248 | …ねん | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 250 | のみます | 6 | Meaning and translations absent from CSV |
| 253 | バス | 5 | Meaning and translations absent from CSV |
| 254 | はたらきます | 4 | Meaning and translations absent from CSV |
| 255 | はつか | 5 | Meaning and translations absent from CSV |
| 256 | はなみ | 6 | Meaning and translations absent from CSV |
| 257 | パワーでんき | 1 | Meaning and translations absent from CSV |
| 258 | はん | 4 | Meaning and translations absent from CSV |
| 259 | ばん | 4 | Meaning and translations absent from CSV |
| 260 | パン | 6 | Meaning and translations absent from CSV |
| 261 | ばんごう | 4 | Meaning and translations absent from CSV |
| 262 | バンコク | 3 | Meaning and translations absent from CSV |
| 263 | ばんごはん | 6 | Meaning and translations absent from CSV |
| 264 | …ばんせん | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 265 | ビール | 6 | Meaning and translations absent from CSV |
| 266 | ひこうき | 5 | Meaning and translations absent from CSV |
| 267 | びじゅつかん | 4 | Meaning and translations absent from CSV |
| 268 | ビデオ | 6 | Meaning and translations absent from CSV |
| 269 | ひと | 5 | Meaning and translations absent from CSV |
| 270 | ひとりで | 5 | Meaning and translations absent from CSV |
| 271 | ひゃく | 3 | Meaning and translations absent from CSV |
| 273 | ひる | 4 | Meaning and translations absent from CSV |
| 274 | ひるごはん | 6 | Meaning and translations absent from CSV |
| 275 | ひるやすみ | 4 | Meaning and translations absent from CSV |
| 276 | ふじだいがく | 1 | Meaning and translations absent from CSV |
| 277 | ふつう | 5 | Meaning and translations absent from CSV |
| 278 | ふつか | 5 | Meaning and translations absent from CSV |
| 279 | ふね | 5 | Meaning and translations absent from CSV |
| 281 | ブラジルエアー | 1 | Meaning and translations absent from CSV |
| 282 | フランス | 3 | Meaning and translations absent from CSV |
| 283 | フランスや | 6 | Meaning and translations absent from CSV |
| 284 | …ふん(…ぷん) | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 285 | ペキン | 4 | Meaning and translations absent from CSV |
| 286 | へや | 3 | Meaning and translations absent from CSV |
| 287 | ベルリン | 3 | Meaning and translations absent from CSV |
| 288 | べんきょうします | 4 | Meaning and translations absent from CSV |
| 291 | まいあさ | 4 | Meaning and translations absent from CSV |
| 292 | まいにち | 4 | Meaning and translations absent from CSV |
| 293 | まいにちや | 6 | Meaning and translations absent from CSV |
| 294 | まいばん | 4 | Meaning and translations absent from CSV |
| 295 | ～まで | 4 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 296 | まん | 3 | Meaning and translations absent from CSV |
| 297 | みず | 6 | Meaning and translations absent from CSV |
| 298 | みせ | 6 | Meaning and translations absent from CSV |
| 299 | [～を] みせて ください。 | 3 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 300 | みっか | 5 | Meaning and translations absent from CSV |
| 301 | みどりとしょかん | 4 | Meaning and translations absent from CSV |
| 302 | みます | 6 | Meaning and translations absent from CSV |
| 304 | ミルク | 6 | Meaning and translations absent from CSV |
| 305 | むいか | 5 | Meaning and translations absent from CSV |
| 307 | メキシコ | 6 | Meaning and translations absent from CSV |
| 308 | もくようび | 4 | Meaning and translations absent from CSV |
| 309 | やさい | 6 | Meaning and translations absent from CSV |
| 310 | やすみ | 4 | Meaning and translations absent from CSV |
| 311 | やすみます | 4 | Meaning and translations absent from CSV |
| 312 | やまとびじゅつかん | 4 | Meaning and translations absent from CSV |
| 313 | ゆうびんきょく | 4 | Meaning and translations absent from CSV |
| 314 | ようか | 5 | Meaning and translations absent from CSV |
| 315 | よっか | 5 | Meaning and translations absent from CSV |
| 316 | よみます | 6 | Meaning and translations absent from CSV |
| 317 | よる | 4 | Meaning and translations absent from CSV |
| 319 | らいげつ | 5 | Meaning and translations absent from CSV |
| 320 | らいしゅう | 5 | Meaning and translations absent from CSV |
| 321 | らいねん | 5 | Meaning and translations absent from CSV |
| 323 | レポート | 6 | Meaning and translations absent from CSV |
| 324 | ロサンゼルス | 4 | Meaning and translations absent from CSV |
| 325 | ロビー | 3 | Meaning and translations absent from CSV |
| 326 | ロンドン | 4 | Meaning and translations absent from CSV |
| 327 | ワイン | 3 | Meaning and translations absent from CSV |
| 328 | わかりました。 | 6 | Meaning and translations absent from CSV |

## Validation

- `node scripts/import-chapters.cjs` — repeat import has zero additions or updates.
- `node tests/chapter-import.cjs` — completeness, unique IDs, chapters, category coverage, eligibility and separate-sense handling.
- `node tests/verify.cjs` — scoring, progress, game pools, bilingual rendering, navigation and retries.
- `node tests/pwa.cjs` — offline cache and asset integrity.
- `CHROMIUM_PATH=/usr/bin/chromium node tests/dialogue-modes-browser.cjs` — 96 scoped game launches across both languages and three viewport widths.
- `CHROMIUM_PATH=/usr/bin/chromium node tests/import-dialogue-browser.cjs` — every WH chip, inline updates/reset, long-answer wrapping, chapter browsing and removed-category recovery.

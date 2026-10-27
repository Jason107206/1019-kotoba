> This is the CSV import audit. Subsequent Dialogue filtering and Number Matching coverage are documented in [the current game update](../docs/number-matching.md); the imported vocabulary records and memberships remain unchanged.

# Chapters 1–6 import audit

The final import includes the remote Chapters 3–4 update (`1920993`). That update supplies the location, time, and longer question conversations absent from the original checkout. All source conversations and existing IDs were preserved except the requested Replies conversation removal.

| Measure | Count |
| --- | ---: |
| CSV source rows | 328 |
| Added records | 127 |
| Existing records enriched with source/chapter metadata | 211 |
| Existing records unchanged | 0 |
| Ambiguous matches left unmerged | 0 |
| Total records | 338 |
| Source rows added / updated / unchanged | 127 / 201 / 0 |
| CSV rows needing meaning or reading review | 128 |
| Repeat import added / updated / unchanged / unresolved | 0 / 0 / 328 / 0 |

Source-row and record counts differ because optional printed forms can cover multiple separately taught records, while multiple rows can refer to the same record. All 211 existing database IDs remain present. Browser progress keys and original conversations are preserved.

## Data mapping

The source columns are `japanese`, `kanji`, `chapter`, `page`, and `category`. There are no meanings or translations, and every page cell is blank. Japanese spelling is retained verbatim in `sources` and, for additions, `jp`. Kana readings are stored separately in `kana` only where supplied without ambiguous annotation; kanji maps to `c`. Blank CSV values do not replace existing values. Existing meanings, readings, notes, and source pages are retained.

Matching normalizes Unicode, kana, punctuation, spacing, optional brackets, duplicate slash forms, and explicit parenthetical counter variants. Supplied kanji distinguishes forms. Multiple possible senses or conflicting kanji are held for review. Chapter memberships are unioned; `そちら` remains one record in both Chapters 3 and 4. Existing semantic categories are reused; otherwise source collections Vocabulary and Expressions hold the incomplete records.

Run `node scripts/import-chapters.cjs`. The generated static merge is `dist/csv-content.js`, loaded after the original content and Chapter 3–4 data. The importer reads the current data, preserves aliases and IDs, and verifies a second pass makes no changes. The first merged audit is `chapter-import.json`; subsequent run counts are in `chapter-import-latest.json`.

## Dialogue migrations

There are 73 complete Dialogue entries after removing the sympathy conversation. WH-words contains 17 existing entries: the original five and the available location, affiliation, floor, price, time, weekday, telephone-number, and opening-hours questions. Grouping uses question meaning and answer reading; vocabulary alone never generates a Dialogue entry.

The six existing standard/polite place expressions move to This and That. Here / 這裡, There / 那裡, and Over there / 那邊（遠處）remain distinct from object expressions. Other former location scenes are assigned to Places. The locations category is removed from Dialogue selection and game pools; stale selections fall back to Introduction. The separate vocabulary location category remains available for vocabulary study.

The Replies conversation `ch4-empathy` is removed from its chips and both game pools. The independent Chapter 4 record `4-e1` (たいへんですね) remains in the library under Expressions. CSV re-import does not restore its Replies placement.

WH chips share stable IDs and one active-state updater; selecting updates the conversation, explanation, and target highlighting while retaining row scrolling. Matching/Rebuild answers appear directly inside the underlined learner sentence. The existing opening-hours question now displays `そちらはなんじからなんじまでですか。` as its answer is assembled. Guide and game labels describe reusable offers, ownership, floors, prices, time, and weekday purposes; concrete dialogue text and translations are retained. Counter/time guides remain available after moving their questions to WH-words.

## Review queue

127 added records have no supplied meanings/translations, affecting 128 source rows. Their Japanese forms remain visible in All, By Category, and By Chapter library views. They are excluded from Recall, Rebuild, Kanji Writing, and mock pools until the required data is reviewed. Annotated readings are flagged too. No translations, readings, or conversations were invented to complete these records.

| CSV row | Japanese | Chapters | Review |
| ---: | --- | --- | --- |
| 3 | アイエムシー(IMC) | 1 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 4 | あいます[ともだちに～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 6 | あさごはん | 6 | Meaning and translations absent from CSV |
| 19 | ありがとう ございました。 | 5 | Meaning and translations absent from CSV |
| 21 | あるいて | 5 | Meaning and translations absent from CSV |
| 24 | いいですね。 | 6 | Meaning and translations absent from CSV |
| 25 | いきます | 5 | Meaning and translations absent from CSV |
| 27 | いくつ | 1 | Meaning and translations absent from CSV |
| 32 | いつ | 5 | Meaning and translations absent from CSV |
| 33 | いつか | 5 | Meaning and translations absent from CSV |
| 34 | いっしょに | 6 | Meaning and translations absent from CSV |
| 35 | いつも | 6 | Meaning and translations absent from CSV |
| 45 | ええ | 6 | Meaning and translations absent from CSV |
| 46 | エーケーシー(AKC) | 1 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 47 | えき | 5 | Meaning and translations absent from CSV |
| 54 | おおさかじょう | 5 | Meaning and translations absent from CSV |
| 55 | おおさかデパート | 6 | Meaning and translations absent from CSV |
| 58 | おさけ | 6 | Meaning and translations absent from CSV |
| 59 | おちゃ | 6 | Meaning and translations absent from CSV |
| 63 | おはなみ | 6 | Meaning and translations absent from CSV |
| 73 | かいます | 6 | Meaning and translations absent from CSV |
| 74 | かえります | 5 | Meaning and translations absent from CSV |
| 76 | かきます | 6 | Meaning and translations absent from CSV |
| 79 | かぞく | 5 | Meaning and translations absent from CSV |
| 80 | …がつ | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 81 | がっこう | 5 | Meaning and translations absent from CSV |
| 82 | かのじょ | 5 | Meaning and translations absent from CSV |
| 88 | かれ | 5 | Meaning and translations absent from CSV |
| 90 | ききます | 6 | Meaning and translations absent from CSV |
| 92 | きます | 5 | Meaning and translations absent from CSV |
| 93 | きゅうこう | 5 | Meaning and translations absent from CSV |
| 94 | ぎゅうにゅう | 6 | Meaning and translations absent from CSV |
| 98 | きょねん | 5 | Meaning and translations absent from CSV |
| 103 | くだもの | 6 | Meaning and translations absent from CSV |
| 111 | こうしえん | 5 | Meaning and translations absent from CSV |
| 112 | こうちゃ | 6 | Meaning and translations absent from CSV |
| 113 | こうべびょういん | 1 | Meaning and translations absent from CSV |
| 117 | ここのか | 5 | Meaning and translations absent from CSV |
| 122 | ことし | 5 | Meaning and translations absent from CSV |
| 124 | ごはん | 6 | Meaning and translations absent from CSV |
| 127 | こんげつ | 5 | Meaning and translations absent from CSV |
| 128 | こんしゅう | 5 | Meaning and translations absent from CSV |
| 132 | さかな | 6 | Meaning and translations absent from CSV |
| 133 | さくらだいがく | 1 | Meaning and translations absent from CSV |
| 134 | さけ | 6 | Meaning and translations absent from CSV |
| 135 | サッカー | 6 | Meaning and translations absent from CSV |
| 143 | じてんしゃ | 5 | Meaning and translations absent from CSV |
| 145 | します | 6 | Meaning and translations absent from CSV |
| 151 | しゃしん | 6 | Meaning and translations absent from CSV |
| 152 | じゃ、また [あした]。 | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 153 | ジュース | 6 | Meaning and translations absent from CSV |
| 154 | じゅうよっか | 5 | Meaning and translations absent from CSV |
| 155 | しゅくだい | 6 | Meaning and translations absent from CSV |
| 159 | しんかんせん | 5 | Meaning and translations absent from CSV |
| 162 | すいます[たばこを～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 164 | スーパー | 5 | Meaning and translations absent from CSV |
| 167 | せんげつ | 5 | Meaning and translations absent from CSV |
| 168 | せんしゅう | 5 | Meaning and translations absent from CSV |
| 172 | そうですね。 | 5 | Meaning and translations absent from CSV |
| 177 | それから | 6 | Meaning and translations absent from CSV |
| 181 | タクシー | 5 | Meaning and translations absent from CSV |
| 182 | たばこ | 6 | Meaning and translations absent from CSV |
| 183 | たべます | 6 | Meaning and translations absent from CSV |
| 184 | たまご | 6 | Meaning and translations absent from CSV |
| 186 | たんじょうび | 5 | Meaning and translations absent from CSV |
| 189 | ちかてつ | 5 | Meaning and translations absent from CSV |
| 193 | ちょっと | 6 | Meaning and translations absent from CSV |
| 194 | ついたち | 5 | Meaning and translations absent from CSV |
| 195 | つぎの | 5 | Meaning and translations absent from CSV |
| 197 | つるや | 6 | Meaning and translations absent from CSV |
| 198 | てがみ | 6 | Meaning and translations absent from CSV |
| 200 | テニス | 6 | Meaning and translations absent from CSV |
| 203 | でんしゃ | 5 | Meaning and translations absent from CSV |
| 208 | どう いたしまして。 | 5 | Meaning and translations absent from CSV |
| 212 | [どうも] ありがとう ございました。 | 5 | Meaning and translations absent from CSV |
| 214 | とおか | 5 | Meaning and translations absent from CSV |
| 215 | ときどき | 6 | Meaning and translations absent from CSV |
| 220 | とっきゅう | 5 | Meaning and translations absent from CSV |
| 222 | ともだち | 5 | Meaning and translations absent from CSV |
| 224 | とります[しゃしんを～] | 6 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 225 | なに | 6 | Meaning and translations absent from CSV |
| 226 | なのか | 5 | Meaning and translations absent from CSV |
| 229 | なんがつ | 5 | Meaning and translations absent from CSV |
| 232 | なんですか。 | 6 | Meaning and translations absent from CSV |
| 233 | なんにち | 5 | Meaning and translations absent from CSV |
| 234 | なんねん | 5 | Meaning and translations absent from CSV |
| 238 | にく | 6 | Meaning and translations absent from CSV |
| 239 | にじゅうよっか | 5 | Meaning and translations absent from CSV |
| 240 | …にち | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 245 | にわ | 6 | Meaning and translations absent from CSV |
| 248 | …ねん | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 250 | のみます | 6 | Meaning and translations absent from CSV |
| 253 | バス | 5 | Meaning and translations absent from CSV |
| 255 | はつか | 5 | Meaning and translations absent from CSV |
| 256 | はなみ | 6 | Meaning and translations absent from CSV |
| 257 | パワーでんき | 1 | Meaning and translations absent from CSV |
| 260 | パン | 6 | Meaning and translations absent from CSV |
| 263 | ばんごはん | 6 | Meaning and translations absent from CSV |
| 264 | …ばんせん | 5 | Meaning and translations absent from CSV; Reading requires review (annotated or mixed form) |
| 265 | ビール | 6 | Meaning and translations absent from CSV |
| 266 | ひこうき | 5 | Meaning and translations absent from CSV |
| 268 | ビデオ | 6 | Meaning and translations absent from CSV |
| 269 | ひと | 5 | Meaning and translations absent from CSV |
| 270 | ひとりで | 5 | Meaning and translations absent from CSV |
| 274 | ひるごはん | 6 | Meaning and translations absent from CSV |
| 276 | ふじだいがく | 1 | Meaning and translations absent from CSV |
| 277 | ふつう | 5 | Meaning and translations absent from CSV |
| 278 | ふつか | 5 | Meaning and translations absent from CSV |
| 279 | ふね | 5 | Meaning and translations absent from CSV |
| 281 | ブラジルエアー | 1 | Meaning and translations absent from CSV |
| 283 | フランスや | 6 | Meaning and translations absent from CSV |
| 293 | まいにちや | 6 | Meaning and translations absent from CSV |
| 297 | みず | 6 | Meaning and translations absent from CSV |
| 298 | みせ | 6 | Meaning and translations absent from CSV |
| 300 | みっか | 5 | Meaning and translations absent from CSV |
| 302 | みます | 6 | Meaning and translations absent from CSV |
| 304 | ミルク | 6 | Meaning and translations absent from CSV |
| 305 | むいか | 5 | Meaning and translations absent from CSV |
| 307 | メキシコ | 6 | Meaning and translations absent from CSV |
| 309 | やさい | 6 | Meaning and translations absent from CSV |
| 314 | ようか | 5 | Meaning and translations absent from CSV |
| 315 | よっか | 5 | Meaning and translations absent from CSV |
| 316 | よみます | 6 | Meaning and translations absent from CSV |
| 319 | らいげつ | 5 | Meaning and translations absent from CSV |
| 320 | らいしゅう | 5 | Meaning and translations absent from CSV |
| 321 | らいねん | 5 | Meaning and translations absent from CSV |
| 323 | レポート | 6 | Meaning and translations absent from CSV |
| 328 | わかりました。 | 6 | Meaning and translations absent from CSV |

## Checks

- CSV completeness, repeatability, ID uniqueness, chapter union, distinct senses, and missing-data game eligibility.
- Existing scoring, retries, progress persistence, mock scope, and offline cache checks.
- Chapters 3–4 source coverage and every migrated category’s Matching/Rebuild pool.
- Every WH chip and the real opening-hours answer at mobile and desktop sizes in English and Traditional Chinese.

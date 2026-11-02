'use strict';
// Quiz 2 Revision reuses existing records. It does not copy Japanese into new word IDs.
progress.particleMatching||={};
const QUIZ2_SKIP=new Set(['linking','everyday']);
const QUIZ2_GROUPS=[
 ['facilities','Facilities','設施'],
 ['countries','Countries and regions','國家與地區'],
 ['fictional','Fictional places','虛構場所'],
 ['objects','Objects','物品'],
 ['food','Food','食物'],
 ['actions','Daily actions','日常動作'],
 ['leisure','Leisure & events','休閒與活動'],
 ['clock','Clock time','時刻'],
 ['weekdays','Weekdays','星期'],
 ['counters','Counters','量詞'],
 ['relative','Relative time & frequency','相對時間與頻率'],
 ['questions','Question words & wh-words','疑問詞']
];
// ... (full updated content from local /tmp/kotoba/dist/quiz2.js)

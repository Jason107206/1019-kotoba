 'use strict';
// Explicit reviewed ID membership. Chapter, import source and spelling never decide categories.
const LEARNING_TAXONOMY=[
  {
    "id": "people",
    "label": "People",
    "zh": "人物",
    "description": "Pronouns, family and forms of address.",
    "descriptionZh": "代名詞、家人與稱呼。",
    "subgroups": [
      {
        "id": "pronouns",
        "label": "Pronouns & family",
        "zh": "代名詞與家人",
        "ids": [
          "1-01",
          "1-02",
          "1-03a",
          "1-03b",
          "csv-85fc29e4499613fa",
          "csv-3ba73c6ea36b4989",
          "csv-d4dffb5a5b803637",
          "csv-66356e973c57c474",
          "csv-d174a32922550b37"
        ]
      },
      {
        "id": "address",
        "label": "Forms of address",
        "zh": "稱呼",
        "ids": [
          "1-04",
          "1-05"
        ]
      }
    ],
    "ids": [
      "1-01",
      "1-02",
      "1-03a",
      "1-03b",
      "1-04",
      "1-05",
      "csv-85fc29e4499613fa",
      "csv-3ba73c6ea36b4989",
      "csv-d4dffb5a5b803637",
      "csv-66356e973c57c474",
      "csv-d174a32922550b37"
    ]
  },
  {
    "id": "study",
    "label": "Jobs & study",
    "zh": "工作與學習",
    "description": "Occupations, languages and study-related words.",
    "descriptionZh": "職業、語言與學習相關詞彙。",
    "subgroups": [
      {
        "id": "jobs",
        "label": "Occupations & roles",
        "zh": "職業與角色",
        "ids": [
          "1-07",
          "1-08",
          "1-09",
          "1-10",
          "1-11",
          "1-12",
          "1-13",
          "1-14"
        ]
      },
      {
        "id": "languages",
        "label": "Languages",
        "zh": "語言",
        "ids": [
          "2-33",
          "2-34",
          "2-35"
        ]
      },
      {
        "id": "learning",
        "label": "Study & learning",
        "zh": "學習",
        "ids": [
          "4-32",
          "csv-e8e2f46fabc20cd4",
          "csv-1dcf2c3f1c019d5f"
        ]
      }
    ],
    "ids": [
      "1-07",
      "1-08",
      "1-09",
      "1-10",
      "1-11",
      "1-12",
      "1-13",
      "1-14",
      "2-33",
      "2-34",
      "2-35",
      "4-32",
      "csv-e8e2f46fabc20cd4",
      "csv-1dcf2c3f1c019d5f"
    ]
  },
  {
    "id": "places",
    "label": "Places & geography",
    "zh": "場所與地理",
    "description": "Facilities, countries and named places.",
    "descriptionZh": "設施、國家與地名。",
    "subgroups": [
      {
        "id": "facilities",
        "label": "Facilities & buildings",
        "zh": "設施與建築",
        "ids": [
          "1-15",
          "1-16",
          "3-09",
          "3-10",
          "3-11",
          "3-12",
          "3-13",
          "3-14",
          "3-15",
          "3-16a",
          "3-16b",
          "3-17",
          "3-18",
          "3-19",
          "3-23",
          "3-24",
          "3-28",
          "3-29",
          "4-07",
          "4-08",
          "4-09",
          "4-10",
          "4-11",
          "csv-96faf26ff6e24abe",
          "csv-3b693859f9dedc50",
          "csv-3e715ed68e25a4b2",
          "csv-fe19f59584c74922",
          "csv-c1bbf30546c0876e"
        ]
      },
      {
        "id": "countries",
        "label": "Countries & nationality",
        "zh": "國家與國籍",
        "ids": [
          "1-06",
          "1-r1",
          "1-r2",
          "1-r3",
          "1-r4",
          "1-r5",
          "1-r6",
          "1-r7",
          "1-r8",
          "1-r9",
          "1-r10",
          "3-22a",
          "3-22b",
          "3-r1",
          "3-r2",
          "3-r3",
          "csv-15a68a335b8ce750"
        ]
      },
      {
        "id": "named",
        "label": "Named places & organisations",
        "zh": "地名與機構名稱",
        "ids": [
          "3-r4",
          "3-r5",
          "3-r6",
          "4-r1",
          "4-r2",
          "4-r3",
          "4-r4",
          "4-r5",
          "4-r6",
          "4-r7",
          "4-r8",
          "csv-3c7d4b08462bc4f1",
          "csv-bd7ed3e561d8f856",
          "csv-f0a8ad38c4b26077",
          "csv-a22105b120419229",
          "csv-28e2535376fd8952",
          "csv-24110f167642a49c",
          "csv-5babde796c69ee99",
          "csv-e0ef263ea957a0ed",
          "csv-28b35d9b1a29e3bd",
          "csv-1c673828b19f140f",
          "csv-7397e594beb9d693",
          "csv-b199fcf6b483fa68",
          "csv-3395ecf63186e543",
          "3-r7"
        ]
      }
    ],
    "ids": [
      "1-06",
      "1-15",
      "1-16",
      "1-r1",
      "1-r2",
      "1-r3",
      "1-r4",
      "1-r5",
      "1-r6",
      "1-r7",
      "1-r8",
      "1-r9",
      "1-r10",
      "3-09",
      "3-10",
      "3-11",
      "3-12",
      "3-13",
      "3-14",
      "3-15",
      "3-16a",
      "3-16b",
      "3-17",
      "3-18",
      "3-19",
      "3-22a",
      "3-22b",
      "3-23",
      "3-24",
      "3-28",
      "3-29",
      "3-r1",
      "3-r2",
      "3-r3",
      "3-r4",
      "3-r5",
      "3-r6",
      "4-07",
      "4-08",
      "4-09",
      "4-10",
      "4-11",
      "4-r1",
      "4-r2",
      "4-r3",
      "4-r4",
      "4-r5",
      "4-r6",
      "4-r7",
      "4-r8",
      "csv-3c7d4b08462bc4f1",
      "csv-bd7ed3e561d8f856",
      "csv-96faf26ff6e24abe",
      "csv-f0a8ad38c4b26077",
      "csv-a22105b120419229",
      "csv-3b693859f9dedc50",
      "csv-28e2535376fd8952",
      "csv-24110f167642a49c",
      "csv-5babde796c69ee99",
      "csv-3e715ed68e25a4b2",
      "csv-e0ef263ea957a0ed",
      "csv-fe19f59584c74922",
      "csv-28b35d9b1a29e3bd",
      "csv-1c673828b19f140f",
      "csv-7397e594beb9d693",
      "csv-b199fcf6b483fa68",
      "csv-3395ecf63186e543",
      "csv-c1bbf30546c0876e",
      "csv-15a68a335b8ce750",
      "3-r7"
    ]
  },
  {
    "id": "objects",
    "label": "Objects & belongings",
    "zh": "物件與隨身物品",
    "description": "Books, stationery, electronics and personal items.",
    "descriptionZh": "書籍、文具、電子產品與個人物品。",
    "subgroups": [
      {
        "id": "books",
        "label": "Books & stationery",
        "zh": "書籍與文具",
        "ids": [
          "2-07",
          "2-08",
          "2-09",
          "2-10",
          "2-11",
          "2-12",
          "2-13",
          "2-14",
          "2-15",
          "2-16",
          "2-17"
        ]
      },
      {
        "id": "personal",
        "label": "Personal belongings",
        "zh": "個人物品",
        "ids": [
          "2-18",
          "2-19",
          "2-20",
          "2-21",
          "2-32a",
          "2-32b",
          "3-20",
          "3-25",
          "3-26",
          "csv-39827ceb3d02520a",
          "csv-c11a3275fec09a2b"
        ]
      },
      {
        "id": "media",
        "label": "Electronics & media",
        "zh": "電子產品與媒體",
        "ids": [
          "2-22",
          "2-23",
          "2-24",
          "2-25",
          "2-26",
          "3-21",
          "csv-636d771fbcf06c13",
          "csv-a21d0ee87a3c3deb"
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "zh": "傢俱",
        "ids": [
          "2-28",
          "2-29"
        ]
      }
    ],
    "ids": [
      "2-07",
      "2-08",
      "2-09",
      "2-10",
      "2-11",
      "2-12",
      "2-13",
      "2-14",
      "2-15",
      "2-16",
      "2-17",
      "2-18",
      "2-19",
      "2-20",
      "2-21",
      "2-22",
      "2-23",
      "2-24",
      "2-25",
      "2-26",
      "2-28",
      "2-29",
      "2-32a",
      "2-32b",
      "3-20",
      "3-21",
      "3-25",
      "3-26",
      "csv-636d771fbcf06c13",
      "csv-39827ceb3d02520a",
      "csv-c11a3275fec09a2b",
      "csv-a21d0ee87a3c3deb"
    ]
  },
  {
    "id": "food",
    "label": "Food & drinks",
    "zh": "飲食",
    "description": "Meals, ingredients and drinks.",
    "descriptionZh": "餐點、食材與飲品。",
    "subgroups": [
      {
        "id": "meals",
        "label": "Meals & food",
        "zh": "餐點與食物",
        "ids": [
          "2-30",
          "csv-49dbdb19c4ed703b",
          "csv-c95c5a42a2c4dc0f",
          "csv-6bcbca4ff9d1339c",
          "csv-5d4309a567cd471b",
          "csv-9d3438acae746a2b",
          "csv-b7e64825c6bfc605",
          "csv-de32617ea8103232",
          "csv-affaad7513b5d4c8",
          "csv-1e0b486bbcdc48d6",
          "csv-0bad5ff77209d4f0"
        ]
      },
      {
        "id": "drinks",
        "label": "Drinks",
        "zh": "飲品",
        "ids": [
          "2-31",
          "3-27",
          "csv-466ef427aeaa04c0",
          "csv-73d6ed4fb078beac",
          "csv-c5e1b6f79ac06f78",
          "csv-8f8245c5ed921c82",
          "csv-b4278971fe60aaba",
          "csv-59fc344c5d6c0e5b",
          "csv-c90996b5e92d7c1e",
          "csv-4eb49f0d02d973b0",
          "csv-bc3c569041e86eb6"
        ]
      }
    ],
    "ids": [
      "2-30",
      "2-31",
      "3-27",
      "csv-49dbdb19c4ed703b",
      "csv-466ef427aeaa04c0",
      "csv-73d6ed4fb078beac",
      "csv-c5e1b6f79ac06f78",
      "csv-c95c5a42a2c4dc0f",
      "csv-8f8245c5ed921c82",
      "csv-6bcbca4ff9d1339c",
      "csv-5d4309a567cd471b",
      "csv-b4278971fe60aaba",
      "csv-59fc344c5d6c0e5b",
      "csv-9d3438acae746a2b",
      "csv-b7e64825c6bfc605",
      "csv-de32617ea8103232",
      "csv-affaad7513b5d4c8",
      "csv-c90996b5e92d7c1e",
      "csv-1e0b486bbcdc48d6",
      "csv-4eb49f0d02d973b0",
      "csv-bc3c569041e86eb6",
      "csv-0bad5ff77209d4f0"
    ]
  },
  {
    "id": "travel",
    "label": "Transport & travel",
    "zh": "交通與出行",
    "description": "Vehicles, train services and travel expressions.",
    "descriptionZh": "交通工具、列車種類與出行表達。",
    "subgroups": [
      {
        "id": "vehicles",
        "label": "Vehicles",
        "zh": "交通工具",
        "ids": [
          "2-27",
          "csv-5a10eafbbd35a055",
          "csv-6cec773780557979",
          "csv-8fea79d5439bf91d",
          "csv-877ca5f99e8338a8",
          "csv-866bfdb4796056e3",
          "csv-c98d6b858839265e",
          "csv-337bdbc7d43ef9ad"
        ]
      },
      {
        "id": "trains",
        "label": "Train services & platforms",
        "zh": "列車種類與月台",
        "ids": [
          "csv-97d70ee391716129",
          "csv-75cc337163f92d4a",
          "csv-ee51b3e0ae0fd355",
          "csv-4f20834e51a03b0c",
          "csv-3236ade61764e870"
        ]
      },
      {
        "id": "movement",
        "label": "Travel expressions",
        "zh": "出行表達",
        "ids": [
          "1-c2",
          "csv-f50227659b484b36",
          "csv-e5f8b4417ebfe19c",
          "csv-a24023d5cf432e72",
          "csv-d210788ec91c38a2"
        ]
      }
    ],
    "ids": [
      "1-c2",
      "2-27",
      "csv-f50227659b484b36",
      "csv-e5f8b4417ebfe19c",
      "csv-a24023d5cf432e72",
      "csv-d210788ec91c38a2",
      "csv-97d70ee391716129",
      "csv-5a10eafbbd35a055",
      "csv-75cc337163f92d4a",
      "csv-6cec773780557979",
      "csv-8fea79d5439bf91d",
      "csv-877ca5f99e8338a8",
      "csv-ee51b3e0ae0fd355",
      "csv-866bfdb4796056e3",
      "csv-4f20834e51a03b0c",
      "csv-c98d6b858839265e",
      "csv-3236ade61764e870",
      "csv-337bdbc7d43ef9ad"
    ]
  },
  {
    "id": "actions",
    "label": "Actions & daily activities",
    "zh": "動作與日常活動",
    "description": "Actions, leisure activities and events.",
    "descriptionZh": "動作、休閒活動與事件。",
    "subgroups": [
      {
        "id": "verbs",
        "label": "Daily actions",
        "zh": "日常動作",
        "ids": [
          "4-01",
          "4-02",
          "4-03",
          "4-04",
          "4-05",
          "4-06",
          "csv-7177af3f64881d19",
          "csv-df823f0054e95444",
          "csv-d0b1c1b9cff1afa8",
          "csv-75b0e4c01e1d84c5",
          "csv-e1fe9fe823893e71",
          "csv-8c8770a8bd199980",
          "csv-47e0d02b093eaa10",
          "csv-cc1157bdb7daec7d",
          "csv-94a36930bfbb9722",
          "csv-1ff1d8b46cf7910c",
          "csv-41e7fb780375c38e"
        ]
      },
      {
        "id": "events",
        "label": "Leisure & events",
        "zh": "休閒與事件",
        "ids": [
          "4-31",
          "4-33",
          "4-34",
          "csv-36a14c686f5072d1",
          "csv-7dc41055c5283da3",
          "csv-1981cf9bdbeb6a22",
          "csv-59357d2a2ba16d1d"
        ]
      },
      {
        "id": "manner",
        "label": "Doing things together or alone",
        "zh": "一起或獨自活動",
        "ids": [
          "csv-ddb642595b09a8d7",
          "csv-f66659321ab61768",
          "csv-ad4bed84d1d20277"
        ]
      }
    ],
    "ids": [
      "4-01",
      "4-02",
      "4-03",
      "4-04",
      "4-05",
      "4-06",
      "4-31",
      "4-33",
      "4-34",
      "csv-7177af3f64881d19",
      "csv-ddb642595b09a8d7",
      "csv-36a14c686f5072d1",
      "csv-df823f0054e95444",
      "csv-d0b1c1b9cff1afa8",
      "csv-75b0e4c01e1d84c5",
      "csv-7dc41055c5283da3",
      "csv-e1fe9fe823893e71",
      "csv-8c8770a8bd199980",
      "csv-47e0d02b093eaa10",
      "csv-f66659321ab61768",
      "csv-1981cf9bdbeb6a22",
      "csv-cc1157bdb7daec7d",
      "csv-94a36930bfbb9722",
      "csv-59357d2a2ba16d1d",
      "csv-ad4bed84d1d20277",
      "csv-1ff1d8b46cf7910c",
      "csv-41e7fb780375c38e"
    ]
  },
  {
    "id": "time",
    "label": "Time & dates",
    "zh": "時間與日期",
    "description": "Clock time, calendar dates, relative time and frequency.",
    "descriptionZh": "時刻、日期、相對時間與頻率。",
    "subgroups": [
      {
        "id": "clock",
        "label": "Clock time",
        "zh": "時刻",
        "ids": [
          "4-12",
          "4-13",
          "4-14a",
          "4-14b",
          "4-15",
          "4-18",
          "4-19",
          "4-20",
          "4-21",
          "4-22a",
          "4-22b"
        ]
      },
      {
        "id": "weekdays",
        "label": "Weekdays",
        "zh": "星期",
        "ids": [
          "4-38",
          "4-39",
          "4-40",
          "4-41",
          "4-42",
          "4-43",
          "4-44"
        ]
      },
      {
        "id": "calendar",
        "label": "Calendar dates & counters",
        "zh": "日期與量詞",
        "ids": [
          "csv-5c0a9a882b9d9a39",
          "csv-a0827d7777003ef6",
          "csv-c221dba0167ae1e9",
          "csv-b18a5ba6256ca74e",
          "csv-9c2a0dad1676a16c",
          "csv-c2a089d9c108210d",
          "csv-9c701220455cac91",
          "csv-5702f6977f743b93",
          "csv-80e2b972cd3e2a7b",
          "csv-7102dff50ca5a822",
          "csv-7b39f2af6e32e892",
          "csv-baf16aec6f47fddc",
          "csv-7048eafe3ccb9af5",
          "csv-4da5f65019726165",
          "csv-b65570a0efd59fe4",
          "csv-98d3825988ce5f0a",
          "csv-db95619e9dabec3f"
        ]
      },
      {
        "id": "relative",
        "label": "Relative time & frequency",
        "zh": "相對時間與頻率",
        "ids": [
          "4-23",
          "4-24",
          "4-25",
          "4-26",
          "4-27",
          "4-28",
          "4-29",
          "4-30",
          "4-35",
          "4-36",
          "4-37",
          "csv-c3c059abac5ad613",
          "csv-a868b59281a163d0",
          "csv-30b189ebcd7003c3",
          "csv-c803b519e3fc772d",
          "csv-17a1e9fa6d674c24",
          "csv-23b4d2461d6440ab",
          "csv-3c6769841cb20689",
          "csv-184a04e7c5d4fccd",
          "csv-6b187d085f20d980",
          "csv-9263b75441c6fb63",
          "csv-3fd555b0c01ae8b3",
          "csv-07d7f60a32c5d106"
        ]
      }
    ],
    "ids": [
      "4-12",
      "4-13",
      "4-14a",
      "4-14b",
      "4-15",
      "4-18",
      "4-19",
      "4-20",
      "4-21",
      "4-22a",
      "4-22b",
      "4-23",
      "4-24",
      "4-25",
      "4-26",
      "4-27",
      "4-28",
      "4-29",
      "4-30",
      "4-35",
      "4-36",
      "4-37",
      "4-38",
      "4-39",
      "4-40",
      "4-41",
      "4-42",
      "4-43",
      "4-44",
      "csv-5c0a9a882b9d9a39",
      "csv-c3c059abac5ad613",
      "csv-a0827d7777003ef6",
      "csv-a868b59281a163d0",
      "csv-c221dba0167ae1e9",
      "csv-30b189ebcd7003c3",
      "csv-c803b519e3fc772d",
      "csv-17a1e9fa6d674c24",
      "csv-b18a5ba6256ca74e",
      "csv-23b4d2461d6440ab",
      "csv-3c6769841cb20689",
      "csv-9c2a0dad1676a16c",
      "csv-c2a089d9c108210d",
      "csv-184a04e7c5d4fccd",
      "csv-9c701220455cac91",
      "csv-6b187d085f20d980",
      "csv-5702f6977f743b93",
      "csv-80e2b972cd3e2a7b",
      "csv-7102dff50ca5a822",
      "csv-7b39f2af6e32e892",
      "csv-baf16aec6f47fddc",
      "csv-7048eafe3ccb9af5",
      "csv-4da5f65019726165",
      "csv-b65570a0efd59fe4",
      "csv-98d3825988ce5f0a",
      "csv-db95619e9dabec3f",
      "csv-9263b75441c6fb63",
      "csv-3fd555b0c01ae8b3",
      "csv-07d7f60a32c5d106"
    ]
  },
  {
    "id": "numbers",
    "label": "Numbers, prices & counters",
    "zh": "數字、價格與量詞",
    "description": "Number units, prices and counting suffixes.",
    "descriptionZh": "數字單位、價格與計數後綴。",
    "subgroups": [
      {
        "id": "units",
        "label": "Number units",
        "zh": "數字單位",
        "ids": [
          "3-34",
          "3-35",
          "3-36",
          "4-c1"
        ]
      },
      {
        "id": "prices",
        "label": "Prices",
        "zh": "價格",
        "ids": [
          "3-32"
        ]
      },
      {
        "id": "counters",
        "label": "Age & floor counters",
        "zh": "年齡與樓層量詞",
        "ids": [
          "1-18",
          "3-30a",
          "3-30b"
        ]
      }
    ],
    "ids": [
      "1-18",
      "3-30a",
      "3-30b",
      "3-32",
      "3-34",
      "3-35",
      "3-36",
      "4-c1"
    ]
  },
  {
    "id": "questions",
    "label": "Question & pointing words",
    "zh": "疑問詞與指示詞",
    "description": "Question expressions and words that point to people, objects or places.",
    "descriptionZh": "疑問表達與指示人物、物件或場所的詞。",
    "subgroups": [
      {
        "id": "question",
        "label": "Question words",
        "zh": "疑問詞",
        "ids": [
          "1-17a",
          "1-17b",
          "1-19a",
          "1-19b",
          "2-36",
          "3-04",
          "3-08",
          "3-31",
          "3-33",
          "4-16",
          "4-17",
          "4-45",
          "4-c2",
          "csv-5820ce9c10bf95fb",
          "csv-da275c2671ca3790",
          "csv-61d84228493517e8",
          "csv-c8125aa6b2d08005",
          "csv-5b2bd2f1b059a707",
          "csv-9211080b604c7214",
          "csv-37a34299f8aac5ba"
        ]
      },
      {
        "id": "standalone",
        "label": "Standalone object words",
        "zh": "獨立物件指示詞",
        "ids": [
          "2-01",
          "2-02",
          "2-03"
        ]
      },
      {
        "id": "modifiers",
        "label": "Words before nouns",
        "zh": "名詞前的指示詞",
        "ids": [
          "2-04",
          "2-05",
          "2-06"
        ]
      },
      {
        "id": "location",
        "label": "Location expressions",
        "zh": "位置表達",
        "ids": [
          "3-01",
          "3-02",
          "3-03",
          "3-05",
          "3-06",
          "3-07"
        ]
      }
    ],
    "ids": [
      "1-17a",
      "1-17b",
      "1-19a",
      "1-19b",
      "2-01",
      "2-02",
      "2-03",
      "2-04",
      "2-05",
      "2-06",
      "2-36",
      "3-01",
      "3-02",
      "3-03",
      "3-04",
      "3-05",
      "3-06",
      "3-07",
      "3-08",
      "3-31",
      "3-33",
      "4-16",
      "4-17",
      "4-45",
      "4-c2",
      "csv-5820ce9c10bf95fb",
      "csv-da275c2671ca3790",
      "csv-61d84228493517e8",
      "csv-c8125aa6b2d08005",
      "csv-5b2bd2f1b059a707",
      "csv-9211080b604c7214",
      "csv-37a34299f8aac5ba"
    ]
  },
  {
    "id": "linking",
    "label": "Linking words & particles",
    "zh": "連接詞與助詞",
    "description": "Connect ideas, nouns and time ranges.",
    "descriptionZh": "連接意思、名詞與時間範圍。",
    "subgroups": [
      {
        "id": "particles",
        "label": "Particles",
        "zh": "助詞",
        "ids": [
          "4-46",
          "4-47",
          "4-48"
        ]
      },
      {
        "id": "connectors",
        "label": "Linking expressions",
        "zh": "連接表達",
        "ids": [
          "3-c3",
          "csv-1d44190694449872"
        ]
      }
    ],
    "ids": [
      "3-c3",
      "4-46",
      "4-47",
      "4-48",
      "csv-1d44190694449872"
    ]
  },
  {
    "id": "everyday",
    "label": "Everyday expressions",
    "zh": "日常表達",
    "description": "Expressions for meeting people, courtesy and reactions.",
    "descriptionZh": "見面、禮貌應對與反應的表達。",
    "subgroups": [
      {
        "id": "meeting",
        "label": "Meeting people",
        "zh": "認識他人",
        "ids": [
          "1-c1",
          "1-c3a",
          "1-c3b",
          "1-c3c",
          "1-c3d",
          "1-c6",
          "2-d1",
          "2-d2a",
          "2-d2b",
          "2-d2c",
          "2-d2d"
        ]
      },
      {
        "id": "greetings",
        "label": "Greetings & farewells",
        "zh": "問候與道別",
        "ids": [
          "csv-e71873a7c50a3455"
        ]
      },
      {
        "id": "attention",
        "label": "Attention & requests",
        "zh": "引起注意與請求",
        "ids": [
          "1-c4",
          "1-c5",
          "2-c1",
          "3-c2",
          "3-c2b",
          "3-c4",
          "3-c4b",
          "3-p1"
        ]
      },
      {
        "id": "offering",
        "label": "Offering & customer service",
        "zh": "提供物品與顧客服務",
        "ids": [
          "2-c3",
          "3-c1"
        ]
      },
      {
        "id": "thanks",
        "label": "Thanks & responses",
        "zh": "感謝與回應",
        "ids": [
          "2-c4a",
          "2-c4b",
          "2-c4c",
          "2-c4d",
          "3-p2",
          "csv-9eebca0faf03e6d1",
          "csv-1d26a3f31f546046"
        ]
      },
      {
        "id": "reactions",
        "label": "Replies & reactions",
        "zh": "回答與反應",
        "ids": [
          "1-20",
          "1-21",
          "2-37",
          "2-c2",
          "2-c5",
          "2-c6",
          "2-c7",
          "4-e1",
          "csv-8b77245faf60fc4f",
          "csv-9a3a4421ce87643e",
          "csv-626cfb072a80fcbb",
          "csv-43dcdb53d41a80e5"
        ]
      }
    ],
    "ids": [
      "1-20",
      "1-21",
      "1-c1",
      "1-c3a",
      "1-c3b",
      "1-c3c",
      "1-c3d",
      "1-c4",
      "1-c5",
      "1-c6",
      "2-37",
      "2-d1",
      "2-d2a",
      "2-d2b",
      "2-d2c",
      "2-d2d",
      "2-c1",
      "2-c2",
      "2-c3",
      "2-c4a",
      "2-c4b",
      "2-c4c",
      "2-c4d",
      "2-c5",
      "2-c6",
      "2-c7",
      "3-c1",
      "3-c2",
      "3-c2b",
      "3-c4",
      "3-c4b",
      "3-p1",
      "3-p2",
      "4-e1",
      "csv-9eebca0faf03e6d1",
      "csv-8b77245faf60fc4f",
      "csv-9a3a4421ce87643e",
      "csv-e71873a7c50a3455",
      "csv-626cfb072a80fcbb",
      "csv-1d26a3f31f546046",
      "csv-43dcdb53d41a80e5"
    ]
  }
];
const LEGACY_VOCAB_CATEGORIES=VOCAB_CATEGORIES.map(c=>({...c,ids:[...c.ids]}));
const LEGACY_CATEGORY_MAP={occupations:'study',nationality:'places',languages:'study',introductions:'everyday',courtesy:'everyday',replies:'everyday',locations:'questions',demonstratives:'questions',activities:'actions',days:'time',schedules:'actions',geography:'places','source-vocabulary':'all','source-expressions':'all'};
function migrateCategory(id){return LEGACY_CATEGORY_MAP[id]||id;}
VOCAB_CATEGORIES.splice(0,VOCAB_CATEGORIES.length,...LEARNING_TAXONOMY);
VOCAB_CATEGORY_BY_WORD.clear();
const WORD_CLASSIFICATION=new Map();
for(const g of LEARNING_TAXONOMY)for(const sub of g.subgroups)for(const id of sub.ids){
 if(WORD_CLASSIFICATION.has(id))throw Error('Duplicate primary category: '+id);
 WORD_CLASSIFICATION.set(id,{group:g.id,subgroup:sub.id,tags:[...(sub.id==='calendar'&&['csv-a0827d7777003ef6','csv-7102dff50ca5a822','csv-7b39f2af6e32e892'].includes(id)||sub.id==='counters'||id==='csv-4f20834e51a03b0c'?['counter']:[])]});
 VOCAB_CATEGORY_BY_WORD.set(id,g);
}
if(WORDS.some(w=>!WORD_CLASSIFICATION.has(w.id))||WORD_CLASSIFICATION.size!==WORDS.length)throw Error('Incomplete lexical taxonomy');

// Secondary tags express overlap without changing primary membership or counts.
for(const id of ['3-32','4-13','4-14a','4-14b'])WORD_CLASSIFICATION.get(id).tags.push('counter');
for(const id of ['1-06','2-35'])WORD_CLASSIFICATION.get(id).tags.push('suffix');
WORD_CLASSIFICATION.get('1-c2').tags.push('introduction');

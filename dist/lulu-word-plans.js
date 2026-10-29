'use strict';
// Each plan points to an existing lexical ID; no target Japanese is included in artwork.
const LULU_WORD_PLANS={
  "1-01": {
    "strategy": "action",
    "pose": "self",
    "meaning": "I / me"
  },
  "1-02": {
    "strategy": "action",
    "pose": "you",
    "meaning": "you"
  },
  "1-03a": {
    "strategy": "context",
    "context": "person",
    "meaning": "that person"
  },
  "1-03b": {
    "strategy": "context",
    "context": "person",
    "meaning": "that person (polite)"
  },
  "1-04": {
    "strategy": "context",
    "context": "address",
    "meaning": "Mr / Ms (name suffix)"
  },
  "1-05": {
    "strategy": "context",
    "context": "address",
    "meaning": "affectionate name suffix for children"
  },
  "1-06": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "nationality suffix"
  },
  "1-07": {
    "strategy": "action",
    "pose": "teaching",
    "meaning": "teacher (when referring to someone else)"
  },
  "1-08": {
    "strategy": "action",
    "pose": "teaching",
    "meaning": "teacher (occupation)"
  },
  "1-09": {
    "strategy": "action",
    "pose": "student",
    "meaning": "student"
  },
  "1-10": {
    "strategy": "action",
    "pose": "working",
    "meaning": "company employee"
  },
  "1-11": {
    "strategy": "occupation",
    "occupation": 0,
    "object": "company",
    "meaning": "employee of a named company"
  },
  "1-12": {
    "strategy": "occupation",
    "occupation": 1,
    "object": "bank",
    "meaning": "bank employee"
  },
  "1-13": {
    "strategy": "action",
    "pose": "examining",
    "meaning": "doctor"
  },
  "1-14": {
    "strategy": "action",
    "pose": "researching",
    "meaning": "researcher"
  },
  "1-15": {
    "strategy": "object",
    "object": "university",
    "meaning": "university"
  },
  "1-16": {
    "strategy": "object",
    "object": "hospital",
    "meaning": "hospital"
  },
  "1-17a": {
    "strategy": "context",
    "context": "question",
    "object": "person",
    "meaning": "who"
  },
  "1-17b": {
    "strategy": "context",
    "context": "question",
    "object": "person",
    "meaning": "who (polite)"
  },
  "1-18": {
    "strategy": "context",
    "context": "counter",
    "number": 18,
    "unit": "age",
    "meaning": "years old (suffix)"
  },
  "1-19a": {
    "strategy": "context",
    "context": "question",
    "object": "age",
    "meaning": "how old"
  },
  "1-19b": {
    "strategy": "context",
    "context": "question",
    "object": "age",
    "meaning": "how old (polite)"
  },
  "1-20": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "yes",
    "reaction": "✓"
  },
  "1-21": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "no",
    "reaction": "✕"
  },
  "1-c1": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "nice to meet you"
  },
  "1-c2": {
    "strategy": "context",
    "context": "origin",
    "meaning": "came from …"
  },
  "1-c3a": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "pleased to meet you (short form)"
  },
  "1-c3b": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "pleased to meet you (with どうぞ)"
  },
  "1-c3c": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "pleased to meet you (with おねがいします)"
  },
  "1-c3d": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "pleased to meet you (full form)"
  },
  "1-c4": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "excuse me, but …"
  },
  "1-c5": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "your name, please?"
  },
  "1-c6": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "this is Mr / Ms …"
  },
  "1-r1": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "USA"
  },
  "1-r2": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "UK"
  },
  "1-r3": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "India"
  },
  "1-r4": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Indonesia"
  },
  "1-r5": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "South Korea"
  },
  "1-r6": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Thailand"
  },
  "1-r7": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "China"
  },
  "1-r8": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Germany"
  },
  "1-r9": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Japan"
  },
  "1-r10": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Brazil"
  },
  "2-01": {
    "strategy": "spatial",
    "location": "speaker",
    "object": "book",
    "modifier": false,
    "meaning": "this (near speaker)"
  },
  "2-02": {
    "strategy": "spatial",
    "location": "listener",
    "object": "book",
    "modifier": false,
    "meaning": "that (near listener)"
  },
  "2-03": {
    "strategy": "spatial",
    "location": "far",
    "object": "book",
    "modifier": false,
    "meaning": "that over there (far from both)"
  },
  "2-04": {
    "strategy": "spatial",
    "location": "speaker",
    "object": "book",
    "modifier": true,
    "meaning": "this … (before a noun)"
  },
  "2-05": {
    "strategy": "spatial",
    "location": "listener",
    "object": "book",
    "modifier": true,
    "meaning": "that … (before a noun, near listener)"
  },
  "2-06": {
    "strategy": "spatial",
    "location": "far",
    "object": "book",
    "modifier": true,
    "meaning": "that … over there (before a noun)"
  },
  "2-07": {
    "strategy": "object",
    "object": "book",
    "meaning": "book"
  },
  "2-08": {
    "strategy": "object",
    "object": "dictionary",
    "meaning": "dictionary"
  },
  "2-09": {
    "strategy": "object",
    "object": "magazine",
    "meaning": "magazine"
  },
  "2-10": {
    "strategy": "object",
    "object": "newspaper",
    "meaning": "newspaper"
  },
  "2-11": {
    "strategy": "object",
    "object": "notebook",
    "meaning": "notebook"
  },
  "2-12": {
    "strategy": "object",
    "object": "organiser",
    "meaning": "personal organiser"
  },
  "2-13": {
    "strategy": "object",
    "object": "namecard",
    "meaning": "business card"
  },
  "2-14": {
    "strategy": "object",
    "object": "card",
    "meaning": "card"
  },
  "2-15": {
    "strategy": "object",
    "object": "pencil",
    "meaning": "pencil"
  },
  "2-16": {
    "strategy": "object",
    "object": "ballpoint",
    "meaning": "ballpoint pen"
  },
  "2-17": {
    "strategy": "object",
    "object": "mechanical",
    "meaning": "mechanical pencil"
  },
  "2-18": {
    "strategy": "object",
    "object": "key",
    "meaning": "key"
  },
  "2-19": {
    "strategy": "object",
    "object": "watch",
    "meaning": "clock / watch"
  },
  "2-20": {
    "strategy": "object",
    "object": "umbrella",
    "meaning": "umbrella"
  },
  "2-21": {
    "strategy": "object",
    "object": "bag",
    "meaning": "bag"
  },
  "2-22": {
    "strategy": "object",
    "object": "cd",
    "meaning": "CD"
  },
  "2-23": {
    "strategy": "object",
    "object": "tv",
    "meaning": "television"
  },
  "2-24": {
    "strategy": "object",
    "object": "radio",
    "meaning": "radio"
  },
  "2-25": {
    "strategy": "object",
    "object": "camera",
    "meaning": "camera"
  },
  "2-26": {
    "strategy": "object",
    "object": "computer",
    "meaning": "computer"
  },
  "2-27": {
    "strategy": "object",
    "object": "car",
    "meaning": "car"
  },
  "2-28": {
    "strategy": "object",
    "object": "desk",
    "meaning": "desk"
  },
  "2-29": {
    "strategy": "object",
    "object": "chair",
    "meaning": "chair"
  },
  "2-30": {
    "strategy": "object",
    "object": "chocolate",
    "meaning": "chocolate"
  },
  "2-31": {
    "strategy": "object",
    "object": "coffee",
    "meaning": "coffee"
  },
  "2-32a": {
    "strategy": "context",
    "context": "souvenir",
    "meaning": "souvenir (without お)"
  },
  "2-32b": {
    "strategy": "context",
    "context": "souvenir",
    "meaning": "souvenir (with お)"
  },
  "2-33": {
    "strategy": "context",
    "context": "languages",
    "meaning": "English language"
  },
  "2-34": {
    "strategy": "context",
    "context": "languages",
    "meaning": "Japanese language"
  },
  "2-35": {
    "strategy": "context",
    "context": "languages",
    "meaning": "language suffix"
  },
  "2-36": {
    "strategy": "context",
    "context": "question",
    "object": "book",
    "meaning": "what"
  },
  "2-37": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "so / that is right",
    "reaction": "✓"
  },
  "2-d1": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "I look forward to your kindness"
  },
  "2-d2a": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "the pleasure is mine (short)"
  },
  "2-d2b": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "the pleasure is mine (with どうぞ)"
  },
  "2-d2c": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "the pleasure is mine (with おねがいします)"
  },
  "2-d2d": {
    "strategy": "conversation",
    "purpose": "meeting",
    "pose": "bow",
    "meaning": "the pleasure is mine (full form)"
  },
  "2-c1": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "um / excuse me …"
  },
  "2-c2": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "oh! / what? (surprise)",
    "reaction": "!"
  },
  "2-c3": {
    "strategy": "conversation",
    "purpose": "offering",
    "pose": "gift",
    "meaning": "please / here you are"
  },
  "2-c4a": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thank you (short)"
  },
  "2-c4b": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thank you (with どうも)"
  },
  "2-c4c": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thank you (polite)"
  },
  "2-c4d": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thank you very much (full form)"
  },
  "2-c5": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "I see",
    "reaction": "…"
  },
  "2-c6": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "that is not correct",
    "reaction": "✕"
  },
  "2-c7": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "ah (realisation)",
    "reaction": "!"
  },
  "3-01": {
    "strategy": "spatial",
    "location": "speaker",
    "object": "room",
    "modifier": false,
    "meaning": "here (near the speaker)"
  },
  "3-02": {
    "strategy": "spatial",
    "location": "listener",
    "object": "room",
    "modifier": false,
    "meaning": "there (near the listener)"
  },
  "3-03": {
    "strategy": "spatial",
    "location": "far",
    "object": "room",
    "modifier": false,
    "meaning": "over there (far from both)"
  },
  "3-04": {
    "strategy": "context",
    "context": "question",
    "object": "room",
    "meaning": "where"
  },
  "3-05": {
    "strategy": "spatial",
    "location": "speaker",
    "object": "room",
    "modifier": false,
    "meaning": "here / this way (polite)"
  },
  "3-06": {
    "strategy": "spatial",
    "location": "listener",
    "object": "room",
    "modifier": false,
    "meaning": "there / that way / your place (polite)"
  },
  "3-07": {
    "strategy": "spatial",
    "location": "far",
    "object": "room",
    "modifier": false,
    "meaning": "over there / that way (polite)"
  },
  "3-08": {
    "strategy": "context",
    "context": "question",
    "object": "room",
    "meaning": "where / which way (polite)"
  },
  "3-09": {
    "strategy": "object",
    "object": "classroom",
    "meaning": "classroom"
  },
  "3-10": {
    "strategy": "object",
    "object": "cafeteria",
    "meaning": "dining hall / cafeteria"
  },
  "3-11": {
    "strategy": "object",
    "object": "company",
    "meaning": "office"
  },
  "3-12": {
    "strategy": "object",
    "object": "meeting",
    "meaning": "meeting room"
  },
  "3-13": {
    "strategy": "object",
    "object": "reception",
    "meaning": "reception"
  },
  "3-14": {
    "strategy": "object",
    "object": "lobby",
    "meaning": "lobby"
  },
  "3-15": {
    "strategy": "object",
    "object": "room",
    "meaning": "room"
  },
  "3-16a": {
    "strategy": "object",
    "object": "toilet",
    "meaning": "toilet"
  },
  "3-16b": {
    "strategy": "object",
    "object": "toilet",
    "meaning": "restroom (polite)"
  },
  "3-17": {
    "strategy": "object",
    "object": "stairs",
    "meaning": "stairs"
  },
  "3-18": {
    "strategy": "object",
    "object": "elevator",
    "meaning": "lift / elevator"
  },
  "3-19": {
    "strategy": "object",
    "object": "escalator",
    "meaning": "escalator"
  },
  "3-20": {
    "strategy": "object",
    "object": "vending",
    "meaning": "vending machine"
  },
  "3-21": {
    "strategy": "object",
    "object": "phone",
    "meaning": "telephone"
  },
  "3-22a": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "country / home country (plain)"
  },
  "3-22b": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "country / home country (polite)"
  },
  "3-23": {
    "strategy": "object",
    "object": "company",
    "meaning": "company"
  },
  "3-24": {
    "strategy": "object",
    "object": "home",
    "meaning": "home"
  },
  "3-25": {
    "strategy": "object",
    "object": "shoes",
    "meaning": "shoes"
  },
  "3-26": {
    "strategy": "object",
    "object": "tie",
    "meaning": "necktie"
  },
  "3-27": {
    "strategy": "object",
    "object": "wine",
    "meaning": "wine"
  },
  "3-28": {
    "strategy": "object",
    "object": "sales",
    "meaning": "sales department / counter"
  },
  "3-29": {
    "strategy": "object",
    "object": "basement",
    "meaning": "basement"
  },
  "3-30a": {
    "strategy": "context",
    "context": "counter",
    "number": 2,
    "unit": "floor",
    "meaning": "floor suffix (after 2, 4, 5, 7 or 9)"
  },
  "3-30b": {
    "strategy": "context",
    "context": "counter",
    "number": 3,
    "unit": "floor",
    "meaning": "floor suffix (after 3 or the question word)"
  },
  "3-31": {
    "strategy": "context",
    "context": "question",
    "object": "floor",
    "meaning": "which floor"
  },
  "3-32": {
    "strategy": "context",
    "context": "counter",
    "number": 2,
    "unit": "price",
    "meaning": "yen suffix"
  },
  "3-33": {
    "strategy": "context",
    "context": "question",
    "object": "price",
    "meaning": "how much"
  },
  "3-34": {
    "strategy": "context",
    "context": "counter",
    "number": 100,
    "unit": "number",
    "meaning": "hundred"
  },
  "3-35": {
    "strategy": "context",
    "context": "counter",
    "number": 1000,
    "unit": "number",
    "meaning": "thousand"
  },
  "3-36": {
    "strategy": "context",
    "context": "counter",
    "number": 10000,
    "unit": "number",
    "meaning": "ten thousand"
  },
  "3-c1": {
    "strategy": "conversation",
    "purpose": "offering",
    "pose": "gift",
    "meaning": "welcome (to a shop)"
  },
  "3-c2": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "please show me …"
  },
  "3-c2b": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "please show me (item understood)"
  },
  "3-c3": {
    "strategy": "context",
    "context": "next",
    "meaning": "well then"
  },
  "3-c4": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "please give me …"
  },
  "3-c4b": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "please give me (item understood)"
  },
  "3-p1": {
    "strategy": "conversation",
    "purpose": "attention",
    "pose": "wave",
    "meaning": "excuse me / sorry"
  },
  "3-p2": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thanks (brief)"
  },
  "3-r1": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Italy"
  },
  "3-r2": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Switzerland"
  },
  "3-r3": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "France"
  },
  "3-r4": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Jakarta"
  },
  "3-r5": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Bangkok"
  },
  "3-r6": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Berlin"
  },
  "3-r7": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Shin-Osaka (station)"
  },
  "4-01": {
    "strategy": "action",
    "pose": "waking",
    "meaning": "get up; wake up"
  },
  "4-02": {
    "strategy": "action",
    "pose": "sleeping",
    "meaning": "sleep; go to bed"
  },
  "4-03": {
    "strategy": "action",
    "pose": "working",
    "meaning": "work"
  },
  "4-04": {
    "strategy": "action-context",
    "action": "resting",
    "meaning": "rest; take a day off"
  },
  "4-05": {
    "strategy": "action",
    "pose": "student",
    "meaning": "study"
  },
  "4-06": {
    "strategy": "action-context",
    "action": "finishing",
    "meaning": "finish; end"
  },
  "4-07": {
    "strategy": "object",
    "object": "department",
    "meaning": "department store"
  },
  "4-08": {
    "strategy": "object",
    "object": "bank",
    "meaning": "bank"
  },
  "4-09": {
    "strategy": "object",
    "object": "postoffice",
    "meaning": "post office"
  },
  "4-10": {
    "strategy": "object",
    "object": "library",
    "meaning": "library"
  },
  "4-11": {
    "strategy": "object",
    "object": "museum",
    "meaning": "art museum"
  },
  "4-12": {
    "strategy": "context",
    "context": "clock",
    "meaning": "now"
  },
  "4-13": {
    "strategy": "context",
    "context": "clock",
    "meaning": "o’clock; hour suffix"
  },
  "4-14a": {
    "strategy": "context",
    "context": "clock",
    "meaning": "minute suffix (after 2, 5, 7 or 9)"
  },
  "4-14b": {
    "strategy": "context",
    "context": "clock",
    "meaning": "minute suffix (after 1, 3, 4 or 6)"
  },
  "4-15": {
    "strategy": "context",
    "context": "clock",
    "meaning": "half past"
  },
  "4-16": {
    "strategy": "context",
    "context": "question",
    "object": "clock",
    "meaning": "what time; what hour"
  },
  "4-17": {
    "strategy": "context",
    "context": "question",
    "object": "clock",
    "meaning": "how many minutes; what minute"
  },
  "4-18": {
    "strategy": "context",
    "context": "morning",
    "meaning": "a.m.; before noon"
  },
  "4-19": {
    "strategy": "context",
    "context": "night",
    "meaning": "p.m.; after noon"
  },
  "4-20": {
    "strategy": "context",
    "context": "morning",
    "meaning": "morning"
  },
  "4-21": {
    "strategy": "context",
    "context": "clock",
    "meaning": "daytime; noon"
  },
  "4-22a": {
    "strategy": "context",
    "context": "night",
    "meaning": "evening"
  },
  "4-22b": {
    "strategy": "context",
    "context": "night",
    "meaning": "night"
  },
  "4-23": {
    "strategy": "context",
    "context": "relative",
    "offset": -2,
    "meaning": "the day before yesterday"
  },
  "4-24": {
    "strategy": "context",
    "context": "relative",
    "offset": -1,
    "meaning": "yesterday"
  },
  "4-25": {
    "strategy": "context",
    "context": "relative",
    "offset": 0,
    "meaning": "today"
  },
  "4-26": {
    "strategy": "context",
    "context": "relative",
    "offset": 1,
    "meaning": "tomorrow"
  },
  "4-27": {
    "strategy": "context",
    "context": "relative",
    "offset": 2,
    "meaning": "the day after tomorrow"
  },
  "4-28": {
    "strategy": "context",
    "context": "morning",
    "meaning": "this morning"
  },
  "4-29": {
    "strategy": "context",
    "context": "night",
    "meaning": "tonight; this evening"
  },
  "4-30": {
    "strategy": "action-context",
    "action": "resting",
    "meaning": "rest; day off; holiday"
  },
  "4-31": {
    "strategy": "context",
    "context": "break",
    "meaning": "lunch break"
  },
  "4-32": {
    "strategy": "object",
    "object": "test",
    "meaning": "exam; test"
  },
  "4-33": {
    "strategy": "context",
    "context": "meeting",
    "meaning": "meeting; conference"
  },
  "4-34": {
    "strategy": "context",
    "context": "film",
    "meaning": "film; movie"
  },
  "4-35": {
    "strategy": "context",
    "context": "frequency",
    "all": true,
    "period": "morning",
    "meaning": "every morning"
  },
  "4-36": {
    "strategy": "context",
    "context": "frequency",
    "all": true,
    "period": "night",
    "meaning": "every evening; every night"
  },
  "4-37": {
    "strategy": "context",
    "context": "frequency",
    "all": true,
    "period": null,
    "meaning": "every day"
  },
  "4-38": {
    "strategy": "context",
    "context": "weekday",
    "day": 0,
    "meaning": "Monday"
  },
  "4-39": {
    "strategy": "context",
    "context": "weekday",
    "day": 1,
    "meaning": "Tuesday"
  },
  "4-40": {
    "strategy": "context",
    "context": "weekday",
    "day": 2,
    "meaning": "Wednesday"
  },
  "4-41": {
    "strategy": "context",
    "context": "weekday",
    "day": 3,
    "meaning": "Thursday"
  },
  "4-42": {
    "strategy": "context",
    "context": "weekday",
    "day": 4,
    "meaning": "Friday"
  },
  "4-43": {
    "strategy": "context",
    "context": "weekday",
    "day": 5,
    "meaning": "Saturday"
  },
  "4-44": {
    "strategy": "context",
    "context": "weekday",
    "day": 6,
    "meaning": "Sunday"
  },
  "4-45": {
    "strategy": "context",
    "context": "question",
    "object": "calendar",
    "meaning": "what day of the week"
  },
  "4-46": {
    "strategy": "context",
    "context": "start",
    "meaning": "from …"
  },
  "4-47": {
    "strategy": "context",
    "context": "end",
    "meaning": "until …; to …"
  },
  "4-48": {
    "strategy": "context",
    "context": "and",
    "meaning": "… and … (joining nouns)"
  },
  "4-c1": {
    "strategy": "context",
    "context": "counter",
    "number": 2,
    "unit": "number",
    "meaning": "number"
  },
  "4-c2": {
    "strategy": "context",
    "context": "question",
    "object": "number-board",
    "meaning": "what number"
  },
  "4-e1": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "That sounds tough."
  },
  "4-r1": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "New York"
  },
  "4-r2": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Beijing"
  },
  "4-r3": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Los Angeles"
  },
  "4-r4": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "London"
  },
  "4-r5": {
    "strategy": "context",
    "context": "named-place",
    "object": "cafeteria",
    "meaning": "Asuka (fictional restaurant)"
  },
  "4-r6": {
    "strategy": "context",
    "context": "named-place",
    "object": "bank",
    "meaning": "Apple Bank (fictional)"
  },
  "4-r7": {
    "strategy": "context",
    "context": "named-place",
    "object": "library",
    "meaning": "Midori Library (fictional)"
  },
  "4-r8": {
    "strategy": "context",
    "context": "named-place",
    "object": "museum",
    "meaning": "Yamato Art Museum (fictional)"
  },
  "csv-3c7d4b08462bc4f1": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "IMC (name)"
  },
  "csv-7177af3f64881d19": {
    "strategy": "action-context",
    "action": "meeting",
    "meaning": "meet (a friend)"
  },
  "csv-49dbdb19c4ed703b": {
    "strategy": "context",
    "context": "meal",
    "object": "rice",
    "period": "morning",
    "meaning": "breakfast"
  },
  "csv-9eebca0faf03e6d1": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "thank you (past occasion)"
  },
  "csv-f50227659b484b36": {
    "strategy": "action",
    "pose": "walking",
    "meaning": "on foot"
  },
  "csv-8b77245faf60fc4f": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "that sounds good"
  },
  "csv-e5f8b4417ebfe19c": {
    "strategy": "action-context",
    "action": "going",
    "meaning": "go"
  },
  "csv-5820ce9c10bf95fb": {
    "strategy": "context",
    "context": "question",
    "object": "many",
    "meaning": "how many"
  },
  "csv-da275c2671ca3790": {
    "strategy": "context",
    "context": "question",
    "object": "calendar",
    "meaning": "when"
  },
  "csv-5c0a9a882b9d9a39": {
    "strategy": "context",
    "context": "date",
    "number": 5,
    "meaning": "day 5 of the month"
  },
  "csv-ddb642595b09a8d7": {
    "strategy": "context",
    "context": "together",
    "meaning": "together"
  },
  "csv-c3c059abac5ad613": {
    "strategy": "context",
    "context": "frequency",
    "all": true,
    "period": null,
    "meaning": "always"
  },
  "csv-9a3a4421ce87643e": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "yes (conversational)",
    "reaction": "✓"
  },
  "csv-bd7ed3e561d8f856": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "AKC (name)"
  },
  "csv-96faf26ff6e24abe": {
    "strategy": "object",
    "object": "station",
    "meaning": "station"
  },
  "csv-f0a8ad38c4b26077": {
    "strategy": "context",
    "context": "named-place",
    "object": "museum",
    "meaning": "Osaka Castle"
  },
  "csv-a22105b120419229": {
    "strategy": "context",
    "context": "named-place",
    "object": "department",
    "meaning": "Osaka department store"
  },
  "csv-466ef427aeaa04c0": {
    "strategy": "object",
    "object": "sake",
    "meaning": "alcohol / sake"
  },
  "csv-73d6ed4fb078beac": {
    "strategy": "object",
    "object": "tea",
    "meaning": "tea"
  },
  "csv-36a14c686f5072d1": {
    "strategy": "object",
    "object": "flower",
    "meaning": "cherry blossom viewing (polite)"
  },
  "csv-df823f0054e95444": {
    "strategy": "action-context",
    "action": "buying",
    "meaning": "buy"
  },
  "csv-a24023d5cf432e72": {
    "strategy": "action-context",
    "action": "returning",
    "meaning": "return home"
  },
  "csv-d0b1c1b9cff1afa8": {
    "strategy": "action-context",
    "action": "writing",
    "meaning": "write"
  },
  "csv-85fc29e4499613fa": {
    "strategy": "context",
    "context": "family",
    "meaning": "family"
  },
  "csv-a0827d7777003ef6": {
    "strategy": "context",
    "context": "calendar",
    "meaning": "month suffix"
  },
  "csv-3b693859f9dedc50": {
    "strategy": "object",
    "object": "school",
    "meaning": "school"
  },
  "csv-3ba73c6ea36b4989": {
    "strategy": "context",
    "context": "person",
    "meaning": "she / girlfriend"
  },
  "csv-d4dffb5a5b803637": {
    "strategy": "context",
    "context": "person",
    "meaning": "he / boyfriend"
  },
  "csv-75b0e4c01e1d84c5": {
    "strategy": "action-context",
    "action": "listening",
    "meaning": "listen / hear"
  },
  "csv-d210788ec91c38a2": {
    "strategy": "action-context",
    "action": "coming",
    "meaning": "come"
  },
  "csv-97d70ee391716129": {
    "strategy": "object",
    "object": "express",
    "meaning": "express train"
  },
  "csv-c5e1b6f79ac06f78": {
    "strategy": "object",
    "object": "milk",
    "meaning": "milk"
  },
  "csv-a868b59281a163d0": {
    "strategy": "context",
    "context": "relative",
    "offset": -1,
    "meaning": "last year"
  },
  "csv-c95c5a42a2c4dc0f": {
    "strategy": "object",
    "object": "fruit",
    "meaning": "fruit"
  },
  "csv-28e2535376fd8952": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Koshien"
  },
  "csv-8f8245c5ed921c82": {
    "strategy": "object",
    "object": "blacktea",
    "meaning": "black tea"
  },
  "csv-24110f167642a49c": {
    "strategy": "context",
    "context": "named-place",
    "object": "hospital",
    "meaning": "Kobe Hospital"
  },
  "csv-c221dba0167ae1e9": {
    "strategy": "context",
    "context": "date",
    "number": 9,
    "meaning": "day 9 of the month"
  },
  "csv-30b189ebcd7003c3": {
    "strategy": "context",
    "context": "relative",
    "offset": 0,
    "meaning": "this year"
  },
  "csv-6bcbca4ff9d1339c": {
    "strategy": "object",
    "object": "rice",
    "meaning": "rice / meal"
  },
  "csv-c803b519e3fc772d": {
    "strategy": "context",
    "context": "relative",
    "offset": 0,
    "meaning": "this month"
  },
  "csv-17a1e9fa6d674c24": {
    "strategy": "context",
    "context": "relative",
    "offset": 0,
    "meaning": "this week"
  },
  "csv-5d4309a567cd471b": {
    "strategy": "object",
    "object": "fish",
    "meaning": "fish"
  },
  "csv-5babde796c69ee99": {
    "strategy": "context",
    "context": "named-place",
    "object": "university",
    "meaning": "Sakura University"
  },
  "csv-b4278971fe60aaba": {
    "strategy": "object",
    "object": "sake",
    "meaning": "alcohol / sake"
  },
  "csv-7dc41055c5283da3": {
    "strategy": "object",
    "object": "football",
    "meaning": "soccer"
  },
  "csv-5a10eafbbd35a055": {
    "strategy": "object",
    "object": "bicycle",
    "meaning": "bicycle"
  },
  "csv-e1fe9fe823893e71": {
    "strategy": "action-context",
    "action": "doing",
    "meaning": "do"
  },
  "csv-636d771fbcf06c13": {
    "strategy": "object",
    "object": "photo",
    "meaning": "photograph"
  },
  "csv-e71873a7c50a3455": {
    "strategy": "conversation",
    "purpose": "greetings",
    "pose": "wave",
    "meaning": "see you [tomorrow]"
  },
  "csv-59fc344c5d6c0e5b": {
    "strategy": "object",
    "object": "juice",
    "meaning": "juice"
  },
  "csv-b18a5ba6256ca74e": {
    "strategy": "context",
    "context": "date",
    "number": 14,
    "meaning": "day 14 of the month"
  },
  "csv-e8e2f46fabc20cd4": {
    "strategy": "object",
    "object": "homework",
    "meaning": "homework"
  },
  "csv-75cc337163f92d4a": {
    "strategy": "object",
    "object": "shinkansen",
    "meaning": "Shinkansen"
  },
  "csv-8c8770a8bd199980": {
    "strategy": "action-context",
    "action": "smoking",
    "meaning": "smoke (a cigarette)"
  },
  "csv-3e715ed68e25a4b2": {
    "strategy": "object",
    "object": "supermarket",
    "meaning": "supermarket"
  },
  "csv-23b4d2461d6440ab": {
    "strategy": "context",
    "context": "relative",
    "offset": -1,
    "meaning": "last month"
  },
  "csv-3c6769841cb20689": {
    "strategy": "context",
    "context": "relative",
    "offset": -1,
    "meaning": "last week"
  },
  "csv-626cfb072a80fcbb": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "let me see / that is so",
    "reaction": "…"
  },
  "csv-1d44190694449872": {
    "strategy": "context",
    "context": "next",
    "meaning": "and then"
  },
  "csv-6cec773780557979": {
    "strategy": "object",
    "object": "taxi",
    "meaning": "taxi"
  },
  "csv-39827ceb3d02520a": {
    "strategy": "object",
    "object": "cigarette",
    "meaning": "tobacco / cigarette"
  },
  "csv-47e0d02b093eaa10": {
    "strategy": "action",
    "pose": "eating",
    "meaning": "eat"
  },
  "csv-9d3438acae746a2b": {
    "strategy": "object",
    "object": "egg",
    "meaning": "egg"
  },
  "csv-9c2a0dad1676a16c": {
    "strategy": "context",
    "context": "calendar",
    "meaning": "birthday"
  },
  "csv-8fea79d5439bf91d": {
    "strategy": "object",
    "object": "subway",
    "meaning": "subway"
  },
  "csv-f66659321ab61768": {
    "strategy": "context",
    "context": "small",
    "meaning": "a little / a moment"
  },
  "csv-c2a089d9c108210d": {
    "strategy": "context",
    "context": "date",
    "number": 1,
    "meaning": "day 1 of the month"
  },
  "csv-184a04e7c5d4fccd": {
    "strategy": "context",
    "context": "relative",
    "offset": 1,
    "meaning": "next (before a noun)"
  },
  "csv-e0ef263ea957a0ed": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Tsuruya (name)"
  },
  "csv-c11a3275fec09a2b": {
    "strategy": "object",
    "object": "letter",
    "meaning": "letter"
  },
  "csv-1981cf9bdbeb6a22": {
    "strategy": "object",
    "object": "tennis",
    "meaning": "tennis"
  },
  "csv-877ca5f99e8338a8": {
    "strategy": "object",
    "object": "train",
    "meaning": "train"
  },
  "csv-1d26a3f31f546046": {
    "strategy": "conversation",
    "purpose": "thanks",
    "pose": "bow",
    "meaning": "you are welcome"
  },
  "csv-9c701220455cac91": {
    "strategy": "context",
    "context": "date",
    "number": 10,
    "meaning": "day 10 of the month"
  },
  "csv-6b187d085f20d980": {
    "strategy": "context",
    "context": "frequency",
    "all": false,
    "period": null,
    "meaning": "sometimes"
  },
  "csv-ee51b3e0ae0fd355": {
    "strategy": "object",
    "object": "limited",
    "meaning": "limited express train"
  },
  "csv-66356e973c57c474": {
    "strategy": "context",
    "context": "person",
    "meaning": "friend"
  },
  "csv-cc1157bdb7daec7d": {
    "strategy": "action-context",
    "action": "photographing",
    "meaning": "take (a photograph)"
  },
  "csv-61d84228493517e8": {
    "strategy": "context",
    "context": "question",
    "object": "book",
    "meaning": "what"
  },
  "csv-5702f6977f743b93": {
    "strategy": "context",
    "context": "date",
    "number": 7,
    "meaning": "day 7 of the month"
  },
  "csv-c8125aa6b2d08005": {
    "strategy": "context",
    "context": "question",
    "object": "calendar",
    "meaning": "which month"
  },
  "csv-5b2bd2f1b059a707": {
    "strategy": "context",
    "context": "question",
    "object": "book",
    "meaning": "what is it?"
  },
  "csv-9211080b604c7214": {
    "strategy": "context",
    "context": "question",
    "object": "calendar",
    "meaning": "which day of the month"
  },
  "csv-37a34299f8aac5ba": {
    "strategy": "context",
    "context": "question",
    "object": "calendar",
    "meaning": "which year"
  },
  "csv-b7e64825c6bfc605": {
    "strategy": "object",
    "object": "meat",
    "meaning": "meat"
  },
  "csv-80e2b972cd3e2a7b": {
    "strategy": "context",
    "context": "date",
    "number": 24,
    "meaning": "day 24 of the month"
  },
  "csv-7102dff50ca5a822": {
    "strategy": "context",
    "context": "calendar",
    "meaning": "day-of-month suffix"
  },
  "csv-fe19f59584c74922": {
    "strategy": "object",
    "object": "garden",
    "meaning": "garden"
  },
  "csv-7b39f2af6e32e892": {
    "strategy": "context",
    "context": "calendar",
    "meaning": "year suffix"
  },
  "csv-94a36930bfbb9722": {
    "strategy": "action",
    "pose": "drinking",
    "meaning": "drink"
  },
  "csv-866bfdb4796056e3": {
    "strategy": "object",
    "object": "bus",
    "meaning": "bus"
  },
  "csv-baf16aec6f47fddc": {
    "strategy": "context",
    "context": "date",
    "number": 20,
    "meaning": "day 20 of the month"
  },
  "csv-59357d2a2ba16d1d": {
    "strategy": "object",
    "object": "flower",
    "meaning": "cherry blossom viewing"
  },
  "csv-28b35d9b1a29e3bd": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Power Electric"
  },
  "csv-de32617ea8103232": {
    "strategy": "object",
    "object": "bread",
    "meaning": "bread"
  },
  "csv-affaad7513b5d4c8": {
    "strategy": "context",
    "context": "meal",
    "object": "rice",
    "period": "night",
    "meaning": "dinner"
  },
  "csv-4f20834e51a03b0c": {
    "strategy": "context",
    "context": "platform",
    "meaning": "platform / track number suffix"
  },
  "csv-c90996b5e92d7c1e": {
    "strategy": "object",
    "object": "beer",
    "meaning": "beer"
  },
  "csv-c98d6b858839265e": {
    "strategy": "object",
    "object": "airplane",
    "meaning": "airplane"
  },
  "csv-a21d0ee87a3c3deb": {
    "strategy": "object",
    "object": "video",
    "meaning": "video"
  },
  "csv-d174a32922550b37": {
    "strategy": "context",
    "context": "person",
    "meaning": "person"
  },
  "csv-ad4bed84d1d20277": {
    "strategy": "context",
    "context": "alone",
    "meaning": "alone / by oneself"
  },
  "csv-1e0b486bbcdc48d6": {
    "strategy": "context",
    "context": "meal",
    "object": "rice",
    "period": "noon",
    "meaning": "lunch"
  },
  "csv-1c673828b19f140f": {
    "strategy": "context",
    "context": "named-place",
    "object": "university",
    "meaning": "Fuji University"
  },
  "csv-3236ade61764e870": {
    "strategy": "object",
    "object": "train",
    "meaning": "local train / ordinary"
  },
  "csv-7048eafe3ccb9af5": {
    "strategy": "context",
    "context": "date",
    "number": 2,
    "meaning": "day 2 of the month"
  },
  "csv-337bdbc7d43ef9ad": {
    "strategy": "object",
    "object": "ship",
    "meaning": "ship / boat"
  },
  "csv-7397e594beb9d693": {
    "strategy": "context",
    "context": "named-place",
    "object": "globe",
    "meaning": "Brazil Air"
  },
  "csv-b199fcf6b483fa68": {
    "strategy": "context",
    "context": "named-place",
    "object": "shop",
    "meaning": "France-ya (shop name)"
  },
  "csv-3395ecf63186e543": {
    "strategy": "context",
    "context": "named-place",
    "object": "shop",
    "meaning": "Mainichi-ya (shop name)"
  },
  "csv-4eb49f0d02d973b0": {
    "strategy": "object",
    "object": "water",
    "meaning": "water"
  },
  "csv-c1bbf30546c0876e": {
    "strategy": "object",
    "object": "shop",
    "meaning": "shop"
  },
  "csv-4da5f65019726165": {
    "strategy": "context",
    "context": "date",
    "number": 3,
    "meaning": "day 3 of the month"
  },
  "csv-1ff1d8b46cf7910c": {
    "strategy": "action-context",
    "action": "watching",
    "meaning": "see / watch"
  },
  "csv-bc3c569041e86eb6": {
    "strategy": "object",
    "object": "milk",
    "meaning": "milk"
  },
  "csv-b65570a0efd59fe4": {
    "strategy": "context",
    "context": "date",
    "number": 6,
    "meaning": "day 6 of the month"
  },
  "csv-15a68a335b8ce750": {
    "strategy": "context",
    "context": "country",
    "object": "globe",
    "meaning": "Mexico"
  },
  "csv-0bad5ff77209d4f0": {
    "strategy": "object",
    "object": "vegetables",
    "meaning": "vegetables"
  },
  "csv-98d3825988ce5f0a": {
    "strategy": "context",
    "context": "date",
    "number": 8,
    "meaning": "day 8 of the month"
  },
  "csv-db95619e9dabec3f": {
    "strategy": "context",
    "context": "date",
    "number": 4,
    "meaning": "day 4 of the month"
  },
  "csv-41e7fb780375c38e": {
    "strategy": "action-context",
    "action": "reading",
    "meaning": "read"
  },
  "csv-9263b75441c6fb63": {
    "strategy": "context",
    "context": "relative",
    "offset": 1,
    "meaning": "next month"
  },
  "csv-3fd555b0c01ae8b3": {
    "strategy": "context",
    "context": "relative",
    "offset": 1,
    "meaning": "next week"
  },
  "csv-07d7f60a32c5d106": {
    "strategy": "context",
    "context": "relative",
    "offset": 1,
    "meaning": "next year"
  },
  "csv-1dcf2c3f1c019d5f": {
    "strategy": "object",
    "object": "report",
    "meaning": "report"
  },
  "csv-43dcdb53d41a80e5": {
    "strategy": "conversation",
    "purpose": "reactions",
    "pose": "thinking",
    "meaning": "understood",
    "reaction": "✓"
  }
};

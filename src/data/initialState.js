import C from '../constants';

export default {
  "user": null, // {} is for debugging purposes, must be null
  // "timeStamp": 0,
  "drawerOpen": true,
  "tab": 1,
  "interfaceLang": "en",
  "startTime": null,
  "paidupTo": null,
  "donatedTo": null,
  // "lastPaidup": null,
  // "lastDonated": null,
  "subscription": 10,
  "items": [],
  // "dictionary": {
    // "items": "",//[ // name of the actual state key (items-userId-timestamp-hash)
      // {"id": 1, "studied": "hello", "meaning": "привет"},
      // {"id": 2, "studied": "hell", "meaning": "ад"},
      // {"id": 3, "studied": "well", "meaning": "хорошо"},
      // {"id": 4, "studied": "low", "meaning": "низкий"},
      // {"id": 5, "studied": "love", "meaning": "любовь"},
      // {"id": 6, "studied": "cool", "meaning": "круто"},
      // {"id": 7, "studied": "quote", "meaning": "назначать цену, ставку"},
      // {"id": 8, "studied": "rtl", "meaning": "أدخل بعض النص في الإدخال أدناه ثم اضغط على زر العودة أو زر التشغيل لسماعها تغيير الأصوات باستخدام القائمة المنسدلة."}
    // ],
    // "stuff": "", // name of the actual stuff key (stuff-userId-timestamp-hash)
    // "stuffHash":"",
    "altItems": [],
    // "altStuff":"",
    "order": "asc",
    "orderBy": "studied",
    "page": 0,
    "rowsPerPage": 5,
    "learnedLang": 0,
    "motherLang": 0,
    "uDicLearnedLang": 0, // new
    "uDicMotherLang": 0, // new
    "uDicIsSelected": true,
    "dicId": null,
    // "dicTimeStamp": "", // ?
    "dicSortBy": 'none',
    "dicFilterFields": [false, false, false],

    dicMinSubscriptions: C.subscriptionsMinProps.min, 
    dicMaxSubscriptions: C.subscriptionsMaxProps.max, 
    dicMinItems: C.itemsMinProps.min,
    dicMaxItems: C.itemsMaxProps.max,
    dicMinSize: C.sizeMinProps.min,
    dicMaxSize: C.sizeMaxProps.max,

    "dicSpecialty": null,
    "uDicSpecialty": null,
    "dicSubspecialty": null,
    "uDicSubspecialty": null,
    "dicName": "",
    "uDicName": "",
    "dicDescription": "",
    "uDicDescription": "",
    "uDicPath": "",
    "dicHalfPath": "",
    "dicSubscrs": null,
    // "dicItems": null,
    // "uDicItems": null,
    // "uDicUrl": "",
  // },
  "odicMethod": 0, // Rote learning, Mnemotechnics
  "ouDicMethod": 0, // Rote learning, Mnemotechnics
  "odicNumOfLessons": 1, // Number of lessons
  "ouDicNumOfLessons": 1, // Number of lessons
    // "odicBatch": 50, // max=200
    // "ouDicBatch": 50, // max=200
    "odicTestLang": 0, // 0 - studied lang, 1 - mother lang
    "ouDicTestLang": 0, // 0 - studied lang, 1 - mother lang
    "odicWordRepeat": 3, // number of repeats
    "ouDicWordRepeat": 3, // number of repeats
    "odicAfterWordPause": 3000, // millisec
    "ouDicAfterWordPause": 3000, // millisec
    "odicCardMode": 0, // 0 - by meaning, 1 - by learned word, 2 - random
    "ouDicCardMode": 0, // 0 - by meaning, 1 - by learned word, 2 - random
    // "odicPronSource": 0, // 0 - synthesiser, 1 - Text-to-speech https://translate.google.com/translate_tts?ie=UTF-8&q=TEXT&tl=en&client=tw-ob
    // "ouDicPronSource": 0, // 0 - synthesiser, 1 - Text-to-speech https://translate.google.com/translate_tts?ie=UTF-8&q=TEXT&tl=en&client=tw-ob
    // "odicPronRate": 1/0.6, "oPronPitch: 0"
    // "ouDicPronRate": 1/0.6, "oPronPitch: 0"
  };
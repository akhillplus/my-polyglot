// import axios from 'axios';
import axios from '../lib/asyncRouts';
// import C from '../constants';
// import { i18n } from "@lingui/core";
import { t, defineMessage, Trans } from "@lingui/macro";

import { makeOptions, makeGetOptions, defaultRejecter } from '../lib/async';
import { devMode } from '../lib/stringLib';
import C from '../constants';

const { RETCODE_OK, RETCODE_ERROR, WORDLIST_OBSOLETE_PERIOD, SUBSPECS_OBSOLETE_PERIOD } = C; 

export const SpecialtyFields = [
  { value: 100, label: defineMessage({message: 'Accounting'})}, //"Бухгалтерский учет", uk: "Бухгалтерія" },
  { value: 200, label: defineMessage({message: 'Advertising / Public Relations'})}, //"Реклама / Связи с общественностью", uk: "Реклама / Зв’язки з громадськістю" },
  { value: 300, label: defineMessage({message: 'Aerospace / Aviation / Space'})}, //"Авиация и космонавтика, летательные аппараты", uk: "Авіація і космонавтика" },
  { value: 400, label: defineMessage({message: 'Agriculture'})}, //"Сельское хозяйство", uk: "Сільське господарство" },
  { value: 500, label: defineMessage({message: 'Animal Husbandry / Livestock / Veterinary'})}, //"Животноводство / Зоотехника", uk: "Тваринництво / Скотарство" },
  { value: 600, label: defineMessage({message: 'Anthropology'})}, //"Антропология", uk: "Антропологія" },
  { value: 700, label: defineMessage({message: 'Archaeology'})}, //"Архиология", uk: "Археологія" },
  { value: 800, label: defineMessage({message: 'Architecture'})}, //"Архтектура", uk: "Архітектура" },
  { value: 900, label: defineMessage({message: 'Art, Arts & Crafts, Painting'})}, //"Искусства, ремесла, живопись", uk: "Мистецтва, ремесла, живопис" },
  { value: 1000, label: defineMessage({message: 'Astronomy & Space'})}, //"Астрономия и космос", uk: "Астрономія і космос" },
  { value: 1100, label: defineMessage({message: 'Automation & Robotics'})}, //"Автоматизация и робототехника", uk: "Автоматизація та робототехніка" },
  { value: 1200, label: defineMessage({message: 'Automotive / Cars & Trucks'})}, //"Транспорт / Транспортные средства / Грузоперевозки", uk: "Транспорт / Транспортні засоби / Вантажні перевезення" },
  { value: 1300, label: defineMessage({message: 'Biology: General'})}, //"Биология: в целом", uk: "Біологія: загальне" },
  { value: 1310, label: defineMessage({message: 'Biology: Bioengineering'})}, //"Биология: Биотехника", uk: "Біологія: біотехніка" },
  { value: 1320, label: defineMessage({message: 'Biology: Biochemistry'})}, //"Биология: Биохимия", uk: "Біологія: біохімія" },
  { value: 1330, label: defineMessage({message: 'Biology: Microbiology'})}, //"Биология: Микробиология", uk: "Біологія: мікробіологія" },
  { value: 1400, label: defineMessage({message: 'Botany'})}, //"Ботаника", uk: "Ботаніка" },
  { value: 1500, label: defineMessage({message: 'Building / Construction'})}, //"Строительство / Строительная техника", uk: "Будівництво / Промислове та громадське будівництво" },
  { value: 1600, label: defineMessage({message: 'Business / Commerce'})}, //"Бизнес / Коммерция", uk: "Бізнес / Комерція" },
  { value: 1700, label: defineMessage({message: 'Cars / Auto'})}, //"Автомобили / Автомеханика", uk: "Автомобілі та грузовики" },
  { value: 1800, label: defineMessage({message: 'Certificates, Diplomas, Licenses, CVs'})}, //"Дипломы, лицензии, сертификаты, резюме", uk: "Сертифікація, дипломи, ліцензування, резюме" },
  { value: 1900, label: defineMessage({message: 'Chemistry: Chemistry Science / Engineering'})}, //"Химия, химические науки и технологии", uk: "Хімія; Хімічні технології" },
  { value: 2000, label: defineMessage({message: 'Cinema / Films / TV / Drama'})}, //"Кино, кинематография, телевидение, театр", uk: "Кінематограф, телебачення, театр" },
  { value: 2100, label: defineMessage({message: 'Computers: General'})}, //"Компьютеры: в целом", uk: "Комп’ютери: Загальне" },
  { value: 2110, label: defineMessage({message: 'Computers: Hardware'})}, //"Компьютеры: Железо", uk: "Комп’ютери: Обладнання" },
  { value: 2120, label: defineMessage({message: 'Computers: Software'})}, //"Компьютеры: Программное обеспечение", uk: "Комп’ютери: Програмне забезпечення" },
  { value: 2130, label: defineMessage({message: 'Computers: Systems, Networks'})}, //"Компьютеры: Системы и сети", uk: "Комп’ютери: Системи та мережа" },
  { value: 2200, label: defineMessage({message: 'Construction / Civil Engineering / Building'})}, //"Строительство / Строительная техника", uk: "Будівництво / Промислове та громадське будівництво" },
  { value: 2300, label: defineMessage({message: 'Cooking / Culinary'})}, //"Кухня / Кулинария", uk: "Кулінарія / Кухня" },
  { value: 2400, label: defineMessage({message: 'Cosmetics, Beauty'})}, //"Косметика, парфюмерия", uk: "Косметологія" },
  { value: 2500, label: defineMessage({message: 'Economics'})}, //"Экономика", uk: "Економіка" },
  { value: 2600, label: defineMessage({message: 'Education / Pedagogy'})}, //"Образование / Педагогика", uk: "Освіта / Педагогіка" },
  { value: 2700, label: defineMessage({message: 'Electronics / Electical Engineering'})}, //"Электроника / Электротехника", uk: "Електроніка" },
  { value: 2800, label: defineMessage({message: 'Energy / Power Generation'})}, //"Энергетика / Энергопроизводство", uk: "Енергія / Джерела енергії" },
  { value: 2900, label: defineMessage({message: 'Engineering: General'})}, //"Техника: в целом", uk: "Техніка: Загальне" },
  { value: 3000, label: defineMessage({message: 'Environment & Ecology'})}, //"Экология и окружающая среда", uk: "Навколишнє середовище та екологія" },
  { value: 3100, label: defineMessage({message: 'Esoteric practices'})}, //"Эзотерические практики", uk: "Езотеріка" },
  // { id: 3200, label: defineMessage({message: 'Fashion / Textiles'})}, //"Текстильная промышленность / Одежда / Мода", uk: "" },
  // { id: 3300, label: defineMessage({message: 'Film & TV / Cinema'})}, //"Кино, кинематография, телевидение, театр", uk: "" },
  { value: 3400, label: defineMessage({message: 'Finance: General'})}, //"Финансы: в целом", uk: "Фінанси: Загальне" },
  { value: 3500, label: defineMessage({message: 'Fisheries'})}, //"Рыболовство и рыбоводство", uk: "Рибальство" },
  { value: 3600, label: defineMessage({message: 'Folklore'})}, //"Фольклор", uk: "Фольклор" },
  { value: 3700, label: defineMessage({message: 'Food & Drink'})}, //"Пищевая и молочная промышленность", uk: "Харчова та молочна промисловість" },
  { value: 3800, label: defineMessage({message: 'Forestry / Wood / Timber'})}, //"Лесная и деревообрабатывающая промышленность", uk: "Лісництво та деревообробна промисловість" },
  { value: 3900, label: defineMessage({message: 'Furniture / Household Appliances'})}, //"Бытовая техника / Мебель", uk: "Меблі / Побутова техніка" },
  { value: 4000, label: defineMessage({message: 'Games / Video Games / Gaming / Casino'})}, //"Игры / Видеоигры / Азартные игры / Казино", uk: "Ігри / Комп’ютерні ігри / Індустрія розваг" },
  { value: 4100, label: defineMessage({message: 'Genealogy'})}, //"Генеалогия", uk: "Генеалогія" },
  { value: 4200, label: defineMessage({message: 'General / Conversation / Greetings / Letters'})}, //"Общеразговорные темы / Переписка / Поздравления", uk: "Загальне / Спілкування / Вітання / Листування" },
  { value: 4300, label: defineMessage({message: 'Genetics'})}, //"Генетика", uk: "Генетика" },
  { value: 4400, label: defineMessage({message: 'Geography'})}, //"География", uk: "Географія" },
  { value: 4500, label: defineMessage({message: 'Geology'})}, //"Геология", uk: "Геологія" },
  { value: 4600, label: defineMessage({message: 'Government / Politics'})}, //"Государство / Политика", uk: "Влада та уряд / Політика" },
  { value: 4700, label: defineMessage({message: 'History'})}, //"История", uk: "Історія" },
  { value: 4800, label: defineMessage({message: 'Human Resources'})}, //"Кадровые ресурсы", uk: "Людські ресурси" },
  { value: 4900, label: defineMessage({message: 'Idioms / Maxims / Sayings'})}, //"Идиомы / Изречения / Поговорки", uk: "Сталі словосполучення / Висловлювання / Прислів’я" },
  { value: 5000, label: defineMessage({message: 'Insurance'})}, //"Страхование", uk: "Страхування" },
  { value: 5100, label: defineMessage({message: 'International Organizations / Cooperation'})}, //"Международные организации и сотрудничество", uk: "Міжнародні організації / Співпраця" },
  { value: 5200, label: defineMessage({message: 'Internet, e-Commerce'})}, //"Интернет, электронная коммерция", uk: "Інтернет, електронна комерція" },
  { value: 5300, label: defineMessage({message: 'Investment / Securities'})}, //"Инвестиции / Ценные бумаги", uk: "Інвестиції / Цінні папери" },
  { value: 5400, label: defineMessage({message: 'IT (Information Technology)'})}, //"ИТ (Информационные технологии)", uk: "ІТ (Інформаційні технології)" },
  { value: 5500, label: defineMessage({message: 'Journalism'})}, //"Журналистика", uk: "Журналізм" },
  { value: 5600, label: defineMessage({message: 'Law: General'})}, //"Юриспруденция: в целом", uk: "Право: Загальне" },
  { value: 5610, label: defineMessage({message: 'Law: Contract(s)'})}, //"Юриспруденция: Контракты", uk: "Право: Контракти" },
  { value: 5620, label: defineMessage({message: 'Law: Patents, Trademarks, Copyright'})}, //"Юриспруденция: Патенты, товарные знаки, авторские права", uk: "Право: патентування, торгівельні марки, авторське право" },
  { value: 5630, label: defineMessage({message: 'Law: Taxation & Customs'})}, //"Юриспруденция: Налоги и таможня", uk: "Право: Оподаткування та мита" },
  { value: 5700, label: defineMessage({message: 'Linguistics'})}, //"Лингвистика", uk: "Мовознавство" },
  // { id: 5800, label: defineMessage({message: 'Machinery & Tools / Mechanical'})}, //"Механика / Инженерная механика", uk: "Механіка / Інженерна механіка" },
  { value: 5900, label: defineMessage({message: 'Management'})}, //"Административное управление, менеджмент", uk: "Управління" },
  { value: 6000, label: defineMessage({message: 'Manufacturing'})}, //"Производство", uk: "Виробництво" },
  // { id: 6100, label: defineMessage({message: 'Maritime / Ships'})}, //"Морское дело, мореплавание, морские судна", uk: "Мовознавство" },
  { value: 6200, label: defineMessage({message: 'Marketing / Market Research'})}, //"Маркетинг / Изучение рынков", uk: "Маркетинг / Дослідження ринку" },
  { value: 6300, label: defineMessage({message: 'Materials: General'})}, //"Материаловедение: в целом", uk: "Матеріялознавство: Загальне" },
  { value: 6310, label: defineMessage({message: 'Materials: Ceramics'})}, //"Материаловедение: Керамика", uk: "Матеріялознавство: Кераміка" },
  { value: 6320, label: defineMessage({message: 'Materials: Glass'})}, //"Материаловедение: Стекло", uk: "Матеріялознавство: Скло" },
  { value: 6330, label: defineMessage({message: 'Materials: Plastics'})}, //"Материаловедение: Пластмассы", uk: "Матеріялознавство: Пластмаса" },
  { value: 6340, label: defineMessage({message: 'Materials: Wood'})}, //"Материаловедение: Древесина", uk: "Матеріялознавство: Деровина" },
  { value: 6400, label: defineMessage({message: 'Mathematics & Statistics'})}, //"Математика и статистика", uk: "Математика та статистика" },
  { value: 6500, label: defineMessage({message: 'Mechanics / Mech Engineering'})}, //"Механика / Инженерная механика", uk: "Механіка / Інженерна механіка" },
  { value: 6600, label: defineMessage({message: 'Media / Multimedia'})}, //"Носители информации / Мультимедиа", uk: "Носії інформації / Мультимедіа" },
  { value: 6700, label: defineMessage({message: 'Medical: General'})}, //"Медицина: в целом", uk: "Медицина: Загальне" },
  { value: 6710, label: defineMessage({message: 'Medical: Cardiology'})}, //"Медицина: Кардиология", uk: "Медицина: Кардіологія" },
  { value: 6720, label: defineMessage({message: 'Medical: Dentistry'})}, //"Медицина: Стоматология", uk: "Медицина: Стоматологія" },
  { value: 6730, label: defineMessage({message: 'Medical: Health Care'})}, //"Медицина: Здравохранение", uk: "Медицина: Охорона здоров’я" },
  { value: 6740, label: defineMessage({message: 'Medical: Instruments'})}, //"Медицина: Приборы и инструменты", uk: "Медицина: Медичне обладнання" },
  { value: 6750, label: defineMessage({message: 'Medical: Pharmaceuticals'})}, //"Медицина: Фармоцевтика", uk: "Медицина: Фармацевтика" },
  { value: 6800, label: defineMessage({message: 'Metallurgy / Casting'})}, //"Металлургия / Литье", uk: "Металургія / Виплавка" },
  { value: 6900, label: defineMessage({message: 'Meteorology'})}, //"Метеорология", uk: "Метеорологія" },
  { value: 7000, label: defineMessage({message: 'Military / Defense'})}, //"Военное дело / Оборона", uk: "Військова справа / Оборона" },
  { value: 7100, label: defineMessage({message: 'Mining & Minerals / Gems'})}, //"Горное дело и полезные ископаемые / Драгоценные камни", uk: "Мінерали та гірські породи / Дорогоцінне каміння" },
  { value: 7200, label: defineMessage({message: 'Music'})}, //"Музыка", uk: "Музика" },
  { value: 7300, label: defineMessage({message: 'Names (personal, company)'})}, //"Собственные имена и названия", uk: "Імена та власні назви" },
  { value: 7400, label: defineMessage({message: 'Nuclear Engineering / Science'})}, //"Ядерные технологии / Ядерная физика", uk: "Атомна енергія та дослідження" },
  { value: 7500, label: defineMessage({message: 'Nutrition'})}, //"Питание", uk: "Харчування" },
  { value: 7600, label: defineMessage({message: 'Paper / Paper Manufacturing'})}, //"Бумага / Бумажная промышленность", uk: "Папір / Паперова промисловість" },
  { value: 7700, label: defineMessage({message: 'Patents'})}, //"Патенты", uk: "Патенти" },
  { value: 7800, label: defineMessage({message: 'Petroleum Engineering / Science'})}, //"Нефтепромысловые науки и технологии", uk: "Нафтова промисловість та дослідження" },
  { value: 7900, label: defineMessage({message: 'Philosophy'})}, //"Философия", uk: "Філософія" },
  { value: 8000, label: defineMessage({message: 'Photography / Imaging / Graphic Arts'})}, //"Фотография / Обработка изображений / Изобразительные средства", uk: "Фотографія / Редагування зображень" },
  { value: 8100, label: defineMessage({message: 'Physics'})}, //"Физика", uk: "Фізика" },
  { value: 8200, label: defineMessage({message: 'Poetry & Literature'})}, //"Литература и поэзия", uk: "Література та поезія" },
  { value: 8300, label: defineMessage({message: 'Printing & Publishing'})}, //"Полиграфия и издательское дело", uk: "Друкарська справа та видавництво" },
  { value: 8400, label: defineMessage({message: 'Psychology'})}, //"Психология", uk: "Психологія" },
  { value: 8500, label: defineMessage({message: 'Real Estate'})}, //"Недвижимость", uk: "Нерухоме майно" },
  { value: 8600, label: defineMessage({message: 'Religion'})}, //"Религия", uk: "Релігія" },
  { value: 8700, label: defineMessage({message: 'Retail'})}, //"Розничная торговля", uk: "Роздрібна торгівля" },
  { value: 8800, label: defineMessage({message: 'Safety'})}, //"Безопасность", uk: "Безпека" },
  { value: 8900, label: defineMessage({message: 'Science: General'})}, //"Наука: в целом", uk: "Наука: Загальне" },
  { value: 9000, label: defineMessage({message: 'Ships, Sailing, Maritime'})}, //"Морское дело, мореплавание, морские судна", uk: "Кораблі, суда, навігація, морська справа" },
  { value: 9100, label: defineMessage({message: 'Slang'})}, //"Жаргон", uk: "Жаргон" },
  { value: 9200, label: defineMessage({message: 'Social Science, Sociology, Ethics, etc.'})}, //"Общественные науки, социология, этика и т. д.", uk: "Соціальні науки, соціологія, етика, тощо." },
  { value: 9300, label: defineMessage({message: 'Sports / Fitness / Recreation'})}, //"Спорт / Физкультура / Отдых", uk: "Спорт / Фізкультура / Відпочинок" },
  { value: 9400, label: defineMessage({message: 'Surveying'})}, //"Топогеодезические работы", uk: "Геодезія, топографія" },
  { value: 9500, label: defineMessage({message: 'Telecom(munications)'})}, //"Телекоммуникации", uk: "Телекомунікації" },
  { value: 9600, label: defineMessage({message: 'Textiles / Clothing / Fashion'})}, //"Текстильная промышленность / Одежда / Мода", uk: "Текстиль / Одяг / Мода" },
  { value: 9700, label: defineMessage({message: 'Tourism & Travel'})}, //"Туризм и поездки", uk: "Туризм та подорожування" },
  { value: 9800, label: defineMessage({message: 'Wine / Oenology / Viticulture'})}, //"Вино / Виноделие / Виноградарство", uk: "Вино / Виноробство / Виноградарство" },
  { value: 9900, label: defineMessage({message: 'Zoology'})}, //"Зоология", uk: "Зоологія" },
  { value: 9999, label: defineMessage({message: 'Miscellaneous / Other'})}, //"Прочее / Иное", uk: "Інше" },
];

class Subspecialties {

    constructor() {
        this.records = devMode() ? 
        // this.records = 
        [
          { spec: 100, ll:'en', ml:'ru', updated: 1000000000000000, subspecs: [{ value: 1, label: 'First specialty field 1'}, { value: 2, label: 'First specialty field 2'}, { value: 3, label: 'First specialty field 3'}]},
          // { spec: 200, ll:'en', ml:'ru', updated: 1000000000000000, subspecs: [{ value: 1, label: 'First subspecialty field 1'}, { value: 2, label: 'First subspecialty field 2'}, { value: 3, label: 'First subspecialty field 3'}]},
          // { spec: 400, ll:'en', ml:'ru', updated: 1000000000000000, subspecs: [{ value: 1, label: 'First subspecialty field 1'}, { value: 2, label: 'First subspecialty field 2'}, { value: 3, label: 'First subspecialty field 3'}]}
        ]
        : [];
      //   console.log('devMode',process.env.NODE_ENV);
      };

      findIndex(context) { 
        let {spec, ll, ml} = context;
        return this.records.findIndex(item => item.spec === spec && item.ll === ll && item.ml === ml);
      };
      
      // updateCache(sfId, sfData) // not debugged
      // {
      //     let index = this.findIndex(sfId);
      //     let object = { id:sfId, updated: Date.now(), subspecs: sfData};
      
      //     if (index !== -1)
      //         this.records[index] = object;
      //     else
      //         this.records.push(object);
      // };
      
      // pushCacheItem(sfId, ssItem) // not debugged
      // {
      //     let index = this.findIndex(sfId);
      //     // console.log('index:', index);
      //     if (index === -1)
      //     {
      //         let object = { id: sfId, updated: null, subspecs: [ssItem]};
      //         this.records.push(object);
      //     } else {
      //         let found = this.records[index].subspecs.findIndex(item => item.value === ssItem.value);
      //         if (found >= 0) {
      //             this.records[index].subspecs[found] = ssItem;
      //             // return;
      //         }
      //         else this.records[index].subspecs.push(ssItem);
      //     }
      //     // this.records[index].subspecs.push(ssItem);
      // }

      get(context = {}/*, waitTrigger = null, resolver = null*/)
      {
        const ERR_BAD_CONTEXT = -2;
        let putMode = 'name' in context; // or subspec === 0
        let getUrlMode = 'subspec' in context;
        let obsoletePeriod = SUBSPECS_OBSOLETE_PERIOD || 300000; // milisec
        let index = context ? this.findIndex(context): ERR_BAD_CONTEXT, updated = new Date().getTime();
        if (index === ERR_BAD_CONTEXT) throw 'badContext';
        let {spec, ll, ml} = context;
        if (!spec || !ll || !ml) throw 'badContextAttributes'; 
        // console.log( 'index :', index, 'now :', now, 'obsoletе :', now - this.records[index].updated);

          if (index > -1 && 
              !(getUrlMode || putMode || (updated - this.records[index].updated) > obsoletePeriod))
          {
            return Promise.resolve({data: this.records[index].subspecs})
          }
          else
          {
            // if (waitTrigger) waitTrigger(true);
            console.log(context);
            return axios(makeOptions('/subspecs', context))
            .then((res) => {
                if (res.data.code === RETCODE_OK) {
                  let subspecs = [], obj = res.data.data;
                  for (const property in obj) 
                    {subspecs.push({value: property, label: obj[property]})};
                  let url = getUrlMode ? res.data.url : '';
                  // let subspec = putMode ? res.data.subspec : 0; //context.subspec;
                  let subspec = res.data.subspec;
                  let object = { spec, ll, ml, updated, subspecs};
                  if (index > -1) { // there is already exist such one
                    this.records[index] = object;
                  }
                  else { this.records.push(object);}
                  return {data: subspecs, url, subspec};
                } 
                else {
                  return {message:'error.response.status', status: res.status};
                }
              // }
            })
            // .catch(defaultRejecter)
            // .then(value => { console.log(value); return value;});
          }
      };

      clear() {
        this.records = [];
      }
      
      // clearByValue(sfId, value = 0)
      // {
      //     let index = this.findIndex(sfId);

      //     if (index >= 0)
      //     {
      //        let found = this.records[index].subspecs.findIndex(item => item.value === value);
      //         if (found >= 0) {
      //             this.records[index].subspecs.splice(found, 1);
      //         }
      //     }
      // }
};

export const SubspecialtyRecords = new Subspecialties();

class WordlistNames {

  constructor() {
      this.records = /*devMode()*/false ? 
      // this.records = 
      [
        { spec: 100, ll:'en', ml:'ru', updated: 1000000000000000/*0*/, subspec: 1, list: [{ id: 1, name: 'First subspecialty field 1', items: 250, owner_id: 'Owner', path: '100--en--ru--1--0--060b3a8d915b3d'}, { id: 2, name: 'First subspecialty field 2', items: 130, owner_id: 'Owner', path: '100--en--ru--1--0--060b3a8d915b3d'}, { id: 3, name: 'First subspecialty field 3', items: 150, owner_id: 'Owner', path: '100--en--ru--1--0--060b3a8d915b3d'}]},
        // { spec: 200, ll:'en', ml:'ru', updated: 1000000000000000, subspecs: [{ value: 1, label: 'First subspecialty field 1'}, { value: 2, label: 'First subspecialty field 2'}, { value: 3, label: 'First subspecialty field 3'}]},
        // { spec: 400, ll:'en', ml:'ru', updated: 1000000000000000, subspecs: [{ value: 1, label: 'First subspecialty field 1'}, { value: 2, label: 'First subspecialty field 2'}, { value: 3, label: 'First subspecialty field 3'}]}
      ]
      : [];
    //   console.log('devMode',process.env.NODE_ENV);
    };

    findIndex(context) { 
      let {spec, ll, ml, subspec} = context;
      return this.records.findIndex(item => 
        item.spec === spec && item.subspec === subspec && item.ll === ll && item.ml === ml);
    };

    addList(context){
      const { spec, ll, ml, subspec, list} = context;
      const updated = new Date().getTime();
      let index = this.findIndex(context);
      const object = { spec, ll, ml, updated, subspec, list};
      if (index > -1) {
        this.records[index] = object;
      }
      else { this.records.push(object);}
    }

    actualizeSubcpecs(context, updated){
      let obsoletePeriod = WORDLIST_OBSOLETE_PERIOD || 3000000; // milisec
      let {spec, ll, ml, subspecs} = context;
      if (!context || !spec || !ll || !ml || !subspecs || subspecs.length === 0) throw 'badContextOrAttributes';
      return subspecs.filter(ss => {
        let index = this.findIndex({...context, subspec: ss});
        // return !(index > -1 && ((updated - this.records[index].updated) < obsoletePeriod))
        return !(index > -1 && (updated - this.records[index].updated) < obsoletePeriod)
      });
      // (index > -1 && 
      // !(getUrlMode || putMode || (updated - this.records[index].updated) > obsoletePeriod))          if (index > -1 && (updated - this.records[index].updated) > obsoletePeriod))

      // return actualSubspecs;
      // index > -1 && ((updated - this.records[index].updated) < obsoletePeriod)
    }

    get(context = {})
    {
      if (context.subspecs.length === 0) return Promise.resolve({data: [] });
      const updated = new Date().getTime();
      const subspecsToFetch = this.actualizeSubcpecs(context, updated);
      const differenceArr = context.subspecs.filter(x => !subspecsToFetch.includes(x));
      let resultData = differenceArr.reduce(
        (result, ss) => 
        {
          return result.concat(this.records[this.findIndex({...context, subspec: ss})].list)
        }, []);

        if (subspecsToFetch.length === 0)
        {
          // if (resolver) resolver({data: this.records[index].subspecs});
          return Promise.resolve({data: resultData });
        }
        else
        {
          context.subspecs = subspecsToFetch;
          return axios(makeGetOptions('/names', context))
          .then((res) => {
            console.log('res:', res);
            // if (resolver) {
              if (res.data.code === RETCODE_OK) {
                const { spec, ll, ml} = context;
                const lists = res.data.data;

                subspecsToFetch.forEach(item => {
                let list = lists.filter(ss => ss.subspec_id === item);
                if (list.length === 0) return;// {data: resultData};
                let object = { spec, ll, ml, updated, subspec: item, list};
                let index = this.findIndex({object});
                if (index > -1) {
                  this.records[index] = object;
                }
                else { this.records.push(object);}
                });

                return { data: resultData.concat(lists)};
              } 
              else {
                return {message:'error.response.status', status: res.status};
              }
            // }
          })
          .catch(err => { return {data: resultData, message:defaultRejecter(err).message};})
          // .catch(defaultRejecter)
          // .then(value => { console.log(value); return value;});
        }
        // return {data: resultData};
    };

    clear() {
      this.records = [];
    }
};

export const WordlistNameRecords = new WordlistNames();
(() => {
  'use strict';
  const STORAGE_KEY = 'forma-calorie-tracker-v1';
  const mealNames = { breakfast: 'Завтрак', lunch: 'Обед', dinner: 'Ужин', snack: 'Перекус' };
  const mealIcons = { breakfast: '☀', lunch: '◒', dinner: '☾', snack: '✳' };
  const catalog = [
    { id: 'oatmeal', name: 'Овсяная каша на воде', group: 'Каши', kcal: 71, protein: 2.5, fat: 1.5, carbs: 12.0 },
    { id: 'oatmeal-milk', name: 'Овсяная каша на молоке', group: 'Каши', kcal: 102, protein: 3.2, fat: 4.0, carbs: 14.2 },
    { id: 'buckwheat', name: 'Гречка варёная', group: 'Каши и крупы', kcal: 110, protein: 4.2, fat: 1.1, carbs: 21.3 },
    { id: 'rice', name: 'Рис белый варёный', group: 'Каши и крупы', kcal: 130, protein: 2.7, fat: 0.3, carbs: 28.2 },
    { id: 'chicken', name: 'Куриная грудка запечённая', group: 'Мясо и птица', kcal: 165, protein: 31.0, fat: 3.6, carbs: 0 },
    { id: 'egg', name: 'Яйцо куриное варёное', group: 'Яйца', kcal: 155, protein: 13.0, fat: 11.0, carbs: 1.1 },
    { id: 'salmon', name: 'Лосось запечённый', group: 'Рыба', kcal: 206, protein: 22.0, fat: 12.0, carbs: 0 },
    { id: 'apple', name: 'Яблоко свежее', group: 'Фрукты', kcal: 52, protein: 0.3, fat: 0.2, carbs: 13.8 },
    { id: 'banana', name: 'Банан', group: 'Фрукты', kcal: 89, protein: 1.1, fat: 0.3, carbs: 22.8 },
    { id: 'avocado', name: 'Авокадо', group: 'Овощи и фрукты', kcal: 160, protein: 2.0, fat: 14.7, carbs: 8.5 },
    { id: 'tomato', name: 'Помидор', group: 'Овощи', kcal: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
    { id: 'cucumber', name: 'Огурец', group: 'Овощи', kcal: 15, protein: 0.7, fat: 0.1, carbs: 3.6 },
    { id: 'bread', name: 'Хлеб цельнозерновой', group: 'Хлеб', kcal: 247, protein: 13.0, fat: 4.2, carbs: 41.0 },
    { id: 'yogurt', name: 'Йогурт натуральный', group: 'Молочные продукты', kcal: 61, protein: 3.5, fat: 3.3, carbs: 4.7 },
    { id: 'cottage-cheese', name: 'Творог 5%', group: 'Молочные продукты', kcal: 121, protein: 17.0, fat: 5.0, carbs: 1.8 },
    { id: 'potato', name: 'Картофель варёный', group: 'Овощи', kcal: 87, protein: 1.9, fat: 0.1, carbs: 20.1 },
    { id: 'pasta', name: 'Макароны варёные', group: 'Каши и крупы', kcal: 157, protein: 5.8, fat: 0.9, carbs: 30.9 },
    { id: 'lentils', name: 'Чечевица варёная', group: 'Бобовые', kcal: 116, protein: 9.0, fat: 0.4, carbs: 20.1 },
    { id: 'almonds', name: 'Миндаль', group: 'Орехи', kcal: 579, protein: 21.2, fat: 49.9, carbs: 21.6 },
    { id: 'olive-oil', name: 'Оливковое масло', group: 'Масла', kcal: 884, protein: 0, fat: 100, carbs: 0 },
  ];
  const expandedCatalog = [
    "borscht-vegetarian|Борщ постный|Русская и славянская кухня|45|1.5|1.5|7",
    "borscht-beef|Борщ с говядиной|Русская и славянская кухня|57|4|2.5|5",
    "shchi|Щи из свежей капусты|Русская и славянская кухня|42|2|1.5|5",
    "rassolnik|Рассольник|Русская и славянская кухня|50|2.5|1.7|6.5",
    "solyanka|Солянка мясная|Русская и славянская кухня|80|5|4|4",
    "chicken-noodle-soup|Куриный суп с лапшой|Русская и славянская кухня|45|3.5|1.3|5",
    "pelmeni-boiled|Пельмени отварные|Русская и славянская кухня|245|11|12|24",
    "pelmeni-fried|Пельмени жареные|Русская и славянская кухня|310|12|18|25",
    "vareniki-potato|Вареники с картофелем|Русская и славянская кухня|190|5|4|33",
    "vareniki-curd|Вареники с творогом|Русская и славянская кухня|205|10|4|30",
    "syrniki|Сырники|Русская и славянская кухня|240|14|10|24",
    "blini|Блины домашние|Русская и славянская кухня|220|6|8|31",
    "olivier-salad|Салат оливье|Русская и славянская кухня|180|5|15|7",
    "vinaigrette|Винегрет|Русская и славянская кухня|78|2|4|9",
    "herring-under-coat|Сельдь под шубой|Русская и славянская кухня|190|7|15|8",
    "draniki|Драники картофельные|Русская и славянская кухня|190|4|9|24",
    "beef-stroganoff|Бефстроганов|Русская и славянская кухня|175|13|11|6",
    "cabbage-rolls|Голубцы с мясом и рисом|Русская и славянская кухня|140|8|7|10",
    "buckwheat-mushroom|Гречка с грибами|Русская и славянская кухня|110|4|3|17",
    "ukha|Уха|Русская и славянская кухня|40|5|1|2",
    "okroshka-kefir|Окрошка на кефире|Русская и славянская кухня|60|3|2|7",
    "potato-casserole|Картофельная запеканка с мясом|Русская и славянская кухня|160|9|8|13",
    "uzbek-plov-beef|Плов с говядиной|Узбекская и центральноазиатская кухня|205|9|10|21",
    "uzbek-plov-chicken|Плов с курицей|Узбекская и центральноазиатская кухня|180|10|6|22",
    "lagman|Лагман|Узбекская и центральноазиатская кухня|110|5|3|15",
    "manti-beef|Манты с говядиной|Узбекская и центральноазиатская кухня|230|10|11|24",
    "samsa-beef|Самса с говядиной|Узбекская и центральноазиатская кухня|285|10|17|25",
    "shurpa|Шурпа|Узбекская и центральноазиатская кухня|60|6|2|4",
    "mastava|Мастава|Узбекская и центральноазиатская кухня|80|4|2|12",
    "dimlama|Димлама|Узбекская и центральноазиатская кухня|70|4|3|7",
    "chuchvara-soup|Чучвара в бульоне|Узбекская и центральноазиатская кухня|75|5|2|8",
    "norin|Нарын с мясом|Узбекская и центральноазиатская кухня|210|9|7|27",
    "beshbarmak|Бешбармак|Узбекская и центральноазиатская кухня|200|11|8|21",
    "kazy|Казы|Узбекская и центральноазиатская кухня|320|20|26|0",
    "kuurdak|Куурдак|Узбекская и центральноазиатская кухня|230|17|16|5",
    "uzbek-non|Узбекская лепёшка|Узбекская и центральноазиатская кухня|270|9|4|49",
    "baursak|Баурсаки|Узбекская и центральноазиатская кухня|380|8|22|39",
    "pumpkin-samsa|Самса с тыквой|Узбекская и центральноазиатская кухня|250|6|13|29",
    "moshkichiri|Мошкичири с машем|Узбекская и центральноазиатская кухня|140|7|4|19",
    "qurutob|Курутоб|Узбекская и центральноазиатская кухня|155|6|7|18",
    "lamb-shashlik|Шашлык из баранины|Узбекская и центральноазиатская кухня|260|24|18|0",
    "chak-chak|Чак-чак|Узбекская и центральноазиатская кухня|445|7|23|55",
    "khachapuri-adjarian|Хачапури по-аджарски|Кавказская и ближневосточная кухня|280|11|15|26",
    "khachapuri-imeretian|Хачапури по-имеретински|Кавказская и ближневосточная кухня|260|12|13|24",
    "khinkali|Хинкали с говядиной|Кавказская и ближневосточная кухня|200|9|8|22",
    "lobio|Лобио из фасоли|Кавказская и ближневосточная кухня|120|7|4|15",
    "dolma|Долма с мясом и рисом|Кавказская и ближневосточная кухня|155|7|10|10",
    "satsivi-chicken|Сациви с курицей|Кавказская и ближневосточная кухня|210|16|14|5",
    "chicken-tabaka|Цыплёнок табака|Кавказская и ближневосточная кухня|230|24|14|0",
    "hummus|Хумус|Кавказская и ближневосточная кухня|166|8|10|14",
    "falafel|Фалафель|Кавказская и ближневосточная кухня|333|13|18|32",
    "tabbouleh|Табуле|Кавказская и ближневосточная кухня|130|3|8|13",
    "fattoush|Фаттуш|Кавказская и ближневосточная кухня|100|3|6|10",
    "chicken-shawarma|Шаурма с курицей|Кавказская и ближневосточная кухня|180|16|8|12",
    "lamb-kofta|Кёфте из баранины|Кавказская и ближневосточная кухня|250|20|18|2",
    "vegetable-couscous|Кускус с овощами|Кавказская и ближневосточная кухня|112|4|3|18",
    "shakshuka|Шакшука|Кавказская и ближневосточная кухня|95|6|6|4",
    "baba-ganoush|Баба-гануш|Кавказская и ближневосточная кухня|120|3|9|7",
    "pita|Пита|Кавказская и ближневосточная кухня|275|9|1.5|56",
    "baklava|Пахлава|Кавказская и ближневосточная кухня|430|6|25|48",
    "pizza-margherita|Пицца «Маргарита»|Итальянская и средиземноморская кухня|250|11|9|31",
    "lasagna-beef|Лазанья с говядиной|Итальянская и средиземноморская кухня|160|10|8|13",
    "pasta-carbonara|Паста карбонара|Итальянская и средиземноморская кухня|260|11|15|22",
    "mushroom-risotto|Ризотто с грибами|Итальянская и средиземноморская кухня|135|4|5|19",
    "pasta-bolognese|Паста болоньезе|Итальянская и средиземноморская кухня|170|8|6|22",
    "pasta-pesto|Паста с соусом песто|Итальянская и средиземноморская кухня|220|7|11|25",
    "gnocchi-tomato|Ньокки в томатном соусе|Итальянская и средиземноморская кухня|160|4|4|27",
    "ravioli-ricotta|Равиоли с рикоттой и шпинатом|Итальянская и средиземноморская кухня|230|9|9|28",
    "minestrone|Суп минестроне|Итальянская и средиземноморская кухня|45|2|1|7",
    "caprese|Салат капрезе|Итальянская и средиземноморская кухня|180|9|14|4",
    "focaccia|Фокачча|Итальянская и средиземноморская кухня|300|8|9|47",
    "greek-salad|Греческий салат|Итальянская и средиземноморская кухня|95|3|7|5",
    "ratatouille|Рататуй|Итальянская и средиземноморская кухня|60|2|3|7",
    "paella-seafood|Паэлья с морепродуктами|Итальянская и средиземноморская кухня|155|9|4|21",
    "tortilla-espanola|Испанская тортилья с картофелем|Итальянская и средиземноморская кухня|165|7|10|12",
    "tiramisu|Тирамису|Итальянская и средиземноморская кухня|300|5|19|27",
    "sushi-salmon|Суши с лососем|Восточная и юго-восточная Азия|160|9|5|20",
    "california-roll|Ролл «Калифорния»|Восточная и юго-восточная Азия|175|6|6|26",
    "miso-soup|Суп мисо|Восточная и юго-восточная Азия|35|2.5|1.2|4",
    "chicken-ramen|Рамен с курицей|Восточная и юго-восточная Азия|115|7|4|12",
    "tonkotsu-ramen|Рамен тонкоцу со свининой|Восточная и юго-восточная Азия|180|9|8|18",
    "yakisoba|Якисоба с овощами|Восточная и юго-восточная Азия|150|6|5|21",
    "tempura-udon|Удон с темпурой|Восточная и юго-восточная Азия|155|7|6|18",
    "soba|Лапша соба|Восточная и юго-восточная Азия|99|5|1|20",
    "egg-fried-rice|Жареный рис с яйцом|Восточная и юго-восточная Азия|160|5|5|24",
    "gyoza|Гёдза с мясом|Восточная и юго-восточная Азия|210|9|9|23",
    "mapo-tofu|Мапо тофу|Восточная и юго-восточная Азия|140|9|10|5",
    "kung-pao-chicken|Курица гунбао|Восточная и юго-восточная Азия|165|14|8|10",
    "peking-duck|Утка по-пекински|Восточная и юго-восточная Азия|285|19|22|1",
    "spring-rolls|Спринг-роллы с овощами|Восточная и юго-восточная Азия|160|4|6|23",
    "bibimbap|Пибимпап|Восточная и юго-восточная Азия|130|7|4|17",
    "bulgogi|Пулькоги из говядины|Восточная и юго-восточная Азия|190|16|10|8",
    "kimchi-stew|Кимчи-ччигэ|Восточная и юго-восточная Азия|75|6|4|4",
    "japchae|Чапче с овощами|Восточная и юго-восточная Азия|150|4|5|22",
    "pad-thai|Пад-тай с курицей|Восточная и юго-восточная Азия|190|7|7|25",
    "thai-green-curry|Тайское зелёное карри с курицей|Восточная и юго-восточная Азия|145|10|9|7",
    "tom-yum-shrimp|Том-ям с креветками|Восточная и юго-восточная Азия|45|5|1|4",
    "pho-beef|Фо бо с говядиной|Восточная и юго-восточная Азия|60|5|1.5|7",
    "pho-chicken|Фо га с курицей|Восточная и юго-восточная Азия|55|5|1|6",
    "banh-mi|Бань ми с курицей|Восточная и юго-восточная Азия|230|12|8|27",
    "rice-paper-rolls|Спринг-роллы в рисовой бумаге|Восточная и юго-восточная Азия|100|6|2|15",
    "chicken-butter|Курица баттер-масала|Индийская и южноазиатская кухня|160|13|10|5",
    "chicken-tikka|Курица тикка|Индийская и южноазиатская кухня|150|23|5|3",
    "chicken-biryani|Бирьяни с курицей|Индийская и южноазиатская кухня|170|9|6|20",
    "dal-tadka|Дал тадка из чечевицы|Индийская и южноазиатская кухня|120|7|4|15",
    "chana-masala|Чана масала|Индийская и южноазиатская кухня|145|7|5|19",
    "palak-paneer|Палак панир|Индийская и южноазиатская кухня|160|8|12|7",
    "samosa-potato|Самоса с картофелем|Индийская и южноазиатская кухня|260|5|14|29",
    "masala-dosa|Масала доса|Индийская и южноазиатская кухня|165|4|6|24",
    "idli|Идли|Индийская и южноазиатская кухня|145|4|1|30",
    "naan|Наан|Индийская и южноазиатская кухня|290|9|6|50",
    "aloo-gobi|Алу гоби|Индийская и южноазиатская кухня|95|3|4|13",
    "rajma|Раджма из красной фасоли|Индийская и южноазиатская кухня|125|7|3|18",
    "chicken-korma|Куриная корма|Индийская и южноазиатская кухня|180|12|12|6",
    "paneer-tikka|Панир тикка|Индийская и южноазиатская кухня|210|14|14|7",
    "beef-tacos|Тако с говядиной|Латиноамериканская кухня|220|12|12|17",
    "chicken-burrito|Буррито с курицей|Латиноамериканская кухня|180|10|6|22",
    "chicken-enchiladas|Энчиладас с курицей|Латиноамериканская кухня|175|12|7|16",
    "cheese-quesadilla|Кесадилья с сыром|Латиноамериканская кухня|310|13|17|26",
    "guacamole|Гуакамоле|Латиноамериканская кухня|150|2|14|8",
    "ceviche|Севиче из белой рыбы|Латиноамериканская кухня|95|17|2|2",
    "beef-empanada|Эмпанада с говядиной|Латиноамериканская кухня|260|10|12|27",
    "feijoada|Фейжоада с фасолью|Латиноамериканская кухня|130|9|6|11",
    "arroz-con-pollo|Аррос кон пойо с курицей|Латиноамериканская кухня|165|9|5|21",
    "cheese-arepa|Арепа с сыром|Латиноамериканская кухня|250|7|9|35",
    "jollof-rice|Джоллоф-райс|Африканская кухня|150|3|5|23",
    "doro-wat|Доро ват из курицы|Африканская кухня|170|16|10|4",
    "injera|Инжера|Африканская кухня|130|4|1|28",
    "ugali|Угали из кукурузной муки|Африканская кухня|145|3|1|32",
    "fufu|Фуфу из маниока|Африканская кухня|160|1|0|38",
    "peanut-chicken-stew|Африканское рагу с курицей и арахисом|Африканская кухня|180|10|11|10",
    "cheeseburger|Чизбургер|Европа и Америка|285|16|15|22",
    "mac-and-cheese|Макароны с сыром|Европа и Америка|190|7|8|23",
    "grilled-cheese|Сэндвич с жареным сыром|Европа и Америка|290|12|16|26",
    "fish-and-chips|Фиш-энд-чипс|Европа и Америка|230|12|12|19",
    "chicken-caesar|Салат «Цезарь» с курицей|Европа и Америка|155|12|10|6",
    "yogurt-parfait|Йогуртовый парфе с ягодами|Европа и Америка|125|7|4|15",
    "berry-oatmeal|Овсяная каша с ягодами|Европа и Америка|95|3|2|16",
    "granola-bowl|Гранола с йогуртом|Европа и Америка|180|5|7|25",
    "baked-potato-sour-cream|Запечённый картофель со сметаной|Европа и Америка|125|3|4|19",
    "salmon-poke|Поке с лососем|Европа и Америка|145|10|6|13",
    "quinoa-vegetables|Киноа с овощами|Европа и Америка|115|4|3|18",
    "lentil-soup|Чечевичный суп|Европа и Америка|65|4|1|10",
    "roast-chicken-thigh|Запечённое куриное бедро|Европа и Америка|220|25|13|0",
    "tofu-stir-fry|Тофу с овощами вок|Европа и Америка|120|9|7|6",
    "cheese-omelet|Омлет с сыром|Европа и Америка|190|13|14|2",
    "fruit-salad|Фруктовый салат|Европа и Америка|65|1|0|16",
  ].map((row) => {
    const [id, name, group, kcal, protein, fat, carbs] = row.split("|");
    return { id, name, group, kcal: Number(kcal), protein: Number(protein), fat: Number(fat), carbs: Number(carbs) };
  });
  catalog.push(...expandedCatalog);
  const $ = (selector) => document.querySelector(selector);
  const state = loadState();
  let selectedDate = localISODate();
  let periodMode = 'day';
  let selectedFood = catalog.find((food) => food.id === 'oatmeal');
  let customMode = false;
  let activeView = 'today';
  let noticeTimer;

  function localISODate(date = new Date()) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }
  function diaryDurationDays() {
    const today = localISODate();
    const firstDate = state.entries.map((entry) => entry.date).filter((date) => date <= today).sort()[0];
    if (!firstDate) return 0;
    const dayNumber = (value) => {
      const [year, month, day] = value.split('-').map(Number);
      return Date.UTC(year, month - 1, day);
    };
    return Math.floor((dayNumber(today) - dayNumber(firstDate)) / 86400000) + 1;
  }
  function dayForm(value) {
    const lastTwo = value % 100;
    if (lastTwo >= 11 && lastTwo <= 14) return 'дней';
    const last = value % 10;
    return last === 1 ? 'день' : last >= 2 && last <= 4 ? 'дня' : 'дней';
  }
  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        entries: Array.isArray(parsed.entries) ? parsed.entries.filter(validEntry) : [],
        customFoods: Array.isArray(parsed.customFoods) ? parsed.customFoods.filter(validFood) : [],
        goal: Number.isFinite(parsed.goal) && parsed.goal > 0 ? parsed.goal : null,
      };
    } catch (_) { return { entries: [], customFoods: [], goal: null }; }
  }
  function validFood(food) {
    return food && typeof food.id === 'string' && typeof food.name === 'string' && Number.isFinite(food.kcal);
  }
  function validEntry(entry) {
    return entry && typeof entry.id === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) && typeof entry.name === 'string' && Number.isFinite(entry.grams) && entry.grams > 0;
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { showNotice('Не удалось сохранить данные. Возможно, в браузере закончилось место.', true); }
  }
  function number(value, digits = 1) {
    if (value == null || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
  }
  function gramsText(value) { return `${number(value, 0)} г`; }
  function displayDate(date, options) {
    return new Intl.DateTimeFormat('ru-RU', { timeZone: 'UTC', ...options }).format(new Date(`${date}T12:00:00Z`));
  }
  function dayEntries(date = selectedDate) { return state.entries.filter((entry) => entry.date === date); }
  function periodRange() {
    const [year, month] = selectedDate.split('-').map(Number);
    if (periodMode === 'year') return { start: `${year}-01-01`, end: `${year}-12-31` };
    if (periodMode === 'month') return { start: `${year}-${String(month).padStart(2, '0')}-01`, end: localISODate(new Date(year, month, 0, 12)) };
    return { start: selectedDate, end: selectedDate };
  }
  function periodEntries() {
    const { start, end } = periodRange();
    return state.entries.filter((entry) => entry.date >= start && entry.date <= end);
  }
  function periodName() { return periodMode === 'year' ? 'за год' : periodMode === 'month' ? 'за месяц' : 'за день'; }
  function periodLabel() {
    if (periodMode === 'year') return selectedDate.slice(0, 4);
    if (periodMode === 'month') return displayDate(selectedDate, { month: 'long', year: 'numeric' });
    return displayDate(selectedDate, { day: 'numeric', month: 'short' });
  }
  function changeDate(date, amount, unit) {
    const current = new Date(`${date}T12:00:00`);
    if (unit === 'day') { current.setDate(current.getDate() + amount); return localISODate(current); }
    const year = current.getFullYear() + (unit === 'year' ? amount : 0);
    const month = current.getMonth() + (unit === 'month' ? amount : 0);
    const first = new Date(year, month, 1, 12);
    const day = Math.min(current.getDate(), new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate());
    first.setDate(day);
    return localISODate(first);
  }
  function total(entries, key) {
    if (!entries.length) return 0;
    if (entries.some((entry) => entry[key] == null)) return null;
    return entries.reduce((sum, entry) => sum + entry[key], 0);
  }
  function showNotice(message, isError = false) {
    const notice = $('#notice');
    notice.textContent = message;
    notice.classList.toggle('error', isError);
    notice.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 4200);
  }
  function renderDate() {
    $('#date-label').textContent = periodMode === 'year'
      ? 'Годовой обзор'
      : periodMode === 'day'
        ? displayDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : periodLabel();
    $('#date-short').textContent = periodMode === 'year' ? '' : periodLabel();
    $('#date-picker').value = selectedDate;
    $('#month-picker').value = selectedDate.slice(0, 7);
    $('#year-picker').value = selectedDate.slice(0, 4);
    $('#date-picker').hidden = periodMode !== 'day';
    $('#month-picker').hidden = periodMode !== 'month';
    $('#year-picker').hidden = periodMode !== 'year';
    $('#prev-day').setAttribute('aria-label', `Предыдущий ${periodMode === 'year' ? 'год' : periodMode === 'month' ? 'месяц' : 'день'}`);
    $('#next-day').setAttribute('aria-label', `Следующий ${periodMode === 'year' ? 'год' : periodMode === 'month' ? 'месяц' : 'день'}`);
    document.querySelectorAll('.period-option').forEach((button) => {
      const active = button.dataset.period === periodMode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const range = periodRange();
    $('#period-hint').textContent = periodMode === 'day'
      ? 'Выбран один день'
      : periodMode === 'month'
        ? `${displayDate(range.start, { day: 'numeric', month: 'long' })} — ${displayDate(range.end, { day: 'numeric', month: 'long' })}`
        : `С 1 января по 31 декабря ${selectedDate.slice(0, 4)}`;
    const trackedDays = diaryDurationDays();
    $('#diary-duration').textContent = 'Дневник ведётся · ' + trackedDays + ' ' + dayForm(trackedDays);
    $('#entry-date').value = selectedDate;
    $('#entry-date').min = range.start;
    $('#entry-date').max = range.end;
    $('#entry-date-wrap').hidden = periodMode === 'day';
    $('.entry-controls').classList.toggle('has-period-date', periodMode !== 'day');
    $('#summary-kicker').textContent = periodMode === 'day' && selectedDate === localISODate() ? 'СЕГОДНЯ' : periodMode === 'day' ? 'ВЫБРАННАЯ ДАТА' : periodMode === 'month' ? 'ВЫБРАННЫЙ МЕСЯЦ' : 'ВЫБРАННЫЙ ГОД';
    $('#summary-title').textContent = periodMode === 'year' ? 'Итоги года' : periodMode === 'month' ? 'Итоги месяца' : 'Итоги дня';
    $('#summary-description').innerHTML = periodMode === 'day' ? 'Калории и нутриенты<br>за выбранную дату' : periodMode === 'month' ? 'Калории и нутриенты<br>за выбранный месяц' : 'Калории и нутриенты<br>за выбранный год';
    const nutrientPeriod = periodMode === 'year' ? 'за выбранный год' : periodMode === 'month' ? 'за выбранный месяц' : 'за выбранный день';
    $('#protein-period').textContent = nutrientPeriod;
    $('#fat-period').textContent = nutrientPeriod;
    $('#carbs-period').textContent = nutrientPeriod;
    $('#diary-title').innerHTML = periodMode === 'day' ? 'Дневник<br><em>питания</em>' : periodMode === 'month' ? 'Записи<br><em>месяца</em>' : 'Записи<br><em>года</em>';
    $('.diary-intro > p').textContent = periodMode === 'day'
      ? 'Добавьте продукт и задайте порцию. Итоги обновятся для выбранного дня.'
      : `Просматривайте записи ${periodMode === 'month' ? 'за месяц' : 'за год'} и добавляйте еду на выбранную дату.`;
    $('.subtitle').textContent = activeView === 'history'
      ? `История питания ${periodMode === 'day' ? 'по дням' : periodMode === 'month' ? 'за выбранный месяц' : 'за выбранный год'}.`
      : 'Ваш дневник питания — записи и итоги на одном экране.';
    const today = localISODate();
    $('#page-title').innerHTML = periodMode === 'day' && selectedDate === today
      ? 'Добрый день<span class="title-comma">,</span>'
      : periodMode === 'day' ? displayDate(selectedDate, { day: 'numeric', month: 'long' }) : periodLabel();
  }
  function renderSummary() {
    const entries = periodEntries();
    const kcal = total(entries, 'kcal');
    const protein = total(entries, 'protein');
    const fat = total(entries, 'fat');
    const carbs = total(entries, 'carbs');
    $('#total-kcal').textContent = number(kcal, 0);
    $('#total-protein').textContent = `${number(protein)} г`;
    $('#total-fat').textContent = `${number(fat)} г`;
    $('#total-carbs').textContent = `${number(carbs)} г`;
    $('#entry-count').textContent = String(entries.length);
    if (periodMode === 'day') {
      $('#goal-caption').textContent = state.goal ? `из ${number(state.goal, 0)} ккал` : 'Дневная цель не задана';
      $('#goal-remaining').textContent = state.goal && kcal != null ? `Осталось ${number(Math.max(0, state.goal - kcal), 0)}` : 'Укажите цель ниже';
      $('#goal-progress').style.width = state.goal && kcal != null ? `${Math.min(100, kcal / state.goal * 100)}%` : '0%';
    } else {
      const loggedDays = new Set(entries.map((entry) => entry.date)).size;
      const average = kcal != null && loggedDays ? kcal / loggedDays : null;
      $('#goal-caption').textContent = state.goal ? `Цель в день: ${number(state.goal, 0)} ккал` : `Всего ${periodName()}`;
      $('#goal-remaining').textContent = state.goal && average != null ? `Среднее ${number(average, 0)} ккал / день` : state.goal ? 'Пока нет записей' : `${loggedDays} ${loggedDays === 1 ? 'день с записями' : 'дней с записями'}`;
      $('#goal-progress').style.width = state.goal && average != null ? `${Math.min(100, average / state.goal * 100)}%` : '0%';
    }
    $('#goal-input').value = state.goal || '';
  }
  function renderMeals() {
    const host = $('#meal-list');
    host.replaceChildren();
    const renderMealCard = (type, name, entries) => {
      const card = document.createElement('article');
      card.className = `meal-card meal-${type}`;
      const meta = document.createElement('div'); meta.className = 'meal-meta';
      meta.innerHTML = `<b>${name}</b><small>${entries.length ? `${entries.length} ${entries.length === 1 ? 'запись' : 'записей'}` : 'По выбранной дате'}</small>`;
      const items = document.createElement('div'); items.className = 'meal-items';
      if (entries.length) entries.forEach((entry) => {
        const row = document.createElement('div'); row.className = 'meal-entry';
        const label = document.createElement('span'); label.className = 'entry-name'; label.textContent = entry.name;
        const detail = document.createElement('small'); detail.textContent = `${gramsText(entry.grams)} · ${entry.custom ? 'ваши данные' : 'каталог'}`; label.append(detail);
        const value = document.createElement('span'); value.className = 'entry-value'; value.innerHTML = `${number(entry.kcal, 0)} <small>ккал</small>`;
        const remove = document.createElement('button'); remove.className = 'delete-entry'; remove.type = 'button'; remove.setAttribute('aria-label', `Удалить ${entry.name}`); remove.textContent = '×'; remove.addEventListener('click', () => removeEntry(entry.id)); value.append(remove);
        row.append(label, value); items.append(row);
      }); else { const empty = document.createElement('span'); empty.className = 'meal-empty'; empty.textContent = 'Пока ничего не добавлено'; items.append(empty); }
      const mealKcal = total(entries, 'kcal');
      const subtotal = document.createElement('div'); subtotal.className = 'meal-total'; subtotal.innerHTML = `${number(mealKcal, 0)} <small>ккал</small>`;
      const add = document.createElement('button'); add.type = 'button'; add.className = 'meal-add'; add.setAttribute('aria-label', `Добавить в ${name}`); add.textContent = '+';
      add.addEventListener('click', () => { $('#meal-select').value = type; $('#add-panel').hidden = false; $('#food-search').focus(); });
      card.append(meta, items, subtotal, add);
      return card;
    };
    const entries = periodEntries();
    if (periodMode === 'day') {
      Object.entries(mealNames).forEach(([type, name]) => host.append(renderMealCard(type, name, entries.filter((entry) => entry.meal === type))));
      return;
    }
    if (!entries.length) {
      const empty = document.createElement('p'); empty.className = 'period-empty';
      empty.textContent = `В этом ${periodMode === 'month' ? 'месяце' : 'году'} пока нет записей.`; host.append(empty); return;
    }
    const byDate = new Map();
    entries.sort((a, b) => b.date.localeCompare(a.date)).forEach((entry) => {
      if (!byDate.has(entry.date)) byDate.set(entry.date, []);
      byDate.get(entry.date).push(entry);
    });
    byDate.forEach((day, date) => {
      const heading = document.createElement('div'); heading.className = 'diary-date-heading';
      const title = document.createElement('strong'); title.textContent = displayDate(date, { weekday: 'long', day: 'numeric', month: 'long' });
      const dayKcal = document.createElement('span'); dayKcal.textContent = `${number(total(day, 'kcal'), 0)} ккал`;
      heading.append(title, dayKcal); host.append(heading);
      Object.entries(mealNames).forEach(([type, name]) => {
        const mealEntries = day.filter((entry) => entry.meal === type);
        if (mealEntries.length) host.append(renderMealCard(type, name, mealEntries));
      });
    });
  }
  function renderHistory() {
    const host = $('#history-chart'); host.replaceChildren();
    let buckets;
    if (periodMode === 'year') {
      const year = Number(selectedDate.slice(0, 4));
      buckets = Array.from({ length: 12 }, (_, index) => {
        const start = `${year}-${String(index + 1).padStart(2, '0')}-01`;
        const end = localISODate(new Date(year, index + 1, 0, 12));
        return { start, end, label: displayDate(start, { month: 'short' }) };
      });
      $('#history-title').textContent = `История за ${year} год`;
      $('#history-description').textContent = 'Калорийность по месяцам выбранного года.';
    } else if (periodMode === 'month') {
      const { start, end } = periodRange();
      const first = new Date(`${start}T12:00:00`); const last = new Date(`${end}T12:00:00`);
      buckets = Array.from({ length: last.getDate() }, (_, index) => {
        const date = new Date(first); date.setDate(index + 1); const key = localISODate(date);
        return { start: key, end: key, label: String(index + 1) };
      });
      $('#history-title').textContent = `История за ${periodLabel()}`;
      $('#history-description').textContent = 'Калорийность по дням выбранного месяца.';
    } else {
      buckets = Array.from({ length: 7 }, (_, index) => {
        const date = changeDate(selectedDate, index - 6, 'day');
        return { start: date, end: date, label: displayDate(date, { weekday: 'short' }) };
      });
      $('#history-title').textContent = 'Последние 7 дней';
      $('#history-description').textContent = `Калорийность за неделю до ${periodLabel()}.`;
    }
    host.classList.toggle('dense', periodMode === 'month');
    const values = buckets.map((bucket) => ({ ...bucket, kcal: total(state.entries.filter((entry) => entry.date >= bucket.start && entry.date <= bucket.end), 'kcal') }));
    const max = Math.max(state.goal || 0, ...values.map((item) => item.kcal || 0), 500);
    values.forEach(({ label: text, kcal }) => {
      const column = document.createElement('div'); column.className = 'chart-column';
      const value = document.createElement('span'); value.className = 'chart-value'; value.textContent = kcal == null || kcal === 0 ? '—' : number(kcal, 0);
      const track = document.createElement('div'); track.className = 'chart-bar-track';
      const bar = document.createElement('i'); bar.className = 'chart-bar'; bar.style.height = kcal ? `${Math.max(4, Math.min(100, kcal / max * 100))}%` : '3px'; track.append(bar);
      const label = document.createElement('small'); label.textContent = text;
      column.append(value, track, label); host.append(column);
    });
  }
  function renderAll() { renderDate(); renderSummary(); renderMeals(); renderHistory(); }
  function allFoods() { return [...catalog, ...state.customFoods]; }
  function selectFood(food) {
    selectedFood = food;
    customMode = false;
    $('#custom-fields').hidden = true;
    $('#selected-name').textContent = food.name;
    $('#custom-toggle').textContent = 'Свой продукт';
    document.querySelectorAll('.food-result').forEach((button) => button.classList.toggle('selected', button.dataset.id === food.id));
  }
  function renderFoodResults(query = '') {
    const host = $('#food-results'); host.replaceChildren();
    $('#catalog-note').textContent = 'Встроенная база: ' + catalog.length + ' позиций. Значения на 100 г ориентировочные и зависят от рецепта.';
    const normalized = query.trim().toLocaleLowerCase('ru');
    const matches = allFoods().filter((food) => !normalized || `${food.name} ${food.group || ''}`.toLocaleLowerCase('ru').includes(normalized)).slice(0, 24);
    if (!matches.length) {
      const empty = document.createElement('p'); empty.className = 'helper'; empty.textContent = 'В каталоге такого продукта нет. Добавьте свои значения кнопкой «Свой продукт».'; host.append(empty); return;
    }
    matches.forEach((food) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = `food-result${selectedFood?.id === food.id && !customMode ? ' selected' : ''}`; button.dataset.id = food.id;
      const symbol = document.createElement('span'); symbol.className = 'food-symbol'; symbol.textContent = '◌';
      const copy = document.createElement('span'); copy.className = 'food-copy';
      const title = document.createElement('b'); title.textContent = food.name;
      const group = document.createElement('small'); group.textContent = food.group || 'Ваш продукт'; copy.append(title, group);
      const kcal = document.createElement('span'); kcal.className = 'food-kcal'; kcal.textContent = `${number(food.kcal, 0)} ккал / 100 г`;
      button.append(symbol, copy, kcal); button.addEventListener('click', () => selectFood(food)); host.append(button);
    });
  }
  function valueFromInput(id) {
    const raw = $(id).value.trim();
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 && value <= 1000 ? value : NaN;
  }
  function saveEntry(event) {
    event.preventDefault();
    const grams = Number($('#entry-grams').value);
    if (!Number.isFinite(grams) || grams < 1 || grams > 5000) { showNotice('Укажите массу от 1 до 5000 г.', true); return; }
    let food = selectedFood;
    if (customMode) {
      const name = $('#custom-name').value.trim();
      const kcal = valueFromInput('#custom-kcal');
      const protein = valueFromInput('#custom-protein');
      const fat = valueFromInput('#custom-fat');
      const carbs = valueFromInput('#custom-carbs');
      if (!name || kcal == null || [kcal, protein, fat, carbs].some((value) => typeof value === 'number' && !Number.isFinite(value))) { showNotice('Введите название и калории на 100 г. Остальные нутриенты можно оставить пустыми.', true); return; }
      food = { id: `custom-${crypto.randomUUID()}`, name, group: 'Ваш продукт', kcal, protein, fat, carbs };
      state.customFoods.unshift(food);
    }
    if (!food) return;
    const entryDate = $('#entry-date').value || selectedDate;
    state.entries.push({ id: crypto.randomUUID(), date: entryDate, meal: $('#meal-select').value, name: food.name, grams, custom: customMode, kcal: scale(food.kcal, grams), protein: scale(food.protein, grams), fat: scale(food.fat, grams), carbs: scale(food.carbs, grams) });
    persist(); renderAll(); renderFoodResults($('#food-search').value); $('#entry-grams').value = '100';
    if (customMode) { $('#custom-name').value = ''; $('#custom-kcal').value = ''; $('#custom-protein').value = ''; $('#custom-fat').value = ''; $('#custom-carbs').value = ''; }
    $('#add-panel').hidden = true; showNotice('Запись добавлена и сохранена в этом браузере.');
  }
  function scale(value, grams) { return value == null ? null : Math.round(value * grams / 100 * 10) / 10; }
  function removeEntry(id) {
    const entry = state.entries.find((item) => item.id === id);
    if (!entry || !window.confirm(`Удалить запись «${entry.name}»?`)) return;
    state.entries = state.entries.filter((item) => item.id !== id); persist(); renderAll(); showNotice('Запись удалена.');
  }
  function saveGoal(event) {
    event.preventDefault();
    const raw = $('#goal-input').value.trim();
    const goal = raw ? Number(raw) : null;
    if (goal != null && (!Number.isFinite(goal) || goal < 1 || goal > 10000)) { showNotice('Укажите цель от 1 до 10000 ккал.', true); return; }
    state.goal = goal; persist(); renderSummary(); showNotice(goal ? 'Дневная цель сохранена.' : 'Дневная цель очищена.');
  }
  function setDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T12:00:00`).getTime())) return;
    selectedDate = date; renderAll();
  }
  function exportBackup() {
    const mealOrder = Object.keys(mealNames);
    const entries = [...state.entries].sort((a, b) => b.date.localeCompare(a.date) || mealOrder.indexOf(a.meal) - mealOrder.indexOf(b.meal));
    const days = new Map();
    entries.forEach((entry) => {
      if (!days.has(entry.date)) days.set(entry.date, []);
      days.get(entry.date).push(entry);
    });
    const lines = [
      'FORMA — ЛИЧНЫЙ ДНЕВНИК ПИТАНИЯ',
      `Отчёт создан: ${new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())}`,
      `Дневная цель: ${state.goal ? `${number(state.goal, 0)} ккал` : 'не задана'}`,
      `Записей в дневнике: ${entries.length}`,
      '',
      'ИСТОРИЯ ПИТАНИЯ',
    ];
    if (!days.size) lines.push('', 'Записей пока нет.');
    for (const [date, dayEntries] of days) {
      const macros = `Белки: ${number(total(dayEntries, 'protein'))} г · Жиры: ${number(total(dayEntries, 'fat'))} г · Углеводы: ${number(total(dayEntries, 'carbs'))} г`;
      lines.push('', '─'.repeat(56), displayDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), `Итого: ${number(total(dayEntries, 'kcal'), 0)} ккал · ${macros}`);
      Object.entries(mealNames).forEach(([meal, name]) => {
        const items = dayEntries.filter((entry) => entry.meal === meal);
        lines.push('', name.toLocaleUpperCase('ru'));
        if (!items.length) { lines.push('  Нет записей'); return; }
        items.forEach((entry) => {
          lines.push(`  • ${entry.name} — ${gramsText(entry.grams)} · ${number(entry.kcal, 0)} ккал · Б ${number(entry.protein)} г · Ж ${number(entry.fat)} г · У ${number(entry.carbs)} г`);
        });
      });
    }
    if (state.customFoods.length) {
      lines.push('', '─'.repeat(56), 'МОИ ПРОДУКТЫ (значения на 100 г)');
      state.customFoods.forEach((food) => {
        lines.push(`  • ${food.name} — ${number(food.kcal, 0)} ккал · Б ${number(food.protein)} г · Ж ${number(food.fat)} г · У ${number(food.carbs)} г`);
      });
    }
    lines.push('', 'Данные выгружены из личного дневника Forma.');
    const blob = new Blob([`\uFEFF${lines.join('\n')}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `forma-dnevnik-${localISODate()}.txt`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showNotice('Читаемый отчёт скачан в формате TXT.');
  }
  function setView(view) {
    activeView = view;
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
    $('#crumb-title').textContent = view === 'today' ? 'Мой день' : 'История';
    $('#date-label').parentElement.hidden = view === 'history';
    if (view === 'today') renderDate();
    else {
      $('#page-title').innerHTML = 'Ваша история<span class="title-comma">.</span>';
      $('.subtitle').textContent = `История питания ${periodMode === 'day' ? 'по дням' : periodMode === 'month' ? 'за выбранный месяц' : 'за выбранный год'}.`;
    }
    if (view === 'history') renderHistory();
  }

  $('#show-add').addEventListener('click', () => { $('#add-panel').hidden = false; $('#food-search').focus(); });
  $('#hide-add').addEventListener('click', () => { $('#add-panel').hidden = true; });
  $('#food-search').addEventListener('input', (event) => renderFoodResults(event.target.value));
  $('#clear-search').addEventListener('click', () => { $('#food-search').value = ''; renderFoodResults(); $('#food-search').focus(); });
  $('#custom-toggle').addEventListener('click', () => {
    customMode = !customMode; $('#custom-fields').hidden = !customMode;
    $('#custom-toggle').textContent = customMode ? 'Выбрать из каталога' : 'Свой продукт';
    if (customMode) { $('#selected-name').textContent = 'Пищевая ценность с вашей упаковки'; $('#custom-name').focus(); }
    else { $('#selected-name').textContent = selectedFood?.name || 'Выберите продукт'; }
    document.querySelectorAll('.food-result').forEach((button) => button.classList.remove('selected'));
  });
  $('#entry-form').addEventListener('submit', saveEntry);
  $('#goal-form').addEventListener('submit', saveGoal);
  $('#prev-day').addEventListener('click', () => setDate(changeDate(selectedDate, -1, periodMode)));
  $('#next-day').addEventListener('click', () => setDate(changeDate(selectedDate, 1, periodMode)));
  $('#date-picker').addEventListener('change', (event) => setDate(event.target.value));
  $('#month-picker').addEventListener('change', (event) => {
    if (!event.target.value) return;
    const [year, month] = event.target.value.split('-').map(Number);
    const day = Math.min(Number(selectedDate.slice(8, 10)), new Date(year, month, 0).getDate());
    setDate(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
  });
  $('#year-picker').addEventListener('change', (event) => {
    const year = Number(event.target.value);
    if (!Number.isInteger(year) || year < 2000 || year > 2100) { showNotice('Выберите год от 2000 до 2100.', true); renderDate(); return; }
    const month = Number(selectedDate.slice(5, 7));
    const day = Math.min(Number(selectedDate.slice(8, 10)), new Date(year, month, 0).getDate());
    setDate(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
  });
  document.querySelectorAll('.period-option').forEach((button) => button.addEventListener('click', () => {
    periodMode = button.dataset.period;
    renderAll();
  }));
  $('#export-btn').addEventListener('click', exportBackup);
  document.querySelectorAll('.nav-item').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
  selectFood(selectedFood); renderFoodResults(); renderAll(); setView('today');
})();

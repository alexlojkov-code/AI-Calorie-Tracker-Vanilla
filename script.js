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
  const $ = (selector) => document.querySelector(selector);
  const state = loadState();
  let selectedDate = localISODate();
  let selectedFood = catalog.find((food) => food.id === 'oatmeal');
  let customMode = false;
  let activeView = 'today';
  let noticeTimer;

  function localISODate(date = new Date()) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
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
    $('#date-label').textContent = displayDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long' });
    $('#date-short').textContent = displayDate(selectedDate, { day: 'numeric', month: 'short' });
    $('#date-picker').value = selectedDate;
    const today = localISODate();
    $('#page-title').innerHTML = selectedDate === today ? 'Добрый день<span class="title-comma">,</span>' : displayDate(selectedDate, { day: 'numeric', month: 'long' });
  }
  function renderSummary() {
    const entries = dayEntries();
    const kcal = total(entries, 'kcal');
    const protein = total(entries, 'protein');
    const fat = total(entries, 'fat');
    const carbs = total(entries, 'carbs');
    $('#total-kcal').textContent = number(kcal, 0);
    $('#total-protein').textContent = `${number(protein)} г`;
    $('#total-fat').textContent = `${number(fat)} г`;
    $('#total-carbs').textContent = `${number(carbs)} г`;
    $('#entry-count').textContent = String(entries.length);
    $('#goal-caption').textContent = state.goal ? `из ${number(state.goal, 0)} ккал` : 'Дневная цель не задана';
    $('#goal-remaining').textContent = state.goal && kcal != null ? `Осталось ${number(Math.max(0, state.goal - kcal), 0)}` : 'Укажите цель ниже';
    $('#goal-progress').style.width = state.goal && kcal != null ? `${Math.min(100, kcal / state.goal * 100)}%` : '0%';
    $('#goal-input').value = state.goal || '';
  }
  function renderMeals() {
    const host = $('#meal-list');
    host.replaceChildren();
    Object.entries(mealNames).forEach(([type, name]) => {
      const entries = dayEntries().filter((entry) => entry.meal === type);
      const card = document.createElement('article');
      card.className = `meal-card meal-${type}`;
      const icon = document.createElement('div'); icon.className = 'meal-icon'; icon.textContent = mealIcons[type];
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
      card.append(icon, meta, items, subtotal, add); host.append(card);
    });
  }
  function renderHistory() {
    const host = $('#history-chart'); host.replaceChildren();
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(`${selectedDate}T12:00:00`); day.setDate(day.getDate() - (6 - index)); return localISODate(day);
    });
    const values = days.map((date) => ({ date, kcal: total(dayEntries(date), 'kcal') }));
    const max = Math.max(state.goal || 0, ...values.map((item) => item.kcal || 0), 500);
    values.forEach(({ date, kcal }) => {
      const column = document.createElement('div'); column.className = 'chart-column';
      const value = document.createElement('span'); value.className = 'chart-value'; value.textContent = kcal == null || kcal === 0 ? '—' : number(kcal, 0);
      const track = document.createElement('div'); track.className = 'chart-bar-track';
      const bar = document.createElement('i'); bar.className = 'chart-bar'; bar.style.height = kcal ? `${Math.max(4, Math.min(100, kcal / max * 100))}%` : '3px'; track.append(bar);
      const label = document.createElement('small'); label.textContent = displayDate(date, { weekday: 'short' });
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
    const normalized = query.trim().toLocaleLowerCase('ru');
    const matches = allFoods().filter((food) => !normalized || `${food.name} ${food.group || ''}`.toLocaleLowerCase('ru').includes(normalized)).slice(0, 12);
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
    state.entries.push({ id: crypto.randomUUID(), date: selectedDate, meal: $('#meal-select').value, name: food.name, grams, custom: customMode, kcal: scale(food.kcal, grams), protein: scale(food.protein, grams), fat: scale(food.fat, grams), carbs: scale(food.carbs, grams) });
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
  function setDate(date) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return; selectedDate = date; renderAll(); }
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
    $('#history-section').hidden = view !== 'history';
    $('#crumb-title').textContent = view === 'today' ? 'Мой день' : 'История';
    $('#page-title').innerHTML = view === 'today' ? (selectedDate === localISODate() ? 'Добрый день<span class="title-comma">,</span>' : displayDate(selectedDate, { day: 'numeric', month: 'long' })) : 'Ваша история<span class="title-comma">.</span>';
    $('#date-label').parentElement.hidden = view === 'history';
    document.querySelector('.subtitle').textContent = view === 'today' ? 'Бережно отмечайте то, что поддерживает вас.' : 'Ваши записи за неделю, без аккаунта и облачной синхронизации.';
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
  $('#prev-day').addEventListener('click', () => { const date = new Date(`${selectedDate}T12:00:00`); date.setDate(date.getDate() - 1); setDate(localISODate(date)); });
  $('#next-day').addEventListener('click', () => { const date = new Date(`${selectedDate}T12:00:00`); date.setDate(date.getDate() + 1); setDate(localISODate(date)); });
  $('#date-picker').addEventListener('change', (event) => setDate(event.target.value));
  $('#export-btn').addEventListener('click', exportBackup);
  document.querySelectorAll('.nav-item').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
  selectFood(selectedFood); renderFoodResults(); renderAll(); setView('today');
})();

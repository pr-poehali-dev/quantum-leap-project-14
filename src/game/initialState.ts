import type { GameState } from './types'

export const INITIAL_STATE: GameState = {
  screen: 'menu',
  day: 1,
  time: '08:00',
  stats: {
    energy: 80,
    mood: 70,
    knowledge: 10,
    money: 500,
    socialRating: 30,
  },
  character: {
    name: 'Аня',
    skinTone: 'light' as const,
    hairColor: 'brown' as const,
    hairStyle: 'ponytail' as const,
    bodyShape: 'average' as const,
    eyeColor: 'brown' as const,
    faceShape: 'oval' as const,
    currentOutfit: 'casual' as const,
    unlockedOutfits: ['casual', 'scrubs', 'cozy'] as const,
  },
  roomItems: [
    { id: 'bed', name: 'Кровать', emoji: '🛏️', category: 'furniture', placed: false },
    { id: 'desk', name: 'Письменный стол', emoji: '🪑', category: 'furniture', placed: false },
    { id: 'shelf', name: 'Полка', emoji: '📚', category: 'furniture', placed: false },
    { id: 'lamp', name: 'Настольная лампа', emoji: '🪔', category: 'decor', placed: false },
    { id: 'plant', name: 'Растение', emoji: '🌿', category: 'decor', placed: false },
    { id: 'rug', name: 'Ковёр', emoji: '🟫', category: 'furniture', placed: false },
    { id: 'curtains', name: 'Шторы', emoji: '🪟', category: 'decor', placed: false },
    { id: 'mirror', name: 'Зеркало', emoji: '🪞', category: 'furniture', placed: false },
  ],
  orders: [],
  friends: [
    { id: 'katya', name: 'Катя', emoji: '👩‍🦰', relationship: 20, description: 'Однокурсница, любит кофе и анатомию' },
    { id: 'dima', name: 'Дима', emoji: '👨‍💻', relationship: 10, description: 'Живёт этажом выше, программист' },
    { id: 'anya', name: 'Аня', emoji: '👩‍🔬', relationship: 5, description: 'Старшекурсница, уже проходит практику' },
  ],
  currentEvent: null,
  currentLocation: 'Общежитие',
  hasRelationship: false,
  partnerName: '',
  workShifts: 0,
  unlockedLocations: ['Общежитие', 'Университет', 'Кофейня'],
  notifications: ['Добро пожаловать в игру! Твоя комната пуста — обустрой её!'],
}

export const SHOP_ITEMS = [
  { id: 'notebook', name: 'Тетради', emoji: '📓', category: 'stationery' as const, placed: false },
  { id: 'pens', name: 'Ручки и маркеры', emoji: '✏️', category: 'stationery' as const, placed: false },
  { id: 'anatomy_atlas', name: 'Атлас анатомии', emoji: '📖', category: 'stationery' as const, placed: false },
  { id: 'scrubs', name: 'Медицинский халат', emoji: '🥼', category: 'clothes' as const, placed: false },
  { id: 'sneakers', name: 'Кроссовки', emoji: '👟', category: 'clothes' as const, placed: false },
  { id: 'hoodie', name: 'Толстовка', emoji: '👕', category: 'clothes' as const, placed: false },
  { id: 'poster', name: 'Постер с нервной системой', emoji: '🖼️', category: 'decor' as const, placed: false },
  { id: 'fairy_lights', name: 'Гирлянда', emoji: '✨', category: 'decor' as const, placed: false },
  { id: 'wardrobe', name: 'Шкаф', emoji: '🗄️', category: 'furniture' as const, placed: false },
  { id: 'chair', name: 'Мягкое кресло', emoji: '🪑', category: 'furniture' as const, placed: false },
]

export const PICKUP_LOCATIONS = ['ПВЗ Ozon у метро', 'Почта России', 'Постамат Wildberries', 'ПВЗ СДЭК']

export const GAME_EVENTS = [
  // === УЧЁБА ===
  {
    id: 'lecture_skip',
    title: '🔔 Утро понедельника',
    description: 'Звенит будильник в 7:00. Первая пара — анатомия. Профессор Петров очень строгий. За три пропуска — отчисление.',
    choices: [
      { text: '🏃 Бежать на пару', effect: { energy: -15, knowledge: 20, mood: -5 }, result: 'Успела! Записала весь материал. Профессор похвалил тебя у доски — редкость!' },
      { text: '😴 Ещё 5 минут...', effect: { energy: 10, knowledge: -5, mood: -20 }, result: 'Проспала до 10:00. Катя скинула фото конспекта, но на душе неспокойно.' },
      { text: '📲 Написать Кате, что заболела', effect: { energy: 5, knowledge: -10, mood: -10, socialRating: -5 }, result: 'Катя поняла, но намекнула, что профессор ведёт список. Надо быть осторожнее.' },
    ],
  },
  {
    id: 'lab_work',
    title: '🔬 Практика в анатомичке',
    description: 'Первое занятие с препаратами. Некоторые студенты чувствуют себя плохо. Ты нервничаешь, но держишься.',
    choices: [
      { text: '💪 Сосредоточиться и работать', effect: { knowledge: 25, mood: -10, energy: -20 }, result: 'Справилась! Преподаватель отметил твою аккуратность. Это важный навык.' },
      { text: '🚶 Выйти подышать', effect: { energy: -5, mood: 5, knowledge: -5 }, result: 'Вышла, собралась с духом и вернулась. Всё нормально — так делают многие.' },
      { text: '🤝 Попросить Аню помочь', effect: { knowledge: 20, socialRating: 15, energy: -10 }, result: 'Аня — настоящий профессионал. Объяснила всё спокойно. Вы подружились крепче.' },
    ],
  },
  {
    id: 'professor_question',
    title: '🎓 Профессор вызывает к доске',
    description: 'Петров смотрит прямо на тебя: "Расскажите строение плечевого сустава". Класс замер.',
    choices: [
      { text: '📢 Отвечать уверенно', effect: { knowledge: 15, mood: 20, socialRating: 10 }, result: 'Ответила правильно! Весь поток аплодировал. Петров кивнул — его высшая похвала.' },
      { text: '😬 Честно признаться, что не помнишь', effect: { mood: -15, knowledge: 5 }, result: 'Петров вздохнул, но оценил честность. "Учите, Смирнова. Вы способны." — сказал он.' },
      { text: '📖 Попросить подглядеть в конспект', effect: { knowledge: 10, mood: -20, socialRating: -10 }, result: 'Петров поймал взгляд и покачал головой. Стыд, но в следующий раз будешь готова.' },
    ],
  },
  {
    id: 'group_project',
    title: '📋 Совместный проект',
    description: 'Нужно сделать доклад по фармакологии. Катя предлагает разделить работу, но Дима говорит, что сделает всё сам.',
    choices: [
      { text: '🤝 Работать с Катей вместе', effect: { socialRating: 20, knowledge: 15, energy: -15, mood: 15 }, result: 'Отличная командная работа! Преподаватель поставил пятёрку и отметил слаженность.' },
      { text: '🧑‍💻 Доверить Диме', effect: { energy: 10, knowledge: -5, socialRating: -5 }, result: 'Дима сделал... но немного неточно. Четвёрка. Катя немного обиделась.' },
      { text: '⚡ Взять всё на себя', effect: { knowledge: 20, energy: -30, mood: -15 }, result: 'Сделала блестящий доклад, но вымоталась. Уважение выросло, но силы на нуле.' },
    ],
  },
  {
    id: 'exam_stress',
    title: '😰 Сессия',
    description: 'До экзамена по биохимии 2 дня. Ты устала, голова не варит. Катя предлагает учить вместе в библиотеке.',
    choices: [
      { text: '🌙 Зубрить всю ночь одной', effect: { knowledge: 30, energy: -40, mood: -20 }, result: 'Сдала на 4! Но после экзамена проспала 14 часов и пропустила лекцию.' },
      { text: '📚 Учить с Катей в библиотеке', effect: { knowledge: 25, mood: 15, socialRating: 15, energy: -15 }, result: 'Учились до 23:00. Обе сдали хорошо, и вечер прошёл приятно!' },
      { text: '🛌 Выспаться и доверять себе', effect: { knowledge: 15, energy: 20, mood: 10 }, result: 'Свежая голова помогла! Вспомнила всё что учила. Сдала на 4 без стресса.' },
    ],
  },
  {
    id: 'stipend_cut',
    title: '💸 Стипендия срезана',
    description: 'В деканате сказали: из-за одной тройки стипендия уменьшится на 30%. Нужно что-то решать.',
    choices: [
      { text: '📝 Написать апелляцию', effect: { energy: -20, mood: -10, money: 50 }, result: 'Апелляция частично прошла. Вернули половину. Навык бюрократии прокачан!' },
      { text: '💼 Найти подработку', effect: { money: 300, energy: -25, knowledge: -10 }, result: 'Устроилась раздавать листовки. Не гламурно, но +300₽ к бюджету.' },
      { text: '😤 Принять и учиться лучше', effect: { knowledge: 15, mood: -20 }, result: 'Обидно, но честно. Пообещала себе больше не получать тройки.' },
    ],
  },

  // === ДРУЗЬЯ ===
  {
    id: 'friend_party',
    title: '🎉 Пятница вечером',
    description: 'Катя зовёт на вечеринку в 407-й комнате. Музыка уже слышна на весь коридор. Завтра коллоквиум.',
    choices: [
      { text: '🕺 Пойти на всю ночь', effect: { mood: 30, socialRating: 25, knowledge: -15, energy: -25 }, result: 'Потанцевала, познакомилась с Антоном с 3-го курса. Коллоквиум сдала на 3, но воспоминания — бесценны!' },
      { text: '📖 Остаться учить', effect: { knowledge: 25, mood: -15, energy: -10 }, result: 'Сдала на 5! Катя немного надулась, но потом сказала: "Уважаю дисциплину."' },
      { text: '🕙 Зайти на час и уйти', effect: { knowledge: 15, mood: 15, socialRating: 15, energy: -15 }, result: 'Золотая середина! Пообщалась, поддержала Катю, ушла в 22:00. Идеальный вечер.' },
    ],
  },
  {
    id: 'katya_fight',
    title: '😤 Ссора с Катей',
    description: 'Катя обиделась, что ты взяла её конспект без спроса и не вернула вовремя. Она не отвечает на сообщения.',
    choices: [
      { text: '🙏 Извиниться лично', effect: { socialRating: 20, mood: 10 }, result: 'Пришла к ней с кофе и честно извинилась. Катя растаяла: "Ладно, всё ок. Только предупреждай!"' },
      { text: '💬 Написать длинное сообщение', effect: { socialRating: 5, mood: -5 }, result: 'Катя прочла, ответила коротко: "Ладно." Холодновато, но лёд тронулся.' },
      { text: '⏳ Подождать, сама отойдёт', effect: { socialRating: -15, mood: -10 }, result: 'Прошло 3 дня. Катя всё ещё дуется. Надо было действовать раньше.' },
    ],
  },
  {
    id: 'dima_help',
    title: '💻 Дима просит помощи',
    description: 'Дима сверху стучит в дверь: "Помоги написать реферат по биологии? Я в ней ноль". Сейчас 21:00.',
    choices: [
      { text: '✍️ Помочь от души', effect: { socialRating: 20, mood: 10, energy: -20 }, result: 'Помогла! Дима был так благодарен, что принёс пиццу. Теперь вы настоящие друзья.' },
      { text: '📚 Объяснить, где искать', effect: { socialRating: 10, energy: -5 }, result: 'Показала источники. Дима справился сам и гордится этим. Win-win.' },
      { text: '😴 Отказать — хочу спать', effect: { energy: 15, socialRating: -10 }, result: 'Дима понял, но расстроился. Сдал реферат на тройку. Иногда отдых важнее.' },
    ],
  },
  {
    id: 'new_friend',
    title: '👋 Новая знакомая',
    description: 'В столовой за твой столик садится незнакомая девушка — Маша с факультета стоматологии. Весёлая, разговорчивая.',
    choices: [
      { text: '😊 Познакомиться', effect: { socialRating: 20, mood: 20 }, result: 'Маша оказалась невероятной! Вы проговорили час. Теперь она в твоём телефоне.' },
      { text: '📱 Вежливо кивнуть и продолжить есть', effect: { mood: 5 }, result: 'Спокойный обед. Маша ушла к другим. Иногда нужно время для себя.' },
    ],
  },
  {
    id: 'anya_advice',
    title: '👩‍🔬 Совет старшекурсницы',
    description: 'Аня остановила тебя в коридоре: "У тебя усталый вид. Первый курс — самый тяжёлый. Могу помочь с хвостами?"',
    choices: [
      { text: '🙏 Попросить помощи по анатомии', effect: { knowledge: 30, socialRating: 20, energy: -10 }, result: 'Провели 2 часа за учёбой. Аня объясняет иначе, чем профессора — намного понятнее!' },
      { text: '💪 "Справлюсь сама, спасибо"', effect: { mood: 5 }, result: 'Аня кивнула с уважением: "Как знаешь. Я рядом если что." Приятно, что она предложила.' },
      { text: '☕ Предложить вместе попить кофе', effect: { socialRating: 25, mood: 20, energy: -5 }, result: 'За кофе узнала массу лайфхаков от Ани: какие преподаватели лояльны, как готовиться к сессии.' },
    ],
  },

  // === ПОДРАБОТКИ ===
  {
    id: 'work_offer',
    title: '📋 Объявление на доске',
    description: 'На кафедре объявление: "Требуется ассистент на ресепшен в клинике Dr.Лайт. 4 ч/день, 250₽/час". Это мечта!',
    choices: [
      { text: '📞 Позвонить прямо сейчас', effect: { money: 250, energy: -15, socialRating: 15 }, result: 'Тебя взяли! Пройдёшь обучение завтра. Первая настоящая работа по специальности!' },
      { text: '🤔 Обдумать до вечера', effect: { energy: 5 }, result: 'Позвонила вечером — место уже взяли. Следующий раз действуй быстрее!' },
    ],
  },
  {
    id: 'work_shift',
    title: '🏥 Рабочий день в клинике',
    description: 'Смена с 16:00 до 20:00. Много пациентов, звонки не умолкают. Коллега Валентина просит остаться ещё на час.',
    choices: [
      { text: '✅ Остаться помочь', effect: { money: 250, energy: -25, socialRating: 15, mood: 10 }, result: 'Осталась! Валентина была благодарна. Пообещала замолвить слово перед главврачом.' },
      { text: '🏃 Уйти — завтра пары ранние', effect: { energy: 5, money: 0 }, result: 'Ушла вовремя. Выспалась. Коллеги поняли — ты студентка, это нормально.' },
    ],
  },
  {
    id: 'babysitting',
    title: '👶 Подработка: няня',
    description: 'Соседка с первого этажа просит посидеть с ребёнком в субботу вечером. 400₽ за 3 часа.',
    choices: [
      { text: '👍 Согласиться', effect: { money: 400, energy: -20, mood: 10 }, result: 'Малыш оказался милым! Играли в конструктор. Соседка пообещала звать ещё.' },
      { text: '📚 Отказать — нужно учиться', effect: { knowledge: 15 }, result: 'Потратила вечер на учёбу. Правильное решение перед сессией.' },
    ],
  },
  {
    id: 'tutor_offer',
    title: '🎓 Стать репетитором',
    description: 'Мама одноклассника пишет: "Моему сыну нужна помощь по биологии. Ты медик — поможешь? 500₽/час."',
    choices: [
      { text: '✨ Согласиться', effect: { money: 500, knowledge: 10, energy: -20, socialRating: 10 }, result: 'Провела первый урок. Объясняя другим — сама закрепила материал! Двойная польза.' },
      { text: '❌ Слишком много забот', effect: { energy: 10 }, result: 'Отказала вежливо. Они поняли. Иногда беречь силы важнее денег.' },
    ],
  },

  // === ОТНОШЕНИЯ ===
  {
    id: 'relationship_start',
    title: '☕ В кофейне «Пауза»',
    description: 'Антон с 3-го курса снова здесь. Смотрит на тебя, улыбается и подходит: "Можно составлю компанию? Или ты ждёшь кого-то?"',
    choices: [
      { text: '😊 "Конечно, присаживайся!"', effect: { mood: 30, socialRating: 15 }, result: 'Вы проговорили 2 часа о медицине, кино и жизни. Он взял твой номер. Сердце чуть быстрее 💫' },
      { text: '😅 "Жду подругу, извини"', effect: { mood: -5 }, result: 'Он кивнул и ушёл. Позже Катя написала, что он спросил про тебя. Может, в другой раз.' },
      { text: '🤔 "Только на 15 минут"', effect: { mood: 15, socialRating: 10 }, result: 'Засиделись на час. Антон провёл тебя до общаги. Что-то определённо есть!' },
    ],
  },
  {
    id: 'first_date',
    title: '🎬 Первое свидание',
    description: 'Антон предлагает сходить в кино в субботу. Показывают новый фильм про нейрохирурга — как раз твоя тема!',
    choices: [
      { text: '🎉 "Да, с удовольствием!"', effect: { mood: 35, socialRating: 10 }, result: 'Отличный вечер! Фильм, мороженое, долгая прогулка. Антон держал за руку 💕' },
      { text: '📚 "Не могу, сессия скоро"', effect: { knowledge: 10, mood: -10 }, result: 'Антон понял, но немного расстроился. Перенесли на следующую неделю.' },
    ],
  },
  {
    id: 'relationship_conflict',
    title: '💔 Небольшая ссора',
    description: 'Антон обиделся, что ты отменила встречу в последний момент из-за учёбы. Пишет: "Ты всегда занята."',
    choices: [
      { text: '❤️ Позвонить и объяснить всё', effect: { mood: 20, socialRating: 5 }, result: 'Поговорили голосом. Антон понял: "Я просто скучаю по тебе." Всё наладилось.' },
      { text: '✍️ Написать длинное сообщение', effect: { mood: 5 }, result: 'Переписывались час. Помирились, но осадок остался. Лучше разговаривать голосом.' },
      { text: '😤 "Это МОЯ жизнь и МОЯ учёба"', effect: { mood: -20, socialRating: -10 }, result: 'Антон замолчал на 2 дня. Потом написал сам, но стало чуть холоднее между вами.' },
    ],
  },

  // === ГОРОД И ЖИЗНЬ ===
  {
    id: 'grocery_budget',
    title: '🛒 Конец месяца',
    description: 'Деньги заканчиваются. До стипендии 5 дней. В холодильнике почти пусто. Катя предлагает скинуться на еду.',
    choices: [
      { text: '🤝 Скинуться с Катей', effect: { money: -100, mood: 15, socialRating: 10 }, result: 'Купили гречку, яйца, хлеб и шоколадку. Ужинали вместе и смеялись над жизнью.' },
      { text: '🍜 Доширак и гордость', effect: { money: -30, mood: -10, energy: -10 }, result: '5 дней доширака. Тяжело, но справилась. Теперь знаешь: нужна финансовая подушка.' },
      { text: '📲 Попросить денег у родителей', effect: { money: 500, mood: -15 }, result: 'Мама прислала 500₽ и 20 голосовых сообщений с советами. Деньги получила, нервы потратила.' },
    ],
  },
  {
    id: 'park_walk',
    title: '🌳 Солнечный день',
    description: 'Редкий солнечный день в октябре. Пары закончились в 14:00. Катя зовёт гулять в парк. Или можно почитать учебник.',
    choices: [
      { text: '🌸 Пойти в парк', effect: { mood: 30, energy: 15, socialRating: 15 }, result: 'Провели 2 часа на свежем воздухе. Фотографировались с листьями. Красота и нужный отдых!' },
      { text: '📖 Почитать учебник', effect: { knowledge: 15, mood: -5 }, result: 'Прочитала 2 главы. Продуктивно, но окно при этом было открыто — хоть воздух свежий.' },
    ],
  },
  {
    id: 'mall_trip',
    title: '🏬 Поход в ТЦ',
    description: 'Катя тащит в торговый центр: "Там огромная распродажа! Пойдём хотя бы посмотрим". Ты знаешь, что Катя умеет уговаривать.',
    choices: [
      { text: '🛍️ Пойти и купить что-нибудь', effect: { mood: 25, money: -350, energy: -10 }, result: 'Купила свитер и набор карандашей. Потратила 350₽. Но настроение отличное!' },
      { text: '👀 Пойти только смотреть', effect: { mood: 15, socialRating: 10, energy: -10 }, result: 'Просто погуляли, выпили кофе. Не купила ничего — и не жалеешь!' },
      { text: '🏠 Остаться дома', effect: { energy: 10, mood: -5 }, result: 'Осталась дома. Отдохнула, но потом Катя весь вечер показывала покупки в рилсах.' },
    ],
  },
  {
    id: 'metro_adventure',
    title: '🚇 Заблудилась в метро',
    description: 'Поехала на другой конец города на ПВЗ. Села не на ту ветку. Уже 30 минут едешь в неизвестном направлении.',
    choices: [
      { text: '📱 Открыть карту и разобраться', effect: { energy: -10, mood: 10 }, result: 'Разобралась за 5 минут! Теперь знаешь город намного лучше. Приключение засчитано.' },
      { text: '🆘 Позвонить Диме', effect: { socialRating: 10, energy: -5, mood: 15 }, result: 'Дима провёл по телефону как навигатор. Смеялись оба. Такие моменты сближают.' },
    ],
  },
  {
    id: 'health_scare',
    title: '🤒 Захворала',
    description: 'Проснулась с температурой 38.2. Сегодня важная практика. Доктор в голове говорит одно, а организм — другое.',
    choices: [
      { text: '🏥 Остаться дома и лечиться', effect: { energy: 20, mood: 10, knowledge: -10 }, result: 'Правильное решение! Выпила чай с мёдом, поспала. Через день — как новая.' },
      { text: '😷 Надеть маску и пойти', effect: { energy: -30, knowledge: 15, mood: -20 }, result: 'Дотерпела до конца пары, потом упала спать. Всё успела, но болезнь затянулась.' },
      { text: '💊 Выпить жаропонижающее и идти', effect: { energy: -20, knowledge: 10, mood: -10 }, result: 'Работало до 12:00. Потом температура вернулась. Преподаватель заметил и отправил домой.' },
    ],
  },
]

export const MAP_LOCATIONS = [
  { id: 'dorm', name: 'Общежитие', emoji: '🏠', x: 30, y: 60, desc: 'Твой дом. Здесь твоя комната.', unlocked: true },
  { id: 'university', name: 'Медицинский университет', emoji: '🏛️', x: 55, y: 35, desc: 'Учёба, лекции, практика.', unlocked: true },
  { id: 'cafe', name: 'Кофейня «Паузa»', emoji: '☕', x: 40, y: 50, desc: 'Место встречи студентов.', unlocked: true },
  { id: 'ozon', name: 'ПВЗ Ozon', emoji: '📦', x: 65, y: 55, desc: 'Забери заказы.', unlocked: true },
  { id: 'park', name: 'Парк Победы', emoji: '🌳', x: 20, y: 40, desc: 'Погулять и отдохнуть.', unlocked: false },
  { id: 'clinic', name: 'Частная клиника', emoji: '🏥', x: 75, y: 25, desc: 'Подработка на ресепшен.', unlocked: false },
  { id: 'supermarket', name: 'Супермаркет', emoji: '🛒', x: 50, y: 70, desc: 'Купить еду.', unlocked: false },
  { id: 'library', name: 'Библиотека', emoji: '📚', x: 60, y: 45, desc: 'Учиться тихо и продуктивно.', unlocked: false },
  { id: 'metro', name: 'Метро', emoji: '🚇', x: 35, y: 75, desc: 'Добраться в любую точку города.', unlocked: false },
  { id: 'mall', name: 'ТЦ «Галерея»', emoji: '🏬', x: 80, y: 65, desc: 'Магазины и развлечения.', unlocked: false },
]
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
  {
    id: 'lecture_skip',
    title: 'Утро понедельника',
    description: 'Звенит будильник в 7:00. Первая пара — анатомия. Профессор Петров очень строгий. Идёшь?',
    choices: [
      { text: 'Идти на пару', effect: { energy: -15, knowledge: 20, mood: -5 }, result: 'Ты записала весь материал. Профессор похвалил тебя у доски!' },
      { text: 'Ещё 5 минут...', effect: { energy: 10, knowledge: -5, mood: -20 }, result: 'Проспала. Однокурсники скинули фото конспекта, но осадок остался.' },
    ],
  },
  {
    id: 'friend_party',
    title: 'Пятница вечером',
    description: 'Катя зовёт на вечеринку в общаге. Завтра коллоквиум по физиологии.',
    choices: [
      { text: 'Пойти на вечеринку', effect: { mood: 30, socialRating: 20, knowledge: -10, energy: -20 }, result: 'Познакомилась с Антоном с 3-го курса. Коллоквиум сдала на 3.' },
      { text: 'Остаться учить', effect: { knowledge: 25, mood: -10, energy: -10 }, result: 'Сдала коллоквиум на 5! Катя немного обиделась.' },
      { text: 'Позвать Катю учить вместе', effect: { knowledge: 15, mood: 15, socialRating: 10 }, result: 'Учились вместе до полуночи. Обе сдали хорошо!' },
    ],
  },
  {
    id: 'work_offer',
    title: 'Объявление на доске',
    description: 'На кафедре висит объявление: требуется помощник на ресепшен в частной клинике. 4 часа в день, хорошая оплата.',
    choices: [
      { text: 'Откликнуться', effect: { money: 200, energy: -15, socialRating: 15 }, result: 'Тебя взяли! Первый рабочий день — завтра в 16:00.' },
      { text: 'Пока не готова', effect: { energy: 5 }, result: 'Решила сосредоточиться на учёбе. Объявление ещё висит.' },
    ],
  },
  {
    id: 'relationship_start',
    title: 'В кофейне',
    description: 'Антон снова здесь. Он смотрит на тебя и улыбается. Подходит: "Можно составлю компанию?"',
    choices: [
      { text: 'Конечно!', effect: { mood: 30, socialRating: 10 }, result: 'Вы проговорили 2 часа. Он взял твой номер 💫' },
      { text: 'Извини, жду подругу', effect: { mood: -5 }, result: 'Он кивнул и ушёл. Может, в другой раз.' },
    ],
  },
  {
    id: 'exam_stress',
    title: 'Сессия',
    description: 'До экзамена по биохимии 2 дня. Ты устала. Энергии почти нет.',
    choices: [
      { text: 'Зубрить всю ночь', effect: { knowledge: 30, energy: -40, mood: -20 }, result: 'Сдала! Но после экзамена проспала 12 часов.' },
      { text: 'Разбить на части и выспаться', effect: { knowledge: 20, energy: -10, mood: 10 }, result: 'Сбалансированный подход сработал. Сдала на 4.' },
      { text: 'Попросить Аню объяснить', effect: { knowledge: 25, socialRating: 15, energy: -10 }, result: 'Аня — лучший преподаватель! Сдала отлично и подружились ещё больше.' },
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
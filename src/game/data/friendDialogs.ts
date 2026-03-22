export interface Message {
  from: 'friend' | 'me'
  text: string
  time?: string
}

export interface FriendChat {
  friendId: string
  messages: Message[]
  replies: { text: string; effect: { mood?: number; socialRating?: number } }[]
}

export const FRIEND_DIALOGS: Record<string, FriendChat[]> = {
  katya: [
    {
      friendId: 'katya',
      messages: [
        { from: 'friend', text: 'Привет!! Ты уже сделала задание по анатомии? 😭', time: '20:14' },
        { from: 'friend', text: 'Я вообще не понимаю эту тему с венами', time: '20:14' },
      ],
      replies: [
        { text: '😅 Нет, тоже в процессе... можем вместе?', effect: { socialRating: 10, mood: 5 } },
        { text: '✅ Да, почти готова! Могу объяснить', effect: { socialRating: 15, mood: 10 } },
        { text: '🙈 Ой, я тоже забыла про него...', effect: { mood: -5 } },
      ],
    },
    {
      friendId: 'katya',
      messages: [
        { from: 'friend', text: 'СЛУШАЙ!!! Петров объявил перенос экзамена на неделю вперёд', time: '09:02' },
        { from: 'friend', text: '😱😱😱 ты уже знала???', time: '09:02' },
      ],
      replies: [
        { text: '😱 КОГДА?! Он серьёзно??', effect: { mood: -10 } },
        { text: '😤 Да знала, уже учу с вечера', effect: { socialRating: 5, mood: 5 } },
        { text: '😅 Нет... это конец', effect: { mood: -15 } },
      ],
    },
    {
      friendId: 'katya',
      messages: [
        { from: 'friend', text: 'Я сегодня приготовила борщ!! Хочешь зайти?', time: '18:30' },
        { from: 'friend', text: 'Ещё пирожки есть 🥟', time: '18:31' },
      ],
      replies: [
        { text: '🏃 Уже бегу!! Спасибо!', effect: { mood: 25, socialRating: 15 } },
        { text: '😢 Не могу, учу. Но спасибо!', effect: { mood: 5 } },
        { text: '🍽️ Пирожки? Через 10 минут буду!', effect: { mood: 20, socialRating: 10 } },
      ],
    },
    {
      friendId: 'katya',
      messages: [
        { from: 'friend', text: 'Слушай, я подала заявку на волонтёрство в больнице', time: '16:45' },
        { from: 'friend', text: 'Там нужны ещё люди! Не хочешь со мной? Это опыт реальный', time: '16:46' },
      ],
      replies: [
        { text: '🏥 Да! Это же классный опыт, запишусь!', effect: { socialRating: 20, mood: 15 } },
        { text: '🤔 Расскажи подробнее, я подумаю', effect: { socialRating: 5 } },
        { text: '😥 Хотела бы, но времени нет совсем', effect: { mood: -5 } },
      ],
    },
    {
      friendId: 'katya',
      messages: [
        { from: 'friend', text: 'Ты не видела мой синий маркер?', time: '11:20' },
        { from: 'friend', text: 'Я его везде ищу уже час', time: '11:22' },
      ],
      replies: [
        { text: '😬 Кажется я брала... сейчас принесу!', effect: { socialRating: 10 } },
        { text: '🔍 Не видела, но помогу поискать', effect: { socialRating: 8 } },
        { text: '🤷 Нет, не видела', effect: {} },
      ],
    },
  ],

  dima: [
    {
      friendId: 'dima',
      messages: [
        { from: 'friend', text: 'Эй, у тебя тихо? Я слышу как ты ходишь и не могу работать 😅', time: '23:10' },
      ],
      replies: [
        { text: '😂 Прости! Хожу на цыпочках', effect: { socialRating: 10, mood: 10 } },
        { text: '🙄 Серьёзно?? Это 11 вечера, я же тихо...', effect: { socialRating: -5 } },
        { text: '😊 Ой, извини! Уже сплю', effect: { socialRating: 5 } },
      ],
    },
    {
      friendId: 'dima',
      messages: [
        { from: 'friend', text: 'Привет, поможешь разобраться с чем-то?', time: '15:00' },
        { from: 'friend', text: 'Мне нужно объяснить как работает сердце для проекта', time: '15:01' },
      ],
      replies: [
        { text: '🫀 Конечно! Это моя любимая тема', effect: { socialRating: 15, knowledge: 5, mood: 10 } },
        { text: '📚 Могу скинуть ссылку на хорошую статью', effect: { socialRating: 8 } },
        { text: '😓 Сейчас немного занята, позже?', effect: {} },
      ],
    },
    {
      friendId: 'dima',
      messages: [
        { from: 'friend', text: 'Тут принесли пиццу на весь этаж, ты идёшь?', time: '19:45' },
        { from: 'friend', text: 'Комната 302, живём!', time: '19:46' },
      ],
      replies: [
        { text: '🍕 Иду! Спасибо что позвал!', effect: { mood: 20, socialRating: 15, energy: 10 } },
        { text: '😢 Не могу, доделываю реферат', effect: { mood: -5 } },
        { text: '🤔 А что там за пицца? :)', effect: { socialRating: 10, mood: 10 } },
      ],
    },
    {
      friendId: 'dima',
      messages: [
        { from: 'friend', text: 'Помнишь, ты помогала мне с биологией?', time: '12:30' },
        { from: 'friend', text: 'Сдал на 4! Спасибо огромное 🙏', time: '12:30' },
      ],
      replies: [
        { text: '🎉 Ура!! Я так рада за тебя!', effect: { mood: 20, socialRating: 10 } },
        { text: '👏 Молодец! Сам старался — это главное', effect: { socialRating: 10, mood: 10 } },
        { text: '😊 Всегда пожалуйста!', effect: { socialRating: 8 } },
      ],
    },
  ],

  anya: [
    {
      friendId: 'anya',
      messages: [
        { from: 'friend', text: 'Как дела с первым курсом? Помню себя — жуть 😄', time: '14:20' },
        { from: 'friend', text: 'Если что — обращайся. У меня все конспекты за 1-2 курс есть', time: '14:21' },
      ],
      replies: [
        { text: '🙏 Ты серьёзно?! Это спасение!', effect: { socialRating: 20, mood: 25, knowledge: 10 } },
        { text: '😊 Спасибо! Пока справляюсь, но запомню', effect: { socialRating: 10, mood: 10 } },
        { text: '😮 А там правда всё настолько сложно?', effect: { socialRating: 8, mood: 5 } },
      ],
    },
    {
      friendId: 'anya',
      messages: [
        { from: 'friend', text: 'Видела тебя сегодня на практике. Ты хорошо держалась!', time: '17:05' },
        { from: 'friend', text: 'Многие первокурсники выбегают 😅 Ты молодец', time: '17:06' },
      ],
      replies: [
        { text: '😂 Было страшно! Но держалась из последних сил', effect: { mood: 20, socialRating: 10 } },
        { text: '🫀 Спасибо! Мне казалось, что это заметно', effect: { socialRating: 15, mood: 15 } },
        { text: '💪 Я будущий врач — должна справляться!', effect: { socialRating: 10, mood: 10 } },
      ],
    },
    {
      friendId: 'anya',
      messages: [
        { from: 'friend', text: 'Слышала, что ты работаешь в клинике?', time: '20:00' },
        { from: 'friend', text: 'Это очень правильно. Опыт важнее пятёрок в зачётке', time: '20:01' },
      ],
      replies: [
        { text: '💼 Да! Ты сама когда-нибудь подрабатывала?', effect: { socialRating: 15, mood: 10 } },
        { text: '🤔 Ты думаешь? Я немного переживаю за учёбу', effect: { socialRating: 10, knowledge: 5 } },
        { text: '✨ Да, мне там очень нравится!', effect: { mood: 15 } },
      ],
    },
  ],
}

// Get next unread dialog for a friend
export function getNextDialog(friendId: string, usedIndexes: number[]): { dialog: FriendChat; index: number } | null {
  const dialogs = FRIEND_DIALOGS[friendId]
  if (!dialogs) return null
  for (let i = 0; i < dialogs.length; i++) {
    if (!usedIndexes.includes(i)) {
      return { dialog: dialogs[i], index: i }
    }
  }
  return null
}

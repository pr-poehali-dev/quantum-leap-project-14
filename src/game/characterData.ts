import type { SkinTone, HairColor, HairStyle, BodyShape, OutfitId, EyeColor, FaceShape } from './types'

export const SKIN_TONES: { id: SkinTone; label: string; color: string; faceColor: string }[] = [
  { id: 'light', label: 'Светлая', color: '#FDDBB4', faceColor: '#F9C89B' },
  { id: 'medium', label: 'Средняя', color: '#E8A87C', faceColor: '#D4956A' },
  { id: 'tan', label: 'Загорелая', color: '#C68642', faceColor: '#B5763A' },
  { id: 'dark', label: 'Тёмная', color: '#8D5524', faceColor: '#7A4520' },
  { id: 'deep', label: 'Глубокая', color: '#4A2912', faceColor: '#3D2010' },
]

export const HAIR_COLORS: { id: HairColor; label: string; color: string }[] = [
  { id: 'black', label: 'Чёрный', color: '#1a1a1a' },
  { id: 'brown', label: 'Каштановый', color: '#6B3A2A' },
  { id: 'blonde', label: 'Блонд', color: '#E8C97A' },
  { id: 'red', label: 'Рыжий', color: '#C0392B' },
  { id: 'gray', label: 'Серебро', color: '#A0A0A0' },
  { id: 'pink', label: 'Розовый', color: '#E91E8C' },
  { id: 'blue', label: 'Синий', color: '#1565C0' },
]

export const HAIR_STYLES: { id: HairStyle; label: string; emoji: string }[] = [
  { id: 'short', label: 'Короткие', emoji: '💇' },
  { id: 'ponytail', label: 'Хвостик', emoji: '🎀' },
  { id: 'long', label: 'Длинные', emoji: '💁' },
  { id: 'bun', label: 'Пучок', emoji: '🩰' },
  { id: 'curly', label: 'Кудрявые', emoji: '🌀' },
  { id: 'braids', label: 'Косы', emoji: '🧶' },
]

export const BODY_SHAPES: { id: BodyShape; label: string; desc: string }[] = [
  { id: 'slim', label: 'Стройная', desc: 'Хрупкое телосложение' },
  { id: 'average', label: 'Средняя', desc: 'Обычное телосложение' },
  { id: 'curvy', label: 'Пышная', desc: 'Округлые формы' },
  { id: 'athletic', label: 'Спортивная', desc: 'Подтянутое тело' },
]

export const EYE_COLORS: { id: EyeColor; label: string; color: string }[] = [
  { id: 'brown', label: 'Карие', color: '#6B3A2A' },
  { id: 'green', label: 'Зелёные', color: '#2E7D32' },
  { id: 'blue', label: 'Голубые', color: '#1565C0' },
  { id: 'gray', label: 'Серые', color: '#607D8B' },
  { id: 'hazel', label: 'Ореховые', color: '#795548' },
]

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: 'oval', label: 'Овальное' },
  { id: 'round', label: 'Круглое' },
  { id: 'heart', label: 'Сердечком' },
  { id: 'square', label: 'Квадратное' },
]

export const OUTFITS: { id: OutfitId; label: string; desc: string; colors: { top: string; bottom: string; accent: string }; emoji: string }[] = [
  {
    id: 'casual',
    label: 'Повседневный',
    desc: 'Джинсы и футболка',
    emoji: '👕',
    colors: { top: '#4FC3F7', bottom: '#1565C0', accent: '#ffffff' },
  },
  {
    id: 'scrubs',
    label: 'Мед. халат',
    desc: 'Для учёбы и практики',
    emoji: '🥼',
    colors: { top: '#ffffff', bottom: '#B3E5FC', accent: '#0288D1' },
  },
  {
    id: 'formal',
    label: 'Деловой',
    desc: 'Блузка и юбка',
    emoji: '👔',
    colors: { top: '#F8BBD9', bottom: '#333333', accent: '#E91E63' },
  },
  {
    id: 'sporty',
    label: 'Спортивный',
    desc: 'Леггинсы и худи',
    emoji: '🏃',
    colors: { top: '#CE93D8', bottom: '#4A148C', accent: '#E040FB' },
  },
  {
    id: 'cozy',
    label: 'Домашний',
    desc: 'Пижама и тапки',
    emoji: '🧸',
    colors: { top: '#FFCC80', bottom: '#FF7043', accent: '#FFB300' },
  },
  {
    id: 'party',
    label: 'Вечерний',
    desc: 'Платье для вечеринки',
    emoji: '✨',
    colors: { top: '#CE93D8', bottom: '#7B1FA2', accent: '#F06292' },
  },
]

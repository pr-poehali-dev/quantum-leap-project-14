export type GameScreen = 
  | 'menu'
  | 'room'
  | 'map'
  | 'shop'
  | 'university'
  | 'phone'
  | 'event'
  | 'pickup'
  | 'work'
  | 'relationship'
  | 'customize'

export type ItemCategory = 'furniture' | 'stationery' | 'clothes' | 'decor'

export type SkinTone = 'light' | 'medium' | 'tan' | 'dark' | 'deep'
export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'pink' | 'blue'
export type HairStyle = 'short' | 'ponytail' | 'long' | 'bun' | 'curly' | 'braids'
export type BodyShape = 'slim' | 'average' | 'curvy' | 'athletic'
export type OutfitId = 'casual' | 'scrubs' | 'formal' | 'sporty' | 'cozy' | 'party'
export type EyeColor = 'brown' | 'green' | 'blue' | 'gray' | 'hazel'
export type FaceShape = 'oval' | 'round' | 'heart' | 'square'

export interface CharacterAppearance {
  name: string
  skinTone: SkinTone
  hairColor: HairColor
  hairStyle: HairStyle
  bodyShape: BodyShape
  eyeColor: EyeColor
  faceShape: FaceShape
  currentOutfit: OutfitId
  unlockedOutfits: OutfitId[]
}

export interface RoomItem {
  id: string
  name: string
  emoji: string
  category: ItemCategory
  placed: boolean
  x?: number
  y?: number
}

export interface Friend {
  id: string
  name: string
  emoji: string
  relationship: number
  description: string
}

export interface Order {
  id: string
  item: RoomItem
  status: 'ordered' | 'ready' | 'picked'
  pickupLocation: string
}

export interface GameEvent {
  id: string
  title: string
  description: string
  choices: Choice[]
}

export interface Choice {
  text: string
  effect: Partial<GameStats>
  result: string
}

export interface GameStats {
  energy: number
  mood: number
  knowledge: number
  money: number
  socialRating: number
}

export interface GameState {
  screen: GameScreen
  day: number
  time: string
  stats: GameStats
  roomItems: RoomItem[]
  orders: Order[]
  friends: Friend[]
  currentEvent: GameEvent | null
  currentLocation: string
  hasRelationship: boolean
  partnerName: string
  workShifts: number
  unlockedLocations: string[]
  notifications: string[]
  character: CharacterAppearance
}

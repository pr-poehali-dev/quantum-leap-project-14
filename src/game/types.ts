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

export type ItemCategory = 'furniture' | 'stationery' | 'clothes' | 'decor'

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
}

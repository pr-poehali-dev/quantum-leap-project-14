import { useState, useCallback } from 'react'
import type { GameState, GameStats, RoomItem, CharacterAppearance, OutfitId } from './types'
import { INITIAL_STATE, SHOP_ITEMS, GAME_EVENTS, MAP_LOCATIONS } from './initialState'
import { MenuScreen } from './screens/MenuScreen'
import { HubScreen } from './screens/HubScreen'
import { RoomScreen } from './screens/RoomScreen'
import { MapScreen } from './screens/MapScreen'
import { ShopScreen } from './screens/ShopScreen'
import { PhoneScreen } from './screens/PhoneScreen'
import { EventScreen } from './screens/EventScreen'
import { ResultScreen } from './screens/ResultScreen'
import { CustomizeScreen } from './screens/CustomizeScreen'
import { WardrobeScreen } from './screens/WardrobeScreen'

type AppScreen = 'menu' | 'hub' | 'room' | 'map' | 'shop' | 'phone' | 'event' | 'result' | 'customize' | 'wardrobe'

export function Game() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const [screen, setScreen] = useState<AppScreen>('menu')
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [usedEvents, setUsedEvents] = useState<Set<string>>(new Set())
  const [resultData, setResultData] = useState<{ text: string; effects: Partial<GameStats> } | null>(null)
  const [prevScreen, setPrevScreen] = useState<AppScreen>('hub')

  const updateStats = useCallback((effects: Partial<GameStats>) => {
    setState(prev => ({
      ...prev,
      stats: {
        energy: Math.max(0, Math.min(100, prev.stats.energy + (effects.energy ?? 0))),
        mood: Math.max(0, Math.min(100, prev.stats.mood + (effects.mood ?? 0))),
        knowledge: Math.max(0, Math.min(100, prev.stats.knowledge + (effects.knowledge ?? 0))),
        money: Math.max(0, prev.stats.money + (effects.money ?? 0)),
        socialRating: Math.max(0, Math.min(100, prev.stats.socialRating + (effects.socialRating ?? 0))),
      },
    }))
  }, [])

  const handleStart = () => {
    if (isFirstTime) {
      setScreen('customize')
    } else {
      setScreen('hub')
    }
  }

  const handleSaveAppearance = (appearance: CharacterAppearance) => {
    setState(prev => ({ ...prev, character: appearance }))
    setIsFirstTime(false)
    setScreen('hub')
  }

  const handleChangeOutfit = (outfit: OutfitId) => {
    setState(prev => ({
      ...prev,
      character: { ...prev.character, currentOutfit: outfit },
    }))
  }

  const handleOpenCustomize = () => {
    setPrevScreen(screen)
    setScreen('customize')
  }

  const handlePlaceItem = (itemId: string, x: number, y: number) => {
    setState(prev => {
      const allItems = [
        ...prev.roomItems,
        ...prev.orders.filter(o => o.status === 'picked').map(o => o.item),
      ]
      const item = allItems.find(i => i.id === itemId)
      if (!item) return prev

      const existing = prev.roomItems.find(i => i.id === itemId)
      if (existing) {
        return {
          ...prev,
          roomItems: prev.roomItems.map(i =>
            i.id === itemId ? { ...i, placed: true, x, y } : i
          ),
        }
      }
      return {
        ...prev,
        roomItems: [...prev.roomItems, { ...item, placed: true, x, y }],
      }
    })
  }

  const handleOrder = (itemId: string, pickup: string) => {
    const shopItem = SHOP_ITEMS.find(i => i.id === itemId)
    if (!shopItem) return

    const newItem: RoomItem = { ...shopItem }

    // Unlock outfit if clothing item ordered
    const outfitMap: Record<string, OutfitId> = {
      scrubs: 'scrubs',
      hoodie: 'cozy',
      sneakers: 'sporty',
    }

    setState(prev => {
      const outfitToUnlock = outfitMap[itemId]
      const newOutfits = outfitToUnlock && !prev.character.unlockedOutfits.includes(outfitToUnlock)
        ? [...prev.character.unlockedOutfits, outfitToUnlock]
        : prev.character.unlockedOutfits

      return {
        ...prev,
        orders: [
          ...prev.orders,
          { id: `order_${Date.now()}`, item: newItem, status: 'ordered', pickupLocation: pickup },
        ],
        character: { ...prev.character, unlockedOutfits: newOutfits as OutfitId[] },
        notifications: [
          ...prev.notifications,
          `📦 Заказ «${shopItem.name}» оформлен! Будет в ${pickup} через 1 день.`,
        ],
      }
    })
  }

  const handleGoTo = (locationId: string) => {
    const loc = MAP_LOCATIONS.find(l => l.id === locationId)
    if (!loc) return

    setState(prev => {
      const newState = { ...prev, currentLocation: loc.name }
      const newUnlocked = [...prev.unlockedLocations]
      if (!newUnlocked.includes(loc.name)) newUnlocked.push(loc.name)

      if (loc.id === 'university' && !newUnlocked.includes('Парк Победы')) newUnlocked.push('Парк Победы')
      if (loc.id === 'cafe' && !newUnlocked.includes('Супермаркет')) newUnlocked.push('Супермаркет')
      if (loc.id === 'university' && !newUnlocked.includes('Библиотека')) newUnlocked.push('Библиотека')
      if (loc.id === 'park' && !newUnlocked.includes('ТЦ «Галерея»')) newUnlocked.push('ТЦ «Галерея»')
      if (loc.id === 'university' && !newUnlocked.includes('Частная клиника')) newUnlocked.push('Частная клиника')
      if (loc.id === 'cafe' && !newUnlocked.includes('Метро')) newUnlocked.push('Метро')
      newState.unlockedLocations = newUnlocked

      if (locationId === 'ozon') {
        const updatedOrders = prev.orders.map(o =>
          o.status === 'ready' ? { ...o, status: 'picked' as const } : o
        )
        const pickedCount = updatedOrders.filter(o => o.status === 'picked').length - prev.orders.filter(o => o.status === 'picked').length
        newState.orders = updatedOrders
        if (pickedCount > 0) {
          newState.notifications = [...prev.notifications, `✅ Получила ${pickedCount} посылку(и)! Расставь их в комнате.`]
        }
      }

      return newState
    })

    updateStats({ energy: -5 })
    setScreen('hub')
  }

  const handleTriggerEvent = () => {
    const available = GAME_EVENTS.filter(e => !usedEvents.has(e.id))
    if (available.length === 0) {
      setUsedEvents(new Set())
      return
    }
    const event = available[Math.floor(Math.random() * available.length)]
    setState(prev => ({ ...prev, currentEvent: event }))
    setScreen('event')
  }

  const handleChoice = (effects: Partial<GameStats>, result: string) => {
    const event = state.currentEvent
    if (event) {
      setUsedEvents(prev => new Set([...prev, event.id]))
      if (event.id === 'relationship_start' && effects.mood && effects.mood > 0) {
        setState(prev => ({ ...prev, hasRelationship: true, partnerName: 'Антон' }))
      }
    }
    updateStats(effects)
    setResultData({ text: result, effects })
    setScreen('result')
  }

  const handleNextDay = () => {
    setState(prev => {
      const updatedOrders = prev.orders.map(o =>
        o.status === 'ordered' ? { ...o, status: 'ready' as const } : o
      )
      const newReady = updatedOrders.filter(o => o.status === 'ready').length - prev.orders.filter(o => o.status === 'ready').length
      const newNotifications = newReady > 0
        ? [...prev.notifications.slice(-4), `📦 ${newReady} заказ(а) готов к получению в ПВЗ!`]
        : prev.notifications.slice(-4)

      return {
        ...prev,
        day: prev.day + 1,
        time: '08:00',
        orders: updatedOrders,
        notifications: newNotifications,
        stats: {
          ...prev.stats,
          energy: Math.min(100, prev.stats.energy + 40),
          mood: Math.min(100, prev.stats.mood + 10),
        },
      }
    })
  }

  if (screen === 'menu') {
    return <MenuScreen onStart={handleStart} state={state} />
  }

  if (screen === 'customize') {
    return (
      <CustomizeScreen
        appearance={state.character}
        onSave={handleSaveAppearance}
        isFirstTime={isFirstTime}
      />
    )
  }

  if (screen === 'wardrobe') {
    return (
      <WardrobeScreen
        appearance={state.character}
        onChangeOutfit={handleChangeOutfit}
        onCustomize={handleOpenCustomize}
        onBack={() => setScreen('hub')}
      />
    )
  }

  if (screen === 'hub') {
    return (
      <HubScreen
        state={state}
        onOpenRoom={() => setScreen('room')}
        onOpenMap={() => setScreen('map')}
        onOpenShop={() => setScreen('shop')}
        onOpenPhone={() => setScreen('phone')}
        onOpenWardrobe={() => setScreen('wardrobe')}
        onNextDay={handleNextDay}
        onTriggerEvent={handleTriggerEvent}
      />
    )
  }

  if (screen === 'room') {
    return (
      <RoomScreen
        state={state}
        onPlaceItem={handlePlaceItem}
        onBack={() => setScreen('hub')}
        onOpenShop={() => setScreen('shop')}
      />
    )
  }

  if (screen === 'map') {
    return <MapScreen state={state} onGoTo={handleGoTo} onBack={() => setScreen('hub')} />
  }

  if (screen === 'shop') {
    return <ShopScreen state={state} onOrder={handleOrder} onBack={() => setScreen('hub')} />
  }

  if (screen === 'phone') {
    return (
      <PhoneScreen
        state={state}
        onBack={() => setScreen('hub')}
        onOpenMap={() => setScreen('map')}
        onOpenShop={() => setScreen('shop')}
      />
    )
  }

  if (screen === 'event' && state.currentEvent) {
    return <EventScreen event={state.currentEvent} onChoice={handleChoice} />
  }

  if (screen === 'result' && resultData) {
    return <ResultScreen result={resultData.text} effects={resultData.effects} onContinue={() => setScreen('hub')} />
  }

  return <MenuScreen onStart={handleStart} state={state} />
}

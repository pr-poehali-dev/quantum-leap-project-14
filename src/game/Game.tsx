import { useState, useCallback } from 'react'
import type { GameState, GameStats, RoomItem } from './types'
import { INITIAL_STATE, SHOP_ITEMS, PICKUP_LOCATIONS, GAME_EVENTS, MAP_LOCATIONS } from './initialState'
import { MenuScreen } from './screens/MenuScreen'
import { HubScreen } from './screens/HubScreen'
import { RoomScreen } from './screens/RoomScreen'
import { MapScreen } from './screens/MapScreen'
import { ShopScreen } from './screens/ShopScreen'
import { PhoneScreen } from './screens/PhoneScreen'
import { EventScreen } from './screens/EventScreen'
import { ResultScreen } from './screens/ResultScreen'

type AppScreen = 'menu' | 'hub' | 'room' | 'map' | 'shop' | 'phone' | 'event' | 'result'

export function Game() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const [screen, setScreen] = useState<AppScreen>('menu')
  const [usedEvents, setUsedEvents] = useState<Set<string>>(new Set())
  const [resultData, setResultData] = useState<{ text: string; effects: Partial<GameStats> } | null>(null)

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
    if (state.day === 1 && screen === 'menu') {
      setState(prev => ({ ...prev, screen: 'hub' }))
    }
    setScreen('hub')
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
    setState(prev => ({
      ...prev,
      orders: [
        ...prev.orders,
        {
          id: `order_${Date.now()}`,
          item: newItem,
          status: 'ordered',
          pickupLocation: pickup,
        },
      ],
      notifications: [
        ...prev.notifications,
        `📦 Заказ «${shopItem.name}» оформлен! Будет в ${pickup} через 1 день.`,
      ],
    }))
  }

  const handleGoTo = (locationId: string) => {
    const loc = MAP_LOCATIONS.find(l => l.id === locationId)
    if (!loc) return

    const isPickup = ['ozon', 'post', 'wildberries', 'cdek'].includes(locationId) || locationId === 'ozon'

    setState(prev => {
      const newState = { ...prev, currentLocation: loc.name }

      // Unlock adjacent locations
      const newUnlocked = [...prev.unlockedLocations]
      if (!newUnlocked.includes(loc.name)) newUnlocked.push(loc.name)

      // Unlock park/clinic/supermarket after visiting university/cafe
      if (loc.id === 'university' && !newUnlocked.includes('Парк Победы')) newUnlocked.push('Парк Победы')
      if (loc.id === 'cafe' && !newUnlocked.includes('Супермаркет')) newUnlocked.push('Супермаркет')
      if (loc.id === 'university' && !newUnlocked.includes('Библиотека')) newUnlocked.push('Библиотека')
      if (loc.id === 'park' && !newUnlocked.includes('ТЦ «Галерея»')) newUnlocked.push('ТЦ «Галерея»')
      if (loc.id === 'university' && !newUnlocked.includes('Частная клиника')) newUnlocked.push('Частная клиника')
      if (loc.id === 'cafe' && !newUnlocked.includes('Метро')) newUnlocked.push('Метро')

      newState.unlockedLocations = newUnlocked

      // Pickup orders at PVZ
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

    // Energy cost of travel
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
      // Special: relationship event
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
      // Advance orders: ordered → ready
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

  if (screen === 'hub') {
    return (
      <HubScreen
        state={state}
        onOpenRoom={() => setScreen('room')}
        onOpenMap={() => setScreen('map')}
        onOpenShop={() => setScreen('shop')}
        onOpenPhone={() => setScreen('phone')}
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
    return (
      <MapScreen
        state={state}
        onGoTo={handleGoTo}
        onBack={() => setScreen('hub')}
      />
    )
  }

  if (screen === 'shop') {
    return (
      <ShopScreen
        state={state}
        onOrder={handleOrder}
        onBack={() => setScreen('hub')}
      />
    )
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
    return (
      <EventScreen
        event={state.currentEvent}
        onChoice={handleChoice}
      />
    )
  }

  if (screen === 'result' && resultData) {
    return (
      <ResultScreen
        result={resultData.text}
        effects={resultData.effects}
        onContinue={() => setScreen('hub')}
      />
    )
  }

  return <MenuScreen onStart={handleStart} state={state} />
}

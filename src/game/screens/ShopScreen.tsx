import { useState } from 'react'
import { SHOP_ITEMS, PICKUP_LOCATIONS } from '../initialState'
import type { GameState } from '../types'

interface Props {
  state: GameState
  onOrder: (itemId: string, pickup: string) => void
  onBack: () => void
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Всё',
  furniture: '🛋️ Мебель',
  stationery: '✏️ Канцелярия',
  clothes: '👗 Одежда',
  decor: '🖼️ Декор',
}

export function ShopScreen({ state, onOrder, onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPickup, setSelectedPickup] = useState(PICKUP_LOCATIONS[0])
  const [ordered, setOrdered] = useState<Set<string>>(new Set())

  const alreadyOrdered = new Set(state.orders.map(o => o.item.id))

  const filtered = SHOP_ITEMS.filter(item =>
    activeCategory === 'all' || item.category === activeCategory
  )

  const handleOrder = (itemId: string) => {
    onOrder(itemId, selectedPickup)
    setOrdered(prev => new Set([...prev, itemId]))
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#0a1628] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button onClick={onBack} className="font-mono text-sm text-white/60 hover:text-white transition-colors">← Назад</button>
        <div className="text-center">
          <p className="font-sans text-sm font-semibold">🛍️ Интернет-магазин</p>
          <p className="font-mono text-xs text-green-400">Бесплатная доставка ✓</p>
        </div>
        <div className="font-mono text-xs text-white/60">{state.orders.length} заказов</div>
      </div>

      {/* Pickup selector */}
      <div className="border-b border-white/10 px-4 py-2">
        <p className="mb-1.5 font-mono text-xs text-white/50">Пункт выдачи:</p>
        <div className="flex gap-2 flex-wrap">
          {PICKUP_LOCATIONS.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedPickup(loc)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                selectedPickup === loc
                  ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                  : 'border-white/20 text-white/60 hover:border-white/40'
              }`}
            >
              📦 {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-2">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs transition-all ${
              activeCategory === key
                ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                : 'border-white/20 text-white/60 hover:border-white/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(item => {
            const isOrdered = alreadyOrdered.has(item.id) || ordered.has(item.id)
            return (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-2 flex h-16 items-center justify-center rounded-xl bg-white/5 text-4xl">
                  {item.emoji}
                </div>
                <p className="mb-0.5 font-sans text-sm font-medium leading-tight">{item.name}</p>
                <p className="mb-3 font-mono text-xs text-green-400">Бесплатно</p>
                <button
                  onClick={() => !isOrdered && handleOrder(item.id)}
                  disabled={isOrdered}
                  className={`w-full rounded-xl py-2 font-mono text-xs font-semibold transition-all ${
                    isOrdered
                      ? 'bg-green-900/40 text-green-400 cursor-default'
                      : 'bg-purple-600 text-white hover:bg-purple-500 active:scale-95'
                  }`}
                >
                  {isOrdered ? '✓ Заказано' : 'Заказать'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Orders banner */}
      {state.orders.length > 0 && (
        <div className="border-t border-white/10 bg-blue-900/20 px-4 py-3">
          <p className="font-mono text-xs text-blue-300">
            📦 {state.orders.filter(o => o.status === 'ready').length} заказ(ов) готово к получению → зайди в ПВЗ на карте
          </p>
        </div>
      )}
    </div>
  )
}

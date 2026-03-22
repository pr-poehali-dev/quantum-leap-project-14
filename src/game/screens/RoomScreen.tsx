import { useState } from 'react'
import type { GameState, RoomItem } from '../types'

interface Props {
  state: GameState
  onPlaceItem: (itemId: string, x: number, y: number) => void
  onBack: () => void
  onOpenShop: () => void
}

const GRID_COLS = 6
const GRID_ROWS = 5

export function RoomScreen({ state, onPlaceItem, onBack, onOpenShop }: Props) {
  const [selected, setSelected] = useState<RoomItem | null>(null)

  const placedItems = state.roomItems.filter(i => i.placed)
  const unplacedItems = state.roomItems.filter(i => !i.placed)
  const ordersReadyToPlace = state.orders
    .filter(o => o.status === 'picked')
    .map(o => o.item)
    .filter(item => !state.roomItems.find(ri => ri.id === item.id)?.placed)

  const allAvailable = [...unplacedItems, ...ordersReadyToPlace.filter(i => !unplacedItems.find(u => u.id === i.id))]

  const handleCellClick = (col: number, row: number) => {
    if (!selected) return
    onPlaceItem(selected.id, col, row)
    setSelected(null)
  }

  const itemAt = (col: number, row: number) =>
    placedItems.find(i => i.x === col && i.y === row)

  const completionPct = Math.round((placedItems.length / Math.max(state.roomItems.length, 1)) * 100)

  return (
    <div className="flex h-screen w-full flex-col bg-[#1a0a2e] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button onClick={onBack} className="font-mono text-sm text-white/60 hover:text-white transition-colors">← Назад</button>
        <div className="text-center">
          <p className="font-sans text-sm font-semibold">🛏️ Моя комната</p>
          <p className="font-mono text-xs text-white/50">Обустроено {completionPct}%</p>
        </div>
        <button
          onClick={onOpenShop}
          className="rounded-full bg-purple-600/80 px-3 py-1.5 font-mono text-xs text-white hover:bg-purple-500 transition-colors"
        >
          🛍️ Заказать
        </button>
      </div>

      {/* Room grid */}
      <div className="flex-1 p-3 overflow-auto">
        <div
          className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-b from-purple-900/30 to-indigo-900/20 p-2"
          style={{ aspectRatio: `${GRID_COLS}/${GRID_ROWS}` }}
        >
          <div
            className="grid h-full w-full gap-1"
            style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)` }}
          >
            {Array.from({ length: GRID_ROWS }).map((_, row) =>
              Array.from({ length: GRID_COLS }).map((_, col) => {
                const item = itemAt(col, row)
                return (
                  <div
                    key={`${col}-${row}`}
                    onClick={() => handleCellClick(col, row)}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border text-xl transition-all duration-200 ${
                      item
                        ? 'border-white/20 bg-white/10'
                        : selected
                        ? 'border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20'
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {item ? <span title={item.name}>{item.emoji}</span> : null}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Instructions */}
        {selected && (
          <div className="mt-3 text-center">
            <p className="font-mono text-sm text-purple-300 animate-pulse">
              Выбери клетку для «{selected.name}» {selected.emoji}
            </p>
          </div>
        )}
      </div>

      {/* Inventory */}
      <div className="border-t border-white/10 px-4 pb-4 pt-3">
        <p className="mb-2 font-mono text-xs text-white/50">Предметы в наличии — выбери и размести</p>
        {allAvailable.length === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-2xl">📭</span>
            <p className="font-mono text-sm text-white/60">
              Нет предметов. Закажи в интернет-магазине!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allAvailable.map(item => (
              <button
                key={item.id}
                onClick={() => setSelected(selected?.id === item.id ? null : item)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-sm transition-all duration-200 ${
                  selected?.id === item.id
                    ? 'border-purple-400 bg-purple-500/30 text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

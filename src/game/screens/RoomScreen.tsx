import { useState } from 'react'
import type { GameState, RoomItem } from '../types'

interface Props {
  state: GameState
  onPlaceItem: (itemId: string, x: number, y: number) => void
  onBack: () => void
  onOpenShop: () => void
}

// Isometric grid: 5 cols x 4 rows
const COLS = 5
const ROWS = 4

// Tile size in iso space
const TW = 72 // tile width
const TH = 36 // tile height (half of width for classic iso)

// Convert grid coords to screen coords (isometric projection)
function isoProject(col: number, row: number) {
  const x = (col - row) * (TW / 2)
  const y = (col + row) * (TH / 2)
  return { x, y }
}

// Canvas size
const CANVAS_W = (COLS + ROWS) * (TW / 2)
const CANVAS_H = (COLS + ROWS) * (TH / 2) + TH * 2

// Item visual config for isometric rendering
const ITEM_VISUALS: Record<string, { color: string; height: number; symbol: string; label: string }> = {
  bed:           { color: '#7C3AED', height: 28, symbol: '🛏️', label: 'Кровать' },
  desk:          { color: '#0369A1', height: 24, symbol: '🪑', label: 'Стол' },
  shelf:         { color: '#92400E', height: 40, symbol: '📚', label: 'Полка' },
  lamp:          { color: '#D97706', height: 36, symbol: '🪔', label: 'Лампа' },
  plant:         { color: '#15803D', height: 28, symbol: '🌿', label: 'Растение' },
  rug:           { color: '#DC2626', height: 4,  symbol: '🟥', label: 'Ковёр' },
  curtains:      { color: '#9333EA', height: 48, symbol: '🪟', label: 'Шторы' },
  mirror:        { color: '#0284C7', height: 44, symbol: '🪞', label: 'Зеркало' },
  notebook:      { color: '#16A34A', height: 8,  symbol: '📓', label: 'Тетради' },
  pens:          { color: '#CA8A04', height: 10, symbol: '✏️', label: 'Ручки' },
  anatomy_atlas: { color: '#B45309', height: 10, symbol: '📖', label: 'Атлас' },
  scrubs:        { color: '#FFFFFF', height: 14, symbol: '🥼', label: 'Халат' },
  sneakers:      { color: '#374151', height: 10, symbol: '👟', label: 'Кроссовки' },
  hoodie:        { color: '#6D28D9', height: 12, symbol: '👕', label: 'Худи' },
  poster:        { color: '#1D4ED8', height: 2,  symbol: '🖼️', label: 'Постер' },
  fairy_lights:  { color: '#F59E0B', height: 4,  symbol: '✨', label: 'Гирлянда' },
  wardrobe:      { color: '#78350F', height: 56, symbol: '🗄️', label: 'Шкаф' },
  chair:         { color: '#7C3AED', height: 24, symbol: '🪑', label: 'Кресло' },
}

// Draw one isometric tile as SVG paths
function IsoTile({
  col, row, selected, occupied, item, onClick, hoveredCell, setHoveredCell,
}: {
  col: number
  row: number
  selected: boolean
  occupied: boolean
  item: RoomItem | null
  onClick: () => void
  hoveredCell: string | null
  setHoveredCell: (k: string | null) => void
}) {
  const { x, y } = isoProject(col, row)
  const cx = x + CANVAS_W / 2
  const cy = y + TH

  const isHovered = hoveredCell === `${col}-${row}`

  // Diamond points for floor tile
  const pts = [
    `${cx},${cy}`,
    `${cx + TW / 2},${cy + TH / 2}`,
    `${cx},${cy + TH}`,
    `${cx - TW / 2},${cy + TH / 2}`,
  ].join(' ')

  const vis = item ? (ITEM_VISUALS[item.id] ?? { color: '#888', height: 20, symbol: item.emoji, label: item.name }) : null
  const h = vis?.height ?? 0

  // Top face
  const topPts = [
    `${cx},${cy - h}`,
    `${cx + TW / 2},${cy + TH / 2 - h}`,
    `${cx},${cy + TH - h}`,
    `${cx - TW / 2},${cy + TH / 2 - h}`,
  ].join(' ')

  // Left face
  const leftPts = [
    `${cx - TW / 2},${cy + TH / 2 - h}`,
    `${cx},${cy + TH - h}`,
    `${cx},${cy + TH}`,
    `${cx - TW / 2},${cy + TH / 2}`,
  ].join(' ')

  // Right face
  const rightPts = [
    `${cx + TW / 2},${cy + TH / 2 - h}`,
    `${cx},${cy + TH - h}`,
    `${cx},${cy + TH}`,
    `${cx + TW / 2},${cy + TH / 2}`,
  ].join(' ')

  const floorColor = selected
    ? (isHovered ? '#a78bfa' : '#7c3aed')
    : occupied
    ? '#312e81'
    : isHovered && !occupied
    ? '#4338ca'
    : '#1e1b4b'

  const floorStroke = selected ? '#c4b5fd' : occupied ? '#4338ca' : '#3730a3'

  return (
    <g
      onClick={onClick}
      onMouseEnter={() => setHoveredCell(`${col}-${row}`)}
      onMouseLeave={() => setHoveredCell(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Floor tile */}
      <polygon
        points={pts}
        fill={floorColor}
        stroke={floorStroke}
        strokeWidth="1"
        opacity={selected && !occupied ? 0.9 : 0.85}
      />

      {/* 3D block if item placed */}
      {vis && h > 0 && (
        <>
          {/* Left face (darker) */}
          <polygon
            points={leftPts}
            fill={vis.color}
            fillOpacity={0.55}
            stroke={vis.color}
            strokeWidth="0.5"
            strokeOpacity={0.3}
          />
          {/* Right face (medium) */}
          <polygon
            points={rightPts}
            fill={vis.color}
            fillOpacity={0.75}
            stroke={vis.color}
            strokeWidth="0.5"
            strokeOpacity={0.3}
          />
          {/* Top face (lightest) */}
          <polygon
            points={topPts}
            fill={vis.color}
            fillOpacity={0.95}
            stroke={vis.color}
            strokeWidth="0.5"
            strokeOpacity={0.4}
          />
          {/* Emoji label on top */}
          <text
            x={cx}
            y={cy + TH / 2 - h + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={h > 20 ? 16 : 11}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {vis.symbol}
          </text>
        </>
      )}

      {/* Highlight pulse when selected & empty */}
      {selected && !occupied && isHovered && (
        <polygon points={pts} fill="white" fillOpacity={0.15} stroke="none" />
      )}
    </g>
  )
}

export function RoomScreen({ state, onPlaceItem, onBack, onOpenShop }: Props) {
  const [selected, setSelected] = useState<RoomItem | null>(null)
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  const placedItems = state.roomItems.filter(i => i.placed)
  const unplacedItems = state.roomItems.filter(i => !i.placed)
  const pickedOrderItems = state.orders
    .filter(o => o.status === 'picked')
    .map(o => o.item)
    .filter(item => !state.roomItems.find(ri => ri.id === item.id)?.placed)

  const allAvailable = [
    ...unplacedItems,
    ...pickedOrderItems.filter(i => !unplacedItems.find(u => u.id === i.id)),
  ]

  const itemAt = (col: number, row: number) =>
    placedItems.find(i => i.x === col && i.y === row) ?? null

  const handleCellClick = (col: number, row: number) => {
    if (!selected) return
    if (itemAt(col, row)) return
    onPlaceItem(selected.id, col, row)
    setSelected(null)
  }

  const completionPct = Math.round((placedItems.length / Math.max(state.roomItems.length, 1)) * 100)

  // Sort tiles back-to-front for correct iso rendering (painter's algorithm)
  const tiles: [number, number][] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      tiles.push([col, row])
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#0d0a1e] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 shrink-0">
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

      {/* ISO Room */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center">
        {/* Room walls */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${CANVAS_W + TW} ${CANVAS_H + TH}`}
          preserveAspectRatio="xMidYMid meet"
          className="select-none"
        >
          {/* Back wall left */}
          <polygon
            points={`
              ${CANVAS_W / 2 + TW / 2 - TW * COLS / 2},${TH + (COLS - 1) * TH / 2 - 80}
              ${CANVAS_W / 2 + TW / 2 - TW * COLS / 2},${TH + (COLS - 1) * TH / 2}
              ${CANVAS_W / 2 + TW / 2},${TH}
              ${CANVAS_W / 2 + TW / 2},${TH - 80}
            `}
            fill="#1a1040"
            stroke="#2d1f6e"
            strokeWidth="1"
          />
          {/* Back wall right */}
          <polygon
            points={`
              ${CANVAS_W / 2 + TW / 2},${TH - 80}
              ${CANVAS_W / 2 + TW / 2},${TH}
              ${CANVAS_W / 2 + TW / 2 + TW * ROWS / 2},${TH + (ROWS - 1) * TH / 2}
              ${CANVAS_W / 2 + TW / 2 + TW * ROWS / 2},${TH + (ROWS - 1) * TH / 2 - 80}
            `}
            fill="#160d38"
            stroke="#2d1f6e"
            strokeWidth="1"
          />
          {/* Floor border glow */}
          <defs>
            <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0d0a1e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx={CANVAS_W / 2 + TW / 2}
            cy={CANVAS_H / 2 + TH}
            rx={CANVAS_W / 2}
            ry={CANVAS_H / 3}
            fill="url(#floorGlow)"
          />

          {/* Tiles (back to front) */}
          {tiles.map(([col, row]) => (
            <IsoTile
              key={`${col}-${row}`}
              col={col}
              row={row}
              selected={!!selected}
              occupied={!!itemAt(col, row)}
              item={itemAt(col, row)}
              onClick={() => handleCellClick(col, row)}
              hoveredCell={hoveredCell}
              setHoveredCell={setHoveredCell}
            />
          ))}
        </svg>

        {/* Placement hint overlay */}
        {selected && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full border border-purple-400/50 bg-purple-900/80 px-4 py-1.5 backdrop-blur-sm">
            <p className="font-mono text-xs text-purple-200 animate-pulse">
              {selected.emoji} Кликни на ячейку для «{selected.name}»
            </p>
          </div>
        )}

        {/* Cancel button */}
        {selected && (
          <button
            onClick={() => setSelected(null)}
            className="absolute top-12 right-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-xs text-white/70 hover:text-white"
          >
            ✕ Отмена
          </button>
        )}
      </div>

      {/* Inventory */}
      <div className="shrink-0 border-t border-white/10 px-4 pb-4 pt-3">
        <p className="mb-2 font-mono text-xs text-white/40">
          {allAvailable.length > 0 ? 'Выбери предмет → кликни на ячейку в комнате' : 'Все предметы расставлены или закажи новые'}
        </p>
        {allAvailable.length === 0 ? (
          <button
            onClick={onOpenShop}
            className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/8 transition-colors"
          >
            <span className="text-2xl">🛍️</span>
            <p className="font-mono text-sm text-white/60">Перейти в интернет-магазин и заказать мебель</p>
          </button>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allAvailable.map(item => {
              const vis = ITEM_VISUALS[item.id]
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(selected?.id === item.id ? null : item)}
                  className={`shrink-0 flex flex-col items-center gap-1 rounded-2xl border px-3 py-2.5 transition-all duration-200 ${
                    selected?.id === item.id
                      ? 'border-purple-400 bg-purple-500/30 scale-105'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {vis && (
                    <div
                      className="h-5 w-8 rounded-sm"
                      style={{ background: vis.color, opacity: 0.85 }}
                    />
                  )}
                  <span className="text-base">{item.emoji}</span>
                  <span className="font-mono text-[10px] text-white/60 whitespace-nowrap">
                    {ITEM_VISUALS[item.id]?.label ?? item.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

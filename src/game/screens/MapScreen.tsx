import { MAP_LOCATIONS } from '../initialState'
import type { GameState } from '../types'

interface Props {
  state: GameState
  onGoTo: (locationId: string) => void
  onBack: () => void
}

export function MapScreen({ state, onGoTo, onBack }: Props) {
  const hasReadyOrders = state.orders.some(o => o.status === 'ready')

  return (
    <div className="flex h-screen w-full flex-col bg-[#0f1b2d] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button onClick={onBack} className="font-mono text-sm text-white/60 hover:text-white transition-colors">← Назад</button>
        <div className="text-center">
          <p className="font-sans text-sm font-semibold">🗺️ Карта города</p>
          <p className="font-mono text-xs text-white/50">День {state.day} · {state.time}</p>
        </div>
        <div className="font-mono text-xs text-green-400">📍 {state.currentLocation}</div>
      </div>

      {/* Map */}
      <div className="relative flex-1 overflow-hidden p-4">
        {/* Map background */}
        <div className="relative h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Roads */}
          <div className="absolute inset-0">
            <svg className="h-full w-full opacity-20">
              <line x1="35%" y1="0" x2="35%" y2="100%" stroke="white" strokeWidth="3" />
              <line x1="0" y1="60%" x2="100%" y2="60%" stroke="white" strokeWidth="3" />
              <line x1="55%" y1="0" x2="55%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="8,4" />
              <line x1="0" y1="40%" x2="100%" y2="40%" stroke="white" strokeWidth="2" strokeDasharray="8,4" />
            </svg>
          </div>

          {/* Locations */}
          {MAP_LOCATIONS.map(loc => {
            const isUnlocked = state.unlockedLocations.includes(loc.name) || loc.unlocked
            const isCurrent = state.currentLocation === loc.name
            const hasOrder = hasReadyOrders && (loc.id === 'ozon')

            return (
              <button
                key={loc.id}
                onClick={() => isUnlocked && onGoTo(loc.id)}
                className={`absolute flex flex-col items-center gap-0.5 transition-all duration-300 ${
                  isCurrent ? 'scale-125 z-20' : isUnlocked ? 'hover:scale-110 z-10' : 'opacity-40 cursor-not-allowed z-10'
                }`}
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
                title={isUnlocked ? loc.desc : '🔒 Пока недоступно'}
              >
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg shadow-lg backdrop-blur-sm ${
                  isCurrent
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : isUnlocked
                    ? 'border-blue-400/60 bg-blue-900/40 hover:border-blue-300'
                    : 'border-gray-600 bg-gray-800/40'
                }`}>
                  {loc.emoji}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 border-2 border-slate-900 animate-pulse" />
                  )}
                  {hasOrder && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-slate-900 animate-bounce" />
                  )}
                </div>
                <span className={`whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[9px] backdrop-blur-sm ${
                  isCurrent ? 'bg-yellow-400/20 text-yellow-300' : 'bg-slate-900/70 text-white/80'
                }`}>
                  {isUnlocked ? loc.name : '🔒'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex gap-4 text-xs font-mono text-white/50">
          <span>🟡 Ты здесь</span>
          <span>🔵 Доступно</span>
          <span>🔒 Исследуй город</span>
          {hasReadyOrders && <span className="text-red-400 animate-pulse">🔴 Есть посылки!</span>}
        </div>
      </div>
    </div>
  )
}

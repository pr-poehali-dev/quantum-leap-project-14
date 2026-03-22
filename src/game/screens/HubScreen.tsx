import type { GameState } from '../types'
import { GrainOverlay } from '@/components/grain-overlay'
import { CharacterSVG } from '../components/CharacterSVG'

interface Props {
  state: GameState
  onOpenRoom: () => void
  onOpenMap: () => void
  onOpenShop: () => void
  onOpenPhone: () => void
  onOpenWardrobe: () => void
  onNextDay: () => void
  onTriggerEvent: () => void
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="font-mono text-xs text-white/50">{label}</span>
        <span className="font-mono text-xs text-white/70">{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

export function HubScreen({ state, onOpenRoom, onOpenMap, onOpenShop, onOpenPhone, onOpenWardrobe, onNextDay, onTriggerEvent }: Props) {
  const placedCount = state.roomItems.filter(i => i.placed).length
  const totalItems = state.roomItems.length
  const readyOrders = state.orders.filter(o => o.status === 'ready').length

  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-b from-[#1a0a2e] via-[#0f1b2d] to-[#0a0f1e] text-white overflow-hidden">
      <GrainOverlay />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="font-sans text-sm font-semibold">День {state.day}</p>
          <p className="font-mono text-xs text-white/50">{state.time} · {state.currentLocation}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-green-400">💰 {state.stats.money}₽</span>
          {readyOrders > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 font-mono text-xs text-white animate-pulse">
              📦 {readyOrders}
            </span>
          )}
        </div>
      </div>

      {/* Character + Stats row */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3">
        <button
          onClick={onOpenWardrobe}
          className="group relative shrink-0"
          title="Открыть гардероб"
        >
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-indigo-900/20 px-1 pt-1 pb-0">
            <CharacterSVG appearance={state.character} size={68} />
            <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors" />
            <div className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/80">
              👗
            </div>
          </div>
        </button>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-1.5">
            <p className="font-sans text-sm font-semibold">{state.character.name}</p>
            {state.hasRelationship && <span className="text-sm">💕</span>}
            <span className="font-mono text-xs text-white/40">медик, 1 курс</span>
          </div>
          <StatBar label="⚡ Энергия" value={state.stats.energy} color="bg-yellow-400" />
          <StatBar label="😊 Настроение" value={state.stats.mood} color="bg-pink-400" />
          <StatBar label="📚 Знания" value={state.stats.knowledge} color="bg-blue-400" />
          <StatBar label="🤝 Соц. рейтинг" value={state.stats.socialRating} color="bg-green-400" />
        </div>
      </div>

      {/* Last notification */}
      {state.notifications.length > 0 && (
        <div className="relative z-10 mx-4 mb-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="font-mono text-xs text-white/70 line-clamp-2">{state.notifications[state.notifications.length - 1]}</p>
          </div>
        </div>
      )}

      {/* Action grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 px-4 flex-1">
        {[
          {
            emoji: '🛏️',
            title: 'Моя комната',
            desc: `${placedCount}/${totalItems} предметов`,
            color: 'from-purple-900/40 to-purple-800/20',
            border: 'border-purple-500/30',
            action: onOpenRoom,
          },
          {
            emoji: '🗺️',
            title: 'Карта города',
            desc: `${state.unlockedLocations.length} мест открыто`,
            color: 'from-blue-900/40 to-blue-800/20',
            border: 'border-blue-500/30',
            action: onOpenMap,
          },
          {
            emoji: '🛍️',
            title: 'Интернет-магазин',
            desc: readyOrders > 0 ? `${readyOrders} готово к получению!` : 'Бесплатная доставка',
            color: 'from-emerald-900/40 to-emerald-800/20',
            border: readyOrders > 0 ? 'border-red-500/50' : 'border-emerald-500/30',
            action: onOpenShop,
          },
          {
            emoji: '📱',
            title: 'Телефон',
            desc: 'Карта, расписание, чаты',
            color: 'from-slate-800/60 to-slate-700/20',
            border: 'border-slate-500/30',
            action: onOpenPhone,
          },
        ].map(item => (
          <button
            key={item.title}
            onClick={item.action}
            className={`flex flex-col justify-between rounded-2xl border bg-gradient-to-br ${item.color} ${item.border} p-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
          >
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <p className="font-sans text-sm font-semibold text-white">{item.title}</p>
              <p className="font-mono text-xs text-white/50">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="relative z-10 flex gap-3 px-4 pb-5 pt-3">
        <button
          onClick={onTriggerEvent}
          className="flex-1 rounded-2xl border border-yellow-500/30 bg-yellow-900/20 py-3 font-sans text-sm font-medium text-yellow-300 transition-all hover:bg-yellow-900/30 active:scale-95"
        >
          ⭐ Событие дня
        </button>
        <button
          onClick={onNextDay}
          className="flex-1 rounded-2xl bg-purple-600/80 py-3 font-sans text-sm font-medium text-white transition-all hover:bg-purple-500 active:scale-95"
        >
          😴 Следующий день
        </button>
      </div>
    </div>
  )
}

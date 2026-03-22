import { useState } from 'react'
import type { GameState } from '../types'
import { MAP_LOCATIONS } from '../initialState'

interface Props {
  state: GameState
  onBack: () => void
  onOpenMap: () => void
  onOpenShop: () => void
}

type Tab = 'main' | 'map' | 'messages' | 'schedule'

export function PhoneScreen({ state, onBack, onOpenMap, onOpenShop }: Props) {
  const [tab, setTab] = useState<Tab>('main')

  const now = new Date()
  const timeStr = state.time
  const dateStr = `День ${state.day}`

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#111] overflow-hidden">
      {/* Back */}
      <button
        onClick={onBack}
        className="absolute left-4 top-4 font-mono text-sm text-white/40 hover:text-white transition-colors"
      >
        ← Положить телефон
      </button>

      {/* Phone frame */}
      <div className="relative h-[85vh] w-[340px] rounded-[40px] border-4 border-gray-700 bg-black shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-6 w-28 rounded-b-2xl bg-black" />

        {/* Screen */}
        <div className="h-full w-full overflow-hidden rounded-[36px] bg-gradient-to-b from-indigo-900 to-purple-950">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-8 pb-2">
            <span className="font-mono text-xs text-white/70">{timeStr}</span>
            <span className="font-mono text-xs text-white/70">{dateStr}</span>
          </div>

          {tab === 'main' && (
            <div className="px-4 py-2">
              {/* Lock screen style */}
              <div className="mb-6 text-center">
                <p className="font-sans text-4xl font-thin text-white">{timeStr}</p>
                <p className="font-mono text-sm text-white/60">{dateStr} • {state.currentLocation}</p>
              </div>

              {/* Notifications */}
              {state.notifications.length > 0 && (
                <div className="mb-4 space-y-2">
                  {state.notifications.slice(-3).map((n, i) => (
                    <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-sm px-4 py-3">
                      <p className="font-mono text-xs text-white/90">{n}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick apps */}
              <div className="grid grid-cols-4 gap-3 px-2 pt-2">
                {[
                  { emoji: '🗺️', label: 'Карта', action: () => setTab('map') },
                  { emoji: '🛍️', label: 'Магазин', action: onOpenShop },
                  { emoji: '💬', label: 'Чаты', action: () => setTab('messages') },
                  { emoji: '📅', label: 'Расписание', action: () => setTab('schedule') },
                ].map(app => (
                  <button
                    key={app.label}
                    onClick={app.action}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm hover:bg-white/25 transition-colors active:scale-90">
                      {app.emoji}
                    </div>
                    <span className="font-mono text-[10px] text-white/70">{app.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'map' && (
            <div className="px-4 py-2">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Карта города</p>
              </div>
              <div className="relative h-64 rounded-2xl border border-white/10 bg-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '28px 28px'
                  }}
                />
                {MAP_LOCATIONS.map(loc => {
                  const isUnlocked = state.unlockedLocations.includes(loc.name) || loc.unlocked
                  const isCurrent = state.currentLocation === loc.name
                  return (
                    <div
                      key={loc.id}
                      className={`absolute flex flex-col items-center ${isCurrent ? 'z-20' : 'z-10'}`}
                      style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)' }}
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
                        isCurrent ? 'border-yellow-400 bg-yellow-400/30' : isUnlocked ? 'border-blue-400/50 bg-blue-900/50' : 'border-gray-600/50 bg-gray-800/50 opacity-40'
                      }`}>
                        {loc.emoji}
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                onClick={onOpenMap}
                className="mt-3 w-full rounded-2xl bg-blue-600/80 py-3 font-mono text-sm text-white hover:bg-blue-500 transition-colors"
              >
                🗺️ Открыть полную карту
              </button>
            </div>
          )}

          {tab === 'messages' && (
            <div className="px-4 py-2">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Сообщения</p>
              </div>
              <div className="space-y-2">
                {state.friends.map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                    <span className="text-2xl">{friend.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium text-white">{friend.name}</p>
                      <p className="truncate font-mono text-xs text-white/50">{friend.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="h-1.5 w-12 rounded-full bg-white/20">
                        <div className="h-full rounded-full bg-pink-400" style={{ width: `${friend.relationship}%` }} />
                      </div>
                      <span className="font-mono text-[9px] text-white/40">{friend.relationship}%</span>
                    </div>
                  </div>
                ))}
                {state.hasRelationship && (
                  <div className="flex items-center gap-3 rounded-2xl bg-pink-900/30 border border-pink-500/30 px-4 py-3">
                    <span className="text-2xl">💕</span>
                    <div>
                      <p className="font-sans text-sm font-medium text-white">{state.partnerName}</p>
                      <p className="font-mono text-xs text-pink-300">Отношения</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'schedule' && (
            <div className="px-4 py-2">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Расписание</p>
              </div>
              <div className="space-y-2">
                {[
                  { time: '08:00', subject: 'Анатомия', room: '204', type: 'lecture' },
                  { time: '10:00', subject: 'Физиология', room: '118', type: 'practice' },
                  { time: '13:00', subject: 'Обед', room: 'Столовая', type: 'break' },
                  { time: '14:00', subject: 'Биохимия', room: '312', type: 'lecture' },
                  { time: '16:00', subject: 'Латинский язык', room: '105', type: 'seminar' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                    item.type === 'break' ? 'bg-green-900/20' : 'bg-white/8'
                  }`}>
                    <span className="font-mono text-xs text-white/50 w-10 shrink-0">{item.time}</span>
                    <div className="flex-1">
                      <p className="font-sans text-xs font-medium text-white">{item.subject}</p>
                      <p className="font-mono text-[10px] text-white/40">{item.room} · {
                        item.type === 'lecture' ? 'Лекция' :
                        item.type === 'practice' ? 'Практика' :
                        item.type === 'seminar' ? 'Семинар' : 'Перерыв'
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-purple-900/30 px-3 py-2">
                <p className="font-mono text-xs text-purple-300">📚 Знания: {state.stats.knowledge}/100</p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-purple-400" style={{ width: `${state.stats.knowledge}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  )
}

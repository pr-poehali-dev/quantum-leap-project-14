import { useState } from 'react'
import type { GameState, Friend } from '../types'
import { MAP_LOCATIONS } from '../initialState'
import { FRIEND_DIALOGS, getNextDialog } from '../data/friendDialogs'

interface Props {
  state: GameState
  onBack: () => void
  onOpenMap: () => void
  onOpenShop: () => void
  onOpenChat: (friend: Friend) => void
}

type Tab = 'main' | 'map' | 'messages' | 'schedule'

export function PhoneScreen({ state, onBack, onOpenMap, onOpenShop, onOpenChat }: Props) {
  const [tab, setTab] = useState<Tab>('main')

  const timeStr = state.time
  const dateStr = `День ${state.day}`

  // Unread badges: friends who have unread dialogs
  const friendsWithMessages = state.friends.filter(f => FRIEND_DIALOGS[f.id]?.length > 0)

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#111] overflow-hidden">
      <button
        onClick={onBack}
        className="absolute left-4 top-4 font-mono text-sm text-white/40 hover:text-white transition-colors z-10"
      >
        ← Положить телефон
      </button>

      {/* Phone frame */}
      <div className="relative h-[88vh] w-[320px] rounded-[44px] border-[5px] border-gray-700 bg-black shadow-2xl shadow-black/60 overflow-hidden">
        {/* Dynamic island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-7 w-24 rounded-full bg-black" />

        {/* Screen */}
        <div className="h-full w-full overflow-hidden rounded-[39px] bg-gradient-to-b from-[#1a0a2e] to-[#0f1124]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-10 pb-1">
            <span className="font-mono text-[11px] font-semibold text-white/80">{timeStr}</span>
            <div className="flex items-center gap-1 text-white/60">
              <span className="text-[10px]">●●●</span>
              <span className="text-[10px]">WiFi</span>
              <span className="text-[10px]">🔋</span>
            </div>
          </div>

          {/* ===== MAIN TAB ===== */}
          {tab === 'main' && (
            <div className="flex h-full flex-col px-4 pt-2 pb-10 overflow-y-auto">
              <div className="mb-5 text-center">
                <p className="font-sans text-5xl font-thin text-white tracking-tight">{timeStr}</p>
                <p className="font-mono text-xs text-white/50 mt-1">{dateStr} · {state.currentLocation}</p>
              </div>

              {/* Notifications */}
              {state.notifications.slice(-2).map((n, i) => (
                <div key={i} className="mb-2 flex gap-2 rounded-2xl bg-white/10 backdrop-blur-sm px-3 py-2.5">
                  <span className="text-base">📬</span>
                  <p className="font-mono text-xs text-white/85 leading-relaxed">{n}</p>
                </div>
              ))}

              {/* Stats mini */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                {[
                  { label: '⚡', value: state.stats.energy, color: 'bg-yellow-400' },
                  { label: '😊', value: state.stats.mood, color: 'bg-pink-400' },
                  { label: '📚', value: state.stats.knowledge, color: 'bg-blue-400' },
                  { label: '💰', value: null, text: `${state.stats.money}₽`, color: 'bg-green-400' },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl bg-white/8 px-3 py-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{s.label}</span>
                      <span className="font-mono text-xs text-white/60">{s.text ?? s.value}</span>
                    </div>
                    {s.value !== null && (
                      <div className="h-1 w-full rounded-full bg-white/15">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* App grid */}
              <div className="grid grid-cols-4 gap-3 px-1">
                {[
                  { emoji: '🗺️', label: 'Карта', action: () => setTab('map'), badge: false },
                  { emoji: '🛍️', label: 'Магазин', action: onOpenShop, badge: state.orders.filter(o => o.status === 'ready').length > 0 },
                  { emoji: '💬', label: 'Чаты', action: () => setTab('messages'), badge: friendsWithMessages.length > 0 },
                  { emoji: '📅', label: 'Пары', action: () => setTab('schedule'), badge: false },
                ].map(app => (
                  <button key={app.label} onClick={app.action} className="relative flex flex-col items-center gap-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-2xl backdrop-blur-sm hover:bg-white/20 transition-colors active:scale-90">
                      {app.emoji}
                    </div>
                    {app.badge && (
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border border-black" />
                    )}
                    <span className="font-mono text-[10px] text-white/60">{app.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== MAP TAB ===== */}
          {tab === 'map' && (
            <div className="px-4 py-2 overflow-y-auto h-full pb-16">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Карта города</p>
                <span className="ml-auto font-mono text-[10px] text-blue-400">📍 {state.currentLocation}</span>
              </div>
              <div className="relative h-56 rounded-2xl border border-white/10 bg-slate-800/80 overflow-hidden mb-3">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '22px 22px'
                  }}
                />
                {/* Roads */}
                <svg className="absolute inset-0 h-full w-full opacity-15">
                  <line x1="35%" y1="0" x2="35%" y2="100%" stroke="white" strokeWidth="2" />
                  <line x1="0" y1="60%" x2="100%" y2="60%" stroke="white" strokeWidth="2" />
                  <line x1="55%" y1="0" x2="55%" y2="100%" stroke="white" strokeWidth="1.5" strokeDasharray="6,3" />
                </svg>
                {MAP_LOCATIONS.map(loc => {
                  const isUnlocked = state.unlockedLocations.includes(loc.name) || loc.unlocked
                  const isCurrent = state.currentLocation === loc.name
                  return (
                    <div
                      key={loc.id}
                      className={`absolute flex flex-col items-center ${isCurrent ? 'z-20' : 'z-10'}`}
                      style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)' }}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs shadow ${
                        isCurrent ? 'border-yellow-400 bg-yellow-400/30 scale-125' : isUnlocked ? 'border-blue-400/60 bg-blue-900/50' : 'border-gray-600/40 bg-gray-800/40 opacity-35'
                      }`}>
                        {loc.emoji}
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                onClick={onOpenMap}
                className="w-full rounded-2xl bg-blue-600/80 py-2.5 font-mono text-xs text-white hover:bg-blue-500 transition-colors"
              >
                🗺️ Открыть полную карту города
              </button>
              {/* Locations list */}
              <div className="mt-3 space-y-1.5">
                {MAP_LOCATIONS.filter(l => state.unlockedLocations.includes(l.name) || l.unlocked).map(loc => (
                  <div key={loc.id} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                    <span>{loc.emoji}</span>
                    <span className="font-mono text-xs text-white/70">{loc.name}</span>
                    {state.currentLocation === loc.name && <span className="ml-auto font-mono text-[9px] text-yellow-400">● здесь</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== MESSAGES TAB ===== */}
          {tab === 'messages' && (
            <div className="px-4 py-2 overflow-y-auto h-full pb-16">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Сообщения</p>
              </div>

              {/* Partner chat */}
              {state.hasRelationship && (
                <div className="mb-2 flex items-center gap-3 rounded-2xl border border-pink-500/30 bg-pink-900/20 px-4 py-3">
                  <span className="text-2xl">💕</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-sans text-sm font-medium text-white">{state.partnerName}</p>
                      <span className="font-mono text-[10px] text-pink-400">💌 пишет...</span>
                    </div>
                    <p className="truncate font-mono text-xs text-white/40">Скучаю 🥺</p>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">сейчас</span>
                </div>
              )}

              {/* Friends */}
              <div className="space-y-2">
                {state.friends.map(friend => {
                  const hasDialog = !!FRIEND_DIALOGS[friend.id]?.length
                  const lastMessages = FRIEND_DIALOGS[friend.id]
                  const lastMsg = lastMessages?.[0]?.messages.slice(-1)[0]?.text ?? friend.description
                  return (
                    <button
                      key={friend.id}
                      onClick={() => onOpenChat(friend)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-left hover:bg-white/12 transition-colors active:scale-[0.98]"
                    >
                      <div className="relative">
                        <span className="text-2xl">{friend.emoji}</span>
                        {hasDialog && (
                          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-purple-400 border border-[#1a0a2e]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-white">{friend.name}</p>
                        <p className="truncate font-mono text-xs text-white/40">{lastMsg}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="h-1.5 w-10 rounded-full bg-white/15">
                          <div className="h-full rounded-full bg-pink-400" style={{ width: `${friend.relationship}%` }} />
                        </div>
                        <span className="font-mono text-[9px] text-white/30">{friend.relationship}%</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ===== SCHEDULE TAB ===== */}
          {tab === 'schedule' && (
            <div className="px-4 py-2 overflow-y-auto h-full pb-16">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => setTab('main')} className="font-mono text-xs text-white/50 hover:text-white">←</button>
                <p className="font-sans text-sm font-semibold text-white">Расписание пар</p>
              </div>

              <div className="mb-3 rounded-2xl bg-purple-900/30 border border-purple-500/20 px-3 py-2">
                <p className="font-mono text-xs text-purple-300">📅 День {state.day} · {state.time}</p>
              </div>

              <div className="space-y-2">
                {[
                  { time: '08:00', subject: 'Анатомия человека', room: 'Ауд. 204', type: 'lecture', prof: 'проф. Петров' },
                  { time: '09:40', subject: 'Физиология', room: 'Ауд. 118', type: 'practice', prof: 'доц. Смирнова' },
                  { time: '11:20', subject: 'Биохимия', room: 'Ауд. 312', type: 'lecture', prof: 'проф. Ким' },
                  { time: '13:00', subject: 'Обед', room: 'Столовая корп. А', type: 'break', prof: '' },
                  { time: '14:00', subject: 'Латинский язык', room: 'Ауд. 105', type: 'seminar', prof: 'Н.В. Орлова' },
                  { time: '15:40', subject: 'Гистология', room: 'Лаб. 012', type: 'practice', prof: 'доц. Фёдоров' },
                ].map((item, i) => {
                  const colors: Record<string, string> = {
                    lecture: 'border-l-blue-400 bg-blue-900/20',
                    practice: 'border-l-green-400 bg-green-900/20',
                    seminar: 'border-l-purple-400 bg-purple-900/20',
                    break: 'border-l-yellow-400 bg-yellow-900/20',
                  }
                  const typeLabels: Record<string, string> = {
                    lecture: 'Лекция',
                    practice: 'Практика',
                    seminar: 'Семинар',
                    break: 'Перерыв',
                  }
                  return (
                    <div key={i} className={`flex gap-3 rounded-xl border-l-2 px-3 py-2.5 ${colors[item.type]}`}>
                      <span className="font-mono text-[10px] text-white/50 w-9 shrink-0 mt-0.5">{item.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs font-semibold text-white leading-tight">{item.subject}</p>
                        <p className="font-mono text-[10px] text-white/40">{item.room}{item.prof ? ` · ${item.prof}` : ''}</p>
                        <span className="inline-block mt-0.5 rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/50">
                          {typeLabels[item.type]}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2">
                <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Прогресс</p>
                {[
                  { label: '📚 Знания', value: state.stats.knowledge, color: 'bg-blue-400' },
                  { label: '🤝 Соц. рейтинг', value: state.stats.socialRating, color: 'bg-green-400' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-white/60">{s.label}</span>
                      <span className="font-mono text-xs text-white/50">{s.value}/100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  )
}

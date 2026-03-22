import type { GameStats } from '../types'

interface Props {
  result: string
  effects: Partial<GameStats>
  onContinue: () => void
}

const EFFECT_LABELS: Record<keyof GameStats, { label: string; emoji: string }> = {
  energy: { label: 'Энергия', emoji: '⚡' },
  mood: { label: 'Настроение', emoji: '😊' },
  knowledge: { label: 'Знания', emoji: '📚' },
  money: { label: 'Деньги', emoji: '💰' },
  socialRating: { label: 'Соц. рейтинг', emoji: '🤝' },
}

export function ResultScreen({ result, effects, onContinue }: Props) {
  const effectEntries = Object.entries(effects) as [keyof GameStats, number][]

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#0f1b2d] px-6 text-white">
      <div className="w-full max-w-md">
        <div className="mb-6 rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm text-center">
          <div className="mb-3 text-5xl">
            {effects.mood && effects.mood > 0 ? '🌟' : effects.mood && effects.mood < -15 ? '😔' : '📝'}
          </div>
          <p className="font-mono text-sm leading-relaxed text-white/90">{result}</p>
        </div>

        {effectEntries.length > 0 && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-center font-mono text-xs text-white/40">Изменения</p>
            <div className="space-y-2">
              {effectEntries.map(([key, val]) => {
                const info = EFFECT_LABELS[key]
                if (!info || val === 0) return null
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="font-mono text-sm text-white/70">{info.emoji} {info.label}</span>
                    <span className={`font-mono text-sm font-semibold ${val > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {val > 0 ? '+' : ''}{key === 'money' ? `${val}₽` : val}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <button
          onClick={onContinue}
          className="w-full rounded-2xl bg-purple-600/80 py-4 font-sans text-base font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
        >
          Продолжить →
        </button>
      </div>
    </div>
  )
}

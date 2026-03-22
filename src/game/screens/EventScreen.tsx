import type { GameEvent, GameStats } from '../types'

interface Props {
  event: GameEvent
  onChoice: (effect: Partial<GameStats>, result: string) => void
}

export function EventScreen({ event, onChoice }: Props) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#0f1b2d] px-6 text-white">
      <div className="w-full max-w-md">
        {/* Event card */}
        <div className="mb-6 rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 text-4xl text-center">⭐</div>
          <h2 className="mb-3 text-center font-sans text-xl font-semibold text-white">{event.title}</h2>
          <p className="text-center font-mono text-sm leading-relaxed text-white/80">{event.description}</p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <p className="text-center font-mono text-xs text-white/40 mb-2">Что делаешь?</p>
          {event.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onChoice(choice.effect, choice.result)}
              className="w-full rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-left font-sans text-sm text-white transition-all duration-200 hover:border-purple-400/50 hover:bg-purple-500/15 active:scale-98"
            >
              <span className="mr-2 font-mono text-white/40">{i + 1}.</span>
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

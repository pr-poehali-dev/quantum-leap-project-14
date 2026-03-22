import { GrainOverlay } from '@/components/grain-overlay'
import { Shader, Swirl, ChromaFlow } from 'shaders/react'
import type { GameState } from '../types'

interface Props {
  onStart: () => void
  state: GameState
}

export function MenuScreen({ onStart, state }: Props) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <GrainOverlay />
      <div className="absolute inset-0 z-0">
        <Shader className="h-full w-full">
          <Swirl colorA="#c084fc" colorB="#f472b6" speed={0.4} detail={0.6} blend={60} coarseX={30} coarseY={30} mediumX={30} mediumY={30} fineX={30} fineY={30} />
          <ChromaFlow baseColor="#7c3aed" upColor="#a855f7" downColor="#1e1b4b" leftColor="#db2777" rightColor="#db2777" intensity={0.7} radius={1.5} momentum={20} maskType="alpha" opacity={0.95} />
        </Shader>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 text-7xl animate-bounce">🩺</div>
        <h1 className="mb-2 font-sans text-5xl font-bold tracking-tight text-white md:text-7xl">
          Медик
        </h1>
        <p className="mb-2 font-mono text-sm text-white/60 md:text-base">/ симулятор жизни студентки</p>
        <p className="mb-10 max-w-md text-base text-white/80 leading-relaxed">
          Обустрой комнату, учись, заводи друзей, ищи подработку и исследуй город
        </p>

        {state.screen !== 'menu' && (
          <div className="mb-4 rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
            <p className="font-mono text-sm text-white/80">День {state.day} · {state.time} · {state.currentLocation}</p>
          </div>
        )}

        <button
          onClick={onStart}
          className="group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 font-sans text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
        >
          <span className="relative z-10">
            {state.day === 1 && state.screen === 'menu' ? '🎓 Начать учёбу' : '▶ Продолжить'}
          </span>
        </button>

        <div className="mt-12 flex gap-8 text-center">
          {[
            { emoji: '🛏️', label: 'Комната' },
            { emoji: '🗺️', label: 'Город' },
            { emoji: '🛍️', label: 'Магазин' },
            { emoji: '📱', label: 'Телефон' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-1 opacity-60">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-mono text-xs text-white/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

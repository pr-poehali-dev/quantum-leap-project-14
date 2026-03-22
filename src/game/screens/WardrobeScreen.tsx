import type { CharacterAppearance, OutfitId } from '../types'
import { OUTFITS } from '../characterData'
import { CharacterSVG } from '../components/CharacterSVG'

interface Props {
  appearance: CharacterAppearance
  onChangeOutfit: (outfit: OutfitId) => void
  onCustomize: () => void
  onBack: () => void
}

export function WardrobeScreen({ appearance, onChangeOutfit, onCustomize, onBack }: Props) {
  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-b from-[#2d1b4e] to-[#1a0a2e] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button onClick={onBack} className="font-mono text-sm text-white/60 hover:text-white transition-colors">← Назад</button>
        <p className="font-sans text-sm font-semibold">👗 Гардероб</p>
        <button
          onClick={onCustomize}
          className="rounded-full border border-purple-400/40 px-3 py-1.5 font-mono text-xs text-purple-300 hover:bg-purple-500/20 transition-colors"
        >
          ✨ Внешность
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Character */}
        <div className="flex w-2/5 flex-col items-center justify-center border-r border-white/10 p-4">
          <CharacterSVG appearance={appearance} size={140} animated />
          <p className="mt-2 font-sans text-sm font-semibold">{appearance.name}</p>
          <p className="font-mono text-xs text-white/50">
            {OUTFITS.find(o => o.id === appearance.currentOutfit)?.label}
          </p>
        </div>

        {/* Outfits */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">Выбери наряд</p>
          <div className="space-y-2">
            {OUTFITS.map(outfit => {
              const isOwned = appearance.unlockedOutfits.includes(outfit.id)
              const isActive = appearance.currentOutfit === outfit.id
              return (
                <button
                  key={outfit.id}
                  onClick={() => isOwned && onChangeOutfit(outfit.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-purple-400 bg-purple-500/20'
                      : isOwned
                      ? 'border-white/15 bg-white/5 hover:bg-white/10 active:scale-98'
                      : 'border-white/8 bg-white/3 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {/* Color preview */}
                  <div className="flex shrink-0 flex-col gap-0.5">
                    <div className="h-4 w-8 rounded-t-md" style={{ background: outfit.colors.top }} />
                    <div className="h-4 w-8 rounded-b-md" style={{ background: outfit.colors.bottom }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{outfit.emoji}</span>
                      <span className="font-sans text-sm font-medium text-white">{outfit.label}</span>
                      {isActive && <span className="font-mono text-xs text-purple-300">● надет</span>}
                    </div>
                    <p className="font-mono text-xs text-white/50">{outfit.desc}</p>
                  </div>

                  {!isOwned && <span className="font-mono text-xs text-white/30">🔒</span>}
                </button>
              )
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="font-mono text-xs text-white/50">
              💡 Одежду можно заказать в интернет-магазине
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

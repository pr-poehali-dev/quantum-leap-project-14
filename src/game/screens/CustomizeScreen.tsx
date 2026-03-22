import { useState } from 'react'
import type { CharacterAppearance, SkinTone, HairColor, HairStyle, BodyShape, EyeColor, FaceShape } from '../types'
import { SKIN_TONES, HAIR_COLORS, HAIR_STYLES, BODY_SHAPES, EYE_COLORS, FACE_SHAPES } from '../characterData'
import { CharacterSVG } from '../components/CharacterSVG'

interface Props {
  appearance: CharacterAppearance
  onSave: (appearance: CharacterAppearance) => void
  isFirstTime?: boolean
}

type Tab = 'skin' | 'hair' | 'body' | 'face'

export function CustomizeScreen({ appearance, onSave, isFirstTime = false }: Props) {
  const [current, setCurrent] = useState<CharacterAppearance>({ ...appearance })
  const [tab, setTab] = useState<Tab>('skin')
  const [name, setName] = useState(appearance.name)

  const update = (patch: Partial<CharacterAppearance>) => setCurrent(prev => ({ ...prev, ...patch }))

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'skin', label: 'Кожа', emoji: '✋' },
    { id: 'hair', label: 'Волосы', emoji: '💇' },
    { id: 'body', label: 'Фигура', emoji: '🧍' },
    { id: 'face', label: 'Лицо', emoji: '👁️' },
  ]

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-b from-[#2d1b4e] to-[#1a0a2e] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="font-sans text-base font-bold">
            {isFirstTime ? '✨ Создай свою героиню' : '👗 Внешность'}
          </p>
          <p className="font-mono text-xs text-white/50">Настрой персонажа под себя</p>
        </div>
        <button
          onClick={() => onSave({ ...current, name })}
          className="rounded-full bg-purple-600 px-5 py-2 font-sans text-sm font-semibold text-white hover:bg-purple-500 transition-colors active:scale-95"
        >
          {isFirstTime ? 'Начать →' : 'Сохранить'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Character preview */}
        <div className="flex w-2/5 flex-col items-center justify-center border-r border-white/10 p-4">
          <CharacterSVG appearance={current} size={130} animated />
          <div className="mt-3 w-full">
            <label className="mb-1 block font-mono text-xs text-white/50">Имя персонажа</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center font-sans text-sm text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
              placeholder="Аня"
              maxLength={16}
            />
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 font-mono text-xs transition-colors ${
                  tab === t.id
                    ? 'border-b-2 border-purple-400 text-purple-300'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {tab === 'skin' && (
              <>
                <Section title="Тон кожи">
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TONES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => update({ skinTone: s.id as SkinTone })}
                        title={s.label}
                        className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                          current.skinTone === s.id ? 'border-purple-400 scale-110' : 'border-white/20'
                        }`}
                        style={{ background: s.color }}
                      >
                        {current.skinTone === s.id && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1">
                    <p className="font-mono text-xs text-white/40">
                      {SKIN_TONES.find(s => s.id === current.skinTone)?.label}
                    </p>
                  </div>
                </Section>

                <Section title="Цвет глаз">
                  <div className="flex flex-wrap gap-2">
                    {EYE_COLORS.map(e => (
                      <button
                        key={e.id}
                        onClick={() => update({ eyeColor: e.id as EyeColor })}
                        title={e.label}
                        className={`h-9 w-9 rounded-full border-2 transition-all ${
                          current.eyeColor === e.id ? 'border-purple-400 scale-110' : 'border-white/20'
                        }`}
                        style={{ background: e.color }}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-xs text-white/40 mt-1">
                    {EYE_COLORS.find(e => e.id === current.eyeColor)?.label}
                  </p>
                </Section>
              </>
            )}

            {tab === 'hair' && (
              <>
                <Section title="Цвет волос">
                  <div className="flex flex-wrap gap-2">
                    {HAIR_COLORS.map(h => (
                      <button
                        key={h.id}
                        onClick={() => update({ hairColor: h.id as HairColor })}
                        title={h.label}
                        className={`h-9 w-9 rounded-full border-2 transition-all ${
                          current.hairColor === h.id ? 'border-purple-400 scale-110' : 'border-white/20'
                        }`}
                        style={{ background: h.color }}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-xs text-white/40 mt-1">
                    {HAIR_COLORS.find(h => h.id === current.hairColor)?.label}
                  </p>
                </Section>

                <Section title="Причёска">
                  <div className="grid grid-cols-2 gap-2">
                    {HAIR_STYLES.map(h => (
                      <button
                        key={h.id}
                        onClick={() => update({ hairStyle: h.id as HairStyle })}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${
                          current.hairStyle === h.id
                            ? 'border-purple-400 bg-purple-500/20 text-white'
                            : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-lg">{h.emoji}</span>
                        <span className="font-mono text-xs">{h.label}</span>
                      </button>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {tab === 'body' && (
              <Section title="Тип фигуры">
                <div className="space-y-2">
                  {BODY_SHAPES.map(b => (
                    <button
                      key={b.id}
                      onClick={() => update({ bodyShape: b.id as BodyShape })}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        current.bodyShape === b.id
                          ? 'border-purple-400 bg-purple-500/20'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center text-lg ${
                        current.bodyShape === b.id ? 'border-purple-400' : 'border-white/20'
                      }`}>
                        🧍
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-white">{b.label}</p>
                        <p className="font-mono text-xs text-white/50">{b.desc}</p>
                      </div>
                      {current.bodyShape === b.id && (
                        <span className="ml-auto text-purple-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </Section>
            )}

            {tab === 'face' && (
              <Section title="Форма лица">
                <div className="grid grid-cols-2 gap-2">
                  {FACE_SHAPES.map(f => (
                    <button
                      key={f.id}
                      onClick={() => update({ faceShape: f.id as FaceShape })}
                      className={`rounded-xl border px-3 py-3 font-mono text-sm transition-all ${
                        current.faceShape === f.id
                          ? 'border-purple-400 bg-purple-500/20 text-white'
                          : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-white/40">{title}</p>
      {children}
    </div>
  )
}

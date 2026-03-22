import type { CharacterAppearance } from '../types'
import { SKIN_TONES, HAIR_COLORS, OUTFITS } from '../characterData'

interface Props {
  appearance: CharacterAppearance
  size?: number
  animated?: boolean
}

export function CharacterSVG({ appearance, size = 200, animated = false }: Props) {
  const skin = SKIN_TONES.find(s => s.id === appearance.skinTone) ?? SKIN_TONES[0]
  const hair = HAIR_COLORS.find(h => h.id === appearance.hairColor) ?? HAIR_COLORS[0]
  const outfit = OUTFITS.find(o => o.id === appearance.currentOutfit) ?? OUTFITS[0]
  const eyeColor = appearance.eyeColor === 'green' ? '#2E7D32' :
    appearance.eyeColor === 'blue' ? '#1565C0' :
    appearance.eyeColor === 'gray' ? '#607D8B' :
    appearance.eyeColor === 'hazel' ? '#795548' : '#4E2B0D'

  const bodyW = appearance.bodyShape === 'slim' ? 38 :
    appearance.bodyShape === 'curvy' ? 52 :
    appearance.bodyShape === 'athletic' ? 44 : 44

  const hipW = appearance.bodyShape === 'curvy' ? 56 :
    appearance.bodyShape === 'slim' ? 34 :
    appearance.bodyShape === 'athletic' ? 46 : 46

  const cx = 100

  const hairPath = () => {
    switch (appearance.hairStyle) {
      case 'short':
        return <ellipse cx={cx} cy="52" rx="26" ry="18" fill={hair.color} />
      case 'ponytail':
        return <>
          <ellipse cx={cx} cy="52" rx="26" ry="16" fill={hair.color} />
          <ellipse cx={cx + 24} cy="58" rx="8" ry="22" fill={hair.color} transform={`rotate(20, ${cx + 24}, 58)`} />
        </>
      case 'long':
        return <>
          <ellipse cx={cx} cy="52" rx="26" ry="16" fill={hair.color} />
          <rect x={cx - 28} y="60" width="14" height="55" rx="7" fill={hair.color} />
          <rect x={cx + 14} y="60" width="14" height="55" rx="7" fill={hair.color} />
        </>
      case 'bun':
        return <>
          <ellipse cx={cx} cy="54" rx="26" ry="16" fill={hair.color} />
          <circle cx={cx} cy="36" r="12" fill={hair.color} />
        </>
      case 'curly':
        return <>
          <ellipse cx={cx} cy="52" rx="28" ry="18" fill={hair.color} />
          {[[-22, 58], [22, 58], [-26, 70], [26, 70], [-20, 82], [20, 82]].map(([dx, dy], i) => (
            <circle key={i} cx={cx + dx} cy={dy} r="9" fill={hair.color} />
          ))}
        </>
      case 'braids':
        return <>
          <ellipse cx={cx} cy="52" rx="26" ry="16" fill={hair.color} />
          <rect x={cx - 28} y="62" width="10" height="60" rx="5" fill={hair.color} />
          <rect x={cx + 18} y="62" width="10" height="60" rx="5" fill={hair.color} />
          {[75, 88, 101, 114].map((y, i) => (
            <rect key={i} x={cx - 28} y={y} width="10" height="4" rx="2" fill={hair.color} opacity="0.6" />
          ))}
          {[75, 88, 101, 114].map((y, i) => (
            <rect key={i} x={cx + 18} y={y} width="10" height="4" rx="2" fill={hair.color} opacity="0.6" />
          ))}
        </>
      default:
        return <ellipse cx={cx} cy="52" rx="26" ry="16" fill={hair.color} />
    }
  }

  const isScrubs = appearance.currentOutfit === 'scrubs'
  const isParty = appearance.currentOutfit === 'party'
  const isCozy = appearance.currentOutfit === 'cozy'

  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'drop-shadow-lg' : ''}
      style={animated ? { animation: 'float 3s ease-in-out infinite' } : {}}
    >
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>

      {/* Shadow */}
      <ellipse cx={cx} cy="315" rx="35" ry="5" fill="rgba(0,0,0,0.15)" />

      {/* Legs */}
      <rect x={cx - 18} y="210" width="16" height="70" rx="8" fill={outfit.colors.bottom} />
      <rect x={cx + 2} y="210" width="16" height="70" rx="8" fill={outfit.colors.bottom} />

      {/* Shoes */}
      <ellipse cx={cx - 10} cy="282" rx="12" ry="6" fill="#333" />
      <ellipse cx={cx + 10} cy="282" rx="12" ry="6" fill="#333" />

      {/* Skirt / pants overlay for party/formal */}
      {isParty && (
        <path d={`M ${cx - bodyW/2} 160 Q ${cx} 220 ${cx + hipW/2 + 10} 210 L ${cx + hipW/2} 160 Z`} fill={outfit.colors.bottom} opacity="0.7" />
      )}

      {/* Hips */}
      <ellipse cx={cx} cy="200" rx={hipW / 2} ry="18" fill={outfit.colors.bottom} />

      {/* Body / top */}
      <rect
        x={cx - bodyW / 2}
        y="130"
        width={bodyW}
        height="75"
        rx="10"
        fill={outfit.colors.top}
      />

      {/* Scrubs pocket */}
      {isScrubs && (
        <rect x={cx - 10} y="150" width="18" height="14" rx="3" fill={outfit.colors.accent} opacity="0.5" />
      )}

      {/* Cozy pattern */}
      {isCozy && (
        <>
          <circle cx={cx - 8} cy="148" r="4" fill={outfit.colors.accent} opacity="0.4" />
          <circle cx={cx + 8} cy="155" r="3" fill={outfit.colors.accent} opacity="0.4" />
          <circle cx={cx} cy="162" r="4" fill={outfit.colors.accent} opacity="0.4" />
        </>
      )}

      {/* Arms */}
      <rect x={cx - bodyW / 2 - 14} y="133" width="16" height="55" rx="8" fill={outfit.colors.top} />
      <rect x={cx + bodyW / 2 - 2} y="133" width="16" height="55" rx="8" fill={outfit.colors.top} />

      {/* Hands */}
      <circle cx={cx - bodyW / 2 - 6} cy="192" r="8" fill={skin.color} />
      <circle cx={cx + bodyW / 2 + 6} cy="192" r="8" fill={skin.color} />

      {/* Neck */}
      <rect x={cx - 9} y="110" width="18" height="22" rx="9" fill={skin.faceColor} />

      {/* Face */}
      <ellipse
        cx={cx}
        cy={appearance.faceShape === 'round' ? 86 : 84}
        rx={appearance.faceShape === 'square' ? 26 : appearance.faceShape === 'heart' ? 24 : 23}
        ry={appearance.faceShape === 'round' ? 28 : appearance.faceShape === 'square' ? 26 : 30}
        fill={skin.faceColor}
      />

      {/* Ears */}
      <ellipse cx={cx - 23} cy="84" rx="5" ry="7" fill={skin.faceColor} />
      <ellipse cx={cx + 23} cy="84" rx="5" ry="7" fill={skin.faceColor} />

      {/* Hair (behind face logic — drawn after) */}
      {hairPath()}

      {/* Eyes */}
      <ellipse cx={cx - 8} cy="80" rx="5" ry="6" fill="white" />
      <ellipse cx={cx + 8} cy="80" rx="5" ry="6" fill="white" />
      <circle cx={cx - 8} cy="81" r="3.5" fill={eyeColor} />
      <circle cx={cx + 8} cy="81" r="3.5" fill={eyeColor} />
      <circle cx={cx - 7} cy="80" r="1.2" fill="white" />
      <circle cx={cx + 9} cy="80" r="1.2" fill="white" />

      {/* Eyebrows */}
      <path d={`M ${cx-13} 72 Q ${cx-8} 69 ${cx-3} 72`} stroke={hair.color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d={`M ${cx+3} 72 Q ${cx+8} 69 ${cx+13} 72`} stroke={hair.color} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d={`M ${cx} 85 Q ${cx+4} 91 ${cx} 93`} stroke={skin.color === '#FDDBB4' ? '#d4956a' : '#7a4520'} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Smile */}
      <path d={`M ${cx-7} 98 Q ${cx} 105 ${cx+7} 98`} stroke="#c0636b" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx={cx - 14} cy="93" r="6" fill="#F48FB1" opacity="0.25" />
      <circle cx={cx + 14} cy="93" r="6" fill="#F48FB1" opacity="0.25" />

      {/* Stethoscope for scrubs */}
      {isScrubs && (
        <>
          <path d={`M ${cx-5} 128 Q ${cx-15} 145 ${cx-10} 155`} stroke="#78909C" strokeWidth="2.5" fill="none" />
          <circle cx={cx - 10} cy="157" r="4" fill="#78909C" />
        </>
      )}
    </svg>
  )
}

import { useState } from 'react'
import type { Friend } from '../types'
import type { FriendChat } from '../data/friendDialogs'

interface Props {
  friend: Friend
  chat: FriendChat
  onReply: (replyIndex: number, effect: { mood?: number; socialRating?: number }) => void
  onBack: () => void
}

export function ChatScreen({ friend, chat, onReply, onBack }: Props) {
  const [replied, setReplied] = useState(false)
  const [myReply, setMyReply] = useState<string | null>(null)

  const handleReply = (i: number) => {
    const r = chat.replies[i]
    setMyReply(r.text)
    setReplied(true)
    onReply(i, r.effect)
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#111827] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button onClick={onBack} className="font-mono text-sm text-white/50 hover:text-white transition-colors">←</button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl">
          {friend.emoji}
        </div>
        <div>
          <p className="font-sans text-sm font-semibold">{friend.name}</p>
          <p className="font-mono text-xs text-green-400">● онлайн</p>
        </div>
        <div className="ml-auto">
          <div className="h-1.5 w-16 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-pink-400 transition-all" style={{ width: `${friend.relationship}%` }} />
          </div>
          <p className="mt-0.5 text-right font-mono text-[9px] text-white/30">дружба {friend.relationship}%</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Date */}
        <div className="text-center">
          <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white/30">сегодня</span>
        </div>

        {/* Friend messages */}
        {chat.messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.from === 'friend' && (
              <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-base mt-1">
                {friend.emoji}
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.from === 'me'
                  ? 'rounded-tr-sm bg-purple-600 text-white'
                  : 'rounded-tl-sm bg-white/10 text-white'
              }`}
            >
              <p className="font-sans text-sm leading-relaxed">{msg.text}</p>
              {msg.time && (
                <p className={`mt-1 font-mono text-[10px] ${msg.from === 'me' ? 'text-white/50 text-right' : 'text-white/30'}`}>
                  {msg.time}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* My reply (after choosing) */}
        {myReply && (
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-purple-600 px-4 py-2.5">
              <p className="font-sans text-sm leading-relaxed">{myReply.replace(/^[^\s]+ /, '')}</p>
              <p className="mt-1 text-right font-mono text-[10px] text-white/50">сейчас ✓✓</p>
            </div>
          </div>
        )}

        {/* Friend typing / response */}
        {myReply && (
          <div className="flex justify-start">
            <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-base mt-1">
              {friend.emoji}
            </div>
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5">
              <p className="font-sans text-sm leading-relaxed text-white/80">
                {getFriendResponse(friend.id, myReply)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Reply options or done */}
      <div className="border-t border-white/10 px-4 py-4">
        {!replied ? (
          <div className="space-y-2">
            <p className="mb-2 font-mono text-xs text-white/30">Выбери ответ:</p>
            {chat.replies.map((r, i) => (
              <button
                key={i}
                onClick={() => handleReply(i)}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left font-sans text-sm text-white transition-all hover:border-purple-400/40 hover:bg-purple-500/10 active:scale-[0.98]"
              >
                {r.text}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={onBack}
            className="w-full rounded-2xl bg-purple-600/80 py-3 font-sans text-sm font-medium text-white transition-all hover:bg-purple-500"
          >
            ← Вернуться к списку чатов
          </button>
        )}
      </div>
    </div>
  )
}

function getFriendResponse(friendId: string, myReply: string): string {
  const lower = myReply.toLowerCase()
  if (friendId === 'katya') {
    if (lower.includes('бегу') || lower.includes('иду') || lower.includes('да')) return 'Ура!! Жду тебя!! 🎉'
    if (lower.includes('нет') || lower.includes('не могу') || lower.includes('занята')) return 'Ладно, понимаю 😢 Может в другой раз'
    if (lower.includes('вместе') || lower.includes('давай')) return 'Отлично!! Ты лучшая 🥰'
    if (lower.includes('спасибо') || lower.includes('молодец')) return 'Стараюсь! 😊'
    return '😊👍'
  }
  if (friendId === 'dima') {
    if (lower.includes('конечно') || lower.includes('помогу') || lower.includes('да')) return 'Спасибо! Ты реально выручаешь 🙏'
    if (lower.includes('нет') || lower.includes('не могу')) return 'Ок, понял. Разберусь как-нибудь'
    if (lower.includes('пиццу') || lower.includes('иду')) return 'Круто! Комната 302, жди нас! 🍕'
    return '👍 Понял, спасибо'
  }
  if (friendId === 'anya') {
    if (lower.includes('спасибо') || lower.includes('да') || lower.includes('конечно')) return 'Удачи! Ты справишься, я вижу 💪'
    if (lower.includes('страшно') || lower.includes('переживаю')) return 'Это нормально. Все через это проходят. Главное — не сдаваться'
    return 'Хорошо! Держись там 😊'
  }
  return '😊'
}

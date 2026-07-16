import { useState, useEffect, useRef } from 'react'

const temas = [
  'Os desafios para a valorização de comunidades e povos tradicionais no Brasil',
  'Desafios para a formação educacional de surdos no Brasil',
  'O estigma associado às doenças mentais na sociedade brasileira',
  'Caminhos para combater a invisibilidade do trabalho de cuidado no Brasil',
  'Desafios para o enfrentamento da desinformação no ambiente digital',
]

const SIXTY_MIN = 60 * 60

export default function Simulador({ onExit }: { onExit: () => void }) {
  const [tema] = useState(() => temas[Math.floor(Math.random() * temas.length)])
  const [secondsLeft, setSecondsLeft] = useState(SIXTY_MIN)
  const [started, setStarted] = useState(false)
  const [text, setText] = useState('')
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!started || finished) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setFinished(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [started, finished])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const wordCount = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length
  const isLowTime = secondsLeft < 300 && started && !finished

  if (finished) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center animate-in">
          <span className="text-4xl mb-4 block">⏰</span>
          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-2">Tempo esgotado!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Você escreveu {wordCount} palavras. Que tal ver como ficaria a correção dessa redação?
          </p>
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-5 text-white mb-4">
            <p className="text-sm font-medium mb-1">🤖 Teste sua Nota com IA</p>
            <p className="text-white/80 text-xs">Cole seu texto lá e receba a correção completa</p>
          </div>
          <button
            onClick={onExit}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors"
          >
            Voltar para minha área
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-10">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={onExit} className="text-brand-600 text-sm font-medium mb-6">
          ← Sair do simulado
        </button>

        <div className="bg-white rounded-2xl p-5 mb-5 border border-slate-100">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Tema sorteado</span>
          <h2 className="font-display text-lg font-semibold text-slate-900 mt-1">{tema}</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm tabular-nums ${
            isLowTime ? 'bg-red-100 text-red-700' : 'bg-brand-100 text-brand-700'
          }`}>
            ⏱️ {formatted}
          </div>
          <span className="text-slate-400 text-xs">{wordCount} palavras</span>
        </div>

        {!started ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
            <p className="text-slate-500 text-sm mb-5">
              Você terá 1 hora, o mesmo tempo da prova real. Pronto para começar?
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Começar simulado
            </button>
          </div>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comece a escrever sua redação aqui..."
            className="w-full h-96 bg-white rounded-2xl border border-slate-100 p-5 text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
          />
        )}
      </div>
    </div>
  )
}

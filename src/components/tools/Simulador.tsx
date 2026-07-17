import { useState, useEffect, useRef } from 'react'
import { trackEvent } from '../../services/eventService'

const temas = [
  'Os desafios para a valorização de comunidades e povos tradicionais no Brasil',
  'Desafios para a formação educacional de surdos no Brasil',
  'O estigma associado às doenças mentais na sociedade brasileira',
  'Caminhos para combater a invisibilidade do trabalho de cuidado no Brasil',
  'Desafios para o enfrentamento da desinformação no ambiente digital',
]

const SIXTY_MIN = 60 * 60

const styles = {
  page: 'min-h-dvh bg-slate-950 pb-10',
  container: 'max-w-2xl mx-auto px-6 py-8',
  back: 'text-amber-400 text-sm font-semibold mb-6 hover:text-amber-300 transition',
  card: 'bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur mb-5',
  tag: 'text-xs font-bold text-amber-400 uppercase tracking-wide',
  title: 'text-lg font-bold text-white mt-2 leading-relaxed',
  timer: 'flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm tabular-nums',
  timerNormal: 'bg-amber-400/10 text-amber-400',
  timerDanger: 'bg-red-500/20 text-red-400',
  words: 'text-slate-500 text-xs',
  startCard: 'bg-white/5 border border-white/10 rounded-3xl p-8 text-center',
  text: 'text-slate-400 text-sm mb-6',
  action: 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition hover:-translate-y-1',
  textarea: 'w-full h-96 bg-white/5 border border-white/10 rounded-3xl p-5 text-sm leading-relaxed text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 resize-none',
  finishedCard: 'max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur',
  finishedIcon: 'text-4xl mb-4 block',
  finishedTitle: 'text-2xl font-bold text-white mb-2',
  finishedDescription: 'text-slate-400 text-sm mb-6',
  iaBox: 'bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-5 text-slate-950 mb-5',
  iaTitle: 'text-sm font-bold mb-1',
  iaDescription: 'text-slate-950/70 text-xs',
  primary: 'w-full bg-white text-slate-950 font-bold py-3 rounded-2xl transition hover:-translate-y-0.5 mb-3',
  secondary: 'w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-2xl transition',
}

export default function Simulador({ onExit, onWantCorrection }: { onExit: () => void; onWantCorrection?: () => void }) {
  const [tema] = useState(() => temas[Math.floor(Math.random() * temas.length)])
  const [secondsLeft, setSecondsLeft] = useState(SIXTY_MIN)
  const [started, setStarted] = useState(false)
  const [text, setText] = useState('')
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (started) trackEvent('simulador_start')
  }, [started])

  useEffect(() => {
    if (finished) trackEvent('simulador_complete')
  }, [finished])

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
      <main className={styles.page}>
        <div className="min-h-dvh flex items-center justify-center px-6">
          <div className={styles.finishedCard}>
            <span className={styles.finishedIcon}>⏰</span>
            <h2 className={styles.finishedTitle}>Tempo esgotado!</h2>
            <p className={styles.finishedDescription}>
              Você escreveu {wordCount} palavras. Que tal ver como ficaria a correção dessa redação?
            </p>

            <div className={styles.iaBox}>
              <p className={styles.iaTitle}>🤖 Teste sua Nota com IA</p>
              <p className={styles.iaDescription}>Cole seu texto lá e receba a correção completa</p>
            </div>

            <button onClick={onWantCorrection ?? onExit} className={styles.primary}>
              Corrigir esta redação agora
            </button>
            <button onClick={onExit} className={styles.secondary}>
              Voltar para minha área
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button onClick={onExit} className={styles.back}>← Sair do simulado</button>

        <section className={styles.card}>
          <span className={styles.tag}>Tema sorteado</span>
          <h2 className={styles.title}>{tema}</h2>
        </section>

        <div className="flex items-center justify-between mb-5">
          <div className={`${styles.timer} ${isLowTime ? styles.timerDanger : styles.timerNormal}`}>
            ⏱️ {formatted}
          </div>
          <span className={styles.words}>{wordCount} palavras</span>
        </div>

        {!started ? (
          <section className={styles.startCard}>
            <p className={styles.text}>
              Você terá 1 hora, o mesmo tempo da prova real. Pronto para começar?
            </p>
            <button onClick={() => setStarted(true)} className={styles.action}>
              Começar simulado
            </button>
          </section>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comece a escrever sua redação aqui..."
            className={styles.textarea}
          />
        )}
      </div>
    </main>
  )
}
interface ProgressBarProps {
  current: number
  total: number
  onBack?: () => void
}

const styles = {
  container: 'mb-6',
  header: 'flex items-center justify-between mb-4',
  back: 'flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-amber-400 transition',
  counter: 'px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-400 backdrop-blur',
  progress: 'h-2 bg-white/10 rounded-full overflow-hidden',
  progressFill: 'h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-orange-500/20',
}

export default function ProgressBar({ current, total, onBack }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {onBack ? (
          <button onClick={onBack} className={styles.back}>← Voltar</button>
        ) : <span />}
        <span className={styles.counter}>{current}/{total} • {percentage}%</span>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

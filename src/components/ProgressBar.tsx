interface ProgressBarProps {
  current: number
  total: number
  onBack?: () => void
}

export default function ProgressBar({ current, total, onBack }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-brand-600 text-sm font-medium flex items-center gap-1 hover:text-brand-700 transition-colors"
          >
            ← Voltar
          </button>
        ) : <span />}
        <span className="text-slate-400 text-xs font-medium tabular-nums">
          {current} de {total} · {pct}% concluído
        </span>
      </div>
      <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

const steps = [
  'Analisando suas respostas...',
  'Identificando seu perfil de redação...',
  'Calculando seu potencial de evolução...',
  'Montando seu plano personalizado...',
]

export default function DiagnosisLoading({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (stepIndex >= steps.length - 1) {
      const finalTimer = setTimeout(onDone, 900)
      return () => clearTimeout(finalTimer)
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), 800)
    return () => clearTimeout(timer)
  }, [stepIndex, onDone])

  const pct = Math.round(((stepIndex + 1) / steps.length) * 100)

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="max-w-xl mx-auto px-6 text-center animate-in">
        <div className="w-16 h-16 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">📊</div>
        </div>

        <p className="text-slate-900 font-semibold text-lg mb-4 animate-pulse-soft">
          {steps[stepIndex]}
        </p>

        <div className="w-full bg-brand-100 rounded-full h-2 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs tabular-nums">{pct}% concluído</p>
      </div>
    </div>
  )
}

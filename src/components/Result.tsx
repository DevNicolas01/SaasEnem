import { dificuldadeLabels, notaLabels, areaLabels, objetivoLabels } from '../data/quiz'
import type { QuizAnswers } from '../App'

interface ResultProps {
  answers: QuizAnswers
  onContinue: () => void
}

export default function Result({ answers, onContinue }: ResultProps) {
  const rows = [
    { label: 'Maior dificuldade', value: dificuldadeLabels[answers.dificuldade ?? ''] ?? '—' },
    { label: 'Nota atual', value: notaLabels[answers['nota-atual'] ?? ''] ?? '—' },
    { label: 'Área que mais preocupa', value: areaLabels[answers['area-medo'] ?? ''] ?? '—' },
    { label: 'Objetivo', value: objetivoLabels[answers.objetivo ?? ''] ?? '—' },
  ]

  return (
    <div className="min-h-screen flex items-center bg-brand-50">
      <div className="max-w-lg mx-auto px-6 py-14 animate-in w-full">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-brand-100/50 p-8">
          <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            ✨ Diagnóstico pronto
          </span>

          <h1 className="font-display text-2xl font-semibold text-slate-900 mb-3 leading-snug">
            Identificamos seu perfil de redação
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Com base nas suas respostas, montamos um plano personalizado para evoluir sua nota no ENEM.
          </p>

          <div className="bg-brand-50/60 rounded-2xl p-4 mb-6 space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{r.label}</span>
                <span className="font-semibold text-slate-900">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 mb-7">
            {[
              'Plano de estudos adaptado ao seu tempo disponível',
              'Foco nos pontos que mais travam sua nota',
              'Ferramentas práticas para treinar redação',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-brand-300/40 hover:-translate-y-0.5"
          >
            Acessar minha área →
          </button>
          <p className="text-center text-slate-300 text-xs mt-3">Leva menos de 1 minuto para ver</p>
        </div>
      </div>
    </div>
  )
}

import { QuizQuestion } from '../data/quiz'
import ProgressBar from './ProgressBar'

interface QuizStepProps {
  question: QuizQuestion
  stepIndex: number
  totalSteps: number
  onSelect: (optionId: string) => void
  onBack?: () => void
}

export default function QuizStep({ question, stepIndex, totalSteps, onSelect, onBack }: QuizStepProps) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10 animate-in" key={question.id}>
      <ProgressBar current={stepIndex + 1} total={totalSteps} onBack={onBack} />

      <h1 className="font-display text-3xl font-semibold text-slate-900 mb-2 leading-snug">
        {question.question}
      </h1>
      <p className="text-slate-400 text-sm mb-5">{question.hint}</p>

      <div className="space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="w-full bg-white border border-slate-100 hover:border-brand-400 hover:shadow-md hover:shadow-brand-100 rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-150 group"
          >
            <span className="flex items-center gap-3">
              {opt.icon && (
                <span className="w-9 h-9 bg-brand-50 group-hover:bg-brand-100 rounded-full flex items-center justify-center text-lg transition-colors">
                  {opt.icon}
                </span>
              )}
              <span className="font-medium text-slate-900 text-[15px]">{opt.label}</span>
            </span>
            <span className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-brand-500 transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

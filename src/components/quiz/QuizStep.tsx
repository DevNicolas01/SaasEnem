import ProgressBar from './ProgressBar'
import type { QuizQuestion } from '../../data/quiz'

interface QuizStepProps {
  question: QuizQuestion
  stepIndex: number
  totalSteps: number
  onSelect: (optionId: string) => void
  onBack?: () => void
}

const styles = {
  page: 'min-h-dvh bg-slate-950 px-5 py-8',
  container: 'max-w-lg mx-auto',
  question: 'text-2xl font-bold text-white mb-2 leading-snug',
  hint: 'text-slate-400 text-sm mb-8',
  options: 'space-y-3',
  option:
    'w-full text-left bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 rounded-2xl px-5 py-4 flex items-center gap-3 transition-all',
  optionIcon: 'text-xl flex-shrink-0',
  optionLabel: 'text-white font-medium text-sm',
}

export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: QuizStepProps) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ProgressBar current={stepIndex + 1} total={totalSteps} onBack={onBack} />

        <h1 className={styles.question}>{question.question}</h1>
        <p className={styles.hint}>{question.hint}</p>

        <div className={styles.options}>
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={styles.option}
            >
              {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
              <span className={styles.optionLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

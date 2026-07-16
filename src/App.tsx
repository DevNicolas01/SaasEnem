import { useState } from 'react'
import { quizQuestions } from './data/quiz'
import QuizStep from './components/QuizStep'
import DiagnosisLoading from './components/DiagnosisLoading'
import Result from './components/Result'
import Acesso from './pages/Acesso'

export interface QuizAnswers {
  etapa?: string
  dificuldade?: string
  'nota-atual'?: string
  'area-medo'?: string
  'tempo-estudo'?: string
  objetivo?: string
}

type Stage = 'quiz' | 'loading' | 'result'

export default function App() {
  const [stage, setStage] = useState<Stage>('quiz')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  // Rota /acesso — painel principal, separado do fluxo do quiz
  if (window.location.pathname === '/acesso') {
    return <Acesso />
  }

  const currentQuestion = quizQuestions[stepIndex]

  function handleSelect(optionId: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }))

    if (stepIndex < quizQuestions.length - 1) {
      setStepIndex((i) => i + 1)
    } else {
      setStage('loading')
    }
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  function goToAcesso() {
    window.location.href = '/acesso'
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {stage === 'quiz' && (
        <QuizStep
          question={currentQuestion}
          stepIndex={stepIndex}
          totalSteps={quizQuestions.length}
          onSelect={handleSelect}
          onBack={stepIndex > 0 ? handleBack : undefined}
        />
      )}

      {stage === 'loading' && (
        <DiagnosisLoading onDone={() => setStage('result')} />
      )}

      {stage === 'result' && (
        <Result answers={answers} onContinue={goToAcesso} />
      )}
    </div>
  )
}

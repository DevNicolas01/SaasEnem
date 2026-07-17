import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { quizQuestions } from "../data/quiz";
import { trackEvent } from "../services/eventService";

import QuizStep from "../components/quiz/QuizStep";
import DiagnosisLoading from "../components/quiz/DiagnosisLoading";
import Result from "../components/result/Result";
import LeadCapture from "../components/result/LeadCapture";

export interface QuizAnswers {
  etapa?: string;
  dificuldade?: string;
  "nota-atual"?: string;
  "area-medo"?: string;
  "tempo-estudo"?: string;
  objetivo?: string;
}

// Ordem do funil: primeiro captura o lead (email/senha), só depois
// mostra o resultado completo. Isso "trava" o diagnóstico atrás do
// cadastro em vez de entregar de graça antes — tende a converter
// mais lead do que mostrar tudo e só pedir o email no final.
type Stage = "quiz" | "loading" | "lead" | "result";

export default function Quiz() {
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("quiz");

  const [stepIndex, setStepIndex] = useState(0);

  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = quizQuestions[stepIndex];

  // Marca a entrada no quiz — sem isso não dá pra medir quantas
  // pessoas começam vs. quantas terminam (taxa de conclusão do funil).
  useEffect(() => {
    trackEvent("quiz_start");
  }, []);

  useEffect(() => {
    if (stage === "result") {
      trackEvent("result_view");
    }
  }, [stage]);

  function handleSelect(optionId: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    if (stepIndex < quizQuestions.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      trackEvent("quiz_complete");
      setStage("loading");
    }
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  }

  return (
    <main className="min-h-dvh bg-slate-950">
      {stage === "quiz" && (
        <QuizStep
          question={currentQuestion}
          stepIndex={stepIndex}
          totalSteps={quizQuestions.length}
          onSelect={handleSelect}
          onBack={stepIndex > 0 ? handleBack : undefined}
        />
      )}

      {stage === "loading" && (
        <DiagnosisLoading onDone={() => setStage("lead")} />
      )}

      {stage === "lead" && (
        <LeadCapture
          quizAnswers={answers}
          onContinue={() => setStage("result")}
        />
      )}

      {stage === "result" && (
        <Result answers={answers} onContinue={() => navigate("/acesso")} />
      )}
    </main>
  );
}

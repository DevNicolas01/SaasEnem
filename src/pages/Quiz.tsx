import { useState } from "react";

import { quizQuestions } from "../data/quiz";

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

type Stage = "quiz" | "loading" | "result" | "lead";

export default function Quiz() {
  const [stage, setStage] = useState<Stage>("quiz");

  const [stepIndex, setStepIndex] = useState(0);

  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = quizQuestions[stepIndex];

  function handleSelect(optionId: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    if (stepIndex < quizQuestions.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
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
        <DiagnosisLoading onDone={() => setStage("result")} />
      )}

      {stage === "result" && (
        <Result answers={answers} onContinue={() => setStage("lead")} />
      )}

      {stage === "lead" && (
        <LeadCapture
          onContinue={() => {
            window.location.href = "/acesso";
          }}
        />
      )}
    </main>
  );
}

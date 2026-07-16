import { useEffect, useState } from "react";

const steps = [
  "Analisando suas respostas...",
  "Identificando seu perfil de redação...",
  "Calculando seu potencial de evolução...",
  "Montando seu plano personalizado...",
];

const styles = {
  page: "min-h-dvh bg-slate-950 flex items-center justify-center px-6",

  container: "max-w-xl mx-auto text-center animate-in w-full",

  loader: "w-16 h-16 mx-auto mb-8 relative",

  loaderBase: "absolute inset-0 rounded-full border-4 border-white/10",

  loaderSpin:
    "absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin",

  icon: "absolute inset-0 flex items-center justify-center text-2xl",

  title: "text-white font-bold text-lg mb-5 animate-pulse",

  progress: "w-full bg-white/10 rounded-full h-2 overflow-hidden mb-3",

  progressFill:
    "h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500",

  percentage: "text-slate-500 text-xs tabular-nums",
};

export default function DiagnosisLoading({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= steps.length - 1) {
      const finalTimer = setTimeout(onDone, 900);

      return () => clearTimeout(finalTimer);
    }

    const timer = setTimeout(() => setStepIndex((i) => i + 1), 800);

    return () => clearTimeout(timer);
  }, [stepIndex, onDone]);

  const pct = Math.round(((stepIndex + 1) / steps.length) * 100);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.loaderBase} />

          <div className={styles.loaderSpin} />

          <div className={styles.icon}>📊</div>
        </div>

        <p className={styles.title}>{steps[stepIndex]}</p>

        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{
              width: `${pct}%`,
            }}
          />
        </div>

        <p className={styles.percentage}>{pct}% concluído</p>
      </div>
    </main>
  );
}

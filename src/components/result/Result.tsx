import {
  dificuldadeLabels,
  notaLabels,
  areaLabels,
  objetivoLabels,
  type QuizAnswers,
} from "../../data/quiz";


interface ResultProps {
  answers: QuizAnswers;
  onContinue: () => void;
}


const styles = {
  page: "min-h-dvh bg-slate-950 px-5 py-10 flex items-center",

  container: "max-w-lg mx-auto w-full",

  title: "text-3xl font-bold text-white",

  description: "text-slate-400",

  action:
    "mt-6 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl w-full",
};


export default function Result({
  answers,
  onContinue,
}: ResultProps) {

  const rows = [
    {
      label: "Dificuldade",
      value: dificuldadeLabels[answers.dificuldade ?? ""] ?? "—",
    },

    {
      label: "Nota atual",
      value: notaLabels[answers["nota-atual"] ?? ""] ?? "—",
    },

    {
      label: "Área",
      value: areaLabels[answers["area-medo"] ?? ""] ?? "—",
    },

    {
      label: "Objetivo",
      value: objetivoLabels[answers.objetivo ?? ""] ?? "—",
    },
  ];


  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <h1 className={styles.title}>
          Seu plano está pronto 🚀
        </h1>

        <p className={styles.description}>
          Analisamos suas respostas.
        </p>


        <div className="mt-8 space-y-3">

          {rows.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4"
            >
              <p className="text-xs text-gray-500">
                {item.label}
              </p>

              <p className="font-bold text-black">
                {item.value}
              </p>

            </div>
          ))}

        </div>


        <button
          onClick={onContinue}
          className={styles.action}
        >
          Acessar meu plano →
        </button>


      </div>
    </main>
  );
}
import { QuizQuestion } from "../../data/quiz";
import ProgressBar from "./ProgressBar";

interface QuizStepProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
}

const styles = {
  page:
    "min-h-dvh bg-slate-950 px-5 py-10 flex items-center animate-in",

  container:
    "max-w-xl mx-auto w-full",

  header:
    "mb-8",

  headerInfo:
    "flex items-center justify-between mb-5",

  tag:
    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400",

  step:
    "px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-400",

  questionCard:
    "bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 backdrop-blur",

  emoji:
    "w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-2xl mb-5",

  title:
    "text-2xl sm:text-3xl font-bold text-white leading-tight mb-3",

  description:
    "text-slate-400 text-sm leading-relaxed",

  options:
    "space-y-3",

  option:
    "group w-full bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-white/10 rounded-2xl px-5 py-5 flex items-center justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10",

  optionContent:
    "flex items-center gap-4",

  icon:
    "w-11 h-11 rounded-xl bg-white/10 group-hover:bg-amber-400/20 flex items-center justify-center text-xl transition-colors",

  number:
    "w-8 h-8 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center text-sm font-bold",

  label:
    "text-left font-semibold text-white text-[15px]",

  radio:
    "w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-amber-400 group-hover:bg-amber-400/20 transition-all",

  footer:
    "text-center mt-8",

  footerText:
    "text-xs text-slate-500",
};


export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: QuizStepProps) {

  return (
    <main className={styles.page} key={question.id}>


      <div className={styles.container}>


        <header className={styles.header}>


          <div className={styles.headerInfo}>


            <span className={styles.tag}>
              🏆 Diagnóstico ENEM
            </span>


            <span className={styles.step}>
              {stepIndex + 1}/{totalSteps}
            </span>


          </div>



          <ProgressBar
            current={stepIndex + 1}
            total={totalSteps}
            onBack={onBack}
          />


        </header>





        <section className={styles.questionCard}>


          <div className={styles.emoji}>
            🏆
          </div>



          <h1 className={styles.title}>
            {question.question}
          </h1>



          <p className={styles.description}>
            {question.hint}
          </p>


        </section>






        <section className={styles.options}>


          {question.options.map((option, index) => (

            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={styles.option}
            >


              <div className={styles.optionContent}>


                {option.icon ? (

                  <span className={styles.icon}>
                    {option.icon}
                  </span>

                ) : (

                  <span className={styles.number}>
                    {index + 1}
                  </span>

                )}



                <span className={styles.label}>
                  {option.label}
                </span>


              </div>




              <span className={styles.radio} />


            </button>

          ))}


        </section>






        <footer className={styles.footer}>

          <p className={styles.footerText}>
            🔒 Suas respostas são usadas para montar seu plano personalizado de evolução
          </p>

        </footer>



      </div>


    </main>
  );
}
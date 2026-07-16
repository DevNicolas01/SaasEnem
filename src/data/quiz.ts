export interface QuizOption {
  id: string
  label: string
  icon?: string
}

export interface QuizQuestion {
  id: string
  question: string
  hint: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'etapa',
    question: 'Você já fez o ENEM antes?',
    hint: 'Isso ajuda a calibrar seu ponto de partida',
    options: [
      { id: 'nunca', label: 'Nunca fiz', icon: '🆕' },
      { id: 'uma-vez', label: 'Fiz uma vez', icon: '📝' },
      { id: 'varias', label: 'Já fiz mais de uma vez', icon: '🔁' },
    ],
  },
  {
    id: 'dificuldade',
    question: 'Qual sua maior dificuldade na redação?',
    hint: 'Não existe resposta errada aqui',
    options: [
      { id: 'introducao', label: 'Começar o texto', icon: '✍️' },
      { id: 'argumentacao', label: 'Desenvolver os argumentos', icon: '🧠' },
      { id: 'coesao', label: 'Coesão e coerência', icon: '🔗' },
      { id: 'proposta', label: 'Proposta de intervenção', icon: '💡' },
      { id: 'nao-sei', label: 'Não sei ao certo', icon: '🤔' },
    ],
  },
  {
    id: 'nota-atual',
    question: 'Qual sua última nota de redação (ou estimativa)?',
    hint: 'Seja sincero — isso é só pra calibrar seu plano',
    options: [
      { id: 'ate-400', label: 'Até 400' },
      { id: '400-600', label: '400 a 600' },
      { id: '600-800', label: '600 a 800' },
      { id: '800+', label: 'Acima de 800' },
      { id: 'nunca-fiz', label: 'Nunca escrevi uma redação nota real' },
    ],
  },
  {
    id: 'area-medo',
    question: 'Qual área te dá mais medo na prova?',
    hint: 'Vamos usar isso pra montar seu foco de estudo',
    options: [
      { id: 'linguagens', label: 'Linguagens', icon: '📖' },
      { id: 'humanas', label: 'Ciências Humanas', icon: '🌍' },
      { id: 'natureza', label: 'Ciências da Natureza', icon: '🔬' },
      { id: 'matematica', label: 'Matemática', icon: '📐' },
      { id: 'redacao', label: 'Redação', icon: '✏️' },
    ],
  },
  {
    id: 'tempo-estudo',
    question: 'Quanto tempo por semana você dedica aos estudos?',
    hint: 'Vamos adaptar o plano ao seu tempo real',
    options: [
      { id: 'pouco', label: 'Menos de 3 horas' },
      { id: 'medio', label: '3 a 8 horas' },
      { id: 'bom', label: '8 a 15 horas' },
      { id: 'muito', label: 'Mais de 15 horas' },
    ],
  },
  {
    id: 'objetivo',
    question: 'Qual seu maior objetivo agora?',
    hint: 'Última pergunta! Isso define seu resultado',
    options: [
      { id: 'nota-1000', label: 'Tirar nota 1000 na redação', icon: '🏆' },
      { id: 'passar', label: 'Passar no curso que eu quero', icon: '🎯' },
      { id: 'melhorar', label: 'Melhorar minha nota atual', icon: '📈' },
      { id: 'organizar', label: 'Organizar minha rotina de estudos', icon: '🗓️' },
    ],
  },
]

export const dificuldadeLabels: Record<string, string> = {
  introducao: 'Começar o texto', argumentacao: 'Argumentação',
  coesao: 'Coesão e coerência', proposta: 'Proposta de intervenção', 'nao-sei': 'Não sei ao certo',
}
export const notaLabels: Record<string, string> = {
  'ate-400': 'Até 400', '400-600': '400 a 600', '600-800': '600 a 800',
  '800+': 'Acima de 800', 'nunca-fiz': 'Nunca escrevi',
}
export const areaLabels: Record<string, string> = {
  linguagens: 'Linguagens', humanas: 'Humanas', natureza: 'Natureza',
  matematica: 'Matemática', redacao: 'Redação',
}
export const objetivoLabels: Record<string, string> = {
  'nota-1000': 'Nota 1000', passar: 'Passar no curso',
  melhorar: 'Melhorar a nota', organizar: 'Organizar rotina',
}

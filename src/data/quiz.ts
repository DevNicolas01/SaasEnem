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

export interface QuizAnswers {
  etapa?: string
  dificuldade?: string
  'nota-atual'?: string
  'area-medo'?: string
  'tempo-estudo'?: string
  objetivo?: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'etapa',
    question: 'Qual é o seu momento atual com o ENEM?',
    hint: 'Vamos identificar seu ponto de partida para montar seu plano',
    options: [
      { id: 'primeira', label: 'Vou fazer o ENEM pela primeira vez', icon: '🆕' },
      { id: 'uma-vez', label: 'Já fiz uma vez e quero melhorar', icon: '📈' },
      { id: 'varias', label: 'Já tentei algumas vezes', icon: '🔁' },
    ],
  },
  {
    id: 'dificuldade',
    question: 'Qual sua maior dificuldade na redação?',
    hint: 'Isso mostra onde você pode ganhar mais pontos',
    options: [
      { id: 'introducao', label: 'Começar a redação', icon: '✍️' },
      { id: 'argumentacao', label: 'Criar bons argumentos', icon: '🧠' },
      { id: 'coesao', label: 'Organizar minhas ideias', icon: '🔗' },
      { id: 'proposta', label: 'Fazer uma proposta forte', icon: '💡' },
      { id: 'nao-sei', label: 'Não sei exatamente', icon: '🤔' },
    ],
  },
  {
    id: 'nota-atual',
    question: 'Qual sua nota atual ou estimativa na redação?',
    hint: 'Assim conseguimos calcular seu potencial de evolução',
    options: [
      { id: 'ate-400', label: 'Menos de 400 pontos' },
      { id: '400-600', label: 'Entre 400 e 600 pontos' },
      { id: '600-800', label: 'Entre 600 e 800 pontos' },
      { id: '800+', label: 'Acima de 800 pontos' },
      { id: 'nunca-fiz', label: 'Nunca fiz uma redação avaliada' },
    ],
  },
  {
    id: 'area-medo',
    question: 'Qual parte do ENEM mais preocupa você?',
    hint: 'Vamos direcionar seu plano para sua maior dificuldade',
    options: [
      { id: 'linguagens', label: 'Linguagens', icon: '📖' },
      { id: 'humanas', label: 'Ciências Humanas', icon: '🌎' },
      { id: 'natureza', label: 'Ciências da Natureza', icon: '🔬' },
      { id: 'matematica', label: 'Matemática', icon: '📐' },
      { id: 'redacao', label: 'Redação', icon: '✏️' },
    ],
  },
  {
    id: 'tempo-estudo',
    question: 'Quanto tempo você consegue estudar por semana?',
    hint: 'Seu plano será adaptado à sua rotina real',
    options: [
      { id: 'pouco', label: 'Menos de 3 horas' },
      { id: 'medio', label: 'De 3 a 8 horas' },
      { id: 'bom', label: 'De 8 a 15 horas' },
      { id: 'muito', label: 'Mais de 15 horas' },
    ],
  },
  {
    id: 'objetivo',
    question: 'Qual seu principal objetivo com o ENEM?',
    hint: 'Última pergunta! Vamos definir seu foco',
    options: [
      { id: 'nota-1000', label: 'Buscar nota máxima na redação', icon: '🏆' },
      { id: 'passar', label: 'Entrar no curso que desejo', icon: '🎯' },
      { id: 'melhorar', label: 'Aumentar minha nota', icon: '📈' },
      { id: 'organizar', label: 'Criar uma rotina de estudos', icon: '🗓️' },
    ],
  },
]

export const dificuldadeLabels: Record<string, string> = {
  introducao: 'Começar a redação',
  argumentacao: 'Construção dos argumentos',
  coesao: 'Organização das ideias',
  proposta: 'Proposta de intervenção',
  'nao-sei': 'Identificar dificuldade',
}

export const notaLabels: Record<string, string> = {
  'ate-400': 'Menos de 400',
  '400-600': '400 a 600',
  '600-800': '600 a 800',
  '800+': 'Acima de 800',
  'nunca-fiz': 'Sem nota anterior',
}

export const areaLabels: Record<string, string> = {
  linguagens: 'Linguagens',
  humanas: 'Ciências Humanas',
  natureza: 'Ciências da Natureza',
  matematica: 'Matemática',
  redacao: 'Redação',
}

export const objetivoLabels: Record<string, string> = {
  'nota-1000': 'Nota máxima',
  passar: 'Aprovação no curso',
  melhorar: 'Melhorar a nota',
  organizar: 'Organizar rotina',
}
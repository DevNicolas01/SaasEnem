export interface Product {
  id: string;
  icon: string;
  title: string;
  description: string;
  price?: string;
  free?: boolean;
  gradient?: string;
  cta: string;
}


export const freeItems: Product[] = [
  {
    id: "banco-temas",
    icon: "📋",
    title: "Banco de Temas Prováveis",
    description:
      "Lista atualizada com os temas de redação mais prováveis do ano.",
    free: true,
    cta: "Baixar grátis",
  },

  {
    id: "video-erros",
    icon: "🎥",
    title: "5 Erros que Zeram sua Redação",
    description:
      "Vídeo curto explicando os erros mais comuns e como evitá-los.",
    free: true,
    cta: "Assistir agora",
  },

  {
    id: "cronograma-modelo",
    icon: "🗓️",
    title: "Modelo de Cronograma de Estudos",
    description:
      "Planilha simples para organizar suas semanas até a prova.",
    free: true,
    cta: "Baixar PDF",
  },

  {
    id: "repertorio-basico",
    icon: "📚",
    title: "Frases de Repertório Sociocultural",
    description:
      "Lista curta de citações e dados prontos para usar na redação.",
    free: true,
    cta: "Ver lista",
  },
];



export const paidProducts: Product[] = [

  {
    id: "corretor-ia",
    icon: "🤖",
    title: "Teste sua Nota com IA",
    description:
      "Cole sua redação e receba nota estimada por competência, com feedback detalhado em segundos.",
    price: "R$ 4,90 por correção",
    gradient: "from-amber-400 to-orange-500",
    cta: "Corrigir minha redação",
  },


  {
    id: "simulador",
    icon: "⏱️",
    title: "Simulador Cronometrado",
    description:
      "Treine com um tema sorteado e cronômetro de 1h — a mesma pressão da prova real.",
    price: "R$ 9,90 — acesso ilimitado",
    gradient: "from-orange-400 to-red-500",
    cta: "Começar simulado",
  },


  {
    id: "repertorio-ia",
    icon: "💎",
    title: "Gerador de Repertório Personalizado",
    description:
      "A IA sugere dados, citações e referências específicas para o seu tema.",
    price: "R$ 6,90 por geração",
    gradient: "from-amber-400 to-yellow-500",
    cta: "Gerar repertório",
  },


  {
    id: "plano-ia",
    icon: "📈",
    title: "Plano de Estudos com IA",
    description:
      "Cronograma semanal personalizado com base no seu tempo e matérias fracas.",
    price: "R$ 12,90 — plano completo",
    gradient: "from-yellow-400 to-orange-500",
    cta: "Gerar meu plano",
  },


  {
    id: "banco-redacoes",
    icon: "🏆",
    title: "Banco de Redações Nota 1000",
    description:
      "Redações reais comentadas, mostrando exatamente por que tiraram nota máxima.",
    price: "R$ 14,90 — acesso vitalício",
    gradient: "from-orange-400 to-amber-500",
    cta: "Desbloquear banco",
  },

];
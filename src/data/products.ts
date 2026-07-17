export interface ProductPackage {
  id: string
  label: string
  price: string
  description?: string
  highlight?: boolean
  // TODO: cole aqui o link de checkout do Lastlink (ou outro gateway)
  // pra esse pacote específico.
  checkoutUrl?: string
}

export interface Product {
  id: string
  icon: string
  title: string
  description: string
  price?: string
  free?: boolean
  gradient?: string
  cta: string
  badge?: string
  socialProof?: string
  includes?: string[]
  packages?: ProductPackage[]
  firstFree?: boolean
  comparisonNote?: string
  // TODO: link de checkout (produtos pagos sem pacotes) ou link do
  // conteúdo de verdade (produtos grátis: PDF, vídeo, etc).
  checkoutUrl?: string
  contentUrl?: string
}

export const freeItems: Product[] = [
  {
    id: 'banco-temas',
    icon: '📋',
    title: 'Banco de Temas Prováveis',
    description: 'Lista atualizada com os temas de redação mais prováveis do ano.',
    free: true,
    cta: 'Baixar grátis',
    // TODO: link do PDF (Google Drive, Dropbox etc)
    contentUrl: undefined,
  },
  {
    id: 'video-erros',
    icon: '🎥',
    title: '5 Erros que Zeram sua Redação',
    description: 'Vídeo curto explicando os erros mais comuns e como evitá-los.',
    free: true,
    cta: 'Assistir agora',
    // TODO: link do vídeo (YouTube, Vimeo etc)
    contentUrl: undefined,
  },
  {
    id: 'cronograma-modelo',
    icon: '🗓️',
    title: 'Modelo de Cronograma de Estudos',
    description: 'Planilha simples para organizar suas semanas até a prova.',
    free: true,
    cta: 'Baixar PDF',
    // TODO: link do PDF/planilha
    contentUrl: undefined,
  },
  {
    id: 'repertorio-basico',
    icon: '📚',
    title: 'Frases de Repertório Sociocultural',
    description: 'Lista curta de citações e dados prontos para usar na redação.',
    free: true,
    cta: 'Ver lista',
    // TODO: link do conteúdo
    contentUrl: undefined,
  },
]

// Produto âncora — o primeiro passo óbvio, destacado sozinho no topo.
// Vendido em pacotes de crédito (em vez de avulso) pra não perder
// margem com taxa de gateway, e com a 1ª correção grátis pra reduzir
// o risco de quem nunca usou o produto.
export const anchorProduct: Product = {
  id: 'corretor-ia',
  icon: '🤖',
  title: 'Teste sua Nota com IA',
  description: 'Cole sua redação e receba nota estimada por competência, com feedback detalhado em segundos.',
  price: 'A partir de R$ 12,90 (1ª correção grátis)',
  gradient: 'from-amber-400 to-orange-500',
  cta: 'Corrigir minha redação',
  badge: 'COMECE POR AQUI',
  firstFree: true,
  packages: [
    {
      id: 'pacote-3',
      label: '3 correções',
      price: 'R$ 12,90',
      description: 'R$ 4,30 por correção',
      // TODO: link de checkout do pacote de 3
      checkoutUrl: undefined,
    },
    {
      id: 'pacote-10',
      label: '10 correções',
      price: 'R$ 34,90',
      description: 'R$ 3,49 por correção',
      highlight: true,
      // TODO: link de checkout do pacote de 10
      checkoutUrl: undefined,
    },
  ],
}

// Combo — todas as ferramentas, com desconto, para quem já testou o âncora
export const comboProduct: Product = {
  id: 'combo-completo',
  icon: '🎁',
  title: 'Combo Completo',
  description: 'Todas as 5 ferramentas premium liberadas: correções ilimitadas, simulador, repertório, plano de estudos e banco de redações.',
  price: 'R$ 29,90',
  gradient: 'from-fuchsia-500 to-purple-700',
  cta: 'Quero tudo com desconto',
  badge: 'MELHOR OFERTA',
  socialProof: 'A escolha de quem quer resultado completo',
  comparisonNote: 'Separado sairia R$ 57,50 — no combo você paga R$ 29,90',
  includes: [
    'Correções ilimitadas com IA',
    'Simulador Cronometrado',
    'Gerador de Repertório Personalizado',
    'Plano de Estudos com IA',
    'Banco de Redações Nota 1000',
  ],
  // TODO: link de checkout do combo
  checkoutUrl: undefined,
}

export const paidProducts: Product[] = [
  anchorProduct,
  {
    id: 'simulador',
    icon: '⏱️',
    title: 'Simulador Cronometrado',
    description: 'Treine com um tema sorteado e cronômetro de 1h — a mesma pressão da prova real.',
    price: 'R$ 9,90 — acesso ilimitado',
    gradient: 'from-orange-400 to-red-500',
    cta: 'Começar simulado',
    // TODO: link de checkout
    checkoutUrl: undefined,
  },
  {
    id: 'repertorio-ia',
    icon: '💎',
    title: 'Gerador de Repertório Personalizado',
    description: 'A IA sugere dados, citações e referências específicas para o seu tema.',
    price: 'R$ 6,90 por geração',
    gradient: 'from-amber-400 to-yellow-500',
    cta: 'Gerar repertório',
    // TODO: link de checkout
    checkoutUrl: undefined,
  },
  {
    id: 'plano-ia',
    icon: '📈',
    title: 'Plano de Estudos com IA',
    description: 'Cronograma semanal personalizado com base no seu tempo e matérias fracas.',
    price: 'R$ 12,90 — plano completo',
    gradient: 'from-yellow-400 to-orange-500',
    cta: 'Gerar meu plano',
    // TODO: link de checkout
    checkoutUrl: undefined,
  },
  {
    id: 'banco-redacoes',
    icon: '🏆',
    title: 'Banco de Redações Nota 1000',
    description: 'Redações reais comentadas, mostrando exatamente por que tiraram nota máxima.',
    price: 'R$ 14,90 — acesso vitalício',
    gradient: 'from-orange-400 to-amber-500',
    cta: 'Desbloquear banco',
    // TODO: link de checkout
    checkoutUrl: undefined,
  },
]

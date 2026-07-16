# Redação Nota Máxima — SaaS ENEM

Funil completo: quiz de diagnóstico → resultado → painel `/acesso` com conteúdo
grátis e 5 ferramentas pagas.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` para o quiz, ou `http://localhost:5173/acesso`
para ir direto ao painel.

## Estrutura

```
src/
├── components/
│   ├── QuizStep.tsx        # Tela de pergunta do quiz
│   ├── ProgressBar.tsx
│   ├── DiagnosisLoading.tsx
│   ├── Result.tsx           # Tela de resultado, leva para /acesso
│   ├── BottomNav.tsx        # Navegação inferior do painel
│   ├── ProductCard.tsx      # Card de item grátis ou pago
│   ├── PaywallModal.tsx     # Modal ao clicar em item pago
│   └── Simulador.tsx        # Simulador cronometrado (funcional)
├── pages/
│   └── Acesso.tsx           # Painel principal /acesso
├── data/
│   ├── quiz.ts               # Perguntas do quiz
│   └── products.ts           # Itens grátis + 5 produtos pagos
└── App.tsx                   # Roteamento simples (quiz vs /acesso)
```

## O que já funciona de verdade

- **Quiz completo** — 6 perguntas, progress bar, voltar
- **Simulador Cronometrado** — 100% funcional: tema sorteado, timer de 1h,
  contador de palavras, sem precisar de backend

## O que precisa ser conectado (próximos passos)

1. **Autenticação** — hoje qualquer um acessa `/acesso` direto pela URL.
   Precisa de Firebase Auth (ou similar) + verificação de login antes de
   mostrar o painel.

2. **Checkout dos produtos pagos** — o arquivo `PaywallModal.tsx` tem um
   `alert()` de exemplo no lugar do checkout real. Troque a função
   `handleCheckout()` pela URL de pagamento de cada produto (Lastlink,
   Stripe, etc). Você pode ter um link de checkout diferente por produto.

3. **Corretor de Redação com IA** — precisa de uma API route (Vercel
   Functions) que recebe o texto da redação e chama a API da OpenAI ou
   Claude com um prompt de correção. Ver conversa anterior para o modelo
   de prompt sugerido.

4. **Gerador de Repertório e Plano de Estudos com IA** — mesma lógica do
   corretor, reaproveitando a mesma API route com prompts diferentes.

5. **Conteúdo dos itens grátis** — hoje os cliques mostram um `alert()`.
   Troque por links reais de PDF, vídeo, etc.

## Publicar

1. Sobe no GitHub
2. Importa na Vercel
3. Build command: `npm run build` — Output: `dist`

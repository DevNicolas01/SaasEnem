import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import type { QuizAnswers } from '../data/quiz'

/**
 * Verifica se um email já tem conta cadastrada.
 * Usa isso ANTES de tentar criar conta, para redirecionar
 * direto pro login em vez de dar erro.
 */
export async function emailJaExiste(email: string): Promise<boolean> {
  const methods = await fetchSignInMethodsForEmail(auth, email)
  return methods.length > 0
}

/**
 * Gera uma senha aleatória segura — nunca reutilizada, nunca
 * conhecida por ninguém. O usuário real define sua senha depois,
 * através do link de redefinição enviado por email.
 */
function gerarSenhaTemporariaAleatoria(): string {
  const array = new Uint8Array(24)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function createAccount(
  name: string,
  email: string,
  whatsapp: string,
  quizAnswers?: QuizAnswers
) {
  // Senha aleatória, forte, que NINGUÉM vai usar — é só para
  // satisfazer a API do Firebase Auth. O usuário define a senha
  // real através do email de redefinição enviado logo em seguida.
  const senhaAleatoria = gerarSenhaTemporariaAleatoria()

  const userCredential = await createUserWithEmailAndPassword(auth, email, senhaAleatoria)
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email,
    whatsapp,
    plano: 'nenhum',
    quizAnswers: quizAnswers ?? null,
    createdAt: serverTimestamp(),
  })

  // Envia o email para o usuário definir a PRÓPRIA senha antes de
  // conseguir logar de verdade. Isso fecha a brecha de segurança.
  await sendPasswordResetEmail(auth, email)

  return user
}
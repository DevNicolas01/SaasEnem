import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
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
 * conhecida por ninguém. Serve só para satisfazer a API do Firebase
 * Auth na hora da criação da conta; o usuário define a senha real
 * depois, na aba "Perfil" de /acesso (ver definePassword).
 */
function gerarSenhaTemporariaAleatoria(): string {
  const array = new Uint8Array(24)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function createAccount(
  name: string,
  email: string,
  quizAnswers?: QuizAnswers
) {
  const senhaAleatoria = gerarSenhaTemporariaAleatoria()

  // createUserWithEmailAndPassword já deixa o usuário autenticado
  // nesta sessão — é por isso que ele consegue definir a própria
  // senha depois em /acesso sem precisar logar de novo.
  const userCredential = await createUserWithEmailAndPassword(auth, email, senhaAleatoria)
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email,
    plano: 'nenhum',
    senhaDefinida: false,
    quizAnswers: quizAnswers ?? null,
    createdAt: serverTimestamp(),
  })

  return user
}

/**
 * Login para quem já tem conta.
 */
export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

/**
 * Fallback de "esqueci minha senha" — importante como rede de
 * segurança: se a pessoa nunca chegou a criar a própria senha em
 * /acesso e sumiu, ainda consegue recuperar o acesso por aqui.
 */
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email)
}

/**
 * Define a senha real do usuário — chamada a partir da aba
 * "Perfil" em /acesso, logo após a criação da conta (ou quando o
 * usuário quiser trocar a senha depois).
 */
export async function definePassword(newPassword: string) {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado.')
  }

  await updatePassword(auth.currentUser, newPassword)

  await setDoc(
    doc(db, 'users', auth.currentUser.uid),
    { senhaDefinida: true },
    { merge: true }
  )
}

/**
 * Busca os dados do usuário logado no Firestore (nome, se já
 * definiu senha, etc).
 */
export async function getUserProfile() {
  if (!auth.currentUser) return null
  const snap = await getDoc(doc(db, 'users', auth.currentUser.uid))
  return snap.exists() ? (snap.data() as Record<string, unknown>) : null
}

/**
 * Exclui a conta do usuário — dados do Firestore + o próprio login
 * no Firebase Auth. Usado no "excluir minha conta" do Perfil
 * (requisito da LGPD: a pessoa precisa conseguir apagar seus dados).
 * Igual ao updatePassword, o Firebase pode exigir login recente
 * (auth/requires-recent-login) por segurança.
 */
export async function deleteAccount() {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado.')
  }

  const uid = auth.currentUser.uid
  await deleteDoc(doc(db, 'users', uid))
  await deleteUser(auth.currentUser)
}

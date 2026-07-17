import { db } from './firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit as fsLimit,
} from 'firebase/firestore'

export type EventName =
  | 'quiz_start'
  | 'quiz_complete'
  | 'lead_captured'
  | 'result_view'
  | 'acesso_view'
  | 'product_click'
  | 'combo_click'
  | 'checkout_click'
  | 'simulador_start'
  | 'simulador_complete'
  | 'login'
  | 'password_defined'

export interface TrackedEvent {
  id?: string
  event: EventName
  meta?: Record<string, string | number>
  createdAt?: unknown
}

export async function trackEvent(event: EventName, meta?: Record<string, string | number>) {
  try {
    await addDoc(collection(db, 'events'), {
      event,
      meta: meta ?? {},
      createdAt: serverTimestamp(),
    })
  } catch (err) {
    // Nunca deixa um erro de tracking quebrar a experiência do usuário
    console.error('Erro ao registrar evento:', err)
  }
}

/**
 * Busca os eventos mais recentes, com um teto (`max`) pra não puxar
 * a coleção inteira conforme ela cresce — sem isso, com muito
 * volume essa query fica lenta e cara.
 */
export async function getAllEvents(max = 1000): Promise<TrackedEvent[]> {
  const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'), fsLimit(max))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TrackedEvent))
}
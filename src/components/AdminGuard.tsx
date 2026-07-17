import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUserProfile } from '../services/leadService'

interface AdminGuardProps {
  children: ReactNode
}

/**
 * Além de exigir login (como o AuthGuard), confere se o documento
 * do usuário em /users tem isAdmin === true. Esse campo só pode ser
 * ativado manualmente pelo Console do Firebase — nunca pelo app
 * (ver firestore.rules).
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setIsAdmin(false)
        setChecking(false)
        return
      }

      const profile = await getUserProfile()
      setIsAdmin(Boolean(profile?.isAdmin))
      setChecking(false)
    })
    return unsubscribe
  }, [])

  if (checking) {
    return (
      <main className="min-h-dvh bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando...</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/acesso" replace />
  }

  return <>{children}</>
}

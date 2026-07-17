import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Bloqueia o acesso a rotas protegidas (ex: /acesso) enquanto o
 * usuário não estiver logado no Firebase Auth. Enquanto verifica,
 * mostra um loading — nunca deixa a página "piscar" o conteúdo
 * protegido antes de confirmar a sessão.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <main className="min-h-dvh bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

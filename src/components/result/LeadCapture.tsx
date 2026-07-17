import { useState, type FormEvent } from "react";
import { createAccount, emailJaExiste, login } from "../../services/leadService";
import { trackEvent } from "../../services/eventService";
import { saveStorage } from "../../services/storageService";
import type { QuizAnswers } from "../../data/quiz";

interface LeadCaptureProps {
  quizAnswers: QuizAnswers;
  onContinue: () => void;
}

type Mode = "criar" | "entrar";

export default function LeadCapture({
  quizAnswers,
  onContinue,
}: LeadCaptureProps) {
  const [mode, setMode] = useState<Mode>("criar");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function switchMode(next: Mode) {
    setError("");
    setMode(next);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const jaExiste = await emailJaExiste(email);
      if (jaExiste) {
        setLoading(false);
        setMode("entrar");
        setError("Esse email já tem conta — entre com sua senha abaixo.");
        return;
      }

      await createAccount(name, email, quizAnswers);
      await trackEvent("lead_captured", { email });

      saveStorage("user", { name, email });

      onContinue();
    } catch (err: any) {
      console.error(err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setMode("entrar");
          setError("Esse email já está cadastrado. Entre com sua senha abaixo.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        default:
          setError(err.message || "Erro ao criar conta.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      await trackEvent("login", { email });
      onContinue();
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("Email ou senha incorretos.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        default:
          setError("Não foi possível entrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-slate-950 px-5 py-10 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <span className="text-amber-400 text-sm font-bold">
          🎯 Diagnóstico quase pronto
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-3">
          {mode === "criar"
            ? "Falta pouco para ver seu plano completo"
            : "Bem-vindo de volta"}
        </h1>
        <p className="text-slate-400 mb-8">
          {mode === "criar"
            ? "Informe seus dados para desbloquear seu diagnóstico personalizado e criar seu acesso."
            : "Entre com seu email e senha para ver seu diagnóstico."}
        </p>

        {mode === "criar" ? (
          <form
            onSubmit={handleCreate}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-white rounded-2xl px-4 py-4 text-black mb-4"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              className="w-full bg-white rounded-2xl px-4 py-4 text-black mb-6"
            />

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl disabled:opacity-50"
            >
              {loading ? "Criando acesso..." : "Ver meu diagnóstico →"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleLogin}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              className="w-full bg-white rounded-2xl px-4 py-4 text-black mb-4"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full bg-white rounded-2xl px-4 py-4 text-black mb-6"
            />

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar →"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-400 mt-5">
          {mode === "criar" ? (
            <>
              Já tem uma conta?{" "}
              <button
                onClick={() => switchMode("entrar")}
                className="text-amber-400 font-semibold hover:underline"
              >
                Fazer login
              </button>
            </>
          ) : (
            <>
              Ainda não tem conta?{" "}
              <button
                onClick={() => switchMode("criar")}
                className="text-amber-400 font-semibold hover:underline"
              >
                Criar acesso
              </button>
            </>
          )}
        </p>

        <p className="text-center text-xs text-slate-500 mt-3">
          🔒 Seus dados estão seguros e não serão compartilhados
        </p>
      </div>
    </main>
  );
}
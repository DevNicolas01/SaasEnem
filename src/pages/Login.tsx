import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, resetPassword } from "../services/leadService";

const styles = {
  page: "min-h-dvh bg-slate-950 px-5 py-10 flex items-center",
  container: "max-w-md mx-auto w-full",
  title: "text-3xl font-bold text-white mb-3",
  description: "text-slate-400 mb-8",
  form: "bg-white/5 border border-white/10 rounded-3xl p-6",
  input: "w-full bg-white rounded-2xl px-4 py-4 text-black mb-4",
  action:
    "w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl disabled:opacity-50",
  forgot: "block text-center text-amber-400 text-sm font-semibold mt-4 hover:underline",
  footer: "text-center text-sm text-slate-400 mt-5",
  link: "text-amber-400 font-semibold hover:underline",
  error: "text-red-400 text-sm mb-4",
  info: "text-emerald-400 text-sm mb-4",
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email.trim() || !password.trim()) {
      setError("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/acesso");
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
        case "auth/too-many-requests":
          setError("Muitas tentativas. Tente novamente em alguns minutos.");
          break;
        default:
          setError("Não foi possível entrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setInfo("");

    if (!email.trim()) {
      setError("Digite seu email acima para receber o link de redefinição.");
      return;
    }

    try {
      await resetPassword(email);
      setInfo("Enviamos um link de redefinição para o seu email.");
    } catch {
      setError("Não foi possível enviar o email. Confira o endereço digitado.");
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo de volta 👋</h1>
        <p className={styles.description}>
          Entre com seu email e senha para acessar sua área.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}
          {info && <p className={styles.info}>{info}</p>}

          <button type="submit" disabled={loading} className={styles.action}>
            {loading ? "Entrando..." : "Entrar →"}
          </button>
        </form>

        <button onClick={handleForgotPassword} className={styles.forgot}>
          Esqueci minha senha
        </button>

        <p className={styles.footer}>
          Ainda não tem conta?{" "}
          <Link to="/" className={styles.link}>
            Fazer o diagnóstico grátis
          </Link>
        </p>
      </div>
    </main>
  );
}

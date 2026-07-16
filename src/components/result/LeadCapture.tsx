import { useState } from "react";

import { createAccount } from "../../services/leadService";

interface LeadCaptureProps {
  onContinue: () => void;
}

export default function LeadCapture({ onContinue }: LeadCaptureProps) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Preencha todos os campos.");

      return;
    }

    try {
      setLoading(true);

      const user = await createAccount(name, email);

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          name,
          email,
        }),
      );

      window.location.assign("/acesso");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Esse email já está cadastrado.");

          break;

        case "auth/invalid-email":
          alert("Email inválido.");

          break;

        default:
          alert(error.message || "Erro ao criar conta.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
      min-h-dvh
      bg-slate-950
      px-5
      py-10
      flex
      items-center
      "
    >
      <div
        className="
        max-w-md
        mx-auto
        w-full
        "
      >
        <span
          className="
          text-amber-400
          text-sm
          font-bold
          "
        >
          🎯 Diagnóstico concluído
        </span>

        <h1
          className="
          text-3xl
          font-bold
          text-white
          mt-4
          mb-4
          "
        >
          Seu plano personalizado está pronto
        </h1>

        <p
          className="
          text-slate-400
          mb-8
          "
        >
          Informe seus dados para liberar seu acesso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="
            w-full
            bg-white
            rounded-2xl
            px-4
            py-4
            text-black
            mb-4
            "
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            className="
            w-full
            bg-white
            rounded-2xl
            px-4
            py-4
            text-black
            mb-6
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-gradient-to-r
            from-amber-400
            to-orange-500
            text-slate-950
            font-bold
            py-4
            rounded-2xl
            disabled:opacity-50
            "
          >
            {loading ? "Criando acesso..." : "Criar acesso →"}
          </button>
        </form>

        <p
          className="
          text-center
          text-xs
          text-slate-500
          mt-5
          "
        >
          🔒 Seus dados estão seguros
        </p>
      </div>
    </main>
  );
}

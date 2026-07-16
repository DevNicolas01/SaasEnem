import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../services/firebase";


export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();


    try {

      setLoading(true);


      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      window.location.href = "/acesso";


    } catch (error) {

      console.error(error);

      alert("Email ou senha incorretos.");

    } finally {

      setLoading(false);

    }

  }



  return (

    <main className="
      min-h-dvh
      bg-slate-950
      flex
      items-center
      px-5
    ">


      <div className="
        max-w-md
        w-full
        mx-auto
      ">


        <h1 className="
          text-3xl
          font-bold
          text-white
          mb-6
        ">
          Entrar na sua conta
        </h1>



        <form
          onSubmit={handleLogin}
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >


          <input

            type="email"

            placeholder="Seu email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

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

            type="password"

            placeholder="Sua senha"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

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
            "

          >

            {loading ? "Entrando..." : "Entrar →"}

          </button>


        </form>


      </div>


    </main>

  );

}
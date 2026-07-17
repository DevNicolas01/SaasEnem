import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Acesso from "./pages/Acesso";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import AuthGuard from "./components/AuthGuard";
import AdminGuard from "./components/AdminGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ACESSO — só entra quem está logado */}
        <Route
          path="/acesso"
          element={
            <AuthGuard>
              <Acesso />
            </AuthGuard>
          }
        />

        {/* ADMIN — só entra quem está logado E é admin */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <Admin />
            </AdminGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

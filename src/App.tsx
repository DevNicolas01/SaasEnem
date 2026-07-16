import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Acesso from "./pages/Acesso";
import Login from "./pages/Login";

import AuthGuard from "./components/AuthGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        <Route path="/acesso" element={<Acesso />} />
      </Routes>
    </BrowserRouter>
  );
}

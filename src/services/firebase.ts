import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// As chaves de config do Firebase Web não são segredo — a proteção
// dos dados vem das regras do Firestore/Auth, não do sigilo dessas
// chaves. Ainda assim, usar variáveis de ambiente (.env) ajuda a ter
// projetos separados por ambiente (dev/staging/produção) sem editar
// código. Se as VITE_FIREBASE_* não existirem, cai no valor atual.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDrT575Q-nmIaPN_lD-6_xrvofsQ2DMgWo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "saasenem-9bc38.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "saasenem-9bc38",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "saasenem-9bc38.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID ?? "964821776858",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:964821776858:web:f21b1387453c36e8abe8e3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-4NMN7W2TD9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

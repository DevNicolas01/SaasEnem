import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrT575Q-nmIaPN_lD-6_xrvofsQ2DMgWo",
  authDomain: "saasenem-9bc38.firebaseapp.com",
  projectId: "saasenem-9bc38",
  storageBucket: "saasenem-9bc38.firebasestorage.app",
  messagingSenderId: "964821776858",
  appId: "1:964821776858:web:f21b1387453c36e8abe8e3",
  measurementId: "G-4NMN7W2TD9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

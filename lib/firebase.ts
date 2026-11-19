
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8W5kr1FG7IY3scuuKDP2WBeFHKA48ang",
  authDomain: "cinema-sd-81fac.firebaseapp.com",
  projectId: "cinema-sd-81fac",
  storageBucket: "cinema-sd-81fac.firebasestorage.app",
  messagingSenderId: "1090090214463",
  appId: "1:1090090214463:web:8b88cf7dd3e844274dc48a"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA2LaJeLOlVS4N-G0YIWJ0FWVwB2USkQoE",
  authDomain: "swyft-trust.firebaseapp.com",
  projectId: "swyft-trust",
  storageBucket: "swyft-trust.appspot.com",
  messagingSenderId: "973091774002",
  appId: "1:973091774002:web:39c52b11b8fbadaf1f262b",
  measurementId: "G-4YTVFJFPGR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

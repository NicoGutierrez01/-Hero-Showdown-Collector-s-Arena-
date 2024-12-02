// src/services/auth.js
import { auth, googleProvider, signInAnonymously } from './firebaseConfig';
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInAnonymously = () => signInAnonymously(auth);
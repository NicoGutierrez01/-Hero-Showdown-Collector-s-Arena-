// src/services/firestore.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

const scoresCollection = collection(db, "scores");

export const addScore = async ( jawas, puntos, tiempo) => {
  try {
    await addDoc(scoresCollection, { jawas, puntos, tiempo });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getScores = async () => {
  const querySnapshot = await getDocs(scoresCollection);
  const scores = [];
  querySnapshot.forEach((doc) => {
    scores.push(doc.data());
  });
  return scores;
};
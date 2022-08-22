import {
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import { HighScore } from "../types";

import { app } from "../utils/firebase";

const db = getFirestore(app);

export const highScoresCollection = collection(db, "fives_high_scores");

export const fetchHighScores = () => {};

export const addHighScore = (highScore: HighScore) => {};

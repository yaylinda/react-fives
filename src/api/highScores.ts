import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import { HighScore, HighScoreDoc } from "../types";

import { app } from "../utils/firebase";

const db = getFirestore(app);

export const highScoresCollection = collection(db, "fives_high_scores");

/**
 *
 * @returns
 */
export const fetchHighScores = async (): Promise<HighScoreDoc[]> => {
  const highScores: HighScoreDoc[] = [];
  const querySnapshot = await getDocs(highScoresCollection);
  querySnapshot.forEach((doc) => {
    highScores.push({ ...doc.data() } as HighScoreDoc);
  });
  return highScores;
};

/**
 *
 * @param highScore
 * @returns
 */
export const postHighScore = async (highScore: HighScore): Promise<void> => {
  const highScoreDoc: HighScoreDoc = {
    ...highScore,
    timestamp: Timestamp.now(),
  };

  try {
    return await setDoc(doc(highScoresCollection), highScoreDoc);
  } catch (e) {
    throw new Error(`Error posting high score: ${JSON.stringify(e)}`);
  }
};

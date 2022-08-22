import create from "zustand";
import { HighScore } from "../types";

interface HighScoresState {
  loading: boolean;
  scores: HighScore[];
  addHighScore: (highScore: HighScore) => void;
  fetchHighScores: () => void;
}

const useHighScoresStore = create<HighScoresState>()((set, get) => ({
  loading: false,
  scores: [],
  addHighScore: () => set((state) => state),
  fetchHighScores: () => set((state) => state),
}));

export default useHighScoresStore;

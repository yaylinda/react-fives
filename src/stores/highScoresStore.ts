import create from "zustand";
import { HighScore } from "../types";

interface HighScoresState {
  showDialog: boolean;
  loading: boolean;
  scores: HighScore[];
  openDialog: () => void;
  closeDialog: () => void;
  addHighScore: (highScore: HighScore) => void;
  fetchHighScores: () => void;
}

const useHighScoresStore = create<HighScoresState>()((set, get) => ({
  showDialog: false,
  loading: false,
  scores: [],
  openDialog: () => set((state) => ({ ...state, showDialog: true })),
  closeDialog: () => set((state) => ({ ...state, showDialog: false })),
  addHighScore: () => set((state) => state),
  fetchHighScores: () => set((state) => state),
}));

export default useHighScoresStore;

import create from "zustand";
import { HighScore } from "../types";

interface HighScoresState {
  scores: HighScore[];
}

const useHighScoresStore = create<HighScoresState>()((set, get) => ({
  scores: [],
}));

export default useHighScoresStore;

import create from "zustand";
import { HighScore } from "../types";

interface HighScoresState {
  showDialog: boolean;
  loading: boolean;
  posting: boolean;
  successfullyPosted: boolean;
  showPostScoreDialog: boolean;
  scores: HighScore[];
  lastUploadedGameId: string;
  openDialog: () => void;
  closeDialog: () => void;
  openPostScoreDialog: () => void;
  closePostScoreDialog: () => void;
  fetchHighScores: () => void;
}

const useHighScoresStore = create<HighScoresState>()((set, get) => ({
  showDialog: false,
  loading: false,
  posting: false,
  successfullyPosted: false,
  showPostScoreDialog: false,
  scores: [],
  lastUploadedGameId: "",
  openDialog: () => set((state) => ({ ...state, showDialog: true })),
  closeDialog: () => set((state) => ({ ...state, showDialog: false })),
  openPostScoreDialog: () =>
    set((state) => ({ ...state, showPostScoreDialog: true })),
  closePostScoreDialog: () =>
    set((state) => ({ ...state, showPostScoreDialog: false })),
  fetchHighScores: () => set((state) => state),
}));

export default useHighScoresStore;

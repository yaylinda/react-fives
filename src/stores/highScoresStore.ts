import { FlashOnOutlined } from "@mui/icons-material";
import create from "zustand";
import { HighScore } from "../types";

interface HighScoresState {
  loading: boolean;
  showHighScoresDialog: boolean;
  posting: boolean;
  successfullyPosted: boolean;
  showPostScoreDialog: boolean;
  scores: HighScore[];
  lastPostedGameId: string | null;
  openHighScoresDialog: () => void;
  closeHighScoresDialog: () => void;
  openPostScoreDialog: () => void;
  closePostScoreDialog: () => void;
  startPosting: () => void;
  resetPosting: () => void;
  setPostedSuccess: (gameId: string) => void;
  setPostedFailed: () => void;
  fetchHighScores: () => void;
}

const useHighScoresStore = create<HighScoresState>()((set, get) => ({
  loading: false,
  showHighScoresDialog: false,
  posting: false,
  successfullyPosted: false,
  showPostScoreDialog: false,
  scores: [],
  lastPostedGameId: null,
  openHighScoresDialog: () =>
    set((state) => ({ ...state, showHighScoresDialog: true })),
  closeHighScoresDialog: () =>
    set((state) => ({ ...state, showHighScoresDialog: false })),
  openPostScoreDialog: () =>
    set((state) => ({ ...state, showPostScoreDialog: true })),
  closePostScoreDialog: () =>
    set((state) => ({ ...state, showPostScoreDialog: false })),
  resetPosting: () =>
    set((state) => ({ ...state, posting: false, successfullyPosted: false })),
  startPosting: () =>
    set((state) => ({ ...state, posting: true, successfullyPosted: false })),
  setPostedSuccess: (gameId: string) =>
    set((state) => ({
      ...state,
      posting: false,
      successfullyPosted: true,
      lastPostedGameId: gameId,
      showPostScoreDialog: false,
    })),
  setPostedFailed: () =>
    set((state) => ({
      ...state,
      posting: false,
      successfullyPosted: false,
      lastPostedGameId: null,
      showPostScoreDialog: false,
    })),
  fetchHighScores: () => set((state) => state),
}));

export default useHighScoresStore;

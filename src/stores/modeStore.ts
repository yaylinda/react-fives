import create from "zustand";

import { GameMode } from "../types";
import { GAME_MODE } from "../utils/constants";

export const DEFAULT_MODE = GameMode.FIVE_BY_FIVE;

interface ModeState {
  init: () => void,
  updateMode: (mode: GameMode) => void,
  mode: GameMode,
}

const useModeStore = create<ModeState>()((set, get) => ({
  mode: GameMode.FIVE_BY_FIVE,
  updateMode: (mode: GameMode) => set((state) => {
    window.localStorage.setItem(GAME_MODE, mode);
    return { ...state, mode }
  }),
  init: () => set((state) => {
    const gameMode = window.localStorage.getItem(GAME_MODE);
    if (gameMode) {
      return {
        ...state,
        mode: GameMode[gameMode as keyof typeof GameMode]
      }
    }

    window.localStorage.setItem(GAME_MODE, DEFAULT_MODE);

    return {
      ...state,
      mode: DEFAULT_MODE,
    };
  }),
}));

export default useModeStore;
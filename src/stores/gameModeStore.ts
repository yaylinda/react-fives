import create from "zustand";

import { GameMode } from "../types";
import { GAME_MODE } from "../utils/constants";

export const DEFAULT_MODE = GameMode.FIVE_BY_FIVE;

interface GameModeState {
  mode: GameMode,
  showNewGameModeSelectionDialog: boolean;
  init: () => void,
  updateMode: (mode: GameMode) => void,
  openNewGameModeSelectionDialog: () => void;
  closeNewGameModeSelectionDialog: () => void;
}

const useGameModeStore = create<GameModeState>()((set, get) => ({
  mode: GameMode.FIVE_BY_FIVE,
  showNewGameModeSelectionDialog: false,

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

  /**
  *
  * @returns
  */
  openNewGameModeSelectionDialog: () =>
    set((state) => ({ ...state, showNewGameModeSelectionDialog: true })),

  /**
   *
   * @returns
   */
  closeNewGameModeSelectionDialog: () =>
    set((state) => ({ ...state, showNewGameModeSelectionDialog: false })),
}));

export default useGameModeStore;
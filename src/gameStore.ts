import create from "zustand";
import { MoveDirection } from "./types";

export interface GameState {
  move: (dir: MoveDirection) => void;
}

const useGameStore = create<GameState>()((set) => ({
  move: (dir: MoveDirection) =>
    set((state) => {
      console.log(`[gameStore][move] direction: ${dir}`);
      return state;
    }),
}));

export default useGameStore;

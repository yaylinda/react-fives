import create from "zustand";
import { CellData, MoveDirection } from "./types";
import {
  getCoordinatesForNewCell,
  initBoard,
  isGameOver,
  moveOnBoard,
  randomCellValue,
  randomCol,
  randomRow,
} from "./utils";

export interface GameState {
  hasStarted: boolean;
  board: CellData[][];
  isGameOver: boolean;
  move: (dir: MoveDirection) => void;
  newGame: () => void;
  closeGameOverDialog: () => void;
}

const useGameStore = create<GameState>()((set) => ({
  hasStarted: false,
  board: initBoard(),
  isGameOver: false,

  /**
   *
   * @param dir
   * @returns
   */
  move: (dir: MoveDirection) =>
    set((state) => {
      if (!state.hasStarted) {
        console.log(`[gameStore][move] game has not started. no-op`);
        return state;
      }

      console.log(`[gameStore][move] direction: ${dir}`);

      const board = moveOnBoard(state.board, dir);

      const { col, row } = getCoordinatesForNewCell(board, dir);
      board[row][col] = { value: randomCellValue() };

      return {
        ...state,
        board: [...board],
        isGameOver: isGameOver(board),
      };
    }),

  /**
   *
   * @returns
   */
  newGame: () =>
    set((state) => {
      const board = initBoard();

      const row = randomRow();
      const col = randomCol();

      board[row][col] = { value: randomCellValue() };

      return {
        board: board,
        hasStarted: true,
        isGameOver: false,
      };
    }),

  /**
   *
   * @returns
   */
  closeGameOverDialog: () => set((state) => ({ ...state, isGameOver: false })),
}));

export default useGameStore;

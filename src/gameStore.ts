import create from "zustand";
import { CellData, MoveDirection } from "./types";
import {
  getCoordinatesForNewCell,
  initBoard,
  moveOnBoard,
  randomCellValue,
  randomCol,
  randomRow,
} from "./utils";

export interface GameState {
  hasStarted: boolean;
  board: CellData[][];
  move: (dir: MoveDirection) => void;
  newGame: () => void;
}

const useGameStore = create<GameState>()((set) => ({
  hasStarted: false,
  board: initBoard(),

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

      const { col, row } = getCoordinatesForNewCell(dir); // TODO - don't put new cell if occupied
      board[row][col] = { value: randomCellValue() };

      // TODO - detect if whole board is occupied

      return {
        ...state,
        board: [...board],
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
      };
    }),
}));

export default useGameStore;

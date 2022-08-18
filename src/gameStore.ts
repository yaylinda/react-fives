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
  showGameOverDialog: boolean;
  score: number;
  moves: number;
  move: (dir: MoveDirection) => void;
  newGame: () => void;
  closeGameOverDialog: () => void;
}

const useGameStore = create<GameState>()((set) => ({
  hasStarted: false,
  board: initBoard(),
  isGameOver: false,
  showGameOverDialog: false,
  score: 0,
  moves: 0,

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

      const { board, score } = moveOnBoard(state.board, dir);

      let moves = state.moves;
      const coords = getCoordinatesForNewCell(board, dir);
      if (coords != null) {
        board[coords.row][coords.col] = { value: randomCellValue() };
        moves = moves + 1;
      }

      const gameOver = isGameOver(board);

      return {
        ...state,
        board: [...board],
        isGameOver: gameOver,
        showGameOverDialog: gameOver,
        moves: moves,
        score: state.score + score,
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
        showGameOverDialog: false,
      };
    }),

  /**
   *
   * @returns
   */
  closeGameOverDialog: () =>
    set((state) => ({ ...state, showGameOverDialog: false })),
}));

export default useGameStore;

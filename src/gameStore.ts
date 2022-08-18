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
  merged: { [key in number]: number };
  generated: { [key in number]: number };
  nextValues: number[];
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
  merged: {},
  generated: {},
  nextValues: [],

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

      const { board, merged, score } = moveOnBoard(state.board, dir);

      let usedNextValue = false;
      let moves = state.moves;
      const coords = getCoordinatesForNewCell(board, dir);
      if (coords != null) {
        usedNextValue = true;
        const newValue = state.nextValues[0];
        board[coords.row][coords.col] = { value: newValue };

        if (!state.generated[newValue]) {
          state.generated[newValue] = 0;
        }
        state.generated[newValue] = state.generated[newValue] + 1;

        moves = moves + 1;
      }

      const gameOver = isGameOver(board);

      for (let key in merged) {
        if (!state.merged[key]) {
          state.merged[key] = 0;
        }
        state.merged[key] = state.merged[key] + merged[key];
      }

      return {
        ...state,
        board: [...board],
        isGameOver: gameOver,
        showGameOverDialog: gameOver,
        moves: moves,
        score: state.score + score,
        merged: { ...state.merged },
        generated: { ...state.generated },
        nextValues: usedNextValue
          ? [state.nextValues[1], state.nextValues[2], randomCellValue()]
          : [...state.nextValues],
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

      const newValue = randomCellValue();
      board[row][col] = { value: newValue };

      if (!state.generated[newValue]) {
        state.generated[newValue] = 0;
      }
      state.generated[newValue] = state.generated[newValue] + 1;

      return {
        ...state,
        board: board,
        hasStarted: true,
        isGameOver: false,
        showGameOverDialog: false,
        score: 0,
        moves: 0,
        generated: { ...state.generated },
        nextValues: [randomCellValue(), randomCellValue(), randomCellValue()], // TODO - 3 for now, maybe make this configurable
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

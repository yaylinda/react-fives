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
  nextValue: number;
  move: (dir: MoveDirection) => void;
  newGame: () => void;
  closeGameOverDialog: () => void;
}

// TODO - load game state storage and save to local storage

const useGameStore = create<GameState>()((set) => ({
  hasStarted: false,
  board: initBoard(),
  isGameOver: false,
  showGameOverDialog: false,
  score: 0,
  moves: 0,
  merged: {},
  generated: {},
  nextValue: 0,

  /**
   *
   * @param dir
   * @returns
   */
  move: (dir: MoveDirection) =>
    set((state) => {
      if (!state.hasStarted) {
        return state;
      }

      const { board, merged, score, moved } = moveOnBoard(state.board, dir);

      let usedNextValue = false;
      let moves = state.moves;
      const coords = getCoordinatesForNewCell(board, dir, moved);
      if (coords != null) {
        usedNextValue = true;
        const newValue = state.nextValue;
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
        nextValue: usedNextValue
          ? randomCellValue(state.merged, state.generated, moves)
          : state.nextValue,
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

      const newValue = randomCellValue({}, {}, 0);
      board[row][col] = { value: newValue };

      return {
        ...state,
        board: board,
        hasStarted: true,
        isGameOver: false,
        showGameOverDialog: false,
        score: 0,
        moves: 0,
        merged: {},
        generated: {},
        nextValue: randomCellValue({}, {}, 0),
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

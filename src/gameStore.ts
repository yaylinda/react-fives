import create from "zustand";
import { CellData, MoveDirection } from "./types";
import {
  getCoordinatesForNewCell,
  initBoard,
  isGameOver,
  moveOnBoard,
  NUM_COLS,
  NUM_ROWS,
  randomCellValue,
} from "./utils";

export interface GameState {
  hasStarted: boolean;
  board: CellData[][];
  previousBoard: CellData[][];
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
  getPreviousValue: (row: number, col: number) => number;
}

// TODO - load game state storage and save to local storage

const useGameStore = create<GameState>()((set, get) => ({
  hasStarted: false,
  previousBoard: initBoard(),
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

      const { board, merged, score, moved } = moveOnBoard(
        JSON.parse(JSON.stringify(state.board)),
        dir
      );

      let usedNextValue = false;
      let moves = state.moves;
      const coords = getCoordinatesForNewCell(board, dir, moved);
      if (coords != null) {
        usedNextValue = true;
        const newValue = state.nextValue;
        board[coords.row][coords.col] = {
          value: newValue,
          isNew: true,
          isMerge: false,
        };

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
        previousBoard: [...state.board],
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

      const newValue = randomCellValue({}, {}, 0);
      board[(NUM_ROWS - 1) / 2][(NUM_COLS - 1) / 2] = {
        value: newValue,
        isNew: true,
        isMerge: false,
      };

      return {
        ...state,
        board: board,
        previousBoard: [...state.board],
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

  /**
   *
   * @param row
   * @param col
   * @returns
   */
  getPreviousValue: (row: number, col: number): number =>
    get().previousBoard[row][col].value,
}));

export default useGameStore;

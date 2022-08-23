import create from "zustand";
import { TileData, MoveDirection, TileLocations } from "../types";
import {
  NUM_ROWS,
  NUM_COLS,
  LOCAL_STORAGE_GAME_STATE,
} from "../utils/constants";
import { getCoordinatesForNewTile } from "../utils/coordinates";
import { generateTileValue } from "../utils/generator";
import { convertBoardToLocations } from "../utils/locations";
import { mergeTiles } from "../utils/merger";
import { moveTiles } from "../utils/mover";
import { initBoard, initIntermediateBoard, isGameOver } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

export interface GameState {
  hasStarted: boolean;
  board: TileData[][];
  tileLocations: TileLocations;
  isGameOver: boolean;
  showGameOverDialog: boolean;
  score: number;
  moves: number;
  merged: { [key in number]: number };
  generated: { [key in number]: number };
  nextValue: number;
  lastMoveDirection: MoveDirection | null;
  currentGameId: string;
  move: (dir: MoveDirection) => void;
  newGame: () => void;
  closeGameOverDialog: () => void;
  restoreState: () => void;
  openGameOverDialog: () => void;
}

const useGameStore = create<GameState>()((set, get) => ({
  hasStarted: false,
  board: initBoard(),
  tileLocations: {},
  isGameOver: false,
  showGameOverDialog: false,
  score: 0,
  moves: 0,
  merged: {},
  generated: {},
  nextValue: 0,
  lastMoveDirection: null,
  currentGameId: uuidv4(),

  /**
   *
   * @param dir
   * @returns
   */
  move: (dir: MoveDirection) =>
    set((state) => {
      if (!state.hasStarted || state.isGameOver) {
        return state;
      }

      // Move and merge the tiles.
      const { intermediateBoard, moved } = moveTiles(state.board, dir);
      const { board, merged, score } = mergeTiles(intermediateBoard);

      // Update the count of the tiles that got merged.
      for (let key in merged) {
        if (!state.merged[key]) {
          state.merged[key] = 0;
        }
        state.merged[key] = state.merged[key] + merged[key];
      }

      // Put a new tile on the board (if applicable).
      let usedNextValue = false;
      let moves = state.moves;
      const coords = getCoordinatesForNewTile(board, dir, moved);
      if (coords != null) {
        moves = moves + 1;
        usedNextValue = true;
        const newValue = state.nextValue;
        board[coords.row][coords.col] = {
          id: `tile_${moves}`,
          value: newValue,
          isNew: true,
          isMerge: false,
        };

        if (!state.generated[newValue]) {
          state.generated[newValue] = 0;
        }
        state.generated[newValue] = state.generated[newValue] + 1;
      }

      // Check if game is over.
      const gameOver = isGameOver(JSON.parse(JSON.stringify(board)));

      // Persist the updated state in localStorage.
      const updatedState = {
        ...state,
        board: [...board],
        tileLocations: convertBoardToLocations(board, intermediateBoard),
        isGameOver: gameOver,
        showGameOverDialog: gameOver,
        moves: moves,
        score: state.score + score,
        merged: { ...state.merged },
        generated: { ...state.generated },
        nextValue: usedNextValue
          ? generateTileValue(state.merged, state.generated, moves)
          : state.nextValue,
      };
      window.localStorage.setItem(
        LOCAL_STORAGE_GAME_STATE,
        JSON.stringify(updatedState)
      );
      return updatedState;
    }),

  /**
   *
   * @returns
   */
  newGame: () =>
    set((state) => {
      const board = initBoard();

      const newValue = generateTileValue({}, {}, 0);
      board[(NUM_ROWS - 1) / 2][(NUM_COLS - 1) / 2] = {
        id: `tile_${0}`,
        value: newValue,
        isNew: true,
        isMerge: false,
      };

      const updatedState = {
        ...state,
        board: board,
        tileLocations: convertBoardToLocations(board, initIntermediateBoard()),
        hasStarted: true,
        isGameOver: false,
        showGameOverDialog: false,
        score: 0,
        moves: 0,
        merged: {},
        generated: {},
        nextValue: generateTileValue({}, {}, 0),
        currentGameId: uuidv4(),
      };
      window.localStorage.setItem(
        LOCAL_STORAGE_GAME_STATE,
        JSON.stringify(updatedState)
      );
      return updatedState;
    }),

  /**
   *
   * @returns
   */
  closeGameOverDialog: () =>
    set((state) => ({ ...state, showGameOverDialog: false })),

  /**
   *
   * @returns
   */
  restoreState: () =>
    set((state) => {
      const restoredStateStr = window.localStorage.getItem(
        LOCAL_STORAGE_GAME_STATE
      );
      if (restoredStateStr) {
        return {
          ...state,
          ...JSON.parse(restoredStateStr),
        };
      } else {
        return { ...state };
      }
    }),

  /**
   *
   * @returns
   */
  openGameOverDialog: () =>
    set((state) => ({ ...state, showGameOverDialog: true })),
}));

export default useGameStore;

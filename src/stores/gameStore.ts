import create from "zustand";
import { TileData, MoveDirection, TileLocations } from "../types";
import { NUM_ROWS, NUM_COLS } from "../utils/constants";
import { getCoordinatesForNewTile } from "../utils/coordinates";
import { generateTileValue } from "../utils/generator";
import { convertBoardToLocations } from "../utils/locations";
import { moveOnBoard } from "../utils/mover";
import { initBoard, isGameOver } from "../utils/utils";

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
  move: (dir: MoveDirection) => void;
  newGame: () => void;
  closeGameOverDialog: () => void;
}

// TODO - load game state storage and save to local storage

const useGameStore = create<GameState>()((set, get) => ({
  hasStarted: false,
  board: initBoard(),
  tileLocations: {
    byId: {},
    byCoordinates: {},
  },
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

      // Make a copy of the previous board. Used to generate the "old" tile locations.
      const previousBoardCopy = JSON.parse(JSON.stringify(state.board));

      // Move the tiles on the board.
      const { board, merged, score, moved } = moveOnBoard(
        JSON.parse(JSON.stringify(state.board)),
        dir
      );

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
      const gameOver = isGameOver(board);

      // Return the updated state.
      return {
        ...state,
        board: [...board],
        tileLocations: convertBoardToLocations(previousBoardCopy, board),
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
        id: `tile_${state.moves}`,
        value: newValue,
        isNew: true,
        isMerge: false,
      };

      return {
        ...state,
        board: board,
        tileLocations: convertBoardToLocations(state.board, board),
        hasStarted: true,
        isGameOver: false,
        showGameOverDialog: false,
        score: 0,
        moves: 0,
        merged: {},
        generated: {},
        nextValue: generateTileValue({}, {}, 0),
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

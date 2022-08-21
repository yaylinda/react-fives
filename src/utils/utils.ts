import { TileData, MoveDirection, IntermediateTileData } from "../types";
import { NUM_ROWS, NUM_COLS } from "./constants";
import { mergeTiles } from "./merger";
import { moveTiles } from "./mover";

/**
 *
 * @param code
 * @returns
 */
export const convertKeyCodeToDirection = (
  code: string
): MoveDirection | null => {
  switch (code) {
    case "ArrowLeft":
      return MoveDirection.LEFT;
    case "ArrowRight":
      return MoveDirection.RIGHT;
    case "ArrowUp":
      return MoveDirection.UP;
    case "ArrowDown":
      return MoveDirection.DOWN;
    default:
      return null;
  }
};

/**
 *
 * @returns
 */
export const initBoard = (): TileData[][] => {
  return Array.from(Array(NUM_ROWS)).map((_, r) =>
    Array.from(Array(NUM_COLS)).map((_, c) => ({
      id: "",
      value: 0,
      isNew: false,
      isMerge: false,
    }))
  );
};

/**
 *
 * @returns
 */
export const initIntermediateBoard = (): IntermediateTileData[][] => {
  return Array.from(Array(NUM_ROWS)).map((_, r) =>
    Array.from(Array(NUM_COLS)).map((_, c) => ({ tiles: [] }))
  );
};

/**
 *
 * @param board
 * @returns
 */
export const isGameOver = (board: TileData[][]): boolean => {
  const boardFull = isBoardFull(board);

  if (!boardFull) {
    return false;
  }

  const left = moveAndMerge(board, MoveDirection.LEFT);
  const right = moveAndMerge(board, MoveDirection.RIGHT);
  const up = moveAndMerge(board, MoveDirection.UP);
  const down = moveAndMerge(board, MoveDirection.DOWN);

  return [
    isSame(board, left),
    isSame(board, right),
    isSame(board, up),
    isSame(board, down),
  ].every((v) => v);
};

const moveAndMerge = (
  board: TileData[][],
  dir: MoveDirection
): TileData[][] => {
  const { intermediateBoard } = moveTiles(board, dir);
  return mergeTiles(intermediateBoard).board;
};

/**
 *
 * @param board
 * @returns
 */
const isBoardFull = (board: TileData[][]): boolean => {
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (board[row][col].value === 0) {
        return false;
      }
    }
  }
  return true;
};

/**
 *
 * @param board1
 * @param board2
 * @returns
 */
const isSame = (board1: TileData[][], board2: TileData[][]): boolean => {
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (board1[row][col].value !== board2[row][col].value) {
        return false;
      }
    }
  }
  return true;
};

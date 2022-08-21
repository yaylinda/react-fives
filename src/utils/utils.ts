import { CellData, MoveDirection } from "../types";
import { shuffle } from "lodash";
import { NUM_ROWS, NUM_COLS } from "./constants";
import { moveOnBoard } from "./mover";

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
export const initBoard = (): CellData[][] => {
  return Array.from(Array(NUM_ROWS)).map((_, r) =>
    Array.from(Array(NUM_COLS)).map((_, c) => ({
      value: 0,
      isNew: false,
      isMerge: false,
    }))
  );
};

/**
 *
 * @param dir
 * @returns
 */
export const getCoordinatesForNewCell = (
  board: CellData[][],
  dir: MoveDirection,
  moved: { cols: number[]; rows: number[] }
): { col: number; row: number } | null => {
  switch (dir) {
    case MoveDirection.LEFT: {
      const values = [];
      for (let row = 0; row < NUM_ROWS; row++) {
        values.push(board[row][NUM_COLS - 1].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.rows)[0];
      return { col: NUM_COLS - 1, row: index };
    }
    case MoveDirection.RIGHT: {
      const values = [];
      for (let row = 0; row < NUM_ROWS; row++) {
        values.push(board[row][0].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.rows)[0];
      return { col: 0, row: index };
    }
    case MoveDirection.UP: {
      const values = [];
      for (let col = 0; col < NUM_COLS; col++) {
        values.push(board[NUM_ROWS - 1][col].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.cols)[0];
      return { col: index, row: NUM_ROWS - 1 };
    }
    case MoveDirection.DOWN: {
      const values = [];
      for (let col = 0; col < NUM_COLS; col++) {
        values.push(board[0][col].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.cols)[0];
      return { col: index, row: 0 };
    }
  }
};

/**
 *
 * @param values
 * @returns
 */
const getEmptyIndices = (values: number[]) => {
  return values.map((v, i) => (v === 0 ? i : -1)).filter((i) => i !== -1);
};

/**
 *
 * @param board
 * @returns
 */
export const isGameOver = (board: CellData[][]): boolean => {
  const boardFull = isBoardFull(board);

  if (!boardFull) {
    return false;
  }

  const left = moveOnBoard(
    JSON.parse(JSON.stringify(board)),
    MoveDirection.LEFT
  );
  const right = moveOnBoard(
    JSON.parse(JSON.stringify(board)),
    MoveDirection.RIGHT
  );
  const up = moveOnBoard(JSON.parse(JSON.stringify(board)), MoveDirection.UP);
  const down = moveOnBoard(
    JSON.parse(JSON.stringify(board)),
    MoveDirection.DOWN
  );

  return [
    isSame(board, left.board),
    isSame(board, right.board),
    isSame(board, up.board),
    isSame(board, down.board),
  ].every((v) => v);
};

/**
 *
 * @param board
 * @returns
 */
const isBoardFull = (board: CellData[][]): boolean => {
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
const isSame = (board1: CellData[][], board2: CellData[][]): boolean => {
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (board1[row][col].value !== board2[row][col].value) {
        return false;
      }
    }
  }
  return true;
};

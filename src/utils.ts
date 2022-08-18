import { CellData, IntermediateCellData, MoveDirection } from "./types";
import produce from "immer";

export const NUM_ROWS = 5;
export const NUM_COLS = 5;

export const START_NUM_2 = 2;
export const START_NUM_3 = 3;

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
    Array.from(Array(NUM_COLS)).map((_, c) => ({ value: 0 }))
  );
};

/**
 *
 * @returns
 */
export const randomRow = () => Math.floor(Math.random() * NUM_ROWS);

/**
 *
 * @returns
 */
export const randomCol = () => Math.floor(Math.random() * NUM_COLS);

/**
 *
 * @returns
 */
export const randomCellValue = () => {
  return (
    Math.floor(Math.random() * (START_NUM_3 - START_NUM_2 + 1)) + START_NUM_2
  ); // TODO - implement distribution
};

/**
 *
 * @param dir
 * @returns
 */
export const getCoordinatesForNewCell = (
  board: CellData[][],
  dir: MoveDirection
): { col: number; row: number } | null => {
  switch (dir) {
    case MoveDirection.LEFT: {
      const values = [];
      for (let row = 0; row < NUM_ROWS; row++) {
        values.push(board[row][NUM_COLS - 1].value);
      }

      const index = getRandomIndex(values);

      if (index == null) {
        return null;
      }

      return { col: NUM_COLS - 1, row: index };
    }
    case MoveDirection.RIGHT: {
      const values = [];
      for (let row = 0; row < NUM_ROWS; row++) {
        values.push(board[row][0].value);
      }

      const index = getRandomIndex(values);

      if (index == null) {
        return null;
      }

      return { col: 0, row: index };
    }
    case MoveDirection.UP: {
      const values = [];
      for (let col = 0; col < NUM_COLS; col++) {
        values.push(board[NUM_ROWS - 1][col].value);
      }

      const index = getRandomIndex(values);

      if (index == null) {
        return null;
      }

      return { col: index, row: NUM_ROWS - 1 };
    }
    case MoveDirection.DOWN: {
      const values = [];
      for (let col = 0; col < NUM_COLS; col++) {
        values.push(board[0][col].value);
      }

      const index = getRandomIndex(values);

      if (index == null) {
        return null;
      }

      return { col: index, row: 0 };
    }
  }
};

/**
 *
 * @param values
 * @returns
 */
const getRandomIndex = (values: number[]) => {
  if (values.every((v) => v > 0)) {
    return null;
  }

  const emptyIndices = values
    .map((v, i) => (v === 0 ? i : -1))
    .filter((i) => i !== -1);
  const index = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  return index;
};

/**
 *
 * @param board
 * @param dir
 * @returns
 */
export const moveOnBoard = (
  board: CellData[][],
  dir: MoveDirection
): CellData[][] => {
  const intermediateBoard: IntermediateCellData[][] = Array.from(
    Array(NUM_ROWS)
  ).map((_, r) => Array.from(Array(NUM_COLS)).map((_, c) => ({ values: [] })));

  switch (dir) {
    case MoveDirection.LEFT:
      // Put all cells from the first column into the intermediate board
      for (let row = 0; row < NUM_ROWS; row++) {
        intermediateBoard[row][0].values.push(board[row][0].value);
      }

      // Combine or move all the cells to the left
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 1; col < NUM_COLS; col++) {
          const cellValue = board[row][col].value;
          const leftCellValue = board[row][col - 1].value;

          if (canCombine(cellValue, leftCellValue)) {
            intermediateBoard[row][col - 1].values.push(cellValue);
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
    case MoveDirection.RIGHT:
      // Put all cells from the last column into the intermediate board
      for (let row = 0; row < NUM_ROWS; row++) {
        intermediateBoard[row][NUM_COLS - 1].values.push(
          board[row][NUM_COLS - 1].value
        );
      }

      // Combine or move all the cells to the right
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = NUM_COLS - 2; col >= 0; col--) {
          const cellValue = board[row][col].value;
          const rightCellValue = board[row][col + 1].value;

          if (canCombine(cellValue, rightCellValue)) {
            intermediateBoard[row][col + 1].values.push(cellValue);
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
    case MoveDirection.UP:
      // Put all cells from the first row into the intermediate board
      for (let col = 0; col < NUM_COLS; col++) {
        intermediateBoard[0][col].values.push(board[0][col].value);
      }

      // Combine or move all the cells to the top
      for (let row = 1; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cellValue = board[row][col].value;
          const upCellValue = board[row - 1][col].value;

          if (canCombine(cellValue, upCellValue)) {
            intermediateBoard[row - 1][col].values.push(cellValue);
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
    case MoveDirection.DOWN:
      // Put all cells from the last row into the intermediate board
      for (let col = 0; col < NUM_COLS; col++) {
        intermediateBoard[NUM_COLS - 1][col].values.push(
          board[NUM_COLS - 1][col].value
        );
      }

      // Combine or move all the cells to the bottom
      for (let row = NUM_ROWS - 2; row >= 0; row--) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cellValue = board[row][col].value;
          const downCellValue = board[row + 1][col].value;

          if (canCombine(cellValue, downCellValue)) {
            intermediateBoard[row + 1][col].values.push(cellValue);
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
  }

  const newBoard = initBoard();
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      newBoard[row][col].value = intermediateBoard[row][col].values.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
    }
  }

  return newBoard;
};

/**
 *
 * @param curVal
 * @param destVal
 * @returns
 */
const canCombine = (curVal: number, destVal: number): boolean => {
  if (destVal === 0) {
    return true;
  }

  if (
    (curVal === START_NUM_2 && destVal === START_NUM_3) ||
    (curVal === START_NUM_3 && destVal === START_NUM_2)
  ) {
    return true;
  }

  return curVal > START_NUM_3 && destVal > START_NUM_3 && curVal === destVal;
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
    produce(board, (draft) => draft),
    MoveDirection.LEFT
  );
  const right = moveOnBoard(
    produce(board, (draft) => draft),
    MoveDirection.LEFT
  );
  const up = moveOnBoard(
    produce(board, (draft) => draft),
    MoveDirection.LEFT
  );
  const down = moveOnBoard(
    produce(board, (draft) => draft),
    MoveDirection.LEFT
  );

  return [
    isSame(board, left),
    isSame(board, right),
    isSame(board, up),
    isSame(board, down),
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

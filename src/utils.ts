import { CellData, IntermediateCellData, MoveDirection } from "./types";
import { shuffle, sum } from "lodash";

export const NUM_ROWS = 5;
export const NUM_COLS = 5;

export const START_NUM_2 = 2;
export const START_NUM_3 = 3;
export const STARTING_NUMS = [START_NUM_2, START_NUM_3];
export const START_NUM_DIFF_THRESHOLD = 5;
export const MERGABLES = [
  5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960,
];

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
export const randomCellValue = (
  merged: { [key in number]: number },
  generated: { [key in number]: number },
  moves: number
) => {
  // At the beginning of the game, randomly return 2 or 3
  if (Object.keys(merged).length === 0) {
    return randomStartingNum(generated);
  }

  // Decide if we want to randomly return one of the other values
  const numMerges = sum(Object.values(merged));
  if (Math.random() <= numMerges / 2 / moves) {
    if (Math.random() <= 0.5) {
      return randomStartingNum(generated);
    }

    // TODO - this could be memoized and not recalculated each time

    const probabilities: { [key in number]: number } = {};
    for (let key in merged) {
      const multiplier = MERGABLES.indexOf(Number(key)) + 1;
      const probability = 1 / Math.pow(2, multiplier);
      probabilities[key] = probability;
    }

    const probabilitiesSum = sum(Object.values(probabilities)) + 0.5;

    const choices = [];
    for (let key in merged) {
      const num = Math.floor((probabilities[key] / probabilitiesSum) * 100);
      choices.push(...Array(num).fill(key));
    }
    return Number(shuffle(choices)[0]);
  }

  return randomStartingNum(generated);
};

/**
 *
 * @param generated
 * @returns
 */
const randomStartingNum = (generated: { [key in number]: number }) => {
  // Try to balance between 2's and 3's
  if (
    Math.abs(generated[START_NUM_2] - generated[START_NUM_3]) >
    START_NUM_DIFF_THRESHOLD
  ) {
    if (generated[START_NUM_2] > generated[START_NUM_3]) {
      return START_NUM_3;
    } else {
      return START_NUM_2;
    }
  }

  // Randomly return 2 or 3
  return shuffle(STARTING_NUMS)[0];
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
 * @param dir
 * @returns
 */
export const moveOnBoard = (
  board: CellData[][],
  dir: MoveDirection
): {
  board: CellData[][];
  merged: { [key in number]: number };
  score: number;
  moved: { rows: number[]; cols: number[] };
} => {
  const intermediateBoard: IntermediateCellData[][] = Array.from(
    Array(NUM_ROWS)
  ).map((_, r) => Array.from(Array(NUM_COLS)).map((_, c) => ({ values: [] })));

  const movedRows = [];
  const movedCols = [];

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
            movedRows.push(row);
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
            movedRows.push(row);
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
            movedCols.push(col);
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
            movedCols.push(col);
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
  }

  let moveScore = 0;
  const merged: { [key in number]: number } = {};
  const newBoard = initBoard();
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const filteredValues = intermediateBoard[row][col].values.filter(
        (v) => v > 0
      );

      const cellTotal = sum(filteredValues);
      newBoard[row][col].value = cellTotal;

      if (filteredValues.length > 1) {
        moveScore += cellTotal;
        if (!merged[cellTotal]) {
          merged[cellTotal] = 0;
        }
        merged[cellTotal] = merged[cellTotal] + 1;
        newBoard[row][col].isMerge = true;
      }
    }
  }

  return {
    board: newBoard,
    merged,
    score: moveScore,
    moved: { cols: movedCols, rows: movedRows },
  };
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

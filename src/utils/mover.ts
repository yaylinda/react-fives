import { sum } from "lodash";
import { CellData, MoveDirection, IntermediateCellData } from "../types";
import { NUM_ROWS, NUM_COLS, START_NUM_2, START_NUM_3 } from "./constants";
import { initBoard } from "./utils";

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

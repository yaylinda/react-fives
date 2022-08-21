import { sum } from "lodash";
import {
  TileData,
  MoveDirection,
  IntermediateTileData,
  TileLocations,
} from "../types";
import { NUM_ROWS, NUM_COLS, START_NUM_2, START_NUM_3 } from "./constants";
import { initBoard, resetBoard } from "./utils";

/**
 *
 * @param board
 * @param dir
 * @returns
 */
export const moveOnBoard = (
  board: TileData[][],
  dir: MoveDirection
): {
  board: TileData[][];
  merged: { [key in number]: number };
  score: number;
  moved: { rows: number[]; cols: number[] };
} => {
  console.log(`[moveOnBoard] board=${JSON.stringify(board)}`);
  const intermediateBoard: IntermediateTileData[][] = Array.from(
    Array(NUM_ROWS)
  ).map((_, r) => Array.from(Array(NUM_COLS)).map((_, c) => ({ tiles: [] })));

  const movedRows = [];
  const movedCols = [];

  switch (dir) {
    case MoveDirection.LEFT:
      // Put all cells from the first column into the intermediate board
      for (let row = 0; row < NUM_ROWS; row++) {
        intermediateBoard[row][0].tiles.push(board[row][0]);
      }

      // Combine or move all the cells to the left
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 1; col < NUM_COLS; col++) {
          const cellValue = board[row][col];
          const leftCellValue = board[row][col - 1];

          if (canCombine(cellValue, leftCellValue)) {
            intermediateBoard[row][col - 1].tiles.push({ ...cellValue });
            board[row][col].value = 0;
            movedRows.push(row);
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.RIGHT:
      // Put all cells from the last column into the intermediate board
      for (let row = 0; row < NUM_ROWS; row++) {
        intermediateBoard[row][NUM_COLS - 1].tiles.push(
          board[row][NUM_COLS - 1]
        );
      }

      // Combine or move all the cells to the right
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = NUM_COLS - 2; col >= 0; col--) {
          const cellValue = board[row][col];
          const rightCellValue = board[row][col + 1];

          if (canCombine(cellValue, rightCellValue)) {
            intermediateBoard[row][col + 1].tiles.push({ ...cellValue });
            board[row][col].value = 0;
            movedRows.push(row);
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.UP:
      // Put all cells from the first row into the intermediate board
      for (let col = 0; col < NUM_COLS; col++) {
        intermediateBoard[0][col].tiles.push(board[0][col]);
      }

      // Combine or move all the cells to the top
      for (let row = 1; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cellValue = board[row][col];
          const upCellValue = board[row - 1][col];

          if (canCombine(cellValue, upCellValue)) {
            intermediateBoard[row - 1][col].tiles.push({ ...cellValue });
            board[row][col].value = 0;
            movedCols.push(col);
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.DOWN:
      // Put all cells from the last row into the intermediate board
      for (let col = 0; col < NUM_COLS; col++) {
        intermediateBoard[NUM_COLS - 1][col].tiles.push(
          board[NUM_COLS - 1][col]
        );
      }

      // Combine or move all the cells to the bottom
      for (let row = NUM_ROWS - 2; row >= 0; row--) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cellValue = board[row][col];
          const downCellValue = board[row + 1][col];

          if (canCombine(cellValue, downCellValue)) {
            intermediateBoard[row + 1][col].tiles.push({ ...cellValue });
            board[row][col].value = 0;
            movedCols.push(col);
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
  }

  let moveScore = 0;
  const merged: { [key in number]: number } = {};
  const newBoard = initBoard();
  console.log(
    `[moveOnBoard] intermediateBoard=${JSON.stringify(intermediateBoard)}`
  );
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const tiles = intermediateBoard[row][col].tiles.filter(
        (tile) => tile.value > 0
      );

      const totalValue = sum(tiles.map((t) => t.value));

      if (tiles.length >= 1) {
        newBoard[row][col].id = tiles[0].id;
        newBoard[row][col].value = totalValue;
      }
      if (tiles.length > 1) {
        moveScore += totalValue;
        if (!merged[totalValue]) {
          merged[totalValue] = 0;
        }
        merged[totalValue] = merged[totalValue] + 1;
        newBoard[row][col].isMerge = true;
      }
    }
  }

  console.log(
    `[moveOnBoard] newBoard after merging=${JSON.stringify(newBoard)}`
  );

  return {
    board: newBoard,
    merged,
    score: moveScore,
    moved: { cols: movedCols, rows: movedRows },
  };
};

/**
 *
 * @param curTile
 * @param destTile
 * @returns
 */
const canCombine = (curTile: TileData, destTile: TileData): boolean => {
  const curVal = curTile.value;
  const destVal = destTile.value;

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

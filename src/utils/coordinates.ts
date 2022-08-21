import { shuffle } from "lodash";
import { TileData, MoveDirection, Coordinates } from "../types";
import { NUM_ROWS, NUM_COLS } from "./constants";

/**
 *
 * @param dir
 * @returns
 */
export const getCoordinatesForNewTile = (
  board: TileData[][],
  dir: MoveDirection,
  moved: { cols: number[]; rows: number[] }
): Coordinates | null => {
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

import { CellData, MoveDirection } from "./types";

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
    Array.from(Array(NUM_COLS)).map((_, c) => ({ value: null }))
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

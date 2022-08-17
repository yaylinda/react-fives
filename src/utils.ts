import { MoveDirection } from "./types";

export const NUM_ROWS = 5;
export const NUM_COLS = 5;

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

export const initBoard = () => {
  return Array.from(Array(NUM_ROWS)).map((_, r) =>
    Array.from(Array(NUM_COLS)).map((_, c) => ({ value: null }))
  );
};

import { CellData, IntermediateCellData, MoveDirection } from "./types";

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
  dir: MoveDirection
): { col: number; row: number } => {
  switch (dir) {
    case MoveDirection.LEFT:
      return { col: NUM_COLS - 1, row: randomRow() };
    case MoveDirection.RIGHT:
      return { col: 0, row: randomRow() };
    case MoveDirection.UP:
      return { col: randomCol(), row: NUM_ROWS - 1 };
    case MoveDirection.DOWN:
      return { col: randomCol(), row: 0 };
  }
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
  console.log(`[moveOnBoard] board=${JSON.stringify(board)}`);

  const intermediateBoard: IntermediateCellData[][] = Array.from(
    Array(NUM_ROWS)
  ).map((_, r) => Array.from(Array(NUM_COLS)).map((_, c) => ({ values: [] })));

  switch (dir) {
    case MoveDirection.LEFT:
      // Put all cells from the first column into the intermediate board
      for (let row = 0; row < NUM_ROWS; row++) {
        intermediateBoard[row][0].values.push(board[row][0].value);
      }

      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 1; col < NUM_COLS; col++) {
          const cellValue = board[row][col].value;
          const leftCellValue = board[row][col - 1].value;

          if (canCombine(cellValue, leftCellValue)) {
            intermediateBoard[row][col - 1].values.push(cellValue);
          } else {
            intermediateBoard[row][col].values.push(cellValue);
          }
        }
      }
      break;
    case MoveDirection.RIGHT:
      break;
    case MoveDirection.UP:
      break;
    case MoveDirection.DOWN:
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

  console.log(
    `[moveOnBoard] intermediateBoard=${JSON.stringify(intermediateBoard)}`
  );
  console.log(`[moveOnBoard] newBoard=${JSON.stringify(newBoard)}`);

  return newBoard;
};

/**
 *
 * @param a
 * @param b
 * @returns
 */
const canCombine = (a: number, b: number): boolean => {
  if (a === 0 || b === 0) {
    return true;
  }

  if (
    (a === START_NUM_2 && b === START_NUM_3) ||
    (a === START_NUM_3 && b === START_NUM_2)
  ) {
    return true;
  }

  return a > START_NUM_3 && b > START_NUM_3 && a === b;
};

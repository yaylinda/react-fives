import { MoveDirection } from "./types";

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

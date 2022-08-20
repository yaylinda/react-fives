export enum MoveDirection {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface CellData {
  value: number;
  isNew: boolean;
  isMerge: boolean;
}

export interface IntermediateCellData {
  values: number[];
}

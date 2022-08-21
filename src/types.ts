export enum MoveDirection {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface TileData {
  id: string;
  value: number;
  isNew: boolean;
  isMerge: boolean;
}

export interface IntermediateCellData {
  values: number[];
}

export type TileLocations = {
  byId: {
    [tileId in string]: {
      current: TileData | null;
      previous: TileData | null;
    };
  };
  byCoordinates: { [coordString in string]: string };
};

export interface Coordinates {
  row: number;
  col: number;
}

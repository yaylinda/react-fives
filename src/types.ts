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

export interface IntermediateTileData {
  tiles: TileData[];
}

export type TileLocations = {
  [tileId in string]: {
    tile: TileData;
    coordinates: Coordinates;
  } | null;
};

export interface Coordinates {
  row: number;
  col: number;
}

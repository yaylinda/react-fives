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
  byId: {
    [tileId in string]: {
      current: {
        tile: TileData;
        coordinates: Coordinates;
      } | null;
      previous: {
        tile: TileData;
        coordinates: Coordinates;
      } | null;
    };
  };
};

export interface Coordinates {
  row: number;
  col: number;
}

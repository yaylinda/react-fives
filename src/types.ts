import { Timestamp } from "firebase/firestore/lite";

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
  };
};

export interface Coordinates {
  row: number;
  col: number;
}

export interface User {
  userId: string;
  username: string;
}

export interface HighScore {
  username: string;
  clientId: string;
  gameId: string;
  gameSeed: string | null;
  score: number;
  moves: number;
  merged: { [key in number]: number };
  generated: { [key in number]: number };
}

export interface HighScoreDoc extends HighScore {
  timestamp: Timestamp;
}

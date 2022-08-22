import {
  Coordinates,
  IntermediateTileData,
  TileData,
  TileLocations,
} from "../types";
import { NUM_COLS, NUM_ROWS } from "./constants";

/**
 *
 * @param previousBoard
 * @param currentBoard
 * @returns
 */
export const convertBoardToLocations = (
  currentBoard: TileData[][],
  intermediateBoard: IntermediateTileData[][]
): TileLocations => {
  let tileLocations: TileLocations = {};

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const coords: Coordinates = { row, col };

      for (let tile of intermediateBoard[row][col].tiles) {
        tileLocations = addTileLocation(coords, tile, tileLocations);
      }

      tileLocations = addTileLocation(
        coords,
        currentBoard[row][col],
        tileLocations
      );
    }
  }

  return tileLocations;
};

/**
 *
 * @param coordinates
 * @param tile
 * @param tileLocations
 * @returns
 */
const addTileLocation = (
  coordinates: Coordinates,
  tile: TileData,
  tileLocations: TileLocations
): TileLocations => {
  if (!tile.id || !tile.value) {
    return tileLocations;
  }

  if (!tileLocations[tile.id]) {
    tileLocations[tile.id] = null;
  }

  tileLocations[tile.id] = {
    tile,
    coordinates,
  };

  return tileLocations;
};

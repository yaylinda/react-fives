import { Coordinates, TileData, TileLocations } from "../types";
import { NUM_COLS, NUM_ROWS } from "./constants";

/**
 *
 * @param previousBoard
 * @param currentBoard
 * @returns
 */
export const convertBoardToLocations = (
  previousBoard: TileData[][],
  currentBoard: TileData[][]
): TileLocations => {
  let tileLocations: TileLocations = {
    byId: {},
  };

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const coords: Coordinates = { row, col };
      tileLocations = addTileLocation(
        coords,
        previousBoard[row][col],
        tileLocations,
        "previous"
      );
      tileLocations = addTileLocation(
        coords,
        currentBoard[row][col],
        tileLocations,
        "current"
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
 * @param curOrPrevKey
 * @returns
 */
const addTileLocation = (
  coordinates: Coordinates,
  tile: TileData,
  tileLocations: TileLocations,
  curOrPrevKey: "current" | "previous"
): TileLocations => {
  if (!tile.id) {
    return tileLocations;
  }

  if (!tileLocations.byId[tile.id]) {
    tileLocations.byId[tile.id] = {
      previous: null,
      current: null,
    };
  }

  tileLocations.byId[tile.id][curOrPrevKey] = {
    tile,
    coordinates,
  };

  return tileLocations;
};

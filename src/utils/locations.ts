import { Coordinates, TileData, TileLocations } from "../types";
import { NUM_COLS, NUM_ROWS } from "./constants";
import { coordinatesHash } from "./utils";

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
  const tileLocations: TileLocations = {
    byId: {},
    byCoordinates: {},
  };

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const coords: Coordinates = { row, col };
      addTileLocation(
        coords,
        previousBoard[row][col],
        tileLocations,
        "previous"
      );
      addTileLocation(coords, currentBoard[row][col], tileLocations, "current");
    }
  }

  return tileLocations;
};

/**
 *
 * @param coords
 * @param tile
 * @param tileLocations
 * @param curOrPrevKey
 * @returns
 */
const addTileLocation = (
  coords: Coordinates,
  tile: TileData,
  tileLocations: TileLocations,
  curOrPrevKey: "current" | "previous"
) => {
  if (!tile.id) {
    return;
  }
  tileLocations.byCoordinates[coordinatesHash(coords)] = tile.id;

  if (!tileLocations.byId[tile.id]) {
    tileLocations.byId[tile.id] = {
      previous: null,
      current: null,
    };
  }

  tileLocations.byId[tile.id][curOrPrevKey] = coords;
};

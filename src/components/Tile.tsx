import { Coordinates, GameBoardConfig, TileData } from "../types";
import { Box } from "@mui/material";
import theme, { colors } from "../theme";
import { SystemStyleObject } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { MERGABLES, STARTING_NUMS, START_NUM_2, START_NUM_3 } from "../utils/constants";
import useGameModeStore from "../stores/gameModeStore";
import { getBoardConfig } from "../utils/utils";

/**
 * Font sizes
 */
const DEFAULT_FONT_SIZE = 24;
const THREE_DIGIT_FONT_SIZE = 20;
const FOUR_DIGIT_FONT_SIZE = 14;
const FIVE_DIGIT_FONT_SIZE = 10;

/**
 * 
 * @param isStartingNum 
 * @param config 
 * @returns 
 */
const getTileSize = (isStartingNum: boolean, config: GameBoardConfig) => ({
  height: isStartingNum ? config.tileSize : config.tileWithBorder,
  width: isStartingNum ? config.tileSize : config.tileWithBorder,
  borderStyle: isStartingNum ? "none" : "solid",
  borderWidth: isStartingNum ? 0 : config.borderWidth,
});

/**
 * Default tile styles
 */
const DEFAULT = {
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: DEFAULT_FONT_SIZE,
  backgroundColor: colors.LIGHT,
  color: colors.DARK,
};

/**
 * Tile styles for different values
 */
const STYLES: { [key in string]: SystemStyleObject<typeof theme> } = {
  tile_2: {
    backgroundColor: colors.BRAND,
    color: colors.LIGHT,
  },
  tile_3: {
    backgroundColor: colors.ACCENT,
    color: colors.DARK,
  },
  tile_5: {
    borderColor: "#66c2a5",
  },
  tile_10: {
    borderColor: "#3288bd",
  },
  tile_20: {
    borderColor: "#5e4fa2",
  },
  tile_40: {
    borderColor: "#9e0142",
  },
  tile_80: {
    borderColor: "#d53e4f",
  },
  tile_160: {
    borderColor: "#f46d43",
    fontSize: THREE_DIGIT_FONT_SIZE,
  },
  tile_320: {
    borderColor: "#fdae61",
    fontSize: THREE_DIGIT_FONT_SIZE,
  },
  tile_640: {
    borderColor: "#fee08b",
    fontSize: THREE_DIGIT_FONT_SIZE,
  },
  tile_1280: {
    borderColor: "#e6f598",
    fontSize: FOUR_DIGIT_FONT_SIZE,
  },
  tile_2560: {
    borderColor: "#abdda4",
    fontSize: FOUR_DIGIT_FONT_SIZE,
  },
  tile_5120: {
    borderColor: "#66c2a5",
    fontSize: FOUR_DIGIT_FONT_SIZE,
  },
  tile_10240: {
    borderColor: "#3288bd",
    fontSize: FIVE_DIGIT_FONT_SIZE,
  },
  tile_20480: {
    borderColor: "#5e4fa2",
    fontSize: FIVE_DIGIT_FONT_SIZE,
  },
  tile_40960: {
    borderColor: "#9e0142",
    fontSize: FIVE_DIGIT_FONT_SIZE,
  },
};

interface TileProps {
  tile: TileData;
  coordinates: Coordinates;
}

/**
 * Tile
 *
 * @param param0
 * @returns
 */
function Tile({ tile, coordinates }: TileProps) {
  const { id, value, isNew, isMerge } = tile;
  const [scale, setScale] = useState(isNew ? 0 : 1);
  const { gameMode } = useGameModeStore();
  const config = getBoardConfig(gameMode);
  const isStartingNum = STARTING_NUMS.includes(value);
  const top = coordinates.row * config.tileSize + coordinates.row * config.tileSpacing;
  const left = coordinates.col * config.tileSize + coordinates.col * config.tileSpacing;

  useEffect(() => {
    if (isMerge) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [isMerge]);

  useEffect(() => {
    if (isNew) {
      setTimeout(() => {
        setScale(1.1);
        setTimeout(() => setScale(1), 100);
      }, 100);
    }
  }, [isNew]);

  // TODO - fix animation when moving down or right

  const getTileZIndex = () => {
    if (STARTING_NUMS.includes(value)) {
      return 1;
    }
    return MERGABLES.indexOf(value) + 2;
  };

  return (
    <Box
      sx={[
        DEFAULT,
        STYLES[`tile_${value}`],
        getTileSize(isStartingNum, config),
        {
          zIndex: isNew ? 0 : getTileZIndex(),
          position: "absolute",
          top,
          left,
          transform: `scale(${scale})`,
          transitionProperty: "top, left, transform",
          transitionDuration: "250ms, 250ms, 100ms",
        },
      ]}
    >
      {value}
    </Box>
  );
}

const SMALL_TILE_WITHOUT_BORDER = {
  height: 20,
  width: 20,
  borderStyle: 'none',
};

const SMALL_TILE_WITH_BORDER = {
  height: 12,
  width: 12,
  borderStyle: 'solid',
  borderWidth: 4,
};

/**
 *
 * @param param0
 * @returns
 */
export const PreviewTile = ({ value }: { value: number }) => {
  const isStartNum = value === START_NUM_2 || value === START_NUM_3;

  return (
    <Box
      sx={[
        DEFAULT,
        STYLES[`tile_${value}`],
        isStartNum ? SMALL_TILE_WITHOUT_BORDER : SMALL_TILE_WITH_BORDER,
      ]}
    ></Box>
  );
};

export default Tile;

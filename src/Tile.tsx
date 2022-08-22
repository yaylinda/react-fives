import { Coordinates, TileData } from "./types";
import { Box } from "@mui/material";
import theme, { colors } from "./theme";
import { SystemStyleObject } from "@mui/system";
import { useEffect, useState } from "react";
import { START_NUM_2, START_NUM_3 } from "./utils/constants";

/**
 * Font sizes
 */
const DEFAULT_FONT_SIZE = 24;
const THREE_DIGIT_FONT_SIZE = 20;
const FOUR_DIGIT_FONT_SIZE = 14;
const FIVE_DIGIT_FONT_SIZE = 10;

/**
 * Tile sizes
 */
const TILE_WITH_BORDER = 42;
const TILE_WITHOUT_BORDER = 50;
const BORDER_WIDTH = 4;

/**
 * Default tile styles
 */
const DEFAULT = {
  height: TILE_WITH_BORDER,
  width: TILE_WITH_BORDER,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: DEFAULT_FONT_SIZE,
  backgroundColor: colors.LIGHT,
  color: colors.DARK,
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid",
};

/**
 * Tile styles for different values
 */
const STYLES: { [key in string]: SystemStyleObject<typeof theme> } = {
  tile_2: {
    height: TILE_WITHOUT_BORDER,
    width: TILE_WITHOUT_BORDER,
    backgroundColor: colors.BRAND,
    color: colors.LIGHT,
    border: "none",
  },
  tile_3: {
    height: TILE_WITHOUT_BORDER,
    width: TILE_WITHOUT_BORDER,
    backgroundColor: colors.ACCENT,
    color: colors.DARK,
    border: "none",
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

const SMALL_TILE_WITHOUT_BORDER = {
  height: 24,
  width: 24,
};

const SMALL_TILE_WITH_BORDER = {
  height: 16,
  width: 16,
  borderWidth: 4,
};

const getPixelsFromCoordinates = ({ row, col }: Coordinates) => {
  const top = row * 50 + row * 5;
  const left = col * 50 + col * 5;
  return {
    top,
    left,
    bottom: top - 50,
    right: left - 50,
  };
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
  const { top, left, bottom, right } = getPixelsFromCoordinates(coordinates);

  const [scale, setScale] = useState(isNew ? 0 : 1);

  useEffect(() => {
    if (isMerge || isNew) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [isMerge, isNew]);

  return (
    <Box
      sx={[
        DEFAULT,
        STYLES[`tile_${value}`],
        {
          zIndex: isNew ? 0 : value,
          position: "absolute",
          top,
          left,
          transform: `scale(${scale})`,
          transitionProperty: "left, top, transform",
          transitionDuration: "250ms, 250ms, 100ms",
        },
      ]}
    >
      {value}
    </Box>
  );
}

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

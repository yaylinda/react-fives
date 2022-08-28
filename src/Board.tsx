import { Box } from "@mui/material";
import useGameModeStore from "./stores/gameModeStore";
import useGameStore from "./stores/gameStore";
import { colors } from "./theme";
import Tile from "./Tile";
import { getBoardConfig } from './utils/utils';

function Board() {
  const { tileLocations } = useGameStore();
  const { gameMode } = useGameModeStore();
  const { numRows, numCols, tileSize, tileSpacing } = getBoardConfig(gameMode);

  const spacing = `${tileSpacing}px`;

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing }}>
        {Array.from(Array(numRows)).map((_, r) => (
          <Box
            key={`row_${r}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: spacing,
            }}
          >
            {Array.from(Array(numCols)).map((_, c) => (
              <Box
                key={`row_${r}_col_${c}`}
                sx={{
                  height: tileSize,
                  width: tileSize,
                  backgroundColor: colors.DARK,
                  borderRadius: "50%",
                }}
              ></Box>
            ))}
          </Box>
        ))}
      </Box>
      {Object.values(tileLocations).map((tile) => {
        return <Tile key={tile.tile.id} {...tile} />;
      })}
    </Box>
  );
}

export default Board;

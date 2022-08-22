import { Box } from "@mui/material";
import useGameStore from "./stores/gameStore";
import { colors } from "./theme";
import Tile from "./Tile";
import { NUM_COLS, NUM_ROWS } from "./utils/constants";

function Board() {
  const { tileLocations } = useGameStore();

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {Array.from(Array(NUM_ROWS)).map((_, r) => (
          <Box
            key={`row_${r}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            {Array.from(Array(NUM_COLS)).map((_, c) => (
              <Box
                key={`row_${r}_col_${c}`}
                sx={{
                  height: 50,
                  width: 50,
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

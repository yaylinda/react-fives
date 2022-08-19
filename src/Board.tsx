import { Box } from "@mui/material";
import useGameStore from "./gameStore";
import { colors } from "./theme";
import Tile from "./Tile";

function Board() {
  const { board } = useGameStore();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {board.map((row, r) => (
        <Box
          key={`row_${r}`}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          {row.map((cell, c) => (
            <Box
              key={`row_${r}_col_${c}`}
              sx={{
                height: 50,
                width: 50,
                backgroundColor: colors.DARK,
                borderRadius: "50%",
              }}
            >
              <Tile value={cell.value} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default Board;

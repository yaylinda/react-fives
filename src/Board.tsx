import { Box } from "@mui/material";
import useGameStore from "./stores/gameStore";
import { colors } from "./theme";
import Tile from "./Tile";

function Board() {
  const { board } = useGameStore();

  // TODO - animations on board when tiles move

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
              key={`row_${r}_col_${c}_val_${cell.value}_isNew_${cell.isNew}`}
              sx={{
                height: 50,
                width: 50,
                backgroundColor: colors.DARK,
                borderRadius: "50%",
              }}
            >
              <Tile {...cell} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default Board;

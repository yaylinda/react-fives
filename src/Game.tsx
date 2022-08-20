import { Box } from "@mui/material";
import Board from "./Board";
import GameButtons from "./GameButtons";
import StatsBar from "./StatsBar";
import { colors } from "./theme";

/**
 *
 * @returns
 */
function Game() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: colors.LIGHT,
        width: 270,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 5,
      }}
    >
      <StatsBar />
      <Board />
      <GameButtons />
    </Box>
  );
}

export default Game;

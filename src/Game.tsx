import { Box } from "@mui/material";
import Board from "./Board";
import GameButtons from "./GameButtons";
import GameStatsBar from "./GameStatsBar";
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
        marginTop: 3,
      }}
    >
      <GameStatsBar />
      <Board />
      <GameButtons />
    </Box>
  );
}

export default Game;

import { Box } from "@mui/material";
import GameBoard from "./GameBoard";
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
      <GameBoard />
      <GameButtons />
    </Box>
  );
}

export default Game;

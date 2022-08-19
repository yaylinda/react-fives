import { Box } from "@mui/material";
import Board from "./Board";
import GameButtons from "./GameButtons";
import useGameStore from "./gameStore";
import StatsBar from "./StatsBar";
import { colors } from "./theme";

/**
 *
 * @returns
 */
function Game() {
  const { hasStarted, isGameOver, newGame } = useGameStore();

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

import { Box, Button, Typography } from "@mui/material";
import useGameStore from "./gameStore";
import { colors } from "./theme";

function GameButtons() {
  const { hasStarted, isGameOver, newGame } = useGameStore();

  /**
   *
   * @returns
   */
  const renderPrePostGameButtons = () => {
    return (
      <Button
        variant="contained"
        onClick={newGame}
        sx={{ color: colors.LIGHT }}
      >
        <Typography>New Game</Typography>
      </Button>
    );
  };

  /**
   *
   * @returns
   */
  const renderInGameButtons = () => {
    return (
      <>
        <Button
          variant="outlined"
          onClick={newGame}
          sx={{ color: colors.LIGHT }}
        >
          <Typography>Restart</Typography>
        </Button>
      </>
    );
  };

  // TODO - button to restart game in the middle of a game
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!hasStarted || isGameOver
        ? renderPrePostGameButtons()
        : renderInGameButtons()}
    </Box>
  );
}

export default GameButtons;

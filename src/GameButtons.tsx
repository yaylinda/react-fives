import { Box, Button, Typography } from "@mui/material";
import useGameStore from "./gameStore";
import { colors } from "./theme";

function GameButtons() {
  const { hasStarted, isGameOver, newGame } = useGameStore();

  if (!(!hasStarted || isGameOver)) {
    return null;
  }

  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={newGame}
        sx={{ backgroundColor: colors.BRAND, color: colors.LIGHT }}
      >
        <Typography>New Game</Typography>
      </Button>
    </Box>
  );
}

export default GameButtons;

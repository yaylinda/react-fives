import { Box, Button, IconButton, Typography } from "@mui/material";
import useGameStore from "./gameStore";
import { colors } from "./theme";
import { MoveDirection } from "./types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 *
 * @param param0
 * @returns
 */
const OnScreenKey = ({ dir }: { dir: MoveDirection }) => {
  const { move } = useGameStore();

  const getDirectionIcon = () => {
    switch (dir) {
      case MoveDirection.UP:
        return <ArrowUpwardIcon />;
      case MoveDirection.DOWN:
        return <ArrowDownwardIcon />;
      case MoveDirection.LEFT:
        return <ArrowBackIcon />;
      case MoveDirection.RIGHT:
        return <ArrowForwardIcon />;
    }
  };

  return (
    <Button
      onClick={() => move(dir)}
      sx={{ borderWidth: 1, borderStyle: "solid", borderColor: colors.BRAND }}
      color="info"
      size="large"
    >
      {getDirectionIcon()}
    </Button>
  );
};

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <OnScreenKey dir={MoveDirection.LEFT} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <OnScreenKey dir={MoveDirection.UP} />
            <OnScreenKey dir={MoveDirection.DOWN} />
          </Box>
          <OnScreenKey dir={MoveDirection.RIGHT} />
        </Box>
        <Button
          size="large"
          variant="outlined"
          onClick={newGame}
          sx={{ borderWidth: 2, color: colors.LIGHT }}
        >
          <Typography>Restart</Typography>
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        marginTop: 3,
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

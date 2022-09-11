import { Box, Button } from "@mui/material";
import useGameStore from "../stores/gameStore";
import { colors } from "../theme";
import { MoveDirection } from "../types";
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
      sx={{ borderWidth: 1, borderStyle: "solid", borderColor: colors.BRAND, width: 60, height: 60 }}
      color="info"
      size="large"
    >
      {getDirectionIcon()}
    </Button>
  );
};

/**
 *
 * @returns
 */
function GameButtons() {
  const { hasStarted, isGameOver } = useGameStore();

  /**
   *
   * @returns
   */
  const renderInGameButtons = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: 270 }}>

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
          <OnScreenKey dir={MoveDirection.UP} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', gap: 8 }}>
          <OnScreenKey dir={MoveDirection.LEFT} />
          <OnScreenKey dir={MoveDirection.RIGHT} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
          <OnScreenKey dir={MoveDirection.DOWN} />
        </Box>

      </Box>
    );
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        justifyContent: "center",
        width: 270
      }}
    >
      {hasStarted && !isGameOver && renderInGameButtons()}
    </Box>
  );
}

export default GameButtons;

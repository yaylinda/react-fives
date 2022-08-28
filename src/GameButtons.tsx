import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import useGameStore from "./stores/gameStore";
import { colors } from "./theme";
import { MoveDirection } from "./types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import DialogTransition from "./DialogTransition";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useHighScoresStore from "./stores/highScoresStore";

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

/**
 *
 * @returns
 */
function GameButtons() {
  const [showConfirmRestartDialog, setShowConfirmRestartDialog] =
    useState<boolean>(false);
  const { hasStarted, isGameOver, newGame } = useGameStore();
  const { resetPosting } = useHighScoresStore();

  /**
   *
   * @returns
   */
  const renderPrePostGameButtons = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: 270 }}>
        <Button
          variant="contained"
          onClick={() => {
            resetPosting();
            newGame();
          }}
          sx={{ color: colors.LIGHT }}
        >
          <Typography>New Game</Typography>
        </Button>
      </Box>
    );
  };

  /**
   *
   * @returns
   */
  const renderInGameButtons = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: 270 }}>
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
        <Button onClick={() => setShowConfirmRestartDialog(true)}>
          <Typography>Restart</Typography>
        </Button>
      </Box>
    );
  };

  /**
   *
   */
  const restart = () => {
    setShowConfirmRestartDialog(false);
    newGame();
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
      {!hasStarted || isGameOver
        ? renderPrePostGameButtons()
        : renderInGameButtons()}
      <Dialog
        open={showConfirmRestartDialog}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={() => setShowConfirmRestartDialog(false)}
      >
        <DialogTitle sx={{ color: colors.LIGHT }}>Restart?</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <IconButton
            sx={{ color: "red" }}
            onClick={() => setShowConfirmRestartDialog(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <IconButton sx={{ color: "green" }} onClick={restart}>
            <CheckIcon fontSize="large" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GameButtons;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useGameStore from "./stores/gameStore";
import useHighScoresStore from "./stores/highScoresStore";
import { colors } from "./theme";

function GameOverDialog() {
  const {
    showGameOverDialog,
    moves,
    score,
    merged,
    generated,
    newGame,
    closeGameOverDialog,
  } = useGameStore();

  const { loading, scores } = useHighScoresStore();

  // TODO - show bar chart or some cool visualization of merged/generated
  return (
    <Dialog
      open={showGameOverDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeGameOverDialog}
    >
      <DialogTitle color={{ sx: colors.LIGHT }}>Game Over</DialogTitle>
      <DialogContent>
        <DialogContentText>Score: {score}</DialogContentText>
        <DialogContentText>Moves: {moves}</DialogContentText>
        <DialogContentText>Merged: {JSON.stringify(merged)}</DialogContentText>
        <DialogContentText>
          Generated: {JSON.stringify(generated)}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={closeGameOverDialog}>OK</Button>
        <Button onClick={newGame}>New Game</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameOverDialog;

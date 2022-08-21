import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useGameStore from "./gameStore";

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

  // TODO - show bar chart or some cool visualization of merged/generated
  return (
    <Dialog
      open={showGameOverDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeGameOverDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Game Over</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography>Score: {score}</Typography>
          <Typography>Moves: {moves}</Typography>
          <Typography>Merged: {JSON.stringify(merged)}</Typography>
          <Typography>Generated: {JSON.stringify(generated)}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeGameOverDialog}>OK</Button>
        <Button onClick={newGame}>New Game</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameOverDialog;

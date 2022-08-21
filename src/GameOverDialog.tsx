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
        <DialogContentText>Score: {score}</DialogContentText>
        <DialogContentText>Moves: {moves}</DialogContentText>
        <DialogContentText>Merged: {JSON.stringify(merged)}</DialogContentText>
        <DialogContentText>
          Generated: {JSON.stringify(generated)}
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import useGameStore from "./gameStore";

/**
 *
 */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      className="dialog"
      open={showGameOverDialog}
      TransitionComponent={Transition}
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

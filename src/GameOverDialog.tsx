import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import DialogTransition from "./DialogTransition";
import useGameStore from "./stores/gameStore";
import useHighScoresStore from "./stores/highScoresStore";
import { colors } from "./theme";
import LoadingButton from "@mui/lab/LoadingButton";

function GameOverDialog() {
  const { moves, score, currentGameId, newGame, closeGameOverDialog } =
    useGameStore();

  const { posting, lastUploadedGameId, openPostScoreDialog, openDialog } =
    useHighScoresStore();

  const canPostHighScore = lastUploadedGameId !== currentGameId;

  /**
   *
   */
  const openHighScoreDialog = () => {};

  // TODO - show bar chart or some cool visualization of merged/generated
  return (
    <Dialog
      open={true}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeGameOverDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>Game Over</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            color: colors.LIGHT,
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <DialogContentText sx={{ color: colors.LIGHT }}>
            You scored
          </DialogContentText>
          <DialogContentText sx={{ color: colors.ACCENT }}>
            {score}
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>
            points
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>in</DialogContentText>
          <DialogContentText sx={{ color: colors.ACCENT }}>
            {moves}
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>
            moves
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <LoadingButton
          loading={posting}
          onClick={() => {
            canPostHighScore ? openPostScoreDialog() : openDialog();
          }}
        >
          {canPostHighScore ? "Post" : "Scores"}
        </LoadingButton>
        <Button onClick={newGame}>New Game</Button>
        <Button
          onClick={() => {
            /* TODO - implement */
          }}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameOverDialog;
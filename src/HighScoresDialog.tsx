import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "./stores/highScoresStore";
import { colors } from "./theme";

function HighScoresDialog() {
  const { showDialog, closeDialog } = useHighScoresStore();

  return (
    <Dialog
      open={showDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>High Scores</DialogTitle>
      <DialogContent>
        <DialogContentText>Coming soon... :)</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={closeDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default HighScoresDialog;

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
  const { showDialog, openDialog, closeDialog } = useHighScoresStore();

  return (
    <Dialog
      open={showDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={openDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>High Scores</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={closeDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default HighScoresDialog;

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "./stores/highScoresStore";
import { colors } from "./theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function PostHighScoreDialog() {
  const { showPostScoreDialog, closePostScoreDialog } = useHighScoresStore();

  const postScore = () => {};

  return (
    <Dialog
      open={showPostScoreDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closePostScoreDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>Post score?</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton sx={{ color: "red" }} onClick={closePostScoreDialog}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "green" }} onClick={postScore}>
          <CheckIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default PostHighScoreDialog;

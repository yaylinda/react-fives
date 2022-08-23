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
  TextField,
  Typography,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "./stores/highScoresStore";
import { colors } from "./theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useUserStore from "./stores/userStore";
import useGameStore from "./stores/gameStore";
import { HighScore } from "./types";
import { postHighScore } from "./api/highScores";

function PostHighScoreDialog() {
  const { moves, score, merged, generated, currentGameId } = useGameStore();
  const {
    showPostScoreDialog,
    posting,
    closePostScoreDialog,
    setPosting,
    setSuccessfullyPosted,
  } = useHighScoresStore();
  const { clientId, username, setUsername } = useUserStore();

  const postScore = async () => {
    const highScore: HighScore = {
      username: username ? username : clientId,
      clientId,
      gameId: currentGameId,
      gameSeed: null,
      score,
      moves,
      merged,
      generated,
    };

    try {
      setPosting(true);
      await postHighScore(highScore);
      setSuccessfullyPosted(true);
      setPosting(false);
      closePostScoreDialog();
    } catch (e) {
      setSuccessfullyPosted(false);
      setPosting(false);
    }
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Dialog
      open={showPostScoreDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closePostScoreDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>Post score?</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Username"
          variant="standard"
          focused
          value={username}
          onChange={onUsernameChange}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Box>
            <DialogContentText sx={{ color: colors.LIGHT }}>
              Score
            </DialogContentText>
            <DialogContentText
              sx={{ textAlign: "center", color: colors.LIGHT }}
            >
              {score}
            </DialogContentText>
          </Box>
          <Box>
            <DialogContentText sx={{ color: colors.LIGHT }}>
              Moves
            </DialogContentText>
            <DialogContentText
              sx={{ textAlign: "center", color: colors.LIGHT }}
            >
              {moves}
            </DialogContentText>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          sx={{ color: "red" }}
          onClick={closePostScoreDialog}
          disabled={posting}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <LoadingButton
          sx={{ color: "green" }}
          onClick={postScore}
          disabled={posting}
          loading={posting}
        >
          <CheckIcon fontSize="large" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default PostHighScoreDialog;

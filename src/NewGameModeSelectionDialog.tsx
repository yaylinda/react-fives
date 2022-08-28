import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import DialogTransition from "./DialogTransition";
import useGameModeStore from "./stores/gameModeStore";
import useGameStore from "./stores/gameStore";
import { colors } from "./theme";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const NewGameModeSelectionDialog = () => {

  const { showNewGameModeSelectionDialog, openNewGameModeSelectionDialog, closeNewGameModeSelectionDialog } = useGameModeStore();
  const { newGame } = useGameStore();

  const startNewGame = () => {
    // reset mode
    // reset points
    // reset high score stuff
    // reset game
  }

  return (
    <Dialog
      open={showNewGameModeSelectionDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeNewGameModeSelectionDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>New Game?</DialogTitle>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          sx={{ color: "red" }}
          onClick={closeNewGameModeSelectionDialog}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "green" }} onClick={startNewGame}>
          <CheckIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default NewGameModeSelectionDialog;
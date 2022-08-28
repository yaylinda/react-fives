import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import DialogTransition from "./DialogTransition";
import useGameModeStore from "../stores/gameModeStore";
import useGameStore from "../stores/gameStore";
import { colors } from "../theme";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from "react";
import { GameMode } from "../types";
import useHighScoresStore from "../stores/highScoresStore";

const styles = {
  toggleButtonStyle: { width: '100%', justifyContent: 'flex-start', gap: 2, border: 'none' },
}

const NewGameModeSelectionDialog = () => {

  const { gameMode, showNewGameModeSelectionDialog, closeNewGameModeSelectionDialog, updateMode } = useGameModeStore();
  const { newGame } = useGameStore();
  const { resetPosting } = useHighScoresStore();
  const [selectedMode, setSelectedMode] = useState<GameMode>(gameMode);

  const startNewGame = () => {
    updateMode(selectedMode);
    newGame();
    resetPosting();
    closeNewGameModeSelectionDialog();
  }

  return (
    <Dialog
      open={showNewGameModeSelectionDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeNewGameModeSelectionDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>New Game?</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedMode}
          exclusive
          onChange={(event, newGameMode) => setSelectedMode(newGameMode)}
          sx={{
            '& .MuiSvgIcon-fontSizeMedium': { color: colors.LIGHT },
            '& .MuiTypography-body1': { color: colors.LIGHT },
            '& .Mui-selected .MuiSvgIcon-fontSizeMedium': { color: colors.BRAND },
            '& .Mui-selected .MuiTypography-body1': { color: colors.BRAND },
          }}
        >
          <ToggleButton value={GameMode.DAILY_CHALLENGE} sx={styles.toggleButtonStyle}>
            <AccessTimeIcon />
            <Typography>Daily Challenge</Typography>
          </ToggleButton>
          <ToggleButton value={GameMode.FOUR_BY_FOUR} sx={styles.toggleButtonStyle}>
            <Filter4Icon />
            <Typography>4x4</Typography>
          </ToggleButton>
          <ToggleButton value={GameMode.FIVE_BY_FIVE} sx={styles.toggleButtonStyle}>
            <Filter5Icon />
            <Typography>5x5</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
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
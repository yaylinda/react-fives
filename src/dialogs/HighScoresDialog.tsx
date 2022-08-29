import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { fetchHighScores } from "../api/highScores";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { GameMode, HighScoreDoc } from "../types";
import useGameModeStore from "../stores/gameModeStore";
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HighScoreRow = ({
  highScore,
  index,
}: {
  highScore: HighScoreDoc;
  index: number;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "" }}>
      <DialogContentText
        sx={{ display: "flex", flex: 1, color: colors.LIGHT }}
      >{`${index + 1}.`}</DialogContentText>
      <DialogContentText sx={{ display: "flex", flex: 2, color: colors.LIGHT }}>
        {highScore.username}
      </DialogContentText>
      <DialogContentText
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          color: colors.LIGHT,
        }}
      >
        {highScore.score}
      </DialogContentText>
    </Box>
  );
};

function HighScoresDialog() {
  const { gameMode } = useGameModeStore();
  const { showHighScoresDialog, fetching, highScores, closeHighScoresDialog, setHighScores, startFetchingHighScores } = useHighScoresStore();
  const [gameModeTab, setGameModeTab] = useState<GameMode>(gameMode);

  useEffect(() => {
    startFetchingHighScores();
    fetchHighScores().then((highScores) => {
      setHighScores(orderBy(highScores, ["score"], ["desc"]));
    });
  }, []);

  useEffect(() => {
    setGameModeTab(gameMode);
  }, [gameMode]);

  return (
    <Dialog
      open={showHighScoresDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeHighScoresDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>High Scores</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={gameModeTab} onChange={(event, newTab) => setGameModeTab(newTab)}>
            <Tab icon={<AccessTimeIcon />} value={GameMode.DAILY_CHALLENGE} />
            <Tab icon={<Filter4Icon />} value={GameMode.FOUR_BY_FOUR} />
            <Tab icon={<Filter5Icon />} value={GameMode.FIVE_BY_FIVE} />
          </Tabs>
        </Box>
        {highScores.filter((hs) => hs.gameMode === gameModeTab).map((highScore, i) => (
          <HighScoreRow
            key={highScore.gameId}
            highScore={highScore}
            index={i}
          />
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={closeHighScoresDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default HighScoresDialog;

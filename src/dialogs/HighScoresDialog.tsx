import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { fetchHighScores } from "../api/highScores";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { HighScoreDoc } from "../types";

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
  const [highScores, setHighScores] = useState<HighScoreDoc[]>([]);
  const { showHighScoresDialog, closeHighScoresDialog } = useHighScoresStore();

  useEffect(() => {
    fetchHighScores().then((highScores) => {
      setHighScores(orderBy(highScores, ["score"], ["desc"]));
    });
  }, []);

  return (
    <Dialog
      open={showHighScoresDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeHighScoresDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>High Scores</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        {highScores.map((highScore, i) => (
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

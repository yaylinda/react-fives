import { Box, Button, Typography } from "@mui/material";
import Board from "./Board";
import useGameStore from "./gameStore";
import { colors } from "./theme";
import Tile from "./Tile";

/**
 *
 * @param param0
 * @returns
 */
const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box>
      <Typography>{label}</Typography>
      <Typography sx={{ textAlign: "center" }}>{value}</Typography>
    </Box>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const StatsBar = ({ score, moves }: { score: number; moves: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 2,
      }}
    >
      <Stat label="Score" value={`${score}`} />
      <Stat label="Moves" value={`${moves}`} />
    </Box>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const NextBar = ({ nextValues }: { nextValues: number[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Typography>Next</Typography>
      <Box>
        {nextValues.map((v) => (
          <Tile key={v} value={v} />
        ))}
      </Box>
    </Box>
  );
};

/**
 *
 * @returns
 */
function Game() {
  const {
    hasStarted,
    isGameOver,
    showGameOverDialog,
    moves,
    score,
    merged,
    generated,
    nextValues,
    move,
    newGame,
    closeGameOverDialog,
  } = useGameStore();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: colors.LIGHT,
        marginTop: 5,
        width: 270,
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <StatsBar score={score} moves={moves} />
      <NextBar nextValues={nextValues} />
      <Board />
      {(!hasStarted || isGameOver) && (
        <Button variant="contained" onClick={newGame}>
          <Typography>New Game</Typography>
        </Button>
      )}
    </Box>
  );
}

export default Game;

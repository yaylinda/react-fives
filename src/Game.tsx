import { Button, Typography } from "@mui/material";
import Board from "./Board";
import "./Game.css";
import useGameStore from "./gameStore";
import Tile from "./Tile";

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
    <div className="game">
      <div className="statsBar">
        <div className="stat">
          <Typography>Score</Typography>
          <Typography>{score}</Typography>
        </div>
        <div className="stat">
          <Typography>Moves</Typography>
          <Typography>{moves}</Typography>
        </div>
      </div>
      <div className="nextBar">
        <Typography>Next</Typography>
        <div>
          {nextValues.map((v) => (
            <Tile key={v} value={v} />
          ))}
        </div>
      </div>
      <Board />
      {(!hasStarted || isGameOver) && (
        <Button
          className="button"
          variant="contained"
          color="success"
          onClick={newGame}
        >
          <Typography>New Game</Typography>
        </Button>
      )}
    </div>
  );
}

export default Game;

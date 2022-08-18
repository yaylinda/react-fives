import "./App.css";
import Board from "./Board";
import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./gameStore";
import { convertKeyCodeToDirection } from "./utils";
import Button from "@mui/material/Button";
import {
  AppBar,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const ANIMATION_DURATION = 100;

const theme = createTheme({
  typography: {
    fontFamily: ["Silkscreen"].join(","),
  },
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const {
    hasStarted,
    isGameOver,
    showGameOverDialog,
    moves,
    score,
    move,
    newGame,
    closeGameOverDialog,
  } = useGameStore();

  /**
   *
   * @param e
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // disables page scrolling with keyboard arrows
    const dir = convertKeyCodeToDirection(e.code);
    if (dir) {
      move(dir);
    }
  };

  /**
   *
   */
  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    ANIMATION_DURATION,
    { leading: true, trailing: false }
  );

  /**
   *
   */
  useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <AppBar className="appBar" position="static">
          <Toolbar>
            <Typography
              className="headerText"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Fives
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="statsBar">
          <Typography>Score: {score}</Typography>
          <Typography>Moves: {moves}</Typography>
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
        <Dialog
          className="dialog"
          open={showGameOverDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeGameOverDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Game Over</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography>Score: {score}</Typography>
              <Typography>Moves: {moves}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeGameOverDialog}>OK</Button>
            <Button onClick={newGame}>New Game</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;

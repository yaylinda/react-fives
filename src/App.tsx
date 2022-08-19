import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./gameStore";
import { convertKeyCodeToDirection } from "./utils";
import { AppBar, ThemeProvider, Toolbar, Typography } from "@mui/material";
import Game from "./Game";
import GameOverDialog from "./GameOverDialog";
import theme, { colors } from "./theme";

const ANIMATION_DURATION = 100;

function App() {
  const { move } = useGameStore();

  /**
   * When arrow keys are pressed, do the correct move on the board.
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // disables page scrolling with keyboard arrows
    const dir = convertKeyCodeToDirection(e.code);
    if (dir) {
      move(dir);
    }
  };

  /**
   * Throttle keydown events to prevent spamming.
   */
  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    ANIMATION_DURATION,
    { leading: true, trailing: false }
  );

  /**
   * Setup listener for keyboard events.
   */
  useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: colors.BRAND }}>
        <Toolbar>
          <Typography sx={{ fontSize: 40, textAlign: "center", flexGrow: 1 }}>
            Fives
          </Typography>
        </Toolbar>
      </AppBar>
      <Game />
      <GameOverDialog />
    </ThemeProvider>
  );
}

export default App;

import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./stores/gameStore";
import { convertKeyCodeToDirection } from "./utils/utils";
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

  // TODO - if on mobile, implement swipe

  // TODO - implement a help dialog

  // TODO - implement a configurations option for num rows/cells, gen distro

  // TODO - implement personal achievements

  // TODO - implement online high score

  // TODO - implement local high score

  // TODO - fix weird vertical scrolling issue on mobile

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ color: colors.LIGHT }}>
        <Toolbar variant="dense">
          <Typography sx={{ fontSize: 30, textAlign: "center", flexGrow: 1 }}>
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

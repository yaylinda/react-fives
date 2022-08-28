import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./stores/gameStore";
import { convertKeyCodeToDirection } from "./utils/utils";
import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Game from "./Game";
import GameOverDialog from "./GameOverDialog";
import theme, { colors } from "./theme";
import useUserStore from "./stores/userStore";
import moment from "moment";
import useHighScoresStore from "./stores/highScoresStore";
import HighScoresDialog from "./HighScoresDialog";
import PostHighScoreDialog from "./PostHighScoreDialog";
import useGameModeStore from "./stores/gameModeStore";
import { GameMode } from "./types";
import NewGameModeSelectionDialog from "./NewGameModeSelectionDialog";
import { BOARD_WIDTH } from "./styles";

const ANIMATION_DURATION = 100;

function App() {
  const { move, restoreState } = useGameStore();
  const { init: initUserStore } = useUserStore();
  const { init: initHighScoresStore, openHighScoresDialog } = useHighScoresStore();
  const { mode, init: initModeStore, openNewGameModeSelectionDialog } = useGameModeStore();

  useEffect(() => {
    restoreState();
    initUserStore();
    initHighScoresStore();
    initModeStore();
  }, []);

  /**
   * When arrow keys are pressed, do the correct move on the board.
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    const dir = convertKeyCodeToDirection(e.code);

    if (dir) {
      move(dir);
      e.preventDefault(); // disables page scrolling with keyboard arrows
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
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // TODO - if on mobile, implement swipe

  // TODO - implement a help dialog

  // TODO - implement a configurations option for num rows/cells, gen distro

  // TODO - implement personal achievements

  // TODO - implement online high score

  // TODO - implement local high score

  // TODO - fix weird vertical scrolling issue on mobile

  // TODO - use variable mapping for colors/values of tiles

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Button variant="contained" sx={{ color: colors.LIGHT, width: BOARD_WIDTH }} onClick={openNewGameModeSelectionDialog}>
          <Typography>New Game</Typography>
        </Button>
        <Button sx={{ width: BOARD_WIDTH }} onClick={openHighScoresDialog}>
          <Typography>Show high scores</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.DARK,
          position: "absolute",
          textAlign: "center",
          bottom: 0,
          color: colors.LIGHT,
          paddingTop: 1,
          paddingBottom: 1,
          width: "100%",
        }}
      >
        <Typography
          fontSize={10}
        >{`© ${moment().year()} YayLinda Inc.`}</Typography>
      </Box>
      <GameOverDialog />
      <HighScoresDialog />
      <PostHighScoreDialog />
      <NewGameModeSelectionDialog />
    </ThemeProvider>
  );
}

export default App;

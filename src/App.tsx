import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./stores/gameStore";
import { convertKeyCodeToDirection } from "./utils/utils";
import {
  AppBar,
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Game from "./Game";
import GameOverDialog from "./dialogs/GameOverDialog";
import theme, { colors } from "./theme";
import useUserStore from "./stores/userStore";
import moment from "moment";
import useHighScoresStore from "./stores/highScoresStore";
import HighScoresDialog from "./dialogs/HighScoresDialog";
import PostHighScoreDialog from "./dialogs/PostHighScoreDialog";
import useGameModeStore from "./stores/gameModeStore";
import NewGameModeSelectionDialog from "./dialogs/NewGameModeSelectionDialog";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { BOARD_WIDTH } from "./styles";

const ANIMATION_DURATION = 100;

function App() {
  const { hasStarted, isGameOver, move, restoreState } = useGameStore();
  const { init: initUserStore } = useUserStore();
  const { init: initHighScoresStore, openHighScoresDialog } = useHighScoresStore();
  const { gameMode, init: initModeStore, openNewGameModeSelectionDialog } = useGameModeStore();

  useEffect(() => {
    initModeStore();
    restoreState();
    initUserStore();
    initHighScoresStore();
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

  /**
   * Header Componet
   */
  const renderHeader = () => {
    return (
      <AppBar position="static" sx={{ color: colors.LIGHT }}>
        <Toolbar variant="dense">
          <Typography sx={{ fontSize: 30, textAlign: "center", flexGrow: 1 }}>
            Fives
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  /**
   * Rendered as buttons before/after a game.
   * Rendered as FAB during a game.
   */
  const renderActions = () => {
    if (hasStarted && !isGameOver) {
      return (<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="game-actions"
          sx={{ position: 'absolute', bottom: 40, right: 40, '.MuiSpeedDial-fab': { backgroundColor: colors.ACCENT }}}
          icon={<KeyboardArrowUpIcon />}
        >
          <SpeedDialAction
            key="newGame"
            icon={<FiberNewIcon />}
            tooltipTitle="New Game"
            onClick={openNewGameModeSelectionDialog}
            sx={{ color: colors.LIGHT }}
          />
          <SpeedDialAction
            key="highScores"
            icon={<LeaderboardIcon />}
            tooltipTitle="See High Scores"
            onClick={openHighScoresDialog}
            sx={{ color: colors.LIGHT }}
          />
        </SpeedDial>
      </Box>);
    }

    return (
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
    );
  };

  const renderFooter = () => {
    return (
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
        <Typography fontSize={10}>{`© ${moment().year()} YayLinda Inc.`}</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      <Game />
      {renderActions()}
      {renderFooter()}
      <GameOverDialog />
      <HighScoresDialog />
      <PostHighScoreDialog />
      <NewGameModeSelectionDialog />
    </ThemeProvider>
  );
}

export default App;

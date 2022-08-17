import "./App.css";
import Board from "./Board";
import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./gameStore";
import { convertKeyCodeToDirection } from "./utils";
import Button from "@mui/material/Button";

const ANIMATION_DURATION = 250;

function App() {
  const { hasStarted, move, newGame } = useGameStore();

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
    <div className="app">
      <Board />
      {!hasStarted && (
        <Button variant="contained" color="success" onClick={newGame}>
          New Game
        </Button>
      )}
    </div>
  );
}

export default App;

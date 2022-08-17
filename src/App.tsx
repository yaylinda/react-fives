import "./App.css";
import Board from "./Board";
import { useThrottledCallback } from "use-debounce";
import { useEffect } from "react";
import useGameStore from "./gameStore";
import { convertKeyCodeToDirection } from "./utils";

const ANIMATION_DURATION = 250;

function App() {
  const { move } = useGameStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // disables page scrolling with keyboard arrows
    const dir = convertKeyCodeToDirection(e.code);
    if (dir) {
      move(dir);
    }
  };

  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    ANIMATION_DURATION,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);

  return (
    <div className="app">
      <Board />
    </div>
  );
}

export default App;

import { Box } from "@mui/material";
import useGameModeStore from "../stores/gameModeStore";
import useGameStore from "../stores/gameStore";
import { colors } from "../theme";
import Tile from "./Tile";
import { getBoardConfig } from "../utils/utils";
import { MoveDirection } from "../types";
import { useState, TouchEvent } from "react";

const SWIPE_DISTANCE_THRESHOLD = 50;

function GameBoard() {
  const { tileLocations, lastMoveDirection, move } = useGameStore();
  const { gameMode } = useGameModeStore();
  const { numRows, numCols, tileSize, tileSpacing } = getBoardConfig(gameMode);
  const spacing = `${tileSpacing}px`;

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    e.preventDefault();
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    e.preventDefault();
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;

    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      // Horizontal swipe
      const isLeftSwipe = xDistance > SWIPE_DISTANCE_THRESHOLD;
      const isRightSwipe = xDistance < -SWIPE_DISTANCE_THRESHOLD;

      if (isLeftSwipe) {
        move(MoveDirection.LEFT);
      } else if (isRightSwipe) {
        move(MoveDirection.RIGHT);
      }
    } else {
      // Vertical swipe
      const isUpSwipe = yDistance > SWIPE_DISTANCE_THRESHOLD;
      const isDownSwipe = yDistance < -SWIPE_DISTANCE_THRESHOLD;

      if (isUpSwipe) {
        move(MoveDirection.UP);
      } else if (isDownSwipe) {
        move(MoveDirection.DOWN);
      }
    }

    e.preventDefault();
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Box sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: spacing }}>
          {Array.from(Array(numRows)).map((_, r) => (
            <Box
              key={`row_${r}`}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: spacing,
              }}
            >
              {Array.from(Array(numCols)).map((_, c) => (
                <Box
                  key={`row_${r}_col_${c}`}
                  sx={{
                    height: tileSize,
                    width: tileSize,
                    backgroundColor: colors.DARK,
                    borderRadius: "50%",
                  }}
                ></Box>
              ))}
            </Box>
          ))}
        </Box>
        {Object.values(tileLocations)
          .reverse()
          .map((tile) => {
            return <Tile key={tile.tile.id} {...tile} />;
          })}
      </Box>
    </div>
  );
}

export default GameBoard;

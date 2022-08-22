import { Box, Typography } from "@mui/material";
import useGameStore from "./stores/gameStore";
import { PreviewTile } from "./Tile";

function StatsBar() {
  const { hasStarted, moves, score, nextValue: nextValue } = useGameStore();

  if (!hasStarted) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
      }}
    >
      <Box>
        <Typography>Score</Typography>
        <Typography sx={{ textAlign: "center", fontSize: 20 }}>
          {score}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ marginBottom: 1 }}>Next</Typography>
        <PreviewTile value={nextValue} />
      </Box>
      <Box>
        <Typography>Moves</Typography>
        <Typography sx={{ textAlign: "center", fontSize: 20 }}>
          {moves}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatsBar;

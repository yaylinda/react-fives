import { createTheme } from "@mui/material";

export const colors = Object.freeze({
  BRAND: "#00ADB5",
  LIGHT: "#EEEEEE",
  DARK: "#222831",
  ACCENT: "#C5E99B",
});

/**
 *
 */
const theme = createTheme({
  typography: {
    fontFamily: ["Silkscreen"].join(","),
  },
  palette: {
    primary: {
      main: colors.BRAND,
    },
    secondary: {
      main: colors.ACCENT,
    },
    background: {
      paper: colors.DARK,
    },
    info: {
      main: colors.LIGHT,
    },
    text: {
      primary: colors.LIGHT,
    },
  },
});

export default theme;

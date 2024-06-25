import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";
import "@fontsource/poppins";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/fira-code";

const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans",
    body1: {
      fontFamily: "Fira Code",
    },
    h5: {
      fontFamily: "Fira Code",
    },
    h6: {
      fontFamily: "Fira Code",
    },
  },
});

export default theme;

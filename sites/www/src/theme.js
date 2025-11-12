import { createTheme } from "@mui/material/styles";
createTheme({ typography: { fontFamily: "Nanum Gothic, ..." } });

export const theme = createTheme({
  palette: {
    background: { default: "#F7F7F5" },
    primary: { main: "#2F6D3A", contrastText: "#FFFFFF" },
    text: { primary: "#121212", secondary: "rgba(0,0,0,0.56)" },
  },
  typography: {
    fontFamily: "Nanum Gothic, Arial, sans-serif",
    h1: h(),
    h2: h(),
    h3: h(),
    h4: h(),
    h5: h(),
    h6: h(),
    button: {
      fontFamily: "Zen Loop, Nanum Gothic, sans-serif",
      textTransform: "none",
      fontWeight: 400,
    },
  },
  components: {
    MuiAppBar: { defaultProps: { color: "primary" } }, // <- forțează AppBar să fie verde by default
  },
});

function h() {
  return { fontFamily: "Zen Loop, Nanum Gothic, sans-serif", fontWeight: 400 };
}

import Box from "@mui/material/Box";
import MinListeBackground from "./MinListeBackground";
import MinListeHeader from "./MinListeHeader";
import MinListeCtaPanel from "./MinListeCtaPanel";

export default function MinListe(props) {
  return (
    <Box sx={{ position: "relative", width: "100%" }} {...props}>
      <MinListeBackground
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <MinListeHeader style={{ width: "100%", height: "auto" }} />
      </Box>
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <MinListeCtaPanel style={{ width: "100%", height: "auto" }} />
      </Box>
    </Box>
  );
}

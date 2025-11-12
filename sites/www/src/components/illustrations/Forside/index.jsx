import Box from "@mui/material/Box";
import ForsideSvg from "./Forside.jsx";
import HeroButton from "./HeroButton.jsx";
import styles from "./Forside.module.css";

export default function ForsideIllustration() {
  return (
    <div className={styles.wrapper}>
      <ForsideSvg style={{ width: "100%", height: "auto" }} />
      <Box className={styles.cta}>
        <HeroButton />
      </Box>
    </div>
  );
}

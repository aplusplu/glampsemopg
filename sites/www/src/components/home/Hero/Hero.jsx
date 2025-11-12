import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { IMAGES } from "../../../assets/images.js";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

// XD: stort billede, blød overlay, stærk headline, 2 CTA'er
export default function Hero() {
  const nav = useNavigate();

  return (
    <motion.section
      className={styles.wrap}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        className={styles.media}
        src={IMAGES.image00}
        alt="Glamping ved Gudenåen"
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.kicker}>Naturlig luksus</span>
        <Typography variant="h4" className={styles.title}>
          Glamping ved Gudenåen
        </Typography>
        <div className={styles.actions}>
          <Button variant="contained" onClick={() => nav("/ophold")}>
            Se ophold
          </Button>
          <Button variant="outlined" onClick={() => nav("/kontakt")}>
            Kontakt
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

import { Box, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // <- înlocuiește calea dacă e altă locație
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container className={styles.inner}>
        <Box className={styles.social}>
          <IconButton
            component="a"
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            className={styles.iconBtn}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className={styles.iconBtn}
          >
            <InstagramIcon />
          </IconButton>
        </Box>

        <Box className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            <img src={logo} alt="Gittes Glamping" className={styles.logo} />
            <span>Gittes Glamping</span>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

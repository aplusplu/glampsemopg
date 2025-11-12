import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import styles from "./Forside.module.css";

import heroImg from "../../assets/image_00.jpg";
import gitteImg from "../../assets/gitte.jpg";

export default function Forside() {
  const API = useMemo(
    () => import.meta.env.VITE_SERVER_HOST || "http://localhost:3042",
    []
  );

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // === FETCH REVIEWS DIN BACKEND ===
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/reviews`, {
          headers: { Accept: "application/json" },
        });
        const json = await res.json();
        if (!alive) return;
        setReviews(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        console.error("Failed to load reviews", e);
        if (alive) setReviews([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [API]);

  return (
    <Container className={styles.page} maxWidth="xs">
      {/* HERO */}
      <Box className={styles.hero}>
        <img src={heroImg} alt="Gittes Glamping" />
        <div className={styles.heroShade} />
        <div className={styles.brandText}>
          <div className={styles.brandTop}>Gittes</div>
          <div className={styles.brandBottom}>Glamping</div>
        </div>
        <Button component={Link} to="/kontakt" className={styles.bookBtn}>
          BOOK NU
        </Button>
      </Box>

      {/* CAPSULA TEAL */}
      <Box className={styles.tealCapsule}>
        <Typography component="h2" className={styles.introH}>
          Kom og prøv
          <br />
          glamping hos Gitte!
        </Typography>
        <Typography className={styles.introP}>
          Vi er stolte af at byde dig velkommen til Gitte’s Glamping, hvor
          hjertevarme og omsorg møder naturens skønhed og eventyr. Vores
          dedikerede team, anført af Gitte selv, er her for at skabe den
          perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter
          at skabe minder og fordybelse, uanset om du besøger os som par,
          familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter
          og arrangementer, der passer til alle aldre og interesser. Udforsk
          naturen, slap af ved bålet, del historier med nye venner, eller find
          indre ro med vores wellnessaktiviteter.
        </Typography>

        <Avatar src={gitteImg} alt="Gitte" className={styles.gitteAvatar} />
        <Button component={Link} to="/ophold" className={styles.ctaBeige}>
          SE VORES OPHOLD
        </Button>
        <div className={styles.ctaPlate} aria-hidden="true" />
      </Box>

      {/* TITLU SECȚIUNE REVIEW-URI */}
      <Box className={styles.sectionPill}>
        <Typography className={styles.sectionPillText}>
          Vores gæster
          <br />
          udtaler
        </Typography>
      </Box>

      {/* REVIEW-URI DIN BACKEND */}
      <Box className={styles.reviewsWrap}>
        <Grid container spacing={0} className={styles.tGrid}>
          {(loading ? Array.from({ length: 4 }) : reviews).map((t, i) => (
            <Grid item xs={12} key={t?._id ?? i}>
              <Card
                className={`${styles.tCard} ${
                  i % 2 ? styles.tToneB : styles.tToneA
                }`}
                elevation={0}
              >
                <CardContent className={styles.tBody}>
                  {/* Nume + vârsta  */}
                  <Typography className={styles.tName}>
                    {t ? `${t.name}, ${t.age} år` : "\u00A0"}
                  </Typography>

                  {/* “Har været på …” dinamic din stay (seed) */}
                  <Typography className={styles.tMeta}>
                    {t
                      ? `Har været på ${String(t.stay || "").toLowerCase()}`
                      : "\u00A0"}
                  </Typography>

                  {/* Textul review-ului */}
                  <Typography className={styles.tText}>
                    {t ? t.review : "\u00A0"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

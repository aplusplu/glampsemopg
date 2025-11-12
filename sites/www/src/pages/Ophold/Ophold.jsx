import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import styles from "./Ophold.module.css";

import heroImg from "../../assets/image_04.jpg";

function toSlug(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("weekend")) return "weekend";
  if (t.includes("familie")) return "familie";
  if (t.includes("romant")) return "romantisk";
  return t.replace(/\s+/g, "-");
}

export default function Ophold() {
  const API = useMemo(
    () => import.meta.env.VITE_SERVER_HOST || "http://localhost:3042",
    []
  );
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API}/stays`);
        const j = await r.json();
        if (!alive) return;
        const arr = Array.isArray(j?.data) ? j.data : [];
        setStays(
          arr.map((s) => ({
            ...s,
            slug: toSlug(s.title),
            people: s.numberOfPersons,
            priceText: `Fra ${s.price},-`,
            imageUrl: s.image?.startsWith("http")
              ? s.image
              : `${API}${s.image || ""}`,
          }))
        );
      } catch (e) {
        console.error(e);
        setStays([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [API]);

  const list = loading
    ? [
        {
          slug: "weekend",
          title: "Weekendtur",
          people: "2 personer",
          priceText: "Fra 4200,-",
          imageUrl: heroImg,
        },
        {
          slug: "familie",
          title: "Familiepakken",
          people: "3-6 personer",
          priceText: "Fra 6100,-",
          imageUrl: heroImg,
        },
        {
          slug: "romantisk",
          title: "Romantisk getaway",
          people: "2 personer",
          priceText: "Fra 3500,-",
          imageUrl: heroImg,
        },
      ]
    : stays;

  return (
    <Container className={styles.page} maxWidth="xs">
      {/* HERO */}
      <Box className={styles.hero}>
        <img src={heroImg} alt="Vores ophold" />
        <div className={styles.overlay} />
        <h1 className={styles.title}>Vores ophold</h1>
      </Box>

      {/* CAPSULA TEAL INTRO */}
      <Box className={styles.intro}>
        <Typography className={styles.introH}>
          Vi har ophold til enhver smag
        </Typography>
        <Typography className={styles.introText}>
          Vores glampingophold er skabt til at tilbyde en kombination af eventyr
          og afslapning. Det er den ideelle flugt fra byens støj og stress, og
          det perfekte sted at genoplade batterierne i en naturskøn indstilling.
          Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen
          og nyde luksus i det fri. Vi ser frem til at byde dig velkommen til en
          oplevelse fyldt med komfort, eventyr og skønhed.
        </Typography>
      </Box>

      {/* LISTA PACHETE – card cu pastilă bej + buton salvie */}
      <Grid container spacing={0} className={styles.grid}>
        {list.map((s, idx) => (
          <Grid item xs={12} key={s.slug || idx}>
            <Card className={styles.stayCard} elevation={0}>
              <div className={styles.imgWrap}>
                <img src={s.imageUrl} alt={s.title} />
                <div className={styles.pill}>
                  <span>{s.title}</span>
                </div>
              </div>
              <CardContent className={styles.stayBody}>
                <Typography className={styles.meta}>{s.people}</Typography>
                <Typography className={styles.price}>{s.priceText}</Typography>
                <Button
                  component={Link}
                  to={`/ophold/${s.slug}`}
                  className={styles.btnRead}
                >
                  Læs mere
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

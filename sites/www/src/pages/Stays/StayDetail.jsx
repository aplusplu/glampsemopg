import { useEffect, useMemo, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./StayDetail.module.css";
import { api } from "../../lib/api";

// FALLBACK conținut local (dacă API nu răspunde)
import weekendImg from "../../assets/stays/weekend.jpg";
import familieImg from "../../assets/stays/familiepakken.jpg";
import romantiskImg from "../../assets/stays/tentlights.jpg";

const LOCAL_STAYS = {
  weekend: {
    _id: "weekend",
    title: "Weekendtur",
    hero: weekendImg,
    people: "2 personer",
    price: "Fra 4.200,-",
    tags: ["Natur", "Hygge", "Ro"],
    includes: [
      "2 nætter i luksustelt",
      "Morgenmad inkl.",
      "Adgang til bad & sauna",
      "Linned og håndklæder",
    ],
    extras: [
      "Kano + redningsveste",
      "Vinsmagning ved søen",
      "Guidet naturvandring",
    ],
    description:
      "Et hyggeligt ophold tæt på naturen. Perfekt til at koble af uden at gå på kompromis med komforten.",
    gallery: [weekendImg],
  },
  familie: {
    _id: "familie",
    title: "Familiepakken",
    hero: familieImg,
    people: "3–6 personer",
    price: "Fra 6.100,-",
    tags: ["Familie", "Plads", "Tryghed"],
    includes: [
      "2 nætter / 3 dage",
      "Stor familietipii",
      "Grillpakke til første aften",
      "Legekit til børn",
    ],
    extras: [
      "Kanotur familie",
      "Bål-pakke (skumfiduser)",
      "Mini-yoga for børn",
    ],
    description:
      "Familietid i det fri — masser af plads, lege og nærvær. En bekvem base til at udforske naturen sammen.",
    gallery: [familieImg],
  },
  romantisk: {
    _id: "romantisk",
    title: "Romantisk getaway",
    hero: romantiskImg,
    people: "2 personer",
    price: "Fra 3.500,-",
    tags: ["Par", "Afslapning", "Stemning"],
    includes: [
      "1 nat i telt med fairy lights",
      "Velkomstbobler",
      "Morgenmad på bakken",
      "Sen udtjekning",
    ],
    extras: [
      "Privat sauna 60 min",
      "Picnickurv til solnedgang",
      "Fotopakke (10 billeder)",
    ],
    description:
      "Skab jeres egen lille oase. Stemning, lys og ro – alt sat op til en mindeværdig aften for to.",
    gallery: [romantiskImg],
  },
};

export default function StayDetail() {
  const { id } = useParams();
  const [stay, setStay] = useState(null);

  const fallback = useMemo(() => LOCAL_STAYS[id] || null, [id]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await api.get(`/stays/${id}`);
        if (!alive) return;

        // normalize (în caz că API nu trimite toate câmpurile)
        const normal = {
          _id: data?._id || id,
          title: data?.title || fallback?.title || id,
          hero: data?.image || data?.imageUrl || fallback?.hero,
          people: data?.people || fallback?.people,
          price: data?.price || fallback?.price,
          tags: Array.isArray(data?.tags) ? data.tags : fallback?.tags || [],
          includes: Array.isArray(data?.includes)
            ? data.includes
            : fallback?.includes || [],
          extras: Array.isArray(data?.extras)
            ? data.extras
            : fallback?.extras || [],
          description: data?.description || fallback?.description || "",
          gallery: Array.isArray(data?.gallery)
            ? data.gallery
            : fallback?.gallery || [],
        };
        setStay(normal);
      } catch {
        if (!alive) return;
        setStay(fallback);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, fallback]);

  if (!stay) return null;

  return (
    <Container className={styles.page}>
      {/* HERO */}
      <Box className={styles.hero}>
        <img src={stay.hero} alt={stay.title} />
        <div className={styles.overlay} />
        <h1 className={styles.title}>{stay.title}</h1>
      </Box>

      {/* META STRIP */}
      <Paper elevation={0} className={styles.metaStrip}>
        <Stack direction="row" spacing={2} className={styles.metaContent}>
          <Typography className={styles.metaItem}>{stay.people}</Typography>
          <Typography className={styles.metaItem}>
            <strong>{stay.price}</strong>
          </Typography>
          <Stack direction="row" spacing={1} className={styles.tags}>
            {(stay.tags || []).map((t, i) => (
              <Chip key={i} label={t} size="small" />
            ))}
          </Stack>
          <Button
            variant="contained"
            className={styles.cta}
            component={RouterLink}
            to={`/kontakt?stay=${encodeURIComponent(stay.title)}`}
          >
            Forespørg booking
          </Button>
        </Stack>
      </Paper>

      {/* CONȚINUT */}
      <Grid container spacing={2} className={styles.content}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className={styles.section}>
            <Typography variant="h5" className={styles.h5}>
              Om opholdet
            </Typography>
            <Typography className={styles.text}>{stay.description}</Typography>
          </Paper>

          <Paper elevation={0} className={styles.section}>
            <Typography variant="h5" className={styles.h5}>
              Det er inkluderet
            </Typography>
            <ul className={styles.list}>
              {(stay.includes || []).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </Paper>

          {Array.isArray(stay.extras) && stay.extras.length > 0 && (
            <Paper elevation={0} className={styles.section}>
              <Typography variant="h5" className={styles.h5}>
                Tilvalg
              </Typography>
              <ul className={styles.list}>
                {stay.extras.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Paper>
          )}

          {Array.isArray(stay.gallery) && stay.gallery.length > 0 && (
            <Paper elevation={0} className={styles.section}>
              <Typography variant="h5" className={styles.h5}>
                Galleri
              </Typography>
              <div className={styles.gallery}>
                {stay.gallery.map((src, i) => (
                  <img key={i} src={src} alt={`${stay.title} ${i + 1}`} />
                ))}
              </div>
            </Paper>
          )}
        </Grid>

        {/* SIDEBAR PREȚ / BOOK */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={styles.priceCard}>
            <Typography className={styles.priceBig}>{stay.price}</Typography>
            <Typography className={styles.people}>{stay.people}</Typography>
            <Stack direction="row" spacing={1} className={styles.tagsStack}>
              {(stay.tags || []).map((t, i) => (
                <Chip key={i} label={t} size="small" />
              ))}
            </Stack>
            <Button
              variant="contained"
              fullWidth
              className={styles.cta}
              component={RouterLink}
              to={`/kontakt?stay=${encodeURIComponent(stay.title)}`}
            >
              Book / Kontakt
            </Button>
            <Button
              variant="text"
              fullWidth
              component={RouterLink}
              to="/ophold"
              className={styles.backLink}
            >
              ← Tilbage til oversigt
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

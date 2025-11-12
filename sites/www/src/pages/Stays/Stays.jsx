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
import styles from "./Stays.module.css";

// HERO
import heroImg from "../../assets/image_01.jpg";

// IMAGINI PACHETE
import weekendImg from "../../assets/stays/weekend.jpg";
import familieImg from "../../assets/stays/familiepakken.jpg";
import romantiskImg from "../../assets/stays/tentlights.jpg";

const STAYS = [
  {
    id: "weekend",
    title: "Weekendtur",
    people: "2 personer",
    price: "Fra 4.200,-",
    img: weekendImg,
  },
  {
    id: "familie",
    title: "Familiepakken",
    people: "3–6 personer",
    price: "Fra 6.100,-",
    img: familieImg,
  },
  {
    id: "romantisk",
    title: "Romantisk getaway",
    people: "2 personer",
    price: "Fra 3.500,-",
    img: romantiskImg,
  },
];

export default function Stays() {
  return (
    <Container className={styles.page}>
      {/* HERO */}
      <Box className={styles.hero}>
        <img src={heroImg} alt="Vores ophold" />
        <div className={styles.overlay} />
        <h1 className={styles.title}>Vores ophold</h1>
      </Box>

      {/* INTRO */}
      <Box className={styles.intro}>
        <Typography className={styles.introText}>
          Vores glampingophold kombinerer naturens ro med komfort. Vælg den
          pakke, der passer jer – og oplev luksus i det fri.
        </Typography>
      </Box>

      {/* GRID CU PACHETE */}
      <Grid container spacing={2} className={styles.grid}>
        {STAYS.map((s) => (
          <Grid item xs={12} md={4} key={s.id}>
            <Card className={styles.card} elevation={0}>
              <div className={styles.cardImgWrap}>
                <img src={s.img} alt={s.title} />
                <div className={styles.pill}>
                  <span>{s.title}</span>
                </div>
              </div>
              <CardContent className={styles.body}>
                <Typography className={styles.meta}>{s.people}</Typography>
                <Typography className={styles.price}>{s.price}</Typography>

                {/* CTA secundar din card → Contact (cum ai cerut) */}
                <Button
                  component={Link}
                  to={`/kontakt?stay=${encodeURIComponent(s.title)}`}
                  className={styles.btnGhost}
                >
                  Book / Kontakt
                </Button>

                {/* Link “Læs mere” spre pagina dedicată */}
                <Button
                  component={Link}
                  to={`/ophold/${s.id}`}
                  className={styles.btnLink}
                >
                  Læs mere →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { IMAGES } from "../../../assets/images.js";
import StayCard from "../../stays/StayCard/StayCard.jsx";
import styles from "./StaysPreview.module.css";
import { useNavigate } from "react-router-dom";

const FALLBACK = [
  {
    _id: "weekend",
    title: "Weekend",
    image: IMAGES.weekend,
    priceText: "Fra 899 kr.",
  },
  {
    _id: "tentlights",
    title: "Tentlights",
    image: IMAGES.tentlights,
    priceText: "Sæsonpris",
  },
  {
    _id: "familiepakken",
    title: "Familiepakken",
    image: IMAGES.familiepakken,
    priceText: "Familiepris",
  },
];

export default function StaysPreview() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    let m = true;
    (async () => {
      try {
        const data = await api.get("/stays");
        const arr = Array.isArray(data) ? data.slice(0, 3) : [];
        if (m) setItems(arr.length ? arr : FALLBACK);
      } catch {
        if (m) setItems(FALLBACK);
      }
    })();
    return () => {
      m = false;
    };
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <span className={styles.kicker}>Vælg dit ophold</span>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Ophold
        </Typography>
      </div>

      <div className={styles.grid}>
        <Grid container spacing={2}>
          {items.map((s) => (
            <Grid key={s._id} item xs={12} sm={6} md={4}>
              <StayCard
                title={s.title}
                image={s.image || s.imageUrl || IMAGES.tentlights}
                priceText={s.priceText || "Pris efter sæson"}
                onClick={() => nav(`/ophold/${s._id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}

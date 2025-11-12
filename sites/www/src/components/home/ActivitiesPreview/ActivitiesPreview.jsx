import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { IMAGES } from "../../../assets/images.js";
import styles from "./ActivitiesPreview.module.css";
import { useNavigate } from "react-router-dom";

// Minimal preview list (XD vibe: kompakt, airy)
export default function ActivitiesPreview() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    let m = true;
    (async () => {
      try {
        const data = await api.get("/activities");
        const arr = Array.isArray(data) ? data.slice(0, 3) : [];
        if (m) setItems(arr);
      } catch {
        if (m)
          setItems([
            {
              _id: "kano",
              title: "Kanotur",
              date: "Alle dage",
              time: "kl. 8.00 - 20.00",
              image: IMAGES.kano,
            },
            {
              _id: "vinsmagning",
              title: "Vinsmagning",
              date: "Fre & Lør",
              time: "kl. 15.00 - 17.00",
              image: IMAGES.vinsmagning,
            },
            {
              _id: "yoga",
              title: "Yoga i det fri",
              date: "Alle dage",
              time: "kl. 13.00 - 14.30",
              image: IMAGES.yoga,
            },
          ]);
      }
    })();
    return () => {
      m = false;
    };
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>Ingen skal kede sig hos Gitte</div>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Aktiviteter
          </Typography>
        </div>
        <Button size="small" onClick={() => nav("/aktiviteter")}>
          Se alle
        </Button>
      </div>

      <div className={styles.list}>
        {items.map((a) => (
          <article key={a._id} className={styles.row}>
            <img
              className={styles.media}
              src={a.image || IMAGES.image03}
              alt={a.title}
            />
            <div style={{ paddingRight: 12 }}>
              <Typography sx={{ fontWeight: 700 }}>{a.title}</Typography>
              <div className={styles.meta}>
                {a.date} {a.time}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// src/pages/MyList/MyList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import styles from "./MyList.module.css";
import useMyList from "../../hooks/useMyList.js";
import { api } from "../../lib/api";

const FALLBACK_IMG = "/placeholder-activity.jpg"; // pune un fișier real în /public

// normalize: lowercase + fără diacritice + fără spații duble
const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// map explicit (din UI) -> (din DB)
const TOKEN_TO_TITLE = {
  kano: "Kanotur",
  vandring: "Naturvandring",
  baal: "Fællesbål",
  yoga: "Yoga i det fri",
};

export default function MyList() {
  // favs = ['kano','vandring', ...] (chei scurte)
  const { ids: favs, toggle, clear } = useMyList();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let abort = false;

    async function load() {
      // dacă nu ai nimic salvat, curățăm lista
      if (!favs?.length) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        // 1) luăm toate activitățile
        const res = await api.get("/activities");
        const all = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        // 2) pregătim fav tokens normalizate
        const favTokens = favs.map((t) => norm(t));
        const favSet = new Set(favTokens);

        // 3) potrivire: pentru fiecare activitate, vedem dacă titlul corespunde
        const matched = [];

        for (const a of all) {
          const title = a?.title || "";
          const titleN = norm(title);

          // găsim tokenul din favs care se potrivește acestui titlu
          let matchedToken = null;

          for (const t of favTokens) {
            // preferă maparea explicită dacă există
            const mappedTitle = TOKEN_TO_TITLE[t];
            if (mappedTitle) {
              const mappedN = norm(mappedTitle);
              if (titleN === mappedN || titleN.includes(mappedN)) {
                matchedToken = t;
                break;
              }
            }
            // fallback: include direct tokenul în titlu (ex: "kano" în "kanotur")
            if (titleN.includes(t)) {
              matchedToken = t;
              break;
            }
          }

          if (matchedToken) {
            matched.push({
              key: matchedToken, // cheia originală din localStorage (pt toggle/remove)
              _id: String(a?._id || `${matchedToken}_${title}`),
              title: title || "Aktivitet",
              when: a?.date ?? a?.when ?? "Alle dage",
              time: a?.time ?? "kl. 13.00 - 14.30",
              imageUrl: a?.image ?? a?.imageUrl ?? FALLBACK_IMG,
              description: a?.description ?? "",
            });
          }
        }

        if (!abort) setItems(matched);
      } catch (e) {
        if (!abort) setItems([]);
      } finally {
        if (!abort) setLoading(false);
      }
    }

    load();
    return () => {
      abort = true;
    };
  }, [favs]);

  const count = useMemo(() => items.length, [items]);

  return (
    <Container className={styles.page}>
      {/* HERO */}
      <Box className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Min liste</h1>
          <Typography className={styles.sub}>
            {loading ? "Indlæser..." : `${count} favorit(er) gemt`}
          </Typography>
        </div>

        <div className={styles.actions}>
          <Button
            component={Link}
            to="/aktiviteter"
            className={styles.btnPrimary}
          >
            TILFØJ FLERE
          </Button>
          <Button
            onClick={clear}
            className={styles.btnGhost}
            disabled={!favs?.length}
          >
            RYD LISTE
          </Button>
        </div>
      </Box>

      {/* EMPTY */}
      {!favs?.length && !loading && (
        <Box className={styles.empty}>
          <Typography className={styles.emptyTitle}>
            Ingen favoritter endnu
          </Typography>
          <Typography className={styles.emptyText}>
            Gå til{" "}
            <Link to="/aktiviteter" className={styles.inlineLink}>
              Aktiviteter
            </Link>{" "}
            og tryk pe inimă for at gemme i “Min liste”.
          </Typography>
        </Box>
      )}

      {/* GRID */}
      <div className={styles.grid}>
        {items.map((a) => (
          <div key={a._id} className={styles.gridItem}>
            <Card className={styles.card} elevation={0}>
              <div className={styles.imgWrap}>
                <img src={a.imageUrl} alt={a.title} />
                <div className={styles.pill}>
                  <span>{a.title}</span>
                </div>
              </div>

              <CardContent className={styles.body}>
                <div className={styles.metaGroup}>
                  <span className={styles.meta}>{a.when}</span>
                  <span className={styles.meta}>{a.time}</span>
                </div>

                <Typography className={styles.desc}>
                  {a.description || "Kort beskrivelse kommer snart."}
                </Typography>

                <div className={styles.btnRow}>
                  {/* foarte important: toggle pe cheia originală (kano/vandring/baal/yoga) */}
                  <Button
                    onClick={() => toggle(a.key)}
                    className={styles.btnDanger}
                  >
                    Fjern fra liste
                  </Button>
                  <Button
                    component={Link}
                    to="/aktiviteter"
                    className={styles.btnGhost}
                  >
                    Se andre
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

// src/pages/Activities/Activities.jsx
import { Box, Button, Chip, Typography, Collapse } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useMyList from "../../hooks/useMyList.js";
import { api } from "../../lib/api";

// HERO
import heroImg from "../../assets/image_04.jpg";

// IMAGINI FALLBACK
import fireImg from "../../assets/activities/baal.jpg";
import kanoImg from "../../assets/activities/kano.jpg";
import hikeImg from "../../assets/activities/naturvandring.jpg";
import wineImg from "../../assets/activities/vinsmagning.jpg";
import yogaImg from "../../assets/activities/yoga.jpg";

const COL_BG = "#33626c";
const COL_PANEL = "#ced3cd";
const COL_ACCENT = "#c5b496";

// Fallback local – notă: aici slug == _id pentru compat
const FALLBACK = [
  {
    _id: "kano",
    slug: "kano",
    title: "Kanotur",
    when: "Alle dage",
    time: "kl. 8.00 - 20.00",
    imageUrl: kanoImg,
  },
  {
    _id: "vandring",
    slug: "vandring",
    title: "Naturvandring",
    when: "Alle dage",
    time: "kl. 13.00 - 14.30",
    imageUrl: hikeImg,
  },
  {
    _id: "yoga",
    slug: "yoga",
    title: "Yoga i det fri",
    when: "Lørdage",
    time: "kl. 15.00 - 17.00",
    imageUrl: yogaImg,
  },
  {
    _id: "vin",
    slug: "vin",
    title: "Vinsmagning",
    when: "Fredage og lørdage",
    time: "kl. 15.00 - 17.00",
    imageUrl: wineImg,
  },
  {
    _id: "baal",
    slug: "baal",
    title: "Fællesbål",
    when: "Lørdage",
    time: "kl. 13.00 - 14.30",
    imageUrl: fireImg,
  },
];

// fallback descrieri scurte (dacă nu vin din backend)
const FALLBACK_DESC = {
  kano: "Rolig kanotur på søen. Udstyr og redningsveste kan tilkøbes. Velegnet for begyndere.",
  vandring:
    "Guidet naturvandring gennem skov og eng. Fokus på lokal flora og dyreliv.",
  yoga: "Blid morgenyoga i det fri. Medbring behageligt tøj; måtter kan lånes.",
  vin: "Smagning af lokale vine ved søbredden. Let tapas inkluderet.",
  baal: "Fælles hygge ved bålet med skumfiduser og historier for store og små.",
};

// cheie stabilă pentru favorite (_id > slug > titlu-normalizat)
const favKeyOf = (a) =>
  a?._id ||
  a?.slug ||
  (a?.title ? a.title.toLowerCase().replace(/\s+/g, "-") : "");

export default function Activities() {
  const [items, setItems] = useState(FALLBACK);
  const { has, toggle } = useMyList();

  // dropdown state + cache pentru descrieri
  const [open, setOpen] = useState(() => new Set());
  const [desc, setDesc] = useState({}); // { key: "descriere lungă..." }
  const [loadingDesc, setLoadingDesc] = useState({}); // { key: true/false }

  // încarcă lista de activități
  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/activities");
        if (Array.isArray(data) && data.length) {
          const mapped = data.map((a) => ({
            _id: a._id ?? null,
            slug: a.slug ?? null,
            title: a.title ?? "Aktivitet",
            when: a.when ?? a.date ?? "Alle dage",
            time: a.time ?? "kl. 13.00 - 14.30",
            imageUrl:
              a.imageUrl ??
              (a.title?.toLowerCase().includes("yoga")
                ? yogaImg
                : a.title?.toLowerCase().includes("vin")
                ? wineImg
                : a.title?.toLowerCase().includes("bål") ||
                  a.title?.toLowerCase().includes("baal")
                ? fireImg
                : a.title?.toLowerCase().includes("kano")
                ? kanoImg
                : a.title?.toLowerCase().includes("vandring")
                ? hikeImg
                : hikeImg),
            description: a.description ?? null, // dacă backendul o oferă deja
          }));
          setItems(mapped);
        }
      } catch {
        // rămânem pe FALLBACK
      }
    })();
  }, []);

  // pregătim cardurile cu cheie stabilă
  const cards = useMemo(
    () =>
      items.map((a) => {
        const key = favKeyOf(a);
        return { ...a, _favKey: key };
      }),
    [items]
  );

  // fetch descriere on-demand (dacă nu o avem deja)
  async function ensureDescription(a) {
    const key = a._favKey;
    if (desc[key]) return; // avem deja

    setLoadingDesc((s) => ({ ...s, [key]: true }));
    try {
      // 1) dacă elementul are deja description din listă, cache direct
      if (a.description) {
        setDesc((d) => ({ ...d, [key]: a.description }));
        return;
      }

      // 2) dacă avem _id, încercăm /activities/:id
      if (a._id) {
        try {
          const one = await api.get(`/activities/${a._id}`);
          const raw =
            one?.data?.data?.[0] ?? one?.data?.data ?? one?.data ?? one;
          const text =
            raw?.description ??
            FALLBACK_DESC[a.slug || a._favKey] ??
            "Beskrivelse kommer snart.";
          setDesc((d) => ({ ...d, [key]: text }));
          return;
        } catch {
          // continuăm la fallback
        }
      }

      // 3) fallback final: din map local
      const text =
        FALLBACK_DESC[a.slug || a._favKey] ?? "Beskrivelse kommer snart.";
      setDesc((d) => ({ ...d, [key]: text }));
    } finally {
      setLoadingDesc((s) => ({ ...s, [key]: false }));
    }
  }

  function toggleOpen(a) {
    const key = a._favKey;
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    // dacă îl deschidem, asigură descrierea
    if (!open.has(key)) ensureDescription(a);
  }

  return (
    <Box sx={{ pb: 6 }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 240, md: 360 },
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={heroImg}
          alt="Aktiviteter"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(51,98,108,0.55) 0%, rgba(51,98,108,0.85) 80%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 800,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            Aktiviteter
          </Typography>
        </Box>
      </Box>

      {/* Intro panel */}
      <Box
        sx={{
          bgcolor: COL_BG,
          color: "#fff",
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          display: "grid",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, lineHeight: 1.6 }}>
          Glamping er mere end blot en indkvartering – det er en mulighed for at
          fordybe dig i naturen og skabe minder, der varer livet ud...
        </Typography>
        <Box
          sx={{
            bgcolor: COL_PANEL,
            color: "#1b1b1b",
            borderRadius: 2,
            p: 2,
            display: "inline-block",
            maxWidth: 360,
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>
            Ingen skal kede sig hos Gitte
          </Typography>
        </Box>
      </Box>

      {/* GRID fără MUI Grid (zero warning-uri) */}
      <Box
        sx={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {cards.map((a) => {
          const key = a._favKey;
          const isOpen = open.has(key);
          return (
            <Box
              key={key}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "2fr 3fr" },
                backgroundColor: COL_PANEL,
              }}
            >
              {/* imagine */}
              <Box
                sx={{
                  position: "relative",
                  minHeight: 180,
                  bgcolor: "#d9ded8",
                }}
              >
                <Box
                  component="img"
                  src={a.imageUrl}
                  alt={a.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              {/* conținut */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "auto auto auto auto",
                  p: 2.5,
                  gap: 1.25,
                  bgcolor: "#ffffff",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: COL_BG, mb: 0.5 }}
                >
                  {a.title}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={a.when || "Alle dage"}
                    sx={{
                      bgcolor: COL_ACCENT,
                      color: "#1b1b1b",
                      fontWeight: 700,
                    }}
                  />
                  <Chip
                    label={a.time || "kl. 13.00 - 14.30"}
                    sx={{
                      bgcolor: "#e8e3da",
                      color: "#1b1b1b",
                      fontWeight: 700,
                    }}
                  />
                </Box>

                {/* dropdown descriere */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <Typography
                    sx={{ color: "#1b1b1b", lineHeight: 1.6, mt: 0.5 }}
                  >
                    {loadingDesc[key]
                      ? "Indlæser..."
                      : desc[key] ||
                        a.description ||
                        FALLBACK_DESC[a.slug || key] ||
                        "Beskrivelse kommer snart."}
                  </Typography>
                </Collapse>

                {/* butoane */}
                <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={() => toggle(key)}
                    sx={{
                      bgcolor: COL_BG,
                      "&:hover": { bgcolor: "#2b525a" },
                      fontWeight: 700,
                    }}
                  >
                    {has(key) ? "I min liste" : "Tilføj til min liste"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => toggleOpen(a)}
                    sx={{
                      borderColor: COL_BG,
                      color: COL_BG,
                      fontWeight: 700,
                      "&:hover": {
                        borderColor: COL_BG,
                        bgcolor: "rgba(51,98,108,0.06)",
                      },
                    }}
                  >
                    {isOpen ? "Luk" : "Læs mere"}
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

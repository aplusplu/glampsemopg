import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ReviewCard from "./ReviewCard/ReviewCard.jsx";
import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";

/* Fetcher alle anmeldelser; brug-o pe Forside sau o pagină dedicată */
export default function ReviewsSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let m = true;
    (async () => {
      try {
        const data = await api.get("/reviews");
        if (m) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (m)
          setItems([
            {
              name: "Mette",
              age: 43,
              stay: "Weekend",
              review: "Skøn oplevelse – ro, natur og lækker komfort.",
            },
            {
              name: "Jonas",
              age: 29,
              stay: "Tentlights",
              review: "Perfekt gave til kæresten – vi kommer igen!",
            },
          ]);
      }
    })();
    return () => {
      m = false;
    };
  }, []);

  return (
    <section style={{ marginTop: 24 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Udtalelser
      </Typography>
      <Grid container spacing={2}>
        {items.map((r, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <ReviewCard {...r} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

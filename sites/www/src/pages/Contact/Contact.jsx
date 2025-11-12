import { useMemo } from "react";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import heroImg from "../../assets/image_03.jpg";
import s from "./Contact.module.css"; // <- CSS Module

// framer: componentă MUI motion
const MotionBox = motion(Box);

export default function Contact() {
  const theme = useTheme();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({ name: "", email: "", subject: "", message: "" }),
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const p = Object.fromEntries(data.entries());

    if (!p.name?.trim()) return toast.error("Udfyld venligst dit navn.");
    if (!/^\S+@\S+\.\S+$/.test(p.email || ""))
      return toast.error("Ugyldig e-mailadresse.");
    if (!p.subject) return toast.error("Vælg venligst et emne.");
    if (!p.message?.trim()) return toast.error("Skriv venligst en besked.");

    toast.success("Beskeden er sendt!");
    navigate("/kontakt/sendt", { replace: true });
  }

  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* HERO */}
          <Box className={s.heroWrap}>
            <Box
              component="img"
              src={heroImg}
              alt="Ophold"
              className={s.heroImg}
            />
            <div className={s.heroShade} />
          </Box>

          {/* CAP TEAL + HEADLINES + LEAD + FORM */}
          <section className={s.tealBlock}>
            <h1 className={s.h1}>Kontakt Gitte</h1>

            <h2 className={s.h2}>
              Vil du booke et ophold?
              <br />
              Eller har du blot et spørgsmål?
            </h2>

            <p className={s.lead}>
              Så tøv ikke med at tage kontakt til os herunder. Vi bestræber os
              på at svare på henvendelser indenfor 24 timer, men op til ferier
              kan der være travlt, og svartiden kan derfor være op til 48 timer.
            </p>

            {/* FORM DARK  */}
            <div className={`${s.formShell} ${s.formDark}`}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Navn"
                  fullWidth
                  required
                  defaultValue={defaultValues.name}
                />

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  defaultValue={defaultValues.email}
                />

                <TextField
                  name="subject"
                  label="Hvad drejer henvendelsen sig om?"
                  select
                  fullWidth
                  required
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Vælg…
                  </MenuItem>
                  <MenuItem value="booking">Booking</MenuItem>
                  <MenuItem value="sporgsmal">Spørgsmål</MenuItem>
                  <MenuItem value="andet">Andet</MenuItem>
                </TextField>

                <TextField
                  name="message"
                  label="Besked (Skriv dato’er, hvis det drejer sig om en booking)"
                  multiline
                  minRows={5}
                  fullWidth
                  required
                  defaultValue={defaultValues.message}
                />

                {/* CTA on form */}
                <div className={s.ctaWrap}>
                  <div className={s.ctaPlate} />
                  <div className={s.ctaBtn}>
                    <Button type="submit" size="large" fullWidth>
                      Indsend
                    </Button>
                  </div>
                </div>
              </Box>
            </div>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 3,
                textAlign: "center",
                color: "rgba(255,255,255,.7)",
                fontFamily: '"Nanum Gothic", Arial, sans-serif',
              }}
            >
              Gittes Glamping
            </Typography>
          </section>
        </MotionBox>
      </Container>
    </Box>
  );
}

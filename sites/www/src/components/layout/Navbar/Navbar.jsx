import { useState, useEffect } from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const LINKS = [
  { to: "/ophold", label: "Ophold" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/aktiviteter", label: "Aktiviteter" },
  { to: "/min-liste", label: "Min liste" },
  { to: "/backoffice", label: "Backoffice" },
];

// helper: stil comun pentru Zen Loop în nav
const zen = { fontFamily: `"Zen Loop", "Nanum Gothic", sans-serif` };

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = (val) => () => setOpen(val);

  useEffect(() => {
    console.log("NavBar mounted");
  }, []);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            minHeight: 72, // puțin mai înalt să încapă logo-ul 2x
            color: "primary.contrastText",
            px: { xs: 1, sm: 2 },
            gap: 1.5,
          }}
        >
          {/* === LOGO 2x (stilizat, fără fișier) === */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-grid",
              placeItems: "center",
              textDecoration: "none",
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "primary.contrastText",
              color: "primary.main",
              boxShadow: "0 2px 0 rgba(0,0,0,.08) inset",
              "&:hover": { opacity: 0.9 },
            }}
            aria-label="Gittes Glamping - Forside"
          >
            <Typography sx={{ ...zen, fontSize: 32, lineHeight: 1 }}>
              G
            </Typography>
          </Box>

          {/* Brand name cu Zen Loop */}
          <Typography
            component={RouterLink}
            to="/"
            variant="h5"
            sx={{
              ...zen,
              color: "inherit",
              textDecoration: "none",
              fontWeight: 400,
              letterSpacing: 0.6,
              ml: 0.5,
            }}
          >
            Gittes Glamping
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop links – Zen Loop, mărime plăcută */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2.5,
              alignItems: "center",
            }}
          >
            {LINKS.map((l) => (
              <Typography
                key={l.to}
                component={NavLink}
                to={l.to}
                style={{ textDecoration: "none" }}
                sx={{
                  ...zen,
                  fontSize: "1.5rem",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  color: "inherit",
                  "&.active": { textDecoration: "underline" },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                }}
              >
                {l.label}
              </Typography>
            ))}
          </Box>

          {/* Burger 2x pe mobile */}
          <IconButton
            aria-label="menu"
            onClick={toggle(true)}
            sx={{
              ml: 1,
              display: { xs: "inline-flex", md: "none" },
              color: "inherit",
              width: 64,
              height: 64,
            }}
          >
            <MenuIcon sx={{ fontSize: 44 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer pe dreapta – Zen Loop pentru item-uri */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggle(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography variant="h4" sx={{ ...zen, fontWeight: 400 }}>
            Menu
          </Typography>
          <IconButton
            aria-label="Luk menu"
            onClick={toggle(false)}
            sx={{ color: "inherit" }}
          >
            <CloseRoundedIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ p: 1 }}>
          {LINKS.map((l) => (
            <ListItemButton
              key={l.to}
              component={NavLink}
              to={l.to}
              onClick={toggle(false)}
              sx={{
                borderRadius: 1.5,
                color: "inherit",
                py: 1.25,
                "&.active": { bgcolor: "rgba(255,255,255,0.12)" },
                "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
              }}
            >
              <ListItemText
                primary={l.label}
                primaryTypographyProps={{
                  sx: { ...zen, fontSize: "2rem", letterSpacing: 0.6 },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* footer mic în drawer, Nanum Gothic implicit din body */}
        <Box sx={{ px: 2, py: 2, mt: "auto", opacity: 0.8, fontSize: 12 }}>
          Logget ind: <strong>admin@mediacollege.dk</strong> · admin
        </Box>
      </Drawer>
    </>
  );
}

// src/components/layout/Layout.jsx
import { useMemo, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "../Footer.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/logo.png";

// font helpers
const zen = { fontFamily: `"Zen Loop","Nanum Gothic",sans-serif` };
const body = { fontFamily: `"Nanum Gothic",sans-serif` };

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const LINKS = useMemo(
    () => [
      { to: "/ophold", label: "Ophold" },
      { to: "/kontakt", label: "Kontakt" },
      { to: "/aktiviteter", label: "Aktiviteter" },
      { to: "/min-liste", label: "Min liste" },
      ...(isAdmin ? [{ to: "/backoffice", label: "Backoffice" }] : []),
    ],
    [isAdmin]
  );

  const isActive = (to) => location.pathname === to;

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#EFEFEA", ...body }}>
      {/* AppBar  logo 2x burger 2x */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "transparent", color: "#1e1e1e", py: 0.5 }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 3 },
            justifyContent: "space-between",
            minHeight: 88, // logo x2
          }}
        >
          {/* LOGO */}
          <Link to="/" style={{ display: "inline-block", lineHeight: 0 }}>
            <Box
              component="img"
              src={logo}
              alt="Gittes Glamping"
              sx={{ height: 56, display: "block" }}
            />
          </Link>

          {/* burger capsule */}
          <Box
            sx={{
              bgcolor: "#829b97",
              borderRadius: "18px 18px 18px 6px",
              p: 0.75,
            }}
          >
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="menu"
              sx={{
                color: "#fff",
                bgcolor: "#829b97",
                width: 64,
                height: 64,
                "&:hover": { bgcolor: "#829b97", opacity: 0.95 },
              }}
            >
              <MenuIcon sx={{ fontSize: 44 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer meniu – Zen Loop on items */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { bgcolor: "#829b97", color: "#fff", minWidth: 320 },
        }}
      >
        <Box sx={{ px: 1.5, pt: 2, pb: 1 }}>
          {user ? (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Logget ind: <strong>{user.email}</strong>
              {user.role ? ` · ${user.role}` : ""}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Ikke logget ind
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ py: 1 }}>
          {LINKS.map((l) => (
            <ListItemButton
              key={l.to}
              component={Link}
              to={l.to}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                py: 1.25,
                ...(isActive(l.to) && { bgcolor: "rgba(255,255,255,0.12)" }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemText
                primary={l.label}
                primaryTypographyProps={{
                  sx: {
                    ...zen,
                    fontSize: "2rem",
                    letterSpacing: 0.6,
                    color: "#fff",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Login / Logout  */}
        <List sx={{ py: 0.5 }}>
          {user ? (
            <ListItemButton
              onClick={() => {
                logout();
                setOpen(false);
              }}
              sx={{
                mx: 1,
                borderRadius: 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ sx: { ...zen, fontSize: "1.6rem" } }}
              />
            </ListItemButton>
          ) : (
            <ListItemButton
              component={Link}
              to="/login"
              onClick={() => setOpen(false)}
              sx={{
                mx: 1,
                borderRadius: 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemText
                primary="Log ind"
                primaryTypographyProps={{ sx: { ...zen, fontSize: "1.6rem" } }}
              />
            </ListItemButton>
          )}
        </List>
      </Drawer>

      {/* content and footer */}
      <Container
        sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 3 }, py: 3 }}
      >
        <Outlet />
        <Footer />
      </Container>
    </Box>
  );
}

// src/pages/Auth/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("guest@mediacollege.dk");
  const [password, setPassword] = useState("guest");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { user } = await login(email, password);
      // redirect logic: dacă vin dintr-un ProtectedRoute, poți folosi loc.state?.from
      if (user?.role === "admin") nav("/backoffice", { replace: true });
      else nav("/aktiviteter", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Log ind
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Adgangskode"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Logger ind..." : "Log ind"}
        </Button>

        {/* Butoane demo rapide */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setEmail("admin@mediacollege.dk");
              setPassword("admin");
            }}
          >
            Admin demo
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setEmail("guest@mediacollege.dk");
              setPassword("guest");
            }}
          >
            Guest demo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function LoginDialog({ open, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!form.email || !form.password) return;
    setSubmitting(true);
    try {
      await login(form);
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={onSubmit}>
        <DialogTitle>Log ind</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
            <TextField
              label="Adgangskode"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting} variant="text">
            Annuller
          </Button>
          <Button type="submit" disabled={submitting}>
            Log ind
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

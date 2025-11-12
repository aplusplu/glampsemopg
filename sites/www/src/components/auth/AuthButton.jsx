import { useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import LoginDialog from "./LoginDialog";

export default function AuthButton() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return <CircularProgress size={22} />;

  if (!user) {
    return (
      <>
        <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
          Log ind
        </Button>
        <LoginDialog open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2">Hej, {user.name || user.email}</Typography>
      <Button size="small" variant="outlined" onClick={logout}>
        Log ud
      </Button>
    </Stack>
  );
}

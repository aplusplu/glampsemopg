import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Sent() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Tak for din henvendelse!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Vi vender tilbage hurtigst muligt (typisk indenfor 24–48 timer).
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" fullWidth>
            Tilbage til forsiden
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

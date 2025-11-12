import Layout from "../../components/layout/Layout.jsx";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Backoffice() {
  return (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Backoffice
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          component={Link}
          to="/backoffice/aktiviteter"
          variant="contained"
        >
          Manage Activities
        </Button>
        {/* adaugi aici link-uri spre alte module (stays, reviews, subscribers etc.) */}
      </Box>
    </Layout>
  );
}

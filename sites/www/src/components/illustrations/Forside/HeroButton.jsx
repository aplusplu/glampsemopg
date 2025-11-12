import { Button } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroButton({ href = "/ophold", label = "Se ophold" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Button
        href={href}
        color="primary"
        size="large"
        sx={{ px: 4, py: 1.5, borderRadius: 3 }}
      >
        {label}
      </Button>
    </motion.div>
  );
}

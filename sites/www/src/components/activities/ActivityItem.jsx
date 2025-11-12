import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./ActivityItem.module.css";

export default function ActivityItem({
  activity,
  expanded,
  onToggleExpand,
  onToggleLike,
  liked,
}) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggleExpand}
      className={styles.item}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className={styles.meta}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {activity.title}
          </Typography>
          <Chip
            size="small"
            label={`${activity.date || "Dato?"} • ${activity.time || "Tid?"}`}
            sx={{ background: "#F1F3F0" }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {activity.image ? (
            <img
              src={activity.image}
              alt={activity.title}
              style={{ width: "100%", borderRadius: 12 }}
            />
          ) : null}
          <Typography className={styles.desc}>
            {activity.description || "Ingen beskrivelse."}
          </Typography>
          <Box>
            <Button
              size="small"
              variant="outlined"
              onClick={onToggleLike}
              className={styles.heartBtn}
            >
              <span
                className={`${styles.heart} ${
                  liked ? styles.heartFull : styles.heartEmpty
                }`}
                aria-hidden
              >
                <FavoriteIcon fontSize="small" />
              </span>
              {liked ? "Fjern fra Min liste" : "Føj til Min liste"}
            </Button>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./ActivityCard.module.css";

// Minimal, independent of Accordion; perfect for lists or grids
export default function ActivityCard({
  title,
  date,
  time,
  image,
  description,
  liked,
  onToggleLike,
}) {
  return (
    <article className={styles.card}>
      {image ? <img className={styles.media} src={image} alt={title} /> : null}
      <div className={styles.body}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <div className={styles.meta}>
          {date ? <Chip size="small" label={date} /> : null}
          {time ? <Chip size="small" label={time} /> : null}
        </div>

        {description ? (
          <Typography className={styles.desc}>{description}</Typography>
        ) : null}

        <div className={styles.actions}>
          <Button size="small" variant="outlined" onClick={onToggleLike}>
            <FavoriteIcon
              fontSize="small"
              sx={{ mr: 1, opacity: liked ? 1 : 0.4 }}
            />
            {liked ? "Fjern fra Min liste" : "Føj til Min liste"}
          </Button>
        </div>
      </div>
    </article>
  );
}

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./StayCard.module.css";

// Simple stay card (image + title + price + CTA)
export default function StayCard({
  title,
  image,
  priceText = "Pris efter sæson",
  onClick,
}) {
  return (
    <article className={styles.card}>
      {image ? <img className={styles.media} src={image} alt={title} /> : null}
      <div className={styles.body}>
        <div className={styles.row}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography className={styles.price}>{priceText}</Typography>
        </div>
        <Button variant="contained" onClick={onClick}>
          Se detaljer
        </Button>
      </div>
    </article>
  );
}

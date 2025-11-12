import Typography from "@mui/material/Typography";
import styles from "./ReviewCard.module.css";

export default function ReviewCard({ name, age, stay, review }) {
  return (
    <article className={styles.card}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {name}
      </Typography>
      <div className={styles.meta}>
        {age ? `${age} år` : null}
        {age && stay ? " • " : ""}
        {stay || null}
      </div>
      <Typography>{review}</Typography>
    </article>
  );
}

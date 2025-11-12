import Typography from "@mui/material/Typography";
import styles from "./SectionHeader.module.css";

// Generic header used across pages (dansk copy on usage)
export default function SectionHeader({ kicker, title, variant = "h4" }) {
  return (
    <div className={styles.wrap}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      <Typography className={styles.title} variant={variant}>
        {title}
      </Typography>
    </div>
  );
}

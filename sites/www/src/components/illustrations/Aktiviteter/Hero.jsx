// Pure CSS hero that mimics the original "Aktiviteter" header.
// No SVGs used; gradients, overlays, burger, and green panel are CSS only.

import styles from "./Hero.module.css";

export default function AktiviteterHero() {
  return (
    <div className={styles.hero}>
      {/* Top gradient band with dark overlay */}
      <div className={styles.heroTop} />

      {/* Branding square (gradient) */}
      <div className={styles.avatar} />

      {/* Optional large wordmark/title placeholder (can be replaced with real text) */}
      <div className={styles.title} aria-hidden />

      {/* Right-side badge with burger icon */}
      <div className={styles.badge}>
        <div className={styles.burger} aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Lower green panel */}
      <div className={styles.greenPanel} />
    </div>
  );
}

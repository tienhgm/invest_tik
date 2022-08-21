import styles from './style.module.scss';
export function NotFound() {
  return (
    <div className={styles['not-found']}>
      <div className={styles.child}>
        <div>
          <span className={`${styles.text} ${styles.text1}`}>404</span>{' '}
          <span className={`${styles.text} ${styles.text2}`}>NOT FOUND</span>
        </div>
        <div className={styles.backToHome}>Back to home</div>
      </div>
    </div>
  );
}

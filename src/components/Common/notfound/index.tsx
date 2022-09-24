import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
export function NotFound() {
  const { t } = useTranslation();
  const backToHome = () => {
    window.location.href = '/dashboard';
  };
  return (
    <div className={styles['not-found']}>
      <div className={styles.child}>
        <div>
          <span className={`${styles.text} ${styles.text1}`}>404</span>{' '}
          <span className={`${styles.text} ${styles.text2}`}>{t('common.not_found')}</span>
        </div>
        <div className={styles.backToHome} onClick={backToHome}>
          {t('common.back_home')}
        </div>
      </div>
    </div>
  );
}

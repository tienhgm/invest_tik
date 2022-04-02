import styles from './style.module.scss';
export default function AuthLayout({ children }: any) {
  return (
    <div className={styles.layout}>
      <div className={styles.loginBox}>{children}</div>
    </div>
  );
}

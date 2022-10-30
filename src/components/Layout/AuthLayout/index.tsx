import { useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
export default function AuthLayout({ children }: any) {
  localStorage.removeItem('logoutSuccess');
  let twoFa = useAppSelector((state) => state.auth.twoFa);
  const history = useHistory();
  useEffect(() => {
    if (twoFa) {
      history.push('/confirm-2fa');
    }
  }, [twoFa, history]);
  return (
    <div className={styles.layout}>
      <div className={styles.loginBox}>{children}</div>
    </div>
  );
}

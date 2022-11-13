import { useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import Logo from 'assets/images/logo_5.png';
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
      <div className={styles.logo}>
        <img src={Logo} alt="logo_auth" height={45} />
      </div>
      <div className={styles.loginBox}>{children}</div>
    </div>
  );
}

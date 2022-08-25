import { Card } from 'antd';
import fundApi from 'apis/funds';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
export default function Funds() {
  const onGetListFunds = async () => {
    const result = await fundApi.getListFunds();
  };
  const { t } = useTranslation();
  useEffect(() => {
    onGetListFunds();
  }, []);

  return (
    <Card title={t('common.funds')} bordered={false} className={styles.marginTop}>
      <div className={styles.funds}>
        <div className={styles['funds__side']}>
          <div className={styles['funds__side--title']}>
            Hiện nay INVEST có 4 loại quỹ đầu tư cho KH lựa chọn, mỗi quỹ phù hợp với một nhu cầu
            đầu tư khác nhau.
          </div>
          <div className={styles['funds__side--fund']}>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--active']}`}>TCBF</div>
          </div>
        </div>
        <div className={styles['funds__rest']}>1234</div>
      </div>
    </Card>
  );
}

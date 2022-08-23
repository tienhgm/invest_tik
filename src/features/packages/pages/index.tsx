import { Card } from 'antd';
import packageApi from 'apis/packages';
import { useEffect } from 'react';
import styles from './style.module.scss';
export default function Packages() {
  const onGetListPackages = async () => {
    const result = await packageApi.getListPackages();
  };
  useEffect(() => {
    onGetListPackages();
  }, []);

  return (
    <Card title="Packages" bordered={false} className={styles.marginTop}>
      <div className={styles.packages}>
        <div className={styles['packages__side']}>
          <div className={styles['packages__side--title']}>
            Hiện nay INVEST có 4 loại quỹ đầu tư cho KH lựa chọn, mỗi quỹ phù hợp với một nhu cầu
            đầu tư khác nhau.
          </div>
          <div className={styles['packages__side--package']}>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--inactive']}`}>TCBF</div>
            <div className={`${styles.child} ${styles['child--active']}`}>TCBF</div>
          </div>
        </div>
        <div className={styles['packages__rest']}>1234</div>
      </div>
    </Card>
  );
}

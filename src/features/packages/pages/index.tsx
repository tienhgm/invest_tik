import { Card } from 'antd';
import styles from './style.module.scss';
export default function Packages() {
  return (
    <Card title="Packages" bordered={false} className={styles.marginTop}>
      <div className={styles.packages}>
        <div className={styles['packages__side']}>
          <div className={styles['packages__side--title']}>
            Hiện nay INVEST có 4 loại quỹ đầu tư cho KH lựa chọn, mỗi quỹ phù hợp với một nhu cầu
            đầu tư khác nhau.
          </div>
          <div className={styles['packages__side--package']}>
            <div className={styles.child}>TCBF</div>
            <div className={styles.child}>TCBF</div>
            <div className={styles.child}>TCBF</div>
            <div className={styles.child}>TCBF</div>
          </div>
        </div>
        <div className={styles['packages__rest']}>1234</div>
      </div>
    </Card>
  );
}

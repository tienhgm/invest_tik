import { Spin } from 'antd';
import styles from './style.module.scss';
export function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.outer}>
        <Spin size="large" />
      </div>
    </div>
  );
}

import { Card, Tabs } from 'antd';
import fundApi from 'apis/funds';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LineChart from '../components/LineChart';
import styles from './style.module.scss';
const { TabPane } = Tabs;
export default function Funds() {
  const { t } = useTranslation();
  const [listFunds, setListFunds] = useState<any>(null);
  const [selectFund, setSelectFund] = useState<any>(null);
  const [detailFund, setDetailFund] = useState<any>(null);
  const [detailHistoryFund, setDetailHistoryFund] = useState<any>(null);
  const [keyTime, setKeyTime] = useState<any>('1');
  const onGetListFunds = async () => {
    const { data } = await fundApi.getListFunds();
    if (data) {
      setListFunds(data);
      setSelectFund(data[0].id);
    }
  };
  const onChangeKey = (key: string) => {
    console.log(key);
    setKeyTime(key);
  };
  const onChooseSelectFund = (id: number) => {
    setSelectFund(id);
  };
  const onGetDetailFundById = async (id: number) => {
    try {
      const { data } = await fundApi.getDetailFundById(id);
      if (data) {
        setDetailFund(data);
      }
    } catch (error) {}
  };
  const onGetDetailFundHistoryById = async (id: number, time: string) => {
    try {
      const { data } = await fundApi.getDetailFundHistoryById(id, time);
      if (data) {
        // setDetailFund(data);
        let convertData = data.map((item: any, index: any) => {
          if (index === 0)
            return (item = { ...item, navCurrent: item.navCurrent + ' vnd', percent: 0 });
          return {
            ...item,
            navCurrent: item.navCurrent + ' vnd',
            percent: +((data[index].navCurrent - data[0].navCurrent) / 100).toFixed(2),
          };
        });
        setDetailHistoryFund(convertData);
      }
    } catch (error) {}
  };
  useEffect(() => {
    onGetListFunds();
  }, []);
  useEffect(() => {
    if (!selectFund) return;
    Promise.all([onGetDetailFundById(selectFund), onGetDetailFundHistoryById(selectFund, keyTime)]);
  }, [selectFund, keyTime]);
  const listTabTime = [
    { name: '1 Month', key: '1' },
    { name: '3 Month', key: '3' },
    { name: '6 Month', key: '6' },
    { name: '1 Year', key: '12' },
  ];
  return (
    <Card title={t('common.funds')} bordered={false}>
      <div className={styles.funds}>
        <div className={styles['funds__side']}>
          <div className={styles['funds__side--title']}>{t('common.intro_funds')}</div>
          {listFunds && (
            <div className={styles['funds__side--fund']}>
              {listFunds.map((item: any) => (
                <div
                  className={`${styles.child} ${
                    styles[`child--${selectFund === item.id ? 'active' : 'inactive'}`]
                  }`}
                  key={item.id}
                  onClick={() => onChooseSelectFund(item.id)}
                >
                  {item.code}
                </div>
              ))}
            </div>
          )}
        </div>
        {detailFund && (
          <div className={styles['funds__rest']}>
            <div className={styles['funds__rest--title']}>
              {detailFund.name} ({detailFund.code})
            </div>
            <div className={styles['funds__rest--description']}>{detailFund.description}</div>
            <Tabs defaultActiveKey={keyTime} onChange={onChangeKey} style={{ marginTop: '1rem' }}>
              {listTabTime.map((item: any) => (
                <TabPane tab={item.name} key={item.key}></TabPane>
              ))}
            </Tabs>
            {detailHistoryFund && (
              <div
                style={{
                  flexGrow: 1,
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  overflow: 'scroll'
                }}
              >
                <LineChart data={detailHistoryFund} />
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

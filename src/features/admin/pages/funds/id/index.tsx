import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Tabs, Popconfirm, Button } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import adminApi from 'apis/admin';
import LineChart from '../components/LineChart';
const { TabPane } = Tabs;
import styles from './style.module.scss';
import fundApi from 'apis/funds';
import { errorMes, successMes } from 'helper/notify';
function FundDetail() {
    const history = useHistory();
    const match = useRouteMatch();
    const onNavigate = (link: string) => {
        history.push(link);
    };
    const [detailFund, setDetailFund] = useState<any>(null);
    const [detailHistoryFund, setDetailHistoryFund] = useState<any>(null);
    const [keyTime, setKeyTime] = useState<any>('1');
    const onChangeKey = (key: string) => {
        setKeyTime(key);
    };
    const onGetDetailFundById = async (id: number) => {
        try {
            const { data } = await adminApi.getDetailFund(id);
            if (data) {
                setDetailFund(data);
            }
        } catch (error) { }
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
                        percent: +(
                            ((data[index].navCurrent - data[0].navCurrent) / data[0].navCurrent) *
                            100
                        ).toFixed(2),
                    };
                });
                setDetailHistoryFund(convertData);
            }
        } catch (error) { }
    };
    useEffect(() => {
        if (!match.params.id) return;
        Promise.all([onGetDetailFundById(match.params.id), onGetDetailFundHistoryById(match.params.id, keyTime)]);
    }, [match.params.id, keyTime]);
    const listTabTime = [
        { name: '1 Tháng', key: '1' },
        { name: '3 Tháng', key: '3' },
        { name: '6 Tháng', key: '6' },
        { name: '1 Năm', key: '12' },
    ];
    const onConfirmDelete = async () => {
        try {
            await adminApi.deleteFund(match.params.id);
            onNavigate('/admin/funds');
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span className={styles.link} onClick={() => onNavigate('/admin/funds')}>
                        Quản lý quỹ
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            {detailFund &&
                <Card title={detailFund.name + ' ' + (detailFund.code)}>
                    <div className={styles['funds__rest']}>

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
                                    height: 600,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    overflow: 'scroll',
                                }}
                            >
                                <LineChart data={detailHistoryFund} />
                            </div>
                        )}
                    </div>
                </Card>}

        </>
    );
}

export default FundDetail;
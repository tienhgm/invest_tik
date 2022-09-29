import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Checkbox, InputNumber } from 'antd';
import fundApi from 'apis/funds';
import DonutChartPackage from 'features/invest/components/DonutChartPackage';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import './index.scss';
function CreateCustomizePackage() {
  const { t } = useTranslation();
  const history = useHistory();
  const onNavigate = (link: string) => {
    history.push(link);
  };
  const [listFunds, setListFunds] = useState<any>([]);
  const [dataDonutChart, setDataDonutChart] = useState<any>([]);
  const [maxPercentAble, setMaxPercentAble] = useState<number>(100);
  const [focusItemInput, setFocusItemInput] = useState<any>(null);
  const onGetListFunds = async () => {
    const { data } = await fundApi.getListFunds();
    if (data) {
      let convertListData = data.map((item: any) => {
        return { ...item, isChoose: false, value: 0, type: item.code };
      });
      setListFunds(convertListData);
    }
  };
  const onChoosePackage = (item: any) => {
    setListFunds((prevState: any) =>
      prevState.map((el: any) => (el.id === item.id ? { ...el, isChoose: true } : el))
    );
  };
  const onPickPackage = (item: any) => {
    setListFunds((prevState: any) =>
      prevState.map((el: any) => (el.id === item.id ? { ...el, isChoose: false, value: 0 } : el))
    );
  };
  const onInputPercent = (value: number, item: any) => {
    setListFunds((prevState: any) =>
      prevState.map((el: any) => (el.id === item.id ? { ...el, value } : el))
    );
  };
  const computedMaxPercentAble = (list: any, focusItem: any) => {
    let sum = 0;
    let listFundWithNoFocus = list.filter((item: any) => item.id !== focusItem.id);
    listFundWithNoFocus.map((item: any) => {
      sum += item.value;
    });
    return 100 - sum;
  };
  const isMaxPercentValue = (list: any) => {
    let sum = 0;
    list.map((item: any) => {
      sum += item.value;
    });
    return sum === 100;
  };
  useEffect(() => {
    if (!listFunds) return;
    let listHaveValue = listFunds.filter((item: any) => item.value > 0);
    if (listHaveValue) {
      setDataDonutChart(cloneDeep(listHaveValue));
    }
    return () => {
      setDataDonutChart([]);
    };
  }, [listFunds]);
  useEffect(() => {
    let isHaveValue = listFunds.some((item: any) => item.value > 0);
    if (isHaveValue && focusItemInput) {
      setMaxPercentAble(computedMaxPercentAble(listFunds, focusItemInput));
    }
    return () => {
      setMaxPercentAble(100);
    };
  }, [listFunds, focusItemInput]);

  useEffect(() => {
    onGetListFunds();
  }, []);
  return (
    <div className="create_customize">
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest')}>
            {t('common.invest')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest/recharge')}>
            {t('common.recharge')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest/recharge/customize')}>
            {t('common.customize')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('common.customize')}</Breadcrumb.Item>
      </Breadcrumb>
      <br />

      <Card>
        <div className="create_customize__title">Điều chỉnh phân bổ</div>
        {listFunds && <DonutChartPackage data={dataDonutChart} />}
        <br />
        <div className="create_customize__title">Danh sách quỹ đầu tư</div>
        {listFunds &&
          listFunds.map((item: any) => (
            <div key={item.id}>
              {!item.isChoose ? (
                <div className="create_customize__item">
                  <div className="name">{item.code}</div>
                  {!isMaxPercentValue(listFunds) && (
                    <div className="btn" onClick={() => onChoosePackage(item)}>
                      Chọn
                    </div>
                  )}
                </div>
              ) : (
                <div className="create_customize__item">
                  <div className="checkbox">
                    <Checkbox
                      onChange={() => onPickPackage(item)}
                      checked={item.isChoose}
                      value={item.code}
                    />
                    <div className="name">{item.code}</div>
                  </div>
                  <InputNumber
                    formatter={(value) => `${value}%`}
                    min={0}
                    max={maxPercentAble}
                    defaultValue={0}
                    onFocus={() => setFocusItemInput(item)}
                    onChange={(value) => onInputPercent(value, item)}
                  />
                </div>
              )}
            </div>
          ))}
        <br />
        <Button block type="primary" size="large" disabled={!isMaxPercentValue(listFunds)}>
          {t('common.create')}
        </Button>
      </Card>
    </div>
  );
}

export default CreateCustomizePackage;

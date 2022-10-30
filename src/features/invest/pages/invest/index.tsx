import React, { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from 'antd';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import authApi from 'apis/auth';
import tempPackage from 'assets/images/temp_package.svg';
import { formatCurrency, formatDateTime } from 'helper/common';
function InvestPage() {
  const history = useHistory();
  const onGoToLink = (link: string) => {
    history.push(`${link}`);
  };
  const [assetInvest, setAssetInvest] = useState<any>(null);
  const getAssetInvest = async () => {
    try {
      const { data } = await authApi.getAssetInvest();
      console.log(data);
      if (data) {
        setAssetInvest(data);
      }
    } catch (error) {}
  };
  const computedInvest = (profit: number, total: number) => {
    if (!total) return 0;
    return ((profit / total) * 100).toFixed(2);
  };
  useEffect(() => {
    getAssetInvest();
    return () => {};
  }, []);
  const onGoToDetail = (link: string) => {
    history.push(`/invest/${link}`);
  };

  return (
    <div className="invest">
      {assetInvest ? (
        <div className="invest__block">
          <div className="invest__block--title">Tổng quan</div>
          <br />
          <div className="invest__currency">{formatCurrency(assetInvest?.balance)} đ</div>
          <div className="invest__block__method">
            <div className="invest__block__method--recharge">
              <div className="invest__btn" onClick={() => onGoToLink('/invest/recharge')}>
                <PlusOutlined
                  className="invest__btn"
                  style={{
                    padding: '0.8rem',
                    fontSize: '1.2rem',
                    borderRadius: '50%',
                    backgroundColor: '#32c610',
                    border: '1.5px solid #32c610',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div className="text-medium">Nạp tiền</div>
            </div>
            <div className="invest__block__method--recharge">
              <div className="invest__btn">
                <ArrowDownOutlined
                  style={{
                    padding: '0.8rem',
                    fontSize: '1.2rem',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '1.5px solid #ddd',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div className="text-medium">Rút tiền</div>
            </div>
          </div>
          <br />
        </div>
      ) : (
        <Skeleton active />
      )}
      {assetInvest ? (
        <div className="invest__info">
          <div className="invest__info--title">Thông tin chung</div>
          <div className="invest__info-block">
            <div className="invest__info__child">
              <div>
                <div className="invest__info__child--title">Tổng đầu tư</div>
                <div className="invest__info__child--num">
                  {formatCurrency(assetInvest.total_invest)} đ
                </div>
              </div>
              <div>
                <div className="invest__info__child--title">Ngày bắt đầu</div>
                <div className="invest__info__child--num">2022/12/12</div>
              </div>
            </div>
            <div className="invest__info__child">
              <div>
                <div className="invest__info__child--title">Tăng trưởng</div>
                <div
                  className={
                    'invest__info__child--num ' + (assetInvest?.profit < 0 ? 'is_down' : 'is-up')
                  }
                  style={{ color: 'red' }}
                >
                  {formatCurrency(assetInvest.profit)} đ
                </div>
              </div>
              <div>
                <div className="invest__info__child--title">Đã rút</div>
                <div className="invest__info__child--num">-33,000 đ</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton active />
      )}
      {assetInvest && assetInvest.packages ? (
        <div className="invest__package">
          <div className="invest__package--title">Các gói đầu tư</div>
          {/* @ts-ignore */}
          {assetInvest.packages.map((item: any, key: any) => (
            <Card
              key={key}
              className="invest__package__item"
              title={item?.package?.name}
              extra={
                <img
                  src={item?.avatar ? item?.avatar : tempPackage}
                  className="invest__package__title-img"
                  alt="title_invest__package"
                />
              }
            >
              <div className="invest__package__item--block">
                <div className="invest__package__item--child">
                  <div className="invest__package__item--title"> Đã đầu tư:</div>
                  <div className="invest__package__item--value">
                    {String(item.investment_amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    &nbsp;đ
                  </div>
                </div>
                <div>{formatDateTime(item.created_at)}</div>
              </div>

              <div className="invest__package__item--child">
                <div className="invest__package__item--title">Tăng trưởng:</div>
                <div
                  className="invest__package__item--value"
                  style={{ color: item.profit > 0 ? 'green' : item.profit < 0 ? 'red' : '' }}
                >
                  {formatCurrency(item.profit)}
                  &nbsp;đ&nbsp;&nbsp;({computedInvest(item.profit, item.investment_amount)}%)
                </div>
              </div>
              <div
                className="invest__package__detail"
                onClick={() => onGoToDetail(`recharge/customize/${item.package_id}`)}
              >
                Xem chi tiết {'>'}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
}

export default InvestPage;

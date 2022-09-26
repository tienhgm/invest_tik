import React from 'react';
// import { useTranslation } from 'react-i18next';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
function InvestPage() {
  // const { t } = useTranslation();
  const history = useHistory();
  const onGoToLink = (link: string) => {
    history.push(`${link}`);
  };
  return (
    <div className="invest">
      <div className="invest__block">
        <div className="invest__block--title">Tổng quan</div>
        <br />
        <div className="invest__currency">89.123d</div>
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
      <div className="invest__block">
        <div className="invest__block--title">Thông tin chung</div>
      </div>
    </div>
  );
}

export default InvestPage;

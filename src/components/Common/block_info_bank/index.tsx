import React from 'react';
import './index.scss';
import Tpbank from 'assets/images/tpbank.png';
function BlockInfoBank({ info }: any) {
  return (
    <div className="info-bank">
      <img src={Tpbank} alt="tpbank" width={150} height={150} />
      <div className="info-bank__info">
        <div className="info-bank__block">
          <div>CHỦ TÀI KHOẢN:</div>
          <div>
            <b>{info.beneficiary_name}</b>
          </div>
        </div>
        <div className="info-bank__block">
          <div>SỐ TÀI KHOẢN:</div>
          <div>
            <b>{info.account_number}</b>
          </div>
        </div>
        <div className="info-bank__block">
          <div>NỘI DUNG CHUYỂN KHOẢN:</div>
          <div>
            <b>{info.reference_number}</b>
          </div>
        </div>
        <div className="info-bank__block">
          <div>SỐ TIỀN CHUYỂN:</div>
          <div>
            <b>{info.transfer_amount}đ</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockInfoBank;

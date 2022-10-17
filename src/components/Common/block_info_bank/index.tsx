import React from 'react';
import './index.scss';
function BlockInfoBank({ info }: any) {
  return (
    <div className="info-bank">
      <img
        src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/272890927_5101971693200079_1756261651049813908_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wvu-bAb8h_8AX_FbSZP&_nc_ht=scontent.fhan3-3.fna&oh=00_AT8Rc6zCP_hn9DlF2ankLQX7HL62c-DZ3MZOnSzyWvIEhQ&oe=634D35D8"
        alt="tpbank"
        width={150}
        height={150}
      />
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

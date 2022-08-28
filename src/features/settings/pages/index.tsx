import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RadioChangeEvent } from 'antd';
import { Card, Radio, Space } from 'antd';
import { TWO_FA_SETTING } from 'enum';
import Modal from 'components/Common/modal';
import styles from './style.module.scss';
function Settings() {
  const { t } = useTranslation();
  const [twofa, setTwofa] = useState<any>(1);
  const [open, setOpen] = useState<any>(false);
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setOpen(true);
    // setTwofa(e.target.value);
  };
  const cancelModal = (value: boolean) => {
    setOpen(value);
  };
  const confirmModal = () => {
    console.log('oke');
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <div>
      <Card title="Settings for Important Operations" bordered={false}>
        <Radio.Group onChange={onChange} value={twofa} size="large">
          <Space direction="vertical">
            <Radio style={radioStyle} value={TWO_FA_SETTING.PASSWORD}>
              {t('common.password')}
            </Radio>
            <Radio
              style={radioStyle}
              className={styles['style-radio']}
              value={TWO_FA_SETTING.GG_AUTHENTICATOR}
            >
              {t('common.gg_authenticator')}
            </Radio>
          </Space>
        </Radio.Group>
        {/* <div className="">

        </div> */}
        <Modal open={open} title={'Two factor authentication setting'} cancelModal={cancelModal} confirmModal={confirmModal}>
            123
        </Modal>
      </Card>
    </div>
  );
}

export default Settings;

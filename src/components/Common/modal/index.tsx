import { Modal } from 'antd';
import React from 'react';
interface IModal {
  open: boolean;
  confirmLoading: boolean;
  cancelModal: (value: boolean) => void;
  confirmModal: (value?: any) => any;
  title: string;
  children: React.ReactChild;
  width?: number;
  footer?: any;
  getContainer?: boolean | string;
}

export default function ModalCommon({
  open,
  title,
  confirmModal,
  cancelModal,
  children,
  confirmLoading,
  width = 520,
  footer,
  getContainer,
}: IModal) {
  const handleOk = () => {
    confirmModal();
  };

  const handleCancel = () => {
    cancelModal(false);
  };

  return (
    <Modal
      title={title}
      width={width}
      maskClosable={false}
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={footer}
      // @ts-ignore
      getContainer={getContainer}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      {children}
    </Modal>
  );
}

import { Modal } from 'antd';
import React from 'react';
interface IModal {
  open: boolean;
  confirmLoading: boolean;
  cancelModal: (value: boolean) => void;
  confirmModal: (value?: any) => any;
  title: string;
  children: React.ReactChild;
}

export default function ModalCommon({ open, title, confirmModal, cancelModal, children, confirmLoading }: IModal) {
  const handleOk = () => {
    confirmModal();
  };

  const handleCancel = () => {
    cancelModal(false);
  };

  return (
    <Modal title={title} visible={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
      {children}
    </Modal>
  );
}

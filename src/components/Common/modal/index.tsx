import { Modal } from 'antd';
import React from 'react';
interface IModal {
  open: boolean;
  cancelModal: (value: boolean) => void;
  confirmModal: () => any;
  title: string;
  children: React.ReactChild;
}

export default function ModalCommon({ open, title, confirmModal, cancelModal, children }: IModal) {
  const handleOk = () => {
    confirmModal();
  };

  const handleCancel = () => {
    cancelModal(false);
  };

  return (
    <Modal title={title} visible={open} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
}

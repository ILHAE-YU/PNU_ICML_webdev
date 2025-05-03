import React from 'react';
import { Modal } from '@mantine/core';

interface PopupModalProps {
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ onClose }) => {
  return (
<Modal
  opened={true}
  onClose={onClose}
  withCloseButton
  centered
  size="auto"
  styles={{
    modal: {
      padding: 0,
      maxWidth: 'unset',
      width: 'fit-content',
      height: 'fit-content',
    },
    body: {
      padding: 0,
    },
  }}
  >
    <text>
        test
    </text>
  {/* <div style={{ width: '600px', height: '400px' }}>
    <img
      src="/modal/test.jpg"
      alt="팝업 이미지"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div> */}
</Modal>

  );
};

export default PopupModal;

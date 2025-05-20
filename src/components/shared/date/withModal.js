import React from 'react';
import Modal from '../Modal';

const withModal = (WrappedComponent, modalProps = {}) => {
  return function WithModalComponent(props) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
          <WrappedComponent {...props} />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          {...modalProps}
        >
          <WrappedComponent {...props} />
        </Modal>
      </>
    );
  };
};

export default withModal; 
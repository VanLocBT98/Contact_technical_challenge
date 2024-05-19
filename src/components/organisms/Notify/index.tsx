/* eslint-disable react/default-props-match-prop-types */
import React from 'react';

import Button from '~/components/atoms/Button';
import Typography from '~/components/atoms/Typography';
import Modal from '~/components/organisms/Modal';
import './index.scss';
export interface NotifyProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  btnText?: string;
  onClose?: () => void;
}

const Notify: React.FC<NotifyProps> = ({
  isOpen,
  title,
  message,
  btnText,
  onClose,
}) => (
  <Modal
    isOpen={!!isOpen}
    modifiers="notify"
    icon={{
      name: 'close_teal',
      size: '24x24',
    }}
    handleClose={onClose}
  >
    <div className="o-notify">
      <div className="o-notify_content">
        {title && (
          <div className="o-notify_title">
            <Typography
              type="h6"
              modifiers={['black', '700', 'center']}
              content={title}
            />
          </div>
        )}
        {message && (
          <div className="o-notify_message">
            <Typography
              type="p"
              modifiers={['16x28', 'black', '400', 'center']}
              content={message}
            />
          </div>
        )}
        <div className="o-notify_btn">
          <Button modifiers={['md']} onClick={onClose}>
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

Notify.defaultProps = {
  isOpen: undefined,
  title: undefined,
  message: undefined,
  btnText: undefined,
  onClose: undefined,
};

export default Notify;

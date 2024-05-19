import React from 'react';
import Modal from 'react-modal';
import './index.scss';

import Icon, { IconName, IconSize } from '~/components/atoms/Icon';
import { ModifierUtils } from '~/utils';

interface Props {
  isOpen?: boolean;
  icon?: {
    name: IconName;
    size?: IconSize;
  };
  modifiers?: 'image' | 'notify' | 'video' | 'utilities'; // add more modifiers
  handleClose?: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  children,
  icon,
  modifiers,
  handleClose,
}) => (
  <Modal
    isOpen={!!isOpen}
    onRequestClose={handleClose}
    closeTimeoutMS={250}
    className={`${ModifierUtils.map('o-modal', modifiers)}`}
    appElement={document.getElementById('root') as HTMLElement}
    ariaHideApp={false}
    portalClassName="o-modal_portal"
    bodyOpenClassName="overflow-hidden"
  >
    <div className="o-modal_main">
      <div className="o-modal_wrapper">
        {icon && (
          <button type="button" className="o-modal_close" onClick={handleClose}>
            <Icon iconName={icon.name} size={icon.size} />
          </button>
        )}
        <div className="o-modal_body">{children}</div>
      </div>
    </div>
  </Modal>
);

CustomModal.defaultProps = {
  icon: {
    name: 'close_white',
    size: '32x32'
  }
};
export default CustomModal;

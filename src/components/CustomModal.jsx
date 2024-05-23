import { Button, Modal } from "antd";
import React from "react";

export default function CustomModal({
  title = "",
  isModalOpen,
  handleCancel,
  okHandler,
  classes = "",
  okBtn = "",
  noBtn = "",
  disabled =false,
  children,
}) {
  return (
    <Modal
      className={`custom-modal-class`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div className={`${classes}`}>
        {title && <h3 className="fs-24-16 black-757 fw-bold ">{title}</h3>}
        {children}

        {(okBtn || noBtn) && (
          <div className="modal-bth-footer">
            {okBtn && (
              <Button onClick={okHandler} disabled={disabled} className="primary-btn fw-semibold ">
                {okBtn}
              </Button>
            )}
            {noBtn && (
              <Button
                onClick={handleCancel}
                className="secondary-btn fw-semibold "
              >
                {noBtn}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

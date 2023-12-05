import React from "react";
import { Button } from "react-bootstrap";
import style from "../Modal/Modal.module.css"



type  ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  action: () => void;
  nameAction: string;
}

 const Modal: React.FC<ModalProps> =({
  title,
  onClose,
  children,
  action,
  nameAction,
}) => {

  return (
    <div className="modal fade show" style={{ display: 'block' }} >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div
              className={
              title === "New Product" || title === "Edit Product"
                ? style.modal_product
                : title === "Add User" || title === "Edit User"
                ? style.modal_user
                : "modal-body"
            }
          >
            {children}
          </div>

          <div className="modal-footer">
            <Button
              variant="secondary"
              type="button"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              data-testid="btn_modal"
              onClick={action}
            >
              {nameAction}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal